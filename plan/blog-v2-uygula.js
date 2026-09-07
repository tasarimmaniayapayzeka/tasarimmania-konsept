/* BLOG DETAY v2 — kullanıcının verdiği referans tasarıma göre gövde
 *
 * Kullanım:
 *   node plan/blog-v2-uygula.js <slug>          → kuru koşu
 *   node plan/blog-v2-uygula.js <slug> --ikiz   → /blog/<slug>-yeni/ olarak yaz
 *
 * Referanstan alınan yapı:
 *   · kategori rozeti + tek satır vaat
 *   · vurgulu (yeşil) parçası olan büyük başlık
 *   · giriş paragrafı + iki düğme
 *   · istatistik şeridi (daire işaretli, dikey ayraçlı)
 *   · tarayıcı maketi: ürün ızgarası + yüzen ölçüm kartı + arama çubuğu
 *     + el yazısı açıklama
 *   · numaralı bölüm kartları (01, 02 …), her biri maket ve/veya
 *     yeşil daireli kontrol listesiyle
 *
 * ⚠ İÇERİK UYDURULMUYOR. Başlıklar, paragraflar, SSS ve tablo yazının
 *   KENDİ metni. Yalnız kabuk değişiyor. Rakamlar da uydurulmuyor:
 *   istatistik şeridi ve ölçüm kartı yalnız yazıda GEÇEN sayıları
 *   kullanıyor; yoksa şerit konmuyor (bkz. plan/blog-v2-icerik-*.js).
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const V2CSS = require('./blog-v2-css.js');
const MK = require('./blog-v2-maket.js');

const slug = process.argv[2];
const IKIZ = process.argv.includes('--ikiz');
if (!slug) { console.error('Kullanım: node plan/blog-v2-uygula.js <slug> [--ikiz]'); process.exit(1); }

const kaynakDizin = path.join(S, 'blog', slug);
const kaynak = path.join(kaynakDizin, 'index.html');
if (!fs.existsSync(kaynak)) { console.error('Yazı yok: ' + kaynak); process.exit(1); }
let h = fs.readFileSync(kaynak, 'utf8');
const rapor = [];

const ICERIK = require('./blog-v2-icerik-' + slug + '.js');

/* bileşen CSS'i (soru paneli, bağlantı haritası, ara CTA, çizim sahnesi)
   referans hizmet sayfasından çıkarılır — v2 kabuğu bunların üstüne biner */
const REFERANS = path.join(S, 'ai-video-produksiyon', 'index.html');
const refCss = fs.readFileSync(REFERANS, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
const ONEK = ['.ciz-', '.cz-', '.hrt', '.sd', '.ara-cta', '.ac3-', '.yk'];
const ANAHTAR = /cizStroke|cizDolgu|cizRozet|sdGel|hrtAkis|ac3/;
function cssSuz(css) {
  const parcalar = []; let derinlik = 0, basla = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') derinlik++;
    else if (css[i] === '}') { derinlik--; if (!derinlik) { parcalar.push(css.slice(basla, i + 1)); basla = i + 1; } }
  }
  return parcalar.filter((p) => {
    const t = p.trim(); if (!t) return false;
    const temiz = t.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (!temiz || temiz.indexOf('{') < 0) return false;
    const sec = temiz.slice(0, temiz.indexOf('{')).trim();
    return ONEK.some((o) => sec.split(',').some((x) => x.trim().startsWith(o)))
      || (/^@(keyframes|property)/.test(sec) && ANAHTAR.test(sec))
      || (/^@media/.test(sec) && ONEK.some((o) => t.includes(o)));
  }).map((p) => p.trim());
}
const bilesenCss = cssSuz(refCss);

/* ── gövdeyi bölümlere ayır ── */
const gm = h.match(/(<article class="yz-govde">)([\s\S]*?)(<\/article>)/);
if (!gm) { console.error('gövde bulunamadı'); process.exit(1); }
let govde = gm[2];
/* eski tam genişlik gövde görselini çıkar */
const eskiGorsel = govde.match(/\s*<figure class="yz-gorsel">[\s\S]*?<\/figure>/);
if (eskiGorsel) { govde = govde.replace(eskiGorsel[0], ''); rapor.push('eski tam genişlik gövde görseli kaldırıldı'); }

