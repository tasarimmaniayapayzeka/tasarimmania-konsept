/* Bir sayfadaki ÇEVRİLECEK her dizgeyi çıkarır.
 *
 * YÖNTEM — "çok hassas" gereği: İngilizce sayfa, Türkçe sayfanın BİREBİR
 * kopyası olacak; yalnız insanın gördüğü metin değişecek. Böylece CSS, JS,
 * yapı, sınıf adları, animasyonlar bit bit aynı kalır ve tasarım kaymaz.
 *
 * Bu araç neyin çevrileceğini eksiksiz listeler:
 *   · <title>, meta description, og/twitter başlık+açıklama
 *   · görünür metin düğümleri (script/style dışında)
 *   · alt, aria-label, title, placeholder öznitelikleri
 *   · ld+json içindeki name/headline/description/text/articleSection …
 *
 * ⚠ SAYIM KİLİDİ: çıkarılan her dizgeye sıra numarası verilir. Çeviri geri
 *   yazılırken sayı tutmuyorsa işlem durur — sessizce eksik çeviri olmaz.
 *
 * ⚠ ÇEVRİLMEYECEKLER bilinçli dışarıda: sınıf adları, yollar, renk kodları,
 *   data-* değerleri, şema @type/@id, telefon, adres.
 *
 * Kullanım: node plan/en-metin-cikar.js <sayfa-yolu>   (örn: seo)
 *           node plan/en-metin-cikar.js seo --json
 */
const fs = require('fs'), path = require('path');
const { scriptBloklari, gorunurDizgelerAyrintili } = require('./en-script-suzgec.js');
const S = path.join(__dirname, '..', 'site');
/* ⚠ ANA SAYFA İÇİN "anasayfa" YAZIN, "/" DEĞİL. Git Bash tek eğik çizgiyi
   Windows yoluna çeviriyor (MSYS yol dönüşümü): "/" → "C:\Program Files\Git".
   Ölçüldü; betik site\C:\Program Files\Git\index.html aramaya çalıştı. */
const HAM = process.argv[2];
const HEDEF = (HAM === 'anasayfa' || HAM === '.') ? '' : HAM;
const AD = HEDEF === '' ? 'anasayfa' : HEDEF.replace(/[\\/]/g, '_');
const JSON_CIKTI = process.argv.includes('--json');
if (!HAM) { console.error('  kullanım: node plan/en-metin-cikar.js <sayfa-yolu|anasayfa>'); process.exit(2); }

const f = path.join(S, HEDEF, 'index.html');
if (!fs.existsSync(f)) { console.error('  ✗ sayfa yok: ' + f); process.exit(2); }
const h = fs.readFileSync(f, 'utf8');

const kayitlar = [];
const ekle = (tur, deger, baglam, ek) => {
  const d = String(deger).trim();
  if (!d) return;
  if (/^[\d\s.,:;/·—–-]+$/.test(d)) return;          /* yalnız sayı/noktalama */
  if (d.length < 2) return;
  kayitlar.push({ no: kayitlar.length + 1, tur, metin: d, baglam: baglam || '', ...(ek || {}) });
};

/* --- 1. head meta --- */
const meta = [
  ['title', /<title>([\s\S]*?)<\/title>/],
  ['meta description', /<meta name="description" content="([^"]*)"/],
  ['og:title', /<meta property="og:title" content="([^"]*)"/],
  ['og:description', /<meta property="og:description" content="([^"]*)"/],
  ['og:image:alt', /<meta property="og:image:alt" content="([^"]*)"/],
  ['twitter:title', /<meta name="twitter:title" content="([^"]*)"/],
  ['twitter:description', /<meta name="twitter:description" content="([^"]*)"/],
  ['twitter:image:alt', /<meta name="twitter:image:alt" content="([^"]*)"/],
];
for (const [ad, re] of meta) { const m = h.match(re); if (m) ekle('meta', m[1], ad); }

/* --- 2. şema içindeki metin alanları --- */
const CEVRILECEK_ALAN = new Set(['name', 'headline', 'description', 'text', 'articleSection',
  'jobTitle', 'alternateName', 'caption', 'knowsAbout']);
const sm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (sm) {
  try {
    const gez = (n, yol) => {
      if (Array.isArray(n)) return n.forEach((x, i) => gez(x, `${yol}[${i}]`));
      if (!n || typeof n !== 'object') return;
      for (const [k, v] of Object.entries(n)) {
        if (typeof v === 'string' && CEVRILECEK_ALAN.has(k)) ekle('şema', v, `${yol}.${k}`);
        else if (Array.isArray(v) && CEVRILECEK_ALAN.has(k)) v.forEach((x, i) => typeof x === 'string' && ekle('şema', x, `${yol}.${k}[${i}]`));
        else gez(v, `${yol}.${k}`);
      }
    };
    gez(JSON.parse(sm[1]), 'graph');
  } catch (e) { console.error('  ⚠ şema ayrıştırılamadı: ' + e.message); }
}

