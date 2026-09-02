/* 27 yazıyı SEO Kuralları v1.2 bantlarına karşı TOPLU değerlendirir.
 *
 * NEDEN AYRI BİR BETİK: seo-denetim.js ham ölçüm JSON'u döker, geçti/kaldı
 * KARARI VERMEZ. "✗ sayısı 0" diye okumak ölçüm değil, boşluk saymaktır.
 * Karar bantları burada, tek yerde tanımlı.
 *
 * BİLİNEN ÖLÇÜM ARIZALARI (içerik doğru, ölçüm yanlış — KARARA KATILMAZ,
 * ayrı listelenir):
 *   5_esAnlamliCift     : eş anlamlı sözlüğü 1. yazının kelimelerine sabit
 *   6b_edilgen%         : "profildir/bulundu/bilinirlik" edilgen sanıyor
 *   6_ardisikAyniKelime : başlıkları cümle sayıyor
 *
 * Kullanım: node plan/seo-toplu-degerlendir.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');

const HARITA = JSON.parse(fs.readFileSync(path.join(KOK, 'plan/blog-uretim-haritasi.json'), 'utf8'));
const YAZILAR = HARITA.yazilar || HARITA.makaleler || HARITA;

/* [anahtar, açıklama, testFn] — testFn true dönerse geçer */
const BANTLAR = [
  ['3_prose(1000-1200,kopruHaric)', 'gövde 1000-1200 kelime', (v) => v >= 1000 && v <= 1200],
  ['3_H2(5-7)', 'H2 sayısı 5-7', (v) => v >= 5 && v <= 7],
  ['3_cevapAralikDisi', 'doğrudan cevap 40-60 kelime', (v) => v === 0],
  ['49_ilkCumleAsim(0)', 'Madde 49: ilk cümle <=160 kr', (v) => v === 0],
  ['46_soruH2%(>=50)', 'H2\'lerin >=%50\'si soru', (v) => v >= 50],
  ['57_metaDesc(150-160)', 'meta description 150-160 kr', (v) => v >= 150 && v <= 160],
  ['4_yogunluk_govde%', 'odak yoğunluğu %2.2-2.4', (v) => v >= 2.2 && v <= 2.4],
  ['4b_tersDizilimVaryant(2-3)', 'ters dizilim 2-3 varyant', (v) => v.length >= 2 && v.length <= 3],
  ['4c_icLink_TOPLAM(6-9)', 'iç link 6-9', (v) => v >= 6 && v <= 9],
  ['4c_link_kardesBlog(yatay,3)', 'yatay kardeş link 3', (v) => v === 3],
  ['6_Ayrica(<=2)', '"Ayrıca" <=2', (v) => v <= 2],
  ['6_Ancak(<=3)', '"Ancak" <=3', (v) => v <= 3],
  ['6_sssFark(>=45)', 'SSS en uzun-en kısa farkı >=45', (v) => v >= 45],
  ['6b_uzunCumle%(<=20)', '15+ kelimelik cümle <=%20', (v) => v <= 20],
  ['12_faqSoru', 'SSS 7-9 soru', (v) => v >= 7 && v <= 9],
  ['12_semaEkranEsit', 'şema SSS = ekran SSS', (v) => v === true],
  ['12_articleImage', 'Article.image var', (v) => v === 'VAR'],
  ['11_aiIfsa', 'AI görsel ifşası', (v) => v === true],
  ['7_ayirtEdiciEksenYazili', 'ayırt edici eksen yazılı', (v) => v === true],
  ['51_colspan(0)', 'tabloda colspan yok', (v) => v === 0],
  ['39_degirmenBoyutlari', 'değirmen 5 boyut', (v) => v.length === 5],
  ['45_GEO_Article', 'GEO Article 5 alan', (v) => v.length === 5],
  ['45_GEO_Org', 'GEO Organization 2 alan', (v) => v.length === 2],
];

const ARIZALI = ['5_esAnlamliCift(>=3)', '6b_edilgen%(<=10)', '6_ardisikAyniKelime(0)'];

const sapma = {};       // bant -> [ {slug, deger} ]
let tamGecen = 0;
const okunamayan = [];

YAZILAR.forEach((y) => {
  const p = path.join(KOK, 'site/blog/' + y.slug + '/index.html');
  if (!fs.existsSync(p)) { okunamayan.push(y.slug + ' → dosya yok'); return; }
  let m;
  try {
    m = JSON.parse(execSync('node "' + path.join(KOK, 'plan/seo-denetim.js') + '" "' + p + '" "' + y.odak + '"', { encoding: 'utf8' }));
  } catch (e) { okunamayan.push(y.slug + ' → denetim çöktü'); return; }

  let temiz = true;
  BANTLAR.forEach(([anahtar, aciklama, test]) => {
    if (!(anahtar in m)) { (sapma['ÖLÇÜLEMEDİ: ' + aciklama] = sapma['ÖLÇÜLEMEDİ: ' + aciklama] || []).push({ slug: y.slug, deger: '-' }); temiz = false; return; }
    if (!test(m[anahtar])) {
      const d = Array.isArray(m[anahtar]) ? m[anahtar].length : m[anahtar];
      (sapma[aciklama] = sapma[aciklama] || []).push({ slug: y.slug, deger: d });
      temiz = false;
    }
  });
  if (temiz) tamGecen++;
});

console.log('DEĞERLENDİRİLEN : ' + YAZILAR.length + ' yazı × ' + BANTLAR.length + ' bant');
console.log('TÜM BANTLARI TUTTURAN: ' + tamGecen + '/' + YAZILAR.length);
if (okunamayan.length) { console.log('\nOKUNAMAYAN:'); okunamayan.forEach((x) => console.log('  ' + x)); }

const sapmaListesi = Object.entries(sapma).sort((a, b) => b[1].length - a[1].length);
if (!sapmaListesi.length) { console.log('\nHiçbir bantta sapma yok.'); }
else {
  console.log('\n--- SAPMALAR (bant bazında) ---');
  sapmaListesi.forEach(([ad, liste]) => {
    console.log('\n' + ad + '  → ' + liste.length + ' yazı');
    liste.forEach((x) => console.log('    ' + x.slug.padEnd(42) + x.deger));
  });
}
console.log('\n--- KARARA KATILMAYAN (ölçüm arızalı, Madde: içerik doğru ölçüm yanlış) ---');
ARIZALI.forEach((a) => console.log('  ' + a));
