/* TAM SİTE DENETİMİ — canlı öncesi son kontrol.
 * Menü bütünlüğü, alt kategoriler, iç link geçerliliği, öksüz sayfa,
 * meta eksikleri, şema, görsel. Hiçbir dosyaya yazmaz.
 *
 * Kullanım: node plan/site-denetim.js
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');

/* ---------- sayfaları topla ---------- */
function tara(dir, liste) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) tara(tam, liste);
    else if (e.name === 'index.html') liste.push(tam);
  });
  return liste;
}
const dosyalar = tara(SITE, []);
/* site köküne göre URL yolu: site/hizmetler/seo/index.html -> /hizmetler/seo/ */
const url = (f) => '/' + path.relative(SITE, path.dirname(f)).split(path.sep).filter(Boolean).join('/') + (path.dirname(f) === SITE ? '' : '/');
const SAYFALAR = new Set(dosyalar.map(url));

const rapor = { kirikLink: [], oksuz: [], metaEksik: [], semaBozuk: [], gorselEksik: [], menuFark: [],
  sablonKalintisi: [], semaSayiYanlis: [] };

/* DERS: ilk sürüm yalnız link/meta/şema bakıyordu ve 26 blog yazısının ekmek
   kırıntısında duran "<span>undefined</span>" ibaresini GÖRMEDİ — kullanıcıya
   görünen bir hataydı. Şablon üretiminden kalan bu tür kalıntılar artık
   ekranda basılan metinde aranıyor. */
const KALINTI = /\b(undefined|null|NaN|\[object Object\]|\{\{[a-z_]+\}\}|%%[A-Z_]+%%)\b/;

/* ---------- link çözümleme ---------- */
function coz(sayfaUrl, href) {
  if (/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(href)) return null;
  const [yol] = href.split('#');
  if (!yol) return null;
  let mutlak;
  if (yol.startsWith('/')) mutlak = yol;
  else mutlak = path.posix.normalize(path.posix.join(sayfaUrl, yol));
  return mutlak;
}

/* ---------- her sayfayı incele ---------- */
const gelenLink = {};   // hedef -> kaç sayfadan link alıyor
const menuImzasi = {};  // sayfa -> nav link listesi

/* Yönlendirme stub'ları denetim dışı: bunlar bilerek h1/description taşımaz ve
   bilerek öksüzdür (eski adresi yeni adrese taşırlar). */
const STUB = new Set();
dosyalar.forEach((f) => {
  const h = fs.readFileSync(f, 'utf8');
  if (/http-equiv="refresh"/i.test(h) && /location\.replace/.test(h)) STUB.add(url(f));
});

dosyalar.forEach((f) => {
  const u = url(f);
  if (STUB.has(u)) return;
  const h = fs.readFileSync(f, 'utf8');

  /* meta */
  const baslik = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const aciklama = (h.match(/name="description" content="([^"]*)"/) || [])[1];
  const kanonik = (h.match(/rel="canonical" href="([^"]*)"/) || [])[1];
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  const eksik = [];
  if (!baslik) eksik.push('title');
  if (!aciklama) eksik.push('description');
  if (!kanonik) eksik.push('canonical');
  if (!h1) eksik.push('h1');
  if (eksik.length) rapor.metaEksik.push(u + ' → ' + eksik.join(', '));

  /* şema */
  [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].forEach((m) => {
    try { JSON.parse(m[1]); } catch (e) { rapor.semaBozuk.push(u); }
  });

  /* şablon kalıntısı — yalnız EKRANDA basılan metinde ara.
     <script>/<style> içindeki meşru JS (`x === undefined`) yanlış alarm vermesin. */
  const gorunur = h
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const kal = gorunur.match(KALINTI);
  if (kal) rapor.sablonKalintisi.push(u + ' → ekranda "' + kal[0] + '"');

  /* Article.wordCount gerçeği yansıtıyor mu?
     DERS: 27 yazının HEPSİNDE bu sayı yanlıştı (50-100 kelime eksik) —
     arama motoruna gerçekle uyuşmayan yapısal veri bildiriliyordu.
     Burada kaba bir kontrol yapılır; kesin ölçüm plan/seo-denetim.js'te. */
  const wc = (h.match(/"wordCount":\s*(\d+)/) || [])[1];
  if (wc) {
    const govdeM = h.match(/<article class="yz-govde"[^>]*>([\s\S]*?)<\/article>/);
    if (govdeM) {
      const kelimeSayisi = govdeM[1]
        .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ')
        .split(/\s+/).filter((w) => /[\wçğıöşüÇĞİÖŞÜ]/.test(w)).length;
      const sapma = Math.abs(kelimeSayisi - +wc);
      /* %8 tolerans: köprü kartı / SSS sayım farkları normal, 50+ sapma değil */
      if (sapma > kelimeSayisi * 0.08) {
        rapor.semaSayiYanlis.push(u + ' → wordCount ' + wc + ', ölçülen ~' + kelimeSayisi + ' (fark ' + sapma + ')');
      }
    }
  }

  /* nav imzası (üst menü linkleri) */
  /* KÖR NOKTA DERSİ: ana sayfa <nav class="nav-links">, diğerleri <div ...>
     kullanıyor. Yalnız <div> aramak ana sayfayı denetim dışı bırakıyordu. */
  const navM = h.match(/<(?:div|nav) class="nav-links"[^>]*>([\s\S]*?)<\/(?:div|nav)>/);
  if (navM) {
    menuImzasi[u] = [...navM[1].matchAll(/href="([^"]+)"/g)]
      .map((m) => coz(u, m[1])).filter(Boolean).sort().join(' ');
  }

  /* iç linkler */
  [...h.matchAll(/<a[^>]+href="([^"]+)"/g)].forEach((m) => {
    const hedef = coz(u, m[1]);
    if (!hedef) return;
    /* dosya uzantılı hedefler (css/js/görsel) atlanır */
    if (/\.[a-z0-9]{2,5}$/i.test(hedef)) return;
    const norm = hedef.endsWith('/') ? hedef : hedef + '/';
    if (!SAYFALAR.has(norm)) rapor.kirikLink.push(u + ' → ' + m[1] + '  (çözülen: ' + norm + ')');
    else if (norm !== u) gelenLink[norm] = (gelenLink[norm] || 0) + 1;
  });

  /* görseller */
  [...h.matchAll(/<img[^>]+src="([^"]+)"/g)].forEach((m) => {
    const src = m[1];
    if (/^(https?:|data:)/i.test(src)) return;
    const dosya = path.resolve(path.dirname(f), src);
    if (!fs.existsSync(dosya)) rapor.gorselEksik.push(u + ' → ' + src);
  });
});

