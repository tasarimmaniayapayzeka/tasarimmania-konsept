/* GÖRECELİ VARLIK YOLU — DERİNLİK ONARIMI
 *
 * Kullanım: node plan/varlik-derinlik-onar.js [--uygula]
 *
 * HATA: İngilizce sayfalar Türkçe sayfaların BAYT KOPYASI olarak üretildi.
 * Yöntem doğru — ama Türkçe sayfa /site/hizmetler/ (1 kat), İngilizcesi
 * /site/en/services/ (2 kat) derinlikte. Göreli yol birebir kopyalanınca
 * bir kat EKSİK kalıyor:
 *     TR  /site/hizmetler/     + ../../assets/x  →  /assets/x        ✓
 *     EN  /site/en/services/   + ../../assets/x  →  /site/assets/x   ✗
 * Bu, hafızadaki "assetsRel = depth+1" tuzağının İngilizce sürümdeki
 * tekrarı.
 *
 * ⚠ NEDEN ÖNCEKİ DENETİMLER YAKALAMADI: yol bütünlüğü taraması yerel
 *   sunucu semantiğiyle çalışıyor ve `poster` özniteliğini listesinde
 *   tutmuyordu. Yerel sunucu kökü aşan `../`'yi kökte durdurduğu için
 *   "çözülüyor" diyordu.
 *
 * YÖNTEM: kırık her yol için 1..4 kat daha yukarı denenir; TAM OLARAK BİR
 * derinlik dosyaya denk geliyorsa yazılır. Birden fazla ya da hiçbiri
 * çözmüyorsa DOKUNULMAZ ve raporda listelenir — tahmin yapılmaz.
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

/* hangi öznitelikler varlık gösterir */
const OZNITELIK = /\b(poster|src|href)="((?:\.\.?\/)[^"]*\.(?:jpg|jpeg|png|webp|gif|svg|mp4|webm|avif|ico))"/g;

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name.endsWith('.html')) o.push(p);
  }
  return o;
}
const sayfaYolu = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* göreli yolu depo kökü semantiğiyle çöz (kökü aşarsa null) */
function coz(sayfaDosyasi, gorece) {
  const yigin = path.relative(KOK, path.dirname(sayfaDosyasi)).split(path.sep).filter(Boolean);
  for (const p of gorece.split('/')) {
    if (p === '..') { if (!yigin.length) return null; yigin.pop(); }
    else if (p !== '.' && p !== '') yigin.push(p);
  }
  return path.join(KOK, ...yigin);
}

let kirik = 0, onarilan = 0, cozulemeyen = [], belirsiz = [];
const ornek = [];

for (const f of tara(S)) {
  let h = fs.readFileSync(f, 'utf8'), degisti = false;
  h = h.replace(OZNITELIK, (tam, oz, deger) => {
    const hedef = coz(f, deger);
    if (hedef && fs.existsSync(hedef)) return tam;      // sağlam
    kirik++;
    /* 1..4 kat daha yukarı dene */
    const calisan = [];
    for (let n = 1; n <= 4; n++) {
      const aday = '../'.repeat(n) + deger.replace(/^(\.\.\/)+/, '');
      const c = coz(f, aday);
      if (c && fs.existsSync(c)) calisan.push(aday);
    }
    if (calisan.length === 0) { cozulemeyen.push(`${sayfaYolu(f)}  ${oz}="${deger}"`); return tam; }
    if (calisan.length > 1) { belirsiz.push(`${sayfaYolu(f)}  ${oz}="${deger}"  →  ${calisan.join(' | ')}`); return tam; }
    onarilan++; degisti = true;
    if (ornek.length < 4) ornek.push(`${sayfaYolu(f)}\n      ${oz}: ${deger}  →  ${calisan[0]}`);
    return `${oz}="${calisan[0]}"`;
  });
  if (degisti && UYGULA) fs.writeFileSync(f, h);
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU (yazılmadı)'}\n`);
console.log(`  kırık göreli varlık yolu : ${kirik}`);
console.log(`  ONARILAN                 : ${onarilan}`);
console.log(`  hiçbir derinlik çözmüyor : ${cozulemeyen.length}${cozulemeyen.length ? '\n    ' + cozulemeyen.join('\n    ') : ''}`);
console.log(`  BELİRSİZ (birden çok)    : ${belirsiz.length}${belirsiz.length ? '\n    ' + belirsiz.join('\n    ') : ''}`);
if (ornek.length) console.log(`\n  örnek:\n    ` + ornek.join('\n    '));
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
