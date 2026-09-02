/* Blog altyapısı üreticisi: /blog/ dizin sayfası + /blog/<slug>/ yazı sayfaları.
   Kullanım: node blog-uret.js <yazi-config.json>
   Site dilini korur (nav/footer/CTA/tm.css), okuma için sakin düzen. */
const fs = require('fs');
const path = require('path');
const KOK = 'C:/Users/İHSAN/Desktop/Claude-Projeler/25-TasarimMania-Site/';
const SITE = KOK + 'site/';

const KAT_DAL = {
  'Seo': 'seo', 'SEO': 'seo',
  'E-Ticaret': 'web', 'Web Tasarım': 'web', 'Grafik Tasarım': 'web',
  'Dijital Pazarlama': 'pazarlama', 'Sosyal Medya': 'pazarlama',
  'Video': 'video', 'Mobil': 'mobil',
};

const ORTAK_CSS = `
.nav{position:fixed;inset:0 0 auto 0;z-index:100;transition:.35s var(--ease);border-bottom:1px solid transparent}
.nav.scrolled{background:rgba(11,13,18,.82);backdrop-filter:blur(18px);border-bottom-color:var(--hair)}
.nav-in{display:flex;align-items:center;gap:16px;height:74px}
.nav-logo img{height:36px;width:auto}
.nav-links{display:flex;gap:24px;margin-left:auto;font-size:14.5px;font-weight:500}
.nav-links a{color:var(--fg-dim);transition:color .25s}
.nav-links a:hover,.nav-links a[aria-current]{color:var(--fg)}
.nav-tel{font-family:var(--mono);font-size:13px;color:var(--fg-dim);border:1px solid var(--hair);
  border-radius:999px;padding:9px 16px;transition:.25s}
.nav-tel:hover{border-color:var(--acc);color:var(--acc)}
.burger{display:none;background:none;border:0;cursor:pointer;padding:9px;margin-left:auto}
.burger span{display:block;width:22px;height:2px;background:var(--fg);margin:5px 0;border-radius:2px}
.mobmenu{position:fixed;inset:74px 0 auto 0;z-index:99;background:rgba(11,13,18,.98);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--hair);padding:26px 24px 32px;display:grid;gap:18px;
  max-height:calc(100dvh - 74px);overflow-y:auto;
  transform:translateY(-120%);visibility:hidden;transition:transform .4s var(--ease),visibility .4s}
.mobmenu.open{transform:none;visibility:visible}
.mobmenu a{font-size:17px;font-weight:600}
.phd{position:relative;overflow:hidden;isolation:isolate;
  padding:calc(var(--nav-h) + clamp(28px,4vw,52px)) 0 clamp(22px,3vw,34px)}
.phd::before{content:"";position:absolute;inset:0;z-index:-1;
  background:radial-gradient(900px 430px at 14% -12%,rgba(var(--acc-rgb),.14),transparent 62%)}
.phd .crumb{margin-bottom:20px}
.wa{position:fixed;right:22px;bottom:calc(22px + env(safe-area-inset-bottom));z-index:90;width:54px;height:54px;
  border-radius:50%;background:#25D366;display:grid;place-items:center;
  box-shadow:0 10px 30px -8px rgba(37,211,102,.6);transition:.3s}
.wa:hover{transform:scale(1.07)}
.wa svg{width:27px;height:27px;fill:#fff}
.ftr{border-top:1px solid var(--hair);padding:52px 0 40px;background:rgba(255,255,255,.012)}
.ftr-ust{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:32px;margin-bottom:36px}
.ftr-ust img{height:47px;width:auto;margin-bottom:11px}
.ftr-ust p{color:var(--muted);font-size:13.6px;max-width:320px}
.ftr h5{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--muted);margin-bottom:13px;font-weight:500}
.ftr ul{display:grid;gap:9px}
.ftr ul a{font-size:13.8px;color:var(--fg-dim);transition:color .25s;padding-block:7px}
.ftr ul a:hover{color:var(--acc)}
.ftr-alt{border-top:1px solid var(--hair);padding-top:20px;display:flex;justify-content:space-between;
  gap:14px;flex-wrap:wrap;font-size:12.4px;color:var(--muted)}
@media(max-width:960px){.ftr-ust{grid-template-columns:1fr 1fr}}
@media(max-width:760px){.nav-links,.nav-tel{display:none}.burger{display:block}.ftr-ust{grid-template-columns:1fr}}`;

