/* Altbilgi başlıkları: <h5> → <h3>
 *
 * Başlık hiyerarşisinde H2'den H5'e atlama vardı; rehberin 2. modülü bunu
 * kırık sayıyor. Etiket değişince `.ftr h5` kuralı eşleşmediği için biçim
 * bozuluyor — seçici de birlikte genişletiliyor (ölçülmüş tuzak).
 *
 * Kullanım: node plan/altbilgi-h3.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}

let n = 0;
for (const f of tara(S).filter((x) => fs.statSync(x).size >= 2000)) {
  let h = fs.readFileSync(f, 'utf8');
  const once = h;
  const ft = h.lastIndexOf('<footer');
  if (ft > 0) {
    const bas = h.slice(0, ft), son = h.slice(ft).replace(/<(\/?)h5>/g, '<$1h3>');
    h = bas + son;
  }
  /* ⚠ İKİNCİ KOŞUDA GENİŞLEME TEKRAR ETMESİN: ".ft-col h5" dizgesi genişletilmiş
     seçicinin İÇİNDE de duruyor, koşulsuz replace her koşuda bir kopya daha
     ekliyordu (".ft-col h3,.ft-col h3,.ft-col h5" ölçüldü). */
  h = h.replace(/\.ftr h5\b/g, '.ftr h3');
  if (!/\.ft-col h3,\.ft-col h5/.test(h)) h = h.replace(/\.ft-col h5\b/g, '.ft-col h3,.ft-col h5');
  if (h !== once) {
    n++;
    console.log('  ✓ /' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, ''));
    if (UYGULA) fs.writeFileSync(f, h, 'utf8');
  }
}
console.log(`\n  ${n} sayfa ${UYGULA ? 'düzeltildi' : 'düzeltilecek'}` + (UYGULA ? '' : '  —  --uygula ile uygulayın'));
