# TASARIMMANIA - TARIH DAMGALI YEDEK
#
# ASCII-ONLY: PowerShell 5.1 .ps1 dosyalarini ANSI kod sayfasiyla okur.
# Turkce karakter ve uzun tire (em dash) ayristirmayi bozuyordu; bu yuzden
# bu dosyada bilerek yalniz ASCII kullaniliyor.
#
# NEDEN ZIP, NEDEN AYNA DEGIL: bu makinede paralel Claude oturumlari ayni
# klasorlere yazabiliyor. /MIR (ayna) baska bir oturumun yeni yazdigi
# dosyayi hedefte SILEBILIR. Tarih damgali arsiv hicbir seyi ezmez.
#
# KAPSAM: proje klasorunun tamami, sunlar HARIC:
#   .git             -> gecmis zaten GitHub'da (tasarimmania-konsept)
#   node_modules     -> yeniden kurulabilir
#   canli-site-yedek -> eski sitenin aynasi, ayri ve buyuk
#
# Kullanim: powershell -ExecutionPolicy Bypass -File plan\yedek-al.ps1

$ErrorActionPreference = 'Stop'

$Kaynak = Split-Path -Parent $PSScriptRoot
$Damga  = Get-Date -Format 'yyyy-MM-dd_HHmm'
$Hedef  = 'E:\Claude-Projeler-Yedek\25-TasarimMania-Site'
$Arsiv  = Join-Path $Hedef ("TasarimMania-Site_" + $Damga + ".zip")

if (-not (Test-Path 'E:\')) { throw 'E: surucusu yok - yedek alinamadi.' }
if (-not (Test-Path $Hedef)) { New-Item -ItemType Directory -Path $Hedef -Force | Out-Null }

Write-Output "kaynak : $Kaynak"
Write-Output "hedef  : $Arsiv"
Write-Output ''

# DIKKAT: $env:TEMP bu makinede 8.3 kisa yol donduruyor (C:\Users\HSAN~1\...)
# ve Remove-Item onu cozemiyor ("An object at the specified path does not exist").
# GetTempPath() tam yolu verir.
$Gecici = Join-Path ([System.IO.Path]::GetTempPath()) ("tm-yedek-" + $Damga)
if (Test-Path $Gecici) { Remove-Item $Gecici -Recurse -Force }
New-Item -ItemType Directory -Path $Gecici -Force | Out-Null

$Haric = @('.git', 'node_modules', 'canli-site-yedek')
Get-ChildItem -Path $Kaynak -Force | Where-Object { $Haric -notcontains $_.Name } | ForEach-Object {
    Copy-Item $_.FullName -Destination $Gecici -Recurse -Force
}

$Boyut = (Get-ChildItem $Gecici -Recurse -File | Measure-Object -Property Length -Sum).Sum
Write-Output ("paketlenecek: {0:N1} MB" -f ($Boyut / 1MB))

Compress-Archive -Path (Join-Path $Gecici '*') -DestinationPath $Arsiv -CompressionLevel Optimal
Remove-Item $Gecici -Recurse -Force

$Son = Get-Item $Arsiv
Write-Output ''
Write-Output ("ARSIV HAZIR: " + $Son.FullName)
Write-Output ("boyut      : {0:N1} MB" -f ($Son.Length / 1MB))

$Eski = Get-ChildItem $Hedef -Filter '*.zip' | Sort-Object LastWriteTime -Descending
Write-Output ''
Write-Output 'klasordeki arsivler:'
$Eski | Select-Object -First 8 | ForEach-Object {
    Write-Output ("  {0}  {1:N1} MB  {2:yyyy-MM-dd HH:mm}" -f $_.Name, ($_.Length / 1MB), $_.LastWriteTime)
}
