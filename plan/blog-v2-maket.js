/* v2 MAKETLERİ — saf SVG/CSS arayüz çizimleri (fotoğraf değil)
 *
 * Referanstaki maketler: tarayıcı penceresi + ürün ızgarası + yüzen ölçüm
 * kartı + arama çubuğu, ve ürün detay kartı (küçük görsel rayı + büyük
 * görsel + değerlendirme çubukları + sepet düğmesi).
 *
 * ⚠ ÜRÜN GÖRSELLERİ ÇİZİM. Gerçek ürün fotoğrafı kullanılmıyor: telif
 *   ve "temsilî görsel" sorunu doğurur, üstelik 84 sayfa × 2 dil için
 *   kopya üretmek gerekirdi. Siluetler tek renk SVG; sayfanın vurgu
 *   rengiyle uyumlu, dil ayrımı kuralına da takılmıyor (dosya yok).
 */

const AYAKKABI = `<svg viewBox="0 0 64 40" fill="none" aria-hidden="true">
  <path d="M6 30c0-6 1-11 3-14 1.5-2.3 4-3 5.8-1.6L20 18l5-3.5c1.6-1.1 3.7-.6 4.6 1.1l2 3.6c.7 1.2 1.9 2 3.3 2.2l16 2.3c4.4.6 7.6 3.5 7.6 6.9V32c0 1.7-1.4 3-3.1 3H9.1C7.4 35 6 33.7 6 32z" fill="currentColor" opacity=".82"/>
  <path d="M6 31h51.5" stroke="#0B0D12" stroke-width="1.6"/>
  <path d="M20 18l3.4 4.6M26 15.2l3.2 4.4" stroke="#0B0D12" stroke-width="1.3" opacity=".55"/>
</svg>`;

const CEKET = `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <path d="M24 8l8 7 8-7 9 4c3 1.3 5 4.3 5 7.6V56a2 2 0 01-2 2H12a2 2 0 01-2-2V19.6c0-3.3 2-6.3 5-7.6z" fill="currentColor" opacity=".8"/>
  <path d="M32 15v43M24 8l8 7-4 6-6-9zM40 8l-8 7 4 6 6-9z" stroke="#0B0D12" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`;

const KULAKLIK = `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <path d="M12 40V32a20 20 0 0140 0v8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <rect x="6" y="36" width="13" height="20" rx="5" fill="currentColor" opacity=".85"/>
  <rect x="45" y="36" width="13" height="20" rx="5" fill="currentColor" opacity=".85"/>
</svg>`;

const ARAMA_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6" stroke-linecap="round"/></svg>`;
const OK_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SEPET_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>`;
const KALP_IKON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0112 8a4.4 4.4 0 017.5 2.4C19.5 15.3 12 20 12 20z" stroke-linejoin="round"/></svg>`;

const yildiz = (dolu) => `<div class="mk-yildiz">${[1, 2, 3, 4, 5].map((n) => `<i${n > dolu ? ' class="bos"' : ''}></i>`).join('')}</div>`;

/* ── 1) TARAYICI MAKETİ: ürün ızgarası + yüzen ölçüm kartı + arama ── */
function tarayici({ olcumEtiket, olcumDeger, olcumAlt, not, arama }) {
  const urun = (ikon, dolu) => `<div class="mk-urun">
            <div class="mk-gorsel">${ikon}</div>
            ${yildiz(dolu)}
            <div class="mk-satir u"></div><div class="mk-satir k"></div>
          </div>`;
  return `<div class="mk">
        <div class="mk-bar"><i></i><i></i><i></i><u></u></div>
        <div class="mk-ic">
          <div class="mk-satir o"></div>
          <div class="mk-urunler">
            ${urun(AYAKKABI, 5)}
            ${urun(CEKET, 4)}
            ${urun(KULAKLIK, 5)}
          </div>
          <div class="mk-arama">
            ${ARAMA_IKON}
            <u>${arama}</u>
            <b>${OK_IKON}</b>
          </div>
        </div>
        <div class="mk-olcum">
          <u>${olcumEtiket}</u>
          <b>${olcumDeger}</b>
          <span>${olcumAlt}</span>
          <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
            <path class="mk-cizgi" d="M2 36 L28 30 L52 33 L78 22 L104 25 L130 14 L156 17 L186 4"/>
            <path class="mk-ok" d="M186 4 l-9 1.6 6 5.4z"/>
          </svg>
        </div>
        ${not ? `<div class="mk-not">
          <svg viewBox="0 0 44 46" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M42 4C26 6 10 16 6 34" stroke-linecap="round"/>
            <path d="M4 42l1.5-9 8 4z" fill="currentColor" stroke="none"/>
          </svg>
          <p>${not}</p>
        </div>` : ''}
      </div>`;
}

/* ── 2) ÜRÜN DETAY MAKETİ ── */
function urunDetay({ puan }) {
  return `<div class="mk">
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
              ${yildiz(puan)}
              <div class="mk-satir ac" style="width:64%"></div>
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

/* ── 3) SAHNE MAKETİ: mevcut .ciz-kutu çizimini v2 kabuğunda göster ── */
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
