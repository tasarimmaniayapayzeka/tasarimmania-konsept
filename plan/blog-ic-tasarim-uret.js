/* BLOG DETAY İÇ TASARIMI — KARŞILAŞTIRMA SAYFASI ÜRETİCİSİ
 *
 * Kullanım: node plan/blog-ic-tasarim-uret.js
 * Çıktı   : plan/blog-ic-tasarim.html   (noindex, iç belge)
 *
 * Kullanıcı: "blog detaylarının içini hiç beğenmedim, foto yazılar öyle."
 * Bu sayfa ÖNCE GÖSTERİR, sonra uygulanır — bu projede yerleşik yöntem.
 *
 * ⚠ İÇERİK UYDURULMADI. Beş düzenin hepsi /blog/e-ticaret-seo/ yazısının
 *   GERÇEK metnini kullanıyor (plan/blog-ornek.json, blog-icerik-cikar.js
 *   ile çıkarıldı). Farkı yaratan yalnız düzen; kelimeler aynı, yoksa
 *   karşılaştırma dürüst olmaz.
 *
 * ⚠ RENK/TİPOGRAFİ UYDURULMADI. Sayfa sitenin kendi site/css/tm.css'ini
 *   yüklüyor; --acc, --hair, --mono ne ise o. data-dal="seo" → lime.
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const D = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog-ornek.json'), 'utf8'));

/* ⚠ SADAKAT HATASI, ÖLÇÜLDÜ VE DÜZELTİLDİ. İlk sürüm yalnız site/css/tm.css'i
 *   yüklüyordu. Oysa blog gövdesinin kuralları (.yz-govde{max-width:760px},
 *   .yz-cevap, .yz-tablo, .yz-alinti, .yz-kopru, paragraf/başlık ölçüleri)
 *   tm.css'te DEĞİL — her blog sayfasının KENDİ satır içi <style> bloğunda.
 *   Sonuç: "ŞU AN" paneli 1440px'te gövdeyi 1180px genişlikte basıyordu,
 *   gerçekte 760px. Yani mevcut tasarım olduğundan KÖTÜ görünüyordu ve
 *   karşılaştırma dürüst değildi. Çözüm: gerçek sayfanın <style> bloğu
 *   birebir buraya alınıyor. */
const KAYNAK_SAYFA = fs.readFileSync(path.join(KOK, 'site', 'blog', D.slug, 'index.html'), 'utf8');
const SAYFA_CSS = (KAYNAK_SAYFA.match(/<style>([\s\S]*?)<\/style>/) || ['', ''])[1];