const h2ler = [...govde.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
const bolumler = h2ler.map((m, i) => ({
  baslik: m[1].trim(),
  tam: m[0],
  ic: govde.slice(m.index + m[0].length, i + 1 < h2ler.length ? h2ler[i + 1].index : govde.length),
}));
rapor.push(`bölüm: ${bolumler.length}`);

/* ── başlıktaki vurgu parçasını <em> ile işaretle ── */
function vurgula(baslik) {
  const v = ICERIK.vurgular?.[baslik];
  if (!v) return baslik;
  if (!baslik.includes(v)) { rapor.push(`⚠ vurgu parçası başlıkta yok, atlandı: "${v}"`); return baslik; }
  return baslik.replace(v, `<em>${v}</em>`);
}

/* ── maket seç ── */
function maketFor(baslik) {
  const t = ICERIK.maketler?.[baslik];
  if (!t) return null;
  if (t.tur === 'tarayici') return MK.tarayici(t);
  if (t.tur === 'urun') return MK.urunDetay(t);
  if (t.tur === 'sahne') return MK.sahne(t);
  return null;
}

/* ── bölüm kartlarını kur ── */
let maketli = 0;
const kartlar = bolumler.map((b, i) => {
  const maket = maketFor(b.baslik);
  const cek = ICERIK.listeler?.[b.baslik];
  const ters = maketli % 2 === 1 ? ' ters' : '';
  if (maket) maketli++;
  const cekHtml = cek ? `<ul class="bl-cek">${cek.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
  const metin = `<div class="bl-metin">
          <span class="bl-no">${String(i + 1).padStart(2, '0')}</span>
          <h2>${vurgula(b.baslik)}</h2>
          ${b.ic}
          ${cekHtml}
        </div>`;
  if (!maket) return `      <article class="bl-kart">
        ${metin}
      </article>`;
  return `      <article class="bl-kart ikili${ters}">
        <div class="bl-ic">
          ${metin}
          <figure class="bl-maket">
            ${maket}
            ${ICERIK.maketler[b.baslik].aciklama ? `<figcaption>${ICERIK.maketler[b.baslik].aciklama}</figcaption>` : ''}
          </figure>
        </div>
      </article>`;
});
rapor.push(`maketli bölüm: ${maketli} (dönüşümlü sağ/sol) · maketsiz: ${bolumler.length - maketli}`);

/* ── hero: kategori rozeti + vaat + istatistik + tarayıcı maketi ── */
const heroMaket = ICERIK.hero?.maket ? MK.tarayici(ICERIK.hero.maket) : '';
const istHtml = ICERIK.hero?.istatistik?.length
  ? `<div class="bl-ist">${ICERIK.hero.istatistik.map((s) => `<div><i></i><b>${s.b}</b><span>${s.a}</span></div>`).join('')}</div>`
  : '';
if (!ICERIK.hero?.istatistik?.length) rapor.push('⚠ istatistik şeridi KONMADI — yazıda dayanağı olan rakam yok, uydurulmadı');

const heroHtml = `
  <section class="sec bl" style="padding-top:0">
    <div class="wrap">
      <div class="bl-hero">
        <div class="bl-hero-metin">
          ${istHtml}
          <div class="bl-hero-btn">
            <a class="btn btn-p" href="../../teklif/">${ICERIK.hero.birincilDugme} <span aria-hidden="true">→</span></a>
            <a class="btn btn-g" href="../../e-ticaret-seo/">${ICERIK.hero.ikincilDugme}</a>
          </div>
        </div>
        ${heroMaket ? `<figure class="bl-maket bl-hero-maket">${heroMaket}${ICERIK.hero.maket.aciklama ? `<figcaption>${ICERIK.hero.maket.aciklama}</figcaption>` : ''}</figure>` : ''}
      </div>
    </div>
  </section>`;

/* ── gövdeyi değiştir ── */
const yeniGovde = `
      <div class="bl">
${kartlar.join('\n')}
      </div>`;
h = h.replace(gm[0], gm[1] + yeniGovde + '\n    ' + gm[3]);

/* hero'yu kapak figürünün ardına koy */
const kapak = h.match(/<figure class="yz-kapak">[\s\S]*?<\/figure>/);
if (kapak) h = h.replace(kapak[0], kapak[0] + '\n' + heroHtml);
else { h = h.replace('<section class="sec"', heroHtml + '\n  <section class="sec"'); rapor.push('⚠ kapak figürü yok — hero <section> öncesine kondu'); }

/* ── hero CSS ── */
const HERO_CSS = `
/* --- v2 hero: metin + tarayıcı maketi --- */
.bl-hero{display:grid;gap:clamp(24px,3.4vw,44px)}
@media(min-width:1000px){.bl-hero{grid-template-columns:minmax(0,1fr) minmax(0,560px);align-items:center}}
.bl-hero-btn{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 0}
.bl-hero-maket{margin:0}
/* Okuma ölçüsü kartın İÇİNDE sınırlanıyor: tek sütunlu kartlarda metin
   66ch'i (≈ 62 karakter) aşmaz; iki sütunlularda zaten ızgara sınırlıyor. */
.bl-kart .bl-metin{min-width:0}
.bl-kart:not(.ikili) .bl-metin{max-width:66ch}
.bl-kart .bl-metin p{font-size:clamp(14.6px,1.7vw,16px);color:var(--fg-dim);line-height:1.78;margin:0 0 15px}
.bl-kart .yz-cevap{margin:14px 0 18px}
.bl-kart .yz-tablo,.bl-kart .yz-alinti{margin-top:18px}
`;

/* ── CSS + JS enjekte ── */
if (!h.includes('v2 TASARIM DİLİ')) {
  h = h.replace('</style>', bilesenCss.join('\n') + '\n' + V2CSS + HERO_CSS + '\n</style>');
  rapor.push(`CSS: bileşen ${bilesenCss.length} kural + v2 dili`);
}

/* SSS → .sd paneli, İlgili → .hrt, köprü → .ac3
 * ⚠ ORTAK MODÜLDEN geliyor (plan/blog-donusum-ortak.js). Kopyalanmadı:
 *   iki betikte iki kopya dursaydı biri düzeltilince öbürü eskide kalırdı. */
const donusum = require('./blog-donusum-ortak.js')(rapor);
h = donusum.sssDonustur(h);
h = donusum.ilgiliDonustur(h);
h = donusum.kopruDonustur(h);

const JS = `
<script>
"use strict";
(function(){
  var cipler = document.querySelectorAll('.ciz-cip [data-sayac]');
  if (!cipler.length) return;
  function bicim(h, d){ return (h % 1 === 0 ? Math.round(d) : d.toFixed(1).replace('.', ',')); }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cipler.forEach(function(b){ b.textContent = bicim(parseFloat(b.dataset.sayac), parseFloat(b.dataset.sayac)) + b.dataset.birim; });
    return;
  }
  var DONGU = 9000, basla = performance.now();
  function kare(t){
    var oran = Math.min(1, Math.max(0, (((t - basla) % DONGU) - 1200) / 3800));
    cipler.forEach(function(b){ var hd = parseFloat(b.dataset.sayac);
      b.textContent = bicim(hd, hd * oran) + b.dataset.birim; });
    requestAnimationFrame(kare);
  }
  requestAnimationFrame(kare);
})();
</script>`;
if (!h.includes('data-sayac') || h.includes('ciz-cip')) h = h.replace('</body>', JS + '\n</body>');

/* ── yaz ── */
if (IKIZ) {
  const hedef = path.join(S, 'blog', slug + '-yeni');
  fs.rmSync(hedef, { recursive: true, force: true });
  fs.mkdirSync(hedef, { recursive: true });
  const gsrc = path.join(kaynakDizin, 'gorsel');
  if (fs.existsSync(gsrc)) {
    const gdst = path.join(hedef, 'gorsel'); fs.mkdirSync(gdst, { recursive: true });
    for (const f of fs.readdirSync(gsrc)) fs.copyFileSync(path.join(gsrc, f), path.join(gdst, f));
  }
  /* önizleme bandı + dil düğmesini kaldır (kopya sayfa) */
  h = h.replace(/<div class="dil"[^>]*>[\s\S]*?<\/div>\s*/g, '');
  h = h.replace(/(<body[^>]*>)/, `$1
<div style="position:relative;z-index:120;background:#FFB020;color:#1a1200;font:600 13px/1.45 var(--sans);padding:9px 16px;text-align:center">
  ÖNİZLEME v2 — referans tasarıma göre. Canlı sayfa: <a href="../${slug}/" style="color:#1a1200;text-decoration:underline">/blog/${slug}/</a>
</div>`);
  fs.writeFileSync(path.join(hedef, 'index.html'), h);
  rapor.push(`→ /blog/${slug}-yeni/`);
}

console.log(`\n  ${IKIZ ? 'İKİZ YAZILDI' : 'KURU KOŞU'}\n`);
for (const r of rapor) console.log('  · ' + r);
console.log(`  boyut: ${(h.length / 1024).toFixed(1)} KB\n`);
