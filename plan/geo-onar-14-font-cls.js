/* GEO onarım — Aşama 14: yazı tipi takasından doğan CLS
 *
 * ÖLÇÜLEN DURUM (başsız Chrome, 1440×900, her sayfa 4 kez — kararlı):
 *   /yerel-seo/            CLS 0,1853
 *   /meta-reklam/ CLS 0,1849
 *   /blog/grafik-tasarim-turleri/        CLS 0,1081
 *   (Google eşiği "iyi" için 0,1)
 *
 * ⚠ KAYIT YANILTICIYDI: layout-shift kaydı kayan öğe olarak .ciz-kutu ve
 *   .yz-kapak gösteriyordu. Ölçtük — o öğelerin yüksekliği HİÇ değişmiyor
 *   (330px → 330px). Yani onlar sebep değil, İTİLEN taraf.
 *
 * KONTROLLÜ DENEY (plan/cls-font-deney.js) sebebi kanıtladı:
 *   A) olduğu gibi          → 0,1853 · 0,1849 · 0,1081
 *   B) font isteği engelli  → 0 · 0 · 0
 *   C) display=optional     → 0 · 0 · 0
 *   Sebep: Google Fonts "display=swap". Yedek yazı tipiyle çizilen başlık,
 *   gerçek font inince yeniden akıyor; satır sayısı değişince altındaki
 *   her blok kayıyor.
 *
 * ⚠ TAKAS (kullanıcı bilmeli): display=optional ile tarayıcı ~100 ms içinde
 *   font hazır değilse O SAYFA GÖRÜNTÜSÜNDE yedek yazı tipinde kalır ve
 *   sonradan takas YAPMAZ. Font önbelleğe girdikten sonraki ziyaretlerde
 *   marka yazı tipi normal görünür. Alternatifler:
 *     · fontu kendi sunucumuzda barındırmak + size-adjust'lı yedek metrikler
 *       (marka fontu her zaman görünür, CLS yine 0 — daha fazla iş)
 *     · display=swap'ta kalıp CLS'i kabul etmek (ölçülen bedel: 0,185)
 *   Geri almak için: bu betikteki YENI/ESKI değerlerini takas edip yeniden koş.
 *
 * Kullanım: node plan/geo-onar-14-font-cls.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

const ESKI = 'display=swap';
const YENI = 'display=optional';

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (/\.html$/.test(e.name)) o.push(p);
  }
  return o;
}

const dosyalar = tara(S).concat([path.join(KOK, '404.html')].filter(fs.existsSync));
let n = 0, toplam = 0;
for (const f of dosyalar) {
  const h = fs.readFileSync(f, 'utf8');
  const kac = h.split(ESKI).length - 1;
  if (!kac) continue;
  n++; toplam += kac;
  if (UYGULA) fs.writeFileSync(f, h.split(ESKI).join(YENI), 'utf8');
}

/* üretici de aynı değeri yazmalı, yoksa yeni yazı eski hâliyle doğar */
const uretici = path.join(__dirname, 'blog-uret.js');
let ureticiNot = 'üreticide desen yok';
if (fs.existsSync(uretici)) {
  const u = fs.readFileSync(uretici, 'utf8');
  if (u.includes(ESKI)) {
    if (UYGULA) fs.writeFileSync(uretici, u.split(ESKI).join(YENI), 'utf8');
    ureticiNot = 'blog-uret.js güncellendi';
  } else ureticiNot = u.includes(YENI) ? 'blog-uret.js zaten güncel' : 'üreticide desen yok';
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — ${ESKI} → ${YENI}`);
console.log(`  ${n} dosya · ${toplam} geçiş · ${ureticiNot}\n`);
if (!UYGULA) console.log('  Uygulamak için: --uygula\n');
