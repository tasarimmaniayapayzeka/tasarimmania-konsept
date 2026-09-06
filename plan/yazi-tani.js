/* Denetim "edilgen %12" der; hangi CÜMLE olduğunu söylemez. Bu betik söyler.
 * seo-denetim.js ile aynı mantığı kullanır — kopya tutmamak için deseni oradan okur.
 *
 * Kullanım: node plan/yazi-tani.js <site/blog/slug/index.html>
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const hedef = process.argv[2];
if (!hedef) { console.error('kullanım: node plan/yazi-tani.js <yazi/index.html>'); process.exit(2); }
const ham = fs.readFileSync(path.isAbsolute(hedef) ? hedef : path.join(KOK, hedef), 'utf8');

const BLOK = 'p|h[1-6]|li|td|th|summary|blockquote|div|section|article|figcaption|cite|ol|ul|details|dt|dd|nav|main|footer|header|tr|table|aside';
const metinBloklu = (h) => h
  .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(new RegExp('</(?:' + BLOK + ')>', 'gi'), ' ¶ ').replace(/<br\s*\/?>/gi, ' ¶ ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const kelimeler = (t) => t.split(/\s+/).filter((w) => /[\wçğıöşüÇĞİÖŞÜ]/.test(w));

const govdeHtml = ham.slice(ham.indexOf('<article'), ham.lastIndexOf('</article>') + 10);
const cumleler = metinBloklu(govdeHtml).split(/(?<=[.!?])\s+|\s*¶\s*/).filter((c) => kelimeler(c).length > 2);

/* Edilgen desenini KAYNAKTAN oku — kopyasını tutmak, aracın değiştiğini görmemek olur */
const src = fs.readFileSync(path.join(__dirname, 'seo-denetim.js'), 'utf8');
const b = src.indexOf('<EDİLGEN-BLOK-BAŞLA>'), s = src.indexOf('<EDİLGEN-BLOK-BİTİR>');
if (b < 0 || s < 0) { console.error('✗ seo-denetim.js içindeki edilgen blok nişanları bulunamadı'); process.exit(2); }
/* nişanlar yorum içinde: açılış yorumu kapandıktan sonra başla, bitiş yorumundan önce dur */
const kod = src.slice(src.indexOf('*/', b) + 2, src.lastIndexOf('/*', s));
const edilgenVar = new Function(kod + '\nreturn edilgenVar;')();
const edilgenRe = new Function(kod + '\nreturn edilgenRe;')();
const YETERLILIK = new Function(kod + '\nreturn YETERLILIK;')();
const SOZLUKSEL = new Function(kod + '\nreturn SOZLUKSEL;')();

const tavanE = Math.floor(cumleler.length * 0.10);
const tavanU = Math.floor(cumleler.length * 0.20);
console.log(`\n  ${cumleler.length} cümle · edilgen tavanı ${tavanE} · uzun cümle tavanı ${tavanU}\n`);

console.log('■ EDİLGEN');
let n = 0;
for (const c of cumleler) {
  if (!edilgenVar(c)) continue;
  const t = c.replace(YETERLILIK, 'ir').replace(SOZLUKSEL, 'X');
  edilgenRe.lastIndex = 0;
  console.log(`  ${String(++n).padStart(2)}. <${(t.match(edilgenRe) || []).join(', ')}>  ${c.slice(0, 88)}`);
}
console.log(`  = ${n}${n > tavanE ? `  → ${n - tavanE} tanesi etkene çevrilmeli` : '  ✓'}`);

console.log('\n■ 15+ KELİMELİK CÜMLE');
let u = 0;
for (const c of cumleler) {
  const k = kelimeler(c).length;
  if (k < 15) continue;
  console.log(`  ${String(++u).padStart(2)}. [${k}] ${c.slice(0, 88)}`);
}
console.log(`  = ${u}${u > tavanU ? `  → ${u - tavanU} tanesi bölünmeli` : '  ✓'}`);

console.log('\n■ ARDIŞIK AYNI KELİME');
let a = 0;
for (let j = 1; j < cumleler.length; j++) {
  const x = kelimeler(cumleler[j - 1])[0], y = kelimeler(cumleler[j])[0];
  if (!x || !y || x.toLowerCase() !== y.toLowerCase()) continue;
  a++;
  console.log(`  «${x}»\n     1) ${cumleler[j - 1].slice(0, 78)}\n     2) ${cumleler[j].slice(0, 78)}`);
}
if (!a) console.log('  yok ✓');
console.log('');