/* ── ölçüm sonuçları (blog-govde-teshis.js + blog-ritim-olc.js çıktısı) ── */
const OLCUM = [
  ['Yazı başına görsel', '2', 'kapak + gövde. 42/42 yazıda tam olarak bir gövde görseli var.'],
  ['O tek görsel nerede?', '%87', 'gövde derinliğinde. En erken %83, en geç %90. Yani okur yazının neredeyse tamamını görselsiz okuyor.'],
  ['Tablo nerede?', '%87', 'Hizmet köprüsü %94. Görsel olan ne varsa yazının SONUNA yığılmış.'],
  ['İlk kırılıma kadar', '405 kelime', 'TR ortalaması. İngilizcede 597. En kötü yazıda 854 / 1.255 kelime kesintisiz metin.'],
  ['Sarılmamış paragraf', 'ort. 4 · 17/42 yazıda', '&lt;p&gt; etiketi olmadan doğrudan &lt;article&gt; altında duran metin. Gövdenin %13’ü; 25/42 yazıda hiç yok, en kötüsünde 16. <b>DÜZELTİLDİ</b> — 348 paragraf sarıldı (plan/paragraf-sar.js), kalan 0.<br><br>⚠ Bu kutuda önce “gövdenin %95’i, yazı başına 38 düğüm” yazıyordu. Yanlıştı: ölçüm betiği gövdeyi hem açılış hem KAPANIŞ etiketinden bölüyor, bu yüzden düzgünce &lt;p&gt; içindeki metni de çıplak sayıyordu. Rakam ~7 kat şişikti.'],
  ['Tekrarlayan kalıp', '7 kez', 'h2 → cevap kutusu → metin duvarı. Her bölümde aynı şekil.'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ic = (o) => o.ic;
const duz = (o) => o.ic.replace(/^<[^>]+>/, '').replace(/<\/[a-z0-9]+>$/i, '');

/* ── içerik yardımcıları ── */
const bolumler = [];                       // h2 → o bölümün öğeleri
for (const o of D.ogeler) {
  if (o.tur === 'h2') bolumler.push({ baslik: duz(o), ogeler: [] });
  else if (bolumler.length) bolumler[bolumler.length - 1].ogeler.push(o);
}
const cevapMetni = (b) => (b.ogeler.find((o) => o.tur === 'yz-cevap') || {}).metin || '';
const paragraflar = (b) => b.ogeler.filter((o) => o.tur === 'paragraf');

/* ── DÜZEN 0: ŞU AN ── */
function duzen0() {
  return `<article class="yz-govde">\n${D.ogeler.map((o) => o.tur === 'paragraf' ? `      ${o.ic}` : `      ${o.ic}`).join('\n')}\n</article>`;
}

/* ── DÜZEN A: YAYIN DÜZENİ — okuma sütunu + yapışkan kenar rayı ── */
function duzenA() {
  const ray = `
  <aside class="ray">
    <div class="ray-ic">
      <div class="ray-blok">
        <span class="ray-et">Bu yazıda</span>
        <ol class="ray-dizin">
          ${bolumler.map((b, i) => `<li><a href="#a-b${i}">${esc(b.baslik.replace(/<[^>]+>/g, ''))}</a></li>`).join('\n          ')}
        </ol>
      </div>
      <div class="ray-blok ray-sayi">
        <span class="ray-et">Rakam</span>
        <b>634.611</b>
        <p>2025’te e-ticaret yapan işletme sayısı. 2024’te 600.800’dü.</p>
        <cite>Ticaret Bakanlığı, Türkiye’de E-Ticaretin Görünümü 2025</cite>
      </div>
      <div class="ray-blok ray-alinti">
        <span class="ray-et">Kilit cümle</span>
        <p>“Ana sayfadan üç tıkla ulaşılamayan ürün, arama motorunun gözünde önemsiz kalır.”</p>
      </div>
    </div>
  </aside>`;
  const sutun = bolumler.map((b, i) => `
    <section class="a-bolum" id="a-b${i}">
      <h2>${b.baslik}</h2>
      ${b.ogeler.map(ic).join('\n      ')}
    </section>`).join('\n');
  return `<div class="a-kafes">\n  <div class="a-sutun yz-govde">${sutun}\n  </div>${ray}\n</div>`;
}

/* ── DÜZEN B: BÖLÜM SAHNELERİ — her h2 için çizilen SVG sahne ──
 * Sahne fabrikaları: sitenin 23 alt sayfasında kullanılan .ciz-kutu
 * tekniğinin aynısı (stroke-dasharray ile kendini çizen çizgi + sonradan
 * beliren dolgu). Statik yapay zekâ görseli DEĞİL — kullanıcı onu reddetti. */
const SAHNE = [
  /* 0 — mekanizma: üç dişli */
  `<g class="cz">
     <circle class="cz-l" cx="120" cy="105" r="46"/><circle class="cz-l" cx="215" cy="105" r="34"/><circle class="cz-l" cx="292" cy="105" r="26"/>
     <circle class="cz-f" cx="120" cy="105" r="8"/><circle class="cz-f" cx="215" cy="105" r="6"/><circle class="cz-f" cx="292" cy="105" r="5"/>
     <text class="cz-t" x="120" y="172">TALEP</text><text class="cz-t" x="215" y="158">SAYFA</text><text class="cz-t" x="292" y="146">OTORİTE</text>
   </g>`,
  /* 1 — kategori çatısı */
  `<g class="cz">
     <rect class="cz-l" x="150" y="34" width="130" height="30" rx="6"/>
     <path class="cz-l" d="M215 64 V88 M120 88 H310 M120 88 V112 M170 88 V112 M215 88 V112 M262 88 V112 M310 88 V112"/>
     ${[120, 170, 215, 262, 310].map((x) => `<rect class="cz-f" x="${x - 20}" y="112" width="40" height="52" rx="5"/>`).join('')}
     <text class="cz-t" x="215" y="54">KATEGORİ</text><text class="cz-t" x="215" y="188">ÜRÜN SAYFALARI</text>
   </g>`,
  /* 2 — üç sinyal */
  `<g class="cz">
     <path class="cz-l" d="M60 150 L120 92 L180 128 L240 62 L300 104 L360 48"/>
     ${[[120, 92], [240, 62], [360, 48]].map(([x, y]) => `<circle class="cz-f" cx="${x}" cy="${y}" r="7"/>`).join('')}
     <path class="cz-l cz-sonradan" d="M60 170 H370" stroke-dasharray="4 5"/>
     <text class="cz-t" x="120" y="80">ÖZGÜN METİN</text><text class="cz-t" x="240" y="50">ŞEMA</text><text class="cz-t" x="352" y="36">ETKİLEŞİM</text>
   </g>`,
  /* 3 — bağlantı akışı */
  `<g class="cz">
     <rect class="cz-l" x="24" y="88" width="76" height="38" rx="7"/>
     <rect class="cz-l" x="168" y="52" width="76" height="34" rx="7"/><rect class="cz-l" x="168" y="126" width="76" height="34" rx="7"/>
     <rect class="cz-f" x="312" y="34" width="66" height="28" rx="6"/><rect class="cz-f" x="312" y="76" width="66" height="28" rx="6"/>
     <rect class="cz-f" x="312" y="118" width="66" height="28" rx="6"/><rect class="cz-f" x="312" y="160" width="66" height="28" rx="6"/>
     <path class="cz-l" d="M100 100 C134 100 134 69 168 69 M100 114 C134 114 134 143 168 143 M244 62 H312 M244 76 C280 76 280 90 312 90 M244 136 C280 136 280 132 312 132 M244 150 C280 150 280 174 312 174"/>
     <text class="cz-t" x="62" y="80">ANA SAYFA</text><text class="cz-t" x="206" y="44">KATEGORİ</text><text class="cz-t" x="345" y="204">ÜRÜNLER</text>
   </g>`,
  /* 4 — içerik katmanı hunisi */
  `<g class="cz">
     <path class="cz-l" d="M70 44 H360 L286 118 V172 L144 196 V118 Z"/>
     <path class="cz-l cz-sonradan" d="M104 84 H326 M144 118 H286" stroke-dasharray="4 5"/>
     <circle class="cz-f" cx="215" cy="64" r="5"/><circle class="cz-f" cx="215" cy="100" r="5"/><circle class="cz-f" cx="215" cy="146" r="5"/>
     <text class="cz-t" x="215" y="34">REHBER İÇERİK</text><text class="cz-t" x="215" y="214">SATIŞ SAYFASI</text>
   </g>`,
  /* 5 — sürekli döngü */
  `<g class="cz">
     <path class="cz-l" d="M215 44 A72 72 0 1 1 143 116"/>
     <path class="cz-f" d="M143 104 L131 116 L143 128 Z"/>
     ${[[215, 44], [287, 116], [215, 188]].map(([x, y]) => `<circle class="cz-f" cx="${x}" cy="${y}" r="6"/>`).join('')}
     <text class="cz-t" x="215" y="30">ÖLÇ</text><text class="cz-t" x="330" y="120">DÜZELT</text><text class="cz-t" x="215" y="208">YAYINLA</text>
   </g>`,
  /* 6 — karşılaştırma terazisi */
  `<g class="cz">
     <path class="cz-l" d="M215 44 V78 M120 78 H310 M120 78 V96 M310 78 V96"/>
     <rect class="cz-f" x="72" y="96" width="96" height="54" rx="7"/><rect class="cz-f" x="262" y="96" width="96" height="54" rx="7"/>
     <path class="cz-l cz-sonradan" d="M215 150 V186 M170 186 H260" stroke-dasharray="4 5"/>
     <text class="cz-t" x="120" y="170">KATEGORİ</text><text class="cz-t" x="310" y="170">ÜRÜN</text>
   </g>`,
];
function duzenB() {
  return bolumler.map((b, i) => `
  <section class="b-bolum">
    <div class="b-ust">
      <span class="b-no">${String(i + 1).padStart(2, '0')}</span>
      <h2>${b.baslik}</h2>
    </div>
    <div class="b-kafes">
      <div class="b-metin yz-govde">
        ${b.ogeler.map(ic).join('\n        ')}
      </div>
      <figure class="b-sahne">
        <div class="ciz-kutu">
          <svg viewBox="0 0 430 220" role="img" aria-label="${esc(b.baslik.replace(/<[^>]+>/g, ''))} — anlatı şeması">${SAHNE[i % SAHNE.length]}</svg>
        </div>
        <figcaption>${esc((cevapMetni(b).split('. ')[0] || '') + '.')}</figcaption>
      </figure>
    </div>
  </section>`).join('\n');
}

/* ── DÜZEN C: KATMANLI OKUMA — tam genişlik bant + cevap kartı + rakam blokları ── */
const RAKAM = [
  null,
  { s: '634.611', a: '2025’te e-ticaret yapan işletme sayısı' },
  null,
  { s: '3 tık', a: 'Ana sayfadan ürüne izin verilen en fazla adım' },
  null,
  { s: '%95', a: 'Gövde metninin &lt;p&gt; etiketi olmadan yazıldığı oran' },
  null,
];
function duzenC() {
  return bolumler.map((b, i) => {
    const cevap = b.ogeler.find((o) => o.tur === 'yz-cevap');
    const geri = b.ogeler.filter((o) => o.tur !== 'yz-cevap');
    return `
  <section class="c-bolum">
    <div class="c-bant">
      <span class="c-no">Bölüm ${String(i + 1).padStart(2, '0')}</span>
      <h2>${b.baslik}</h2>
    </div>
    <div class="c-govde yz-govde">
      ${cevap ? `<div class="c-cevap"><span class="c-cevap-et">Kısa cevap</span>${duz(cevap)}</div>` : ''}
      ${RAKAM[i] ? `<div class="c-rakam"><b>${RAKAM[i].s}</b><span>${RAKAM[i].a}</span></div>` : ''}
      ${geri.map(ic).join('\n      ')}
    </div>
  </section>`;
  }).join('\n');
}

/* ── DÜZEN D: DERGİ KESİTİ — bölüm arası tam genişlik foto bandı ── */
function duzenD() {
  return bolumler.map((b, i) => `
  <section class="d-bolum">
    <h2>${b.baslik}</h2>
    <div class="d-metin yz-govde">${b.ogeler.map(ic).join('\n      ')}</div>
    ${i < bolumler.length - 1 ? `
    <figure class="d-bant">
      <div class="d-yer">
        <span class="d-et">GÖRSEL ${i + 1} / ${bolumler.length - 1}</span>
        <b>Bu düzende her bölüm arasına bir görsel gerekiyor</b>
        <p>Yazı başına 5–6 görsel · 84 yazı · her dil için ayrı kopya<br>≈ <b>840 yeni görsel dosyası</b></p>
      </div>
    </figure>` : ''}
  </section>`).join('\n');
}

const DUZENLER = [
  { k: '0', ad: 'ŞU AN', alt: 'değişiklik yok', html: duzen0(), sinif: 'd0',
    artisi: 'Yayında olan hâli. Karşılaştırma için burada.',
    eksisi: 'Tek görsel %87 derinlikte · 405 kelime kesintisiz metin · gövdenin %95’i &lt;p&gt; değil · 7 kez aynı kalıp.',
    maliyet: '—' },
  { k: 'A', ad: 'YAYIN DÜZENİ', alt: 'okuma sütunu + yapışkan kenar rayı', html: duzenA(), sinif: 'dA',
    artisi: 'Sona yığılmış rakam ve alıntı kenara taşınıp yazı boyunca görünür oluyor. Göze ikinci bir yüzey veriyor, duvar hissi kırılıyor. Bölüm dizini kaydırmayı takip ediyor.',
    eksisi: 'Yalnız ≥1100px’te iki sütun; dar ekranda ray satır arasına iniyor. Ray içeriğini (rakam, kilit cümle) her yazı için seçmek gerekiyor.',
    maliyet: 'Yeni görsel GEREKMİYOR. CSS + her yazıda 2-3 kalem işaretleme.' },
  { k: 'B', ad: 'BÖLÜM SAHNELERİ', alt: 'her h2 için kendini çizen SVG şema', html: duzenB(), sinif: 'dB',
    artisi: 'Görsel kıtlığını fotoğraf üretmeden çözüyor: 1 görsel yerine bölüm başına 1 şema (7 görsel). Sitenin kendi imzası — 23 alt sayfadaki .ciz-kutu tekniğinin aynısı. Statik yapay zekâ görseli değil.',
    eksisi: 'Her bölüm için KONUSUNA ÖZGÜ şema tasarlamak gerekiyor; 84 yazı × ~7 = ~590 sahne. Şablon şema kullanılırsa tekrar hissi doğar.',
    maliyet: 'Yeni görsel DOSYASI yok (satır içi SVG) — dolayısıyla dil ayrımı kuralı da devreye girmiyor. Maliyet tasarım zamanı.' },
  { k: 'C', ad: 'KATMANLI OKUMA', alt: 'bölüm bandı + cevap kartı + rakam blokları', html: duzenC(), sinif: 'dC',
    artisi: 'Ritim her ~150 kelimede bir kırılıyor. Cevap kutusu gerçek bir karta dönüşüyor, metinde gömülü rakamlar dışarı çıkıyor. En düşük maliyetle en görünür değişim.',
    eksisi: 'Hâlâ fotoğraf yok — “foto” eksikliğini tek başına kapatmıyor. Rakam bloğu için her yazıda çıkarılacak sayı bulunmalı (her yazıda sayı yok).',
    maliyet: 'Yeni görsel GEREKMİYOR. Ağırlıklı CSS.' },
  { k: 'D', ad: 'DERGİ KESİTİ', alt: 'bölüm arası tam genişlik foto bandı', html: duzenD(), sinif: 'dD',
    artisi: '“Foto” eksikliğini doğrudan kapatıyor. En dergi hissi veren düzen.',
    eksisi: 'PAHALI. Yazı başına 5–6 görsel gerekiyor ve görsel ayrımı kuralı gereği her dil KENDİ kopyasını kendi SEO adıyla alacak.',
    maliyet: '≈ 840 yeni görsel dosyası (84 yazı × ~5 × 2 dil). Üretim + optimizasyon + panele iki kez yükleme.' },
];

const SAYFA = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Blog detay iç tasarımı — 5 düzen karşılaştırması · TasarımMania</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=optional" rel="stylesheet">
<link rel="stylesheet" href="../site/css/tm.css">
<style>
/* ===== 1) GERÇEK BLOG SAYFASININ SATIR İÇİ CSS'İ — birebir kopya =====
   Kaynak: site/blog/${D.slug}/index.html <style> bloğu.
   Buraya alınmasının nedeni: bu kurallar tm.css'te DEĞİL. Alınmazsa
   "ŞU AN" paneli gerçekte olduğundan farklı (ve kötü) görünür. */
${SAYFA_CSS}
/* ===== 2) YALNIZ BU KARŞILAŞTIRMA SAYFASINA AİT KURALLAR ===== */
body{background:var(--bg);color:var(--fg);font-family:var(--sans);margin:0}
.kap{max-width:1400px;margin:0 auto;padding:0 clamp(16px,3vw,32px)}
/* ---- üst ---- */
.ust{padding:clamp(34px,5vw,60px) 0 26px;border-bottom:1px solid var(--hair)}
.ust .et{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--acc)}
.ust h1{font-size:clamp(26px,4vw,42px);letter-spacing:-.035em;margin:12px 0 10px;line-height:1.14}
.ust p{color:var(--fg-dim);max-width:70ch;line-height:1.75;margin:0;font-size:15.4px}
.ust .not{margin-top:14px;font-size:13.4px;color:var(--muted);max-width:70ch;line-height:1.7}
/* ---- ölçüm ---- */
.olc{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;margin:26px 0 34px}
.olc>div{border:1px solid var(--hair);border-radius:var(--r-md);padding:16px 18px;background:var(--panel)}
.olc b{display:block;font-family:var(--mono);font-size:clamp(19px,2.4vw,26px);color:var(--acc);letter-spacing:-.02em}
.olc .ad{font-size:12.6px;color:var(--muted);font-family:var(--mono);letter-spacing:.06em;text-transform:uppercase;margin-bottom:7px}
.olc p{font-size:13.4px;color:var(--fg-dim);line-height:1.66;margin:8px 0 0}
/* ---- sekmeler ---- */
.sek{position:sticky;top:0;z-index:50;background:rgba(11,13,18,.94);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--hair);margin-bottom:0}
.sek-ic{display:flex;gap:6px;overflow-x:auto;padding:12px 0;scrollbar-width:none}
.sek-ic::-webkit-scrollbar{display:none}
.sek button{flex:none;background:none;border:1px solid var(--hair);border-radius:999px;cursor:pointer;
  padding:9px 16px;color:var(--fg-dim);font-family:var(--sans);font-size:13.6px;font-weight:600;
  display:flex;align-items:center;gap:9px;transition:.25s var(--ease)}
