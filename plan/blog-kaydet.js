/* Üretilen yazıyı SİTEYE KAYDEDER: blog dizini kartı + kategori süzgeci + sitemap.
 *
 * Neden ayrı betik: blog-uret.js yalnız yazının kendi index.html'ini yazıyor.
 * Yazı üretildi ama /blog/ listesinde ve sitemap'te GÖRÜNMÜYORDU — yani kimse
 * ulaşamıyordu. Bu adım elle yapılırsa 15 yazıda 15 kez unutulur.
 *
 * Kullanım:
 *   node plan/blog-kaydet.js plan/yazi-01-mobil-maliyet.json            (kuru koşu)
 *   node plan/blog-kaydet.js plan/yazi-01-mobil-maliyet.json --uygula
 *
 * ETKİSİZ TEKRAR: aynı slug kayıtlıysa hiçbir şey yazmaz. */
const fs = require('fs'), path = require('path');

const KOK = path.join(__dirname, '..');
const DIZIN = path.join(KOK, 'site/blog/index.html');
const HARITA = path.join(KOK, 'site/sitemap.xml');
const ALAN = 'https://www.tasarimmania.com';
const UYGULA = process.argv.includes('--uygula');

const AY = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
/* Kategori rengi: mevcut üç tondan biri. Yeni kategori bu haritaya yazılır. */
const RENK = {
  'E-Ticaret': '0,229,255', 'Grafik Tasarım': '0,229,255', 'Web Tasarım': '0,229,255',
  'Mobil': '0,229,255', 'Seo': '166,255,0', 'Sosyal Medya': '255,176,32',
  'Dijital Pazarlama': '255,176,32', 'Video': '255,176,32',
};

const yapilandirmaYolu = process.argv[2];
if (!yapilandirmaYolu) { console.error('kullanım: node plan/blog-kaydet.js <yazi.json> [--uygula]'); process.exit(1); }
const C = JSON.parse(fs.readFileSync(yapilandirmaYolu, 'utf8'));

const kacir = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/* Tarih dizgisini YEREL okur — new Date("2026-10-25T10:20:00") saat dilimine göre
   bir gün kayabiliyordu; gün/ay doğrudan dizgiden alınıyor. */
const [yil, ay, gun] = C.tarih.slice(0, 10).split('-').map(Number);
const gorunenTarih = `${gun} ${AY[ay - 1]} ${yil}`;
const isoTarih = C.tarih.slice(0, 10);
const kategori = C.kategori;
const renk = RENK[kategori];
if (!renk) { console.error(`✗ "${kategori}" kategorisinin rengi tanımsız — RENK haritasına ekleyin`); process.exit(1); }

let dizin = fs.readFileSync(DIZIN, 'utf8');
let harita = fs.readFileSync(HARITA, 'utf8');
const isler = [];

/* ---- 1. kategori süzgeç düğmesi ---- */
if (!dizin.includes(`data-filtre="${kategori}"`)) {
  const son = dizin.lastIndexOf('</button>\n      </div>');
  if (son < 0) { console.error('✗ süzgeç bloğu bulunamadı'); process.exit(1); }
  const kes = dizin.indexOf('\n', son);
  dizin = dizin.slice(0, kes)
    + `\n        <button type="button" class="" data-filtre="${kacir(kategori)}">${kacir(kategori)}</button>`
    + dizin.slice(kes);
  isler.push(`süzgeç düğmesi eklendi: ${kategori}`);
} else isler.push(`süzgeç düğmesi zaten var: ${kategori}`);

/* ---- 2. dizin kartı ---- */
if (dizin.includes(`href="./${C.slug}/"`)) {
  isler.push(`kart ZATEN KAYITLI (atlandı): ${C.slug}`);
} else {
  const ok = '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" '
    + 'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const ozet = C.kartOzet || C.yazi.metaAciklama;
  const kart =
`        <a class="bl-k rv" data-kat="${kacir(kategori)}" style="--k:${renk}" href="./${C.slug}/">
          <span class="kat">${kacir(kategori)}</span>
          <h2>${kacir(C.yazi.h1)}</h2>
          <p>${kacir(ozet)}</p>
          <span class="alt">
            <span class="tarih">${gorunenTarih} · ${C.okumaDk} dk</span>
            <span class="oku">Oku ${ok}</span>
          </span>
        </a>
`;
  /* Kartlar tarihe göre ARTAN sırada; yeni kart kendi tarihinden sonraki ilk kartın
     ÖNÜNE girer. Tarih karşılaştırması görünen metinden değil, kart sırasından
     türetiliyor: mevcut kartların tarihini ay adından çözüp sayıya çeviriyoruz. */
  const kartlar = [...dizin.matchAll(/ {8}<a class="bl-k rv"[\s\S]*?<\/a>\n/g)];
  const tarihi = (k) => {
    const m = k.match(/<span class="tarih">(\d+) (\S+) (\d{4})/);
    if (!m) return Infinity;
    return +m[3] * 10000 + (AY.indexOf(m[2]) + 1) * 100 + +m[1];
  };
  const benim = yil * 10000 + ay * 100 + gun;
  const sonraki = kartlar.find((k) => tarihi(k[0]) > benim);
  const yer = sonraki ? sonraki.index : (kartlar.at(-1).index + kartlar.at(-1)[0].length);
  dizin = dizin.slice(0, yer) + kart + dizin.slice(yer);
  isler.push(`kart eklendi (${gorunenTarih}) — sıra: ${sonraki ? 'araya' : 'sona'}`);
}

/* ---- 3. sitemap ---- */
const konum = `${ALAN}/blog/${C.slug}/`;
if (harita.includes(`<loc>${konum}</loc>`)) {
  isler.push('sitemap girdisi ZATEN VAR (atlandı)');
} else {
  const girdi = `  <url>\n    <loc>${konum}</loc>\n    <lastmod>${isoTarih}</lastmod>\n`
    + `    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  /* Son blog <url> bloğunun ardına ekle — blog girdileri bir arada kalsın */
  const bloklar = [...harita.matchAll(/ {2}<url>\s*<loc>[^<]*\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>\n/g)];
  if (!bloklar.length) { console.error('✗ sitemap içinde blog girdisi bulunamadı'); process.exit(1); }
  const s = bloklar.at(-1);
  harita = harita.slice(0, s.index + s[0].length) + girdi + harita.slice(s.index + s[0].length);
  isler.push('sitemap girdisi eklendi');
}

/* ---- rapor ---- */
console.log('\n' + '='.repeat(58));
console.log(UYGULA ? '  UYGULANIYOR' : '  KURU KOŞU — dosya yazılmıyor');
console.log('='.repeat(58));
isler.forEach((i) => console.log('  · ' + i));
if (UYGULA) {
  fs.writeFileSync(DIZIN, dizin, 'utf8');
  fs.writeFileSync(HARITA, harita, 'utf8');
  console.log('\n  2 dosya yazıldı: site/blog/index.html · site/sitemap.xml');
} else console.log('\n  Uygulamak için: --uygula');
console.log('');
