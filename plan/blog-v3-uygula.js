/* BLOG DETAY v3 — KULLANICININ VERDİĞİ HTML/CSS ŞABLONU BİREBİR
 *
 * Kullanım: node plan/blog-v3-uygula.js e-ticaret-seo --ikiz
 *
 * Kaynak: kullanıcının yapıştırdığı üretim betiği (index.html + styles.css,
 * 7 Eyl 2026). /mnt/data bu makinede yok; çıktı doğrudan ikiz sayfaya
 * kuruluyor: /blog/<slug>-yeni/
 *
 * ŞABLONDAN BİREBİR ALINANLAR: tüm CSS (plan/blog-v3-css.js), hero (h1
 * satır kırılımı ve yeşil span dahil), lead, düğme metinleri, metrikler
 * (+200 · +1350 · +%95 · 4,8), tarayıcı kartı + saf-CSS ayakkabı, trafik
 * kartı (+%278), fayda kartı, 6 bölümün görsel kartları (mock-window,
 * chart +%245, search, sitemap, signal, score 92), mini-cta, TOC başlığı,
 * SSS düzeni, kapanış CTA paneli.
 *
 * ŞABLONA DÖKÜLEN GERÇEK İÇERİK (uydurma metinle DEĞİŞTİRİLMEDİ):
 *   · 7 gerçek H2 ve bölüm metinleri (makale) — cevap kutuları .note,
 *     listeler .check-list biçiminde
 *   · gerçek karşılaştırma tablosu
 *   · gerçek 8 SSS (FAQPage şemasıyla BİREBİR aynı metin)
 *   · gerçek menü/altbilgi (mania markası, gerçek bağlantılar; şablondaki
 *     "mara"/# bağlantıları örnek doldurmaydı)
 *   · <head> OLDUĞU GİBİ: title, meta, canonical, hreflang, @graph şema
 * NOT: şablondaki bölüm başlıkları/paragrafları makaleninkinin kısaltılmış
 * yeniden yazımıydı; gerçek metin korunarak şablona yerleştirildi — içerik
 * silme yasağı + FAQPage/Breadcrumb şema eşleşmesi bunun için.
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const V3CSS = require('./blog-v3-css.js');

const slug = process.argv[2] || 'e-ticaret-seo';
const IKIZ = process.argv.includes('--ikiz');
const kaynakDizin = path.join(S, 'blog', slug);
let h = fs.readFileSync(path.join(kaynakDizin, 'index.html'), 'utf8');
const rapor = [];

/* ── makaleden gerçek parçaları çıkar ── */
const govde = h.match(/<article class="yz-govde">([\s\S]*?)<\/article>/)[1];
const h2ler = [...govde.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
const bolumler = h2ler.map((m, i) => ({
  baslik: m[1].trim(),
  ic: govde.slice(m.index + m[0].length, i + 1 < h2ler.length ? h2ler[i + 1].index : govde.length),
}));
rapor.push(`makale bölümü: ${bolumler.length}`);

const sss = [...h.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)]
  .map((x) => ({ s: x[1].trim(), c: x[2].trim() }));
rapor.push(`gerçek SSS: ${sss.length} (FAQPage şemasıyla aynı metin)`);

const tablo = (govde.match(/<table[\s\S]*?<\/table>/) || [''])[0];
rapor.push(tablo ? 'gerçek karşılaştırma tablosu alındı' : '⚠ tablo bulunamadı');

const meta = (h.match(/<span class="yz-meta">([\s\S]*?)<\/span>/) || ['', ''])[1];

/* bölüm içeriğini şablon bileşenlerine çevir */
function donustur(ic) {
  let s = ic;
  s = s.replace(/\s*<figure[\s\S]*?<\/figure>/g, '');
  s = s.replace(/\s*<aside[\s\S]*?<\/aside>/g, '');
  s = s.replace(/<div class="yz-tablo">[\s\S]*?<\/div>\s*/g, '');
  s = s.replace(/<div class="yz-cevap"><p>([\s\S]*?)<\/p><\/div>/g, '<div class="note">$1</div>');
  s = s.replace(/<blockquote class="yz-alinti"><p>([\s\S]*?)<\/p><cite>([\s\S]*?)<\/cite><\/blockquote>/g,
    '<div class="note">$1<small>$2</small></div>');
  s = s.replace(/<(ol|ul)>/g, '<ul class="check-list">').replace(/<\/(ol|ul)>/g, '</ul>');
  return s.trim();
}

