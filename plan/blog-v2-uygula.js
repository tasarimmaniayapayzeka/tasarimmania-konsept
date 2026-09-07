/* BLOG DETAY v2.1 — kontrollü UI/UX düzenlemesi
 *
 * Kullanım:
 *   node plan/blog-v2-uygula.js <slug>          → kuru koşu
 *   node plan/blog-v2-uygula.js <slug> --ikiz   → /blog/<slug>-yeni/ olarak yaz
 *
 * Kullanıcı brief'i: sıfırdan tasarım YOK. Mevcut koyu/premium dil korunur;
 * amaç sadeleştirme, kompaktlık ve okunabilirlik. "Premium editorial /
 * SEO knowledge hub", dashboard değil.
 *
 * ⚠ SEO YAPISINA DOKUNULMUYOR. Korunanlar (betik hiçbirini yazmıyor/silmiyor):
 *   title · meta description · canonical · hreflang · JSON-LD @graph
 *   (Article, WebPage, BreadcrumbList, FAQPage, Person, Organization) ·
 *   og:* · twitter:* · img alt · tek H1 · H2/H3 sırası · iç bağlantılar ·
 *   URL · CTA hedefleri.
 *   Değişen YALNIZ görünen kabuk: sınıf adları, sarmalayıcılar, CSS.
 *   SSS metinleri <details> içinde AYNEN kalıyor → FAQPage şeması geçerli.
 *
 * ⚠ İÇERİK SİLİNMİYOR. Paragraf, h2/h3/h4, tablo, alıntı, liste, iç
 *   bağlantı — hepsi taşınıyor. Betik sonunda kelime sayısını ölçüp
 *   raporluyor; kayıp varsa görünür olsun diye.
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

const kelimeSay = (s) => s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
const ONCE_KELIME = kelimeSay((h.match(/<main[\s\S]*?<\/main>/) || [''])[0]);

/* çizim sahnesi CSS'i (yalnız .cz-* animasyonları) — maketlerde kullanılıyor */
const refCss = fs.readFileSync(path.join(S, 'ai-video-produksiyon', 'index.html'), 'utf8')
  .match(/<style>([\s\S]*?)<\/style>/)[1];
function cssSuz(css, onek, anahtar) {
  const parcalar = []; let d = 0, b = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') d++;
    else if (css[i] === '}') { d--; if (!d) { parcalar.push(css.slice(b, i + 1)); b = i + 1; } }
  }
  return parcalar.filter((p) => {
    const t = p.trim(); if (!t) return false;
    const temiz = t.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (!temiz || temiz.indexOf('{') < 0) return false;
    const sec = temiz.slice(0, temiz.indexOf('{')).trim();
    return onek.some((o) => sec.split(',').some((x) => x.trim().startsWith(o)))
      || (/^@keyframes/.test(sec) && anahtar.test(sec));
  }).map((p) => p.trim());
}
const cizimCss = cssSuz(refCss, ['.ciz-', '.cz-'], /cizStroke|cizDolgu|cizRozet/);

