/* TÜM göreli yolların çözülüp çözülmediğini denetler.
 *
 * Düz URL taşımasında 1.252 göreli yol yeniden yazıldı. Bir tanesi bile
 * yanlışsa görsel/CSS/video sessizce kırılır — sayfa yine açılır, hata
 * vermez. Bu yüzden taşımadan sonra her yol tek tek diskte aranır.
 *
 * Kapsam: href, src, srcset · HTML dosyalarının tamamı (site/ + kök 404).
 * Dış adresler (http, mailto, tel, data, #) atlanır.
 *
 * Kullanım: node plan/yol-butunlugu.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (/\.html$/.test(e.name)) o.push(p);
  }
  return o;
}

const dosyalar = tara(S).concat([path.join(KOK, '404.html')].filter(fs.existsSync));
let toplam = 0, kirik = 0, disAdres = 0;
const kiriklar = [];

for (const f of dosyalar) {
  const h = fs.readFileSync(f, 'utf8');
  const dizin = path.dirname(f);
  const adaylar = [];

  for (const m of h.matchAll(/\s(?:href|src)="([^"]+)"/g)) adaylar.push(m[1]);
  for (const m of h.matchAll(/\ssrcset="([^"]+)"/g))
    m[1].split(',').forEach((p) => adaylar.push(p.trim().split(/\s+/)[0]));

  for (const ham of adaylar) {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(ham)) { disAdres++; continue; }
    const govde = ham.replace(/[#?].*$/, '');
    if (!govde) continue;
    toplam++;
    const hedef = path.resolve(dizin, govde);
    const varMi = fs.existsSync(hedef)
      || fs.existsSync(path.join(hedef, 'index.html'));
    if (!varMi) {
      kirik++;
      if (kiriklar.length < 25)
        kiriklar.push(`${'/' + path.relative(S, f).split(path.sep).join('/')}  →  ${ham}`);
    }
  }
}

console.log('\n  YOL BÜTÜNLÜĞÜ DENETİMİ\n');
console.log(`  taranan HTML dosyası : ${dosyalar.length}`);
console.log(`  denetlenen göreli yol: ${toplam}`);
console.log(`  atlanan dış adres    : ${disAdres}`);
console.log(`\n  KIRIK YOL: ${kirik}`);
kiriklar.forEach((x) => console.log('     ✗ ' + x));
if (kirik > kiriklar.length) console.log(`     … ${kirik - kiriklar.length} tane daha`);
if (!kirik) console.log('     ✓ hepsi çözülüyor');
console.log('');
process.exit(kirik ? 1 : 0);
