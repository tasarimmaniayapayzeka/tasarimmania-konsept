/* BLOG DETAY v3 — KULLANICININ VERDİĞİ styles.css BİREBİR
 *
 * Kaynak: kullanıcının yapıştırdığı üretim betiğindeki css değişkeni
 * (7 Eyl 2026). İçerik AYNEN alındı; tek ekleme en alttaki "SİTEYE
 * BAĞLAMA" bloğu (sabit üst menü payı + içerik bağlantı rengi) — onlar
 * da şablonun kendi jetonlarını kullanıyor.
 */
module.exports = `
:root{
  --bg:#090d11;
  --bg-2:#0c1116;
  --panel:#0f151a;
  --panel-2:#11181e;
  --panel-3:#0d1318;
  --text:#f4f7f8;
  --body:#c4cdd4;
  --muted:#8e9aa4;
  --line:rgba(255,255,255,.07);
  --line-strong:rgba(255,255,255,.12);
  --green:#9afc54;
  --green-2:#6fe62e;
  --green-soft:rgba(154,252,84,.08);
  --green-border:rgba(154,252,84,.22);
  --radius:16px;
  --radius-lg:22px;
  --shadow:0 18px 60px rgba(0,0,0,.22);
}

*{box-sizing:border-box}

html{scroll-behavior:smooth}

body{
  margin:0;
  font-family:"Manrope",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  background:
    radial-gradient(circle at 75% 8%, rgba(88,180,43,.08), transparent 24%),
    linear-gradient(180deg,#080c10 0%,#0a0f13 100%);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
}

a{color:inherit;text-decoration:none}
button,input,summary{font:inherit}

.container{
  width:min(1180px,calc(100% - 40px));
  margin-inline:auto;
}

.btn{
  min-height:48px;
  padding:0 20px;
  border-radius:12px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  font-weight:800;
  border:1px solid transparent;
  transition:.22s ease;
  white-space:nowrap;
}

.btn:hover{transform:translateY(-1px)}
.btn-primary{
  background:linear-gradient(180deg,#a8ff67,#8af046);
  color:#081006;
  box-shadow:0 8px 30px rgba(133,248,69,.12);
}
.btn-primary:hover{box-shadow:0 10px 36px rgba(133,248,69,.2)}
.btn-ghost{
  border-color:var(--line-strong);
  color:#dbe2e7;
  background:rgba(255,255,255,.015);
}
.btn-small{min-height:42px;padding-inline:16px;font-size:13px}

.hero{
  border-bottom:1px solid var(--line);
}

.hero-grid{
  display:grid;
  grid-template-columns:minmax(0,1.02fr) minmax(460px,.98fr);
  gap:48px;
  align-items:center;
  padding-block:54px 38px;
}

.eyebrow-row{
  display:flex;
  align-items:center;
  gap:14px;
  margin-bottom:18px;
}

.pill,
.section-index,
.tag{
  border:1px solid var(--green-border);
  background:var(--green-soft);
  color:var(--green);
  border-radius:999px;
  font-weight:800;
}

.pill{
  padding:7px 11px;
  font-size:12px;
}

.eyebrow-note{
  color:var(--muted);
  font-size:13px;
}

h1,h2,h3,h4,p{margin-top:0}
h1{
  margin-bottom:18px;
  max-width:760px;
  font-size:clamp(42px,4.25vw,60px);
  line-height:1.04;
  letter-spacing:-.045em;
}
h1 span{color:var(--green)}

.lead{
  max-width:66ch;
  color:var(--body);
  font-size:16.5px;
  line-height:1.72;
  margin-bottom:24px;
}

.hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:26px}

.metrics{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:0;
  border-top:1px solid var(--line);
  padding-top:18px;
}
.metric{padding-right:14px}
.metric + .metric{
  padding-left:16px;
  border-left:1px solid var(--line);
}
.metric strong{
  display:block;
  color:var(--green);
  font-size:20px;
  margin-bottom:4px;
}
.metric span{
  color:var(--muted);
  font-size:11.5px;
}

.hero-visual{
  position:relative;
  min-height:430px;
  display:grid;
  align-items:center;
}

.browser-card,
.visual-card,
.traffic-card,
.benefit-card,
.mini-cta,
.cta-panel{
  border:1px solid var(--line);
  background:linear-gradient(180deg,rgba(18,25,31,.92),rgba(12,18,23,.92));
  box-shadow:var(--shadow);
}

.browser-card{
  border-radius:18px;
  padding:15px;
}

.browser-top{
  height:30px;
  display:flex;
  align-items:center;
  gap:6px;
  padding-inline:2px;
}
.browser-top > span{
  width:7px;height:7px;border-radius:50%;
  background:#58636b;
}
.browser-top > span:nth-child(2){background:var(--green)}
.address-bar{
  height:8px;
  width:55%;
  border-radius:999px;
  background:rgba(255,255,255,.05);
  margin-left:10px;
}

.product-demo{
  display:grid;
  grid-template-columns:42px 1.15fr .9fr;
  gap:12px;
  align-items:stretch;
}

.gallery{display:grid;gap:8px}
.thumb{
  border-radius:8px;
  background:
    radial-gradient(circle at 45% 42%,#dfe4e7 0 18%,transparent 19%),
    #151d23;
  border:1px solid var(--line);
}
.thumb.active{border-color:var(--green)}

.product-shot{
  min-height:260px;
  border-radius:12px;
  background:linear-gradient(180deg,#f6f7f7,#d9dfe1);
  display:grid;
  place-items:center;
  overflow:hidden;
}

.shoe{
  position:relative;
  width:76%;
  height:44%;
}
.shoe-body{
  position:absolute;
  left:14%; right:8%; top:9%; bottom:22%;
  background:linear-gradient(160deg,#f7f8f8,#cfd4d7);
  border-radius:54% 42% 26% 34% / 65% 62% 28% 24%;
  transform:skewX(-8deg) rotate(-4deg);
  box-shadow:inset -18px -10px 28px rgba(50,60,67,.12);
}
.shoe-body:before{
  content:"";
  position:absolute;
  width:44%;
  height:62%;
  left:-7%;
  top:8%;
  background:linear-gradient(180deg,#edf0f1,#ccd2d5);
  clip-path:polygon(25% 0,100% 10%,82% 100%,0 77%);
}
.shoe-sole{
  position:absolute;
  left:8%;right:4%;bottom:13%;
  height:24%;
  border-radius:40px 20px 28px 34px;
  background:linear-gradient(180deg,#d5dadc,#aab2b7);
  transform:skewX(-8deg);
}
.shoe-laces{
  position:absolute;
  width:30%;
  height:8%;
  top:25%;
  left:42%;
  border-top:2px solid #a9b1b6;
  border-bottom:2px solid #a9b1b6;
  transform:rotate(-7deg);
}

.product-info{
  border-radius:12px;
  background:#0b1116;
  padding:18px;
  border:1px solid var(--line);
}
.mini-label{color:var(--green);font-size:10px;font-weight:800;text-transform:uppercase}
.product-info h3{font-size:18px;margin:8px 0 6px}
.product-info p{color:var(--muted);font-size:12px;line-height:1.55}
.stars{color:#ffc94c;font-size:12px;margin:14px 0}
.stars span{color:var(--muted);margin-left:5px}
.price{font-size:22px;font-weight:800;margin-bottom:14px}
.product-info button{
  width:100%;
  border:0;
  border-radius:9px;
  padding:12px;
  background:var(--green);
  color:#071006;
  font-weight:800;
}

.traffic-card{
  position:absolute;
  right:-18px;
  top:18px;
  width:238px;
  min-height:135px;
  border-radius:15px;
  padding:16px;
  display:grid;
  grid-template-columns:.7fr 1.3fr;
  gap:10px;
  align-items:end;
}
.traffic-card small,.traffic-card span{display:block;color:var(--muted)}
.traffic-card strong{display:block;font-size:27px;margin:4px 0}
.traffic-card svg{width:100%;height:86px}
.traffic-card polyline{
  fill:none;
  stroke:var(--green);
  stroke-width:3;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.benefit-card{
  position:absolute;
  right:-32px;
  bottom:-2px;
  width:220px;
  border-radius:15px;
  padding:16px;
}
.benefit-card h4{font-size:13px;line-height:1.45;margin-bottom:12px}

.section{
  padding-block:24px;
  border-bottom:1px solid var(--line);
}

.soft-section{
  background:linear-gradient(180deg,rgba(255,255,255,.008),rgba(255,255,255,0));
}

.split{
  display:grid;
  grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);
  gap:38px;
  align-items:center;
}

.content{min-width:0}
.section-title{
  display:flex;
  align-items:flex-start;
  gap:12px;
  margin-bottom:14px;
}
.section-index{
  min-width:40px;
  padding:6px 9px;
  text-align:center;
  font-size:11px;
  line-height:1;
}
h2{
  margin-bottom:0;
  font-size:clamp(25px,2.6vw,34px);
  line-height:1.13;
  letter-spacing:-.03em;
}
h3{
  margin:20px 0 8px;
  font-size:18px;
  letter-spacing:-.02em;
}

.content > p,
.faq-intro p{
  color:var(--body);
  line-height:1.7;
  font-size:15px;
  max-width:68ch;
}

.note{
  margin:15px 0 16px;
  padding:14px 16px;
  background:rgba(154,252,84,.035);
  border-left:2px solid var(--green);
  color:#d7e3d0;
  line-height:1.62;
  font-size:14px;
}

.check-list{
  list-style:none;
  margin:15px 0 0;
  padding:0;
  display:grid;
  gap:8px;
  color:#d8e0e5;
  font-size:14px;
}
.check-list li{
  position:relative;
  padding-left:25px;
}
.check-list li:before{
  content:"✓";
  position:absolute;
  left:0;
  top:1px;
  display:grid;
  place-items:center;
  width:17px;height:17px;
  border-radius:50%;
  background:var(--green);
  color:#071006;
  font-size:11px;
  font-weight:900;
}
.check-list.compact{gap:6px;font-size:12px}
.check-list.compact li{padding-left:22px}

.visual-card{
  min-height:320px;
  border-radius:var(--radius);
  padding:20px;
  overflow:hidden;
}

.mock-window{
  height:100%;
  min-height:278px;
  border:1px solid var(--line);
  background:#0a1015;
  border-radius:13px;
  display:grid;
  grid-template-columns:56px 1fr;
  padding:14px;
  gap:14px;
}
.mock-sidebar{display:grid;grid-template-rows:repeat(4,1fr);gap:9px}
.mock-sidebar span{border-radius:8px;background:#151e25;border:1px solid var(--line)}
.mock-main{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.mock-image{
  border-radius:12px;
  background:
    radial-gradient(circle at 50% 40%,#e8ecee 0 24%,transparent 25%),
    linear-gradient(180deg,#f3f5f5,#d9dfe1);
}
.mock-copy{padding-top:12px}
.mock-copy i{display:block;height:9px;border-radius:999px;background:#354149;margin-bottom:10px}
.mock-copy i:nth-child(2){width:78%}
.mock-copy i:nth-child(3){width:58%}
.mock-stars{color:#ffc94c;margin:18px 0}
.mock-copy button{
  border:0;background:var(--green);font-weight:800;
  padding:10px 15px;border-radius:8px;
}

.chart-card{padding:22px}
.chart-head{display:flex;justify-content:space-between;align-items:flex-start}
.chart-head small{color:var(--muted);display:block}
.chart-head strong{display:block;font-size:30px;margin-top:4px}
.tag{font-size:10px;padding:6px 9px}
.line-chart{margin-top:10px}
.line-chart svg{width:100%;height:auto}
.line-chart line{stroke:rgba(255,255,255,.07)}
.line-chart polyline{
  fill:none;stroke:var(--green);stroke-width:4;
  stroke-linecap:round;stroke-linejoin:round;
}
.months{display:flex;justify-content:space-between;color:var(--muted);font-size:10px}

.search-card{
  display:grid;
  gap:10px;
  align-content:start;
  background:
    radial-gradient(circle at 85% 10%,rgba(154,252,84,.05),transparent 30%),
    var(--panel);
}
.search-bar{
  height:42px;border:1px solid var(--line);border-radius:10px;
  display:flex;align-items:center;gap:10px;color:var(--muted);padding:0 12px;
}
.search-result{
  min-height:74px;border-radius:10px;border:1px solid var(--line);
  background:#0b1116;
}
.search-result.active{
  border-color:var(--green-border);
  display:grid;grid-template-columns:88px 1fr;gap:14px;padding:10px;
}
.result-thumb{
  border-radius:8px;
  background:linear-gradient(180deg,#f5f6f6,#d8dddf);
}
.result-copy{display:flex;flex-direction:column;justify-content:center;gap:5px}
.result-copy span{color:#ffc94c;font-size:11px}
.result-copy b{font-size:13px}
.search-result.ghost{
  opacity:.28;
  background:linear-gradient(90deg,#111a21 22%,#0c1217 22% 100%);
}

.sitemap-card{
  position:relative;
  display:grid;
  place-items:center;
  align-content:center;
  gap:16px;
}
.node{
  border:1px solid var(--green-border);
  background:rgba(154,252,84,.05);
  color:#dff2d3;
  border-radius:9px;
  padding:10px 16px;
  font-size:12px;
  text-align:center;
}
.node-home{
  background:var(--green);
  color:#071006;
  font-weight:800;
  min-width:118px;
}
.node-row{width:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.mini-group{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.mini-group span{
  border:1px solid var(--line);
  border-radius:7px;padding:8px 4px;text-align:center;color:var(--muted);font-size:10px
}
.branch-line{
  width:67%;
  height:1px;
  background:linear-gradient(90deg,transparent,var(--green-border),transparent);
}

.signal-card{display:grid;align-content:center;gap:13px}
.signal-head{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.g{
  width:36px;height:36px;border-radius:50%;display:grid;place-items:center;
  background:#fff;color:#0b1116;font-weight:900;font-size:21px
}
.bar-item{
  display:grid;
  grid-template-columns:150px 1fr 38px;
  align-items:center;
  gap:10px;
  color:var(--body);
  font-size:12px;
}
.bar-item i{
  height:8px;border-radius:999px;background:rgba(255,255,255,.06);position:relative;overflow:hidden
}
.bar-item i:after{
  content:"";position:absolute;inset:0 auto 0 0;width:var(--w);
  background:linear-gradient(90deg,#74da37,var(--green));border-radius:inherit
}
.bar-item b{color:#dfe7eb;text-align:right}

.score-card{
  display:grid;
  grid-template-columns:1fr .8fr;
  gap:24px;
  align-items:center;
}
.score-ring{
  width:180px;height:180px;border-radius:50%;
  background:conic-gradient(var(--green) 0 331deg, rgba(255,255,255,.08) 331deg);
  display:grid;place-items:center;margin:auto;
}
.score-ring:before{
  content:"";position:absolute;
}
.score-inner{
  width:142px;height:142px;border-radius:50%;
  background:#0e151a;display:grid;place-items:center;align-content:center;
}
.score-inner strong{font-size:43px}
.score-inner span{color:var(--muted);font-size:12px}
.score-list{display:grid;gap:14px;color:#d4dce1;font-size:13px}
.score-list span::first-letter{color:var(--green)}

.comparison-section{padding-top:28px}
.table-wrap{
  margin-top:18px;
  overflow:auto;
  border:1px solid var(--line);
  border-radius:14px;
}
table{
  width:100%;
  border-collapse:collapse;
  min-width:760px;
  background:rgba(255,255,255,.012);
}
th,td{
  padding:14px 16px;
  text-align:left;
  border-bottom:1px solid var(--line);
  color:var(--body);
  font-size:13px;
}
th{
  color:#eaf4e3;
  background:rgba(154,252,84,.045);
}
th:nth-child(2),th:nth-child(3){color:var(--green)}
tr:last-child td{border-bottom:0}

.mini-cta{
  margin-top:18px;
  padding:20px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:28px;
  background:
    radial-gradient(circle at 90% 25%,rgba(154,252,84,.09),transparent 35%),
    linear-gradient(180deg,rgba(18,30,22,.55),rgba(12,18,23,.95));
}
.mini-cta small{color:var(--green);font-weight:700}
.mini-cta strong{display:block;font-size:20px;margin:4px 0}
.mini-cta p{margin:0;color:var(--muted);font-size:13px;max-width:70ch;line-height:1.55}

.section-kicker{
  color:var(--green);
  font-size:11px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:.08em;
}

.toc-head{margin-bottom:14px}
.toc-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px 12px;
}
.toc-grid a{
  min-height:48px;
  border:1px solid var(--line);
  border-radius:10px;
  display:flex;
  align-items:center;
  gap:12px;
  padding:0 14px;
  color:#d7dfe4;
  background:rgba(255,255,255,.01);
}
.toc-grid a:hover{border-color:var(--green-border)}
.toc-grid span{
  color:var(--green);
  font-size:11px;
  font-weight:800;
}

.faq-layout{
  display:grid;
  grid-template-columns:.42fr 1fr;
  gap:38px;
  align-items:start;
}
.faq-intro h2{margin:7px 0 10px}
.faq-list{display:grid;gap:8px}
details{
  border:1px solid var(--line);
  border-radius:10px;
  background:rgba(255,255,255,.012);
  overflow:hidden;
}
details[open]{background:rgba(154,252,84,.025);border-color:rgba(154,252,84,.13)}
summary{
  min-height:52px;
  cursor:pointer;
  list-style:none;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
  padding:0 15px;
  font-size:13px;
  font-weight:700;
}
summary::-webkit-details-marker{display:none}
summary:after{content:"+";font-size:22px;font-weight:400;color:#cbd4da}
details[open] summary:after{content:"–";color:var(--green)}
details p{
  color:var(--muted);
  font-size:13px;
  line-height:1.6;
  margin:0;
  padding:0 15px 15px;
}

.cta-section{padding-block:24px 30px}
.cta-panel{
  min-height:150px;
  padding:26px 28px;
  border-radius:18px;
  display:grid;
  grid-template-columns:64px 1fr auto;
  align-items:center;
  gap:20px;
  background:
    radial-gradient(circle at 85% 20%,rgba(154,252,84,.12),transparent 32%),
    linear-gradient(135deg,#0d1715,#0d1518);
  border-color:var(--green-border);
}
.cta-icon{
  width:54px;height:54px;border-radius:14px;
  display:grid;place-items:center;
  background:var(--green-soft);
  color:var(--green);
  font-size:25px;
  border:1px solid var(--green-border);
}
.cta-panel small{color:var(--green);font-weight:800}
.cta-panel h2{margin:4px 0 7px;font-size:28px}
.cta-panel p{margin:0;color:var(--muted);font-size:14px}

@media (max-width:1100px){
  .hero-grid{
    grid-template-columns:1fr 1fr;
    gap:30px;
  }
  .hero-visual{min-height:390px}
  .benefit-card{right:0}
  .traffic-card{right:0}
  .split{gap:26px}
  .score-card{grid-template-columns:1fr}
  .score-ring{width:160px;height:160px}
  .score-inner{width:126px;height:126px}
}

@media (max-width:900px){
  .hero-grid{
    grid-template-columns:1fr;
    padding-top:38px;
  }
  .hero-visual{min-height:auto;padding-top:8px}
  .traffic-card,.benefit-card{
    position:static;
    width:auto;
    margin-top:12px;
  }
  .traffic-card{grid-template-columns:1fr 1.2fr}
  .hero-visual{display:block}
  .split{grid-template-columns:1fr}
  .reverse-mobile .content{order:1}
  .reverse-mobile .visual-card{order:2}
  .visual-card{min-height:280px}
  .faq-layout{grid-template-columns:1fr}
  .toc-grid{grid-template-columns:1fr}
  .cta-panel{
    grid-template-columns:54px 1fr;
  }
  .cta-panel .btn{
    grid-column:1 / -1;
    width:100%;
  }
}

@media (max-width:680px){
  .container{width:min(100% - 32px,1180px)}
  .hero-grid{padding-block:30px 22px}
  .eyebrow-row{align-items:flex-start;flex-direction:column;gap:8px;margin-bottom:14px}
  h1{font-size:38px;line-height:1.06}
  .lead{font-size:15px;line-height:1.66}
  .hero-actions{display:grid;grid-template-columns:1fr}
  .hero-actions .btn{width:100%}
  .metrics{grid-template-columns:1fr 1fr;gap:16px 0}
  .metric:nth-child(3){padding-left:0;border-left:0}
  .metric:nth-child(3),.metric:nth-child(4){border-top:1px solid var(--line);padding-top:14px}
  .metric strong{font-size:19px}
  .product-demo{
    grid-template-columns:34px 1fr;
  }
  .product-info{
    grid-column:1 / -1;
  }
  .product-shot{min-height:210px}
  .section{padding-block:18px}
  .section-title{gap:10px}
  .section-index{min-width:36px}
  h2{font-size:26px}
  h3{font-size:17px}
  .content > p{font-size:14.5px}
  .visual-card{padding:16px;min-height:240px}
  .mock-window{
    grid-template-columns:42px 1fr;
    min-height:240px;
  }
  .mock-main{grid-template-columns:1fr}
  .mock-copy{display:none}
  .signal-card{gap:10px}
  .bar-item{
    grid-template-columns:110px 1fr 32px;
    font-size:10px;
  }
  .score-card{padding:22px}
  .mini-cta{
    align-items:flex-start;
    flex-direction:column;
  }
  .faq-list{gap:7px}
  summary{font-size:12.5px;min-height:50px}
  .cta-panel{
    grid-template-columns:1fr;
    padding:22px;
  }
  .cta-icon{width:48px;height:48px}
  .cta-panel h2{font-size:24px}
}

@media (max-width:440px){
  .container{width:min(100% - 28px,1180px)}
  h1{font-size:34px}
  .metrics{column-gap:0}
  .product-demo{grid-template-columns:30px 1fr}
  .visual-card{border-radius:14px}
  .node{padding-inline:8px}
  .node-row{gap:8px}
  .mini-group{grid-template-columns:1fr}
  .bar-item{grid-template-columns:95px 1fr 28px}
}

/* ═══ SİTEYE BAĞLAMA (şablon dışı tek blok) ═══
   1) Sitenin üst menüsü sabit (position:fixed, 74px); şablonun hero'su
      kendi sticky header'ına göre yazılmış. Menü payı verilmezse h1
      menünün altında kalır.
   2) Makale metnindeki iç bağlantılar şablonda tanımsızdı — şablonun
      yeşiliyle çizildi.
   3) Şablondaki .check-list ✓ dairesi ile eski .yz-govde li::before
      çakışmasın diye eski gövde sınıfları bu sayfada kullanılmıyor. */
main{padding-top:var(--nav-h,74px)}
.content a{color:var(--green);text-decoration:underline;text-underline-offset:3px}
.content a:hover{color:var(--green-2)}
.note small{display:block;margin-top:6px;color:var(--muted)}
`;
