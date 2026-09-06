/* Yanlış eklenmiş kaynak cümlesini yapılandırmadan çıkarır.
 * geo-onar-13-kaynak.js iki cümleyi eşik bozacak biçimde yazmıştı; düzeltilmiş
 * sürümün yeniden eklenebilmesi için önce eskisi silinmeli (betik "zaten dış
 * bağ var" görüp atlıyor).
 *
 * Kullanım: node plan/kaynak-cumle-degistir.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const UYGULA = process.argv.includes('--uygula');

const SIL = [
  ['yazi-05-react-native-flutter.json', 'İki çatının sürüm politikası açık;'],
  ['yazi-13-yapay-zeka-video.json', 'Üretilen sahne de reklam sayılır;'],
];

for (const [dosya, bas] of SIL) {
  const p = path.join(__dirname, dosya);
  const ham = fs.readFileSync(p, 'utf8');
  const C = JSON.parse(ham);
  let bulundu = false;
  for (const b of C.yazi.bolumler) {
    const i = b.govde.indexOf(bas);
    if (i < 0) continue;
    /* cümle, kendisinden sonraki ilk "duyurur.</p>" / "yasaklar.</p>" ile biter */
    const son = b.govde.indexOf('</p>', i);
    if (son < 0) continue;
    b.govde = (b.govde.slice(0, i) + b.govde.slice(son)).replace(/\s+<\/p>/, '</p>');
    bulundu = true;
    console.log(`  ✓ ${dosya} — eski cümle çıkarıldı`);
    break;
  }
  if (!bulundu) { console.log(`  · ${dosya} — cümle bulunamadı, atlandı`); continue; }
  if (UYGULA) fs.writeFileSync(p, JSON.stringify(C, null, 2) + '\n', 'utf8');
}
console.log(UYGULA ? '\n  UYGULANDI\n' : '\n  Uygulamak için: --uygula\n');