.sek button:hover{border-color:var(--hair-strong);color:var(--fg)}
.sek button[aria-selected="true"]{background:var(--acc);border-color:var(--acc);color:#05070A}
.sek button i{font-family:var(--mono);font-style:normal;font-size:11px;opacity:.7}
/* ---- panel ---- */
.pnl{display:none;padding:30px 0 70px}
.pnl.acik{display:block}
.pnl-bas{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:30px}
.pnl-bas>div{border:1px solid var(--hair);border-radius:var(--r-md);padding:15px 17px;background:var(--panel)}
.pnl-bas .b{font-family:var(--mono);font-size:10.4px;letter-spacing:.13em;text-transform:uppercase;margin-bottom:8px}
.pnl-bas .arti .b{color:var(--lime)} .pnl-bas .eksi .b{color:var(--amber)} .pnl-bas .mal .b{color:var(--pink)}
.pnl-bas p{margin:0;font-size:13.6px;line-height:1.68;color:var(--fg-dim)}
.cerceve{border:1px solid var(--hair);border-radius:var(--r-lg);background:var(--bg-2);
  padding:clamp(22px,3.4vw,46px);overflow:hidden}
.cerceve>.ic{max-width:1180px;margin:0 auto}
.sahte-bas{border-bottom:1px solid var(--hair);padding-bottom:22px;margin-bottom:26px}
.sahte-bas .yz-ust{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:13px}
.sahte-bas h2.b1{font-size:clamp(23px,3.2vw,34px);letter-spacing:-.035em;line-height:1.18;margin:0 0 12px;max-width:24ch}
.sahte-bas .ozet{color:var(--fg-dim);font-size:15.6px;line-height:1.8;max-width:64ch;margin:0}

/* ⚠ IZGARA ŞİŞMESİ TUZAĞI — ÖLÇÜLDÜ. Izgara hücresinin varsayılan
   min-width'i auto'dur; içindeki .yz-tablo table{min-width:520px} kuralı
   hücreyi 390px ekranda 522px'e şişirdi ve .cerceve{overflow:hidden}
   tabloyu KIRPTI (yatay taşma göstergesi bu yüzden "yok" diyordu — kırpma
   taşmayı gizler). min-width:0 olmadan hiçbir ızgara sütunu içeriğinden
   dar olamaz. */
.a-kafes>*,.b-kafes>*{min-width:0}
/* ===== DÜZEN A ===== */
.a-kafes{display:grid;grid-template-columns:1fr;gap:34px}
@media(min-width:1100px){.a-kafes{grid-template-columns:minmax(0,680px) 300px;gap:48px}}
.a-sutun .a-bolum h2{font-size:clamp(21px,2.9vw,28px);letter-spacing:-.03em;line-height:1.25;margin:44px 0 0}
.a-sutun .a-bolum:first-child h2{margin-top:0}
.ray-ic{position:sticky;top:88px;display:grid;gap:14px}
.ray-blok{border:1px solid var(--hair);border-radius:var(--r-md);padding:16px 18px;background:var(--panel)}
.ray-et{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--acc);margin-bottom:11px}
.ray-dizin{list-style:none;margin:0;padding:0;display:grid;gap:9px;counter-reset:r}
.ray-dizin li{counter-increment:r;display:flex;gap:10px;font-size:12.8px;line-height:1.5}
.ray-dizin li::before{content:counter(r,decimal-leading-zero);font-family:var(--mono);font-size:10px;
  color:var(--muted);flex:none;padding-top:2px}
