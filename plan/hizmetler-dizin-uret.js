/* /hizmetler/ — TÜM HİZMETLER dizini
 *
 * Kullanıcı kararı (7 Eyl 2026): "dizin sayfası olarak kalsın, header da olsun
 * menü de". Menü zaten tamam (77/77 sayfada üst menüde bağlantı var).
 * Eksik olan dizinin kendisiydi: ÖLÇÜLDÜ — sayfa 28 hizmetin yalnız 6'sına
 * link veriyordu (eski hub yapısından kalma 5 modül kartı + grafik tasarım).
 *
 * ⚠ BAŞLIK VE ÖZET SAYFALARIN KENDİSİNDEN OKUNUR — elle yazılmaz. Bir hizmet
 *   sayfasının başlığı değişirse dizin de değişir; eskimiş metin kalmaz.
 *
 * ⚠ SINIF İTHAL EDİLMİYOR: .yk / .hrt-sag bu sayfada tanımlı değil (ölçüldü).
 *   Başka sayfadan sınıf adı kopyalamak, kuralı olmayan bir görünüm demektir.
 *   Dizin kendi dar kapsamlı .hzd-* kurallarını taşıyor, renkler sitenin
 *   değişkenlerinden (--hair, --panel, --acc, --muted, --r-md) geliyor.
 *
 * Ayrıca sayfadaki ItemList şeması 5 öğeden 28'e çıkarılır — dizin sayfasının
 * şeması listelediği şeyi yansıtmalı.
 *
 * Kullanım: node plan/hizmetler-dizin-uret.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';
const F = path.join(S, 'hizmetler', 'index.html');

/* modül → hizmet adresleri. Sıra satış mantığına göre: önce modülün kendisi. */
const GRUPLAR = [
  ['Web Tasarım & Yazılım', 'cy', ['/web-tasarim/', '/kurumsal-web-sitesi/', '/e-ticaret/', '/ozel-yazilim/', '/site-bakim/']],
  ['Mobil Uygulama', 'vi', ['/mobil-uygulama/', '/ios-android-uygulama/', '/react-native/', '/uygulama-arayuz-tasarimi/', '/aso/']],
  ['Dijital Pazarlama', 'amber', ['/dijital-pazarlama/', '/google-ads/', '/meta-reklam/', '/sosyal-medya/', '/performans-pazarlama/']],
  ['Video Prodüksiyon', 'pink', ['/video-produksiyon/', '/reklam-filmi/', '/urun-videosu/', '/reels-video/', '/ai-video-produksiyon/']],
  ['SEO', 'lime', ['/seo/', '/teknik-seo/', '/seo-icerik/', '/yerel-seo/', '/e-ticaret-seo/', '/cok-dilli-seo/']],
  ['Bağımsız hizmetler', 'cy', ['/grafik-tasarim/', '/yapay-zeka/']],
];

const kacir = (s) => s.replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
function kirp(s, n = 92) {
  if (s.length <= n) return s;
  const k = s.slice(0, n);
  return k.slice(0, k.lastIndexOf(' ')).replace(/[,;:.]$/, '');
}

