/* Modül 16 — Core Web Vitals LABORATUVAR ölçümü.
 *
 * ⚠ NEDEN BU BETİK VAR: denetim aracı bu modülü "ÖLÇÜLEMEDİ — alan verisi
 *   (CrUX/Search Console) gerekir" diye geçiyordu. Alan verisi gerçekten
 *   gerekli AMA yalnız GERÇEK KULLANICI dağılımı için. Sayfanın kendi
 *   LCP/CLS/TBT davranışı laboratuvar koşusunda pekâlâ ölçülür ve kötü bir
 *   sayfa burada da kötü çıkar. "Ölçülemez" demek, ölçmemenin kılıfıydı.
 *
 * ⚠ UYGULAMA İÇİ TARAYICI BÖLMESİYLE ÖLÇMEYİN: bölme görünür değilken Chrome
 *   ilk boyamayı erteliyor, FCP/LCP 11 saniye gibi sahte değerler veriyor
 *   (ölçüldü: domContentLoaded 142 ms iken LCP 11.352 ms). Bu betik sistemdeki
 *   Chrome'u başsız açar; başsız Chrome arka plan sekmesi değildir, normal boyar.
 *
 * Eşikler (Google): LCP ≤ 2500 ms iyi / ≤ 4000 orta · CLS ≤ 0,1 / ≤ 0,25
 * TBT vekil: uzun görevlerin 50 ms üstü kısımlarının toplamı.
 *
 * Kullanım:
 *   node plan/cwv-olc.js                 (tüm sayfalar, masaüstü + mobil)
 *   node plan/cwv-olc.js --hizli         (6 temsilci sayfa)
 *   node plan/cwv-olc.js --sadece-masaustu
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

/* puppeteer-core komşu projede kurulu; Chrome sistemde zaten var, indirme yok */
const PPT = 'C:/Users/İHSAN/Desktop/Claude-Projeler/26-PinPro/node_modules/puppeteer-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TABAN = 'http://localhost:8020';

const HIZLI = process.argv.includes('--hizli');
const SADECE_MASAUSTU = process.argv.includes('--sadece-masaustu');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

const TEMSILCI = ['/', '/hizmetler/', '/seo/', '/teknik-seo/',
  '/blog/', '/blog/storyboard-nedir/'];

const OLCUM = `new Promise((res) => {
  const s = { lcp: 0, lcpOge: '', cls: 0, kaymaOge: '', tbt: 0, uzunGorev: 0 };
  new PerformanceObserver((l) => {
    const e = l.getEntries().at(-1);
    s.lcp = Math.round(e.startTime);
    s.lcpOge = e.element ? (e.element.tagName + (e.element.className ? '.' + String(e.element.className).split(' ')[0] : '')) : (e.url || '?');
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) {
      s.cls += e.value;
      const n = e.sources && e.sources[0] && e.sources[0].node;
      if (n && n.tagName) s.kaymaOge = n.tagName + (n.className ? '.' + String(n.className).split(' ')[0] : '');
    }
  }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) { s.uzunGorev++; s.tbt += Math.max(0, e.duration - 50); }
  }).observe({ type: 'longtask', buffered: true });
  setTimeout(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const k = performance.getEntriesByType('resource');
    s.ttfb = Math.round(nav.responseStart);
    s.fcp = Math.round((performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0);
    s.istek = k.length + 1;
    s.kb = Math.round((k.reduce((a, r) => a + (r.transferSize || 0), 0) + (nav.transferSize || 0)) / 1024);
    s.cls = +s.cls.toFixed(4);
    s.tbt = Math.round(s.tbt);
    res(s);
  }, 4200);
})`;

(async () => {
  let puppeteer;
  try { puppeteer = require(PPT); }
  catch (e) { console.error('  ✗ puppeteer-core bulunamadı: ' + PPT); process.exit(2); }
  if (!fs.existsSync(CHROME)) { console.error('  ✗ Chrome bulunamadı: ' + CHROME); process.exit(2); }

  const yollar = HIZLI ? TEMSILCI
    : tara(S).filter((f) => fs.statSync(f).size >= 2000).map(u).sort();

  const cihazlar = SADECE_MASAUSTU
    ? [['masaüstü', { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false }, 1]]
    : [['masaüstü', { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false }, 1],
       ['mobil', { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, 4]];

  const tarayici = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
  });

  const tum = [];
  for (const [cihazAd, vp, cpuYavas] of cihazlar) {
    console.log(`\n  ═══ ${cihazAd.toUpperCase()}  ${vp.width}×${vp.height}` + (cpuYavas > 1 ? `  ·  CPU ${cpuYavas}× yavaş` : '') + ' ═══\n');
    for (const y of yollar) {
      const sayfa = await tarayici.newPage();
      await sayfa.setViewport(vp);
      if (cpuYavas > 1) {
        const oturum = await sayfa.createCDPSession();
        await oturum.send('Emulation.setCPUThrottlingRate', { rate: cpuYavas });
      }
      let r = null;
      try {
        await sayfa.goto(TABAN + '/site' + y, { waitUntil: 'load', timeout: 45000 });
        r = await sayfa.evaluate(OLCUM);
      } catch (e) { r = { hata: String(e.message).slice(0, 60) }; }
      await sayfa.close();
      if (r.hata) { console.log(`  ✗ ${y}  ${r.hata}`); continue; }
      r.yol = y; r.cihaz = cihazAd; tum.push(r);
      const im = r.lcp <= 2500 && r.cls <= 0.1 ? '✓' : (r.lcp <= 4000 && r.cls <= 0.25 ? '~' : '✗');
      console.log(`  ${im} ${y.padEnd(50)} LCP ${String(r.lcp).padStart(5)}ms · CLS ${String(r.cls).padEnd(6)} · TBT ${String(r.tbt).padStart(4)}ms · ${String(r.kb).padStart(4)}KB/${r.istek}`);
    }
  }
  await tarayici.close();

  console.log('\n  ═══ ÖZET ═══\n');
  for (const [ad] of cihazlar) {
    const g = tum.filter((x) => x.cihaz === ad);
    if (!g.length) continue;
    const orta = (k) => (g.reduce((a, x) => a + x[k], 0) / g.length);
    const enKotu = [...g].sort((a, b) => b.lcp - a.lcp)[0];
    const iyi = g.filter((x) => x.lcp <= 2500 && x.cls <= 0.1).length;
    console.log(`  ${ad.padEnd(10)} ${g.length} sayfa · "iyi" eşiğini geçen ${iyi}/${g.length}`);
    console.log(`    ortalama  LCP ${Math.round(orta('lcp'))}ms · CLS ${orta('cls').toFixed(4)} · TBT ${Math.round(orta('tbt'))}ms · ${Math.round(orta('kb'))}KB`);
    console.log(`    en yavaş  ${enKotu.yol}  LCP ${enKotu.lcp}ms  (öğe: ${enKotu.lcpOge})`);
    const kayan = g.filter((x) => x.cls > 0.1);
    console.log(`    CLS > 0,1 olan: ${kayan.length}` + (kayan.length ? '  →  ' + kayan.slice(0, 3).map((x) => `${x.yol} (${x.cls}, ${x.kaymaOge})`).join(', ') : ''));
  }
  fs.writeFileSync(path.join(__dirname, 'cwv-sonuc.json'), JSON.stringify(tum, null, 2), 'utf8');
  console.log('\n  ham veri: plan/cwv-sonuc.json\n');
})();
