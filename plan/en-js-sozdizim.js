/* Üretilen sayfadaki her <script> bloğunu SÖZDİZİMİ açısından denetler.
 *
 * ⚠ ÖLÇÜLMÜŞ BOZULMA (7 Eyl 2026): İngilizce çeviri tek tırnaklı bir JS
 *   dizgesinin içine yazıldı ve içindeki kesme işareti dizgeyi erken kapattı:
 *       ', talebiniz bize ulaştı. "'   →   ', we've received your enquiry…'
 *   Blok sözdizimi hatası verdi, sayfadaki TÜM widget'lar sessizce öldü.
 *   Tarayıcı konsolu bu hatayı geç yükleme yüzünden göstermedi; ancak
 *   TR sayfayla karşılaştırınca fark edildi (5 satır → 0 satır).
 *
 * Kullanım: node plan/en-js-sozdizim.js [site-alt-yolu]
 *           node plan/en-js-sozdizim.js en           → yalnız /en/ altı
 *           node plan/en-js-sozdizim.js              → tüm site
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const S = path.join(__dirname, '..', 'site');
const ALT = process.argv[2] || '';

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name.endsWith('.html')) o.push(p);
  }
  return o;
}
const kok = path.join(S, ALT);
if (!fs.existsSync(kok)) { console.error('  ✗ yol yok: ' + kok); process.exit(2); }
const sayfalar = tara(kok);

let blokSayisi = 0; const hatalar = [];
for (const f of sayfalar) {
  const h = fs.readFileSync(f, 'utf8');
  const rel = path.relative(S, f).replace(/\\/g, '/');
  let i = 0;
  for (const m of h.matchAll(/<script(?![^>]*(?:application\/ld\+json|src=))[^>]*>([\s\S]*?)<\/script>/gi)) {
    const kod = m[1];
    if (!kod.trim()) continue;
    blokSayisi++; i++;
    try { new vm.Script(kod, { filename: `${rel}#${i}` }); }
    catch (e) {
      /* hatanın satırını kaynaktaki gerçek satıra çevir */
      const oncekiSatir = h.slice(0, m.index).split('\n').length;
      const yerel = +(String(e.stack).match(/#\d+:(\d+)/) || [, 0])[1];
      hatalar.push({ rel, blok: i, satir: oncekiSatir + yerel, mesaj: e.message,
        parca: (kod.split('\n')[yerel - 1] || '').trim().slice(0, 110) });
    }
  }
  /* ld+json de bozulmuş olabilir — aynı değiştirme onu da vurur */
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    blokSayisi++;
    try { JSON.parse(m[1]); }
    catch (e) { hatalar.push({ rel, blok: 'ld+json', satir: h.slice(0, m.index).split('\n').length, mesaj: e.message, parca: '' }); }
  }
}

console.log('\n  JS + JSON SÖZDİZİMİ DENETİMİ\n');
console.log(`  sayfa : ${sayfalar.length}`);
console.log(`  blok  : ${blokSayisi}`);
console.log(`\n  HATA: ${hatalar.length}\n`);
if (!hatalar.length) console.log('     ✓ her blok ayrıştırılıyor');
else hatalar.forEach((x) => {
  console.log(`     ✗ ${x.rel} · blok ${x.blok} · satır ~${x.satir}`);
  console.log(`       ${x.mesaj}`);
  if (x.parca) console.log(`       → ${x.parca}`);
});
console.log('');
process.exit(hatalar.length ? 1 : 0);
