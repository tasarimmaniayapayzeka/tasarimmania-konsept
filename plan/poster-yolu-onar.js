/* DÖNGÜ VİDEOSU POSTER YOLU ONARIMI
 *
 * Kullanım: node plan/poster-yolu-onar.js [--uygula]
 *
 * HATA: .akv bileşeninde <video poster="../../../../assets/..."> yazılmış,
 * aynı öğenin <source src="../../assets/..."> yolu ise doğru. Poster dört kat
 * yukarı çıkıyor, video iki kat.
 *
 * ⚠ NEDEN YEREL SUNUCUDA GÖRÜNMÜYOR: Node statik sunucusu (ve tarayıcı)
 *   kökün üstüne çıkan `../` adımlarını KÖKTE DURDURUR. Yani yerelde
 *   /site/x/../../../../assets/y  →  /assets/y  olur ve 200 döner.
 *   GitHub Pages'te site bir ALT DİZİNDE (/tasarimmania-konsept/) durduğu
 *   için aynı yol depo kökünün DIŞINA çıkar ve 404 verir. Ölçüldü:
 *     yerel  poster 200 · video 200
 *     CANLI  poster 404 · video 200
 *   Yani hata yalnız canlıda görünür; "bende çalışıyor" burada yanıltır.
 *
 * ETKİSİ: video yüklenene kadar poster yerine boş/siyah kare görünüyor.
 *
 * DÜZELTME: poster yolu, AYNI öğenin <source src> yolundan türetilir.
 * Sabit bir derinlik yazılmaz — sayfa derinliği değişebilir, kaynak
 * yolu zaten doğru olduğu için tek doğruluk kaynağı odur.
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* <video …poster="X"…> … <source src="Y"> ikilisini birlikte yakala */
const VIDEO = /<video([^>]*?)poster="([^"]+)"([^>]*)>([\s\S]*?)<\/video>/g;

let dokunulan = 0, duzeltilen = 0, zatenDogru = 0, eslesmeyen = [];
const ornekler = [];

for (const f of tara(S)) {
  let h = fs.readFileSync(f, 'utf8'), degisti = false;
  h = h.replace(VIDEO, (tam, onc, poster, son, ic) => {
    const kaynak = (ic.match(/<source\s+src="([^"]+)"/) || [])[1];
    if (!kaynak) { eslesmeyen.push(yol(f) + ' (source yok)'); return tam; }
    /* poster = kaynağın uzantısı değiştirilmiş hâli, dizin AYNI */
    const dogru = kaynak.replace(/\.(mp4|webm|mov)$/i, '') + path.extname(poster);
    if (dogru === poster) { zatenDogru++; return tam; }
    duzeltilen++; degisti = true;
    if (ornekler.length < 3) ornekler.push(`${yol(f)}\n      eski: ${poster}\n      yeni: ${dogru}`);
    return `<video${onc}poster="${dogru}"${son}>${ic}</video>`;
  });
  if (degisti) { dokunulan++; if (UYGULA) fs.writeFileSync(f, h); }
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU (yazılmadı)'}\n`);
console.log(`  poster'ı düzeltilen <video> : ${duzeltilen}`);
console.log(`  dokunulan sayfa             : ${dokunulan}`);
console.log(`  zaten doğru olan            : ${zatenDogru}`);
if (eslesmeyen.length) console.log(`  <source> bulunamayan        : ${eslesmeyen.length}\n    ` + eslesmeyen.join('\n    '));
if (ornekler.length) console.log(`\n  örnek:\n    ` + ornekler.join('\n    '));
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
