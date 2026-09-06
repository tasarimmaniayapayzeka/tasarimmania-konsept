/* GEO onarım — Aşama 17: /blog/ ve /teklif/ liste yapısı
 *
 * Rehberin 01. bölümü "Ordered / Unordered Lists" istiyor. Madde madde
 * denetimde ölçüldü: 77 sayfanın 75'inde liste var, ikisinde yok —
 * /blog/ (42 kartlık ızgara) ve /teklif/ (5 adımlı sihirbaz).
 * İkisi de aslında LİSTE; yalnız div/a ile kurulmuşlar.
 *
 * ⚠ SÜZGEÇ TUZAĞI (uygulamadan önce ölçüldü): blog süzgeci
 *   `document.querySelectorAll('.bl-k')` ile kartları bulup `k.hidden = true`
 *   yapıyor. Kartı <li> içine alıp JS'i olduğu gibi bırakırsam <li> yerinde
 *   kalır ve ızgarada BOŞ DELİK açılır. Bu yüzden data-kat ve hidden
 *   <li>'ye taşınıyor, JS seçicisi .bl-i oluyor.
 *
 * ⚠ IZGARA ÇOCUĞU DEĞİŞİYOR: .bl-izgara bir grid; şimdiye kadar grid çocuğu
 *   .bl-k idi, artık .bl-i olacak. Kartın kutuyu doldurması için
 *   .bl-i{display:flex} + .bl-k{flex:1} gerekiyor, yoksa kartlar farklı
 *   yükseklikte kalır.
 *
 * ⚠ blog-kaydet.js DE GÜNCELLENİR: yeni yazı eklerken eski <a> kalıbını
 *   üretmeye devam ederse liste bozulur. Üç deseni var (bul / üret / sırala).
 *
 * Kullanım: node plan/geo-onar-17-liste-yapisi.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

const rapor = [];
const yazilacak = new Map();

/* ═══ 1. /blog/ — ızgara → <ul>/<li> ═══ */
{
  const f = path.join(S, 'blog', 'index.html');
  let h = fs.readFileSync(f, 'utf8');

  if (/<ul class="bl-izgara"/.test(h)) rapor.push(['/blog/', 'zaten liste yapısında, atlandı']);
  else {
    /* kap: div → ul */
    h = h.replace('<div class="bl-izgara" id="izgara">', '<ul class="bl-izgara" id="izgara">');
    /* kapanış </div>'i: ızgaranın hemen sonrasındaki, "bos" paragrafından önceki */
    const bosIdx = h.indexOf('<p class="bl-bos"');
    const kapanis = h.lastIndexOf('</div>', bosIdx);
    h = h.slice(0, kapanis) + '</ul>' + h.slice(kapanis + '</div>'.length);

    /* her kartı <li> ile sar; data-kat karta değil li'ye */
    /* ⚠ SATIR SONU CRLF — ölçüldü: çalışma kopyasında 985 CRLF, 0 LF
       (git autocrlf). Desende düz "\n" kullanmak HİÇBİR ŞEY EŞLEŞTİRMEZ;
       ilk koşuda "0 kart" çıktı. Tüm satır sonları \r?\n ile yazılıyor ve
       dosyanın kendi satır sonu korunuyor. */
    const SS = h.includes('\r\n') ? '\r\n' : '\n';
    let kart = 0;
    h = h.replace(/( {8})<a class="bl-k rv" data-kat="([^"]*)"([^>]*)>([\s\S]*?)\r?\n {8}<\/a>\r?\n/g,
      (t, girinti, kat, kalan, ic) => {
        kart++;
        return `${girinti}<li class="bl-i" data-kat="${kat}">${SS}`
          + `${girinti}  <a class="bl-k rv"${kalan}>${ic}${SS}${girinti}  </a>${SS}`
          + `${girinti}</li>${SS}`;
      });

    /* süzgeç JS'i: .bl-k yerine .bl-i */
    const eskiJs = `var kartlar = [].slice.call(document.querySelectorAll('.bl-k'));`;
    if (h.includes(eskiJs)) {
      h = h.replace(eskiJs,
        `/* .bl-i = <li> sarmalı. Kartın kendisini gizlemek yetmez; <li> yerinde\n`
        + `           kalıp ızgarada boş delik açar — ölçüldü. */\n`
        + `  var kartlar = [].slice.call(document.querySelectorAll('.bl-i'));`);
    } else rapor.push(['/blog/', '⚠ süzgeç JS deseni bulunamadı — elle bakılmalı']);

    /* CSS */
    const css = `.bl-izgara{list-style:none;padding:0;margin:0}
.bl-i{display:flex}
.bl-i>.bl-k{flex:1}`;
    if (!/\.bl-i\{/.test(h)) h = h.replace('.bl-k{display:flex', css + '\n.bl-k{display:flex');

    yazilacak.set(f, h);
    rapor.push(['/blog/', `${kart} kart <li> ile sarıldı · div→ul · süzgeç .bl-i'ye taşındı · CSS eklendi`]);
  }
}

