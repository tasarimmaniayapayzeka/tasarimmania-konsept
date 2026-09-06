/* DÜZ URL TAŞIMASI — /hizmetler/... → kök seviye kısa adresler
 *
 * Kullanıcı kararı (7 Eyl 2026): adresler düzleşecek, blog /blog/ altında
 * kalacak. Harita: plan/yeni-url-haritasi.json
 *
 * ÖLÇÜLEN KAPSAM (plan/tasima-kapsam-olc.js):
 *   28 sayfa taşınıyor (22'si 2 seviye, 6'sı 1 seviye yukarı)
 *   1.252 göreli yol · 880 iç link · 315 şema alanı · 46 yapılandırma yolu
 *
 * ⚠ YÖNTEM — "../" SAYISIYLA OYNAMIYORUZ. Derinlik değişen bir sayfada
 *   ardışık dizge değiştirmek en sık yapılan hata (bu projede bir kez
 *   yaşandı: genel ../../../→../../ değişimi, önce düzeltilen assets
 *   yollarını da ezdi, logo ve video kırıldı). Bunun yerine her yol:
 *     1. sayfanın ESKİ konumuna göre gerçek dosya sistemi yoluna çözülür
 *     2. taşınan bir sayfaya işaret ediyorsa YENİ konumuna eşlenir
 *     3. sayfanın YENİ konumundan yeniden göreli olarak yazılır
 *   Böylece derinlik farkı otomatik doğru çıkar; sayaçla uğraşılmaz.
 *
 * ⚠ /yapay-zeka/ BU BETİKTE ÜRETİLMEZ. İki AI sayfasının içeriği
 *   birleştirilecek; bu bir yazı işi, dosya taşıma değil. Taşıma turunda
 *   ikisi de geçici olarak kendi adreslerine gider, birleştirme ayrı adım.
 *
 * Kullanım: node plan/duz-url-tasi.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';
const H = JSON.parse(fs.readFileSync(path.join(__dirname, 'yeni-url-haritasi.json'), 'utf8'));

/* ═══ eski → yeni site-yolu eşlemesi ═══ */
const ESLEME = new Map();
Object.entries(H.hizmetler).forEach(([eski, o]) => ESLEME.set(eski, o.yeni));
/* Birleştirilecek iki AI sayfası: taşıma turunda kendi geçici adreslerine gider.
   Birleştirme ayrı adımda; burada uydurma bir birleşme yapılmıyor. */
const AI_GECICI = {
  '/hizmetler/web-tasarim-yazilim/ai-entegrasyonu/': '/yapay-zeka/',
  '/hizmetler/video-produksiyon/ai-destekli-produksiyon/': '/ai-video-produksiyon/',
};
Object.entries(AI_GECICI).forEach(([e, y]) => ESLEME.set(e, y));

const dizinOf = (siteYolu) => path.join(S, siteYolu.replace(/^\//, '').replace(/\/$/, ''));

/* ⚠ TÜM .html DOSYALARI — ölçülmüş hata: ilk sürüm yalnız "index.html"
   arıyordu, bu yüzden site/404.html ve depo kökündeki 404.html hiç
   işlenmedi ve içlerindeki 6 hizmet linki eski adreste kaldı. */
function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (/\.html$/.test(e.name)) o.push(p);
  }
  return o;
}
const siteYolu = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* ⚠ EN UZUN EŞLEŞME KAZANIR — ölçülmüş hata (7 Eyl 2026, 181 kırık yol).
   İlk sürüm Map'i ekleme sırasında geziyordu; "/hizmetler/seo/" haritada
   "/hizmetler/seo/teknik-seo/"den ÖNCE geldiği için önek olarak eşleşiyor ve
   "/seo/teknik-seo/" üretiyordu. Klasik önek eşleşme hatası: özgül olan
   genel olandan önce denenmeli. */
const ESLEME_SIRALI = [...ESLEME.entries()].sort((a, b) => b[0].length - a[0].length);