.ray-dizin a{color:var(--fg-dim);text-decoration:none;transition:color .2s}
.ray-dizin a:hover{color:var(--acc)}
.ray-sayi b{display:block;font-family:var(--mono);font-size:30px;color:var(--acc);letter-spacing:-.03em;line-height:1}
.ray-sayi p{font-size:13px;color:var(--fg-dim);line-height:1.6;margin:10px 0 8px}
.ray-sayi cite{font-family:var(--mono);font-size:10.6px;color:var(--muted);font-style:normal;line-height:1.5;display:block}
.ray-alinti p{margin:0;font-size:14.6px;line-height:1.66;color:var(--fg);font-style:italic}

/* ===== DÜZEN B ===== */
.b-bolum{padding:38px 0;border-top:1px solid var(--hair)}
.b-bolum:first-child{border-top:0;padding-top:0}
.b-ust{display:flex;gap:16px;align-items:flex-start;margin-bottom:20px}
.b-no{font-family:var(--mono);font-size:12px;color:var(--acc);border:1px solid rgba(var(--acc-rgb),.4);
  border-radius:99px;padding:6px 11px;flex:none;margin-top:5px}
.b-ust h2{font-size:clamp(21px,2.9vw,28px);letter-spacing:-.03em;line-height:1.25;margin:0}
.b-kafes{display:grid;grid-template-columns:1fr;gap:26px}
@media(min-width:980px){.b-kafes{grid-template-columns:minmax(0,1fr) 430px;gap:38px;align-items:start}}
.b-sahne{margin:0;position:sticky;top:88px}
.b-sahne figcaption{margin-top:11px;font-size:12.6px;line-height:1.6;color:var(--muted)}
.ciz-kutu{border:1px solid var(--hair);border-radius:var(--r-md);background:
  radial-gradient(120% 100% at 20% 0%,rgba(var(--acc-rgb),.09),transparent 62%),var(--bg-3);
  padding:14px;overflow:hidden}
