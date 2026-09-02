# TASARIMMANIA - YEDEGIN ICERIGINI DOGRULA
#
# ASCII-ONLY: PowerShell 5.1 .ps1 dosyalarini ANSI kod sayfasiyla okur;
# Turkce karakter ayristirmayi bozuyor. Bkz. plan\yedek-al.ps1
#
# NEDEN VAR: "yedek alindi" demek yetmez. Arsiv olusur ama icerik eksik
# olabilir (yanlis kaynak, kopyalama hatasi, eski surum). Bu betik arsivi
# ACIP sayar ve son degisikligin gercekten icinde oldugunu okur.
#
# TUZAK - TERS BOLU: Windows PowerShell 5.1'in Compress-Archive'i, ZIP
# standardina aykiri sekilde girdi adlarini TERS BOLU ile yazar
# ("site\css\tm.css"). Bu yuzden -like 'site/*' filtresi HER ZAMAN 0 doner
# ve yedek bos sanilir. Bu tuzaga dusuldu: dolu bir arsiv "site 0, plan 0,
# assets 0" diye okundu. Cozum: karsilastirmadan once Replace('\','/').
#
# Kullanim: powershell -ExecutionPolicy Bypass -File plan\yedek-dogrula.ps1
#           (arguman verilmezse en yeni arsiv secilir)

$ErrorActionPreference = 'Stop'

$Hedef = 'E:\Claude-Projeler-Yedek\25-TasarimMania-Site'
$Arsiv = $args[0]

if (-not $Arsiv) {
    $Son = Get-ChildItem $Hedef -Filter 'TasarimMania-Site_*.zip' |
           Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $Son) { throw "Arsiv bulunamadi: $Hedef" }
    $Arsiv = $Son.FullName
}
if (-not (Test-Path $Arsiv)) { throw "Arsiv yok: $Arsiv" }

Write-Output ("arsiv : " + $Arsiv)
Write-Output ("boyut : {0:N1} MB" -f ((Get-Item $Arsiv).Length / 1MB))
Write-Output ''

Add-Type -AssemblyName System.IO.Compression.FileSystem
$Zip = [System.IO.Compression.ZipFile]::OpenRead($Arsiv)

try {
    $Kayit = $Zip.Entries
    # ters bolu tuzagi - karsilastirmadan once duzlestir
    $Yol = $Kayit | ForEach-Object { $_.FullName.Replace('\', '/') }

    $Sayfa  = ($Yol | Where-Object { $_ -like 'site/*index.html' }).Count
    $Plan   = ($Yol | Where-Object { $_ -like 'plan/*' }).Count
    $Assets = ($Yol | Where-Object { $_ -like 'assets/*' }).Count
    $Git    = ($Yol | Where-Object { $_ -like '.git/*' }).Count

    Write-Output ("toplam kayit : " + $Yol.Count)
    Write-Output ("site sayfasi : " + $Sayfa)
    Write-Output ("plan betigi  : " + $Plan)
    Write-Output ("assets       : " + $Assets)
    Write-Output ("git (0 bekleniyor) : " + $Git)
    Write-Output ''

    # calisma klasorundeki sayfa sayisiyla kiyasla - eksik sayfa yakalanir
    $Kok = Split-Path -Parent $PSScriptRoot
    $Yerel = (Get-ChildItem (Join-Path $Kok 'site') -Recurse -Filter 'index.html').Count
    if ($Sayfa -eq $Yerel) {
        Write-Output ("SAYFA SAYISI TUTUYOR: " + $Sayfa + " = " + $Yerel)
    } else {
        Write-Output ("SAYFA SAYISI TUTMUYOR: arsivde " + $Sayfa + ", diskte " + $Yerel)
    }

    if ($Git -gt 0) { Write-Output 'UYARI: .git arsive girmis - kapsam kurali bozulmus' }

    # Arsivdeki tm.css ile diskteki AYNI MI - BAYT uzerinden.
    #
    # TUZAK - KODLAMA: ilk surum metin karsilastiriyordu ve "FARKLI" diyordu.
    # Sebep dosya degil OKUMA idi: StreamReader varsayilan olarak UTF-8 cozer,
    # Get-Content -Raw ise (BOM yoksa) ANSI kod sayfasini kullanir. Dosyada
    # Turkce yorumlar oldugu icin ayni baytlar iki farkli metin uretiyordu ve
    # guncel bir yedek "eski" diye raporlaniyordu. Bayt karsilastirmasi
    # kodlamadan bagimsizdir.
    $Css = $Kayit | Where-Object { $_.FullName.Replace('\', '/') -eq 'site/css/tm.css' }
    if ($Css) {
        $Bellek = New-Object System.IO.MemoryStream
        $Akis   = $Css.Open()
        $Akis.CopyTo($Bellek)
        $Akis.Close()
        $ArsivBayt = $Bellek.ToArray()
        $Bellek.Dispose()
        $DiskBayt = [System.IO.File]::ReadAllBytes((Join-Path $Kok 'site\css\tm.css'))

        $Ayni = $ArsivBayt.Length -eq $DiskBayt.Length
        if ($Ayni) {
            for ($i = 0; $i -lt $ArsivBayt.Length; $i++) {
                if ($ArsivBayt[$i] -ne $DiskBayt[$i]) { $Ayni = $false; break }
            }
        }
        if ($Ayni) {
            Write-Output ('tm.css : arsiv ve disk AYNI (' + $ArsivBayt.Length + ' bayt) - yedek guncel')
        } else {
            Write-Output ('tm.css : FARKLI - arsiv ' + $ArsivBayt.Length + ' bayt, disk ' + $DiskBayt.Length + ' bayt - yeniden yedek al')
        }
    } else {
        Write-Output 'tm.css : arsivde YOK'
    }
} finally {
    $Zip.Dispose()
}
