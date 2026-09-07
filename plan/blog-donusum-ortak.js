/* SSS / İLGİLİ / KÖPRÜ DÖNÜŞÜMLERİ — ORTAK MODÜL
 *
 * Hem v1 (yüzen/iki sütun) hem v2 (referans tasarım) betiği bu üç
 * dönüşümü kullanıyor. Tek kaynakta duruyor ki biri düzeltilince
 * öbürü eski hâlde kalmasın.
 *
 * rapor: çağıran betiğin dizisi; her fonksiyon ne yaptığını buraya yazar.
 */
module.exports = function (rapor) {
/* 3a) SSS akordiyonu → .sd dönen soru paneli */
function sssDonustur(html) {
  /* ⚠ İKİ ADIMLI REPLACE FAZLADAN </div> BIRAKIYORDU — ÖLÇÜLDÜ.
   *   İlk sürüm önce <details>'leri .sd ile değiştiriyor, sonra ikinci bir
   *   replace ile <div class="yz-sss"> AÇILIŞINI siliyordu — ama KAPANIŞI
   *   yerinde kalıyordu. etiket-denge.js yakaladı: 74 açılış / 75 kapanış.
   *   Doğrusu: sarmalayıcıyı DENGELİ kapanışıyla birlikte tek parça bulup
   *   tümünü değiştirmek. */
  const bas = html.search(/<div class="[^"]*\byz-sss\b[^"]*"[^>]*>/);
  if (bas < 0) { rapor.push('SSS: blok bulunamadı — DOKUNULMADI'); return html; }
  /* dengeli </div> ara */
  let derinlik = 0, i = bas, son = -1;
  const acRe = /<div\b/g, kapRe = /<\/div>/g;
  acRe.lastIndex = bas; kapRe.lastIndex = bas;
  while (true) {
    acRe.lastIndex = i; kapRe.lastIndex = i;
    const a = acRe.exec(html), k = kapRe.exec(html);
    if (!k) break;
    if (a && a.index < k.index) { derinlik++; i = a.index + 1; }
    else { derinlik--; i = k.index + 1; if (derinlik === 0) { son = k.index + 6; break; } }
  }
  if (son < 0) { rapor.push('SSS: kapanış bulunamadı — DOKUNULMADI'); return html; }
  const tamBlok = html.slice(bas, son);
  const m = [tamBlok, tamBlok];
  const sorular = [...m[1].matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)]
    .map((x) => ({ s: x[1].trim(), c: x[2].trim() }));
  if (!sorular.length) { rapor.push('SSS: <details> bulunamadı — DOKUNULMADI'); return html; }

  const sol = sorular.map((q, i) =>
    `        <button type="button" class="sd-soru${i === 0 ? ' acik' : ''}" role="tab" aria-selected="${i === 0}"><i>${String(i + 1).padStart(2, '0')}</i><span>${q.s}</span></button>`).join('\n');
  const sag = sorular.map((q, i) =>
    `        <div class="sd-cevap${i === 0 ? ' acik' : ''}" role="tabpanel"><h3>${q.s}</h3><p>${q.c}</p></div>`).join('\n');

  const yeni = `<div class="sd yz-sd rv d1" data-sd>
      <div class="sd-sol" role="tablist" aria-label="Sorular">
${sol}
      </div>
      <div class="sd-sag">
${sag}
        <div class="sd-alt">
          <div class="sd-cubuk"><i data-sd-cubuk></i></div>
          <a class="sd-wa" href="https://wa.me/905547916545" target="_blank" rel="noopener">Sorunuz mu var? WhatsApp&#8217;tan yazın</a>
        </div>
      </div>
    </div>`;
  rapor.push(`SSS: ${sorular.length} soru → .sd paneli`);
  return html.slice(0, bas) + yeni + html.slice(son);
}

