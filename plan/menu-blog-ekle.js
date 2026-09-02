/* MENÜ BÜTÜNLÜĞÜ — Blog bağlantısı 33 eski sayfanın menüsünde yoktu.
 * Blog sonradan üretildiği için yalnız blog şablonuna eklenmişti; hizmet
 * sayfalarından, hakkımızdan, teklif ve iletişimden bloga menüden ulaşılamıyordu.
 *
 * Göreli yol, her sayfanın KENDİ "Ajans" (hakkimizda) linkinden türetilir —
 * derinlik saymak yerine bu yöntem hatasız çalışır.
 *
 * Kullanım: node plan/menu-blog-ekle.js [--kuru]
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');
const KURU = process.argv.includes('--kuru');

function tara(dir, liste) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) tara(tam, liste);
    else if (e.name === 'index.html') liste.push(tam);
  });
  return liste;
}

let eklendi = 0, atlandi = 0, hata = [];

tara(SITE, []).forEach((f) => {
  let h = fs.readFileSync(f, 'utf8');
  const kisa = '/' + path.relative(SITE, path.dirname(f)).split(path.sep).join('/');

  const navM = h.match(/<div class="nav-links">([\s\S]*?)<\/div>/);
  if (!navM) return;                       /* menüsüz sayfa (yönlendirme stub'ı) */
  if (/href="[^"]*blog\//.test(navM[1])) { atlandi++; return; }

  /* Ajans linkinden göreli kökü çıkar: ../../hakkimizda/ -> ../../
     Hakkımızda sayfası kendine "./" ile link verir; orada kökü Hizmetler
     linkinden alırız (../hizmetler/ -> ../). */
  let up;
  const ajans = navM[1].match(/href="([^"]*?)hakkimizda\/"/);
  if (ajans) up = ajans[1];
  else {
    const hizmet = navM[1].match(/href="([^"]*?)hizmetler\/"/);
    if (!hizmet) { hata.push(kisa + ' → göreli kök bulunamadı'); return; }
    up = hizmet[1];
  }
  const blogHref = up + 'blog/';

  /* kendi sayfası blog değil, aria-current gerekmiyor */
  const yeniLink = '\n      <a href="' + blogHref + '">Blog</a>';

  /* 1) masaüstü menü — Ajans satırının hemen ardına */
  const ajansSatir = navM[1].match(/(\n\s*<a href="[^"]*"[^>]*>Ajans<\/a>)/);
  if (!ajansSatir) { hata.push(kisa + ' → Ajans satırı eşleşmedi'); return; }
  const yeniNav = navM[0].replace(ajansSatir[1], ajansSatir[1] + yeniLink);
  h = h.replace(navM[0], yeniNav);

  /* 2) mobil menü */
  const mobM = h.match(/<div class="mobmenu"[^>]*>([\s\S]*?)<\/div>/);
  if (mobM) {
    const mobAjans = mobM[1].match(/(<a href="[^"]*">Ajans<\/a>)/);
    if (mobAjans) {
      const yeniMob = mobM[0].replace(mobAjans[1], mobAjans[1] + '<a href="' + blogHref + '">Blog</a>');
      h = h.replace(mobM[0], yeniMob);
    } else hata.push(kisa + ' → mobil menüde Ajans yok');
  }

  if (!KURU) fs.writeFileSync(f, h, 'utf8');
  eklendi++;
});

console.log('Blog menüye eklendi : ' + eklendi + ' sayfa');
console.log('zaten vardı         : ' + atlandi + ' sayfa');
console.log('sorunlu             : ' + hata.length);
hata.forEach((x) => console.log('   ' + x));
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
