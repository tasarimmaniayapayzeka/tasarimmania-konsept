// Gerçek telefon öykünmesiyle tam sayfa ekran görüntüsü (Chrome DevTools Protocol, bağımlılıksız).
// Kullanım: node plan/mobil-ekran.js <çıktı-klasörü> <url> [<url> ...]
// Her sayfa: 375x812, deviceScaleFactor 1, mobile:true; .rv öğeleri görünür yapılır; PNG olarak kaydedilir.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [cikti, ...urller] = process.argv.slice(2);
fs.mkdirSync(cikti, { recursive: true });
const PORT = 9333;
const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'tm-cdp-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profil}`, 'about:blank'], { stdio: 'ignore' });
const bekle = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let hedef;
  for (let i = 0; i < 40 && !hedef; i++) {
    try { hedef = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find(t => t.type === 'page'); } catch { await bekle(250); }
  }
  const ws = new WebSocket(hedef.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const bekleyen = new Map(); const olaylar = [];
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && bekleyen.has(m.id)) { bekleyen.get(m.id)(m); bekleyen.delete(m.id); }
    else if (m.method) olaylar.push(m);
  });
  const cdp = (method, params = {}) => new Promise(r => { const i = ++id; bekleyen.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await cdp('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36' });

  for (const url of urller) {
    olaylar.length = 0;
    await cdp('Page.navigate', { url });
    for (let i = 0; i < 60 && !olaylar.some(o => o.method === 'Page.loadEventFired'); i++) await bekle(150);
    // tembel görselleri yükle, açılış animasyonlarını bitir, sonra başa dön
    await cdp('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{
      document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');
      document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));
      const H=document.documentElement.scrollHeight; for(let y=0;y<H;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}
      scrollTo(0,0); await new Promise(r=>setTimeout(r,500)); return H })()` });
    const { result } = await cdp('Page.getLayoutMetrics');
    const h = Math.min(Math.ceil(result.cssContentSize.height), 16000);
    const shot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: 375, height: h, scale: 1 } });
    const ad = url.replace(/^https?:\/\/[^/]+\/site\/?/, '').replace(/\/$/, '').replace(/[\/?#=]/g, '_') || 'anasayfa';
    fs.writeFileSync(path.join(cikti, ad + '.png'), Buffer.from(shot.result.data, 'base64'));
    console.log(ad, h + 'px');
  }
  ws.close(); chrome.kill();
})().catch(e => { console.error(e); chrome.kill(); process.exit(1); });