/* 3b) İlgili yazılar ızgarası → .hrt akan bağlantı haritası */
function ilgiliDonustur(html) {
  /* ⚠ SINIF ADI TAM EŞLEŞME ARAMA. İlk sürüm `class="yz-ilgili"` yazıyordu;
   *   gerçek işaretleme `class="yz-ilgili rv"` (canlanma sınıfı ekli) ve blok
   *   hiç bulunamadı. Sınıf listesi içinde ARA. */
  const m = html.match(/(<nav class="[^"]*\byz-ilgili\b[^"]*"[^>]*>)([\s\S]*?)(<\/nav>)/);
  if (!m) { rapor.push('İlgili: blok bulunamadı — DOKUNULMADI'); return html; }
  /* başlık ve not korunuyor — bunlar içerik, kabuk değil */
  const baslik = (m[2].match(/<h2[^>]*>[\s\S]*?<\/h2>/) || [''])[0];
  const not = (m[2].match(/<p class="not">[\s\S]*?<\/p>/) || [''])[0];
  const kartlar = [...m[2].matchAll(/<li><a href="([^"]+)"([^>]*)><span class="kat">([^<]*)<\/span><span class="bas">([^<]*)<\/span><\/a><\/li>/g)]
    .map((x) => ({ href: x[1], stil: x[2], kat: x[3], bas: x[4] }));
  if (!kartlar.length) { rapor.push('İlgili: kart bulunamadı — DOKUNULMADI'); return html; }
  const n = kartlar.length;

  /* akış yolları: merkezden her karta bir eğri */
  const yuk = 70 * n;
  const yollar = kartlar.map((_, i) => {
    const y = (yuk / n) * (i + 0.5);
    return `M0,${yuk / 2} C48,${yuk / 2} 48,${y} 96,${y}`;
  });
  const svg = `<svg class="hrt-svg" viewBox="0 0 96 ${yuk}" preserveAspectRatio="none" aria-hidden="true">
        ${yollar.map((d) => `<path class="hrt-yol" d="${d}"/>`).join('\n        ')}
        ${yollar.map((d, i) => `<path class="hrt-akis${i ? ' g' + (i + 1) : ''}" d="${d}"/>`).join('\n        ')}
      </svg>`;

  const sag = kartlar.map((k) =>
    `          <a class="yk" href="${k.href}"${k.stil}><b>${k.bas}</b><span>${k.kat} kümesinden</span></a>`).join('\n');

  const yeni = `${baslik}
      ${not}
      <div class="hrt yz-hrt rv d1">
        <div class="hrt-ben"><i></i><b>BU YAZI</b><span>okuduğunuz sayfa</span></div>
        ${svg}
        <div class="hrt-sag">
${sag}
        </div>
      </div>`;
  rapor.push(`İlgili: ${n} kart → .hrt akan harita (başlık ve not korundu)`);
  return html.replace(m[0], m[1] + '\n      ' + yeni + '\n    ' + m[3]);
}

/* 3c) Hizmet köprüsü → .ac3 3D akışkan CTA bandı */
function kopruDonustur(html) {
  const m = html.match(/<aside class="yz-kopru"[^>]*>([\s\S]*?)<\/aside>/);
  if (!m) { rapor.push('Köprü: bulunamadı — DOKUNULMADI'); return html; }
  const bas = (m[1].match(/<b>([\s\S]*?)<\/b>/) || [])[1] || '';
  const met = (m[1].match(/<p>([\s\S]*?)<\/p>/) || [])[1] || '';
  const btnler = [...m[1].matchAll(/<a class="btn[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map((x) => ({ href: x[1], metin: x[2].replace(/<[^>]*>/g, '').trim() }));
  const dugmeler = btnler.length ? btnler : [{ href: '../../teklif/', metin: 'Teklif Al' }];

  const yeni = `<aside class="ara-cta">
      <div class="ac3-zemin" aria-hidden="true"></div>
      <div class="ac3-s s1" aria-hidden="true"></div>
      <div class="ac3-s s2" aria-hidden="true"></div>
      <div class="ara-cta-in">
        <p><b>${bas}</b><span>${met.replace(/<[^>]*>/g, '')}</span></p>
        <div class="ara-cta-btn">
${dugmeler.map((d, i) => `          <a class="btn ${i === 0 ? 'btn-p' : 'btn-g'} btn-sm" href="${d.href}">${d.metin}</a>`).join('\n')}
        </div>
      </div>
    </aside>`;
  rapor.push(`Köprü: → .ac3 3D bant (${dugmeler.length} düğme)`);
  return html.replace(m[0], yeni);
}


  return { sssDonustur, ilgiliDonustur, kopruDonustur };
};
