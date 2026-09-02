/* İhsan SEO Blog standardı — madde madde mekanik denetim.
   Kullanım: node seo-denetim.js <index.html yolu> "<odak ifade>" */
const fs = require('fs');
const DOSYA = process.argv[2];
const ODAK = process.argv[3] || 'e-ticaret yazılımı';
let ham = fs.readFileSync(DOSYA, 'utf8');
/* KRİTİK: <style>/<script> içindeki sınıf adları bölge arayışını yanıltıyor.
   Şema JSON'unu ayrı sakla, gövde araması için işaretleyicileri temizle. */
const semaHam = [...ham.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
ham = ham.replace(/<style[\s\S]*?<\/style>/gi, '<!--CSS-->')
         .replace(/<script[\s\S]*?<\/script>/gi, '<!--JS-->');

/* --- HTML'i bölgelere ayır --- */
const govdeM = ham.match(/<div class="yz-govde"[\s\S]*?<\/div>\s*(?=<[^>]*class="yz-(sss|kopru))/);
function kesit(baslangicRe, bitisRe) {
  const b = ham.search(baslangicRe);
  if (b < 0) return '';
  const kalan = ham.slice(b);
  const s = kalan.search(bitisRe);
  return s < 0 ? kalan : kalan.slice(0, s);
}
/* SSS = yz-govde div'i; son </details>'e kadar */
const sssB = ham.indexOf('yz-sss');
const sonDetails = ham.lastIndexOf('</details>');
const sssBolge = sssB > -1 && sonDetails > sssB ? ham.slice(sssB, sonDetails + 10) : '';

/* gövde = <article class="yz-govde"> ... </article> */
const artB = ham.search(/<article[^>]*class="[^"]*yz-govde/);
const artS = artB > -1 ? ham.indexOf('</article>', artB) : -1;
const govdeHtml = artB > -1 ? ham.slice(artB, artS + 10) : '';
/* köprü kartı (CTA bileşeni) prose sayımına girmemeli */
const kopruB = govdeHtml.search(/<div[^>]*class="[^"]*yz-kopru/);
const kopruHtml = kopruB > -1 ? govdeHtml.slice(kopruB, govdeHtml.indexOf('</div>', govdeHtml.indexOf('</div>', kopruB) + 6) + 6) : '';
const tabloM = govdeHtml.match(/<table[\s\S]*?<\/table>/i);
const tabloHtml = tabloM ? tabloM[0] : '';

function metin(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
const kelimeler = (t) => t.split(/\s+/).filter((w) => /[\wçğıöşüÇĞİÖŞÜ]/.test(w));

const govdeMetin = metin(govdeHtml);
const sssMetin = metin(sssBolge);
const govdeKelime = kelimeler(govdeMetin).length;
const sssKelime = kelimeler(sssMetin).length;
const kopruKelime = kelimeler(metin(kopruHtml)).length;
const tabloKelime = kelimeler(metin(tabloHtml)).length;
const proseKelime = govdeKelime - kopruKelime;

/* --- 4. Odak yoğunluğu (Yoast tüm görünür metni sayar) --- */
const odakRe = new RegExp(ODAK.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ı$/, '') + '\\w*', 'gi');
const govdeGecis = (govdeMetin.match(odakRe) || []).length;
const tumGorunur = metin(ham.slice(ham.indexOf('<main') > -1 ? ham.indexOf('<main') : 0,
  ham.indexOf('<footer') > -1 ? ham.indexOf('<footer') : ham.length));
const tumKelime = kelimeler(tumGorunur).length;
const tumGecis = (tumGorunur.match(odakRe) || []).length;
const odakKelimeSayisi = ODAK.split(' ').length;

/* --- 3. Yapı --- */
const h1 = [...ham.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => metin(m[1]));
const h2 = [...govdeHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => metin(m[1]));
const h3 = [...govdeHtml.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => metin(m[1]));
const h4 = [...govdeHtml.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)].map((m) => metin(m[1]));

/* doğrudan cevap kutuları */
const cevapMetin = [...ham.matchAll(/class="yz-cevap"[^>]*>([\s\S]*?)<\/(?:div|p|aside)>/gi)]
  .map((m) => metin(m[1]));
const cevaplar = cevapMetin.map((c) => kelimeler(c).length);
/* Madde 49 — Google paragraf snippet'i ~300 karakterde kesiyor;
   çekirdek cevabı taşıyan İLK cümle 160 karakteri aşmamalı. */
const cevapIlkKr = cevapMetin.map((c) => c.split(/(?<=[.!?])\s/)[0].length);

/* --- 6. İnsansılık eşikleri --- */
const cumleler = govdeMetin.split(/(?<=[.!?])\s+/).filter((c) => kelimeler(c).length > 2);
const uzunCumle = cumleler.filter((c) => kelimeler(c).length >= 15).length;
const ayrica = (govdeMetin.match(/\bAyrıca\b/g) || []).length;
const ancak = (govdeMetin.match(/\bAncak\b/g) || []).length;
/* ardışık cümle aynı kelimeyle başlıyor mu */
let ardisik = [];
for (let i = 1; i < cumleler.length; i++) {
  const a = kelimeler(cumleler[i - 1])[0], b = kelimeler(cumleler[i])[0];
  if (a && b && a.toLowerCase() === b.toLowerCase()) ardisik.push(a);
}

