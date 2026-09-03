/* DÖNGÜ DİKİŞİ ÖLÇÜMÜ
 * Sorun: son kareden ilk kareye dönüşte sıçrama olursa göz bunu "takılma"
 * olarak görür. Ölçüt: 119→0 geçişindeki piksel değişimi, normal ardışık
 * geçişlerden (117→118, 118→119) belirgin BÜYÜK olmamalı.
 * Kullanım: node plan/video-uret/dongu-denetim.js <mp4> */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');

const mp4 = path.resolve(process.argv[2]);
const gec = fs.mkdtempSync(path.join(os.tmpdir(), 'dongu-'));

execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4,
  path.join(gec, '%04d.png')]);
const kareler = fs.readdirSync(gec).filter((f) => f.endsWith('.png')).sort();

async function fark(a, b) {
  const [x, y] = await Promise.all([
    sharp(path.join(gec, a)).resize(280, 156).raw().toBuffer(),
    sharp(path.join(gec, b)).resize(280, 156).raw().toBuffer(),
  ]);
  let t = 0;
  for (let i = 0; i < x.length; i++) t += Math.abs(x[i] - y[i]);
  return t / x.length;                       // kanal başına ortalama fark
}

(async () => {
  const n = kareler.length;
  console.log('  kare sayısı: ' + n);
  /* normal ardışık geçişlerin dağılımı */
  const normal = [];
  for (let i = 0; i < n - 1; i++) normal.push(await fark(kareler[i], kareler[i + 1]));
  const ort = normal.reduce((a, b) => a + b, 0) / normal.length;
  const enBuyuk = Math.max(...normal);
  /* döngü dikişi: son kare → ilk kare */
  const dikis = await fark(kareler[n - 1], kareler[0]);

  console.log('  ardışık kare farkı  ortalama: ' + ort.toFixed(2) + '   en büyük: ' + enBuyuk.toFixed(2));
  console.log('  DÖNGÜ DİKİŞİ (son→ilk)      : ' + dikis.toFixed(2));
  const oran = dikis / ort;
  console.log('  dikiş / ortalama            : ' + oran.toFixed(2) + '×');
  console.log(oran <= 1.6
    ? '  ✓ DİKİŞSİZ — geçiş normal kare akışından ayırt edilemiyor'
    : '  ✗ SIÇRAMA VAR — döngü noktasında görünür kesinti');
  fs.rmSync(gec, { recursive: true, force: true });
  process.exit(oran <= 1.6 ? 0 : 9);
})();
