/* İÇ LİNK ENJEKSİYON TURU — SEO Kuralları 1.2 Madde 30-33, 35
 *
 * 27 yazı yayına girene kadar yatay kardeş linkleri BİLEREK boş bırakıldı
 * (Madde 35 — zincir kırığı yasağı: yayında olmayan kardeşe link verilmez).
 * Hepsi yayında olduğuna göre tek turda enjekte ediliyor.
 *
 * İki yön:
 *   1. YATAY  — her yazıya küme içi 3 kardeş (Madde 30-32)
 *   2. TERS   — her hub sayfasına kümesinin yazıları (Madde 33)
 *
 * Kullanım: node plan/ic-link-enjeksiyon.js [--kuru]
 *   --kuru : hiçbir dosyaya yazmaz, yalnız ne yapacağını raporlar
 */
const fs = require('fs');
const path = require('path');
const KOK = __dirname + '/..';
const KURU = process.argv.includes('--kuru');

const harita = JSON.parse(fs.readFileSync(KOK + '/plan/blog-uretim-haritasi.json', 'utf8'));
const YAZI = Object.fromEntries(harita.yazilar.map((y) => [y.slug, y]));

/* Yayındaki gerçek başlıkları HTML'den oku — haritadaki "baslikAdayi" değil,
   yayınlanan H1 kullanılmalı (ajanlar başlığı uyarlamış olabilir). */
function gercekBaslik(slug) {
  const P = KOK + '/site/blog/' + slug + '/index.html';
  if (!fs.existsSync(P)) return null;
  const h = fs.readFileSync(P, 'utf8');
  const m = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : null;
}
function ozet(slug) {
  const P = KOK + '/site/blog/' + slug + '/index.html';
  const h = fs.readFileSync(P, 'utf8');
  const m = h.match(/name="description" content="([^"]*)"/);
  return m ? m[1] : '';
}

const BASLIK = {};
harita.yazilar.forEach((y) => { BASLIK[y.slug] = gercekBaslik(y.slug); });

const KAT_RENK = {
  'Seo': '166,255,0', 'E-Ticaret': '0,229,255', 'Grafik Tasarım': '0,229,255',
  'Sosyal Medya': '255,176,32', 'Dijital Pazarlama': '255,176,32', 'Web Tasarım': '0,229,255',
};

/* ---------- ORTAK CSS ---------- */
const CSS = `
.yz-ilgili{margin:clamp(30px,4vw,44px) 0 0;padding-top:clamp(24px,3vw,32px);
  border-top:1px solid var(--hair)}
.yz-ilgili h2{font-size:clamp(17px,2.1vw,20px);letter-spacing:-.02em;margin:0 0 4px}
.yz-ilgili .not{font-size:13.4px;color:var(--muted);margin:0 0 18px}
.yz-ilgili ul{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  list-style:none;padding:0;margin:0}
.yz-ilgili li{margin:0}
.yz-ilgili a{display:flex;flex-direction:column;gap:5px;height:100%;
  border:1px solid var(--hair);border-radius:var(--r-md);padding:14px 16px;
  text-decoration:none;transition:border-color .25s,transform .25s;background:rgba(255,255,255,.012)}
.yz-ilgili a:hover{border-color:rgba(var(--k,0,229,255),.5);transform:translateY(-2px)}
.yz-ilgili .kat{font-family:var(--mono);font-size:9.4px;letter-spacing:.14em;
  text-transform:uppercase;color:rgb(var(--k,0,229,255))}
.yz-ilgili .bas{font-size:14.4px;line-height:1.4;color:var(--fg);font-weight:600}
@media(max-width:600px){.yz-ilgili ul{grid-template-columns:1fr}}`;

function kart(slug) {
  const y = YAZI[slug];
  if (!y || !BASLIK[slug]) return null;
  const renk = KAT_RENK[y.kategori] || '0,229,255';
  return `          <li><a href="../${slug}/" style="--k:${renk}">` +
    `<span class="kat">${y.kategori}</span>` +
    `<span class="bas">${BASLIK[slug]}</span></a></li>`;
}

