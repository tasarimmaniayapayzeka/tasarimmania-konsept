/* BLOG DETAY TASARIM DİLİ v2 — kullanıcının verdiği referansa göre
 *
 * Referans: numaralı bölüm kartları, yuvarlak kenarlı koyu paneller,
 * yeşil vurgulu başlık, istatistik şeridi, arayüz maketleri (tarayıcı +
 * ürün kartı), yeşil daireli kontrol listesi, el yazısı açıklama.
 *
 * ⚠ HARİCİ KÜTÜPHANE YOK. Sitenin kuralı: 3D/grafik yalnız saf CSS,
 *   Canvas 2D ya da ham SVG ile. Maketler fotoğraf DEĞİL, çizim.
 *
 * ⚠ VURGU RENGİ UYDURULMADI. Referanstaki yeşil, sitenin SEO modülü
 *   rengi --lime (#A6FF00) ile aynı aileden. body[data-dal="seo"] zaten
 *   bu rengi veriyor; sabit kod yazılmadı, --acc üzerinden akıyor.
 *   Böylece aynı şablon mobil (mor), video (pembe), reklam (amber)
 *   yazılarında da kendi rengini alır.
 */
module.exports = `
/* ===== v2 TASARIM DİLİ ===== */

/* ⚠ İLK İŞ: OKUMA SÜTUNU SINIRINI KALDIR — ölçülmüş hata.
   Sayfanın kendi CSS'inde .yz-govde{max-width:760px} var. v2 kartları o
   kutunun içinde kalınca iki sütunlu ızgara sıkışıyordu:
       760 − 80 (kart dolgusu) = 680
       680 − 520 (maket) − 38 (boşluk) = 122  ← metin sütunu
   Tarayıcıda ölçüldü: metin 120px, maket 520px. Metin dikey bir şerite
   dönüşüyor, sayfa 16.862px'e uzuyordu. v2'de gövde tam genişlik olmalı;
   okuma ölçüsü kartın İÇİNDE, .bl-metin üzerinden sınırlanıyor. */
.yz-govde{max-width:none}
.bl{--bl-r:26px}
.bl-kart{position:relative;border:1px solid var(--hair);border-radius:var(--bl-r);
  background:linear-gradient(180deg,rgba(255,255,255,.028),rgba(255,255,255,.012));
  padding:clamp(22px,3vw,40px);margin:0 0 clamp(18px,2.4vw,26px);overflow:hidden;isolation:isolate}
.bl-kart::before{content:"";position:absolute;inset:-1px;border-radius:inherit;z-index:-1;
  background:radial-gradient(70% 100% at 12% 0%,rgba(var(--acc-rgb),.14),transparent 62%);opacity:.9}
.bl-no{display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:34px;
  border:1px solid rgba(var(--acc-rgb),.45);border-radius:99px;padding:0 15px;
  font-family:var(--mono);font-size:13px;font-weight:500;color:var(--acc);
  background:rgba(var(--acc-rgb),.07);margin-bottom:16px}
.bl-kart h2{font-size:clamp(22px,3vw,32px);letter-spacing:-.035em;line-height:1.2;margin:0 0 14px;max-width:20ch}
.bl-kart h2 em{font-style:normal;color:var(--acc)}
.bl-kart > p{font-size:clamp(14.6px,1.7vw,16px);color:var(--fg-dim);line-height:1.78;margin:0 0 18px;max-width:62ch}
.bl-kart h3{font-size:clamp(16px,2vw,19px);letter-spacing:-.02em;line-height:1.34;margin:26px 0 10px}
.bl-kart h4{font-size:15.2px;letter-spacing:-.01em;margin:20px 0 8px;color:var(--fg-dim)}
.bl-ic{display:grid;gap:clamp(22px,3vw,38px)}
@media(min-width:1000px){
  .bl-kart.ikili .bl-ic{grid-template-columns:minmax(0,1fr) minmax(0,520px);align-items:center}
  .bl-kart.ikili.ters .bl-ic > .bl-maket{order:-1}
}

/* --- istatistik şeridi --- */
.bl-ist{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap:clamp(14px,2vw,26px);margin:22px 0 4px}
.bl-ist > div{position:relative;padding-left:20px}
.bl-ist > div + div{border-left:1px solid var(--hair);padding-left:clamp(18px,2vw,26px)}
.bl-ist i{position:absolute;left:0;top:7px;width:10px;height:10px;border-radius:50%;
  border:1.5px solid rgba(var(--acc-rgb),.6);background:rgba(var(--acc-rgb),.12)}
.bl-ist b{display:block;font-size:clamp(19px,2.4vw,25px);color:var(--acc);letter-spacing:-.03em;line-height:1}
.bl-ist span{display:block;margin-top:7px;font-size:12.8px;color:var(--muted);line-height:1.5}
@media(max-width:640px){.bl-ist > div + div{border-left:0;padding-left:20px}}

/* --- yeşil daireli kontrol listesi --- */
.bl-cek{list-style:none;margin:20px 0 0;padding:0;display:grid;gap:12px}
.bl-cek li{display:flex;gap:13px;align-items:flex-start;font-size:14.6px;line-height:1.62;color:var(--fg-dim)}
.bl-cek li::before{content:"";flex:none;width:21px;height:21px;border-radius:50%;margin-top:1px;
  background:var(--acc);
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2a10 10 0 100 20 10 10 0 000-20zm-1.3 14.3l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2a10 10 0 100 20 10 10 0 000-20zm-1.3 14.3l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z'/%3E%3C/svg%3E") center/contain no-repeat}

/* --- maket ortak kabuk --- */
.bl-maket{position:relative;min-width:0}
.bl-maket figcaption{margin-top:12px;font-size:12.4px;line-height:1.6;color:var(--muted)}
.mk{position:relative;border:1px solid var(--hair-strong);border-radius:16px;overflow:hidden;
  background:linear-gradient(180deg,#12161F,#0C0F16);
  box-shadow:0 30px 70px -34px rgba(0,0,0,.95),0 0 40px -18px rgba(var(--acc-rgb),.3)}
.mk-bar{display:flex;align-items:center;gap:6px;padding:10px 13px;border-bottom:1px solid var(--hair)}
.mk-bar i{width:8px;height:8px;border-radius:50%;background:#39404F}
.mk-bar i:nth-child(1){background:#4A5262}
.mk-bar u{margin-left:9px;flex:1;height:9px;border-radius:99px;background:rgba(255,255,255,.06);text-decoration:none}
.mk-ic{padding:14px}

/* satır iskeletleri (metin yerine) */
.mk-satir{height:7px;border-radius:99px;background:rgba(255,255,255,.11)}
.mk-satir.k{width:58%}.mk-satir.o{width:76%}.mk-satir.u{width:92%}
.mk-satir.ac{background:rgba(var(--acc-rgb),.55)}

/* ürün ızgarası */
.mk-urunler{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:11px}
.mk-urun{border:1px solid var(--hair);border-radius:10px;background:rgba(255,255,255,.03);padding:8px}
.mk-gorsel{aspect-ratio:1;border-radius:7px;background:
  radial-gradient(60% 50% at 50% 38%,rgba(255,255,255,.16),transparent 70%),rgba(255,255,255,.05);
  display:grid;place-items:center}
.mk-gorsel svg{width:74%;height:74%;opacity:.85}
.mk-yildiz{display:flex;gap:2px;margin:8px 0 6px}
.mk-yildiz i{width:8px;height:8px;background:#FFC53D;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'/%3E%3C/svg%3E") center/contain no-repeat}
.mk-yildiz i.bos{background:rgba(255,255,255,.18)}
.mk-urun .mk-satir{margin-top:5px}

/* arama çubuğu */
.mk-arama{display:flex;align-items:center;gap:10px;margin-top:12px;padding:9px 9px 9px 13px;
  border:1px solid rgba(var(--acc-rgb),.4);border-radius:99px;background:rgba(var(--acc-rgb),.05)}
.mk-arama svg{width:14px;height:14px;flex:none;color:var(--muted)}
.mk-arama u{flex:1;text-decoration:none;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mk-arama b{flex:none;width:28px;height:28px;border-radius:50%;background:var(--acc);display:grid;place-items:center}
.mk-arama b svg{width:13px;height:13px;color:#06090D}

/* yüzen ölçüm kartı + grafik */
.mk-olcum{position:absolute;right:-6px;top:-14px;z-index:3;width:min(58%,232px);
  border:1px solid rgba(var(--acc-rgb),.45);border-radius:13px;padding:11px 13px;
  background:rgba(9,12,17,.94);backdrop-filter:blur(8px);
  box-shadow:0 20px 44px -20px rgba(0,0,0,.95),0 0 26px -10px rgba(var(--acc-rgb),.45)}
.mk-olcum u{display:block;text-decoration:none;font-size:11px;color:var(--fg-dim);letter-spacing:-.01em}
.mk-olcum b{display:block;font-size:clamp(19px,2.6vw,25px);color:var(--acc);letter-spacing:-.035em;line-height:1.15;margin-top:3px}
.mk-olcum span{display:block;font-size:10.4px;color:var(--muted);margin-top:1px}
.mk-olcum svg{display:block;width:100%;height:38px;margin-top:7px;overflow:visible}
.mk-cizgi{fill:none;stroke:var(--acc);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:260;stroke-dashoffset:260;animation:mkCiz 2.6s var(--ease) .3s forwards}
.mk-ok{fill:var(--acc);opacity:0;animation:mkBelir .5s 2.4s forwards}
@keyframes mkCiz{to{stroke-dashoffset:0}}
@keyframes mkBelir{to{opacity:1}}

/* el yazısı açıklama + kıvrık ok */
.mk-not{position:absolute;right:2%;bottom:16%;z-index:3;width:min(42%,190px);pointer-events:none}
.mk-not p{margin:0;font-family:ui-rounded,"Segoe Print","Bradley Hand",cursive;
  font-size:13.4px;line-height:1.45;color:var(--fg);transform:rotate(-4deg)}
.mk-not svg{position:absolute;left:-46px;top:8px;width:44px;height:46px;color:var(--acc);opacity:.9}
@media(max-width:900px){.mk-not{display:none}}

/* ürün detay maketi */
.mk-detay{display:grid;grid-template-columns:54px minmax(0,1fr) minmax(0,1fr);gap:11px;align-items:start}
.mk-kucuk{display:grid;gap:8px}
.mk-kucuk .mk-gorsel{border:1px solid var(--hair);border-radius:8px}
.mk-buyuk{border-radius:11px;background:
  radial-gradient(62% 52% at 50% 40%,rgba(255,255,255,.2),transparent 72%),rgba(255,255,255,.06);
  aspect-ratio:1;display:grid;place-items:center;border:1px solid var(--hair)}
.mk-buyuk svg{width:78%;height:78%}
.mk-bilgi{display:grid;gap:9px;align-content:start;padding-top:4px}
.mk-sepet{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px;
  height:34px;border-radius:9px;background:var(--acc);color:#06090D;font-size:12.6px;font-weight:600}
.mk-sepet svg{width:14px;height:14px}
.mk-kalp{width:34px;height:34px;border:1px solid var(--hair-strong);border-radius:9px;
  display:grid;place-items:center;color:var(--muted)}
.mk-kalp svg{width:15px;height:15px}
.mk-alt{display:flex;gap:8px;margin-top:9px}
.mk-alt .mk-sepet{flex:1;margin-top:0}
@media(max-width:560px){.mk-detay{grid-template-columns:44px minmax(0,1fr)}.mk-bilgi{grid-column:1/-1}}

@media(prefers-reduced-motion:reduce){
  .mk-cizgi{animation:none;stroke-dashoffset:0}
  .mk-ok{animation:none;opacity:1}
}
`;
