/* site/404.html üretimi — kabuk /kvkk/ sayfasından türetilir.
 *
 * Neden türetme, neden elle yazma değil: üst menü, altbilgi, CSS ve WhatsApp
 * düğmesi bütün sayfalarda ortak. Elle yazılan bir 404, ilk tasarım
 * değişikliğinde geride kalır. Burada kabuk kopyalanır, yalnız gövde ve head
 * alanları değiştirilir.
 *
 * ⚠ YOL DERİNLİĞİ: /kvkk/ bir alt dizinde (../), 404.html site kökünde (./).
 *   Göreli yolların tamamı bir seviye yukarı çekilir.
 *
 * ⚠ GITHUB PAGES: proje sitesinde özel 404 dosyası deponun KÖKÜNDE aranır.
 *   site/404.html gerçek alan adı (www.tasarimmania.com) için doğru yerdir;
 *   önizlemede çalışması için kökteki kopya da yazılır.
 *
 * Kullanım: node plan/uret-404.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

let h = fs.readFileSync(path.join(S, 'kvkk/index.html'), 'utf8');

/* --- 1. göreli yolları bir seviye yukarı çek ---
   ⚠ ARDIŞIK İKİ replace YANLIŞ: birincisi "../../" → "../" yapar, ikincisi
     AYNI dizgeyi tekrar yakalayıp "./" yapar; sonuç bir seviye fazla yukarı.
     Ölçüldü: 3 logo yolu kırıldı. Tek geçişte, önek uzunluğuna bakarak. */
h = h.replace(/(href|src)="((?:\.\.\/)+)/g, (t, oz, on) => {
  const kat = on.length / 3;                       /* kaç tane "../" var */
  return `${oz}="` + (kat > 1 ? '../'.repeat(kat - 1) : './');
});

/* --- 2. head alanları --- */
const BASLIK = 'Sayfa bulunamadı (404) | TasarımMania';
const ACIKLAMA = 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. '
  + 'Buradan beş hizmet modülüne, blog yazılarına ve iletişim sayfasına geçebilirsiniz.';
h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${BASLIK}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${ACIKLAMA}">`)
  .replace(/<link rel="canonical"[^>]*>/, '<link rel="canonical" href="https://www.tasarimmania.com/404.html">')
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${BASLIK}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${ACIKLAMA}">`)
  .replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://www.tasarimmania.com/404.html">')
  .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${BASLIK}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${ACIKLAMA}">`);

/* --- 3. şema: WebPage + Organization + WebSite; kırıntı ve KVKK düğümleri gider --- */
const KANONIK = 'https://www.tasarimmania.com';
const sema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': KANONIK + '/404.html', url: KANONIK + '/404.html',
      name: BASLIK, description: ACIKLAMA, inLanguage: 'tr-TR',
      isPartOf: { '@id': KANONIK + '/#site' } },
    { '@type': 'WebSite', '@id': KANONIK + '/#site', url: KANONIK + '/', name: 'TasarımMania',
      inLanguage: 'tr-TR', publisher: { '@id': KANONIK + '/#kurulus' } },
    { '@type': 'Organization', '@id': KANONIK + '/#kurulus', name: 'TasarımMania', url: KANONIK + '/' },
  ],
};
h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  '<script type="application/ld+json">\n' + JSON.stringify(sema, null, 2) + '\n</script>');

/* --- 4. gövde --- */
const MODULLER = [
  ['./hizmetler/web-tasarim-yazilim/', 'Web Tasarım &amp; Yazılım', 'Kurumsal site, e-ticaret, özel yazılım'],
  ['./hizmetler/mobil-uygulama/', 'Mobil Uygulama', 'iOS, Android, React Native, arayüz'],
  ['./hizmetler/dijital-pazarlama/', 'Dijital Pazarlama', 'Google Ads, Meta Ads, sosyal medya'],
  ['./hizmetler/video-produksiyon/', 'Video Prodüksiyon', 'Reklam filmi, ürün videosu, Reels'],
  ['./hizmetler/seo/', 'SEO Hizmetleri', 'Teknik, içerik, yerel ve çok dilli SEO'],
  ['./blog/', 'Blog', '42 rehber yazı: maliyet, süreç, karar kriterleri'],
];
const govde = `<main id="ana">

  <header class="phd">
    <div class="wrap">
      <nav class="crumb" aria-label="Konum">
        <a href="./">Ana sayfa</a><span aria-hidden="true">/</span><span>Sayfa bulunamadı</span>
      </nav>
      <p class="guncelleme" style="margin-bottom:9px">HTTP 404</p>
      <h1>Bu adreste bir sayfa yok</h1>
      <p class="lead">Bağlantı eski olabilir, adres yanlış yazılmış olabilir ya da o sayfayı hiç
        yayımlamamış olabiliriz. Aşağıdan doğru yere geçebilirsiniz.</p>
    </div>
  </header>

  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <span class="eyebrow"><i></i>Nereye gitmek istiyordunuz</span>
        <h2 data-kin>Beş modül ve blog</h2>
      </div>
      <div class="hrt-sag">
${MODULLER.map(([u, b, a]) => `        <a class="yk" href="${u}"><b>${b}</b>\n          <span>${a}</span></a>`).join('\n')}
      </div>
      <p style="margin-top:26px;color:var(--muted);font-size:13.6px">
        Aradığınızı bulamadıysanız <a href="./iletisim/">iletişim sayfasından</a> yazın ya da
        <a href="tel:+905547916545">0554 791 65 45</a> numarayı arayın — doğru sayfayı biz gönderelim.
      </p>
    </div>
  </section>

</main>`;

const b = h.indexOf('<main');
const s = h.indexOf('</main>') + '</main>'.length;
h = h.slice(0, b) + govde + h.slice(s);

/* --- 5. yaz --- */
const hedefler = [path.join(S, '404.html'), path.join(KOK, '404.html')];
console.log(`\n  ${UYGULA ? 'YAZILDI' : 'KURU KOŞU'} — ${(h.length / 1024).toFixed(1)} KB\n`);
for (const t of hedefler) {
  /* kök kopyası bir seviye daha derinde duruyor: yollara site/ öneki gerek */
  const icerik = t === hedefler[1]
    ? h.replace(/(href|src)="\.\//g, '$1="./site/').replace(/(href|src)="\.\.\//g, '$1="./')
    : h;
  console.log('  ' + path.relative(KOK, t).split(path.sep).join('/'));
  if (UYGULA) fs.writeFileSync(t, icerik, 'utf8');
}
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
