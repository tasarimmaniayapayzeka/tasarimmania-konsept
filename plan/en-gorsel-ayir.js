/* en-gorsel-ayir.js — İngilizce sayfaların görsellerini AYRI kopya + AYRI ad
 * hâline getirir.
 *
 * KULLANICI EMRİ: "görseller aynı etiketle asla gelmesin, Türkçe ve İngilizce
 * ayrı olsun, panele iki kez yüklenecek; yoksa spam olur, SEO yapamayız."
 *
 * Ölçülen ihlal: 35 İngilizce sayfanın işaret ettiği 62 görsel dosyanın 60'ı
 * /en/ dışındaki Türkçe adlı dosyalardı.
 *
 * Ne yapar:
 *   1. plan/en-gorsel-ad.json sözlüğüne göre içerik ve marka görsellerini
 *      /assets/en/ altına İngilizce adla KOPYALAR (Türkçesi yerinde kalır).
 *   2. Blog görsellerini kuralla türetir:
 *      /blog/<tr>/gorsel/<tr>-kapak-960.webp
 *        → /en/blog/<en>/image/<en>-cover-960.webp
 *   3. İngilizce sayfalardaki src / srcset / og:image / twitter:image
 *      referanslarını yeni yola çevirir (göreli yol yeniden hesaplanır).
 *   4. Sonunda DOĞRULAR: /en/ dışına işaret eden görsel kalmamalı.
 *
 * Türkçe sayfalara DOKUNMAZ.
 *
 *   node plan/en-gorsel-ayir.js            # kuru koşu
 *   node plan/en-gorsel-ayir.js --uygula
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');
const EN = path.join(SITE, 'en');
const UYGULA = process.argv.includes('--uygula');

const AD = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-gorsel-ad.json'), 'utf8'));
const HARITA = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));

/* Türkçe blog yolu → İngilizce blog yolu */
const BLOG_EN = new Map();
for (const [tr, o] of Object.entries(HARITA.blog || {}))
  if (!tr.startsWith('_') && o && o.en) BLOG_EN.set(tr, o.en);

/* Sözlük: site köküne göre mutlak yol → yeni mutlak yol */
const SOZLUK = new Map();
for (const grup of ['icerik', 'marka'])
  for (const [a, b] of Object.entries(AD[grup] || {}))
    if (!a.startsWith('_')) SOZLUK.set(a, b);

const TUR_EN = AD._blog_kurali.tur;   /* kapak→cover, govde→body */

/* /blog/<tr>/gorsel/<tr>-<tur>-<olcu>.<uz>  →  /en/blog/<en>/image/... */
function blogYeni(yol) {
  const m = yol.match(/^\/blog\/([^/]+)\/gorsel\/(.+)$/);
  if (!m) return null;
  const enYol = BLOG_EN.get(`/blog/${m[1]}/`);
  if (!enYol) return null;                       /* haritada yoksa DOKUNMA */
  const enSlug = enYol.replace(/^\/en\/blog\/|\/$/g, '');
  /* dosya adı: <tr-slug>-<tur>-<olcu>.<uz> */
  const d = m[2].match(new RegExp(`^${m[1]}-([a-z]+)-(.+)$`));
  if (!d) return null;
  const tur = TUR_EN[d[1]];
  if (!tur) return null;                         /* bilinmeyen tür — DOKUNMA */
  return `/en/blog/${enSlug}/image/${enSlug}-${tur}-${d[2]}`;
}

function yeniYol(mutlak) { return SOZLUK.get(mutlak) || blogYeni(mutlak) || null; }

function sayfalar(dizin) {
  const c = [];
  for (const ad of fs.readdirSync(dizin)) {
    const t = path.join(dizin, ad);
    if (fs.statSync(t).isDirectory()) c.push(...sayfalar(t));
    else if (ad === 'index.html') c.push(t);
  }
  return c;
}

const GORSEL = /\.(webp|jpg|jpeg|png|avif)$/i;

/* Site-mutlak yol → gerçek disk yolu.
 * /assets/... depo kökünde, geri kalan her şey site/ altında. */