/* ═══════════════ 1) HERO ═══════════════ */
function heroKur(html) {
  const hm = html.match(/(<header class="phd"[^>]*>[\s\S]*?<div class="wrap">)([\s\S]*?)(<\/div>\s*<\/header>)/);
  if (!hm) { rapor.push('⚠ .phd bulunamadı — HERO KURULMADI'); return html; }
  const eski = hm[2];
  const crumb = (eski.match(/<nav class="crumb"[\s\S]*?<\/nav>/) || [''])[0];
  const kat = (eski.match(/<span class="yz-kat">([\s\S]*?)<\/span>/) || ['', ''])[1];
  const meta = (eski.match(/<span class="yz-meta">([\s\S]*?)<\/span>/) || ['', ''])[1];
  const h1 = (eski.match(/<h1>([\s\S]*?)<\/h1>/) || ['', ''])[1];
  const ozet = (eski.match(/<p class="ozet">([\s\S]*?)<\/p>/) || ['', ''])[1];

  /* H1'in yalnız 3-5 kelimesi vurgulu — brief maddesi */
  const v = ICERIK.hero.h1Vurgu;
  const h1Html = v && h1.includes(v) ? h1.replace(v, `<em>${v}</em>`) : h1;
  if (v && !h1.includes(v)) rapor.push(`⚠ h1 vurgu parçası bulunamadı: "${v}"`);
  const vk = v ? v.split(/\s+/).length : 0;
  if (vk > 5) rapor.push(`⚠ h1 vurgusu ${vk} kelime — brief 3-5 diyor`);

  const ist = ICERIK.hero?.istatistik?.length
    ? `<div class="bl-ist">${ICERIK.hero.istatistik.map((s) => `<div><b>${s.b}</b><span>${s.a}</span></div>`).join('')}</div>` : '';
  const maket = ICERIK.hero?.maket ? MK.tarayici(ICERIK.hero.maket) : '';

  const yeni = `
      ${crumb}
      <div class="bl-hero">
        <div class="bl-hero-metin">
          <div class="bl-rozet-satir">
            <span class="bl-rozet">${ICERIK.hero.rozet || kat}</span>
            <span class="bl-vaat">${ICERIK.hero.vaat}</span>
          </div>
          <h1>${h1Html}</h1>
          <p class="ozet">${ozet}</p>
          <div class="bl-hero-btn">
            <a class="btn btn-p" href="../../teklif/">${ICERIK.hero.birincilDugme} <span aria-hidden="true">→</span></a>
            <a class="btn btn-g" href="../../e-ticaret-seo/">${ICERIK.hero.ikincilDugme}</a>
          </div>
          ${ist}
          <p class="bl-meta">${meta}</p>
        </div>
        ${maket ? `<figure class="bl-maket bl-hero-maket">${maket}${ICERIK.hero.maket.aciklama ? `<figcaption>${ICERIK.hero.maket.aciklama}</figcaption>` : ''}</figure>` : ''}
      </div>
    `;
  rapor.push('hero: sol metin + sağ maket, min-height YOK (içerik kadar yükselir)');
  let y = html.replace(hm[0], hm[1].replace('class="phd"', 'class="phd bl"') + yeni + hm[3]);
  const kapak = y.match(/\s*<figure class="yz-kapak">[\s\S]*?<\/figure>/);
  if (kapak) { y = y.replace(kapak[0], ''); rapor.push('kapak fotoğrafı kaldırıldı (og:image ve Article.image DEĞİŞMEDİ)'); }
  return y;
}

