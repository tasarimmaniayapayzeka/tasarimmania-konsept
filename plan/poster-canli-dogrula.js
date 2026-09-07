/* HER <video poster> CANLI ADRESTE ÇÖZÜLÜYOR MU?
 *
 * Kullanım: node plan/poster-canli-dogrula.js [--canli]
 *
 * Varsayılan: dosya sisteminden çözer (hızlı, ağ gerekmez).
 * --canli   : GitHub Pages'e gerçekten istek atar.
 *
 * ⚠ YEREL SUNUCU YALAN SÖYLER. Kökün üstüne çıkan `../` adımlarını kökte
 *   durdurur; GitHub Pages site bir alt dizinde durduğu için durdurmaz.
 *   Bu yüzden çözüm burada YEREL SUNUCUYLA DEĞİL, depo kökü baz alınarak
 *   yapılıyor: `../` kökün üstüne taşarsa KIRIK sayılır.
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const CANLI = process.argv.includes('--canli');
const TABAN = 'https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept';

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* Depo kökünü aşan `../` var mı? */
function cozum(sayfaDosyasi, gorece) {
  const sayfaDizini = path.relative(KOK, path.dirname(sayfaDosyasi)).split(path.sep);
  const parcalar = gorece.split('/');
  const yigin = [...sayfaDizini];
  let tasti = false;
  for (const p of parcalar) {
    if (p === '..') { if (!yigin.length) { tasti = true; } else yigin.pop(); }
    else if (p !== '.' && p !== '') yigin.push(p);
  }
  return { tasti, mutlak: path.join(KOK, ...yigin), url: TABAN + '/' + yigin.join('/') };
}

const kayitlar = [];
for (const f of tara(S)) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/<video[^>]*?poster="([^"]+)"[^>]*>/g)) {
    kayitlar.push({ sayfa: yol(f), dosya: f, poster: m[1] });
  }
}

(async () => {
  let tasan = 0, yok = 0, tamam = 0, canliKirik = 0;
  for (const k of kayitlar) {
    const c = cozum(k.dosya, k.poster);
    if (c.tasti) { tasan++; k.durum = 'KÖKÜ AŞIYOR'; }
    else if (!fs.existsSync(c.mutlak)) { yok++; k.durum = 'DOSYA YOK'; }
    else { tamam++; k.durum = 'tamam'; }
    k.url = c.url;
  }
  console.log(`\n  <video poster> sayısı : ${kayitlar.length}`);
  console.log(`  depo kökünü AŞAN      : ${tasan}   ← canlıda 404`);
  console.log(`  dosyası OLMAYAN       : ${yok}`);
  console.log(`  çözülen               : ${tamam}`);

  const sorunlu = kayitlar.filter((k) => k.durum !== 'tamam');
  if (sorunlu.length) {
    console.log('\n  SORUNLU:');
    for (const k of sorunlu.slice(0, 10)) console.log(`    ${k.durum} · ${k.sayfa}  →  ${k.poster}`);
    if (sorunlu.length > 10) console.log(`    … +${sorunlu.length - 10}`);
  }

  if (CANLI) {
    console.log('\n  CANLI doğrulama (benzersiz adres):');
    const benzersiz = [...new Set(kayitlar.map((k) => k.url))];
    for (const u of benzersiz) {
      const r = await fetch(u + '?cb=' + benzersiz.indexOf(u)).catch(() => null);
      const kod = r ? r.status : 'HATA';
      if (kod !== 200) { canliKirik++; console.log(`    ${kod}  ${u}`); }
    }
    console.log(`    benzersiz adres ${benzersiz.length} · canlıda KIRIK ${canliKirik}`);
  }
  console.log('');
})();