const diskYolu = (siteYolu) => siteYolu.startsWith('/assets/')
  ? path.join(KOK, siteYolu.replace(/^\//, ''))
  : path.join(SITE, siteYolu.replace(/^\//, ''));

const kopyalanacak = new Map();   /* kaynak mutlak → hedef mutlak */
let degisenSayfa = 0, degisenRef = 0, atlanan = 0;
const atlananlar = new Set();

for (const dosya of sayfalar(EN)) {
  const eski = fs.readFileSync(dosya, 'utf8');
  const kisaDizin = '/' + path.relative(SITE, path.dirname(dosya)).replace(/\\/g, '/');
  let yeni = eski;

  /* ⚠ /assets/ SİTE KÖKÜNÜN DIŞINDA. Depo yapısı:
   *     <kök>/assets/...        ← görseller
   *     <kök>/site/en/about/    ← sayfa
   *   Bu yüzden "/assets/x.png" site-mutlak yolu gibi görünse de diskte
   *   site/ ile KARDEŞ. Göreli yolu site köküne göre hesaplamak
   *   ../../assets/... üretiyordu; doğrusu ../../../assets/...
   *   Ölçüldü: ilk denemede 35 sayfada 102 kırık yol. Bu yüzden göreli
   *   yol artık GERÇEK DİSK YOLLARI üzerinden hesaplanıyor. */
  const mutlakla = (ref) => {
    const d = path.posix.normalize(path.posix.join(kisaDizin, ref));
    /* site kökünün üstüne çıkan yol → depo köküne göre yaz */
    return d.startsWith('/..') ? d.replace(/^\/\.\.\//, '/') : d;
  };
  const gorelile = (hedef) => {
    const r = path.relative(path.dirname(dosya), diskYolu(hedef)).replace(/\\/g, '/');
    return r.startsWith('.') ? r : './' + r;
  };

  /* 1 — src / srcset (göreli yollar) */
  yeni = yeni.replace(/(\s(?:src|srcset)=")([^"]+)(")/g, (tam, on, deger, arka) => {
    const parcalar = deger.split(',').map((p) => p.trim()).filter(Boolean);
    let degisti = false;
    const cikti = parcalar.map((p) => {
      const [yol, ...olcu] = p.split(/\s+/);
      if (!GORSEL.test(yol.split('?')[0])) return p;
      const mut = mutlakla(yol);
      const hedef = yeniYol(mut);
      if (!hedef) {
        /* Zaten İngilizce tarafta olan dosya "sözlükte yok" sayılmamalı. */
        if (!mut.startsWith('/en/') && !mut.startsWith('/assets/en/')) { atlanan++; atlananlar.add(mut); }
        return p;
      }
      kopyalanacak.set(mut, hedef);
      degisti = true; degisenRef++;
      return [gorelile(hedef), ...olcu].join(' ');
    });
    return degisti ? on + cikti.join(', ') + arka : tam;
  });

  /* 2 — og:image / twitter:image (mutlak adres) */
  yeni = yeni.replace(/(content=")(https?:\/\/[^"]+)(")/g, (tam, on, url, arka) => {
    /* ⚠ "en" alternatife DAHİL. Yoksa .../site/en/blog/... adresinde tembel
     * grup ".../site/en" e kadar yiyor ve geriye /blog/... kalıyor — yani
     * ZATEN İngilizce olan dosya "sözlükte yok" diye raporlanıyor. */
    const m = url.match(/^(https?:\/\/[^/]+(?:\/[^/]+)*?)(\/(?:site\/)?(?:assets|blog|en)\/.*)$/);
    if (!m || !GORSEL.test(m[2].split('?')[0])) return tam;
    /* /site/blog/... → /blog/... ; /assets/... zaten site kökünün üstünde */
    const icYol = m[2].replace(/^\/site/, '');
    const hedef = yeniYol(icYol);
    if (!hedef) { if (!icYol.startsWith('/en/') && !icYol.startsWith('/assets/en/')) { atlanan++; atlananlar.add(icYol); } return tam; }
    kopyalanacak.set(icYol, hedef);
    degisenRef++;
    const onEk = hedef.startsWith('/assets/') ? m[1] : m[1] + '/site';
    return on + onEk + hedef + arka;
  });

  if (yeni !== eski) { degisenSayfa++; if (UYGULA) fs.writeFileSync(dosya, yeni); }
}


let kopyalandi = 0, kaynakYok = 0;
const kaynakYokListe = [];
for (const [kaynak, hedef] of kopyalanacak) {
  const k = diskYolu(kaynak), h = diskYolu(hedef);
  if (!fs.existsSync(k)) { kaynakYok++; kaynakYokListe.push(kaynak); continue; }
  if (UYGULA) {
    fs.mkdirSync(path.dirname(h), { recursive: true });
    fs.copyFileSync(k, h);
  }
  kopyalandi++;
}

console.log('');
console.log(UYGULA ? '  UYGULANDI' : '  KURU KOŞU');
console.log('');
console.log(`  değişen sayfa      : ${degisenSayfa} / ${sayfalar(EN).length}`);
console.log(`  değişen referans   : ${degisenRef}`);
console.log(`  kopyalanan dosya   : ${kopyalandi}`);
if (kaynakYok) {
  console.log(`  ⚠ KAYNAK DOSYA YOK : ${kaynakYok}`);
  for (const y of kaynakYokListe.slice(0, 10)) console.log(`     ✗ ${y}`);
}
if (atlanan) {
  console.log(`  ⚠ SÖZLÜKTE YOK     : ${atlananlar.size} dosya (${atlanan} referans)`);
  for (const y of [...atlananlar].slice(0, 15)) console.log(`     ? ${y}`);
}
console.log('');

/* DOĞRULAMA — uygulamadan sonra /en/ dışına işaret eden görsel kalmamalı. */
let disari = 0;
const disariListe = new Set();
for (const dosya of sayfalar(EN)) {
  const h = fs.readFileSync(dosya, 'utf8');
  const kisaDizin = '/' + path.relative(SITE, path.dirname(dosya)).replace(/\\/g, '/');
  for (const m of h.matchAll(/\s(?:src|srcset)="([^"]+)"/g))
    for (const p of m[1].split(',')) {
      const yol = p.trim().split(/\s+/)[0];
      if (!yol || !GORSEL.test(yol.split('?')[0])) continue;
      const mut = path.posix.normalize(path.posix.join(kisaDizin, yol));
      if (!mut.startsWith('/en/') && !mut.startsWith('/assets/en/')) { disari++; disariListe.add(mut); }
    }
}
console.log(`  /en/ ya da /assets/en/ DIŞINA işaret eden görsel referansı: ${disari}`);
for (const y of [...disariListe].slice(0, 10)) console.log(`     ✗ ${y}`);
console.log('');
if (!UYGULA && degisenSayfa) console.log('  Uygulamak için: --uygula\n');