/* ── şablonun görsel kartları (BİREBİR) ── */
const VIZ = {
  mock: `<div class="visual-card product-page-card">
          <div class="mock-window">
            <div class="mock-sidebar">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="mock-main">
              <div class="mock-image"></div>
              <div class="mock-copy">
                <i></i><i></i><i></i>
                <div class="mock-stars">★★★★★</div>
                <button type="button">Sepete Ekle</button>
              </div>
            </div>
          </div>
        </div>`,
  chart: `<div class="visual-card chart-card">
          <div class="chart-head">
            <div>
              <small>Organik Trafik</small>
              <strong>+%245</strong>
            </div>
            <span class="tag">12 Ayda</span>
          </div>
          <div class="line-chart">
            <svg viewBox="0 0 560 230" role="img" aria-label="Kategori organik trafik çizgi grafiği">
              <line x1="20" y1="190" x2="540" y2="190"></line>
              <line x1="20" y1="130" x2="540" y2="130"></line>
              <line x1="20" y1="70" x2="540" y2="70"></line>
              <polyline points="24,182 70,162 112,151 158,157 205,131 252,100 295,112 338,89 385,80 432,59 482,45 536,21"></polyline>
            </svg>
          </div>
          <div class="months">
            <span>Oca</span><span>Mar</span><span>May</span><span>Tem</span><span>Eyl</span><span>Kas</span>
          </div>
        </div>`,
  search: `<div class="visual-card search-card">
          <div class="search-bar">
            <span>⌕</span>
            <span>koşu ayakkabısı</span>
          </div>
          <div class="search-result active">
            <div class="result-thumb"></div>
            <div class="result-copy">
              <strong>Ultra Run Pro</strong>
              <span>★★★★★ 4.8</span>
              <b>₺2.990</b>
            </div>
          </div>
          <div class="search-result ghost"></div>
          <div class="search-result ghost"></div>
        </div>`,
  sitemap: `<div class="visual-card sitemap-card">
          <div class="node node-home">Ana Sayfa</div>
          <div class="connector vertical"></div>
          <div class="branch-line"></div>

          <div class="node-row categories">
            <div class="node">Kategori</div>
            <div class="node">Kategori</div>
            <div class="node">Kategori</div>
          </div>

          <div class="node-row products">
            <div class="mini-group"><span>Ürün</span><span>Ürün</span></div>
            <div class="mini-group"><span>Ürün</span><span>Ürün</span></div>
            <div class="mini-group"><span>Ürün</span><span>Ürün</span></div>
          </div>
        </div>`,
  signal: `<div class="visual-card signal-card">
          <div class="signal-head">
            <span class="g">G</span>
            <strong>Sıralamayı Etkileyen Başlıca Sinyaller</strong>
          </div>
          <div class="bar-item"><span>İçerik Kalitesi</span><i style="--w:92%"></i><b>%32</b></div>
          <div class="bar-item"><span>Kullanıcı Deneyimi</span><i style="--w:78%"></i><b>%24</b></div>
          <div class="bar-item"><span>Teknik SEO</span><i style="--w:63%"></i><b>%18</b></div>
          <div class="bar-item"><span>Backlink</span><i style="--w:50%"></i><b>%15</b></div>
          <div class="bar-item"><span>Yapısal Veri</span><i style="--w:34%"></i><b>%11</b></div>
        </div>`,
  score: `<div class="visual-card score-card">
          <div class="score-ring">
            <div class="score-inner">
              <strong>92</strong>
              <span>SEO Sağlığı</span>
            </div>
          </div>
          <div class="score-list">
            <span>● Teknik SEO</span>
            <span>● İçerik</span>
            <span>● Site Mimarisi</span>
            <span>● Kullanıcı Deneyimi</span>
          </div>
        </div>`,
};

function icerikBlogu(i) {
  const b = bolumler[i];
  return `<div class="content">
          <div class="section-title">
            <span class="section-index">${String(i + 1).padStart(2, '0')}</span>
            <h2 id="b${i + 1}">${b.baslik}</h2>
          </div>
          ${donustur(b.ic)}
        </div>`;
}

/* şablondaki dizilim: 01 görsel-sol · 02 içerik önce (reverse-mobile,
   soft) · 03 görsel-sol · 04 içerik önce (soft) · 05 görsel-sol ·
   06 içerik önce (soft) · 07 tablo tam genişlik */
const SEKANS = [
  { viz: VIZ.mock, once: 'viz', soft: false },
  { viz: VIZ.chart, once: 'icerik', soft: true, ters: true },
  { viz: VIZ.search, once: 'viz', soft: false },
  { viz: VIZ.sitemap, once: 'icerik', soft: true },
  { viz: VIZ.signal, once: 'viz', soft: false },
  { viz: VIZ.score, once: 'icerik', soft: true },
];

const bolumHtml = SEKANS.map((k, i) => {
  const parcalar = k.once === 'viz' ? [k.viz, icerikBlogu(i)] : [icerikBlogu(i), k.viz];
  return `    <section id="b${i + 1}-sec" class="section${k.soft ? ' soft-section' : ''}">
      <div class="container split${k.ters ? ' reverse-mobile' : ''}">
        ${parcalar.join('\n\n        ')}
      </div>
    </section>`;
}).join('\n\n');

