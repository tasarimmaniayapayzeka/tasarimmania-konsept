/* GEO onarım — Aşama 13: dış kaynak referansı (Modül 35 / Source Attribution)
 *
 * ÖLÇÜLEN DURUM: 42 blog yazısının 14'ünde gövde içi DIŞ kaynak bağlantısı
 * yoktu. Bu 14'ü, sonradan yazılan mobil/video yazıları. Sitedeki mevcut desen
 * resmî kurum kaynağı (ETBİS, TÜİK, BTK); aynı çizgi sürdürülüyor.
 *
 * ⚠ ÖNCE DENETİM HATASI DÜZELTİLDİ: eski ölçüt "www.tasarimmania olmayan her
 *   https bağlantısı" sayıyordu ve her sayfadaki WhatsApp bağlantısını kaynak
 *   sanıp "42/42 tamam" diyordu. Gerçek 28/42'ydi.
 *
 * ⚠ HER URL ELLE DOĞRULANDI (curl, 200). Çalışmayan bağlantı konulmadı.
 *
 * ⚠ CÜMLELER 14 KELİMEYİ AŞMIYOR: denetim 15+ kelimeyi "uzun cümle" sayıyor ve
 *   bir yazı zaten %16 ile eşiğe yakındı. Ayrıca eklenen kelime yoğunluğu
 *   düşürür; en dar yazı %2,27 idi, 20 kelime eklense %2,23 olur — eşik %2,2.
 *
 * ⚠ YAPILANDIRMAYA yazılır, HTML'e değil: yazılar üreticiden geliyor, doğrudan
 *   HTML'e yazmak ilk blog-uret.js koşusunda silinirdi.
 *
 * Kullanım: node plan/geo-onar-13-kaynak.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const UYGULA = process.argv.includes('--uygula');

const bag = (u, m) => `<a href="${u}" target="_blank" rel="noopener">${m}</a>`;
const REKLAM = 'https://ticaret.gov.tr/tuketici/ticari-reklamlar';
const KVKK = 'https://www.kvkk.gov.tr/';
const TELIF = 'https://www.telifhaklari.gov.tr/';
const RTUK = 'https://www.rtuk.gov.tr/';
const AS_INCELEME = 'https://developer.apple.com/app-store/review/guidelines/';
const AS_URUN = 'https://developer.apple.com/app-store/product-page/';
const HIG = 'https://developer.apple.com/design/human-interface-guidelines/';
const RN = 'https://reactnative.dev/';

/* slug → [bölüm indeksi, eklenecek cümle] */
const EKLER = {
  'e-ticaret-urun-videosu-formatlari': [4,
    `Pazaryeri kuralları kadar mevzuat da bağlar; ${bag(REKLAM, 'ticari reklam kuralları')} videodaki vaat için de geçerlidir.`],
  'kamerasiz-urun-videosu': [4,
    `Üretilen görüntü ürünü olduğundan farklı göstermemeli; ${bag(REKLAM, 'ticari reklam mevzuatı')} bunu açıkça yasaklar.`],
  'mobil-uygulama-gelistirme-sureci': [4,
    `Reddedilme sebepleri tahmin değil yazılı kuraldır; ${bag(AS_INCELEME, 'App Store inceleme kılavuzu')} hepsini sıralar.`],
  'mobil-uygulama-yaptirma-sorulari': [3,
    `Uygulama kişisel veri topluyorsa ${bag(KVKK, 'KVKK’nın veri sorumlusu yükümlülükleri')} sözleşmede baştan yazılmalı.`],
  'native-mi-cross-platform-mi': [1,
    `Platform beklentileri belgelidir; ${bag(HIG, 'Apple’ın arayüz kılavuzu')} ile Material Design farklı davranış tarif eder.`],
  /* ⚠ ÇAPA METNİNDE ODAK İFADE KULLANMAYIN: ilk sürümde çapa "React Native’in
     resmî belgeleri" idi; odak ifadeyi bir kez daha geçirdiği için yoğunluk
     %2,38'den %2,54'e çıktı ve eşiği (%2,2-2,4) aştı. Ölçüldü. */
  'react-native-mi-flutter-mi': [3,
    `İki çatının sürüm politikası açık; ${bag(RN, 'resmî çatı belgeleri')} kırılan değişiklikleri duyurur.`],
  'reklam-filmi-ajansi-secimi': [4,
    `Vaadin kendisi de denetlenir; ${bag(REKLAM, 'ticari reklam kuralları')} abartılı iddiayı marka sahibine fatura eder.`],
  'reklam-filmi-cekim-asamalari': [1,
    `Mecra kuralları çekimden önce bilinmeli; ${bag(RTUK, 'RTÜK’ün yayın ilkeleri')} süre ve içerik sınırı koyar.`],
  'reklam-filmi-fiyat-kalemleri': [3,
    `Müzik ve seslendirme telif konusudur; ${bag(TELIF, 'Telif Hakları Genel Müdürlüğü')} kullanım iznini tarif eder.`],
  'storyboard-nedir': [1,
    `Senaryo ve storyboard birer eserdir; ${bag(TELIF, 'telif mevzuatı')} hakkın kime ait olduğunu belirler.`],
  'urun-videosu-studyo-mu-mekan-mi': [1,
    `Mekân kullanımı yazılı izin ister; ${bag(TELIF, 'telif ve izin mevzuatı')} sonradan çıkan sorunları önler.`],
  'uygulama-magaza-optimizasyonu': [1,
    `Alan uzunlukları tahminle değil kuralla belli; ${bag(AS_URUN, 'App Store ürün sayfası kılavuzu')} sınırları yazar.`],
  'web-sitesine-chatbot-eklemek': [3,
    `Sohbet kayıtları kişisel veridir; ${bag(KVKK, 'KVKK’nın aydınlatma yükümlülüğü')} chatbot için de geçerlidir.`],
  /* ⚠ EDİLGEN ÇATI KULLANMAYIN: ilk sürüm "Üretilen sahne de reklam sayılır"
     idi; iki edilgen biçim (üretil-en, say-ılır) yazının edilgen oranını
     %9,48'den %10,26'ya çıkardı, eşik %10. Ölçüldü. */
  'yapay-zeka-ile-video-uretimi': [3,
    `Bu sahneler de reklamdır; ${bag(REKLAM, 'ticari reklam kuralları')} yanıltıcı gösterimi yasaklar.`],
};