/* --- 3. gövde: görünür metin + öznitelikler --- */
const mb = h.indexOf('<main'), ms = h.lastIndexOf('</main>');
const govde = h.slice(mb, ms);
/* script/style bloklarını maskele */
const temiz = govde.replace(/<(script|style)[\s\S]*?<\/\1>/gi, (m) => ' '.repeat(m.length));

for (const m of temiz.matchAll(/>([^<>{}]+)</g)) {
  const t = m[1].replace(/\s+/g, ' ').trim();
  if (!t) continue;
  /* hangi etiketin içinde — bağlam olsun */
  const oncesi = temiz.slice(Math.max(0, m.index - 120), m.index);
  const et = (oncesi.match(/<([a-z][a-z0-9]*)[^<>]*$/i) || ['', '?'])[1];
  ekle('metin', t, `<${et}>`);
}
for (const [oz, re] of [['alt', /\salt="([^"]+)"/g], ['aria-label', /\saria-label="([^"]+)"/g],
  ['title', /\stitle="([^"]+)"/g], ['placeholder', /\splaceholder="([^"]+)"/g]]) {
  for (const m of temiz.matchAll(re)) ekle('öznitelik', m[1], oz);
}

/* --- 3b. SCRIPT İÇİNDEKİ GÖRÜNÜR METİN ---
   ⚠ ÖLÇÜLMÜŞ KAÇAK (7 Eyl 2026): yukarıdaki maskeleme script'leri tamamen
   siliyordu. Ama bazı script'ler EKRANA BASILAN veri taşıyor — ana sayfadaki
   seoWidget'ın anahtar kelime dizisi gibi. İngilizce ana sayfa üretildikten
   sonra tarayıcıda 5 Türkçe dizge olarak yakalandı. Kod dizgeleri
   en-script-suzgec.js'te elenir; ayrım tek yerde tanımlı. */
{
  const gorulen = new Set();
  for (const blok of scriptBloklari(h))
    for (const { ham, tirnak, metin } of gorunurDizgelerAyrintili(blok.kod)) {
      if (gorulen.has(metin)) continue;      /* aynı dizge script'te birden çok geçebilir */
      gorulen.add(metin);
      /* ham + tirnak saklanıyor: üretici çeviriyi TIRNAKLARIYLA BİRLİKTE
         değiştirip içindeki kesme işaretini kaçırabilsin. Girinti de ham'da. */
      ekle('script', metin, 'js verisi', { ham, tirnak });
    }
}

/* --- 4. menü + altbilgi (kabuk metni) --- */
const kabuk = h.slice(h.indexOf('<nav class="nav"') >= 0 ? h.indexOf('<nav class="nav"') : 0, mb)
  + h.slice(ms);
const kabukTemiz = kabuk.replace(/<(script|style)[\s\S]*?<\/\1>/gi, (m) => ' '.repeat(m.length));
const kabukMetin = new Set();
for (const m of kabukTemiz.matchAll(/>([^<>{}]+)</g)) {
  const t = m[1].replace(/\s+/g, ' ').trim();
  if (t) kabukMetin.add(t);
}

if (JSON_CIKTI) {
  const cikti = { sayfa: HEDEF, ad: AD, kayitlar, kabuk: [...kabukMetin] };
  const p = path.join('C:/Temp', `en-${AD}.json`);
  fs.mkdirSync('C:/Temp', { recursive: true });
  fs.writeFileSync(p, JSON.stringify(cikti, null, 2), 'utf8');
  console.log(`  ${kayitlar.length} kayıt + ${kabukMetin.size} kabuk dizgesi → ${p}`);
} else {
  const tur = {};
  kayitlar.forEach((k) => tur[k.tur] = (tur[k.tur] || 0) + 1);
  console.log(`\n  ÇEVRİLECEK DİZGELER — /${HEDEF}/\n`);
  Object.entries(tur).forEach(([t, n]) => console.log(`  ${t.padEnd(12)} ${n}`));
  console.log(`  ${'kabuk'.padEnd(12)} ${kabukMetin.size} (menü/altbilgi — bir kez çevrilip her sayfada kullanılır)`);
  console.log(`  ${'TOPLAM'.padEnd(12)} ${kayitlar.length}`);
  const kelime = kayitlar.reduce((a, k) => a + k.metin.split(/\s+/).length, 0);
  console.log(`\n  çevrilecek kelime: ${kelime}`);
  console.log(`\n  ── ilk 12 kayıt ──`);
  kayitlar.slice(0, 12).forEach((k) => console.log(`  ${String(k.no).padStart(3)}. [${k.tur}/${k.baglam}] ${k.metin.slice(0, 74)}`));
  console.log('\n  tamamı için: --json\n');
}
