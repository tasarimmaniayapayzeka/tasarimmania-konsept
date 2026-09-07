/* en-blog-dizin-denetim.js — /en/blog/ dizinindeki kartların hedefi var mı?
 *
 * NEDEN: /en/blog/ sayfası 42 blog adresi içeriyor ama şu an 27 İngilizce
 * yazı üretildi. Kalan kartlar Türkçe sayfaya mı gidiyor, yoksa henüz
 * olmayan bir /en/ adresine mi? İkincisi olsaydı dizinde kırık bağlantı
 * olurdu ve okuyucu 404 görürdü.
 *
 * yol-butunlugu.js dosya sistemine bakıyor; bu betik ayrıca DİZİN
 * SAYFASININ KENDİ kartlarını sayıyor — kaç kart /en/'e, kaç kart /blog/'a
 * gidiyor, kaçının hedefi diskte yok.
 *
 *   node plan/en-blog-dizin-denetim.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..', 'site');
const DIZIN = path.join(KOK, 'en', 'blog', 'index.html');
const h = fs.readFileSync(DIZIN, 'utf8');

/* ⚠ 'blog/' GEÇEN href'LERİ ARAMAK YETMEZ. Dizin sayfası /en/blog/ altında
 *   durduğu için kardeş yazıya bağlantı 'product-video-formats/' biçiminde
 *   yazılıyor — içinde 'blog/' YOK. İlk sürüm bu yüzden 27 İngilizce kartın
 *   hiçbirini görmedi ve "İngilizce hedefi VAR: 0" dedi. Doğrusu: TÜM
 *   href'leri topla, dizin sayfasının konumuna göre çöz. */
const adresler = new Set();
for (const m of h.matchAll(/href="([^"#?][^"]*)"/g)) adresler.add(m[1]);

const varOlan = [], yok = [], turkce = [], disAdres = [], akis = [];
for (const a of adresler) {
  /* ⚠ İKİ YANLIŞ POZİTİF ÖLÇÜLDÜ, ELENİYOR:
   *   1. canonical/hreflang MUTLAK adresleri (https://…) diskte aranmaz.
   *   2. rss.xml / atom.xml DOSYA'dır, dizin+index.html değil.
   * İlk sürüm ikisini de "kırık" saydı ve 4 sahte bulgu üretti. */
  if (/^https?:|^mailto:|^tel:/.test(a)) { disAdres.push(a); continue; }
  /* ⚠ ÇAPA (#…) AT, YOLU FİİLEN ÇÖZ. '../#isler' bir sayfa değil, üst
   *   sayfadaki bir bölüm. Ayrıca /assets/ site kökünün DIŞINDA olduğu için
   *   '/en/blog' + göreli yol biçiminde birleştirmek yanlış sonuç veriyordu;
   *   doğrusu dizin dosyasının kendi klasöründen path.resolve(). Ölçüldü:
   *   yanlış yöntem 6 sahte "kırık" üretti (css, logo, iki çapa). */
  const temiz = a.split('#')[0].split('?')[0];
  if (!temiz) { disAdres.push(a); continue; }
  const hedef = temiz.startsWith('/')
    ? path.join(KOK, temiz.replace(/^\//, ''))
    : path.resolve(path.dirname(DIZIN), temiz);
  const gorece = '/' + path.relative(KOK, hedef).replace(/\\/g, '/');

  if (/\.[a-z0-9]{2,4}$/i.test(temiz)) {           /* dosya: css, png, xml… */
    if (!fs.existsSync(hedef)) yok.push(a);
    else if (/\.(xml|json|txt)$/i.test(temiz)) akis.push(a);
    else disAdres.push(a);                          /* varlık dosyası, sayfa değil */
    continue;
  }
  /* ⚠ '/en' ile '/en/' AYNI SAYFA. path.relative() İngilizce kök için
   *   sondaki eğik çizgisiz 'en' döndürüyor; yalnız startsWith('/en/')
   *   bakınca ana sayfaya giden 3 bağlantı "Türkçe" sayıldı. */
  const ingilizce = gorece === '/en' || gorece.startsWith('/en/');
  if (!fs.existsSync(path.join(hedef, 'index.html'))) yok.push(a);
  else if (!ingilizce) turkce.push(a);
  else varOlan.push(a);
}

console.log('');
console.log(`  /en/blog/ dizinindeki blog bağlantısı : ${adresler.size}`);
console.log(`  İngilizce hedefi VAR                  : ${varOlan.length}`);
console.log(`  Türkçe sayfaya gidiyor                : ${turkce.length}  (henüz çevrilmemiş — DOĞRU davranış)`);
console.log(`  akış dosyası (rss/atom)               : ${akis.length}`);
console.log(`  dış adres + varlık dosyası            : ${disAdres.length}`);
console.log(`  HEDEFİ YOK (kırık)                    : ${yok.length}`);
console.log('');
if (turkce.length) {
  console.log('  Türkçeye giden kartlar (henüz çevrilmemiş yazılar):');
  turkce.sort().forEach((a) => console.log(`     → ${a}`));
  console.log('');
}
if (yok.length) {
  console.log('  ⚠ KIRIK:');
  yok.sort().forEach((a) => console.log(`     ✗ ${a}`));
  console.log('');
}