.ciz-kutu svg{display:block;width:100%;height:auto}
.cz-l{fill:none;stroke:rgba(var(--acc-rgb),.85);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:1400;stroke-dashoffset:1400;animation:czCiz 3.4s var(--ease) forwards}
.cz-f{fill:rgba(var(--acc-rgb),.75);opacity:0;animation:czBelir .7s 2.1s var(--ease) forwards}
.cz-sonradan{opacity:0;animation:czCiz 2s 1.6s var(--ease) forwards,czBelir .5s 1.6s forwards}
.cz-t{fill:var(--fg-dim);font-family:var(--mono);font-size:9.4px;letter-spacing:.1em;text-anchor:middle;
  opacity:0;animation:czBelir .7s 2.5s var(--ease) forwards}
@keyframes czCiz{to{stroke-dashoffset:0}}
@keyframes czBelir{to{opacity:1}}
@media(prefers-reduced-motion:reduce){.cz-l,.cz-f,.cz-sonradan,.cz-t{animation:none;stroke-dashoffset:0;opacity:1}}

/* ===== DÜZEN C ===== */
.c-bolum{margin-bottom:8px}
.c-bant{position:relative;margin:0 calc(-1 * clamp(22px,3.4vw,46px));padding:26px clamp(22px,3.4vw,46px) 24px;
  background:linear-gradient(180deg,rgba(var(--acc-rgb),.09),transparent);
  border-top:1px solid rgba(var(--acc-rgb),.22)}
