/* İngilizce sürümün GERÇEK büyüklüğünü ölçer — tahmin değil, sayım.
 *
 * Neden: "77 sayfa çevrilecek" cümlesi iş yükünü göstermiyor. Sayfa türüne
 * göre kelime, SSS, şema ve görsel sayısı çıkarılıyor; plan bunun üstüne kurulur.
 *
 * Kullanım: node plan/en-kapsam-olc.js
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const tur = (f) => /[\\/]blog[\\/][^\\/]+[\\/]/.test(f) ? 'blog'
  : /[\\/]hizmetler[\\/]/.test(f) ? 'hizmet' : 'diğer';

const govdeMetni = (h) => {
  const b = h.indexOf('<main'); const s = h.lastIndexOf('</main>');
  const g = b < 0 ? h : h.slice(b, s > b ? s : undefined);
  return g.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
};

const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const grup = { blog: [], hizmet: [], diğer: [] };
let toplamKelime = 0, toplamSSS = 0, toplamGorsel = 0, toplamSema = 0;

for (const f of sayfalar) {
  const h = fs.readFileSync(f, 'utf8');
  const k = govdeMetni(h).split(' ').filter(Boolean).length;
  const sss = (h.match(/"@type":\s*"Question"/g) || []).length;
  const gorsel = new Set([...h.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1])).size;
  let sema = 0;
  try {
    const m = h.match(/application\/ld\+json">([\s\S]*?)<\/script>/);
    if (m) sema = (JSON.parse(m[1])['@graph'] || []).length;
  } catch { }
  grup[tur(f)].push({ yol: u(f), k, sss, gorsel, sema });
  toplamKelime += k; toplamSSS += sss; toplamGorsel += gorsel; toplamSema += sema;
}

console.log('\n  İNGİLİZCE SÜRÜM — ÖLÇÜLEN KAPSAM\n');
console.log('  ' + 'tür'.padEnd(10) + 'sayfa'.padStart(6) + 'kelime'.padStart(10)
  + 'ort.kelime'.padStart(12) + 'SSS'.padStart(6) + 'görsel'.padStart(8) + 'şema düğümü'.padStart(13));
console.log('  ' + '─'.repeat(65));
for (const [ad, l] of Object.entries(grup)) {
  if (!l.length) continue;
  const k = l.reduce((a, x) => a + x.k, 0);
  console.log('  ' + ad.padEnd(10) + String(l.length).padStart(6) + String(k).padStart(10)
    + String(Math.round(k / l.length)).padStart(12)
    + String(l.reduce((a, x) => a + x.sss, 0)).padStart(6)
    + String(l.reduce((a, x) => a + x.gorsel, 0)).padStart(8)
    + String(l.reduce((a, x) => a + x.sema, 0)).padStart(13));
}
console.log('  ' + '─'.repeat(65));
console.log('  ' + 'TOPLAM'.padEnd(10) + String(sayfalar.length).padStart(6) + String(toplamKelime).padStart(10)
  + ''.padStart(12) + String(toplamSSS).padStart(6) + String(toplamGorsel).padStart(8) + String(toplamSema).padStart(13));

/* Görsellerin kaçı yazıya özel (yeniden üretilmesi/yeniden adlandırılması gerekenler) */
const blogGorsel = grup.blog.reduce((a, x) => a + x.gorsel, 0);
console.log(`\n  Blog görselleri sayfaya özel: ${blogGorsel} (İngilizce SEO adıyla ayrı kopya gerekir)`);
console.log(`  Çevrilecek SSS sorusu+cevabı: ${toplamSSS}`);
console.log(`  Yeniden kurulacak şema düğümü: ${toplamSema}\n`);
