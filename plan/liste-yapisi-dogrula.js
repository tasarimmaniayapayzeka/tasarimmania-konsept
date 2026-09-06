/* Liste yapısı dönüşümünü GERÇEK genişliklerde doğrular.
 *
 * ⚠ Uygulama içi tarayıcı bölmesi 381px'e sıkışıyor; oradan okunan
 *   "font-size: 0" dar ekran kuralıdır, hata değil. Masaüstü davranışı
 *   ancak başsız Chrome ile görülür.
 *
 * Kullanım: node plan/liste-yapisi-dogrula.js
 */
const PPT = 'C:/Users/İHSAN/Desktop/Claude-Projeler/26-PinPro/node_modules/puppeteer-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TABAN = 'http://localhost:8020/site';

const TEKLIF = `(() => {
  const ray = document.getElementById('shrRay');
  const o = [...ray.children];
  const s = getComputedStyle(o[0]);
  const once = getComputedStyle(o[0], '::before');
  return {
    etiket: ray.tagName + '>' + o[0].tagName,
    adim: o.length,
    yaziBoyut: s.fontSize,
    metinGorunur: s.fontSize !== '0px',
    numaraGosterimi: once.content,
    etiketMetni: o.map(x => x.textContent.trim()).join(' · '),
    aktifRenk: getComputedStyle(o[0]).color,
    tasma: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
})()`;

/* ⚠ getBoundingClientRect TRANSFORM'U DA SAYAR. .rv beliriş animasyonu
   görünmeyen kartlarda tetiklenmediği için kart "li'den kısa" görünüyordu —
   üç kez bu tuzağa düşüldü. Yerleşim yüksekliği offsetHeight ile ölçülür;
   transform'dan etkilenmez. */
const BLOG = `(() => {
  const iz = document.getElementById('izgara');
  const li = [...iz.children];
  const farklar = li.map(x => Math.abs(x.offsetHeight - x.querySelector('.bl-k').offsetHeight));
  const satir = {};
  li.forEach(x => { const t = x.offsetTop; (satir[t] ??= []).push(x.offsetHeight); });
  return {
    etiket: iz.tagName + '>' + li[0].tagName,
    kart: li.length,
    sutun: getComputedStyle(iz).gridTemplateColumns.split(' ').length,
    kartLiFarkiOlan: farklar.filter(f => f > 0.5).length,
    esitOlmayanSatir: Object.values(satir).filter(h => new Set(h).size > 1).length,
    maddeIsareti: getComputedStyle(li[0], '::marker').content,
    tasma: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
})()`;

(async () => {
  const puppeteer = require(PPT);
  const t = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'] });
  console.log('\n  LİSTE YAPISI — GERÇEK GENİŞLİKLERDE DOĞRULAMA\n');
  for (const [ad, w] of [['mobil', 390], ['masaüstü', 1440]]) {
    console.log(`  ═══ ${ad} ${w}px ═══`);
    for (const [sayfa, yol, kod] of [['/teklif/', '/teklif/', TEKLIF], ['/blog/', '/blog/', BLOG]]) {
      const s = await t.newPage();
      await s.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      await s.goto(TABAN + yol, { waitUntil: 'load', timeout: 45000 });
      await new Promise((r) => setTimeout(r, 1200));   /* .rv beliriş animasyonu bitsin */
      const r = await s.evaluate(kod);
      await s.close();
      console.log(`    ${sayfa}`);
      Object.entries(r).forEach(([k, v]) => console.log(`       ${k.padEnd(20)} ${v}`));
    }
    console.log('');
  }
  await t.close();
})();