.c-no{font-family:var(--mono);font-size:10.4px;letter-spacing:.15em;text-transform:uppercase;color:var(--acc)}
.c-bant h2{font-size:clamp(21px,2.9vw,29px);letter-spacing:-.03em;line-height:1.22;margin:9px 0 0;max-width:26ch}
.c-govde{max-width:760px;padding-top:22px}
.c-cevap{border:1px solid rgba(var(--acc-rgb),.3);border-radius:var(--r-md);padding:17px 20px;margin:0 0 22px;
  background:linear-gradient(150deg,rgba(var(--acc-rgb),.08),transparent)}
.c-cevap-et{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;
  color:var(--acc);margin-bottom:10px}
.c-cevap p{margin:0;font-size:15.6px;line-height:1.76;color:var(--fg)}
.c-rakam{float:right;width:210px;margin:4px 0 18px 26px;border-left:2px solid var(--acc);padding-left:16px}
.c-rakam b{display:block;font-family:var(--mono);font-size:32px;color:var(--acc);letter-spacing:-.03em;line-height:1}
.c-rakam span{display:block;margin-top:8px;font-size:12.6px;color:var(--muted);line-height:1.55}
@media(max-width:700px){.c-rakam{float:none;width:auto;margin:18px 0}}

/* ===== DÜZEN D ===== */
.d-bolum h2{font-size:clamp(21px,2.9vw,28px);letter-spacing:-.03em;line-height:1.25;margin:40px 0 0}
.d-bolum:first-child h2{margin-top:0}
.d-metin{max-width:760px}
.d-bant{margin:32px calc(-1 * clamp(22px,3.4vw,46px));padding:0}
.d-yer{aspect-ratio:16/6.4;border-block:1px solid rgba(var(--pink),.3);
  background:repeating-linear-gradient(135deg,rgba(255,45,155,.05) 0 12px,transparent 12px 24px),var(--bg-3);
  display:grid;place-content:center;text-align:center;gap:9px;padding:22px}
