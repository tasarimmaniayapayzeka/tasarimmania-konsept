/* CLS'in KAYNAĞINI teşhis et: kayan öğenin ilk ve son yüksekliği.
 * Kullanım: node plan/cls-teshis.js
 */
const PPT = 'C:/Users/İHSAN/Desktop/Claude-Projeler/26-PinPro/node_modules/puppeteer-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TABAN = 'http://localhost:8020/site';

const HEDEF = [
  ['/yerel-seo/', '.ciz-kutu'],
  ['/meta-reklam/', '.ciz-kutu'],
  ['/teknik-seo/', '.ciz-kutu'],          /* denetim: temiz sayfa */
  ['/blog/grafik-tasarim-turleri/', '.yz-kapak'],
  ['/blog/storyboard-nedir/', '.yz-kapak'],             /* denetim: temiz sayfa */
];

(async () => {
  const puppeteer = require(PPT);
  const t = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'] });
  console.log('');
  for (const [yol, sec] of HEDEF) {
    const s = await t.newPage();
    await s.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    /* DOM hazır olur olmaz ilk yüksekliği al, sonra tam yükleme sonrası tekrar */
    await s.goto(TABAN + yol, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const ilk = await s.evaluate((q) => {
      const e = document.querySelector(q);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      const ic = e.querySelector('svg, img');
      return { h: Math.round(r.height), w: Math.round(r.width),
        ic: ic ? ic.tagName + ' ' + (ic.getAttribute('width') || '?') + '×' + (ic.getAttribute('height') || '?')
          + ' viewBox=' + (ic.getAttribute('viewBox') || '—') : 'iç öğe yok' };
    }, sec);
    await new Promise((r) => setTimeout(r, 3500));
    const son = await s.evaluate((q) => {
      const e = document.querySelector(q);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      const st = getComputedStyle(e);
      const ic = e.querySelector('svg, img');
      return { h: Math.round(r.height), yukseklikKurali: st.height, en: st.aspectRatio,
        icYuk: ic ? Math.round(ic.getBoundingClientRect().height) : null };
    }, sec);
    await s.close();
    if (!ilk || !son) { console.log(`  ✗ ${yol}  ${sec} bulunamadı`); continue; }
    const fark = son.h - ilk.h;
    console.log(`  ${yol}  ${sec}`);
    console.log(`    ilk yükseklik ${ilk.h}px  →  son ${son.h}px   FARK ${fark > 0 ? '+' : ''}${fark}px` + (fark !== 0 ? '   ← KAYMA BURADA' : '   ✓'));
    console.log(`    iç öğe: ${ilk.ic}  ·  CSS height: ${son.yukseklikKurali}  ·  aspect-ratio: ${son.en}`);
  }
  await t.close();
  console.log('');
})();