/* dosya sistemi yolu → (taşınıyorsa) yeni dosya sistemi yolu */
function yeniKonum(mutlak) {
  const rel = path.relative(S, mutlak);
  if (rel.startsWith('..')) return mutlak;                 /* site dışı (assets vb.) */
  const y = '/' + rel.split(path.sep).join('/');
  for (const [eski, yeni] of ESLEME_SIRALI) {
    const e = eski.replace(/\/$/, '');
    if (y === e || y.startsWith(e + '/'))
      return path.join(S, yeni.replace(/^\//, '').replace(/\/$/, ''), y.slice(e.length + 1));
  }
  return mutlak;
}

/* bir sayfadaki tüm göreli yolları yeniden yaz */
function yollariYenidenYaz(html, eskiDizin, yeniDizin) {
  let n = 0;
  const cevir = (ham) => {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(ham)) return ham;
    const [gövde, ek] = [ham.replace(/[#?].*$/, ''), (ham.match(/[#?].*$/) || [''])[0]];
    if (!gövde) return ham;
    const hedef = yeniKonum(path.resolve(eskiDizin, gövde));
    let r = path.relative(yeniDizin, hedef).split(path.sep).join('/');
    if (!r.startsWith('.')) r = './' + r;
    if (gövde.endsWith('/') && !r.endsWith('/')) r += '/';
    n++;
    return r + ek;
  };
  const cikti = html
    .replace(/(\s(?:href|src)=")([^"]+)(")/g, (t, a, u, b) => a + cevir(u) + b)
    .replace(/(\ssrcset=")([^"]+)(")/g, (t, a, u, b) => a
      + u.split(',').map((p) => {
        const [yolu, ...kalan] = p.trim().split(/\s+/);
        return [cevir(yolu), ...kalan].join(' ');
      }).join(', ') + b);
  return [cikti, n];
}

/* mutlak kanonik adresleri eşle: https://.../hizmetler/x/ → https://.../x/ */
function mutlakAdresleriEsle(html) {
  let n = 0;
  const cikti = html.replace(new RegExp(KANONIK.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(/[^"\\s]*)', 'g'),
    (t, y) => {
      /* burada da EN UZUN eşleşme; aynı önek tuzağı geçerli */
      for (const [eski, yeni] of ESLEME_SIRALI) {
        if (y === eski || y.startsWith(eski)) { n++; return KANONIK + yeni + y.slice(eski.length); }
      }
      return t;
    });
  return [cikti, n];
}

/* ═══ KOŞUM ═══ */
const rapor = { tasinan: 0, yolYazilan: 0, mutlakYazilan: 0, dokunulan: 0, hata: [] };
const tasimaListesi = [];

for (const [eski, yeni] of ESLEME) {
  const eskiDosya = path.join(dizinOf(eski), 'index.html');
  if (!fs.existsSync(eskiDosya)) { rapor.hata.push(`kaynak yok: ${eski}`); continue; }
  const hedefDizin = dizinOf(yeni);
  if (fs.existsSync(path.join(hedefDizin, 'index.html'))) rapor.hata.push(`hedef DOLU: ${yeni}`);
  tasimaListesi.push({ eski, yeni, eskiDosya, hedefDizin });
}

if (rapor.hata.length) {
  console.log('\n  ✗ ÖN KONTROL BAŞARISIZ — hiçbir şey yapılmadı\n');
  rapor.hata.forEach((x) => console.log('    ' + x));
  process.exit(1);
}

console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'} — düz URL taşıması\n`);

/* --- 1. taşınan sayfalar: içerik yeniden yazılıp yeni konuma --- */
const yeniIcerik = new Map();      /* hedef dosya → içerik */
for (const t of tasimaListesi) {
  const h = fs.readFileSync(t.eskiDosya, 'utf8');
  let [c, n1] = yollariYenidenYaz(h, path.dirname(t.eskiDosya), t.hedefDizin);
  let [c2, n2] = mutlakAdresleriEsle(c);
  yeniIcerik.set(path.join(t.hedefDizin, 'index.html'), c2);
  rapor.tasinan++; rapor.yolYazilan += n1; rapor.mutlakYazilan += n2;
}

/* --- 2. taşınmayan sayfalar: yalnız linkleri güncelle --- */
const tasinanKaynaklar = new Set(tasimaListesi.map((t) => t.eskiDosya));
/* depo kökündeki 404.html de site dışında ama hizmet linkleri taşıyor */
const digerHtml = tara(S).concat([path.join(KOK, '404.html')].filter(fs.existsSync));
for (const f of digerHtml.filter((x) => fs.statSync(x).size >= 2000)) {
  if (tasinanKaynaklar.has(f)) continue;
  const h = fs.readFileSync(f, 'utf8');
  let [c, n1] = yollariYenidenYaz(h, path.dirname(f), path.dirname(f));
  let [c2, n2] = mutlakAdresleriEsle(c);
  if (c2 !== h) { yeniIcerik.set(f, c2); rapor.dokunulan++; rapor.mutlakYazilan += n2; }
}

/* --- 3. sitemap ve yapılandırma dosyaları --- */
const digerDosyalar = [path.join(S, 'sitemap.xml'), path.join(S, 'sitemap-gorsel.xml'),
  path.join(S, 'sitemap-index.xml'), path.join(S, 'llms.txt')]
  .filter(fs.existsSync)
  .concat(fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f)).map((f) => path.join(__dirname, f)));
let digerYazilan = 0;
for (const f of digerDosyalar) {
  const h = fs.readFileSync(f, 'utf8');
  let [c, n] = mutlakAdresleriEsle(h);
  /* yapılandırmalarda göreli hizmet yolları da geçiyor */
  c = c.replace(/(\.\.\/)+hizmetler\/([a-z0-9-]+\/)+/g, (t) => {
    const iz = '/hizmetler/' + t.replace(/^(\.\.\/)+hizmetler\//, '');
    for (const [eski, yeni] of ESLEME) if (iz === eski) return '../..' + yeni;
    return t;
  });
  if (c !== h) { yeniIcerik.set(f, c); digerYazilan++; }
}

console.log(`  taşınan sayfa            : ${rapor.tasinan}`);
console.log(`  yeniden yazılan göreli yol: ${rapor.yolYazilan}`);
console.log(`  eşlenen mutlak adres      : ${rapor.mutlakYazilan}`);
console.log(`  linki güncellenen sayfa   : ${rapor.dokunulan}`);
console.log(`  sitemap/yapılandırma      : ${digerYazilan}`);
console.log(`\n  ── taşıma listesi ──`);
tasimaListesi.forEach((t) => console.log(`     ${t.eski.padEnd(52)} → ${t.yeni}`));

if (!UYGULA) { console.log('\n  Uygulamak için: --uygula\n'); process.exit(0); }

/* --- YAZ --- */
for (const [f, c] of yeniIcerik) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c, 'utf8');
}
/* eski dizinleri sil (yalnız taşınanlar, ve yalnız index.html içeriyorsa) */
let silinen = 0;
for (const t of [...tasimaListesi].sort((a, b) => b.eski.length - a.eski.length)) {
  const d = path.dirname(t.eskiDosya);
  if (!fs.existsSync(d)) continue;
  const kalan = fs.readdirSync(d);
  if (kalan.length === 1 && kalan[0] === 'index.html') { fs.rmSync(d, { recursive: true }); silinen++; }
  else console.log(`  ~ ${t.eski} dizininde başka dosya var, silinmedi: ${kalan.join(', ')}`);
}
/* boşalan ara dizinleri temizle */
for (const ara of ['hizmetler/seo', 'hizmetler/web-tasarim-yazilim', 'hizmetler/mobil-uygulama',
  'hizmetler/dijital-pazarlama', 'hizmetler/video-produksiyon']) {
  const d = path.join(S, ara);
  if (fs.existsSync(d) && !fs.readdirSync(d).length) { fs.rmSync(d, { recursive: true }); silinen++; }
}
console.log(`\n  UYGULANDI — ${yeniIcerik.size} dosya yazıldı · ${silinen} eski dizin silindi\n`);
