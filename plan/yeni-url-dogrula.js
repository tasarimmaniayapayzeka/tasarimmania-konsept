/* Yeni adres haritasını UYGULAMADAN ÖNCE doğrular.
 *
 * Kontroller:
 *   1. Kaynak sayfa gerçekten var mı
 *   2. İki kaynak aynı yeni adrese düşüyor mu (çakışma)
 *   3. Yeni adres, blog yazısı veya kurumsal sayfayla çakışıyor mu
 *   4. Slug biçimi geçerli mi (küçük harf, tire, Türkçe karakter yok)
 *   5. Kapsam: kaç hizmet sayfası haritada, kaçı dışarıda kaldı
 *
 * Kullanım: node plan/yeni-url-dogrula.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const H = JSON.parse(fs.readFileSync(path.join(__dirname, 'yeni-url-haritasi.json'), 'utf8'));

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const hepsi = tara(S).filter((f) => fs.statSync(f).size >= 2000).map(yol);
const yonlendirme = (y) => {
  const f = path.join(S, y.replace(/^\//, ''), 'index.html');
  return fs.existsSync(f) && /http-equiv="refresh"/i.test(fs.readFileSync(f, 'utf8'));
};

const hata = [], uyari = [];

/* --- 1. kaynak var mı --- */
const kaynaklar = Object.keys(H.hizmetler);
for (const k of kaynaklar) if (!hepsi.includes(k)) hata.push(`kaynak sayfa YOK: ${k}`);
for (const [hedef, o] of Object.entries(H.birlestirilecek))
  for (const k of o.kaynaklar) if (!hepsi.includes(k)) hata.push(`birleştirme kaynağı YOK: ${k}`);

/* --- 2 + 3. yeni adres çakışması --- */
const yeniAdresler = new Map();
const koy = (adres, kaynak) => {
  if (!yeniAdresler.has(adres)) yeniAdresler.set(adres, []);
  yeniAdresler.get(adres).push(kaynak);
};
Object.entries(H.hizmetler).forEach(([k, o]) => koy(o.yeni, k));
Object.entries(H.birlestirilecek).forEach(([hedef, o]) => koy(hedef, o.kaynaklar.join(' + ')));
Object.entries(H.kurumsal).forEach(([k, o]) => koy(o.yeni, k));
Object.keys(H.yeni_yazilacak).forEach((a) => koy(a, '(yeni yazılacak)'));

for (const [adres, kaynak] of yeniAdresler)
  if (kaynak.length > 1) hata.push(`ÇAKIŞMA ${adres} ← ${kaynak.join('  ve  ')}`);

/* blog yazılarıyla çakışma — blog /blog/ altında kaldığı için kök seviye ile çakışmaz */
const blogSluglar = hepsi.filter((y) => /^\/blog\/[^/]+\/$/.test(y)).map((y) => y.split('/')[2]);
for (const adres of yeniAdresler.keys()) {
  const s = adres.split('/').filter(Boolean)[0];
  if (adres.startsWith('/blog/')) continue;
  if (blogSluglar.includes(s) && adres.split('/').filter(Boolean).length === 1)
    uyari.push(`/${s}/ hem hizmet hem blog yazısı adı — blog /blog/${s}/ altında kaldığı için ÇAKIŞMIYOR, yalnız isim benzerliği`);
}

/* --- 4. slug biçimi --- */
const gecerli = /^\/[a-z0-9]+(-[a-z0-9]+)*\/$/;
for (const adres of yeniAdresler.keys())
  if (!gecerli.test(adres)) hata.push(`slug biçimi geçersiz: ${adres}`);

/* --- 5. kapsam --- */
const sitedeHizmet = hepsi.filter((y) => y.startsWith('/hizmetler/') && !yonlendirme(y));
const haritadaki = new Set([...kaynaklar, ...Object.values(H.birlestirilecek).flatMap((o) => o.kaynaklar)]);
const disarida = sitedeHizmet.filter((y) => !haritadaki.has(y) && y !== '/hizmetler/');

console.log('\n  YENİ ADRES HARİTASI — DOĞRULAMA\n');
console.log(`  sitedeki hizmet sayfası : ${sitedeHizmet.length}`);
console.log(`  haritada karşılığı olan : ${haritadaki.size}`);
console.log(`  haritanın ürettiği adres: ${yeniAdresler.size}`);
console.log(`  /hizmetler/ hub'ı       : ${H.kaldirilan_seviye ? 'karar bekliyor' : '—'}`);

console.log(`\n  ── haritada olmayan hizmet sayfası: ${disarida.length}`);
disarida.forEach((y) => console.log('     ' + y));
if (!disarida.length) console.log('     ✓ hepsi haritada');

console.log(`\n  ── HATA: ${hata.length}`);
hata.forEach((x) => console.log('     ✗ ' + x));
if (!hata.length) console.log('     ✓ yok');

console.log(`\n  ── uyarı: ${uyari.length}`);
uyari.forEach((x) => console.log('     ~ ' + x));
if (!uyari.length) console.log('     ✓ yok');

console.log('\n  ── üretilecek adresler (alfabetik) ──');
[...yeniAdresler.keys()].sort().forEach((a) => console.log('     ' + a));
console.log('');
process.exit(hata.length ? 1 : 0);
