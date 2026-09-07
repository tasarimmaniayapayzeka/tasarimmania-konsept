/* v2 MAKETLERİ — maket görseline BİREBİR (kullanıcı kararı, 7 Eyl 2026)
 *
 * Maketten birebir alınanlar:
 *   · ürün kartları AÇIK zeminde (beyaz/gri kutu), koyu ürün çizimi üstünde
 *   · sarı yıldız sıraları
 *   · sağ üstte YÜZEN "Organik Trafik +%278 son 6 ay" kartı + yeşil grafik
 *   · el yazısı "Daha fazla görünürlük / Daha fazla satış" + kıvrık ok
 *   · altta hap biçimli arama çubuğu "En iyi spor ayakkabı…" + yeşil ok
 *   · ürün detayı: sol küçük görsel rayı, büyük görsel, yıldız + yeşil
 *     ilerleme çubukları, dolu yeşil "Sepete Ekle", kalp
 *
 * Ürünler SVG çizim (ayakkabı/ceket/kulaklık) — fotoğraf dosyası yok;
 * gölge ve degradeyle maketteki ürün fotoğrafı hissine yaklaştırıldı.
 */

const AYAKKABI = `<svg viewBox="0 0 96 64" fill="none" aria-hidden="true">
  <defs><linearGradient id="ayk" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FDFDFD"/><stop offset="1" stop-color="#D8DCE1"/></linearGradient></defs>
  <ellipse cx="48" cy="56" rx="34" ry="4" fill="#000" opacity=".14"/>
  <path d="M10 46c0-9 2-16 5-20 2-3 5.6-3.8 8-1.6l7 6.4 8-5.6c2.4-1.7 5.7-.9 7 1.7l3 5.6c1 2 3 3.3 5.2 3.6l22 3.2c6.6.9 11.4 5.2 11.4 10.3v3.2c0 2.4-2 4.2-4.5 4.2H14.5C12 57 10 55.2 10 52.8z" fill="url(#ayk)"/>
  <path d="M10 48.5h76.4" stroke="#B7BDC6" stroke-width="2"/>
  <path d="M30 31l5 6.6M38 26.5l4.6 6.2M46 24.8l3.6 5.4" stroke="#9AA1AB" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M13 53h71" stroke="#fff" stroke-width="1.4" opacity=".8"/>
</svg>`;

const CEKET = `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
  <defs><linearGradient id="ckt" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#20402C"/><stop offset="1" stop-color="#12281B"/></linearGradient></defs>
  <ellipse cx="40" cy="74" rx="26" ry="3" fill="#000" opacity=".16"/>
  <path d="M29 9l11 9 11-9 11 5c3.8 1.7 6.3 5.5 6.3 9.7V68a3 3 0 01-3 3H14.7a3 3 0 01-3-3V23.7c0-4.2 2.5-8 6.3-9.7z" fill="url(#ckt)"/>
  <path d="M40 18v53M29 9l11 9-5.4 7.6L26 14zM51 9l-11 9 5.4 7.6L54 14z" stroke="#0B1810" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M23 34v26M57 34v26" stroke="#0B1810" stroke-width="1.2" opacity=".6"/>
</svg>`;

const KULAKLIK = `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
  <defs><linearGradient id="klk" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2A2E36"/><stop offset="1" stop-color="#14171D"/></linearGradient></defs>
  <ellipse cx="40" cy="73" rx="24" ry="3" fill="#000" opacity=".16"/>
  <path d="M15 52V40a25 25 0 0150 0v12" stroke="url(#klk)" stroke-width="6" stroke-linecap="round"/>
  <rect x="8" y="46" width="17" height="26" rx="7" fill="url(#klk)"/>
  <rect x="55" y="46" width="17" height="26" rx="7" fill="url(#klk)"/>
  <rect x="11" y="49" width="4" height="20" rx="2" fill="#3A404B"/>
</svg>`;

const ARAMA_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6" stroke-linecap="round"/></svg>`;
const OK_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SEPET_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>`;
const KALP_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0112 8a4.4 4.4 0 017.5 2.4C19.5 15.3 12 20 12 20z" stroke-linejoin="round"/></svg>`;

