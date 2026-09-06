/* TUR 1 DOĞRULAMASI — kabuk çevirisi 77 sayfayı kapsıyor mu?
 *
 * Kabuk (üst menü + altbilgi) her sayfada var. Çeviri sözlüğü eksikse bazı
 * sayfalarda Türkçe menü kalır ve bu ancak sayfa üretildikten sonra fark
 * edilir. Bu araç ÜRETİMDEN ÖNCE ölçer: her sayfanın kabuğundaki her dizge
 * sözlükte var mı?
 *
 * Kullanım: node plan/en-kabuk-dogrula.js
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const SOZLUK = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-kabuk-ceviri.json'), 'utf8'));
const CEVIRI = SOZLUK.ceviri;

/* çevrilmeyecekler: marka, adres, telefon, ürün adı, sembol, sayı */
const MUAF = [/^TasarımMania$/, /^Blog$/, /^WhatsApp$/, /^©$/, /^\d{4}$/,
  /^0\d{3} \d{3} \d{2} \d{2}$/, /^Zeytinlik/, /^No:\d/, /^[\d\s.,:;/·—–()+-]+$/,
  /^TasarımMania — Creative Agency$/];   /* logo alt metni — zaten İngilizce */

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000)
  .filter((f) => !path.relative(S, f).startsWith('en' + path.sep));

const eksikler = new Map();      /* dizge → kaç sayfada */
let toplamDizge = 0;

for (const f of sayfalar) {
  const h = fs.readFileSync(f, 'utf8');
  const mb = h.indexOf('<main'), ms = h.lastIndexOf('</main>');
  const navBas = h.indexOf('<nav class="nav"');
  const kabuk = (navBas >= 0 ? h.slice(navBas, mb) : '') + h.slice(ms);
  const temiz = kabuk.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');

  /* ⚠ ÖZNİTELİKLER DE KABUĞUN PARÇASI — ölçülmüş kaçak: yalnız ">metin<"
     taranıyordu, kabuktaki aria-label'lar (Ana menü, Hızlı iletişim,
     WhatsApp ile yazın) hiç görünmüyordu ve İngilizce sayfada Türkçe kaldı. */
  const ozMetin = [];
  for (const re of [/\saria-label="([^"]+)"/g, /\salt="([^"]+)"/g,
    /\stitle="([^"]+)"/g, /\splaceholder="([^"]+)"/g])
    for (const m of temiz.matchAll(re)) ozMetin.push(m[1]);

  const gorulen = new Set();
  for (const m of [...temiz.matchAll(/>([^<>{}]+)</g)].map((x) => x[1]).concat(ozMetin)) {
    const t = m.replace(/\s+/g, ' ').trim();
    if (!t || gorulen.has(t)) continue;
    gorulen.add(t);
    toplamDizge++;
    if (MUAF.some((r) => r.test(t))) continue;
    if (CEVIRI[t]) continue;
    /* çok satırlı biçim: boşlukları normalize ederek de dene */
    const norm = Object.keys(CEVIRI).some((k) => k.replace(/\s+/g, ' ').trim() === t);
    if (norm) continue;
    eksikler.set(t, (eksikler.get(t) || 0) + 1);
  }
}

console.log('\n  TUR 1 — KABUK ÇEVİRİSİ KAPSAMI\n');
console.log(`  taranan sayfa        : ${sayfalar.length}`);
console.log(`  sözlükteki çeviri    : ${Object.keys(CEVIRI).length}`);
console.log(`  kabukta görülen dizge: ${toplamDizge} (tekrarlar dahil)`);
console.log(`\n  SÖZLÜKTE OLMAYAN: ${eksikler.size}\n`);
if (!eksikler.size) console.log('     ✓ kabuktaki her dizgenin karşılığı var');
else [...eksikler.entries()].sort((a, b) => b[1] - a[1])
  .forEach(([t, n]) => console.log(`     ✗ ${String(n).padStart(3)} sayfada · "${t.slice(0, 68)}"`));
console.log('');
process.exit(eksikler.size ? 1 : 0);