function nav(u, aktif) {
  const im = (s) => s === aktif ? ' aria-current="page"' : '';
  return `<nav class="nav" data-nav aria-label="Ana menü">
  <div class="wrap nav-in">
    <a class="nav-logo" href="${u}" aria-label="TasarımMania ana sayfa">
      <img src="${u}../assets/logo/marka-yatay-optik.png" alt="TasarımMania — Creative Agency" width="435" height="163" decoding="async">
    </a>
    <div class="nav-links">
      <a href="${u}hizmetler/">Hizmetler</a>
      <a href="${u}#isler">İşler</a>
      <a href="${u}hakkimizda/">Ajans</a>
      <a href="${u}blog/"${im('blog')}>Blog</a>
      <a href="${u}teklif/">Teklif Al</a>
      <a href="${u}iletisim/">İletişim</a>
    </div>
    <a class="nav-tel" href="tel:+905547916545">0554 791 65 45</a>
    <button class="burger" data-burger aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="mobmenu" data-mobmenu aria-hidden="true">
  <a href="${u}hizmetler/">Hizmetler</a><a href="${u}#isler">İşler</a><a href="${u}hakkimizda/">Ajans</a>
  <a href="${u}blog/">Blog</a><a href="${u}teklif/">Teklif Al</a><a href="${u}iletisim/">İletişim</a>
  <a href="tel:+905547916545">0554 791 65 45</a>
</div>`;
}

function footer(u) {
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-ust">
      <div>
        <img src="${u}../assets/logo/marka-yatay-optik.png" alt="TasarımMania" width="435" height="163" loading="lazy">
        <p>Web, mobil, reklam, video ve SEO’yu tek çatı altında birleştiren
          İstanbul merkezli 360 derece dijital ajans.</p>
      </div>
      <div>
        <h5>Modüller</h5>
        <ul>
          <li><a href="${u}hizmetler/">Tüm hizmetler</a></li>
          <li><a href="${u}hizmetler/web-tasarim-yazilim/">Web &amp; Yazılım</a></li>
          <li><a href="${u}hizmetler/mobil-uygulama/">Mobil Uygulama</a></li>
          <li><a href="${u}hizmetler/dijital-pazarlama/">Dijital Pazarlama</a></li>
          <li><a href="${u}hizmetler/video-produksiyon/">Video Prodüksiyon</a></li>
          <li><a href="${u}hizmetler/seo/">SEO Hizmetleri</a></li>
          <li><a href="${u}hizmetler/grafik-tasarim/">Grafik Tasarım</a></li>
        </ul>
      </div>
      <div>
        <h5>İletişim</h5>
        <ul>
          <li><a href="tel:+905547916545">0554 791 65 45</a></li>
          <li><a href="https://wa.me/905547916545" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="${u}iletisim/#ofis">Zeytinlik Mah. Pancar Sk.<br>No:19-11 Bakırköy / İstanbul</a></li>
          <li><a href="${u}iletisim/#ofis">Hafta içi 09:00–19:00<br>Cumartesi 10:00–16:00</a></li>
        </ul>
      </div>
    </div>
    <div class="ftr-alt">
      <span>© <span id="yil">2026</span> TasarımMania. Tüm hakları saklıdır.</span>
      <span class="mono">BEŞ MODÜL · TEK PANEL</span>
    </div>
  </div>
</footer>

<a class="wa" href="https://wa.me/905547916545" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">
  <svg viewBox="0 0 24 24"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.34-.52.05-1.01.24-3.4-.7-2.87-1.13-4.7-4.06-4.84-4.25-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36l.55.01c.18 0 .42-.07.65.5.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.1.19-.15.3-.29.47l-.44.51c-.14.14-.29.3-.12.58.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.29.14.45.12.62-.07.16-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.09 1.66.78 1.94.92.29.14.48.22.55.34.07.12.07.68-.16 1.32z"/></svg>
</a>

<script src="${u}js/tm.js" defer></script>
<script>
"use strict";
document.getElementById('yil').textContent = new Date().getFullYear();
</scr` + `ipt>
</body>
</html>`;
}

const YAZI_CSS = `
/* --- blog yazısı: okuma düzeni --- */
.yz-ust{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px}
.yz-kat{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--acc);border:1px solid rgba(var(--acc-rgb),.4);border-radius:99px;padding:6px 13px}
.yz-meta{font-family:var(--mono);font-size:11.4px;color:var(--muted)}
.phd h1{font-size:clamp(28px,4.4vw,46px);letter-spacing:-.035em;line-height:1.16;margin-bottom:16px;max-width:22ch}
.phd .ozet{color:var(--fg-dim);font-size:clamp(15.5px,1.8vw,18px);max-width:62ch;line-height:1.78}
.yz-govde{max-width:760px}
.yz-govde h2{font-size:clamp(21px,2.9vw,28px);letter-spacing:-.03em;line-height:1.25;margin:44px 0 0}
.yz-govde h3{font-size:clamp(17px,2.1vw,20px);letter-spacing:-.02em;line-height:1.35;margin:30px 0 10px}
.yz-govde h4{font-size:15.6px;letter-spacing:-.01em;margin:22px 0 8px;color:var(--fg-dim)}
.yz-govde p{font-size:15.6px;color:var(--fg-dim);line-height:1.85;margin:0 0 16px}
.yz-govde ul,.yz-govde ol{margin:0 0 18px;padding-left:0;list-style:none;display:grid;gap:10px}
.yz-govde li{font-size:15.2px;color:var(--fg-dim);line-height:1.72;display:flex;gap:11px;align-items:flex-start}
.yz-govde li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--acc);flex:none;margin-top:10px}
.yz-govde ol{counter-reset:s}
.yz-govde ol li{counter-increment:s}
.yz-govde ol li::before{content:counter(s);width:auto;height:auto;border-radius:0;background:none;
  color:var(--acc);font-family:var(--mono);font-size:12px;margin-top:2px;min-width:16px}
