/* Yayına hazır mı? Tek komutla TAM denetim.
 *
 * seo-denetim.js yalnız METNİ ölçer. Yazı 1'de metin 18/18 geçtiği hâlde
 * sayfa /blog/ listesinde YOKTU ve 10 görseli eksikti — yani ölçüm temiz,
 * sayfa yayınlanamaz durumdaydı. Bu betik o boşluğu kapatır:
 * eşikler + kırık link + eksik görsel + şema + dizin/sitemap kaydı.
 *
 * Kullanım:
 *   node plan/yazi-dogrula.js plan/yazi-01-mobil-maliyet.json "mobil uygulama geliştirme"
 *   node plan/yazi-dogrula.js --hepsi          (kayıtlı tüm yazi-*.json)
 *
 * Çıkış kodu 0 = yayına hazır.
 */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');

/* Odak ifade yapılandırmada tutulmuyordu; yazı dosyasının yanında bir eşleme
   tutmak yerine çağrıda veriliyor. --hepsi için burada kayıtlı. */
const ODAKLAR = {
  'mobil-uygulama-gelistirme-maliyeti': 'mobil uygulama geliştirme',
  'mobil-uygulama-yaptirma-sorulari': 'uygulama yaptırma',
  'mobil-uygulama-gelistirme-sureci': 'geliştirme süreci',
  'native-mi-cross-platform-mi': 'native uygulama',
  'react-native-mi-flutter-mi': 'react native',
  'uygulama-magaza-optimizasyonu': 'mağaza optimizasyonu',
  'reklam-filmi-cekim-asamalari': 'reklam filmi çekimi',
  'reklam-filmi-fiyat-kalemleri': 'reklam filmi fiyat',
  'storyboard-nedir': 'storyboard hazırlama',
  'reklam-filmi-ajansi-secimi': 'reklam filmi ajansı',
  'urun-videosu-studyo-mu-mekan-mi': 'ürün videosu çekimi',
};

const ESIK = [
  ['3_prose(1000-1200,kopruHaric)', (v) => v >= 1000 && v <= 1200],
  ['3_cevapAralikDisi', (v) => v === 0],
  ['49_ilkCumleAsim(0)', (v) => v === 0],
  ['46_soruH2%(>=50)', (v) => v >= 50],
  ['48_olListe(>=1)', (v) => v >= 1],
  ['57_metaDesc(150-160)', (v) => v >= 150 && v <= 160],
  ['4_yogunluk_govde%', (v) => v >= 2.2 && v <= 2.4],
  ['4b_tersDizilimVaryant(2-3)', (v) => v.length >= 2 && v.length <= 3],
  ['4c_icLink_TOPLAM(6-9)', (v) => v >= 6 && v <= 9],
  ['5_esAnlamliCift(>=3)', (v) => v >= 3],
  ['6_ardisikAyniKelime(0)', (v) => v.length === 0],
  ['6_sssFark(>=45)', (v) => v >= 45],
  ['6b_uzunCumle%(<=20)', (v) => v <= 20],
  ['6b_edilgen%(<=10)', (v) => v <= 10],
  ['3_H1', (v) => v === 1],
  ['3_H2(5-7)', (v) => v >= 5 && v <= 7],
  ['3_H3', (v) => v >= 3],
  ['3_H4(>=1)', (v) => v >= 1],
];

