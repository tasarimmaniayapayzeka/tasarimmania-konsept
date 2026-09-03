/* YAZI TIPI TUZAGI SINAMASI
 * Bu makinede librsvg (sharp'in SVG motoru) font-weight verilmemis metni
 * harfleri yiyerek cizmisti ("Teklif Al" -> "Tek if Al"). Once sina. */
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');
const fs = require('fs');
const path = require('path');
const CIKTI = path.join(__dirname, 'font-testi.png');

const denemeler = [
  ['agirliksiz',  'font-family="JetBrains Mono, monospace"'],
  ['agirlikli',   'font-family="JetBrains Mono, monospace" font-weight="500"'],
  ['sistem-mono', 'font-family="Consolas, monospace" font-weight="500"'],
  ['sans',        'font-family="Segoe UI, sans-serif" font-weight="600"'],
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="${denemeler.length * 56 + 20}">
  <rect width="100%" height="100%" fill="#0B0D12"/>
  ${denemeler.map((d, i) => `<text x="20" y="${i * 56 + 44}" ${d[1]} font-size="26" fill="#FF6BD6">${d[0]}: SENARYO 01 · ÇEKİM ÖLÇÜ ĞÜŞİ</text>`).join('\n  ')}
</svg>`;

sharp(Buffer.from(svg)).png().toFile(CIKTI)
  .then(() => console.log('yazildi: ' + CIKTI))
  .catch((e) => console.log('HATA: ' + e.message));
