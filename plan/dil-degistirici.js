/* DİL DEĞİŞTİRİCİ — 154 sayfaya TR/EN geçiş düğmesi
 *
 * Kullanım: node plan/dil-degistirici.js [--uygula]
 * Kuru koşu varsayılan; --uygula olmadan HİÇBİR dosyaya yazmaz.
 *
 * ── TASARIM KARARLARI ──────────────────────────────────────────────────
 *
 * 1. İKİ DİL DE GÖRÜNÜR (TR | EN), soldaki hep TR. Yalnız "öbür dili"
 *    göstermek (TR sayfada tek başına "EN" yazmak) belirsiz: ziyaretçi
 *    bunun mevcut dil mi hedef dil mi olduğunu bilemez. İki kutucuk +
 *    işaretli olan = bulunduğun dil, tek bakışta okunur.
 *
 * 2. SIRA HER İKİ DİLDE AYNI. TR sayfada da EN sayfada da soldaki TR;
 *    düğme dil değişince yer değiştirmez, göz aynı noktaya döner.
 *
 * 3. ETKİN DİL <span>, öbürü <a>. Bulunduğun sayfaya bağlantı verilmez —
 *    ekran okuyucuda "aynı yere giden bağlantı" gürültüsü olmaz.
 *
 * 4. HEDEF = SAYFANIN KENDİ KARŞILIĞI, ana sayfa DEĞİL. Dil değiştirince
 *    ana sayfaya atmak ziyaretçinin okuduğu şeyi kaybettirir. Adresler
 *    plan/en-url-haritasi.json'dan okunur — hreflang betiğiyle AYNI
 *    kaynak, ikinci bir kopya türetilmez (ikisi ayrışırsa sessizce
 *    çelişirlerdi).
 *
 * 5. DİL ADI KENDİ DİLİNDE: title="Türkçe" / title="English". İngilizce
 *    sayfada 'Türkçe' yazması dil karışması DEĞİL, uluslararası kural —
 *    sitenin kendi /en/blog/hreflang-and-url-structure/ yazısı bunu
 *    savunuyor ve 'Türkçe' zaten en-son-tarama.js muafiyet listesinde.
 *
 * 6. MOBİLDE DE GÖRÜNÜR. .nav-links ve .nav-tel dar ekranda gizleniyor
 *    (760px iç sayfa / 960px ana sayfa), dil düğmesi GİZLENMİYOR: yanlış
 *    dilde açılan ziyaretçinin hamburgeri açmadan çıkabilmesi gerekir.
 *
 * ── ÖLÇÜLMÜŞ GERÇEKLER (plan/dil-nav-envanter.js) ─────────────────────
 *   · 154 sayfanın 152'si  nav.nav[data-nav],  2'si header.navbar (ana sayfalar)
 *   · İKİSİNDE DE <a class="nav-tel"> var → tek çapa noktası yetiyor
 *   · 154/154 sayfanın dil karşılığı haritada VAR, dosyası diskte VAR
 *
 * ⚠ 404.html AYRI ELE ALINDI. Karşılığı olan bir sayfa değil (GitHub Pages
 *   tek bir /404.html sunar), bu yüzden EN hedefi ana sayfa. Sayfanın
 *   gövdesi hâlâ yalnız Türkçe — bu bilinen açık, raporda söyleniyor.
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

/* ── dil haritası: hreflang betiğiyle aynı kaynak ── */
const HARITA = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
const TR_EN = new Map([['/', '/en/']]);
for (const [bolum, girdiler] of Object.entries(HARITA)) {
  if (bolum.startsWith('_') || typeof girdiler !== 'object') continue;
  for (const [tr, o] of Object.entries(girdiler)) {
    if (tr.startsWith('_')) continue;
    if (o && typeof o === 'object' && o.en) TR_EN.set(tr, o.en);
  }
}
const EN_TR = new Map([...TR_EN].map(([a, b]) => [b, a]));

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* ⚠ GÖRECELİ YOL, MUTLAK DEĞİL. Site hem localhost:8020/site/ altında hem
 *   GH Pages'te /tasarimmania-konsept/site/ önekiyle geziliyor; "/en/..."
 *   yazmak ikisinde de kırılır. Sayfa derinliği her seviyede farklı. */
