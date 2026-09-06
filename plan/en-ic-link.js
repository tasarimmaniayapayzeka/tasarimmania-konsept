/* İngilizce sayfalardaki iç bağlantıları İngilizce karşılığına çevirir —
 * YALNIZ karşılığı DİSKTE VARSA.
 *
 * ⚠ NEDEN GEREKLİ: en-sayfa-uret.js göreli yolları yeni derinliğe göre yeniden
 *   yazıyor, ama HEDEFİ değiştirmiyor. Sonuç: /en/ ana sayfasındaki 9 iç
 *   hedefin dokuzu da Türkçe sayfaya gidiyordu (ölçüldü). "Services"e tıklayan
 *   İngilizce ziyaretçi Türkçe /hizmetler/ sayfasına düşüyordu.
 *
 * ⚠ OLMAYAN SAYFAYA İŞARET EDİLMEZ. hreflang'daki ilkenin aynısı: İngilizcesi
 *   henüz üretilmemiş bir sayfaya bağlantı vermek 404 üretir. Bu yüzden araç
 *   her turdan sonra yeniden çalıştırılır; yeni sayfa geldikçe ona giden
 *   bağlantılar kendiliğinden İngilizceye döner.
 *
 * Kullanım: node plan/en-ic-link.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

const E = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
/* Türkçe adres → İngilizce adres */
const TR_EN = new Map([['/', '/en/']]);
for (const grup of ['hizmetler', 'kurumsal'])
  for (const [tr, o] of Object.entries(E[grup] || {})) if (o && o.en) TR_EN.set(tr, o.en);
/* blog yazıları: /blog/<slug>/ → /en/blog/<slug>/ (slug çeviri turunda belirlenir;
   harita yoksa aynı slug varsayılır ve yalnız DİSKTE VARSA kullanılır) */

const varMi = (siteYolu) => fs.existsSync(path.join(S, siteYolu.replace(/^\//, ''), 'index.html'));

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name.endsWith('.html')) o.push(p);
  }
  return o;
}
const enSayfalar = tara(path.join(S, 'en'));
if (!enSayfalar.length) { console.log('\n  İngilizce sayfa yok — yapılacak bir şey yok\n'); process.exit(0); }

let toplamCevrilen = 0;
const kalanTR = new Map();      /* hâlâ Türkçeye giden hedef → kaç bağlantı */
const rapor = [];

for (const f of enSayfalar) {
  let h = fs.readFileSync(f, 'utf8');
  const dizin = path.dirname(f);
  let cevrilen = 0;

  const cevir = (ham) => {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(ham)) return ham;
    const [g, ek] = [ham.replace(/[#?].*$/, ''), (ham.match(/[#?].*$/) || [''])[0]];
    if (!g) return ham;
    /* göreli yolu site köküne göre mutlak hâle getir.
       ⚠ path.resolve SONDAKİ EĞİK ÇİZGİYİ DÜŞÜRÜR: "../hizmetler/" → ".../hizmetler".
       Sayfa mı varlık dosyası mı ayrımını bu çizgiyle yapıyorduk; kaynaktaki
       g'ye bakılmazsa her sayfa "varlık" sanılıp atlanıyor (ölçüldü: 0 bağlantı
       çevrildi, oysa 9 hedef Türkçeydi). Ayrım artık ham yoldan yapılıyor. */
    const sayfaMi = g.endsWith('/') || /index\.html$/.test(g);
    if (!sayfaMi) return ham;                                 /* varlık dosyası (css/img) */
    let dizinYolu = '/' + path.relative(S, path.resolve(dizin, g)).split(path.sep).join('/')
      .replace(/index\.html$/, '');
    if (!dizinYolu.endsWith('/')) dizinYolu += '/';
    if (dizinYolu.startsWith('/en/')) return ham;             /* zaten İngilizce */

    /* İngilizce karşılığı: haritadan ya da /blog/ için önek ekleyerek */
    const enYol = TR_EN.get(dizinYolu)
      || (/^\/blog\//.test(dizinYolu) ? '/en' + dizinYolu : null);
    if (!enYol || !varMi(enYol)) {
      kalanTR.set(dizinYolu, (kalanTR.get(dizinYolu) || 0) + 1);
      return ham;
    }
    let r = path.relative(dizin, path.join(S, enYol.replace(/^\//, ''))).split(path.sep).join('/');
    if (!r.startsWith('.')) r = './' + r;
    if (!r.endsWith('/')) r += '/';
    cevrilen++;
    return r + ek;
  };

  const yeni = h.replace(/(\s(?:href)=")([^"]+)(")/g, (t, a, v, b) => a + cevir(v) + b);
  if (cevrilen) {
    rapor.push({ sayfa: '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, ''), cevrilen });
    toplamCevrilen += cevrilen;
    if (UYGULA) fs.writeFileSync(f, yeni, 'utf8');
  }
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — İngilizce sayfalarda iç bağlantı\n`);
console.log(`  İngilizce sayfa      : ${enSayfalar.length}`);
console.log(`  İngilizceye çevrilen : ${toplamCevrilen}`);
rapor.forEach((r) => console.log(`     ${r.sayfa}  ${r.cevrilen} bağlantı`));
console.log(`\n  HÂLÂ TÜRKÇEYE GİDEN  : ${[...kalanTR.values()].reduce((a, b) => a + b, 0)} bağlantı · ${kalanTR.size} ayrı hedef`);
console.log('  (İngilizcesi henüz üretilmedi — bilerek dokunulmadı, 404 üretmesin)');
[...kalanTR.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)
  .forEach(([y, n]) => console.log(`     ${String(n).padStart(3)}× → ${y}`));
if (!UYGULA && toplamCevrilen) console.log('\n  Uygulamak için: --uygula');
console.log('');
