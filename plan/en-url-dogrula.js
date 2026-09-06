/* İngilizce adres haritasını doğrular — Türkçe haritayla birlikte tutarlı mı.
 *
 * Kontroller:
 *   1. Her Türkçe adresin İngilizce karşılığı var mı (eksiksizlik)
 *   2. İki Türkçe sayfa aynı İngilizce adrese düşüyor mu (çakışma)
 *   3. Slug biçimi geçerli mi (küçük harf, tire, ASCII — İngilizce tarafta
 *      Türkçe karakter kalmamalı)
 *   4. Türkçe slug'ın olduğu gibi taşındığı yerler (çeviri atlanmış olabilir)
 *   5. /en/ öneki tutarlı mı
 *
 * Kullanım: node plan/en-url-dogrula.js
 */
const fs = require('fs'), path = require('path');
const TR = JSON.parse(fs.readFileSync(path.join(__dirname, 'yeni-url-haritasi.json'), 'utf8'));
const EN = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));

const hata = [], uyari = [];

/* Türkçe haritanın ürettiği tüm adresler */
const trAdresler = new Set();
Object.values(TR.hizmetler).forEach((o) => trAdresler.add(o.yeni));
Object.keys(TR.birlestirilecek).forEach((a) => trAdresler.add(a));
Object.values(TR.kurumsal).forEach((o) => trAdresler.add(o.yeni));
Object.keys(TR.yeni_yazilacak).forEach((a) => trAdresler.add(a));

/* İngilizce haritanın kapsadığı Türkçe adresler */
const enKapsam = new Set([...Object.keys(EN.hizmetler), ...Object.keys(EN.kurumsal)]);

/* --- 1. eksiksizlik --- */
for (const a of trAdresler) {
  if (a === '/blog/') continue;
  if (!enKapsam.has(a)) hata.push(`İngilizce karşılığı TANIMSIZ: ${a}`);
}
for (const a of enKapsam) if (!trAdresler.has(a)) hata.push(`Türkçe haritada olmayan kaynak: ${a}`);

/* --- 2. çakışma --- */
const enAdresler = new Map();
const koy = (en, tr) => { if (!enAdresler.has(en)) enAdresler.set(en, []); enAdresler.get(en).push(tr); };
Object.entries(EN.hizmetler).forEach(([tr, o]) => koy(o.en, tr));
Object.entries(EN.kurumsal).forEach(([tr, o]) => koy(o.en, tr));
for (const [en, tr] of enAdresler) if (tr.length > 1) hata.push(`ÇAKIŞMA ${en} ← ${tr.join(' ve ')}`);

/* --- 3. slug biçimi (ASCII, küçük harf, tire) --- */
const gecerli = /^\/en\/[a-z0-9]+(-[a-z0-9]+)*\/$/;
for (const en of enAdresler.keys()) {
  if (!gecerli.test(en)) hata.push(`slug biçimi geçersiz: ${en}`);
  if (/[çğıöşüâîû]/i.test(en)) hata.push(`İngilizce adreste Türkçe karakter: ${en}`);
}

/* --- 4. çevrilmemiş olabilecekler --- */
const TR_IZ = /(tasarim|yazilim|hizmet|urun|reklam|uygulama|sosyal|medya|kurumsal|yerel|cok|dilli|arayuz|bakim|ozel|zeka|produksiyon|pazarlama|icerik|referans|teklif|iletisim|hakkimizda)/i;
for (const [tr, o] of [...Object.entries(EN.hizmetler), ...Object.entries(EN.kurumsal)]) {
  const slug = o.en.replace('/en/', '').replace(/\/$/, '');
  if (TR_IZ.test(slug)) uyari.push(`Türkçe kök izi var, çeviri atlanmış olabilir: ${tr} → ${o.en}`);
}

/* --- 5. kaynak dağılımı --- */
const kullanici = [...Object.values(EN.hizmetler), ...Object.values(EN.kurumsal)].filter((o) => o.kaynak === 'kullanıcı').length;
const oneri = [...Object.values(EN.hizmetler), ...Object.values(EN.kurumsal)].filter((o) => o.kaynak === 'öneri').length;

console.log('\n  İNGİLİZCE ADRES HARİTASI — DOĞRULAMA\n');
console.log(`  Türkçe haritanın ürettiği adres : ${trAdresler.size}`);
console.log(`  İngilizce karşılığı tanımlı     : ${enKapsam.size}`);
console.log(`  bunlardan kullanıcının verdiği  : ${kullanici}   ·   önerilen: ${oneri}`);

console.log(`\n  ── HATA: ${hata.length}`);
hata.forEach((x) => console.log('     ✗ ' + x));
if (!hata.length) console.log('     ✓ yok');

console.log(`\n  ── uyarı: ${uyari.length}`);
uyari.forEach((x) => console.log('     ~ ' + x));
if (!uyari.length) console.log('     ✓ Türkçe kök izi kalmamış');

console.log('\n  ── TR → EN eşlemesi ──');
const hepsi = [...Object.entries(EN.hizmetler), ...Object.entries(EN.kurumsal)]
  .sort((a, b) => a[0].localeCompare(b[0]));
hepsi.forEach(([tr, o]) => console.log(`     ${tr.padEnd(28)} → ${o.en.padEnd(36)}${o.kaynak === 'kullanıcı' ? '✓ verildi' : ''}`));

console.log(`\n  ── açık kararlar: ${EN._acik_kararlar.length}`);
EN._acik_kararlar.forEach((x) => console.log('     • ' + x));
console.log('');
process.exit(hata.length ? 1 : 0);