function goreceli(kaynakDosya, hedefYol) {
  const hedefDizin = path.join(S, hedefYol.replace(/^\//, '').replace(/\/$/, ''));
  let r = path.relative(path.dirname(kaynakDosya), hedefDizin).split(path.sep).join('/');
  if (r === '') r = '.';
  if (!r.startsWith('.')) r = './' + r;
  return r.endsWith('/') ? r : r + '/';
}

const ETKIN = (kod) => `<span aria-current="true" lang="${kod === 'TR' ? 'tr' : 'en'}">${kod}</span>`;
const BAG = (href, kod) => kod === 'TR'
  ? `<a href="${href}" hreflang="tr" lang="tr" title="Türkçe">TR</a>`
  : `<a href="${href}" hreflang="en" lang="en" title="English">EN</a>`;

function dugme(ingilizceMi, href) {
  const etiket = ingilizceMi ? 'Language' : 'Dil seçimi';
  const ic = ingilizceMi ? BAG(href, 'TR') + ETKIN('EN') : ETKIN('TR') + BAG(href, 'EN');
  return `<div class="dil" data-dil-degistir role="group" aria-label="${etiket}">${ic}</div>`;
}

/* ── 1) CSS: tek yere, tm.css'e (154 satır içi <style> bloğuna DEĞİL) ── */
const CSS = `
/* ===== DİL DEĞİŞTİRİCİ (plan/dil-degistirici.js) ===== */
/* Sayfanın kendi vurgu rengini alır (--acc, body[data-dal] ile değişir).
   Dolu vurgu rengi BİLEREK kullanılmadı: menüdeki tek dolu öğe "Teklif Al"
   birincil düğmesi kalsın, yardımcı denetim onunla yarışmasın. */
.dil{display:inline-flex;align-items:center;flex:none;gap:2px;
  font-family:var(--mono);font-size:11.5px;font-weight:500;letter-spacing:.06em;
  border:1px solid var(--hair);border-radius:999px;padding:3px;
  background:rgba(255,255,255,.02)}
/* ⚠ padding-block ÖLÇÜLEREK seçildi. İlk sürüm 5px'ti; tarayıcıda ölçünce
   bağlantının dokunma hedefi 21px çıktı — hem WCAG 2.5.8'in 24px alt sınırının
   hem de bu projenin mobil denetimde koyduğu 30-36px ölçütünün altında.
   7px → 26px (imleç), kaba işaretleyicide 9px → 30px. */
.dil span,.dil a{display:block;padding:7px 9px;border-radius:999px;line-height:1;
  transition:color .25s var(--ease),background-color .25s var(--ease)}
.dil span[aria-current]{color:var(--fg);background:rgba(255,255,255,.09)}
/* --muted DEĞİL --fg-dim: #727D93 koyu zeminde 4,43:1 veriyor, 11,5px metin
   için AA eşiği 4,5:1 — kıl payı altında kalıyordu. #A7B0C2 = 8,8:1. */
.dil a{color:var(--fg-dim)}
.dil a:hover{color:var(--acc);background:rgba(var(--acc-rgb),.12)}
.dil a:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
/* Dar ekranda .nav-links/.nav-tel gizleniyor; dil düğmesi GİZLENMEZ:
   yanlış dilde açılan ziyaretçi hamburgeri açmadan çıkabilmeli. */
@media(pointer:coarse){.dil span,.dil a{padding-block:9px}}
@media(max-width:420px){.dil{font-size:11px}.dil span,.dil a{padding-inline:8px}}
`;

const cssYol = path.join(S, 'css', 'tm.css');
let css = fs.readFileSync(cssYol, 'utf8');
const cssVar = css.includes('.dil{');
if (!cssVar && UYGULA) fs.writeFileSync(cssYol, css.trimEnd() + '\n' + CSS);

/* ── 2) Markup: her sayfada <a class="nav-tel"> ÖNÜNE ── */
const CAPA = /(\s*)<a class="nav-tel"/;
let yazilan = 0, atlanan = [], capasiz = [];

const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
for (const f of sayfalar) {
  let h = fs.readFileSync(f, 'utf8');
  if (h.includes('data-dil-degistir')) { atlanan.push(yol(f) + ' (zaten var)'); continue; }
  const y = yol(f);
  const en = y === '/en/' || y.startsWith('/en/');
  const hedef = en ? EN_TR.get(y) : TR_EN.get(y);
  if (!hedef) { atlanan.push(y + ' (dil karşılığı YOK)'); continue; }
  if (!CAPA.test(h)) { capasiz.push(y); continue; }

  const m = h.match(CAPA);
  h = h.replace(CAPA, `${m[1]}${dugme(en, goreceli(f, hedef))}${m[1]}<a class="nav-tel"`);
  if (UYGULA) fs.writeFileSync(f, h);
  yazilan++;
}

/* ── 3) 404: karşılığı olmayan tek sayfa, EN hedefi ana sayfa ── */
const d404 = path.join(S, '404.html');
let durum404 = 'dosya yok';
if (fs.existsSync(d404)) {
  let h = fs.readFileSync(d404, 'utf8');
  if (h.includes('data-dil-degistir')) durum404 = 'zaten var';
  else if (!CAPA.test(h)) durum404 = 'çapa (.nav-tel) YOK — dokunulmadı';
  else {
    const m = h.match(CAPA);
    h = h.replace(CAPA, `${m[1]}${dugme(false, goreceli(d404, '/en/'))}${m[1]}<a class="nav-tel"`);
    if (UYGULA) fs.writeFileSync(d404, h);
    durum404 = (UYGULA ? 'eklendi' : 'eklenecek') + ' (EN hedefi: /en/ ana sayfa — eşi olmayan tek sayfa)';
  }
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU (yazılmadı)'}\n`);
console.log(`  düğme eklenen sayfa : ${yazilan} / ${sayfalar.length}`);
console.log(`  tm.css CSS bloğu    : ${cssVar ? 'zaten vardı' : (UYGULA ? 'eklendi' : 'eklenecek')}`);
console.log(`  404.html            : ${durum404}`);
if (atlanan.length) console.log(`  atlanan             : ${atlanan.length}\n    ` + atlanan.join('\n    '));
if (capasiz.length) console.log(`  ÇAPASI OLMAYAN      : ${capasiz.length}\n    ` + capasiz.join('\n    '));
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
