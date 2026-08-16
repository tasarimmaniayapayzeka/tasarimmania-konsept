// Tüm konseptlerde og:image / twitter:image etiketlerini gerçek, mutlak bir görsele bağlar.
// Kazıyıcılar (WhatsApp, Facebook, X) göreli yolu ve data: URI'yi çözemez — mutlak URL şart.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept';
const OG = BASE + '/assets/og-kapak.jpg';
const ALT = 'TasarımMania — 15 ana sayfa konsepti';

const dosyalar = [
  path.join(ROOT, 'index.html'),
  ...fs.readdirSync(path.join(ROOT, 'konsept'))
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(ROOT, 'konsept', f))
];

// property= veya name= ile yazılmış tek bir meta etiketini bulur
function metaRe(key) {
  return new RegExp('<meta\\s+(?:property|name)=(["\'])' + key + '\\1[^>]*>', 'i');
}

function setMeta(html, key, value, tercihEdilenNitelik) {
  const nit = tercihEdilenNitelik || (key.startsWith('og:') ? 'property' : 'name');
  const yeni = `<meta ${nit}="${key}" content="${value}">`;
  const re = metaRe(key);
  if (re.test(html)) return { html: html.replace(re, yeni), eklendi: false };
  // yoksa </head>'den hemen önce ekle
  return { html: html.replace(/<\/head>/i, `  ${yeni}\n</head>`), eklendi: true };
}

let rapor = [];
for (const f of dosyalar) {
  let html = fs.readFileSync(f, 'utf8');
  const once = html;
  let eklenen = 0;

  for (const [key, val] of [
    ['og:image', OG],
    ['og:image:secure_url', OG],
    ['og:image:width', '1200'],
    ['og:image:height', '630'],
    ['og:image:type', 'image/jpeg'],
    ['og:image:alt', ALT],
    ['twitter:card', 'summary_large_image'],
    ['twitter:image', OG],
    ['twitter:image:alt', ALT]
  ]) {
    const r = setMeta(html, key, val);
    html = r.html;
    if (r.eklendi) eklenen++;
  }

  if (html !== once) fs.writeFileSync(f, html, 'utf8');
  rapor.push({
    dosya: path.basename(f),
    degisti: html !== once,
    eklenenEtiket: eklenen
  });
}

console.log(JSON.stringify(rapor, null, 1));

// Doğrulama: hiçbir dosyada göreli ya da data: og:image kalmamalı
const kalan = dosyalar.filter(f => {
  const h = fs.readFileSync(f, 'utf8');
  const m = h.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  return !m || !m[1].startsWith('https://');
});
console.log(kalan.length === 0
  ? 'DOGRULAMA OK: tum dosyalarda og:image mutlak URL'
  : 'SORUN: ' + kalan.map(f => path.basename(f)).join(', '));