.d-et{font-family:var(--mono);font-size:10.4px;letter-spacing:.15em;color:var(--pink)}
.d-yer b{font-size:clamp(15px,2vw,19px);letter-spacing:-.02em}
.d-yer p{margin:0;font-size:13px;color:var(--fg-dim);line-height:1.7}

/* gövde metni: sitenin kendi .yz-govde kuralları geçerli olsun */
.cerceve .yz-govde,.a-sutun,.b-metin,.c-govde,.d-metin{font-size:15.6px}
.b-metin h3,.c-govde h3,.d-metin h3,.a-sutun h3{font-size:clamp(17px,2.1vw,20px);letter-spacing:-.02em;margin:30px 0 10px}
.b-metin h4,.c-govde h4,.d-metin h4,.a-sutun h4{font-size:15.6px;margin:22px 0 8px;color:var(--fg-dim)}
.alt{border-top:1px solid var(--hair);padding:26px 0 60px;color:var(--muted);font-size:13px;line-height:1.75}
</style>
</head>
<body data-dal="seo">

<div class="kap">
  <header class="ust">
    <span class="et">İç belge · noindex · karar sayfası</span>
    <h1>Blog detay sayfasının içi — beş düzen</h1>
    <p>Aynı yazı, beş farklı iç düzenle. Metin birebir aynı: <b>/blog/e-ticaret-seo/</b> yazısının
    gerçek içeriği. Fark yalnız düzende — yoksa karşılaştırma dürüst olmaz.</p>
    <p class="not">Renkler, tipografi ve bileşenler sitenin kendi <code>tm.css</code> dosyasından geliyor;
    bu sayfa için hiçbir renk uydurulmadı. Sayfa <code>data-dal="seo"</code> olduğu için vurgu rengi lime.</p>

    <div class="olc">
      ${OLCUM.map(([ad, sayi, aciklama]) => `<div><div class="ad">${ad}</div><b>${sayi}</b><p>${aciklama}</p></div>`).join('\n      ')}
    </div>
  </header>