/* sayfadan başlık + özet oku */
function bilgi(yol) {
  const p = path.join(S, yol.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(p)) return null;
  const h = fs.readFileSync(p, 'utf8');
  /* Service şemasındaki ad en temiz karşılık; yoksa H1 */
  let ad = (h.match(/"@type":\s*"Service"[\s\S]{0,300}?"name":\s*"([^"]+)"/) || [])[1];
  if (!ad) ad = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  /* uzun şema adlarının iki noktadan sonrası açıklama; başlıkta kısa hâli dursun */
  const kisaAd = ad.split(':')[0].trim();
  const ozet = (h.match(/<meta name="description" content="([^"]*)"/) || ['', ''])[1];
  return { ad: kisaAd, ozet: kirp(ozet.replace(/&quot;/g, '"').replace(/&#39;/g, "'")) };
}

const eksik = [];
let sayac = 0;
const gruplarHtml = GRUPLAR.map(([baslik, renk, yollar]) => {
  const kartlar = yollar.map((y) => {
    const b = bilgi(y);
    if (!b) { eksik.push(y); return null; }
    sayac++;
    return `          <a class="hzd-k" href="..${y}"><b>${kacir(b.ad)}</b>\n`
      + `            <span>${kacir(b.ozet)}</span></a>`;
  }).filter(Boolean).join('\n');
  return `        <div class="hzd-grup" style="--mrk:var(--${renk})">\n`
    + `          <h3>${kacir(baslik)}</h3>\n${kartlar}\n        </div>`;
}).join('\n');

const BOLUM = `  <section class="sec" id="tum-hizmetler" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <span class="eyebrow"><i></i>Dizin</span>
        <h2 data-kin>Tüm hizmetler</h2>
        <p>Beş modül ve iki bağımsız hizmet altında ${sayac} sayfa. Her biri kapsamı,
          neyin dahil olduğunu ve sık sorulanları kendi sayfasında anlatıyor.</p>
      </div>
      <div class="hzd rv d1">
${gruplarHtml}
      </div>
    </div>
  </section>
`;

const CSS = `.hzd{display:grid;gap:clamp(24px,3vw,38px)}
.hzd-grup{display:grid;gap:10px;padding-left:16px;position:relative}
.hzd-grup::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:2px;border-radius:2px;background:var(--mrk,var(--acc));opacity:.55}
.hzd-grup h3{font-family:var(--mono);font-size:11.4px;letter-spacing:.14em;text-transform:uppercase;color:var(--mrk,var(--acc));margin-bottom:4px}
.hzd-k{display:block;border:1px solid var(--hair);border-radius:var(--r-md);background:var(--panel);padding:14px 17px;transition:border-color .25s,transform .25s}
.hzd-k:hover{border-color:var(--mrk,var(--acc));transform:translateY(-2px)}
.hzd-k b{display:block;font-size:14.2px;color:var(--fg);margin-bottom:4px;letter-spacing:-.02em}
.hzd-k span{font-size:12.4px;color:var(--muted);line-height:1.55}
@media(min-width:760px){.hzd-grup{grid-template-columns:repeat(2,1fr)}.hzd-grup h3{grid-column:1/-1}}
@media(min-width:1100px){.hzd-grup{grid-template-columns:repeat(3,1fr)}}`;

/* ── uygula ── */
let h = fs.readFileSync(F, 'utf8');
const notlar = [];

if (/id="tum-hizmetler"/.test(h)) notlar.push('dizin bölümü zaten var — güncelleniyor');
if (/id="tum-hizmetler"/.test(h)) {
  const bas = h.indexOf('<section class="sec" id="tum-hizmetler"');
  let d = 0, son = -1;
  const re = /<section\b|<\/section>/g; re.lastIndex = bas;
  let m;
  while ((m = re.exec(h))) { if (m[0] === '</section>') { d--; if (!d) { son = re.lastIndex; break; } } else d++; }
  h = h.slice(0, bas) + BOLUM.trim() + h.slice(son);
} else {
  /* kapanış çağrısından ÖNCE: önce ne sattığımız, sonra teklif */
  const cta = h.lastIndexOf('<section', h.indexOf('Hangi modüllere ihtiyacınız var'));
  if (cta < 0) { console.log('  ✗ kapanış çağrısı bulunamadı'); process.exit(1); }
  h = h.slice(0, cta) + BOLUM + h.slice(cta);
  notlar.push(`dizin bölümü eklendi — ${sayac} hizmet, ${GRUPLAR.length} grup`);
}
if (!/\.hzd\{/.test(h)) h = h.replace('</style>', CSS + '\n  </style>');

/* ── ItemList şemasını 28 öğeye çıkar ── */
const sm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const j = JSON.parse(sm[1]);
const liste = j['@graph'].find((n) => [n['@type']].flat().includes('ItemList'));
if (liste) {
  const ogeler = [];
  for (const [, , yollar] of GRUPLAR)
    for (const y of yollar) {
      const b = bilgi(y);
      if (!b) continue;
      ogeler.push({ '@type': 'ListItem', position: ogeler.length + 1, name: b.ad, url: KANONIK + y });
    }
  const oncekiSayi = (liste.itemListElement || []).length;
  liste.itemListElement = ogeler;
  liste.numberOfItems = ogeler.length;
  h = h.replace(sm[0], '<script type="application/ld+json">\n' + JSON.stringify(j, null, 2) + '\n</script>');
  notlar.push(`ItemList ${oncekiSayi} → ${ogeler.length} öğe`);
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — /hizmetler/ dizini\n`);
notlar.forEach((n) => console.log('  · ' + n));
GRUPLAR.forEach(([b, , y]) => console.log(`    ${b.padEnd(24)} ${y.length} hizmet`));
if (eksik.length) { console.log('\n  ✗ SAYFASI BULUNAMAYAN:'); eksik.forEach((x) => console.log('     ' + x)); }
if (UYGULA) fs.writeFileSync(F, h, 'utf8');
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
