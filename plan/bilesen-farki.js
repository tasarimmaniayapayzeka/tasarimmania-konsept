/* HİZMET SAYFALARINDA OLUP BLOG YAZILARINDA OLMAYAN BİLEŞENLER
 *
 * Kullanım: node plan/bilesen-farki.js
 *
 * Kullanıcı blog detay iç tasarımı için sunduğum beş düzeni beğenmedi.
 * Yeni yön önermeden önce sorulacak soru şu: hizmet sayfalarında ONAYLANMIŞ
 * ve YAPILMIŞ bileşenlerden kaç tanesi blog yazılarında hiç kullanılmıyor?
 *
 * ⚠ node -e ile yazılamaz: Windows yol ayracı ters bölü, kabuk kaçışları
 *   yiyor. [[node-e-yasagi]]
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');

const BILESEN = {
  '.akv — adım listesi + döngü videosu': /class="akv/,
  'Higgsfield döngü videosu (akis.mp4)': /akis\.mp4/,
  '.sd — kendi dönen soru paneli': /class="sd[ "]/,
  '.hrt — akan bağlantı haritası': /class="hrt/,
  '.ac3 — 3D akışkan CTA bandı': /ac3-zemin/,
  '.ciz-kutu — kendini çizen sahne': /class="ciz-kutu/,
  '--dfA — dönen kenar ışığı': /--dfA/,
  '.dtay — "daha fazla" açılırı': /class="dtay/,
  'hub-hero3d — etkileşimli 3 katman': /hub-hero3d|data-olay/,
};

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

const hepsi = tara(S).filter((f) => !yol(f).startsWith('/en/'));
const blog = hepsi.filter((f) => /^\/blog\/.+/.test(yol(f)));
const diger = hepsi.filter((f) => !/^\/blog\//.test(yol(f)));

console.log(`\n  Türkçe sayfa: ${hepsi.length}  ·  blog yazısı: ${blog.length}  ·  hizmet/kurumsal: ${diger.length}\n`);
console.log('  BİLEŞEN'.padEnd(42) + 'HİZMET      BLOG');
console.log('  ' + '─'.repeat(62));
let hicYok = 0;
for (const [ad, re] of Object.entries(BILESEN)) {
  const h = diger.filter((f) => re.test(fs.readFileSync(f, 'utf8'))).length;
  const b = blog.filter((f) => re.test(fs.readFileSync(f, 'utf8'))).length;
  if (h > 0 && b === 0) hicYok++;
  const isaret = h > 0 && b === 0 ? '  ← blogda HİÇ YOK' : '';
  console.log('  ' + ad.padEnd(40) + `${String(h).padStart(3)}/${diger.length}`.padEnd(12) + `${String(b).padStart(2)}/${blog.length}` + isaret);
}
console.log(`\n  Hizmet sayfasında VAR, blogda HİÇ YOK: ${hicYok} bileşen\n`);