.yz-govde strong{color:var(--fg);font-weight:600}
.yz-govde p a{padding-block:4px}
.yz-govde a:not(.btn){color:var(--acc);text-decoration:underline;text-underline-offset:3px;
  text-decoration-color:rgba(var(--acc-rgb),.4);transition:text-decoration-color .25s;padding-block:2px}
.yz-govde a:not(.btn):hover{text-decoration-color:var(--acc)}
/* doğrudan cevap kutusu (snippet hedefi) */
.yz-cevap{border-left:2px solid var(--acc);background:rgba(var(--acc-rgb),.05);
  border-radius:0 var(--r-md) var(--r-md) 0;padding:16px 20px;margin:16px 0 22px}
.yz-cevap p{margin:0;color:var(--fg);font-size:15.4px;line-height:1.75}
/* karşılaştırma tablosu */
.yz-tablo{margin:26px 0;border:1px solid var(--hair);border-radius:var(--r-md);overflow-x:auto}
.yz-tablo table{width:100%;border-collapse:collapse;min-width:520px}
.yz-tablo th{font-family:var(--mono);font-size:10.4px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--acc);text-align:left;padding:14px 16px;border-bottom:1px solid var(--hair);
  background:rgba(var(--acc-rgb),.05);font-weight:500;white-space:nowrap}
.yz-tablo td{font-size:13.8px;color:var(--fg-dim);padding:14px 16px;border-bottom:1px solid var(--hair);
  line-height:1.6;vertical-align:top}
.yz-tablo tr:last-child td{border-bottom:0}
.yz-tablo td:first-child{color:var(--fg);font-weight:600}
.yz-tablo-not{font-family:var(--mono);font-size:10.4px;color:var(--muted);margin:-16px 0 26px;
  letter-spacing:.04em}
/* SSS */
.yz-sss{display:grid;gap:11px;max-width:760px}
.yz-sss details{border:1px solid var(--hair);border-radius:var(--r-md);background:var(--panel);transition:border-color .3s}
.yz-sss details[open]{border-color:var(--hair-strong)}
.yz-sss summary{cursor:pointer;list-style:none;padding:17px 21px;font-size:15.2px;font-weight:600;
  display:flex;align-items:center;gap:14px;line-height:1.4}
.yz-sss summary::-webkit-details-marker{display:none}
.yz-sss summary::after{content:"";width:9px;height:9px;margin-left:auto;flex:none;
  border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);
  transform:rotate(45deg) translateY(-2px);transition:transform .3s var(--ease)}
