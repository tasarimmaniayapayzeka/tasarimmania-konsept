# TASARIMMANIA — TARİH DAMGALI YEDEK
#
# NEDEN ZIP, NEDEN AYNA DEĞİL: bu makinede paralel Claude oturumları aynı
# klasörlere yazabiliyor. /MIR (ayna) kullanmak, başka bir oturumun yeni
# yazdığı dosyayı hedefte SİLEBİLİR. Tarih damgalı arşiv hiçbir şeyi ezmez.
#
# KAPSAM: proje klasörünün tamamı, şunlar HARİÇ:
#   .git            → geçmiş zaten GitHub'da (tasarimmania-konsept)
#   node_modules    → varsa, yeniden kurulabilir
#   canli-site-yedek→ eski sitenin aynası, ayrı ve büyük
#
# Kullanım:  powershell -ExecutionPolicy Bypass -File plan\yedek-al.ps1

$ErrorActionPreference = 'Stop'

$Kaynak = Split-Path -Parent $PSScriptRoot
$Damga  = Get-Date -Format 'yyyy-MM-dd_HHmm'
$Hedef  = "E:\Claude-Projeler-Yedek\25-TasarimMania-Site"
$Arsiv  = Join-Path $Hedef "TasarimMania-Site_$Damga.zip"

if (-not (Test-Path "E:\")) { throw "E: sürücüsü yok — yedek alınamadı." }
if (-not (Test-Path $Hedef)) { New-Item -ItemType Directory -Path $Hedef -Force | Out-Null }

Write-Output "kaynak : $Kaynak"
Write-Output "hedef  : $Arsiv"
Write-Output ""

# Geçici bir hazırlık klasörü: hariç tutulanlar olmadan kopya
$Gecici = Join-Path $env:TEMP "tm-yedek-$Damga"
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
Write-Output ""
Write-Output ("ARŞİV HAZIR: {0}" -f $Son.FullName)
Write-Output ("boyut      : {0:N1} MB" -f ($Son.Length / 1MB))

# Aynı klasördeki eski arşivleri listele (silme — karar kullanıcının)
$Eski = Get-ChildItem $Hedef -Filter '*.zip' | Sort-Object LastWriteTime -Descending
Write-Output ""
Write-Output "klasördeki arşivler:"
$Eski | Select-Object -First 8 | ForEach-Object {
    Write-Output ("  {0}  {1:N1} MB  {2:yyyy-MM-dd HH:mm}" -f $_.Name, ($_.Length / 1MB), $_.LastWriteTime)
}
