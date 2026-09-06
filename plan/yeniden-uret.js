/* Belirtilen slug'ların (yoksa hepsinin) HTML'ini blog-uret.js ile yeniden üretir.
 *
 * ⚠ ÜRETİMDEN SONRA `node plan/onarim-turu.js --uygula` KOŞULMALI: şema
 *   grafiği, WebSite/WebPage, knowsAbout, subjectOf, Person ve fetchpriority
 *   üretici çıktısının ÜZERİNE uygulanıyor, üretim onları siler.
 *
 * Kullanım:
 *   node plan/yeniden-uret.js                      (kayıtlı tüm yazı)
 *   node plan/yeniden-uret.js slug1 slug2 ...      (seçili)
 */
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');

const istenen = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const dosyalar = fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f));

let n = 0; const hata = [];
console.log('');
for (const f of dosyalar) {
  const C = JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8'));
  if (istenen.length && !istenen.includes(C.slug)) continue;
  try {
    execFileSync('node', [path.join(__dirname, 'blog-uret.js'), path.join(__dirname, f)],
      { encoding: 'utf8', maxBuffer: 1 << 24 });
    n++;
    console.log(`  ✓ ${C.slug}`);
  } catch (e) {
    hata.push(`${C.slug}: ${String(e.message).slice(0, 100)}`);
    console.log(`  ✗ ${C.slug}`);
  }
}
console.log(`\n  ${n} yazı yeniden üretildi`);
if (hata.length) { console.log('\n  HATA:'); hata.forEach((x) => console.log('    ' + x)); }
console.log('\n  ŞİMDİ: node plan/onarim-turu.js --uygula\n');
process.exit(hata.length ? 1 : 0);
