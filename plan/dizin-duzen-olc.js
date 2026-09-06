/* /hizmetler/ dizin ızgarasını GERÇEK genişliklerde ölçer.
 *
 * ⚠ Uygulama içi tarayıcı bölmesi 381px'e sıkışıyor ve geniş ekran ölçemiyor;
 *   oradan "1 sütun" okumak yanıltıcı. Başsız Chrome ile üç kırılma noktası.
 *
 * Kullanım: node plan/dizin-duzen-olc.js
 */
const PPT = 'C:/Users/İHSAN/Desktop/Claude-Projeler/26-PinPro/node_modules/puppeteer-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:8020/site/hizmetler/';

const OLCUM = `(() => {
  const g = document.querySelector('#tum-hizmetler .hzd-grup');
  const k = document.querySelector('#tum-hizmetler .hzd-k');
  const h3 = g.querySelector('h3');
  const gs = getComputedStyle(g);
  return {
    sutun: gs.gridTemplateColumns.split(' ').length,
    sutunlar: gs.gridTemplateColumns,
    kartGenislik: Math.round(k.getBoundingClientRect().width),
    baslikGenislik: Math.round(h3.getBoundingClientRect().width),
    grupGenislik: Math.round(g.getBoundingClientRect().width),
    kartSayisi: document.querySelectorAll('#tum-hizmetler .hzd-k').length,
    tasma: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
})()`;

(async () => {
  const puppeteer = require(PPT);
  const t = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'] });
  console.log('\n  /hizmetler/ DİZİN IZGARASI — gerçek genişlikler\n');
  for (const [ad, w] of [['mobil', 390], ['tablet', 820], ['masaüstü', 1440]]) {
    const s = await t.newPage();
    await s.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await s.goto(URL, { waitUntil: 'load', timeout: 45000 });
    const r = await s.evaluate(OLCUM);
    await s.close();
    console.log(`  ${ad.padEnd(10)} ${String(w).padStart(4)}px  →  ${r.sutun} sütun · kart ${r.kartGenislik}px`
      + ` · başlık ${r.baslikGenislik}px/${r.grupGenislik}px · taşma ${r.tasma}`);
    console.log(`             ${r.sutunlar}`);
  }
  await t.close();
  console.log('');
})();
