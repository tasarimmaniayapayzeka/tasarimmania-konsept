/* CLS bulgusunu doğrula: aynı sayfayı birden çok kez ölç.
 *
 * ⚠ NEDEN: tam koşumda 3 sayfa CLS > 0,1 çıktı ama CSS'leri, CLS'i 0 çıkan
 *   kardeş sayfalarla BİREBİR aynı. Aynı kural iki farklı sonuç veriyorsa
 *   ya içerik farkı vardır ya da ölçüm kararsızdır. Düzeltmeden önce hangisi
 *   olduğunu bilmek gerekir — yoksa var olmayan bir hatayı "düzeltmiş" olursun.
 *
 * Kullanım: node plan/cls-tekrar.js
 */
const path = require('path');
const PPT = 'C:/Users/İHSAN/Desktop/Claude-Projeler/26-PinPro/node_modules/puppeteer-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TABAN = 'http://localhost:8020/site';
const TEKRAR = 4;

const SAYFALAR = [
  ['/hizmetler/seo/yerel-seo/', 'tam koşumda 0,1868'],
  ['/hizmetler/dijital-pazarlama/meta-ads/', 'tam koşumda 0,1849'],
  ['/blog/grafik-tasarim-turleri/', 'tam koşumda 0,1081'],
  ['/hizmetler/seo/teknik-seo/', 'DENETİM — tam koşumda 0'],
];

const OLCUM = `new Promise((res) => {
  const s = { cls: 0, kaynaklar: [] };
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) {
      s.cls += e.value;
      const n = e.sources && e.sources[0] && e.sources[0].node;
      if (n && n.tagName) {
        const ad = n.tagName + (n.className ? '.' + String(n.className).split(' ')[0] : '');
        s.kaynaklar.push(ad + ' (' + e.value.toFixed(4) + ')');
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });
  setTimeout(() => { s.cls = +s.cls.toFixed(4); res(s); }, 4200);
})`;

(async () => {
  const puppeteer = require(PPT);
  const tarayici = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
  });
  console.log('\n  CLS TEKRARLANABİLİRLİK — masaüstü 1440×900, her sayfa ' + TEKRAR + ' kez\n');
  for (const [yol, not] of SAYFALAR) {
    const olcumler = [];
    let kaynak = '';
    for (let i = 0; i < TEKRAR; i++) {
      const s = await tarayici.newPage();
      await s.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await s.goto(TABAN + yol, { waitUntil: 'load', timeout: 45000 });
      const r = await s.evaluate(OLCUM);
      await s.close();
      olcumler.push(r.cls);
      if (r.kaynaklar.length && !kaynak) kaynak = r.kaynaklar.slice(0, 2).join(', ');
    }
    const enB = Math.max(...olcumler), enK = Math.min(...olcumler);
    const kararli = (enB - enK) < 0.02;
    console.log(`  ${yol}`);
    console.log(`    ölçümler: ${olcumler.join(' · ')}   (${not})`);
    console.log(`    ${kararli ? 'KARARLI' : 'KARARSIZ — ölçümden ölçüme değişiyor'}` + (kaynak ? `  ·  kaynak: ${kaynak}` : ''));
  }
  await tarayici.close();
  console.log('');
})();