</div>

<div class="sek">
  <div class="kap"><div class="sek-ic" role="tablist" aria-label="Düzen seçimi">
    ${DUZENLER.map((d, i) => `<button role="tab" aria-selected="${i === 0}" aria-controls="p${d.k}" id="s${d.k}"><i>${d.k}</i>${d.ad}</button>`).join('\n    ')}
  </div></div>
</div>

<div class="kap">
${DUZENLER.map((d, i) => `
  <section class="pnl${i === 0 ? ' acik' : ''}" id="p${d.k}" role="tabpanel" aria-labelledby="s${d.k}">
    <div class="pnl-bas">
      <div class="arti"><div class="b">Neyi çözüyor</div><p>${d.artisi}</p></div>
      <div class="eksi"><div class="b">Neyi çözmüyor</div><p>${d.eksisi}</p></div>
      <div class="mal"><div class="b">Maliyet</div><p>${d.maliyet}</p></div>
    </div>
    <div class="cerceve"><div class="ic">
      <div class="sahte-bas">
        <div class="yz-ust"><span class="yz-kat">${D.kat}</span><span class="yz-meta">${D.meta}</span></div>
        <h2 class="b1">${D.basmatik}</h2>
        <p class="ozet">${D.ozet}</p>
      </div>
      ${d.html}
    </div></div>
  </section>`).join('\n')}

  <footer class="alt">
    Üretici: <code>plan/blog-ic-tasarim-uret.js</code> · içerik <code>plan/blog-ornek.json</code>
    (<code>plan/blog-icerik-cikar.js</code> ile gerçek sayfadan çıkarıldı) ·
    ölçümler <code>plan/blog-govde-teshis.js</code> ve <code>plan/blog-ritim-olc.js</code>.<br>
    Bu bir karar sayfası; hiçbir düzen henüz uygulanmadı.
  </footer>
</div>

<script>
(function(){
  var sekmeler = [].slice.call(document.querySelectorAll('.sek button'));
  var paneller = [].slice.call(document.querySelectorAll('.pnl'));
  sekmeler.forEach(function(b, i){
    b.addEventListener('click', function(){
      sekmeler.forEach(function(x){ x.setAttribute('aria-selected','false'); });
      paneller.forEach(function(p){ p.classList.remove('acik'); });
      b.setAttribute('aria-selected','true');
      paneller[i].classList.add('acik');
      /* B düzeninde sahne çizimini yeniden tetikle */
      paneller[i].querySelectorAll('.ciz-kutu svg').forEach(function(s){
        var k = s.cloneNode(true); s.parentNode.replaceChild(k, s);
      });
      window.scrollTo({top: document.querySelector('.sek').offsetTop - 4, behavior:'smooth'});
    });
  });
})();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'blog-ic-tasarim.html'), SAYFA);
console.log(`\n  yazıldı: plan/blog-ic-tasarim.html  (${(SAYFA.length / 1024).toFixed(1)} KB)`);
console.log(`  düzen  : ${DUZENLER.length}  ·  bölüm: ${bolumler.length}  ·  öge: ${D.ogeler.length}\n`);
