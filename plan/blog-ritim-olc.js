/* GÖRSEL VE RİTİM ÖĞELERİ GÖVDENİN NERESİNDE?
 *
 * Teşhis betiği "1 kapak + 1 gövde görseli" dedi. Asıl soru: o tek görsel
 * NEREDE duruyor? Yazının başında mı, sonunda mı?
 *
 * Kullanım: node plan/blog-ritim-olc.js
 *
 * Ölçü birimi: KELİME derinliği (piksel değil — piksel ekran genişliğine
 * göre değişir, kelime değişmez).
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
const kelimeSay = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

const ISARET = {
  'gövde görseli': /<figure class="yz-gorsel"/,
  'tablo': /<div class="yz-tablo"/,
  'alıntı': /<blockquote class="yz-alinti"/,
  'hizmet köprüsü': /<aside class="yz-kopru"/,
  'liste': /<(?:ol|ul)\b/,
};

for (const [ad, kok] of [['TÜRKÇE', path.join(S, 'blog')], ['İNGİLİZCE', path.join(S, 'en', 'blog')]]) {
  const yazilar = tara(kok);
  const derinlikler = {};
  for (const k of Object.keys(ISARET)) derinlikler[k] = [];

  for (const f of yazilar) {
    const h = fs.readFileSync(f, 'utf8');
    const g = (h.match(/<article class="yz-govde">([\s\S]*?)<\/article>/) || [])[1];
    if (!g) continue;
    const toplam = kelimeSay(g);
    for (const [ad2, re] of Object.entries(ISARET)) {
      const m = g.match(re);
      if (!m) continue;
      const oncesi = kelimeSay(g.slice(0, g.indexOf(m[0])));
      derinlikler[ad2].push(Math.round(100 * oncesi / toplam));
    }
  }

  console.log(`\n  ══ ${ad} — ${yazilar.length} yazı ══`);
  console.log(`  ÖĞE                 VAR    İLK GÖRÜLDÜĞÜ DERİNLİK (gövdenin %'si)`);
  for (const [ad2, liste] of Object.entries(derinlikler)) {
    if (!liste.length) { console.log(`  ${ad2.padEnd(18)} 0/${yazilar.length}`); continue; }
    const ort = Math.round(liste.reduce((a, b) => a + b, 0) / liste.length);
    const enErken = Math.min(...liste), enGec = Math.max(...liste);
    console.log(`  ${ad2.padEnd(18)} ${String(liste.length).padStart(2)}/${yazilar.length}   ortalama %${String(ort).padStart(3)}   ·  en erken %${enErken}  en geç %${enGec}`);
  }
  /* ilk görsel/tablo/alıntıdan önce kaç kelime kesintisiz metin var? */
  let ilkKirilim = [];
  for (const f of yazilar) {
    const h = fs.readFileSync(f, 'utf8');
    const g = (h.match(/<article class="yz-govde">([\s\S]*?)<\/article>/) || [])[1];
    if (!g) continue;
    const yerler = Object.values(ISARET).map((re) => { const m = g.match(re); return m ? g.indexOf(m[0]) : Infinity; });
    const ilk = Math.min(...yerler);
    ilkKirilim.push(ilk === Infinity ? kelimeSay(g) : kelimeSay(g.slice(0, ilk)));
  }
  const o = Math.round(ilkKirilim.reduce((a, b) => a + b, 0) / ilkKirilim.length);
  console.log(`\n  İlk görsel/tablo/alıntı/listeye kadar kesintisiz metin: ortalama ${o} kelime  (en kötü ${Math.max(...ilkKirilim)})`);
}
console.log('');