function denetle(yapYolu, odak) {
  const C = JSON.parse(fs.readFileSync(yapYolu, 'utf8'));
  const slug = C.slug;
  const dizin = `site/blog/${slug}/`;
  const dosya = path.join(KOK, dizin, 'index.html');
  const kusur = [];

  if (!fs.existsSync(dosya)) return { slug, kusur: ['HTML üretilmemiş — blog-uret.js koşulmalı'] };
  const ham = fs.readFileSync(dosya, 'utf8');

  /* --- 1. metin eşikleri --- */
  let R;
  try {
    R = JSON.parse(execFileSync('node', [path.join(__dirname, 'seo-denetim.js'),
      path.join(KOK, dizin, 'index.html'), odak, yapYolu], { encoding: 'utf8', maxBuffer: 1 << 24 }));
  } catch (e) { return { slug, kusur: ['seo-denetim.js çöktü: ' + e.message.slice(0, 90)] }; }
  for (const [ad, f] of ESIK) if (!f(R[ad])) kusur.push(`${ad} = ${JSON.stringify(R[ad])}`);

  /* --- 2. kırık iç link --- */
  for (const m of ham.matchAll(/href="(\.\.[^"#?]*)"/g)) {
    const h = path.normalize(path.join(KOK, dizin, m[1]));
    if (!fs.existsSync(h) && !fs.existsSync(path.join(h, 'index.html'))) kusur.push('KIRIK LİNK ' + m[1]);
  }

  /* --- 3. eksik görsel (srcset dahil — tek src'ye bakmak yetmez) --- */
  for (const m of ham.matchAll(/(?:src|srcset)="([^"]+)"/g))
    for (const u of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
      if (/^(https?:|data:)/.test(u) || !u) continue;
      if (!fs.existsSync(path.normalize(path.join(KOK, dizin, u)))) kusur.push('GÖRSEL YOK ' + u);
    }

  /* --- 4. şema --- */
  const sm = ham.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!sm) kusur.push('ld+json şema yok');
  else {
    try {
      const j = JSON.parse(sm[1]);
      const turler = (j['@graph'] || [j]).map((x) => x['@type']);
      for (const gerek of ['Article', 'FAQPage', 'BreadcrumbList'])
        if (!turler.includes(gerek)) kusur.push('şemada eksik: ' + gerek);
    } catch (e) { kusur.push('şema BOZUK JSON: ' + e.message.slice(0, 60)); }
  }

  /* --- 5. siteye kayıtlı mı (yazı 1'de atlanan adım) --- */
  const bIndex = fs.readFileSync(path.join(SITE, 'blog/index.html'), 'utf8');
  const harita = fs.readFileSync(path.join(SITE, 'sitemap.xml'), 'utf8');
  const kartSayisi = (bIndex.match(new RegExp(`href="\\./${slug}/"`, 'g')) || []).length;
  if (kartSayisi === 0) kusur.push('/blog/ dizininde KART YOK — blog-kaydet.js koşulmalı');
  if (kartSayisi > 1) kusur.push(`/blog/ dizininde kart ${kartSayisi} kez var (tekrar)`);
  const smSayisi = (harita.match(new RegExp(`/blog/${slug}/`, 'g')) || []).length;
  if (smSayisi === 0) kusur.push('sitemap girdisi YOK');
  if (smSayisi > 1) kusur.push(`sitemap girdisi ${smSayisi} kez var (tekrar)`);
  if (!bIndex.includes(`data-filtre="${C.kategori}"`)) kusur.push(`"${C.kategori}" süzgeç düğmesi yok`);

  return { slug, kusur, olcum: `${R['3_govdeTumu']} kelime · %${R['4_yogunluk_govde%']} · `
    + `${R['4c_icLink_TOPLAM(6-9)']} iç link · uzun %${R['6b_uzunCumle%(<=20)']} · edilgen %${R['6b_edilgen%(<=10)']}` };
}

/* ---- koşum ---- */
const hepsi = process.argv.includes('--hepsi');
const isler = hepsi
  ? fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f))
      .map((f) => [path.join(__dirname, f), ODAKLAR[JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')).slug]])
  : [[process.argv[2], process.argv[3]]];

let toplamKusur = 0;
console.log('');
for (const [yol, odak] of isler) {
  if (!yol) { console.error('kullanım: node plan/yazi-dogrula.js <yazi.json> "<odak>"  |  --hepsi'); process.exit(2); }
  if (!odak) { console.error(`✗ odak ifade bilinmiyor: ${path.basename(yol)} — ODAKLAR haritasına ekleyin`); toplamKusur++; continue; }
  const r = denetle(yol, odak);
  const im = r.kusur.length ? '✗' : '✓';
  console.log(`  ${im} ${r.slug}`);
  if (r.olcum) console.log(`      ${r.olcum}`);
  r.kusur.forEach((k) => console.log(`      ✗ ${k}`));
  toplamKusur += r.kusur.length;
}
console.log(toplamKusur ? `\n  ✗ toplam ${toplamKusur} kusur — yayına hazır DEĞİL\n`
  : `\n  ✓ hepsi yayına hazır\n`);
process.exit(toplamKusur ? 1 : 0);
