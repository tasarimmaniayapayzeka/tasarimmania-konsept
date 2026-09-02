/* Madde 45 / Madde 73 — Organization.sameAs marka doğrulama katmanı.
 *
 * Kullanıcı 2 Eyl 2026'da gerçek hesapları verdi; ikisi de canlı doğrulandı:
 *   Instagram → HTTP 200, başlık "Tasarım Mania (@tasarimmaniaa)"
 *   Facebook  → curl'e 400 döner ama başlık geliyor: "Tasarımmania | Istanbul"
 * (Bu yüzden UYDURMA yasağına takılmıyor — ikisi de ölçümle doğrulandı.)
 *
 * İki şema tipine de ekleniyor:
 *   1. Organization  (@id'li kuruluş düğümü)   → 27 blog yazısı
 *   2. ProfessionalService (provider düğümü)   → hizmet sayfaları
 *
 * Kullanım: node plan/sameas-ekle.js [--kuru]
 */
const fs = require('fs');
const path = require('path');
const KOK = __dirname + '/..';
const KURU = process.argv.includes('--kuru');

const HESAPLAR = [
  'https://www.instagram.com/tasarimmaniaa/',
  'https://www.facebook.com/tasarimmania/',
];

function sayfalar(dir, liste) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) sayfalar(tam, liste);
    else if (e.name === 'index.html') liste.push(tam);
  });
  return liste;
}

const dosyalar = sayfalar(KOK + '/site', []);
let org = 0, prof = 0, atla = 0, hata = 0;

/* sameAs bloğunu telephone satırının hemen ardına ekler — her iki şemada da
   telephone bulunuyor ve girintisi tutarlı. */
function ekle(icerik, girinti) {
  const satirlar = HESAPLAR.map((u) => girinti + '  "' + u + '"').join(',\n');
  return icerik + '\n' + girinti + '"sameAs": [\n' + satirlar + '\n' + girinti + '],';
}

dosyalar.forEach((P) => {
  let h = fs.readFileSync(P, 'utf8');
  if (h.includes('"sameAs"')) { atla++; return; }

  const once = h;

  /* 1) Organization düğümü — blog yazılarında  "telephone": "+905547916545", */
  h = h.replace(/(\n(\s*)"telephone": "\+905547916545",)/g, (m, tam, gir) => ekle(tam, gir));

  /* 2) ProfessionalService provider — "telephone": "+905547916545", (girinti farklı) */
  /*    yukarıdaki regex ikisini de yakalar; ayrı işlem gerekmiyor. */

  if (h === once) return;

  /* JSON geçerliliğini doğrula — bozarsak yazma */
  const semalar = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  let gecerli = true;
  semalar.forEach((m) => { try { JSON.parse(m[1]); } catch (e) { gecerli = false; } });
  if (!gecerli) { console.log('  ✗ ŞEMA BOZULDU, atlandı:', path.relative(KOK, P)); hata++; return; }

  if (!KURU) fs.writeFileSync(P, h, 'utf8');
  if (/blog[\\/]/.test(P)) org++; else prof++;
});

console.log('blog yazısı (Organization) :', org);
console.log('hizmet/diğer sayfa         :', prof);
console.log('zaten vardı, atlandı       :', atla);
console.log('şema bozulduğu için atlandı:', hata);
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
