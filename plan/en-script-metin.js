/* SCRIPT İÇİNDEKİ GÖRÜNÜR METİN — çıkarıcının kör noktası.
 *
 * ⚠ ÖLÇÜLMÜŞ KAÇAK: en-metin-cikar.js <script> bloklarını tamamen maskeliyor
 *   (haklı olarak — kod çevrilmez). Ama bazı script'ler EKRANDA GÖRÜNEN veri
 *   taşıyor. Ana sayfadaki seoWidget'ta 5 Türkçe anahtar kelime bir dizide
 *   duruyor ve innerHTML ile basılıyor:
 *       { k: 'kurumsal web tasarım istanbul', p: 8, tgt: 1 }
 *   Tarayıcı doğrulamasında "kalanTurkce" olarak yakalandı.
 *
 * Bu araç script bloklarındaki dizge sabitlerini tarar ve İNSAN METNİ
 * olanları ayırır. Kod dizgeleri (seçici, sınıf adı, olay adı, birim) elenir.
 *
 * Kullanım: node plan/en-script-metin.js            → tüm TR sayfaları tara
 *           node plan/en-script-metin.js --json     → C:/Temp/en-script.json
 */
const fs = require('fs'), path = require('path');
const { scriptBloklari, gorunurDizgeler } = require('./en-script-suzgec.js');
const S = path.join(__dirname, '..', 'site');
const JSON_CIKTI = process.argv.includes('--json');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name.endsWith('.html')) o.push(p);
  }
  return o;
}
const sayfalar = tara(S)
  .filter((f) => !path.relative(S, f).startsWith('en' + path.sep));

const bulgular = new Map();   /* dizge → { sayfalar:Set, ornek } */
let scriptSayisi = 0;

for (const f of sayfalar) {
  const h = fs.readFileSync(f, 'utf8');
  const rel = '/' + path.relative(S, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const blok of scriptBloklari(h)) {
    scriptSayisi++;
    for (const d of gorunurDizgeler(blok.kod)) {
      if (!bulgular.has(d)) bulgular.set(d, { sayfalar: new Set(), ornek: rel });
      bulgular.get(d).sayfalar.add(rel);
    }
  }
}

const sirali = [...bulgular.entries()]
  .map(([metin, v]) => ({ metin, sayfaSayisi: v.sayfalar.size, sayfalar: [...v.sayfalar].sort() }))
  .sort((a, b) => b.sayfaSayisi - a.sayfaSayisi || a.metin.localeCompare(b.metin, 'tr'));

console.log('\n  SCRIPT İÇİ GÖRÜNÜR METİN TARAMASI\n');
console.log(`  taranan sayfa   : ${sayfalar.length}`);
console.log(`  taranan script  : ${scriptSayisi}`);
console.log(`  insan metni     : ${sirali.length} ayrı dizge\n`);
if (!sirali.length) console.log('     ✓ script içinde çevrilecek metin yok');
else sirali.forEach((b) => {
  const yer = b.sayfaSayisi === 1 ? b.sayfalar[0] : `${b.sayfaSayisi} sayfa`;
  console.log(`     · ${String(yer).padEnd(26)} "${b.metin.slice(0, 66)}"`);
});
console.log('');

if (JSON_CIKTI) {
  fs.mkdirSync('C:/Temp', { recursive: true });
  fs.writeFileSync('C:/Temp/en-script.json', JSON.stringify(sirali, null, 2), 'utf8');
  console.log('  → C:/Temp/en-script.json\n');
}
