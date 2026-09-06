/* Yazı tarihlerini toplu kaydırır ve ÇAKIŞMAYI önce ölçer.
 *
 * Neden ölçüm önce: yayın takvimi tek günlük yuvalara dayanıyor (mevcut 27 yazı
 * TEK sayılı günlerde, 2 günde bir). Körlemesine -30 gün kaydırmak her yeni
 * yazıyı mevcut bir yazının tam üstüne oturtur.
 *
 * Kullanım:
 *   node plan/tarih-kaydir.js -30            (kuru koşu, çakışma raporu)
 *   node plan/tarih-kaydir.js -31 --uygula
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const AY = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

const gun = parseInt(process.argv[2], 10);
if (!Number.isFinite(gun)) { console.error('kullanım: node plan/tarih-kaydir.js <±gün> [--uygula]'); process.exit(2); }
const UYGULA = process.argv.includes('--uygula');

/* mevcut blog kartlarının tarihleri — çakışma bu kümeye karşı ölçülür */
const bIndex = fs.readFileSync(path.join(KOK, 'site/blog/index.html'), 'utf8');
const kartlar = [...bIndex.matchAll(/data-kat="[^"]*"[^>]*href="\.\/([^"]+)\/"[\s\S]*?<span class="tarih">(\d+) (\S+) (\d{4})/g)]
  .map((m) => ({ slug: m[1], iso: `${m[4]}-${String(AY.indexOf(m[3]) + 1).padStart(2, '0')}-${String(+m[2]).padStart(2, '0')}` }));

const dosyalar = fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f)).sort();
const benimSluglar = new Set(dosyalar.map((f) => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')).slug));
/* kendi kartlarımız çakışma sayılmaz — onlar zaten taşınıyor */
const doluGunler = new Map();
for (const k of kartlar) if (!benimSluglar.has(k.slug)) doluGunler.set(k.iso, k.slug);

console.log(`\n  ${gun >= 0 ? '+' : ''}${gun} gün · mevcut takvimde ${doluGunler.size} dolu gün var\n`);

let cakisma = 0;
const degisiklik = [];
for (const f of dosyalar) {
  const yol = path.join(__dirname, f);
  const C = JSON.parse(fs.readFileSync(yol, 'utf8'));
  const [y, a, g] = C.tarih.slice(0, 10).split('-').map(Number);
  /* UTC ile hesapla: yerel saat dilimi gün kaydırabilir */
  const d = new Date(Date.UTC(y, a - 1, g));
  d.setUTCDate(d.getUTCDate() + gun);
  const yeni = d.toISOString().slice(0, 10);
  const carpan = doluGunler.get(yeni);
  if (carpan) cakisma++;
  console.log(`  ${C.tarih.slice(0, 10)} → ${yeni}  ${carpan ? '✗ ÇAKIŞMA: ' + carpan : '✓'}  ${C.slug}`);
  degisiklik.push([yol, C.tarih, yeni + C.tarih.slice(10)]);
}

console.log(`\n  ${cakisma ? '✗ ' + cakisma + '/' + dosyalar.length + ' tarih mevcut bir yazının üstüne düşüyor'
  : '✓ çakışma yok'}`);

if (!UYGULA) { console.log('\n  Uygulamak için: --uygula\n'); process.exit(cakisma ? 1 : 0); }
if (cakisma) { console.error('\n  ✗ Çakışma varken uygulanmaz. Farklı bir gün sayısı deneyin.\n'); process.exit(1); }

for (const [yol, eski, yeni] of degisiklik) {
  const ham = fs.readFileSync(yol, 'utf8');
  fs.writeFileSync(yol, ham.replace(`"tarih": "${eski}"`, `"tarih": "${yeni}"`), 'utf8');
}
console.log(`\n  ${degisiklik.length} yapılandırma güncellendi.`);
console.log('  Sırada: blog-uret.js (şema tarihi) + blog-kaydet.js --guncelle (kart ve sitemap)\n');
