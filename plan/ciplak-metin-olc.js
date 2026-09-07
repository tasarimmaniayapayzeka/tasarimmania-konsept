/* ÇIPLAK METİN — DOĞRU SAYIM
 *
 * Kullanım: node plan/ciplak-metin-olc.js
 *
 * ⚠ ÖNCEKİ ÖLÇÜM ŞİŞİKTİ, DÜZELTİLDİ. plan/blog-govde-teshis.js gövdeyi
 *   hem AÇILIŞ hem KAPANIŞ blok etiketlerinden bölüyordu:
 *     /<\/?(?:h[1-6]|p|div|…)\b[^>]*>/g
 *   Bu yüzden <div class="yz-cevap"><p>METİN</p></div> yapısındaki METİN,
 *   düzgünce <p> içinde olmasına rağmen "çıplak" sayılıyordu. Sonuç:
 *   yazı başına 38 çıplak düğüm ve "gövdenin %95'i" gibi ŞİŞİK rakamlar.
 *
 *   Doğru yöntem: üst düzey blokları DENGELİ kapanışla atla, yalnız
 *   ARALARDA kalanı çıplak say. Kusur gerçek, ama büyüklüğü farklı.
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');

const BLOK = /<(?:(h2|h3|h4|h5|p|ol|ul|table|pre)\b|(div|figure|blockquote|aside|section|details) [^>]*class="([^"]+)")/g;

function kapanisBul(s, i, etiket) {
  const ac = new RegExp(`<${etiket}\\b`, 'g'), kap = new RegExp(`</${etiket}>`, 'g');
  let derinlik = 1, p = i + 1;
  while (derinlik > 0) {
    ac.lastIndex = p; kap.lastIndex = p;
    const a = ac.exec(s), k = kap.exec(s);
    if (!k) return s.length;
    if (a && a.index < k.index) { derinlik++; p = a.index + 1; }
    else { derinlik--; p = k.index + 1; if (!derinlik) return k.index + `</${etiket}>`.length; }
  }
  return s.length;
}
const kelime = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

function analiz(dosya) {
  const h = fs.readFileSync(dosya, 'utf8');
  const g = (h.match(/<article class="yz-govde">([\s\S]*?)<\/article>/) || [])[1];
  if (!g) return null;
  let sonSon = 0, m, ciplakDugum = 0, ciplakKelime = 0;
  BLOK.lastIndex = 0;
  const bak = (ham) => {
    const t = ham.trim(); if (!t) return;
    const y = t.replace(/<[^>]+>/g, '').trim();
    if (y.length < 40) return;
    ciplakDugum++; ciplakKelime += kelime(t);
  };
  while ((m = BLOK.exec(g))) {
    bak(g.slice(sonSon, m.index));
    const son = kapanisBul(g, m.index, m[1] || m[2]);
    sonSon = son; BLOK.lastIndex = son;
  }
  bak(g.slice(sonSon));
  return { toplam: kelime(g), ciplakDugum, ciplakKelime, p: (g.match(/<p\b/g) || []).length };
}

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}

for (const [ad, kok] of [['TÜRKÇE', path.join(S, 'blog')], ['İNGİLİZCE', path.join(S, 'en', 'blog')]]) {
  const y = tara(kok).map(analiz).filter(Boolean);
  const top = (k) => y.reduce((a, b) => a + b[k], 0);
  console.log(`\n  ══ ${ad} — ${y.length} yazı ══`);
  console.log(`  ortalama <p>                 : ${Math.round(top('p') / y.length)}`);
  console.log(`  ortalama ÇIPLAK paragraf     : ${Math.round(top('ciplakDugum') / y.length)}`);
  console.log(`  çıplak metnin gövdeye oranı  : %${Math.round(100 * top('ciplakKelime') / top('toplam'))}`);
  console.log(`  hiç çıplak metni olmayan yazı: ${y.filter((x) => x.ciplakDugum === 0).length}/${y.length}`);
  console.log(`  en çok çıplak paragraf       : ${Math.max(...y.map((x) => x.ciplakDugum))}`);
}
console.log('');
