/* en-son-tarama.js — TÜM İngilizce sayfalarda kalan Türkçe metni arar.
 *
 * Üretici her sayfayı üretim ANINDA denetliyor ("çevrilmemiş dizge: 0").
 * Ama sayfa üretildikten sonra da dokunuluyor: en-ic-link.js, en-birim.js,
 * en-hreflang.js. Bu betik SON HÂLİ tarar — kaymışsa burada görünür.
 *
 * Neye bakar:
 *   1. Görünür metin düğümleri (script/style/yorum MASKELİ)
 *   2. Görünür öznitelikler (alt, title, aria-label, placeholder, content)
 *   3. Script içi insan metni (en-script-suzgec.js süzgeciyle)
 *   4. noindex hâlâ yerinde mi
 *
 * Muaf: marka adı, ülke adı, adres, kişi adı, platform/kurum adları —
 * bunlar BİLEREK Türkçe (sözlükteki "Çevrilmeyenler" başlığı).
 *
 *   node plan/en-son-tarama.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { scriptBloklari, gorunurDizgelerAyrintili, insanMetni } = require('./en-script-suzgec.js');

const KOK = path.join(__dirname, '..', 'site', 'en');
const TR_HARF = /[çğıöşüÇĞİÖŞÜ]/;

/* Bilerek Türkçe kalanlar. Sözlükteki "Çevrilmeyenler" başlığının karşılığı. */
const MUAF = [
  /* marka / kurum / platform */
  'TasarımMania', 'RTÜK', 'ETBİS', 'TÜİK', 'İleti Yönetim Sistemi',
  'IdeaSoft', 'ikas', 'Yoast',
  /* yer adı — adres ve hizmet bölgesi */
  'Türkiye', 'İstanbul', 'Bakırköy', 'Küçükçekmece', 'Bahçelievler',
  'Özgürlük Meydanı',
  /* kişi adı — kurucu ve yorum sahipleri */
  'İhsan Ar', 'Murat Aydın', 'Selin Erdoğan', 'Emre Kılıç', 'Dr. Serkan Yıldız',
  /* Türkçe arama örneği — /blog/keyword-research/ Türkçe arama davranışını
   * anlatıyor; örnekler çevrilirse pasaj anlamsız kalır (ekli hâl farkı ve
   * noktasız yazım ancak Türkçede görünür). */
  'çelik kapı fiyatları', 'çelik kapı fiyatı', 'ısıtıcı',
  /* müşteri markası — logo alt metni */
  'SKS İnşaat', 'Oba Diş Ağız ve Diş Sağlığı Polikliniği', 'Sevinç Kurs Merkezi',
];
const muafSil = (s) => MUAF.reduce((a, m) => a.split(m).join(''), s);

function sayfalar(dizin) {
  const cikti = [];
  for (const ad of fs.readdirSync(dizin)) {
    const tam = path.join(dizin, ad);
    if (fs.statSync(tam).isDirectory()) cikti.push(...sayfalar(tam));
    else if (ad === 'index.html') cikti.push(tam);
  }
  return cikti;
}

/* script/style gövdesini ve HTML yorumlarını boşlukla doldur — metin taramasından çıkar. */
function maskele(h) {
  return h
    .replace(/<!--[\s\S]*?-->/g, (m) => ' '.repeat(m.length))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (m) => ' '.repeat(m.length))
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (m) => ' '.repeat(m.length));
}

const GORUNUR_OZNITELIK = /\s(?:alt|title|aria-label|placeholder|content)="([^"]*)"/g;

let toplamBulgu = 0, noindexsiz = 0;
const rapor = [];

for (const dosya of sayfalar(KOK)) {
  const ham = fs.readFileSync(dosya, 'utf8');
  const kisa = '/' + path.relative(path.join(__dirname, '..', 'site'), dosya)
    .replace(/\\/g, '/').replace(/index\.html$/, '');
  const bulgu = [];

  /* 1 — metin düğümleri */
  const maskeli = maskele(ham);
  for (const m of maskeli.matchAll(/>([^<]+)</g)) {
    const d = muafSil(m[1]).trim();
    if (d.length >= 3 && TR_HARF.test(d)) bulgu.push(`metin   : ${d.slice(0, 90)}`);
  }

  /* 2 — görünür öznitelikler (yorum/script dışında) */
  for (const m of maskeli.matchAll(GORUNUR_OZNITELIK)) {
    const d = muafSil(m[1]).trim();
    if (d.length >= 3 && TR_HARF.test(d)) bulgu.push(`öznitelik: ${d.slice(0, 90)}`);
  }

  /* 3 — script içi insan metni
   * ⚠ TARAYICIYA TÜM DOSYAYI VERMEYİN. gorunurDizgelerAyrintili() bir JS
   *   çözümleyicisi; HTML gövdesini JS sanınca "Let's" içindeki kesme
   *   işareti dizge açıyor ve sayfanın yarısı "script metni" görünüyor.
   *   Ölçüldü: yanlış kullanımda 257 sahte bulgu. Önce scriptBloklari(). */
  for (const blok of scriptBloklari(ham))
    for (const s of gorunurDizgelerAyrintili(blok.kod)) {
      if (!insanMetni(s.ham)) continue;
      const d = muafSil(s.ham).trim();
      if (d.length >= 3 && TR_HARF.test(d)) bulgu.push(`script  : ${d.slice(0, 90)}`);
    }

  /* 4 — noindex duruyor mu */
  if (!/name="robots"[^>]*noindex/i.test(ham)) { noindexsiz++; bulgu.push('⚠ noindex YOK'); }

  if (bulgu.length) { toplamBulgu += bulgu.length; rapor.push({ kisa, bulgu }); }
}

const toplamSayfa = sayfalar(KOK).length;
console.log('');
console.log(`  taranan İngilizce sayfa: ${toplamSayfa}`);
console.log(`  muaf tutulan ad        : ${MUAF.length}  (${MUAF.join(', ')})`);
console.log('');
if (!rapor.length) {
  console.log('  ✓ görünür metin, öznitelik ve script içinde KALAN TÜRKÇE YOK');
} else {
  for (const r of rapor) {
    console.log(`  ${r.kisa}  —  ${r.bulgu.length} bulgu`);
    for (const b of r.bulgu.slice(0, 12)) console.log(`     ${b}`);
    if (r.bulgu.length > 12) console.log(`     … +${r.bulgu.length - 12}`);
  }
}
console.log('');
console.log(`  TOPLAM bulgu: ${toplamBulgu}  ·  noindex'i olmayan sayfa: ${noindexsiz}/${toplamSayfa}`);
console.log('');