.yz-sss details[open] summary::after{transform:rotate(-135deg) translateY(-2px)}
.yz-sss summary:hover{color:var(--acc)}
.yz-sss p{padding:0 21px 19px;margin:0;font-size:14.4px;color:var(--muted);line-height:1.75}
/* hizmet köprüsü */
.yz-kopru{border:1px solid rgba(var(--acc-rgb),.32);border-radius:var(--r-lg);
  background:linear-gradient(150deg,rgba(var(--acc-rgb),.07),transparent);
  padding:clamp(22px,3vw,32px);margin:36px 0;max-width:760px}
.yz-kopru b{display:block;font-size:clamp(17px,2.2vw,21px);letter-spacing:-.02em;margin-bottom:9px}
.yz-kopru p{font-size:14.6px;color:var(--fg-dim);line-height:1.72;margin:0 0 18px}
.yz-kopru .btn{margin-right:10px}
/* okuma ilerlemesi */
.yz-cizgi{position:fixed;top:0;left:0;height:2px;background:var(--acc);z-index:101;width:0;
  transition:width .1s linear}
@media(max-width:760px){.yz-govde h2{margin-top:34px}}
@media(prefers-reduced-motion:reduce){.yz-cizgi{display:none}}
/* --- 1.2 eklentileri --- */
.yz-kapak{margin:0 0 clamp(26px,4vw,44px)}
.yz-kapak img,.yz-gorsel img{width:100%;height:auto;display:block;border-radius:14px;
  border:1px solid var(--hair);background:#0d1017}
.yz-kapak figcaption,.yz-gorsel figcaption{margin-top:11px;font-size:13.2px;line-height:1.55;
  color:var(--muted);max-width:760px}
.yz-gorsel{margin:clamp(26px,4vw,38px) 0}
.yz-ai{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;
  color:var(--fg-dim);opacity:.72;white-space:nowrap}
.yz-govde ol{margin:16px 0 20px;padding-left:22px;display:grid;gap:10px}
.yz-govde ol li{padding-left:4px}
.yz-govde ol li::marker{color:var(--acc);font-family:var(--mono);font-weight:600}
.yz-alinti{margin:24px 0;padding:18px 22px;border-left:3px solid var(--acc);
  background:rgba(var(--acc-rgb),.05);border-radius:0 12px 12px 0}
.yz-alinti p{margin:0 0 8px;font-size:16.5px;line-height:1.65;font-style:italic}
.yz-alinti cite{font-size:12.8px;color:var(--muted);font-style:normal;font-family:var(--mono)}`;

/* Görsel URL kökü — GitHub Pages mutlak adres (og:image mutlak olmalı) */
const G_KOK = 'https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept/site/blog/';

/* 1.2: gövdeden görünür metni çıkarıp kelime sayan yardımcı (wordCount şema alanı için) */
function kelimeSay(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ')
    .split(/\s+/).filter((w) => /[\wçğıöşüÇĞİÖŞÜ]/.test(w)).length;
}

function yaziUret(cfg) {
  const u = '../../';
  const dal = KAT_DAL[cfg.kategori] || 'web';
  const y = cfg.yazi;
  const tarih = cfg.tarih;
  const tarihTR = new Date(tarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  let govde = '';
  y.bolumler.forEach((b, bi) => {
    govde += `      <h2>${b.h2}</h2>\n`;
    govde += `      <div class="yz-cevap"><p>${b.dogrudanCevap}</p></div>\n`;
    govde += '      ' + b.govde.replace(/\n/g, '\n      ') + '\n';
    (b.altBaslikar || []).forEach((a) => {
      govde += `      <${a.seviye}>${a.baslik}</${a.seviye}>\n`;
      govde += '      ' + a.metin.replace(/\n/g, '\n      ') + '\n';
    });
    /* 1.2 M72: kaynaklı alıntı — belirtilen bölümün sonuna (varsayılan 4. bölüm) */
    if (y.alinti && bi === (y.alintiKonum != null ? y.alintiKonum : 3)) {
      govde += `      <blockquote class="yz-alinti"><p>&#8220;${y.alinti.metin}&#8221;</p><cite>— ${y.alinti.kaynak}</cite></blockquote>\n`;
    }
  });

  /* 1.2 M36-41: gövde görseli — tablodan önce */
  const gv = cfg.gorsel && cfg.gorsel.govde;
  const govdeFigur = gv ? `      <figure class="yz-gorsel">
        <img src="./gorsel/${gv.slug}-960.webp"
             srcset="./gorsel/${gv.slug}-640.webp 640w, ./gorsel/${gv.slug}-960.webp 960w, ./gorsel/${gv.slug}-1440.webp 1440w, ./gorsel/${gv.slug}-1920.webp 1920w"
             sizes="(max-width: 760px) 100vw, 760px"
             alt="${gv.alt}" width="1920" height="1080" loading="lazy" decoding="async">
        <figcaption>${gv.altyazi} <span class="yz-ai">Görsel yapay zekâ ile üretildi.</span></figcaption>
      </figure>\n` : '';

  /* karşılaştırma tablosu (M51: colspan/rowspan YASAK — düz hücreler) */
  const t = y.karsilastirmaTablosu;
  let tablo = govdeFigur + `      <h2>${t.baslik}</h2>\n      <div class="yz-tablo">\n        <table>\n          <thead><tr>` +
    t.sutunlar.map((s) => `<th>${s}</th>`).join('') + `</tr></thead>\n          <tbody>\n` +
    t.satirlar.map((r) => '            <tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('\n') +
    `\n          </tbody>\n        </table>\n      </div>\n`;

  const sssHtml = y.sss.map((s) =>
    `        <details>\n          <summary>${s.soru}</summary>\n          <p>${s.cevap}</p>\n        </details>`
  ).join('\n');

  const sssSema = y.sss.map((s) =>
    `    { "@type": "Question", "name": ${JSON.stringify(s.soru)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(s.cevap)} } }`
  ).join(',\n');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- KONSEPT-NOINDEX -->
<meta name="robots" content="noindex,nofollow">
<title>${y.metaBaslik}</title>
<meta name="description" content="${y.metaAciklama}">
<link rel="canonical" href="https://www.tasarimmania.com/blog/${cfg.slug}/">
<meta property="og:type" content="article">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="TasarımMania">
<meta property="og:title" content="${y.metaBaslik}">
<meta property="og:description" content="${y.metaAciklama}">
<meta property="og:url" content="https://www.tasarimmania.com/blog/${cfg.slug}/">
<meta property="og:image" content="${G_KOK}${cfg.slug}/gorsel/${cfg.gorsel.kapak.slug}-1440.jpg">
<meta property="og:image:width" content="1440">
<meta property="og:image:height" content="810">
<meta property="og:image:alt" content="${cfg.gorsel.kapak.alt}">
<meta property="article:published_time" content="${tarih}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${G_KOK}${cfg.slug}/gorsel/${cfg.gorsel.kapak.slug}-1440.jpg">
<link rel="icon" type="image/png" href="${u}../assets/logo/marka-daire.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${u}css/tm.css">
<style>${ORTAK_CSS}${YAZI_CSS}</style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.tasarimmania.com/blog/${cfg.slug}/#article",
      "headline": ${JSON.stringify(y.h1)},
      "description": ${JSON.stringify(y.metaAciklama)},
      "datePublished": "${tarih}",
      "dateModified": "${tarih}",
      "inLanguage": "tr-TR",
      "mainEntityOfPage": "https://www.tasarimmania.com/blog/${cfg.slug}/",
      "author": { "@type": "Organization", "name": "TasarımMania", "url": "https://www.tasarimmania.com/" },
      "publisher": { "@id": "https://www.tasarimmania.com/#kurulus" },
      "articleSection": ${JSON.stringify(cfg.kategori)},
      "wordCount": ${kelimeSay(govde + tablo)},
      "image": {
        "@type": "ImageObject",
        "url": "${G_KOK}${cfg.slug}/gorsel/${cfg.gorsel.kapak.slug}-1440.jpg",
        "width": 1440, "height": 810,
        "caption": ${JSON.stringify(cfg.gorsel.kapak.alt)}
      },
      "about": ${JSON.stringify(y.about || [])},
      "mentions": ${JSON.stringify((y.mentions || []).map((m) => ({ '@type': 'Thing', name: m })))},
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".ozet", ".yz-cevap"] }
    },
    {
      "@type": "Organization",
      "@id": "https://www.tasarimmania.com/#kurulus",
      "name": "TasarımMania",
      "url": "https://www.tasarimmania.com/",
      "telephone": "+905547916545",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept/assets/logo/marka-yatay-optik.png",
        "width": 435, "height": 163
      },
      "address": { "@type": "PostalAddress", "streetAddress": "Zeytinlik Mah. Pancar Sk. No:19-11",
        "addressLocality": "Bakırköy", "addressRegion": "İstanbul", "addressCountry": "TR" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.tasarimmania.com/blog/${cfg.slug}/#sss",
      "mainEntity": [
${sssSema}
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana sayfa", "item": "https://www.tasarimmania.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.tasarimmania.com/blog/" },
        { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(y.h1)}, "item": "https://www.tasarimmania.com/blog/${cfg.slug}/" }
      ]
    }
  ]
}
</script>
</head>
<body data-dal="${dal}">