const dosyalar = fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f));
const kelimeSay = (s) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

let n = 0; const sorun = [];
console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);

for (const [slug, [bolumNo, cumle]] of Object.entries(EKLER)) {
  const yd = dosyalar.find((f) => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')).slug === slug);
  if (!yd) { sorun.push(`${slug} — yapılandırma yok`); continue; }
  const p = path.join(__dirname, yd);
  const C = JSON.parse(fs.readFileSync(p, 'utf8'));
  const b = C.yazi.bolumler[bolumNo];
  if (!b) { sorun.push(`${slug} — bölüm ${bolumNo} yok`); continue; }
  if (/<a href="https?:\/\/(?!www\.tasarimmania)/.test(b.govde)) {
    console.log(`  · ${slug} — bölüm ${bolumNo}'de zaten dış bağ var, atlandı`);
    continue;
  }
  const kSayi = kelimeSay(cumle);
  if (kSayi > 14) { sorun.push(`${slug} — cümle ${kSayi} kelime (en fazla 14)`); continue; }

  /* bölümün SON paragrafının içine, kapanış </p>'sinden hemen önce */
  const son = b.govde.lastIndexOf('</p>');
  if (son < 0) { sorun.push(`${slug} — bölüm ${bolumNo}'de <p> yok`); continue; }
  C.yazi.bolumler[bolumNo].govde = b.govde.slice(0, son) + ' ' + cumle + b.govde.slice(son);

  n++;
  console.log(`  ✓ ${slug.padEnd(36)} bölüm ${bolumNo} · +${kSayi} kelime`);
  console.log(`      ${b.h2}`);
  if (UYGULA) fs.writeFileSync(p, JSON.stringify(C, null, 2) + '\n', 'utf8');
}

console.log(`\n  ${n} yazıya kaynak eklendi`);
if (sorun.length) { console.log('\n  ✗ SORUNLU:'); sorun.forEach((x) => console.log('    ' + x)); }
console.log(UYGULA ? '\n  ŞİMDİ: node plan/blog-uret.js ile yeniden üret, sonra node plan/onarim-turu.js --uygula\n'
  : '\n  Uygulamak için: --uygula\n');
