/* CLS'in sebebi yazı tipi takası mı? Kontrollü A/B.
 *
 * Hipotez: Google Fonts "display=swap" ile geliyor. Yedek yazı tipiyle çizilen
 * başlık/spot metni, gerçek yazı tipi inince yeniden akıyor; satır sayısı
 * değişince altındaki her şey aşağı/yukarı kayıyor. Layout-shift kaydındaki
 * öğe (.ciz-kutu, .yz-kapak) KAYAN öğe — sebep değil, kurban.
 *
 * Deney: aynı sayfa üç koşulda ölçülür.
 *   A) olduğu gibi
 *   B) yazı tipi isteği tamamen engellenir (yedek fontta kalır)
 *   C) display=swap → display=optional
 * B ve C'de CLS düşerse hipotez doğrulanır.
 *
 * Kullanım: node plan/cls-font-deney.js
 */
const PPT = 'C:/Users/İHSAN/Desktop/Claude-Projeler/26-PinPro/node_modules/puppeteer-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TABAN = 'http://localhost:8020/site';
const SAYFALAR = ['/hizmetler/seo/yerel-seo/', '/hizmetler/dijital-pazarlama/meta-ads/', '/blog/grafik-tasarim-turleri/'];

const OLC = `new Promise((res) => {
  let c = 0;
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) c += e.value; })
    .observe({ type: 'layout-shift', buffered: true });
  setTimeout(() => res(+c.toFixed(4)), 4000);
})`;

async function olc(t, yol, kip) {
  const s = await t.newPage();
  await s.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  if (kip !== 'A') {
    await s.setRequestInterception(true);
    s.on('request', (r) => {
      const u = r.url();
      if (kip === 'B' && /fonts\.(googleapis|gstatic)\.com/.test(u)) return r.abort();
      if (kip === 'C' && /fonts\.googleapis\.com/.test(u) && u.includes('display=swap'))
        return r.continue({ url: u.replace('display=swap', 'display=optional') });
      return r.continue();
    });
  }
  await s.goto(TABAN + yol, { waitUntil: 'load', timeout: 45000 });
  const c = await s.evaluate(OLC);
  await s.close();
  return c;
}

(async () => {
  const puppeteer = require(PPT);
  const t = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'] });
  console.log('\n  CLS — YAZI TİPİ DENEYİ\n');
  console.log('  ' + 'sayfa'.padEnd(46) + 'A: olduğu gibi   B: font yok   C: optional');
  console.log('  ' + '─'.repeat(88));
  for (const y of SAYFALAR) {
    const a = await olc(t, y, 'A');
    const b = await olc(t, y, 'B');
    const c = await olc(t, y, 'C');
    console.log(`  ${y.padEnd(46)}${String(a).padEnd(17)}${String(b).padEnd(14)}${c}`);
  }
  await t.close();
  console.log('\n  B ve C, A\'dan belirgin düşükse sebep yazı tipi takasıdır.\n');
})();