const yildiz = (dolu) => `<div class="mk-yildiz">${[1, 2, 3, 4, 5].map((n) => `<i${n > dolu ? ' class="bos"' : ''}></i>`).join('')}</div>`;

/* ── 1) TARAYICI MAKETİ — maketin üst bloğu ── */
function tarayici(t) {
  const urun = (ikon, dolu) => `<div class="mk-urun">
            <div class="mk-gorsel">${ikon}</div>
            ${yildiz(dolu)}
            <div class="mk-satir u"></div><div class="mk-satir k"></div>
          </div>`;
  /* Maketteki dizilim SIRAYLA: üst bantta solda iskelet+\"Ürünler\", sağda
     yeşil çerçeveli grafik kartı; altında üç ürün; sağ altta el yazısı not
     + kıvrık ok; en altta hap arama çubuğu. position:absolute YOK — bant
     flex, taşma/çakışma üretmez, dar ekranda da maketteki gibi durur. */
  return `<div class="mk">
        <div class="mk-bar"><i></i><i></i><i></i><u></u></div>
        <div class="mk-ic">
          <div class="mk-band">
            <div class="mk-band-sol">
              <div class="mk-satir o"></div>
              <div class="mk-satir k"></div>
              <p class="mk-etiket">Ürünler</p>
            </div>
            <div class="mk-olcum">
              <u>${t.olcumEtiket}</u>
              <b>${t.olcumDeger}</b>
              <span>${t.olcumAlt}</span>
              <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
                <path class="mk-cizgi" d="M2 36 L28 30 L52 33 L78 22 L104 25 L130 14 L156 17 L186 4"/>
                <path class="mk-ok" d="M186 4 l-9 1.6 6 5.4z"/>
              </svg>
            </div>
          </div>
          <div class="mk-urunler">
            ${urun(AYAKKABI, 5)}
            ${urun(CEKET, 4)}
            ${urun(KULAKLIK, 5)}
          </div>
          ${t.not ? `<div class="mk-not">
            <svg viewBox="0 0 44 46" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M42 4C26 6 10 16 6 34" stroke-linecap="round"/>
              <path d="M4 42l1.5-9 8 4z" fill="currentColor" stroke="none"/>
            </svg>
            <p>${t.not}</p>
          </div>` : ''}
          <div class="mk-arama">
            ${ARAMA_IKON}
            <u>${t.arama}</u>
            <b>${OK_IKON}</b>
          </div>
        </div>
      </div>`;
}

/* ── 2) ÜRÜN DETAY MAKETİ — maketin 01 bölümü ── */
function urunDetay({ puan }) {
  return `<div class="mk mk-duz">
        <div class="mk-ic">
          <div class="mk-detay">
            <div class="mk-kucuk">
              <div class="mk-gorsel">${AYAKKABI}</div>
              <div class="mk-gorsel">${AYAKKABI}</div>
              <div class="mk-gorsel">${AYAKKABI}</div>
            </div>
            <div class="mk-buyuk">${AYAKKABI}</div>
            <div class="mk-bilgi">
              <div class="mk-satir u"></div>
              <div class="mk-satir o"></div>
              <div class="mk-degeri">${yildiz(puan)}<div class="mk-satir ac" style="width:56%"></div></div>
              <div class="mk-satir k"></div>
              <div class="mk-alt">
                <div class="mk-sepet">${SEPET_IKON}Sepete Ekle</div>
                <div class="mk-kalp">${KALP_IKON}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
}

/* ── 3) SAHNE MAKETİ ── */
function sahne(s) {
  return `<div class="mk">
        <div class="mk-bar"><i></i><i></i><i></i><u></u></div>
        <div class="ciz-svg" style="padding:14px">
          <svg viewBox="0 0 430 210" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${s.svg}</svg>
        </div>
        <div class="ciz-alt">${s.cipler.map((c) => `<div class="ciz-cip"><u>${c.u}</u><b data-sayac="${c.s}" data-birim="${c.birim}">0${c.birim}</b></div>`).join('')}</div>
      </div>`;
}

module.exports = { tarayici, urunDetay, sahne, AYAKKABI, CEKET, KULAKLIK };