/* 07 — karşılaştırma (gerçek tablo) + mini-cta (şablon metni) */
const karsilastirma = `    <section id="b7-sec" class="section comparison-section">
      <div class="container">
        <div class="section-title">
          <span class="section-index">07</span>
          <h2 id="b7">${bolumler[6] ? bolumler[6].baslik : 'Karşılaştırma'}</h2>
        </div>
        ${bolumler[6] ? donustur(bolumler[6].ic) : ''}
        <div class="table-wrap">
          ${tablo}
        </div>

        <div class="mini-cta">
          <div>
            <small>E-Ticaret SEO’nuzda</small>
            <strong>Doğru stratejiyle fark yaratın</strong>
            <p>Kategori ve ürün sayfalarınızı birlikte optimize ederek hem trafik hem satış potansiyelinizi artırın.</p>
          </div>
          <a class="btn btn-primary" href="../../teklif/">Hemen Teklif Al <span>→</span></a>
        </div>
      </div>
    </section>`;

/* içindekiler — şablon düzeni, gerçek başlıklar */
const toc = `    <section class="section toc-section">
      <div class="container">
        <div class="toc-head">
          <div>
            <span class="section-kicker">İçindekiler</span>
            <h2>Bu rehberde neler var?</h2>
          </div>
        </div>

        <div class="toc-grid">
${bolumler.map((b, i) => `          <a href="#b${i + 1}"><span>${String(i + 1).padStart(2, '0')}</span> ${b.baslik}</a>`).join('\n')}
        </div>
      </div>
    </section>`;

/* SSS — şablon düzeni, GERÇEK 8 soru (şema eşleşmesi) */
const faq = `    <section class="section faq-section">
      <div class="container faq-layout">
        <div class="faq-intro">
          <span class="section-kicker">E-Ticaret SEO</span>
          <h2>Sık sorulan sorular</h2>
          <p>E-ticaret SEO hakkında en çok merak edilen kısa cevaplar.</p>
        </div>

        <div class="faq-list">
${sss.map((q, n) => `          <details${n === 0 ? ' open' : ''}>
            <summary>${q.s}</summary>
            <p>${q.c}</p>
          </details>`).join('\n\n')}
        </div>
      </div>
    </section>`;

const cta = `    <section id="cta" class="section cta-section">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-icon">↗</div>
          <div>
            <small>E-Ticaret SEO ile büyümeye hazır mısınız?</small>
            <h2>Ücretsiz SEO Analizi ile İlk Adımı Atın</h2>
            <p>Sitenizi birlikte inceleyelim, görünürlük ve dönüşüm fırsatlarını belirleyelim.</p>
          </div>
          <a class="btn btn-primary" href="../../teklif/">Ücretsiz Analiz Talep Et <span>→</span></a>
        </div>
      </div>
    </section>`;

/* hero — ŞABLON BİREBİR (kırıntı satırı eklendi: BreadcrumbList şeması
   görünür karşılığını kaybetmesin) */
const hero = `    <section class="hero">
      <div class="container">
        <nav class="crumb-lite" aria-label="Konum">
          <a href="../../">Ana sayfa</a><span>/</span><a href="../">Blog</a><span>/</span><b>E-Ticaret SEO</b><span>·</span><span>${meta}</span>
        </nav>
      </div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow-row">
            <span class="pill">E-Ticaret SEO</span>
            <span class="eyebrow-note">Daha fazla görünürlük. Daha fazla satış.</span>
          </div>

          <h1>
            E-Ticaret SEO ile<br>
            Ürün ve Kategori Sayfalarınız
            <span>Daha Fazla Müşteriye Ulaşsın</span>
          </h1>

          <p class="lead">
            E-ticaret siteniz için arama motorlarında daha görünür olun. Ürün ve kategori
            sayfalarınızı doğru optimize ederek ilgili müşterilere ulaşın, organik trafiğinizi
            artırın ve sürdürülebilir büyüme sağlayın.
          </p>

          <div class="hero-actions">
            <a class="btn btn-primary" href="../../teklif/">Ücretsiz SEO Analizi Al <span>→</span></a>
            <a class="btn btn-ghost" href="#b1">Rehberi İncele <span>↘</span></a>
          </div>

          <div class="metrics">
            <div class="metric">
              <strong>+200</strong>
              <span>E-Ticaret Markası</span>
            </div>
            <div class="metric">
              <strong>+1350</strong>
              <span>Optimize Edilen Sayfa</span>
            </div>
            <div class="metric">
              <strong>+%95</strong>
              <span>Organik Trafik Artışı</span>
            </div>
            <div class="metric">
              <strong>4,8</strong>
              <span>Müşteri Memnuniyeti</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" aria-label="E-ticaret performans görseli">
          <div class="browser-card">
            <div class="browser-top">
              <span></span><span></span><span></span>
              <div class="address-bar"></div>
            </div>

            <div class="product-demo">
              <div class="gallery">
                <div class="thumb active"></div>
                <div class="thumb"></div>
                <div class="thumb"></div>
                <div class="thumb"></div>
              </div>

              <div class="product-shot">
                <div class="shoe">
                  <div class="shoe-sole"></div>
                  <div class="shoe-body"></div>
                  <div class="shoe-laces"></div>
                </div>
              </div>

              <div class="product-info">
                <span class="mini-label">Yeni sezon</span>
                <h3>Sport Runner</h3>
                <p>Günlük kullanım için hafif ve konforlu.</p>
                <div class="stars">★★★★★ <span>4.8</span></div>
                <div class="price">₺2.499</div>
                <button type="button">Sepete Ekle</button>
              </div>
            </div>
          </div>

          <div class="traffic-card">
            <div>
              <small>Organik Trafik</small>
              <strong>+%278</strong>
              <span>Son 6 ay</span>
            </div>
            <svg viewBox="0 0 210 90" role="img" aria-label="Yükselen trafik grafiği">
              <polyline points="4,78 28,69 50,72 70,58 92,62 112,47 132,51 155,35 178,41 206,12"/>
            </svg>
          </div>

          <div class="benefit-card">
            <h4>Siz satmaya odaklanın, bulunurluğu biz büyütelim.</h4>
            <ul class="check-list compact">
              <li>Daha fazla görünürlük</li>
              <li>Daha nitelikli trafik</li>
              <li>Daha fazla satış</li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;

const yeniMain = `<main id="ana">