<i class="yz-cizgi" data-ilerleme aria-hidden="true"></i>
<a class="skip" href="#ana">İçeriğe geç</a>

${nav(u, 'blog')}

<!-- AYIRT EDİCİ EKSEN: ${cfg.eksen || 'TANIMSIZ'} — ${cfg.eksenAciklama || ''}
     Huni türü: ${cfg.huni || '?'} · Küme: ${cfg.kume || '?'} · Kardeşler (enjeksiyon turunda): ${(cfg.kardesler || []).join(', ')} -->
<main id="ana">

  <header class="phd">
    <div class="wrap">
      <nav class="crumb" aria-label="Konum">
        <a href="${u}">Ana sayfa</a><span aria-hidden="true">/</span>
        <a href="${u}blog/">Blog</a><span aria-hidden="true">/</span>
        <span>${cfg.kisaBaslik}</span>
      </nav>
      <div class="yz-ust">
        <span class="yz-kat">${cfg.kategori}</span>
        <span class="yz-meta">${tarihTR} · ${cfg.okumaDk} dakikalık okuma</span>
      </div>
      <h1>${y.h1}</h1>
      <p class="ozet">${y.girisParagraf}</p>
    </div>
  </header>

  <figure class="yz-kapak">
    <div class="wrap">
      <img src="./gorsel/${cfg.gorsel.kapak.slug}-1440.webp"
           srcset="./gorsel/${cfg.gorsel.kapak.slug}-640.webp 640w, ./gorsel/${cfg.gorsel.kapak.slug}-960.webp 960w, ./gorsel/${cfg.gorsel.kapak.slug}-1440.webp 1440w, ./gorsel/${cfg.gorsel.kapak.slug}-1920.webp 1920w"
           sizes="(max-width: 1200px) 100vw, 1160px"
           alt="${cfg.gorsel.kapak.alt}"
           width="1920" height="1080" fetchpriority="high" decoding="async">
      <figcaption>${cfg.gorsel.kapak.altyazi} <span class="yz-ai">Görsel yapay zekâ ile üretildi.</span></figcaption>
    </div>
  </figure>

  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <article class="yz-govde">
