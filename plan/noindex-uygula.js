/* Konsept yayınını arama motorlarına kapatır.
   GERÇEK DOMAINE TAŞIRKEN: bu betiği --ac bayrağıyla çalıştır, geri alır.

   Neden: canonical'lar www.tasarimmania.com'u gösteriyor ama o adres 301 ile
   BAŞKA sayfaya gidiyor. Konsept indekslenirse Google çelişen sinyal alır ve
   gerçek domainin sıralamasına zarar verebilir.

   KAPSAM DERSİ (2 Eyl 2026): ilk sürüm YALNIZ site/ altındaki index.html
   dosyalarına bakıyordu. Ölçünce 19 yayınlanan sayfanın kilit dışında kaldığı
   görüldü — aralarında TÜM YAYININ GİRİŞ KAPISI olan kök index.html ve 15
   konsept sayfası vardı. Yani kilit, en çok bulunacak sayfayı kaçırıyordu.
   Bu sürüm git'in TAKİP ETTİĞİ tüm .html dosyalarını tarar; yayınlanan =
   takip edilen olduğu için kapsam artık yayının kendisiyle aynı.

   robots.txt NOTU: GitHub Pages PROJE sitesinde tarayıcılar yalnız alan adı
   kökündeki (kullanici.github.io/robots.txt) dosyayı okur; bizimki alt yolda
   kaldığı için İŞLEVSİZDİR. Gerçek kilit her sayfadaki meta etikettir.
   Yine de depo köküne yazılıyor: gerçek domaine taşındığında doğru yerde olur.

   Kullanım: node plan/noindex-uygula.js [--ac] [--kuru]
*/
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const KOK = path.join(__dirname, '..');
const AC = process.argv.includes('--ac');
const KURU = process.argv.includes('--kuru');

const ISARET = '<!-- KONSEPT-NOINDEX -->';
const ETIKET = ISARET + '\n<meta name="robots" content="noindex,nofollow">';

/* Yayınlanan = git'in takip ettiği. Klasör listesi elle tutulmaz; kaçak olmaz. */
const dosyalar = execSync('git -C "' + KOK + '" ls-files "*.html"', { encoding: 'utf8' })
  .split('\n').map((f) => f.trim()).filter(Boolean)
  .map((f) => path.join(KOK, f))
  .filter((f) => fs.existsSync(f));

let eklendi = 0, degistirildi = 0, atlandi = 0, geriAlindi = 0;
const capasiz = [];

dosyalar.forEach((f) => {
  let h = fs.readFileSync(f, 'utf8');
  const once = h;

  if (AC) {
    if (h.includes(ISARET)) {
      h = h.replace(new RegExp(ISARET + '\\s*<meta name="robots" content="noindex,nofollow">\\s*', 'g'), '');
      geriAlindi++;
    }
  } else {
    if (h.includes(ISARET)) { atlandi++; return; }

    /* mevcut robots etiketi varsa DEĞİŞTİR (index,follow diyenler dahil) */
    if (/<meta name="robots"[^>]*>/i.test(h)) {
      h = h.replace(/<meta name="robots"[^>]*>/i, ETIKET);
      degistirildi++;
    } else {
      /* çapa sırası: viewport → charset → <head> */
      const capa = h.match(/<meta name="viewport"[^>]*>/i)
        || h.match(/<meta charset[^>]*>/i)
        || h.match(/<head[^>]*>/i);
      if (!capa) { capasiz.push(path.relative(KOK, f)); return; }
      h = h.replace(capa[0], capa[0] + '\n' + ETIKET);
      eklendi++;
    }
  }

  if (h !== once && !KURU) fs.writeFileSync(f, h, 'utf8');
});

/* robots.txt — hem depo kökü hem site/ (ikisi de zararsız, biri gerçek
   domainde doğru yer olur) */
const govde = AC
  ? 'User-agent: *\nAllow: /\n\nSitemap: https://www.tasarimmania.com/sitemap.xml\n'
  : `# KONSEPT YAYINI — arama motorlarına KAPALI
# Sebep: canonical etiketleri www.tasarimmania.com'u gösteriyor, o adres ise
# 301 ile başka sayfaya gidiyor. İndekslenirse Google çelişen sinyal alır ve
# gerçek domainin sıralamasına zarar verebilir.
# NOT: GitHub Pages proje sitesinde bu dosya alt yolda kaldığı için tarayıcılar
# onu OKUMAZ. Asıl kilit her sayfadaki <meta name="robots"> etiketidir.
# GERÇEK DOMAINE TAŞIRKEN: node plan/noindex-uygula.js --ac
User-agent: *
Disallow: /
`;
if (!KURU) {
  fs.writeFileSync(path.join(KOK, 'robots.txt'), govde, 'utf8');
  fs.writeFileSync(path.join(KOK, 'site/robots.txt'), govde, 'utf8');
}

console.log(AC ? 'AÇILDI (indekslemeye izin)' : 'KAPATILDI (noindex,nofollow)');
console.log('  taranan yayın sayfası :', dosyalar.length);
if (AC) console.log('  geri alınan           :', geriAlindi);
else {
  console.log('  yeni eklenen          :', eklendi);
  console.log('  değiştirilen          :', degistirildi, '(index,follow diyenler dahil)');
  console.log('  zaten vardı           :', atlandi);
}
if (capasiz.length) {
  console.log('  ÇAPA BULUNAMADI       :', capasiz.length);
  capasiz.forEach((f) => console.log('     ! ' + f));
}
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '');
