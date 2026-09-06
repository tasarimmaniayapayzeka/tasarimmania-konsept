/* Hizmet sayfasında H2'lerin ve paragrafların gerçek sırasını gösterir —
 * kaynak cümlesinin nereye gireceğini TAHMİN ETMEDEN belirlemek için.
 * Kullanım: node plan/hizmet-yapi-teshis.js <sayfa-yolu>
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const yol = process.argv[2] || 'hizmetler/dijital-pazarlama/google-ads';
const h = fs.readFileSync(path.join(S, yol, 'index.html'), 'utf8');
const b = h.indexOf('<main'), s = h.lastIndexOf('</main>');

const olaylar = [];
for (const m of h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
  if (m.index < b || m.index > s) continue;
  olaylar.push([m.index, 'H2', m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 54)]);
}
for (const m of h.matchAll(/<(section|div)[^>]*class="([^"]*)"[^>]*>/g)) {
  if (m.index < b || m.index > s) continue;
  const c = m[2].split(/\s+/)[0];
  if (/^(band|ac3|mini|teklif|hrt|sss|akor)/.test(c)) olaylar.push([m.index, '⟨kap⟩', `<${m[1]} class="${c}">`]);
}
for (const m of h.matchAll(/<\/p>/g)) {
  if (m.index < b || m.index > s) continue;
  const bas = h.lastIndexOf('<p', m.index);
  const t = h.slice(bas, m.index).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (t.length > 40) olaylar.push([m.index, 'p', t.slice(0, 56)]);
}
olaylar.sort((a, c) => a[0] - c[0]);
console.log(`\n  ${yol}\n`);
olaylar.forEach(([i, t, x]) => console.log(`  ${String(i).padStart(7)}  ${t.padEnd(6)} ${x}`));
console.log('');
