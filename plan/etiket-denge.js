/* HTML etiket denge denetimi — yapısal düzenlemelerden sonra koşulur.
 *
 * Etiket dönüştüren betikler (div→aside, ul→dl, section→aside) kapanış
 * etiketini de doğru yerde değiştirmek zorunda. Yanlış kapanış tarayıcıda
 * sessizce "düzeltilir" ve hata geç fark edilir. Bu betik açılış/kapanış
 * sayısını karşılaştırır.
 *
 * Kullanım: node plan/etiket-denge.js
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}

const ETIKETLER = ['div', 'section', 'aside', 'article', 'main', 'figure', 'figcaption',
  'dl', 'dt', 'dd', 'ul', 'ol', 'li', 'nav', 'header', 'footer', 'blockquote', 'cite'];
/* dt ve dd kapanışı isteğe bağlıdır (HTML5); dengesizlik hata sayılmaz */
const ISTEGE_BAGLI = new Set(['dt', 'dd', 'li']);

const dosyalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
let hata = 0, uyari = 0;

for (const f of dosyalar) {
  const h = fs.readFileSync(f, 'utf8');
  for (const t of ETIKETLER) {
    const a = (h.match(new RegExp('<' + t + '(?=[\\s/>])', 'gi')) || []).length;
    const k = (h.match(new RegExp('</' + t + '\\s*>', 'gi')) || []).length;
    if (a === k) continue;
    const yol = '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
    if (ISTEGE_BAGLI.has(t)) { uyari++; continue; }
    hata++;
    console.log(`  ✗ ${yol.padEnd(48)} <${t}>  ${a} açılış / ${k} kapanış`);
  }
}
console.log(hata ? `\n  ${hata} dengesizlik` : `\n  ✓ ${dosyalar.length} sayfada tüm etiketler dengeli`
  + (uyari ? `  (isteğe bağlı kapanış: ${uyari} yerde)` : ''));
process.exit(hata ? 1 : 0);