/* edilgen çatı yaklaşık: -ıl/-il/-ul/-ül/-ın/-in fiil sonları + yardımcı kalıplar */
const edilgenRe = /\b\w+(?:ıl|il|ul|ül|ın|in|un|ün)(?:ıyor|iyor|uyor|üyor|dı|di|du|dü|tı|ti|tu|tü|ır|ir|ur|ür|acak|ecek|malı|meli|mış|miş)\w*\b/gi;
const edilgenCumle = cumleler.filter((c) => edilgenRe.test(c) && (edilgenRe.lastIndex = 0) === 0).length;

/* --- SSS --- */
const sssSorular = [...sssBolge.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)].map((m) => metin(m[1]));
const sssCevaplar = [...sssBolge.matchAll(/<\/summary>([\s\S]*?)<\/details>/gi)]
  .map((m) => kelimeler(metin(m[1])).length);

/* --- 4c. İç linkler --- */
/* İç link sayımı gövde + "İlgili rehberler" bloğunu kapsar.
   Blok <article>'ın DIŞINDA ayrı bir <section>'da duruyor; yalnız govdeHtml'e
   bakan sayım yatay kardeş linklerini 0 gösteriyordu (ölçüm kapsamı hatası). */
const ilgiliM = ham.match(/<nav class="yz-ilgili[\s\S]*?<\/nav>/);
const linkBolgesi = govdeHtml + (ilgiliM ? ilgiliM[0] : '');
const linkler = [...linkBolgesi.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
  .map((m) => ({ href: m[1], metin: metin(m[2]) }))
  .filter((l) => !/^(https?:|tel:|mailto:|#)/.test(l.href) || l.href.includes('tasarimmania'));
const tumSayfaLink = [...ham.matchAll(/<a[^>]+href="(\.\.[^"]*)"/gi)].map((m) => m[1]);
const hizmetLink = linkler.filter((l) => /hizmetler/.test(l.href));
/* Kardeş (yatay) link: aynı blog dizinindeki başka yazı → "../<slug>/".
   "blog/" deseni aramak YANLIŞ; kardeş yolunda o parça bulunmaz. */
const blogLink = linkler.filter((l) => /^\.\.\/[a-z0-9-]+\/$/.test(l.href) || /\/blog\//.test(l.href));
const donusumLink = linkler.filter((l) => /teklif|iletisim/.test(l.href));

/* --- 11. Görseller --- */
const imgler = [...ham.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)].map((m) => m[0]);
const icerikGorseli = imgler.filter((t) => !/logo|marka/.test(t));
const ogImage = (ham.match(/property="og:image"[^>]*content="([^"]*)"/) || [])[1] || 'YOK';
const picture = (ham.match(/<picture/gi) || []).length;
const aiIfsa = /yapay zeka|AI ile üretil|görsel(ler)? yapay/i.test(ham);

/* --- 7. Kanibalizasyon: ayırt edici eksen --- */
/* NOT: Türkçe büyük "İ" JS'te güvenilir küçülmüyor (i + birleşen nokta) —
   bu yüzden /i bayrağına güvenmeden EKSEN sözcüğünü doğrudan arıyoruz. */
const eksen = /EKSEN|eksen|data-eksen/.test(ham);

/* --- 12. Şema --- */
const semalar = semaHam
  .map((s) => { try { return JSON.parse(s); } catch (e) { return { HATA: e.message }; } });
const graf = (semalar[0] && semalar[0]['@graph']) || [];
const faq = graf.find((x) => x['@type'] === 'FAQPage');
const article = graf.find((x) => x['@type'] === 'Article');
const org = graf.find((x) => x['@type'] === 'Organization');

/* --- 4b. Ters dizilim varyantları ---
   ESKİ SÜRÜM YANLIŞ ÖLÇÜYORDU: regex "k0 ... k1", yani DÜZ sırada araya kelime
   girmesini arıyordu. Ters dizilim ise sıranın DEĞİŞMESİ demek. Üstelik
   kelime[1]'e sabitlenmişti; "teknik SEO denetimi" gibi 3 kelimelik odakta son
   kelimeyi hiç görmüyordu. Bir de cümle sınırı tanımadığı için
   "teknik sorunlardır. Teknik SEO" gibi iki ayrı cümleyi tek bulgu sayıyordu.

   DOĞRUSU: SON kelime ÖNCE, İLK kelime SONRA gelecek; ikisi AYNI cümlede,
   aralarında en çok 4 kelime olacak. Türkçe ek almayı karşılamak için
   kelimeler köke indirgenir (son 2 harf atılır, en az 3 harf kalır). */
const kelime = ODAK.split(' ');
const kok = (t) => t.slice(0, Math.max(3, t.length - 2))
  .toLowerCase().replace(/i̇/g, 'i').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const kIlk = kok(kelime[0]);
const kSon = kok(kelime[kelime.length - 1]);
const tersRe = new RegExp(kSon + '\\S*\\s+(?:\\S+\\s+){0,4}' + kIlk + '\\S*', 'gi');
const tersBulgular = tumGorunur
  .split(/(?<=[.?!:])\s+/)                       /* cümle sınırını aşma */
  .flatMap((c) => c.match(tersRe) || []);

/* --- Eş anlamlı çiftler --- */
const ES = [['e-ticaret yazılımı', 'online mağaza altyapısı'], ['SaaS', 'abonelikli sistem'],
  ['hazır paket', 'kurulum tabanlı altyapı'], ['ısmarlama', 'özel yazılım'],
  ['entegrasyon', 'bağlantı'], ['varyasyon', 'kombinasyon']];
const esBulunan = ES.filter(([a, b]) =>
  new RegExp(a, 'i').test(tumGorunur) && new RegExp(b, 'i').test(tumGorunur));

const yuzde = (a, b) => b ? +(a / b * 100).toFixed(2) : 0;
const R = {
  '3_prose(1000-1200,kopruHaric)': proseKelime,
  '3_govdeTumu': govdeKelime,
  '3_bundanTablo': tabloKelime,
  '3_kopruKarti': kopruKelime,
  '3_sssKelime': sssKelime,
  '3_H1': h1.length, '3_H2(5-7)': h2.length, '3_H3': h3.length, '3_H4(>=1)': h4.length,
  '3_dogrudanCevapKutusu': cevaplar.length,
  '3_cevapKelimeleri(40-60)': cevaplar,
  '3_cevapAralikDisi': cevaplar.filter((c) => c < 40 || c > 60).length,
  /* ---- Sürüm 1.1 eşikleri ---- */
  '49_ilkCumleKr(<=160)': cevapIlkKr,
  '49_ilkCumleAsim(0)': cevapIlkKr.filter((n) => n > 160).length,
  '46_soruH2%(>=50)': h2.length ? +(h2.filter((s) => /\?/.test(s)).length / h2.length * 100).toFixed(0) : 0,
  '48_olListe(>=1)': (govdeHtml.match(/<ol[\s>]/gi) || []).length,
  '51_colspan(0)': (govdeHtml.match(/colspan|rowspan/gi) || []).length,
  '51_th': (govdeHtml.match(/<th[\s>]/gi) || []).length,
  '57_metaDesc(150-160)': ((ham.match(/name="description" content="([^"]*)"/) || [])[1] || '').length,
  '45_GEO_Article': ['image', 'about', 'mentions', 'wordCount', 'speakable'].filter((k) => article && article[k]),
  '45_GEO_Org': ['logo', 'sameAs'].filter((k) => org && org[k]),
  '39_degirmenBoyutlari': [...new Set([...ham.matchAll(/-(\d+)\.(webp|jpg)/g)].map((m) => m[1] + m[2][0]))].sort(),
  '4_odak': ODAK,
  '4_tamGecis_govde': govdeGecis,
  '4_tamGecis_tumGorunur': tumGecis,
  '4_yogunluk_govde%': yuzde(govdeGecis * odakKelimeSayisi, govdeKelime),
  '4_yogunluk_tumGorunur%(YOAST)': yuzde(tumGecis * odakKelimeSayisi, tumKelime),
  '4_LSI_baslikta(<=3)': [...h1, ...h2, ...h3, ...h4].filter((b) => odakRe.test(b) && (odakRe.lastIndex = 0) === 0).length,
  '4b_tersDizilimVaryant(2-3)': [...new Set(tersBulgular)],
  '4c_icLink_TOPLAM(6-9)': linkler.length,
  '4c_link_hizmet(yukari)': hizmetLink.length,
  '4c_link_kardesBlog(yatay,3)': blogLink.length,
  '4c_link_donusum(2)': donusumLink.length,
  '5_esAnlamliCift(>=3)': esBulunan.length,
  '6_Ayrica(<=2)': ayrica, '6_Ancak(<=3)': ancak,
  '6_ardisikAyniKelime(0)': ardisik,
  '6_sssFark(>=45)': sssCevaplar.length ? Math.max(...sssCevaplar) - Math.min(...sssCevaplar) : 0,
  '6b_uzunCumle%(<=20)': yuzde(uzunCumle, cumleler.length),
  '6b_edilgen%(<=10)': yuzde(edilgenCumle, cumleler.length),
  '7_ayirtEdiciEksenYazili': eksen,
  '11_icerikGorseliSayisi': icerikGorseli.length,
  '11_pictureEtiketi': picture,
  '11_ogImage': ogImage,
  '11_aiIfsa': aiIfsa,
  '12_semaTipleri': graf.map((x) => x['@type']),
  '12_faqSoru': faq ? faq.mainEntity.length : -1,
  '12_ekranSSS': sssSorular.length,
  '12_semaEkranEsit': faq ? faq.mainEntity.length === sssSorular.length : false,
  '12_articleImage': article ? (article.image ? 'VAR' : 'YOK') : 'ARTICLE YOK',
};
console.log(JSON.stringify(R, null, 1));
