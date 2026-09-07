/* BLOG DETAY GÖVDESİ — TEŞHİS (hiçbir şeyi değiştirmez)
 *
 * Kullanıcı: "blog detaylarının içini hiç beğenmedim, foto yazılar öyle."
 * Öneri yazmadan ÖNCE ne olduğunu ölçüyoruz — [[olcmeden-konusma]].
 *
 * Kullanım: node plan/blog-govde-teshis.js
 *
 * Ölçülenler (her yazı için):
 *   · kelime sayısı ve kaba sayfa yüksekliği
 *   · GÖRSEL sayısı ve kelime başına görsel aralığı
 *   · ÇIPLAK METİN DÜĞÜMÜ: <p> ile sarılmamış, doğrudan <article> altında
 *     duran metin blokları.
 *
 *     ⚠⚠ BU BETİĞİN ÇIPLAK METİN SAYIMI ŞİŞİK — KULLANMAYIN.
 *     Aşağıdaki BLOK deseni gövdeyi hem AÇILIŞ hem KAPANIŞ etiketinden
 *     bölüyor. Bu yüzden <div class="yz-cevap"><p>METİN</p></div> içindeki
 *     METİN, düzgünce <p> içinde olmasına rağmen "çıplak" sayılıyor.
 *     Yazı başına 38 düğüm / gövdenin %95'i dedi; DOĞRUSU 4 düğüm / %13.
 *     Yaklaşık 7 kat şişik. Doğru sayım: plan/ciplak-metin-olc.js
 *     (dengeli kapanışla üst düzey blokları atlar).
 *     Buradaki DİĞER ölçümler (görsel sayısı, görselsiz koşu) basit dizge
 *     araması yaptığı için bu hatadan ETKİLENMİYOR.
 *   · görsel ARA mesafesi: iki görsel arası kaç kelime
 *   · ritim öğeleri: tablo, alıntı, liste, köprü kutusu, kart
 *
 * ⚠ ÇIPLAK METİN DÜĞÜMÜNÜ REGEX'LE SAYMAK KOLAY DEĞİL. Yöntem: <article>
 *   içeriğini üst düzey blok etiketlerinden BÖL; aralarda kalan, boşluktan
 *   ibaret olmayan parçalar çıplak düğümdür.
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');

const BLOK = /<\/?(?:h[1-6]|p|div|figure|table|ol|ul|blockquote|aside|section|nav|pre)\b[^>]*>/gi;

function analiz(dosya) {
  const h = fs.readFileSync(dosya, 'utf8');
  const g = h.match(/<article class="yz-govde">([\s\S]*?)<\/article>/);
  if (!g) return null;
  const govde = g[1];

  /* üst düzey blokları çıkar, kalan metin düğümlerine bak */
  const parcalar = govde.split(BLOK);
  const ciplak = parcalar
    .map((p) => p.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim())
    .filter((p) => p.length > 40);           // 40 karakter altı = tire, tarih vb.

  const kelime = govde.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;

  /* görseller: gövde + kapak */
  const govdeGorsel = (govde.match(/<figure class="yz-gorsel"/g) || []).length;
  const kapak = /<figure class="yz-kapak"/.test(h) ? 1 : 0;

  /* görseller arası kelime aralığı */
  const kesitler = govde.split(/<figure class="yz-gorsel"/);
  const aralik = kesitler.map((k) => k.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length);

  return {
    yol: '/' + path.relative(S, dosya).split(path.sep).join('/').replace(/index\.html$/, ''),
    kelime,
    p: (govde.match(/<p\b/g) || []).length,
    ciplakDugum: ciplak.length,
    ciplakKelime: ciplak.reduce((a, c) => a + c.split(/\s+/).length, 0),
    kapak, govdeGorsel, toplamGorsel: kapak + govdeGorsel,
    kelimeBasinaGorsel: Math.round(kelime / Math.max(1, kapak + govdeGorsel)),
    enUzunGorselsizKosu: Math.max(...aralik),
    h2: (govde.match(/<h2\b/g) || []).length,
    h3: (govde.match(/<h3\b/g) || []).length,
    tablo: (govde.match(/<table\b/g) || []).length,
    alinti: (govde.match(/class="yz-alinti"/g) || []).length,
    liste: (govde.match(/<(?:ol|ul)\b/g) || []).length,
    kopru: (govde.match(/class="yz-kopru"/g) || []).length,
  };
}

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}

for (const [ad, kok] of [['TÜRKÇE', path.join(S, 'blog')], ['İNGİLİZCE', path.join(S, 'en', 'blog')]]) {
  const yazilar = tara(kok).map(analiz).filter(Boolean);
  const top = (k) => yazilar.reduce((a, y) => a + y[k], 0);
  const ort = (k) => Math.round(top(k) / yazilar.length);

  console.log(`\n  ══ ${ad} — ${yazilar.length} yazı ══\n`);
  console.log(`  ortalama kelime            : ${ort('kelime')}`);
  console.log(`  ortalama GÖRSEL            : ${(top('toplamGorsel') / yazilar.length).toFixed(2)}  (kapak dahil)`);
  console.log(`  kaç kelimede bir görsel    : ${ort('kelimeBasinaGorsel')}`);
  console.log(`  en uzun görselsiz koşu (ort): ${ort('enUzunGorselsizKosu')} kelime`);
  console.log(`  ortalama <p>               : ${ort('p')}`);
  console.log(`  ÇIPLAK metin düğümü (ort)  : ${ort('ciplakDugum')}   ← <p> ile sarılmamış`);
  console.log(`  çıplak metnin kelimesi (ort): ${ort('ciplakKelime')}  (%${Math.round(100 * top('ciplakKelime') / top('kelime'))} gövdenin)`);
  console.log(`  ritim öğeleri (toplam)     : tablo ${top('tablo')} · alıntı ${top('alinti')} · liste ${top('liste')} · köprü ${top('kopru')}`);
  console.log(`  başlık (ort)               : h2 ${ort('h2')} · h3 ${ort('h3')}`);

  const gorselsiz = yazilar.filter((y) => y.govdeGorsel === 0);
  console.log(`\n  GÖVDESİNDE HİÇ GÖRSEL OLMAYAN: ${gorselsiz.length}/${yazilar.length}`);
  const tekGorsel = yazilar.filter((y) => y.govdeGorsel === 1).length;
  console.log(`  gövdesinde TEK görsel olan   : ${tekGorsel}/${yazilar.length}`);
  const ciplaksiz = yazilar.filter((y) => y.ciplakDugum === 0).length;
  console.log(`  çıplak metni HİÇ olmayan     : ${ciplaksiz}/${yazilar.length}`);

  const enKotu = [...yazilar].sort((a, b) => b.enUzunGorselsizKosu - a.enUzunGorselsizKosu).slice(0, 5);
  console.log(`\n  en uzun görselsiz koşular:`);
  for (const y of enKotu) console.log(`    ${String(y.enUzunGorselsizKosu).padStart(4)} kelime · ${y.yol}`);
}
console.log('');
