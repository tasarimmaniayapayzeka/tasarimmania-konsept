/* BLOG DETAY TASARIM DİLİ v2.1 — kontrollü UI/UX düzenleme
 *
 * Kullanıcı brief'i: mevcut koyu/premium dili KORU, sıfırdan yapma.
 * Hedef: daha hafif, premium, okunabilir, kurumsal, kompakt; %25-30 daha
 * az yorucu. "Dashboard/kart koleksiyonu" değil "premium editorial /
 * SEO knowledge hub".
 *
 * ── ÖNCE ÖLÇÜLDÜ (1440px, v2.0 hâli) ──────────────────────────────
 *   sayfa yüksekliği   9.563px
 *   bölüm arası boşluk 26px (kartlar arası) ama kart→bölüm 171px
 *                      kaynak: .sec{padding:clamp(56px,7vw,104px) 0}
 *   kart               7 adet, dolgu 40px, köşe 26px
 *   yeşil taşıyan öğe  425
 *   gövde metni        16px/1.78, rengi #A7B0C2, ölçü 510px
 *   h3                 19px (brief: 20-23)
 *   SSS satırı         46px (brief: 48-56)
 *   içindekiler        YOK
 * ───────────────────────────────────────────────────────────────────
 */
module.exports = `
/* ═══ v2.1 JETON KATMANI ═══
   Renkler brief'teki değerlere çekildi. Marka yeşili DEĞİŞTİRİLMEDİ
   (--acc, sayfanın modül rengi) — brief "mevcut projedeki marka yeşilini
   kullan" diyor; değiştirseydik bu sayfa diğer 154 sayfadan kopardı.
   Değişen renk değil, KULLANIM YOĞUNLUĞU. */
.bl{
  --bl-kart:#0F1419;          /* zeminden çok az ayrılan kart */
  --bl-kart-2:#11171C;        /* ikinci düzey yüzey */
  --bl-hat:rgba(255,255,255,.06);
  --bl-hat-2:rgba(255,255,255,.10);
  --bl-r:16px;
  --bl-bas:#F5F7F8;           /* başlık */
  --bl-gov:#D8DEE4;           /* gövde metni */
  --bl-ikincil:#99A3AD;       /* ikincil metin */
  --bl-ac-zem:rgba(var(--acc-rgb),.06);
  --bl-ac-hat:rgba(var(--acc-rgb),.15);
  --bl-bosluk:24px;           /* bölümler arası TEK kaynak */
}
body{--bg:#0A0E13}

/* ⚠ OKUMA SÜTUNU SINIRINI KALDIR — sayfanın kendi .yz-govde{max-width:760px}
   kuralı iki sütunlu ızgarayı 122px'e sıkıştırıyordu (ölçüldü). Okuma
   ölçüsü artık kartın İÇİNDE, .bl-metin üzerinden sınırlanıyor. */
.yz-govde{max-width:none}

/* ═══ 1) BÖLÜM RİTMİ — brief'in en önemli maddesi ═══
   Eski: .sec dolgusu 1440px'te 100px+100px, kart→bölüm arası 171px.
   Yeni: tek kaynak --bl-bosluk (24px). Büyük dikey boşluk YOK. */
.bl-akis > *{margin-block:0}
.bl-akis > * + *{margin-top:var(--bl-bosluk)}
.phd.bl{padding-bottom:calc(var(--bl-bosluk) + 6px)}
section.sec.bl-sec{padding:0 0 var(--bl-bosluk)}
.bl-akis{padding-bottom:calc(var(--bl-bosluk) + 8px)}

/* ═══ 2) KART GÖRÜNÜMÜNÜ AZALT ═══
   Her bölüm ağır bir kutu değil. Üç seviye:
     .bl-kart          → yalnız ince üst çizgi, zemin YOK  (varsayılan)
     .bl-kart.yuzey    → çok hafif zemin farkı + ince kenarlık
     .bl-kart.cerceve  → tam kart (yalnız vurgulanacak bölümde) */
.bl-kart{position:relative;border-top:1px solid var(--bl-hat);
  padding:clamp(22px,2.4vw,30px) 0 0;background:none;border-radius:0}
.bl-kart:first-child{border-top:0;padding-top:0}
.bl-kart.yuzey{background:var(--bl-kart);border:1px solid var(--bl-hat);
  border-radius:var(--bl-r);padding:clamp(20px,2.4vw,30px)}
.bl-kart.cerceve{background:linear-gradient(180deg,var(--bl-kart-2),var(--bl-kart));
  border:1px solid var(--bl-hat);border-radius:var(--bl-r);padding:clamp(20px,2.4vw,30px)}
/* neon/glow yok: eski sürümdeki radial vurgu katmanı kaldırıldı */

/* ═══ 3) BÖLÜM BAŞLIĞI: numara + h2 aynı satırda ═══ */
.bl-ust{display:flex;align-items:baseline;gap:14px;margin-bottom:10px}
.bl-no{flex:none;font-family:var(--mono);font-size:12px;font-weight:500;
  color:var(--acc);letter-spacing:.08em;opacity:.9}
.bl-kart h2{font-size:clamp(24px,2.5vw,30px);letter-spacing:-.03em;line-height:1.18;
  margin:0;color:var(--bl-bas);max-width:24ch}
.bl-kart h2 em{font-style:normal;color:var(--acc)}
.bl-kart h3{font-size:clamp(19px,1.7vw,21px);letter-spacing:-.02em;line-height:1.35;
  margin:22px 0 8px;color:var(--bl-bas)}
.bl-kart h4{font-size:16.4px;letter-spacing:-.01em;margin:18px 0 7px;color:var(--bl-gov)}
.bl-metin p{font-size:16.4px;color:var(--bl-gov);line-height:1.7;margin:0 0 14px}
.bl-metin p:last-child{margin-bottom:0}
.bl-metin a:not(.btn){color:var(--acc);text-decoration:underline;text-underline-offset:3px;
  text-decoration-color:rgba(var(--acc-rgb),.35);transition:text-decoration-color .2s}
.bl-metin a:not(.btn):hover{text-decoration-color:var(--acc)}
/* Okuma alanı 62-68ch. Tek sütunlu bölümlerde de aşılmıyor. */
.bl-kart:not(.ikili) .bl-metin{max-width:66ch}

/* ═══ 4) İKİ SÜTUN — metin | görsel, az zig-zag ═══ */
.bl-ic{display:grid;gap:22px}
@media(min-width:992px){
  .bl-kart.ikili .bl-ic{grid-template-columns:minmax(0,1fr) minmax(0,.85fr);
    gap:clamp(32px,3vw,44px);align-items:start}
  .bl-kart.ikili.ters .bl-ic > .bl-maket{order:-1}
}

/* ═══ 5) BİLGİ KUTUSU — dolu yeşil kutu YOK, sol çizgi + çok hafif zemin ═══ */
.bl-metin .yz-cevap,.bl-not{background:rgba(var(--acc-rgb),.035);
  border-left:2px solid var(--acc);border-radius:0 8px 8px 0;
  padding:15px 18px;margin:16px 0}
.bl-metin .yz-cevap p{margin:0;font-size:15.8px;line-height:1.68;color:var(--bl-gov)}

/* ═══ 6) KONTROL LİSTESİ — küçük ikon, kompakt ═══ */
.bl-cek{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:9px}
.bl-cek li{display:flex;gap:11px;align-items:flex-start;font-size:15.4px;
  line-height:1.58;color:var(--bl-gov)}
.bl-cek li::before{content:"";flex:none;width:18px;height:18px;border-radius:50%;margin-top:2px;
  background:var(--acc);opacity:.9;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2a10 10 0 100 20 10 10 0 000-20zm-1.3 14.3l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2a10 10 0 100 20 10 10 0 000-20zm-1.3 14.3l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z'/%3E%3C/svg%3E") center/contain no-repeat}

/* ═══ 7) İSTATİSTİK ŞERİDİ — sade, yeşil yalnız sayıda ═══ */
.bl-ist{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px);margin:24px 0 0}
.bl-ist > div + div{border-left:1px solid var(--bl-hat);padding-left:clamp(16px,2vw,24px)}
.bl-ist b{display:block;font-size:clamp(20px,2vw,24px);color:var(--acc);letter-spacing:-.03em;line-height:1.05}
.bl-ist span{display:block;margin-top:6px;font-size:12.6px;color:var(--bl-ikincil);line-height:1.45}
@media(max-width:640px){
  .bl-ist{grid-template-columns:1fr 1fr;gap:14px}
  .bl-ist > div + div{border-left:0;padding-left:0}
  .bl-ist > div:nth-child(2){border-left:1px solid var(--bl-hat);padding-left:14px}
}

/* ═══ 8) GÖRSEL KABI — tek sistem, sabit yükseklik YOK ═══ */
.bl-maket{position:relative;min-width:0;margin:0}
.bl-maket figcaption{margin-top:10px;font-size:12.4px;line-height:1.55;color:var(--bl-ikincil)}
.mk{position:relative;border:1px solid var(--bl-hat);border-radius:14px;overflow:hidden;
  background:var(--bl-kart-2);box-shadow:0 18px 40px -28px rgba(0,0,0,.9)}
.mk-bar{display:flex;align-items:center;gap:6px;padding:9px 12px;border-bottom:1px solid var(--bl-hat)}
.mk-bar i{width:7px;height:7px;border-radius:50%;background:#39404F}
.mk-bar u{margin-left:8px;flex:1;height:8px;border-radius:99px;background:rgba(255,255,255,.05);text-decoration:none}
.mk-ic{padding:13px}
.mk-satir{height:7px;border-radius:99px;background:rgba(255,255,255,.09)}
.mk-satir.k{width:58%}.mk-satir.o{width:76%}.mk-satir.u{width:92%}
.mk-satir.ac{background:rgba(var(--acc-rgb),.45)}
.mk-urunler{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}
.mk-urun{border:1px solid var(--bl-hat);border-radius:9px;background:rgba(255,255,255,.02);padding:7px}
.mk-gorsel{aspect-ratio:1;border-radius:6px;background:
  radial-gradient(60% 50% at 50% 38%,rgba(255,255,255,.13),transparent 70%),rgba(255,255,255,.04);
  display:grid;place-items:center;color:#C6CEDA}
.mk-gorsel svg{width:72%;height:72%;opacity:.8}
.mk-yildiz{display:flex;gap:2px;margin:7px 0 5px}
.mk-yildiz i{width:7px;height:7px;background:#C9A227;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'/%3E%3C/svg%3E") center/contain no-repeat}
.mk-yildiz i.bos{background:rgba(255,255,255,.15)}
.mk-urun .mk-satir{margin-top:4px}
.mk-arama{display:flex;align-items:center;gap:9px;margin-top:11px;padding:8px 8px 8px 12px;
  border:1px solid var(--bl-ac-hat);border-radius:99px;background:var(--bl-ac-zem)}
.mk-arama svg{width:13px;height:13px;flex:none;color:var(--bl-ikincil)}
.mk-arama u{flex:1;text-decoration:none;font-size:11.6px;color:var(--bl-ikincil);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mk-arama b{flex:none;width:26px;height:26px;border-radius:50%;background:var(--acc);display:grid;place-items:center}
.mk-arama b svg{width:12px;height:12px;color:#06090D}

/* ⚠ YÜZEN ÖLÇÜM KARTI AKIŞA ALINDI. Brief: "ASLA position absolute ile
   anlamsız konumlandırma". Eski sürümde kart maketin dışına taşıyordu ve
   dar ekranda çakışıyordu. Artık maketin altında normal bir satır. */
.mk-olcum{display:flex;align-items:center;gap:14px;padding:11px 13px;
  border-top:1px solid var(--bl-hat);background:rgba(255,255,255,.015)}
.mk-olcum div{min-width:0}
.mk-olcum u{display:block;text-decoration:none;font-size:11px;color:var(--bl-ikincil)}
.mk-olcum b{display:block;font-size:19px;color:var(--acc);letter-spacing:-.03em;line-height:1.2;margin-top:2px}
.mk-olcum span{display:block;font-size:10.4px;color:var(--bl-ikincil);margin-top:1px}
.mk-olcum svg{flex:1;min-width:0;height:34px;overflow:visible}
.mk-cizgi{fill:none;stroke:var(--acc);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:260;stroke-dashoffset:260;animation:mkCiz 2.4s var(--ease) .3s forwards}
.mk-ok{fill:var(--acc);opacity:0;animation:mkBelir .5s 2.2s forwards}
@keyframes mkCiz{to{stroke-dashoffset:0}}
@keyframes mkBelir{to{opacity:1}}
/* el yazısı not kaldırıldı: brief "premium editorial" istiyor, el yazısı
   süsü o registerin dışında ve dar ekranda zaten gizleniyordu */
.mk-not{display:none}

/* ürün detay maketi */
.mk-detay{display:grid;grid-template-columns:48px minmax(0,1fr) minmax(0,1fr);gap:10px;align-items:start}
.mk-kucuk{display:grid;gap:7px}
.mk-kucuk .mk-gorsel{border:1px solid var(--bl-hat);border-radius:7px}
.mk-buyuk{border-radius:10px;background:
  radial-gradient(62% 52% at 50% 40%,rgba(255,255,255,.16),transparent 72%),rgba(255,255,255,.05);
  aspect-ratio:1;display:grid;place-items:center;border:1px solid var(--bl-hat);color:#C6CEDA}
.mk-buyuk svg{width:76%;height:76%}
.mk-bilgi{display:grid;gap:8px;align-content:start;padding-top:3px}
.mk-sepet{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:3px;
  height:32px;border-radius:8px;background:var(--acc);color:#06090D;font-size:12.2px;font-weight:600}
.mk-sepet svg{width:13px;height:13px}
.mk-kalp{width:32px;height:32px;border:1px solid var(--bl-hat-2);border-radius:8px;
  display:grid;place-items:center;color:var(--bl-ikincil)}
.mk-kalp svg{width:14px;height:14px}
.mk-alt{display:flex;gap:7px;margin-top:8px}
.mk-alt .mk-sepet{flex:1;margin-top:0}
@media(max-width:520px){.mk-detay{grid-template-columns:40px minmax(0,1fr)}.mk-bilgi{grid-column:1/-1}}

/* çizim sahnesi maket kabuğunda */
.bl-maket .ciz-kutu{height:auto}
.bl-maket .ciz-cerceve{aspect-ratio:430/280;height:auto;border:0;box-shadow:none;border-radius:0;background:none}
.bl-maket .ciz-bar b{animation:none}

/* ═══ 9) İÇİNDEKİLER — kompakt, dev bölüm değil ═══ */
.bl-toc{border:1px solid var(--bl-hat);border-radius:var(--bl-r);
  background:var(--bl-kart);padding:18px 20px}
.bl-toc h2{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--bl-ikincil);margin:0 0 12px;font-weight:500}
.bl-toc ol{list-style:none;margin:0;padding:0;display:grid;gap:7px;counter-reset:t}
@media(min-width:760px){.bl-toc ol{grid-template-columns:1fr 1fr;column-gap:26px}}
.bl-toc li{counter-increment:t;display:flex;gap:10px;align-items:baseline}
.bl-toc li::before{content:counter(t,decimal-leading-zero);flex:none;
  font-family:var(--mono);font-size:10.6px;color:var(--acc);opacity:.75}
.bl-toc a{font-size:14.4px;line-height:1.45;color:var(--bl-gov);text-decoration:none;
  transition:color .2s;padding-block:3px}
.bl-toc a:hover{color:var(--acc)}

/* ═══ 10) TABLO — ince çizgi, satır hover, hafif yeşil başlık ═══ */
.bl-kart .yz-tablo{margin:18px 0 0;border:1px solid var(--bl-hat);border-radius:12px;overflow-x:auto}
.bl-kart .yz-tablo table{min-width:520px}
.bl-kart .yz-tablo th{font-family:var(--mono);font-size:10.4px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--acc);background:var(--bl-ac-zem);padding:14px 16px;border-bottom:1px solid var(--bl-hat);font-weight:500}
.bl-kart .yz-tablo td{font-size:14.6px;color:var(--bl-gov);padding:14px 16px;
  border-bottom:1px solid var(--bl-hat);line-height:1.55}
.bl-kart .yz-tablo tbody tr{transition:background-color .2s}
.bl-kart .yz-tablo tbody tr:hover{background:rgba(255,255,255,.022)}
.bl-kart .yz-tablo tr:last-child td{border-bottom:0}

/* ═══ 11) ALINTI ═══ */
.bl-kart .yz-alinti{margin:18px 0 0;padding:14px 18px;border-left:2px solid var(--acc);
  background:rgba(var(--acc-rgb),.035);border-radius:0 8px 8px 0}
.bl-kart .yz-alinti p{font-size:15.8px;line-height:1.6;color:var(--bl-gov);font-style:normal;margin:0 0 6px}
.bl-kart .yz-alinti cite{font-family:var(--mono);font-size:12px;color:var(--bl-ikincil);font-style:normal}

/* ═══ 12) SSS — satır 48-56px, açık soru hafif yeşil ═══ */
.bl-sss{border:1px solid var(--bl-hat);border-radius:var(--bl-r);overflow:hidden;background:var(--bl-kart)}
.bl-sss details{border-bottom:1px solid var(--bl-hat)}
.bl-sss details:last-child{border-bottom:0}
.bl-sss summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:14px;
  min-height:52px;padding:13px 18px;font-size:15.4px;font-weight:500;color:var(--bl-bas);
  line-height:1.4;transition:background-color .2s}
.bl-sss summary::-webkit-details-marker{display:none}
.bl-sss summary i{flex:none;font-style:normal;font-family:var(--mono);font-size:10.6px;
  color:var(--acc);opacity:.7}
.bl-sss summary::after{content:"";width:8px;height:8px;margin-left:auto;flex:none;
  border-right:1.6px solid var(--bl-ikincil);border-bottom:1.6px solid var(--bl-ikincil);
  transform:rotate(45deg) translateY(-2px);transition:transform .25s var(--ease)}
.bl-sss details[open] summary{background:rgba(var(--acc-rgb),.05)}
.bl-sss details[open] summary::after{transform:rotate(-135deg) translateY(-2px)}
.bl-sss summary:hover{background:rgba(255,255,255,.02)}
.bl-sss p{margin:0;padding:0 18px 16px 46px;font-size:15px;line-height:1.68;color:var(--bl-gov)}

/* ═══ 13) KAPANIŞ CTA — dev banner değil, içeriği kadar ═══ */
.bl-cta{border:1px solid var(--bl-ac-hat);border-radius:var(--bl-r);
  background:linear-gradient(135deg,rgba(var(--acc-rgb),.07),rgba(255,255,255,.012));
  padding:clamp(24px,3vw,34px);display:flex;align-items:center;justify-content:space-between;
  gap:24px;flex-wrap:wrap}
.bl-cta h2{font-size:clamp(20px,2.2vw,25px);letter-spacing:-.025em;line-height:1.25;
  margin:0 0 7px;color:var(--bl-bas);max-width:22ch}
.bl-cta p{margin:0;font-size:15px;color:var(--bl-ikincil);line-height:1.6;max-width:52ch}
.bl-cta .btn{flex:none;height:50px;padding:0 26px;font-size:15px;border-radius:11px}

/* ═══ 14) İLGİLİ YAZILAR — sade kart ızgarası ═══ */
.bl-ilgili h2{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--bl-ikincil);margin:0 0 14px;font-weight:500}
.bl-ilgili ul{list-style:none;margin:0;padding:0;display:grid;gap:10px;
  grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.bl-ilgili a{display:block;border:1px solid var(--bl-hat);border-radius:12px;padding:14px 16px;
  text-decoration:none;background:var(--bl-kart);transition:border-color .2s,background-color .2s}
.bl-ilgili a:hover{border-color:var(--bl-ac-hat);background:var(--bl-kart-2)}
.bl-ilgili .kat{display:block;font-family:var(--mono);font-size:9.6px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--acc);opacity:.8;margin-bottom:6px}
.bl-ilgili .bas{display:block;font-size:14.4px;line-height:1.4;color:var(--bl-gov);font-weight:500}

/* ═══ 15) FOOTER — daha alçak ═══
   ⚠ SÜTUN SAYISI DEĞİŞTİRİLMEDİ. Brief masaüstünde 4 kolon diyor ama
   sitenin footer'ı 3 kolonlu (marka + modüller + iletişim) ve brief'in
   kendi ilk cümlesi 'mevcut markaya uygun tut'. Dördüncü kolon uydurmak
   yeni içerik icat etmek olurdu. Değişen yalnız yükseklik ve mobil
   düzen: 480px altında tek sütun yerine 2 kolon.
.ftr{padding:34px 0 26px}
.ftr-ust{margin-bottom:24px;gap:26px}
/* ⚠ ÖZGÜLLÜK YÜKSELTİLDİ: sayfanın kendi @media(max-width:760px) bloğunda
   .ftr-ust{grid-template-columns:1fr} var. Aynı özgüllükte olduğu için
   sıralama belirleyici oluyordu ve 480px ölçümünde tek sütun çıktı.
   .ftr .ftr-ust (0,2,0) ile kesin kazanıyor. */
@media(max-width:760px){.ftr .ftr-ust{grid-template-columns:1fr 1fr;gap:20px}
  .ftr .ftr-ust > div:first-child{grid-column:1/-1}
  .ftr{padding:26px 0 22px}}

/* ═══ 16) MOBİL ═══ */
@media(max-width:991px){
  .bl{--bl-bosluk:18px}
  .bl-kart.yuzey,.bl-kart.cerceve{padding:19px;border-radius:13px}
  .bl-kart h2{font-size:clamp(22px,4.4vw,26px);max-width:none}
  .bl-metin p{font-size:15.6px;line-height:1.66}
  .bl-kart h3{font-size:19px}
  .bl-cta{padding:22px}
  .bl-cta .btn{width:100%}
}
@media(max-width:767px){
  .bl{--bl-bosluk:16px}
  .bl-ust{gap:11px}
  .bl-hero-btn .btn{width:100%;justify-content:center}
  .bl-toc{padding:16px 17px}
}
@media(max-width:480px){
  .bl-kart.yuzey,.bl-kart.cerceve{padding:17px;border-radius:12px}
  .bl-metin p{font-size:15.2px}
  .bl-cek li{font-size:14.8px}
}
@media(prefers-reduced-motion:reduce){
  .mk-cizgi{animation:none;stroke-dashoffset:0}
  .mk-ok{animation:none;opacity:1}
}
`;
