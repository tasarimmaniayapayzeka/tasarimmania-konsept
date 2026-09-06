#!/usr/bin/env bash
# Üretilen ham görselden yazının 5 boyutlu türevlerini çıkarır.
#
# Neden betik: her yazıda 2 görsel × 5 çıktı = 10 dosya. Elle yazılan ffmpeg
# satırı 15 yazıda 150 kez tekrarlanır ve bir yerde kırpma/kalite kayar.
#
# Kullanım:
#   plan/gorsel-turet.sh <ham-kapak.png> <ham-govde.png> <yazi-slug>
#
# Referans düzen (yayındaki 27 yazıdan ölçüldü): 640/960/1440/1920 webp + 1440 jpg,
# hepsi tam 16:9. Kaynak 2688x1536 (1.750) geldiği için 16:9'a (1.778) YÜKSEKLİKTEN
# kırpılır: 2688x1512, ortadan 12px kaydırılarak.
set -euo pipefail

HAM_KAPAK="${1:?ham kapak görseli yolu gerekli}"
HAM_GOVDE="${2:?ham gövde görseli yolu gerekli}"
SLUG="${3:?yazi slug degeri gerekli}"

KOK="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HEDEF="$KOK/site/blog/$SLUG/gorsel"
mkdir -p "$HEDEF"

for ad in kapak govde; do
  [ "$ad" = kapak ] && kaynak="$HAM_KAPAK" || kaynak="$HAM_GOVDE"
  [ -f "$kaynak" ] || { echo "✗ kaynak yok: $kaynak" >&2; exit 1; }

  boy=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$kaynak")
  g=${boy%,*}; y=${boy#*,}
  # 16:9 kırpma penceresi: genişliği koru, yüksekliği hesapla (yetmezse tersini yap)
  ky=$(( g * 9 / 16 ))
  if [ "$ky" -le "$y" ]; then kg=$g; ust=$(( (y - ky) / 2 )); sol=0
  else kg=$(( y * 16 / 9 )); ky=$y; sol=$(( (g - kg) / 2 )); ust=0; fi
  kirp="crop=$kg:$ky:$sol:$ust"

  for w in 640 960 1440 1920; do
    ffmpeg -y -v error -i "$kaynak" -vf "$kirp,scale=$w:$((w*9/16)):flags=lanczos" \
      -c:v libwebp -quality 82 -compression_level 6 "$HEDEF/$SLUG-$ad-$w.webp"
  done
  ffmpeg -y -v error -i "$kaynak" -vf "$kirp,scale=1440:810:flags=lanczos" -q:v 4 \
    "$HEDEF/$SLUG-$ad-1440.jpg"
done

echo "  $HEDEF"
for f in "$HEDEF"/*; do
  printf "  %-62s %6sKB  %s\n" "$(basename "$f")" "$(( $(stat -c%s "$f") / 1024 ))" \
    "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f")"
done
