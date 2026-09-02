/* Konsept sitesini arama motorlarına kapatır (45 sayfa).
   GERÇEK DOMAINE TAŞIRKEN: bu betiği --ac bayrağıyla çalıştır, geri alır.

   Neden: canonical'lar www.tasarimmania.com'u gösteriyor ama o adres 301 ile
   BAŞKA sayfaya gidiyor. Konsept indekslenirse Google çelişen sinyal alır ve
   gerçek domainin sıralamasına zarar verebilir. */
const fs = require('fs');
const path = require('path');
const SITE = 'C:/Users/İHSAN/Desktop/Claude-Projeler/25-TasarimMania-Site/site';
const AC = process.argv.includes('--ac');

const ISARET = '<!-- KONSEPT-NOINDEX -->';
const ETIKET = ISARET + '\n<meta name="robots" content="noindex,nofollow">';

function sayfalar(dir, liste) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) sayfalar(tam, liste);
    else if (e.name === 'index.html') liste.push(tam);
  });
  return liste;
}

const dosyalar = sayfalar(SITE, []);
let eklendi = 0, degistirildi = 0, atlandi = 0, geriAlindi = 0;

dosyalar.forEach((f) => {
  let h = fs.readFileSync(f, 'utf8');
  const once = h;

  if (AC) {
    /* geri al: işaretli bloğu tamamen kaldır */
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
      /* yoksa viewport'tan hemen sonra ekle */
      const anchor = h.match(/<meta name="viewport"[^>]*>/i);
      if (!anchor) { console.log('  ! çapa bulunamadı:', f); return; }
      h = h.replace(anchor[0], anchor[0] + '\n' + ETIKET);
      eklendi++;
    }
  }

  if (h !== once) fs.writeFileSync(f, h, 'utf8');
});

/* robots.txt */
const rPath = SITE + '/robots.txt';
if (AC) {
  fs.writeFileSync(rPath, 'User-agent: *\nAllow: /\n\nSitemap: https://www.tasarimmania.com/sitemap.xml\n', 'utf8');
} else {
  fs.writeFileSync(rPath,
`# KONSEPT SİTESİ — arama motorlarına KAPALI
# Sebep: canonical etiketleri www.tasarimmania.com'u gösteriyor, o adres ise
# 301 ile başka sayfaya gidiyor. İndekslenirse Google çelişen sinyal alır ve
# gerçek domainin sıralamasına zarar verebilir.
# GERÇEK DOMAINE TAŞIRKEN: node plan/noindex-uygula.js --ac
User-agent: *
Disallow: /
`, 'utf8');
}

console.log(AC ? 'AÇILDI (indekslemeye izin)' : 'KAPATILDI (noindex,nofollow)');
console.log('  toplam sayfa :', dosyalar.length);
if (AC) console.log('  geri alınan  :', geriAlindi);
else {
  console.log('  yeni eklenen :', eklendi);
  console.log('  değiştirilen :', degistirildi, '(index,follow diyenler dahil)');
  console.log('  zaten vardı  :', atlandi);
}
