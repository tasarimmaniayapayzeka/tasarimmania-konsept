/* İngilizce sürüm — hreflang etiketleri (Modül 8)
 *
 * KARAR (kullanıcı, 6 Eyl 2026): İngilizce sürüm `/en/` ALT DİZİNİNDE duracak.
 * Gerekçe sitenin kendi çok dilli SEO sayfasıyla aynı: alt dizin ana alan
 * adının otoritesini devralır; ccTLD her uzantı için otoriteyi sıfırdan
 * biriktirmeyi gerektirir.
 *
 * ⚠ EN ÖNEMLİ KURAL — VAR OLMAYAN SAYFAYA hreflang KONMAZ. Etiket, karşılığı
 *   henüz üretilmemiş bir adrese işaret ederse Google 404 görür ve dil
 *   eşlemesinin TAMAMINI yok sayar. Bu yüzden betik her TR sayfası için
 *   `site/en/<yol>/index.html` dosyasının VARLIĞINI kontrol eder; yoksa o
 *   sayfaya etiket koymaz ve raporda "karşılığı yok" diye sayar.
 *
 * ⚠ KARŞILIKLILIK ŞART: hreflang tek yönlü çalışmaz. Bir TR sayfası EN'e
 *   işaret ediyorsa, EN sayfası da TR'ye işaret etmeli. Betik her iki tarafa
 *   da yazar; tek taraflı bırakmaz.
 *
 * x-default: TR sürüm (ana pazar Türkiye).
 *
 * Kullanım: node plan/en-hreflang.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const EN = path.join(S, 'en');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* TR sayfaları: site/ altındaki her şey, site/en/ HARİÇ */
const trSayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000)
  .filter((f) => !yol(f).startsWith('/en/'));

/* ⚠ İNGİLİZCE ADRES HARİTADAN OKUNUR — "/en" + Türkçe yol DEĞİL.
   Ölçülmüş hata: adresler çevrilmiş slug kullanıyor (/iletisim/ → /en/contact/).
   Naif kural yalnız ana sayfada doğru çıkıyordu (/ → /en/); iletişim sayfası
   "karşılığı yok" sayılıp hreflang'sız kaldı ve İngilizce tarafa da hiç
   yazılmadı. Harita: plan/en-url-haritasi.json (sayfa-turu.js ile aynı kaynak). */
const HARITA = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
const TR_EN = new Map([['/', '/en/']]);
/* ⚠ BÖLÜM ADI SABİTLENMESİN — blog bölümü eklenince buraya girmiyordu. */
for (const [bolum, girdiler] of Object.entries(HARITA)) {
  if (bolum.startsWith('_') || typeof girdiler !== 'object') continue;
  for (const [tr, o] of Object.entries(girdiler)) {
    if (tr.startsWith('_')) continue;
    if (o && typeof o === 'object' && o.en) TR_EN.set(tr, o.en);
  }
}
const EN_TR = new Map([...TR_EN].map(([a, b]) => [b, a]));
/* ⚠ "AYNI SLUG" VARSAYIMI KALDIRILDI. Blog slug'ları artık haritada ve
 * Türkçenin çevirisi DEĞİL (odak kelimeden türetildi). Eski varsayım
 * /en/blog/web-sitesine-chatbot-eklemek/ gibi HİÇ VAR OLMAYACAK adreslere
 * hreflang yazardı — karşılıklılık ilkesinin tam tersi. */
const enKarsiligi = (trYol) => TR_EN.get(trYol) || null;
const trKarsiligi = (enYol) => EN_TR.get(enYol) || null;

function hreflangBlogu(trYol) {
  const enYol = enKarsiligi(trYol);
  return '<link rel="alternate" hreflang="tr" href="' + KANONIK + trYol + '">\n'
    + '<link rel="alternate" hreflang="en" href="' + KANONIK + enYol + '">\n'
    + '<link rel="alternate" hreflang="x-default" href="' + KANONIK + trYol + '">';
}

let yazilan = 0, karsiliksiz = 0, temizlenen = 0;
const eksikler = [];

for (const f of trSayfalar) {
  const t = yol(f);
  const enY = enKarsiligi(t);
  const varMi = !!enY && fs.existsSync(path.join(S, enY.replace(/^\//, ''), 'index.html'));
  let h = fs.readFileSync(f, 'utf8');
  const once = h;

  /* önce var olan hreflang satırlarını temizle — yeniden kurulacak */
  h = h.replace(/\n?<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '');

  if (varMi) {
    const capa = h.match(/<link rel="canonical"[^>]*>/);
    if (!capa) { eksikler.push(t + ' — canonical yok, hreflang eklenemedi'); continue; }
    h = h.replace(capa[0], capa[0] + '\n' + hreflangBlogu(t));
    yazilan++;
  } else {
    karsiliksiz++;
    eksikler.push(t);
  }
  if (h !== once) {
    if (h.length < once.length && !varMi) temizlenen++;
    if (UYGULA) fs.writeFileSync(f, h, 'utf8');
  }
}

/* EN tarafı: karşılığı olan her EN sayfasına da aynı blok */
let enYazilan = 0;
for (const f of tara(EN).filter((x) => fs.statSync(x).size >= 2000)) {
  const enY = yol(f);                       /* /en/... */
  const trY = trKarsiligi(enY);
  if (!trY || !fs.existsSync(path.join(S, trY === '/' ? '' : trY.replace(/^\//, ''), 'index.html'))) {
    eksikler.push(enY + ' — Türkçe karşılığı haritada/diskte yok');
    continue;
  }
  let h = fs.readFileSync(f, 'utf8');
  const once = h;
  h = h.replace(/\n?<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '');
  const capa = h.match(/<link rel="canonical"[^>]*>/);
  if (!capa) { eksikler.push(enY + ' — canonical yok'); continue; }
  h = h.replace(capa[0], capa[0] + '\n' + hreflangBlogu(trY));
  enYazilan++;
  if (h !== once && UYGULA) fs.writeFileSync(f, h, 'utf8');
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — hreflang (tr · en · x-default)\n`);
console.log(`  TR sayfası            : ${trSayfalar.length}`);
console.log(`  İngilizce karşılığı VAR: ${yazilan}   → hreflang yazıldı`);
console.log(`  İngilizce karşılığı YOK: ${karsiliksiz}   → etiket KONULMADI (404'e işaret etmesin)`);
console.log(`  EN tarafına yazılan    : ${enYazilan}   (karşılıklılık)`);
if (karsiliksiz && karsiliksiz <= 8) { console.log('\n  Karşılığı olmayanlar:'); eksikler.slice(0, 8).forEach((x) => console.log('    ' + x)); }
else if (karsiliksiz) console.log(`\n  (${karsiliksiz} sayfanın İngilizcesi henüz üretilmedi)`);
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
