/* Düz URL yapısı için hizmet sayfası slug önerisi.
 *
 * Kaynak: plan/kelime-haritasi.json (kanonik odak kelimeler) + sayfanın H1'i.
 * Slug UYDURULMUYOR; odak kelimeden türetiliyor, çünkü adres kalıcıdır ve
 * sonradan değiştirmek yeni bir kırılma demektir.
 *
 * Kullanım: node plan/duz-slug-onerisi.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

const haritaYolu = path.join(__dirname, 'kelime-haritasi.json');
let harita = null;
try { harita = JSON.parse(fs.readFileSync(haritaYolu, 'utf8')); } catch { }

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* haritadan yol → odak eşlemesi çıkar (yapı bilinmiyor, esnek gez) */
const odakla = new Map();
(function gez(n) {
  if (Array.isArray(n)) return n.forEach(gez);
  if (!n || typeof n !== 'object') return;
  const u = n.url || n.yol || n.path;
  const o = n.odak || n.odakKelime || n.focus || n.anahtar;
  if (u && o) odakla.set(String(u).replace(/^https?:\/\/[^/]+/, ''), String(o));
  Object.values(n).forEach(gez);
})(harita);

const hizmetler = tara(path.join(S, 'hizmetler'))
  .filter((f) => fs.statSync(f).size >= 2000)
  .map((f) => {
    const h = fs.readFileSync(f, 'utf8');
    const y = yol(f);
    const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1]
      .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const svc = (h.match(/"@type":\s*"Service"[\s\S]{0,400}?"serviceType":\s*"([^"]+)"/) || [])[1];
    return { y, h1, odak: odakla.get(y) || svc || '', mevcutSlug: y.split('/').filter(Boolean).pop() };
  })
  .filter((x) => !/http-equiv="refresh"/i.test(fs.readFileSync(path.join(S, x.y.replace(/^\//, ''), 'index.html'), 'utf8')));

console.log('\n  HİZMET SAYFALARI — DÜZ SLUG İÇİN VERİ\n');
console.log('  ' + 'mevcut yol'.padEnd(52) + 'mevcut slug'.padEnd(30) + 'odak / serviceType');
console.log('  ' + '─'.repeat(112));
hizmetler.sort((a, b) => a.y.localeCompare(b.y)).forEach((x) => {
  console.log('  ' + x.y.padEnd(52) + x.mevcutSlug.padEnd(30) + (x.odak || '—').slice(0, 34));
});
console.log(`\n  toplam ${hizmetler.length} hizmet sayfası`);
console.log(`  kelime-haritasi.json okundu: ${harita ? 'evet, ' + odakla.size + ' eşleme' : 'HAYIR — dosya okunamadı'}\n`);
