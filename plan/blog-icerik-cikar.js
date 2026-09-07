/* Gerçek bir blog yazısının gövdesini yapıya çevirir — demo sayfası
 * uydurma metinle değil, SİTENİN KENDİ metniyle karşılaştırılsın diye.
 *
 * Kullanım: node plan/blog-icerik-cikar.js [slug] > plan/blog-ornek.json
 *
 * ⚠ ÇIPLAK METİN DÜĞÜMLERİ BURADA YAKALANIYOR. Gövdenin %95'i <p> ile
 *   sarılmamış; ayrıştırıcı "etiketler arasında kalan metin" parçalarını
 *   paragraf olarak topluyor. Çıktıdaki "ciplakti:true" bunu işaretler.
 */
const fs = require('fs'), path = require('path');
const slug = process.argv[2] || 'e-ticaret-seo';
const dosya = path.join(__dirname, '..', 'site', 'blog', slug, 'index.html');
const h = fs.readFileSync(dosya, 'utf8');

const govde = h.match(/<article class="yz-govde">([\s\S]*?)<\/article>/)[1];
const basmatik = h.match(/<h1>([\s\S]*?)<\/h1>/)[1].trim();
const ozet = (h.match(/<p class="ozet">([\s\S]*?)<\/p>/) || [])[1]?.trim() || '';
const kat = (h.match(/<span class="yz-kat">([\s\S]*?)<\/span>/) || [])[1]?.trim() || '';
const meta = (h.match(/<span class="yz-meta">([\s\S]*?)<\/span>/) || [])[1]?.trim() || '';

/* Blok başlangıçlarını bul, aralarını paragraf say
 * ⚠ İLK SÜRÜM YANLIŞTI: `<(h2|div class="yz-cevap"|…)\b` yazılmıştı; grubun
 *   sonu `"` karakteri, ardından `>` geliyor — ikisi de kelime karakteri
 *   olmadığı için \b HİÇ eşleşmiyordu. Sonuç: 6 cevap kutusu, tablo, alıntı,
 *   köprü ve gövde görseli "paragraf" sayıldı ya da tamamen yutuldu.
 *   Doğrusu: sınıflı bloklar AYRI kolda, \b'siz. */
const BLOK = /<(?:(h2|h3|h4|ol|ul)\b|(div|figure|blockquote|aside) class="(yz-[a-z]+)")/g;
const ogeler = [];
let m, sonSon = 0, acik = null;

function metinEkle(ham) {
  const t = ham.trim();
  if (t.replace(/<[^>]+>/g, '').trim().length < 40) return;
  ogeler.push({ tur: 'paragraf', ciplakti: true, ic: t });
}
/* dengeli kapanışı bul (iç içe aynı etiket olabilir) */
function kapanisBul(s, i, etiket) {
  const ac = new RegExp(`<${etiket}\\b`, 'g'), kap = new RegExp(`</${etiket}>`, 'g');
  ac.lastIndex = i + 1; kap.lastIndex = i + 1;
  let derinlik = 1, p = i + 1;
  while (derinlik > 0) {
    ac.lastIndex = p; kap.lastIndex = p;
    const a = ac.exec(govde), k = kap.exec(govde);
    if (!k) return govde.length;
    if (a && a.index < k.index) { derinlik++; p = a.index + 1; }
    else { derinlik--; p = k.index + 1; if (!derinlik) return k.index + `</${etiket}>`.length; }
  }
  return govde.length;
}

while ((m = BLOK.exec(govde))) {
  metinEkle(govde.slice(sonSon, m.index));
  const etiket = m[1] || m[2];
  const son = kapanisBul(govde, m.index, etiket);
  const parca = govde.slice(m.index, son);
  ogeler.push({
    tur: m[3] || etiket,
    ic: parca,
    metin: parca.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  });
  sonSon = son; BLOK.lastIndex = son;
}
metinEkle(govde.slice(sonSon));

process.stdout.write(JSON.stringify({ slug, basmatik, ozet, kat, meta, ogeler }, null, 1));