/* ---------- öksüz sayfalar ---------- */
SAYFALAR.forEach((u) => {
  if (u === '/' || STUB.has(u)) return;
  if (!gelenLink[u]) rapor.oksuz.push(u);
});

/* ---------- menü tutarlılığı ---------- */
const imzalar = {};
Object.entries(menuImzasi).forEach(([u, imza]) => {
  (imzalar[imza] = imzalar[imza] || []).push(u);
});
const imzaListesi = Object.entries(imzalar).sort((a, b) => b[1].length - a[1].length);
if (imzaListesi.length > 1) {
  const [, cogunluk] = imzaListesi[0];
  imzaListesi.slice(1).forEach(([, sayfalar]) => {
    sayfalar.forEach((s) => rapor.menuFark.push(s));
  });
}

/* ---------- rapor ---------- */
const bolum = (ad, dizi, limit = 12) => {
  const durum = dizi.length === 0 ? '✓' : '✗';
  console.log(durum + ' ' + ad.padEnd(34) + (dizi.length === 0 ? 'temiz' : dizi.length + ' bulgu'));
  dizi.slice(0, limit).forEach((x) => console.log('      ' + x));
  if (dizi.length > limit) console.log('      … +' + (dizi.length - limit) + ' tane daha');
};

console.log('TOPLAM SAYFA: ' + SAYFALAR.size);
console.log('MENÜSÜ OLAN : ' + Object.keys(menuImzasi).length);
console.log('');
bolum('Kırık iç link', rapor.kirikLink);
bolum('Öksüz sayfa (link almayan)', rapor.oksuz, 20);
bolum('Meta eksiği', rapor.metaEksik);
bolum('Bozuk şema', rapor.semaBozuk);
bolum('Eksik görsel', rapor.gorselEksik);
bolum('Menüsü farklı sayfa', rapor.menuFark, 20);
bolum('Şablon kalıntısı (ekranda)', rapor.sablonKalintisi, 20);
bolum('Şema sayısı gerçekle uyuşmuyor', rapor.semaSayiYanlis, 20);

console.log('');
console.log('--- MENÜ ÇEŞİTLERİ ---');
imzaListesi.forEach(([imza, sayfalar], i) => {
  console.log('  #' + (i + 1) + '  ' + sayfalar.length + ' sayfa: ' + imza.slice(0, 110));
});

console.log('');
console.log('--- EN ÇOK İÇ LİNK ALAN 10 SAYFA ---');
Object.entries(gelenLink).sort((a, b) => b[1] - a[1]).slice(0, 10)
  .forEach(([u, n]) => console.log('  ' + String(n).padStart(4) + '  ' + u));
