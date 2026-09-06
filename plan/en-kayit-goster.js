/* Çıkarım kayıtlarını gösterir — çeviri yazarken ve numara kayması var mı
 * diye bakarken kullanılır.
 *
 * Kullanım: node plan/en-kayit-goster.js <ad> [tür|no-no]
 *   node plan/en-kayit-goster.js anasayfa script      → yalnız script kayıtları
 *   node plan/en-kayit-goster.js anasayfa 420-441     → numara aralığı
 *   node plan/en-kayit-goster.js anasayfa             → hepsi
 */
const fs = require('fs');
const AD = process.argv[2];
const SUZ = process.argv[3] || '';
if (!AD) { console.error('  kullanım: node plan/en-kayit-goster.js <ad> [tür|no-no]'); process.exit(2); }

const p = `C:/Temp/en-${AD}.json`;
if (!fs.existsSync(p)) { console.error('  ✗ çıkarım dosyası yok: ' + p); process.exit(2); }
const { kayitlar } = JSON.parse(fs.readFileSync(p, 'utf8'));

let sec = kayitlar;
const aralik = SUZ.match(/^(\d+)-(\d+)$/);
if (aralik) sec = kayitlar.filter((k) => k.no >= +aralik[1] && k.no <= +aralik[2]);
else if (SUZ) sec = kayitlar.filter((k) => k.tur === SUZ);

console.log(`\n  ${AD} — ${sec.length}/${kayitlar.length} kayıt\n`);
for (const k of sec)
  console.log(`  ${String(k.no).padStart(3)}. [${k.tur}/${k.baglam}] ${k.metin}`);
console.log('');
