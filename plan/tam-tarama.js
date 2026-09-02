/* TAM SİTE TARAMASI — mobil + masaüstü, 63 sayfa.
 *
 * plan/site-denetim.js dosya düzeyinde bakar (link, meta, şema, görsel).
 * Bu betik onu tamamlar: gerçek TARAYICIDA render edip düzen hatası arar.
 *
 * Neden gerekli: bu oturumda bulunan kusurların çoğu dosyaya bakarak
 * görünmüyordu — 2.4px'e düşen yazı, tablet aralığında sıkışan ızgara,
 * tm.css ile çakışan sınıf adı, ekranda kalan "undefined". Hepsi ancak
 * ölçülünce çıktı.
 *
 * Kullanım: node plan/tam-tarama.js  (tarayıcı tarafından çağrılır,
 *           çıktıyı JSON olarak verir)
 * Bu dosya URL listesini üretir; ölçümü tarayıcı yapar.
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');

function tara(dir, liste) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) tara(tam, liste);
    else if (e.name === 'index.html') liste.push(tam);
  });
  return liste;
}

const dosyalar = tara(SITE, []);
const kayit = dosyalar.map((f) => {
  const h = fs.readFileSync(f, 'utf8');
  const u = '/site/' + path.relative(SITE, path.dirname(f)).split(path.sep).filter(Boolean).join('/');
  const stub = /http-equiv="refresh"/i.test(h) && /location\.replace/.test(h);
  return {
    url: u.endsWith('/') ? u : u + '/',
    stub,
    akis: /class="akis-izgara"/.test(h),
    serp: /<figure class="serp/.test(h),
    baslik: ((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').slice(0, 60),
  };
}).filter((x) => !x.stub);

fs.writeFileSync(path.join(__dirname, 'tarama-listesi.json'), JSON.stringify(kayit, null, 1), 'utf8');
console.log('URL listesi yazıldı: plan/tarama-listesi.json');
console.log('  taranacak sayfa : ' + kayit.length);
console.log('  akış grafiği    : ' + kayit.filter((x) => x.akis).length);
console.log('  hub grafiği     : ' + kayit.filter((x) => x.serp).length);