${govde}${tablo}
        <div class="yz-kopru">
          <b>${cfg.kopruBaslik}</b>
          <p>${cfg.kopruMetin}</p>
          <a class="btn btn-p" href="${u}teklif/${cfg.teklifHash}">Kapsam çıkaralım
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          <a class="btn btn-g" href="${u}${cfg.hizmetSayfasi.replace(/^\//, '')}">Hizmet sayfasını gör</a>
        </div>
        <p>${y.kapanis}</p>
      </article>
    </div>
  </section>

  <section class="sec" id="sss" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <span class="eyebrow"><i></i>Sık sorulanlar</span>
        <h2 data-kin>${cfg.sssBaslik}</h2>
      </div>
      <div class="yz-sss rv d1">
${sssHtml}
      </div>
    </div>
  </section>

</main>

${footer(u)}
<script>
"use strict";
(function(){
  var c = document.querySelector('[data-ilerleme]');
  if (!c || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  function ciz(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    c.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', ciz, { passive: true });
  ciz();
})();
</scr` + `ipt>
`;
}

module.exports = { yaziUret, ORTAK_CSS, YAZI_CSS, nav, footer, SITE, KOK, KAT_DAL };

if (require.main === module) {
  const cfgYol = process.argv[2];
  if (!cfgYol) { console.log('kullanım: node blog-uret.js <config.json>'); process.exit(1); }
  const cfg = JSON.parse(fs.readFileSync(cfgYol, 'utf8'));
  const html = yaziUret(cfg);
  const dir = path.join(SITE, 'blog', cfg.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log('yazıldı: site/blog/' + cfg.slug + '/index.html (' + html.length + ' karakter)');
}