/* ═══ 2. /teklif/ — adım göstergesi → <ol> ═══ */
{
  const f = path.join(S, 'teklif', 'index.html');
  let h = fs.readFileSync(f, 'utf8');
  const once = h;

  if (/<ol class="shr-ray"/.test(h)) rapor.push(['/teklif/', 'zaten <ol>, atlandı']);
  else {
    /* Adım göstergesi: 5 numaralı adım. ARIA ile role="list"/"listitem"
       verilmiş ama gerçek eleman <div>. Adımlar SIRALI olduğu için <ol>
       doğru karşılık; native elemanda ARIA rolleri gereksizleşir ve
       kaldırılır (fazladan ARIA, eksik ARIA kadar sorunlu).
       ⚠ JS güvenli: $('#shrRay').children ve .style.display kullanıyor,
         eleman adına bakmıyor — ölçüldü. */
    h = h.replace('<div class="shr-ray" id="shrRay" role="list">', '<ol class="shr-ray" id="shrRay">');
    let adim = 0;
    h = h.replace(/<div data-no="(\d)"([^>]*?)\s*role="listitem"\s*>([^<]*)<\/div>/g,
      (t, no, kalan, metin) => { adim++; return `<li data-no="${no}"${kalan}>${metin}</li>`; });
    /* ızgara kabının kapanışı: shr-govde'den önceki son </div> */
    const govdeIdx = h.indexOf('<form class="shr-govde"');
    const kapanis = h.lastIndexOf('</div>', govdeIdx);
    if (kapanis > 0) h = h.slice(0, kapanis) + '</ol>' + h.slice(kapanis + '</div>'.length);

    /* CSS: div seçicileri li'yi de kapsasın + ol varsayılanları sıfırlansın */
    h = h.replace(/\.shr-ray div\b/g, '.shr-ray li');
    h = h.replace('.shr-ray{display:flex;', '.shr-ray{list-style:none;margin:0;padding:0;display:flex;');

    rapor.push(['/teklif/', `${adim} adım <li> oldu · div→ol · gereksiz ARIA rolleri kaldırıldı · CSS seçicileri güncellendi`]);
  }
  if (h !== once) yazilacak.set(f, h);
}

/* ═══ 3. blog-kaydet.js — yeni kartlar da <li> üretsin ═══ */
{
  const f = path.join(__dirname, 'blog-kaydet.js');
  let s = fs.readFileSync(f, 'utf8');
  const once = s;

  s = s.replace(
    'const eskiKart = new RegExp(` {8}<a class="bl-k rv"[^>]*href="\\\\./${C.slug}/"[\\\\s\\\\S]*?<\\\\/a>\\n`);',
    'const eskiKart = new RegExp(` {8}<li class="bl-i"[\\\\s\\\\S]*?href="\\\\./${C.slug}/"[\\\\s\\\\S]*?<\\\\/li>\\n`);');

  s = s.replace(
    '`        <a class="bl-k rv" data-kat="${kacir(kategori)}" style="--k:${renk}" href="./${C.slug}/">',
    '`        <li class="bl-i" data-kat="${kacir(kategori)}">\n          <a class="bl-k rv" style="--k:${renk}" href="./${C.slug}/">');

  s = s.replace(
    'const kartlar = [...dizin.matchAll(/ {8}<a class="bl-k rv"[\\s\\S]*?<\\/a>\\n/g)];',
    'const kartlar = [...dizin.matchAll(/ {8}<li class="bl-i"[\\s\\S]*?<\\/li>\\n/g)];');

  if (s !== once) { yazilacak.set(f, s); rapor.push(['blog-kaydet.js', 'üç desen <li> yapısına güncellendi']); }
  else rapor.push(['blog-kaydet.js', '⚠ desenler eşleşmedi — elle bakılmalı']);
}

console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);
rapor.forEach(([n, m]) => console.log(`  ${n.padEnd(18)} ${m}`));
if (UYGULA) for (const [f, c] of yazilacak) fs.writeFileSync(f, c, 'utf8');
console.log(`\n  ${yazilacak.size} dosya ${UYGULA ? 'yazıldı' : 'yazılacak'}`);
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