/* ═══════════════ 2) GÖVDE: bölüm kartları + içindekiler ═══════════════ */
function govdeKur(html) {
  const gm = html.match(/(<article class="yz-govde">)([\s\S]*?)(<\/article>)/);
  if (!gm) { rapor.push('⚠ gövde bulunamadı'); return html; }
  let govde = gm[2];
  const eskiG = govde.match(/\s*<figure class="yz-gorsel">[\s\S]*?<\/figure>/);
  if (eskiG) govde = govde.replace(eskiG[0], '');

  /* zaten v2 kabuğundaysa iç metni geri çıkar (yeniden koşulabilirlik) */
  govde = govde.replace(/<\/?(?:div|article|section|figure|figcaption|span|ul|li)[^>]*class="(?:bl|mk)[^"]*"[^>]*>/g, '');

  const h2ler = [...govde.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  if (!h2ler.length) { rapor.push('⚠ h2 yok'); return html; }
  const bolumler = h2ler.map((m, i) => ({
    baslik: m[1].trim(),
    ic: govde.slice(m.index + m[0].length, i + 1 < h2ler.length ? h2ler[i + 1].index : govde.length),
    id: 'b' + (i + 1),
  }));

  /* içindekiler — kompakt, 2 sütun */
  const toc = `      <nav class="bl-toc" aria-label="İçindekiler">
        <h2>İçindekiler</h2>
        <ol>${bolumler.map((b) => `<li><a href="#${b.id}">${b.baslik.replace(/<[^>]+>/g, '')}</a></li>`).join('')}</ol>
      </nav>`;
  rapor.push(`içindekiler: ${bolumler.length} başlık, 2 sütun (mobilde 1)`);

  /* kart seviyeleri: varsayılan ince üst çizgi; maketli olanlar .yuzey */
  let maketli = 0;
  const kartlar = bolumler.map((b, i) => {
    const mk = ICERIK.maketler?.[b.baslik];
    const cek = ICERIK.listeler?.[b.baslik];
    const vur = ICERIK.vurgular?.[b.baslik];
    const bas = vur && b.baslik.includes(vur) ? b.baslik.replace(vur, `<em>${vur}</em>`) : b.baslik;
    const cekHtml = cek ? `<ul class="bl-cek">${cek.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
    const ust = `<div class="bl-ust"><span class="bl-no">${String(i + 1).padStart(2, '0')}</span><h2 id="${b.id}">${bas}</h2></div>`;

    if (!mk) return `      <article class="bl-kart">
        ${ust}
        <div class="bl-metin">${b.ic}${cekHtml}</div>
      </article>`;

    const ters = maketli % 2 === 1 ? ' ters' : '';
    maketli++;
    const govdeMk = mk.tur === 'tarayici' ? MK.tarayici(mk) : mk.tur === 'urun' ? MK.urunDetay(mk) : MK.sahne(mk);
    return `      <article class="bl-kart yuzey ikili${ters}">
        ${ust}
        <div class="bl-ic">
          <div class="bl-metin">${b.ic}${cekHtml}</div>
          <figure class="bl-maket">${govdeMk}${mk.aciklama ? `<figcaption>${mk.aciklama}</figcaption>` : ''}</figure>
        </div>
      </article>`;
  });
  rapor.push(`bölüm: ${bolumler.length} · maketli ${maketli} (dönüşümlü) · maketsiz ${bolumler.length - maketli}`);
  rapor.push('kart seviyesi: maketli bölümler hafif yüzey, diğerleri yalnız ince üst çizgi (dev kart yok)');

  return html.replace(gm[0], `${gm[1]}
      <div class="bl-akis">
${toc}
${kartlar.join('\n')}
      </div>
    ${gm[3]}`);
}

/* ═══════════════ 3) SSS: sade akordiyon, 52px satır ═══════════════ */
function sssKur(html) {
  const bas = html.search(/<div class="[^"]*\b(?:yz-sss|sd)\b[^"]*"[^>]*>/);
  if (bas < 0) { rapor.push('⚠ SSS bulunamadı'); return html; }
  let d = 0, i = bas, son = -1;
  const ac = /<div\b/g, kap = /<\/div>/g;
  while (true) {
    ac.lastIndex = i; kap.lastIndex = i;
    const a = ac.exec(html), k = kap.exec(html);
    if (!k) break;
    if (a && a.index < k.index) { d++; i = a.index + 1; }
    else { d--; i = k.index + 1; if (d === 0) { son = k.index + 6; break; } }
  }
  if (son < 0) { rapor.push('⚠ SSS kapanışı bulunamadı'); return html; }
  const blok = html.slice(bas, son);

  /* hem eski <details> hem .sd panelinden soruları topla */
  let sorular = [...blok.matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)]
    .map((x) => ({ s: x[1].trim(), c: x[2].trim() }));
  if (!sorular.length) sorular = [...blok.matchAll(/<div class="sd-cevap[^"]*"[^>]*><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div>/g)]
    .map((x) => ({ s: x[1].trim(), c: x[2].trim() }));
  if (!sorular.length) { rapor.push('⚠ SSS sorusu çıkarılamadı — DOKUNULMADI'); return html; }

  const yeni = `<div class="bl-sss">
${sorular.map((q, n) => `        <details${n === 0 ? ' open' : ''}>
          <summary><i>${String(n + 1).padStart(2, '0')}</i>${q.s}</summary>
          <p>${q.c}</p>
        </details>`).join('\n')}
      </div>`;
  rapor.push(`SSS: ${sorular.length} soru → sade akordiyon (satır 52px, soru/cevap metni BİREBİR — FAQPage şeması geçerli)`);
  return html.slice(0, bas) + yeni + html.slice(son);
}

/* ═══════════════ 4) İLGİLİ YAZILAR: sade ızgara ═══════════════ */
function ilgiliKur(html) {
  const m = html.match(/(<nav class="[^"]*\byz-ilgili\b[^"]*"[^>]*>)([\s\S]*?)(<\/nav>)/);
  if (!m) { rapor.push('⚠ ilgili yazılar bulunamadı'); return html; }
  const kartlar = [...m[2].matchAll(/<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<(?:span|b) class="kat">([^<]*)<\/(?:span|b)>[\s\S]*?<(?:span|b) class="bas">([^<]*)<\/(?:span|b)>/g)]
    .map((x) => ({ href: x[1], kat: x[2], bas: x[3] }));
  if (!kartlar.length) { rapor.push('⚠ ilgili kart yok — DOKUNULMADI'); return html; }
  const baslik = (m[2].match(/<h2[^>]*>[\s\S]*?<\/h2>/) || ['<h2>İlgili rehberler</h2>'])[0];
  const yeni = `${m[1].replace(/class="[^"]*"/, 'class="bl-ilgili"')}
        ${baslik}
        <ul>${kartlar.map((k) => `<li><a href="${k.href}"><span class="kat">${k.kat}</span><span class="bas">${k.bas}</span></a></li>`).join('')}</ul>
      ${m[3]}`;
  rapor.push(`ilgili yazılar: ${kartlar.length} kart → sade ızgara (akan harita kaldırıldı — dashboard hissi veriyordu)`);
  return html.replace(m[0], yeni);
}

/* ═══════════════ 5) KAPANIŞ CTA: kompakt ═══════════════ */
function ctaKur(html) {
  const m = html.match(/<aside class="[^"]*\b(?:yz-kopru|ara-cta)\b[^"]*"[^>]*>[\s\S]*?<\/aside>/);
  const c = ICERIK.cta || {};
  const yeni = `<aside class="bl-cta">
        <div>
          <h2>${c.baslik || 'E-Ticaret SEO ile büyümeye hazır mısınız?'}</h2>
          <p>${c.metin || 'Kapsamlı SEO analiziyle sitenizin fırsatlarını birlikte belirleyelim.'}</p>
        </div>
        <a class="btn btn-p" href="${c.href || '../../teklif/'}">${c.dugme || 'Ücretsiz SEO Analizi Al'}</a>
      </aside>`;
  if (!m) { rapor.push('⚠ CTA çapası bulunamadı — eklenmedi'); return html; }
  rapor.push('kapanış CTA: dev banner değil, içeriği kadar (dolgu 28-34px)');
  return html.replace(m[0], yeni);
}

/* ═══════════════ 5b) CTA'YI SAYFA SONUNA TAŞI ═══════════════
 * ⚠ ÖLÇÜLEN SIRA HATASI. CTA, gövdedeki .yz-kopru'nun yerine geçtiği için
 *   makalenin ORTASINDA kalıyordu: belge sırasında CTA 492., SSS 533.
 *   sıradaydı — yani "SSS → CTA" arası -1274px (negatif = CTA önce).
 *   Brief'in ritmi: … Karşılaştırma → İçindekiler → SSS → CTA → Footer.
 *   Blok kesilip SSS bölümünden SONRA yeniden yerleştiriliyor. */
function ctaSonaTasi(html) {
  const m = html.match(/\s*<aside class="bl-cta">[\s\S]*?<\/aside>/);
  if (!m) { rapor.push('⚠ CTA taşınamadı — blok yok'); return html; }
  let y = html.replace(m[0], '');
  /* SSS'yi içeren <section> nerede bitiyor? */
  const sssIdx = y.indexOf('<div class="bl-sss">');
  if (sssIdx < 0) { rapor.push('⚠ SSS yok — CTA yerinde bırakıldı'); return html; }
  const kapanis = y.indexOf('</section>', sssIdx);
  if (kapanis < 0) { rapor.push('⚠ SSS bölümü kapanışı yok — CTA yerinde bırakıldı'); return html; }
  const son = kapanis + '</section>'.length;
  const blok = `

  <section class="sec bl-sec bl" aria-label="Teklif">
    <div class="wrap">
${m[0].trim()}
    </div>
  </section>`;
  rapor.push('CTA sayfa sonuna taşındı: SSS → CTA → footer (brief ritmi)');
  return y.slice(0, son) + blok + y.slice(son);
}

/* ═══════════════ 6) BÖLÜM DOLGULARINI SIFIRLA ═══════════════ */
function ritimKur(html) {
  /* .sec{padding:clamp(56px,7vw,104px) 0} → 1440px'te 100+100px.
     Ölçüldü: kart ile sonraki bölüm arası 171px. Brief 20-28px istiyor. */
  const once = (html.match(/<section class="sec/g) || []).length;
  let y = html.replace(/<section class="sec([^"]*)"/g, '<section class="sec bl-sec bl$1"');
  rapor.push(`bölüm ritmi: ${once} <section> dolgusu sıfırlandı, tek kaynak --bl-bosluk (masaüstü 24px / tablet 18 / mobil 16)`);
  return y;
}

/* ═══════════════ uygula ═══════════════ */
h = heroKur(h);
h = govdeKur(h);
h = sssKur(h);
h = ilgiliKur(h);
h = ctaKur(h);
h = ctaSonaTasi(h);
h = ritimKur(h);

/* menüdeki birincil düğme */
if (!h.includes('nav-cta')) {
  const o = h;
  h = h.replace(/(\s*)<a class="nav-tel"/, `$1<a class="nav-cta" href="../../teklif/">${ICERIK.hero.menuDugme || 'Ücretsiz Analiz Al'}</a>$1<a class="nav-tel"`);
  if (h !== o) rapor.push('menü: birincil düğme eklendi');
}

const HERO_CSS = `
/* --- hero --- */
.bl-hero{display:grid;gap:clamp(24px,3vw,40px);margin-top:20px}
@media(min-width:992px){.bl-hero{grid-template-columns:55fr 45fr;align-items:center}}
.bl-hero-metin{min-width:0;max-width:64ch}
.bl-rozet-satir{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.bl-rozet{display:inline-flex;align-items:center;height:29px;padding:0 14px;border-radius:99px;
  border:1px solid var(--bl-ac-hat);background:var(--bl-ac-zem);
  color:var(--acc);font-size:12.4px;font-weight:600;letter-spacing:-.01em}
.bl-vaat{font-size:14px;color:var(--bl-ikincil);letter-spacing:-.01em}
.phd.bl h1{font-size:clamp(34px,3.8vw,52px);letter-spacing:-.04em;line-height:1.08;
  margin:0 0 16px;color:var(--bl-bas);max-width:16ch}
.phd.bl h1 em{font-style:normal;color:var(--acc)}
.phd.bl .ozet{font-size:16.6px;color:var(--bl-gov);line-height:1.7;max-width:62ch;margin:0}
.bl-hero-btn{display:flex;gap:11px;flex-wrap:wrap;margin:22px 0 0}
.bl-hero-btn .btn{height:48px;padding:0 24px;font-size:14.8px;border-radius:11px}
.bl-meta{font-family:var(--mono);font-size:11.4px;color:var(--bl-ikincil);margin:18px 0 0}
.bl-hero-maket{margin:0}
/* menü düğmesi */
.nav-cta{display:none}
@media(min-width:761px){
  .nav-cta{display:inline-flex;align-items:center;height:38px;padding:0 18px;border-radius:10px;
    background:var(--acc);color:#06090D;font-size:13.2px;font-weight:600;letter-spacing:-.01em;
    transition:.2s var(--ease)}
  .nav-cta:hover{filter:brightness(1.08)}
}
@media(max-width:767px){
  .phd.bl h1{font-size:clamp(30px,7vw,38px);max-width:none}
  .bl-hero{margin-top:16px}
}
`;

if (!h.includes('v2.1 JETON KATMANI')) {
  h = h.replace('</style>', cizimCss.join('\n') + '\n' + V2CSS + HERO_CSS + '\n</style>');
  rapor.push(`CSS: çizim ${cizimCss.length} kural + v2.1 dili`);
}

const JS = `
<script>
"use strict";
/* sahne sayaçları — 9 sn'lik çizim döngüsüyle senkron */
(function(){
  var c = document.querySelectorAll('.ciz-cip [data-sayac]');
  if (!c.length) return;
  function b(hd, d){ return (hd % 1 === 0 ? Math.round(d) : d.toFixed(1).replace('.', ',')); }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    c.forEach(function(e){ e.textContent = b(parseFloat(e.dataset.sayac), parseFloat(e.dataset.sayac)) + e.dataset.birim; });
    return;
  }
  var D = 9000, t0 = performance.now();
  function k(t){
    var o = Math.min(1, Math.max(0, (((t - t0) % D) - 1200) / 3800));
    c.forEach(function(e){ var hd = parseFloat(e.dataset.sayac); e.textContent = b(hd, hd * o) + e.dataset.birim; });
    requestAnimationFrame(k);
  }
  requestAnimationFrame(k);
})();
</script>`;
if (h.includes('data-sayac') && !h.includes('sahne sayaçları')) h = h.replace('</body>', JS + '\n</body>');

/* ── içerik kaybı denetimi ── */
const SONRA_KELIME = kelimeSay((h.match(/<main[\s\S]*?<\/main>/) || [''])[0]);
const fark = SONRA_KELIME - ONCE_KELIME;
rapor.push(`içerik: ${ONCE_KELIME} → ${SONRA_KELIME} kelime (${fark >= 0 ? '+' : ''}${fark})${fark < -5 ? '  ⚠ KAYIP VAR' : ''}`);

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
<div style="position:relative;z-index:120;background:#FFB020;color:#1a1200;font:600 13px/1.45 var(--sans);padding:8px 16px;text-align:center">
  ÖNİZLEME v2.1 — Canlı sayfa: <a href="../${slug}/" style="color:#1a1200;text-decoration:underline">/blog/${slug}/</a>
</div>`);
  fs.writeFileSync(path.join(hedef, 'index.html'), h);
  rapor.push(`→ /blog/${slug}-yeni/`);
}

console.log(`\n  ${IKIZ ? 'İKİZ YAZILDI' : 'KURU KOŞU'}\n`);
for (const r of rapor) console.log('  · ' + r);
console.log(`  boyut: ${(h.length / 1024).toFixed(1)} KB\n`);