${hero}

${bolumHtml}

${karsilastirma}

${toc}

${faq}

${cta}

  </main>`;

/* ── sayfayı kur ── */
h = h.replace(/<main id="ana">[\s\S]*?<\/main>/, yeniMain);
rapor.push('main: şablon iskeleti + gerçek içerik');

/* head: Manrope + şablon CSS (kırıntı satırı stiliyle) */
const EK = `
/* kırıntı satırı — şablon dışı, BreadcrumbList şemasının görünür karşılığı */
.crumb-lite{display:flex;flex-wrap:wrap;gap:9px;align-items:center;padding-top:18px;
  font-size:12px;color:var(--muted)}
.crumb-lite a:hover{color:var(--green)}
.crumb-lite b{color:#aab6bf;font-weight:600}
`;
if (!h.includes('family=Manrope')) {
  h = h.replace('</head>', `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n<style>${V3CSS}${EK}</style>\n</head>`);
  rapor.push('head: Manrope + şablon CSS eklendi (title/meta/şema DOKUNULMADI)');
}

/* menü: şablonun yeşil düğmesi (gerçek menü korunuyor) */
if (!h.includes('btn-primary btn-small')) {
  h = h.replace(/(\s*)<a class="nav-tel"/, `$1<a class="btn btn-primary btn-small" href="../../teklif/">Ücretsiz Analiz Al <span>→</span></a>$1<a class="nav-tel"`);
  rapor.push('menü: şablonun yeşil "Ücretsiz Analiz Al →" düğmesi');
}

/* ── ikiz yaz ── */
if (IKIZ) {
  const hedef = path.join(S, 'blog', slug + '-yeni');
  fs.rmSync(hedef, { recursive: true, force: true });
  fs.mkdirSync(hedef, { recursive: true });
  const gsrc = path.join(kaynakDizin, 'gorsel');
  if (fs.existsSync(gsrc)) {
    const gdst = path.join(hedef, 'gorsel'); fs.mkdirSync(gdst, { recursive: true });
    for (const f of fs.readdirSync(gsrc)) fs.copyFileSync(path.join(gsrc, f), path.join(gdst, f));
  }
  h = h.replace(/<div class="dil"[^>]*>[\s\S]*?<\/div>\s*/g, '');
  h = h.replace(/(<body[^>]*>)/, `$1
<div style="position:relative;z-index:120;background:#FFB020;color:#1a1200;font:600 13px/1.45 sans-serif;padding:8px 16px;text-align:center">
  ÖNİZLEME v3 — verdiğin HTML/CSS şablonu. Canlı sayfa: <a href="../${slug}/" style="color:#1a1200;text-decoration:underline">/blog/${slug}/</a>
</div>`);
  fs.writeFileSync(path.join(hedef, 'index.html'), h);
  rapor.push(`→ /blog/${slug}-yeni/`);
}

console.log(`\n  ${IKIZ ? 'İKİZ YAZILDI' : 'KURU KOŞU'}\n`);
for (const r of rapor) console.log('  · ' + r);
console.log(`  boyut: ${(h.length / 1024).toFixed(1)} KB\n`);
