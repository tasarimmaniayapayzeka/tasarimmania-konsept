/* ÇIPLAK METİN DÜĞÜMLERİNİ <p> İLE SAR
 *
 * Kullanım: node plan/paragraf-sar.js [--uygula] [--tek <slug>]
 *
 * HATA: blog gövdesinde metnin %95'i doğrudan <article class="yz-govde">
 * altında, hiçbir etikete sarılmadan duruyor. Yazı başına ~38 çıplak düğüm.
 * Sonuç: paragraf boşluğu yok (.yz-govde p{margin:0 0 16px} hiç uygulanmıyor),
 * satır uzunluğu ve renk kuralları uygulanmıyor, anlamsal karşılık yok.
 *
 * ⚠ SATIR BAZLI SARMA YANLIŞ OLUR. Bir "paragraf" kaynakta birden çok
 *   satıra bölünmüş olabilir ve içinde <a>, <strong>, <b> gibi SATIR İÇİ
 *   etiketler bulunur — bunlar paragrafın İÇİNDE kalmalı. Bu yüzden metin
 *   DÜZEY BLOK etiketlerine göre bölünüyor, aralarda kalan parça tek bir
 *   paragraf sayılıyor.
 *
 * ⚠ İÇ İÇE AYNI ETİKET. <div class="yz-cevap"> içinde <div> olabilir;
 *   kapanışı saymadan bulmak bloğu erken kapatır. Dengeli kapanış aranıyor.
 *
 * ⚠ BOŞ/KISA PARÇA SARILMAZ. Etiketler arasındaki satır sonu + girinti
 *   boşlukları metin sayılmamalı; 40 karakterin altındaki parçalar
 *   (tire, tarih, tek kelime) olduğu gibi bırakılıyor ve raporlanıyor.
 *
 * GERİ ALMA: değişiklik yalnız <article class="yz-govde"> içinde ve yalnız
 * ekleme (<p>…</p>) biçiminde. Betik kendi çıktısını tanır (zaten sarılmış
 * parçayı tekrar sarmaz), üst üste koşulabilir.
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');
const TEK = process.argv.includes('--tek') ? process.argv[process.argv.indexOf('--tek') + 1] : null;

/* üst düzeyde blok sayılan etiketler */
const BLOK = /<(?:(h2|h3|h4|h5|p|ol|ul|table|pre)\b|(div|figure|blockquote|aside|section|details) [^>]*class="([^"]+)")/g;

function kapanisBul(s, i, etiket) {
  const ac = new RegExp(`<${etiket}\\b`, 'g'), kap = new RegExp(`</${etiket}>`, 'g');
  let derinlik = 1, p = i + 1;
  while (derinlik > 0) {
    ac.lastIndex = p; kap.lastIndex = p;
    const a = ac.exec(s), k = kap.exec(s);
    if (!k) return s.length;
    if (a && a.index < k.index) { derinlik++; p = a.index + 1; }
    else { derinlik--; p = k.index + 1; if (!derinlik) return k.index + `</${etiket}>`.length; }
  }
  return s.length;
}

/* bir gövdeyi işle → {yeni, sarilan, atlanan} */
function isle(govde) {
  let cikti = '', sonSon = 0, sarilan = 0; const atlanan = [];
  BLOK.lastIndex = 0;
  let m;
  const ekle = (ham) => {
    const t = ham.trim();
    if (!t) { cikti += ham; return; }
    const yalin = t.replace(/<[^>]+>/g, '').trim();
    /* ⚠ SADECE UZUNLUK EŞİĞİ YETMEDİ. 40 karakter sınırı, listeye giriş
     *   yapan kısa ama GERÇEK cümleleri dışarıda bıraktı ("Testi dört adımda
     *   kurabilirsiniz:" — 33 karakter). Ölçüt uzunluk değil CÜMLE OLMA:
     *   en az 3 kelime VE cümle bitiren bir işaretle bitiyorsa paragraftır. */
    const cumleMi = yalin.split(/\s+/).length >= 3 && /[.:!?]$/.test(yalin);
    if (yalin.length < 40 && !cumleMi) { atlanan.push(yalin.slice(0, 50)); cikti += ham; return; }
    /* girintiyi koru: ham'ın baştaki boşluğu + <p> + gövde + </p> */
    const onBosluk = ham.match(/^\s*/)[0];
    const arkaBosluk = ham.match(/\s*$/)[0];
    cikti += `${onBosluk}<p>${t}</p>${arkaBosluk}`;
    sarilan++;
  };
  while ((m = BLOK.exec(govde))) {
    ekle(govde.slice(sonSon, m.index));
    const etiket = m[1] || m[2];
    const son = kapanisBul(govde, m.index, etiket);
    cikti += govde.slice(m.index, son);
    sonSon = son; BLOK.lastIndex = son;
  }
  ekle(govde.slice(sonSon));
  return { yeni: cikti, sarilan, atlanan };
}

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

let hepsi = [...tara(path.join(S, 'blog')), ...tara(path.join(S, 'en', 'blog'))];
if (TEK) hepsi = hepsi.filter((f) => yol(f).includes(TEK));

let toplamSarilan = 0, dokunulan = 0; const atlananHepsi = []; const raporlar = [];
for (const f of hepsi) {
  const h = fs.readFileSync(f, 'utf8');
  const m = h.match(/(<article class="yz-govde">)([\s\S]*?)(<\/article>)/);
  if (!m) { raporlar.push(`${yol(f)}  GÖVDE YOK`); continue; }
  const { yeni, sarilan, atlanan } = isle(m[2]);
  atlananHepsi.push(...atlanan);
  if (!sarilan) continue;
  toplamSarilan += sarilan; dokunulan++;
  if (UYGULA) fs.writeFileSync(f, h.replace(m[0], m[1] + yeni + m[3]));
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU (yazılmadı)'}\n`);
console.log(`  taranan yazı        : ${hepsi.length}`);
console.log(`  dokunulan yazı      : ${dokunulan}`);
console.log(`  <p> ile sarılan     : ${toplamSarilan}`);
console.log(`  sarılmayan kısa parça: ${atlananHepsi.length}  (40 karakterden kısa — tire, tarih, tek kelime)`);
if (atlananHepsi.length) console.log(`    örnek: ${[...new Set(atlananHepsi)].slice(0, 5).map((s) => JSON.stringify(s)).join(' · ')}`);
if (raporlar.length) console.log(`  SORUN: ${raporlar.join(', ')}`);
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