/* ---------- 1) YATAY: yazılara kardeş linkleri ---------- */
let yaziOk = 0, yaziAtla = 0, linkToplam = 0;
harita.yazilar.forEach((y) => {
  const P = KOK + '/site/blog/' + y.slug + '/index.html';
  if (!fs.existsSync(P)) { console.log('  ✗ dosya yok:', y.slug); return; }
  let h = fs.readFileSync(P, 'utf8');

  if (h.includes('yz-ilgili')) { yaziAtla++; return; }

  const kartlar = y.kardesler.map(kart).filter(Boolean);
  if (kartlar.length < 3) console.log('  ! ' + y.slug + ': yalnız ' + kartlar.length + ' kardeş kartı');
  linkToplam += kartlar.length;

  const blok = `
      <nav class="yz-ilgili rv" aria-labelledby="ilgili-baslik">
        <h2 id="ilgili-baslik">İlgili rehberler</h2>
        <p class="not">${y.kume} kümesinden, bu yazıyı tamamlayan diğer başlıklar.</p>
        <ul>
${kartlar.join('\n')}
        </ul>
      </nav>
`;

  /* SSS bölümünün hemen ÖNÜNE, gövde bölümünün içine */
  const capa = '  <section class="sec" id="sss"';
  if (!h.includes(capa)) { console.log('  ✗ çapa yok:', y.slug); return; }
  h = h.replace(capa, blok.replace(/^\n/, '') + '\n' + capa);

  /* CSS'i style bloğunun sonuna ekle */
  if (!h.includes('.yz-ilgili{')) {
    const si = h.lastIndexOf('</style>');
    h = h.slice(0, si) + CSS + '\n' + h.slice(si);
  }

  if (!KURU) fs.writeFileSync(P, h, 'utf8');
  yaziOk++;
});
console.log('YATAY: ' + yaziOk + ' yazıya blok eklendi, ' + yaziAtla + ' atlandı (zaten vardı), ' + linkToplam + ' link');

/* ---------- 2) TERS YÖN: hub sayfalarına küme yazıları (Madde 33) ---------- */
let hubOk = 0;
harita.kumeler.forEach((k) => {
  const P = KOK + '/site' + k.hub + 'index.html';
  if (!fs.existsSync(P)) { console.log('  ✗ hub yok:', k.hub); return; }
  let h = fs.readFileSync(P, 'utf8');
  if (h.includes('yz-ilgili')) { console.log('  ~ hub zaten var:', k.hub); return; }

  /* hub derinliğine göre göreli yol: /hizmetler/seo/ -> ../../blog/<slug>/ */
  const derinlik = k.hub.split('/').filter(Boolean).length;
  const up = '../'.repeat(derinlik);

  const uyeler = k.uyeler.filter((s) => YAZI[s] && BASLIK[s]);
  const kartlar = uyeler.map((slug) => {
    const y = YAZI[slug];
    const renk = KAT_RENK[y.kategori] || '0,229,255';
    return `          <li><a href="${up}blog/${slug}/" style="--k:${renk}">` +
      `<span class="kat">${y.kategori}</span><span class="bas">${BASLIK[slug]}</span></a></li>`;
  });
  if (!kartlar.length) { console.log('  ✗ üye yok:', k.ad); return; }

  const blok = `
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <nav class="yz-ilgili rv" aria-labelledby="hub-ilgili">
        <h2 id="hub-ilgili">${k.ad} rehber yazıları</h2>
        <p class="not">Bu hizmetin arkasındaki yöntemi anlatan blog içerikleri.</p>
        <ul>
${kartlar.join('\n')}
        </ul>
      </nav>
    </div>
  </section>
`;

  /* kapanış CTA bandından ÖNCE */
  const idx = h.lastIndexOf('  <section class="sec" style="padding-top:0">\n    <div class="wrap">\n      <div class="band rv">');
  if (idx < 0) { console.log('  ✗ hub çapası yok:', k.hub); return; }
  h = h.slice(0, idx) + blok.replace(/^\n/, '') + '\n' + h.slice(idx);

  if (!h.includes('.yz-ilgili{')) {
    const si = h.lastIndexOf('</style>');
    if (si < 0) { console.log('  ✗ style bloğu yok:', k.hub); return; }
    h = h.slice(0, si) + CSS + '\n' + h.slice(si);
  }

  if (!KURU) fs.writeFileSync(P, h, 'utf8');
  hubOk++;
  console.log('  ✓ ' + k.hub + ' <- ' + kartlar.length + ' yazı');
});
console.log('TERS YÖN: ' + hubOk + ' hub sayfası güncellendi');
console.log(KURU ? '\n(KURU KOŞU — hiçbir dosya yazılmadı)' : '\nYAZILDI');
