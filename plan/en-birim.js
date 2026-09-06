/* en-birim.js — İngilizce sayfalarda SAYAÇ ÇIKTISINI Türkçeden kurtarır.
 *
 * İki sızıntıyı kapatır. İkisi de kaynakta görünmez, yalnızca JS çalışınca
 * ekranda belirir — bu yüzden hiçbir metin denetimi yakalamadı:
 *
 *   1) data-birim  Sayaç JS'i  b.textContent = sayı + b.dataset.birim  yazıyor.
 *      Öznitelik çevrilmediği için <b>0 layers</b> yazan çip, canlanma
 *      bitince "3 katman" oluyor. Ölçüldü: 6 sayfa, 7 çip.
 *
 *   2) bicim()     Ondalık ayırıcıyı  .replace('.', ',')  ile Türkçeye
 *      çeviriyor. İngilizce sayfada "1.2s" olması gereken değer "1,2s"
 *      görünür. EN-DEVAM.md "Sayı ve para biçimi" kuralına aykırı.
 *
 * İngilizce birim UYDURULMAZ: <b> içindeki yedek metin zaten çevrilmiş
 * durumda ("0 layers"), baştaki sayı atılınca birim ortaya çıkıyor.
 * Böylece çip ile sayaç aynı kelimeyi söylüyor. Yedek metin sayıyla
 * başlamıyorsa dokunulmaz, rapora "ATLANDI" diye yazılır.
 *
 *   node plan/en-birim.js            # kuru koşu
 *   node plan/en-birim.js --uygula
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..', 'site', 'en');
const UYGULA = process.argv.includes('--uygula');

/* <u>ETİKET</u><b data-sayac="3" data-birim=" katman">0 layers</b> */
const CIP = /(<b\s[^>]*?data-birim=")([^"]*)("[^>]*>)([^<]*)(<\/b>)/g;
const TR_HARF = /[çğıöşüÇĞİÖŞÜ]/;

function sayfalar(dizin) {
  const cikti = [];
  for (const ad of fs.readdirSync(dizin)) {
    const tam = path.join(dizin, ad);
    if (fs.statSync(tam).isDirectory()) cikti.push(...sayfalar(tam));
    else if (ad === 'index.html') cikti.push(tam);
  }
  return cikti;
}

let degisenSayfa = 0, degisenCip = 0, atlanan = 0, bicimDuzeltilen = 0;
const rapor = [];

for (const dosya of sayfalar(KOK)) {
  const eski = fs.readFileSync(dosya, 'utf8');
  const kisa = '/' + path.relative(path.join(__dirname, '..', 'site'), dosya)
    .replace(/\\/g, '/').replace(/index\.html$/, '');
  const satirlar = [];

  let yeni = eski.replace(CIP, (tam, on, birimTR, orta, yedek, kapa) => {
    if (birimTR === '') return tam;                       /* birimsiz çip */
    /* Yedek metin: sayı + birim. Sayıyı at, kalan İngilizce birimdir. */
    const m = yedek.match(/^[\d.,]+(.*)$/);
    if (!m) { atlanan++; satirlar.push(`ATLANDI  yedek "${yedek}" sayıyla başlamıyor`); return tam; }
    const birimEN = m[1];
    if (birimEN === birimTR) return tam;                  /* zaten aynı */
    degisenCip++;
    satirlar.push(`data-birim  "${birimTR}" → "${birimEN}"   (çip: ${yedek})`);
    return on + birimEN + orta + yedek + kapa;
  });

  /* Ondalık ayırıcı: İngilizcede nokta kalır. */
  const ONDALIK = /(\.toFixed\(\d\))\.replace\('\.', ','\)/g;
  if (ONDALIK.test(yeni)) {
    yeni = yeni.replace(ONDALIK, '$1');
    bicimDuzeltilen++;
    satirlar.push(`bicim()     .replace('.', ',') kaldırıldı — ondalık nokta kalıyor`);
  }

  /* Statik ondalık virgül: >4,8< → >4.8<
   * Binlik ayırıcıyla karışmasın diye virgülden SONRA 1-2 hane şartı var.
   * Türkçede binlik grubu her zaman tam 3 hanedir (48.000 → 48,000), o
   * yüzden bu desen binliği asla yakalamaz. Ölçüldü: >48,000< dokunulmadı. */
  const ONDALIK_METIN = /(>\s*\d{1,3}),(\d{1,2}\s*<)/g;
  yeni = yeni.replace(ONDALIK_METIN, (t, on, arka) => {
    satirlar.push(`ondalık     "${t.slice(1, -1)}" → "${(on + '.' + arka).slice(1, -1)}"   (statik metin)`);
    return on + '.' + arka;
  });

  if (yeni !== eski) {
    degisenSayfa++;
    rapor.push({ kisa, satirlar });
    if (UYGULA) fs.writeFileSync(dosya, yeni);
  }
}

console.log('');
console.log(UYGULA ? '  UYGULANDI' : '  KURU KOŞU');
console.log('');
for (const r of rapor) {
  console.log(`  ${r.kisa}`);
  for (const s of r.satirlar) console.log(`     ${s}`);
}
if (!rapor.length) console.log('  ✓ düzeltilecek bir şey yok');
console.log('');
console.log(`  sayfa: ${degisenSayfa}  ·  çip: ${degisenCip}  ·  bicim(): ${bicimDuzeltilen}  ·  atlanan: ${atlanan}`);

/* Kalan Türkçe birim var mı — düzelttikten sonra sıfır olmalı. */
let kalan = 0;
for (const dosya of sayfalar(KOK)) {
  const h = fs.readFileSync(dosya, 'utf8');
  let m;
  const R = /data-birim="([^"]*)"/g;
  while ((m = R.exec(h))) if (TR_HARF.test(m[1])) kalan++;
}
console.log(`  Türkçe harf taşıyan data-birim (uygulama sonrası): ${kalan}`);
console.log('');
if (!UYGULA && degisenSayfa) console.log('  Uygulamak için: --uygula\n');
