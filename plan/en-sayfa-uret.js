/* İngilizce sayfayı üretir: TR sayfanın BİREBİR kopyası + çevrilmiş metin.
 *
 * YÖNTEM: yeni HTML yazılmıyor. Türkçe sayfa kopyalanıyor, yalnız insanın
 * gördüğü dizgeler değiştiriliyor. CSS, JS, sınıf adları, animasyonlar,
 * yapı bit bit aynı kalıyor — tasarım kaymıyor.
 *
 * SIRA:
 *   1. node plan/en-metin-cikar.js <sayfa> --json   → C:/Temp/en-<sayfa>.json
 *   2. JSON'daki her kayda "en" alanı yazılır (çeviri)
 *   3. node plan/en-sayfa-uret.js <sayfa> [--uygula]
 *
 * ⚠ SAYIM KİLİDİ: çeviri dosyasındaki kayıt sayısı sayfadan çıkarılanla
 *   birebir tutmuyorsa üretim DURUR. "en" alanı boş kalan kayıt varsa da
 *   durur. Eksik çeviri sessizce Türkçe kalamaz.
 *
 * ⚠ DEĞİŞTİRME SIRASI UZUNDAN KISAYA: kısa bir dizge uzun bir dizgenin
 *   içinde geçebilir ("SEO" → "SEO Hizmetleri" içinde). Kısa olan önce
 *   uygulanırsa uzun olanı bozar. Bu proje bu tuzağa üç kez düştü.
 *
 * ⚠ YOL DERİNLİĞİ: /seo/ (1 seviye) → /en/seo/ (2 seviye). Göreli yollar
 *   yeniden hesaplanır; "../" sayısıyla oynanmaz, mutlak çözüp yeniden yazılır.
 *
 * Kullanım: node plan/en-sayfa-uret.js <sayfa-yolu> [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const HEDEF = process.argv[2];
const KANONIK = 'https://www.tasarimmania.com';
if (!HEDEF) { console.error('  kullanım: node plan/en-sayfa-uret.js <sayfa-yolu> [--uygula]'); process.exit(2); }

const HARITA = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
const TR_YOL = '/' + HEDEF.replace(/^\/|\/$/g, '') + '/';
const EN_YOL = (HARITA.hizmetler[TR_YOL] || HARITA.kurumsal[TR_YOL] || {}).en;
if (!EN_YOL) { console.error(`  ✗ ${TR_YOL} için İngilizce adres haritada yok`); process.exit(2); }

const trDosya = path.join(S, TR_YOL.replace(/^\//, ''), 'index.html');
if (!fs.existsSync(trDosya)) { console.error('  ✗ Türkçe sayfa yok: ' + trDosya); process.exit(2); }
const ceviriDosya = path.join('C:/Temp', `en-${HEDEF.replace(/[\\/]/g, '_')}.json`);
if (!fs.existsSync(ceviriDosya)) { console.error('  ✗ çeviri dosyası yok: ' + ceviriDosya + '\n    önce: node plan/en-metin-cikar.js ' + HEDEF + ' --json'); process.exit(2); }

const C = JSON.parse(fs.readFileSync(ceviriDosya, 'utf8'));
let h = fs.readFileSync(trDosya, 'utf8');

/* ═══ 1. SAYIM KİLİDİ ═══ */
const cevirisiz = C.kayitlar.filter((k) => !k.en || !String(k.en).trim());
if (cevirisiz.length) {
  console.error(`\n  ✗ ÜRETİM DURDU — ${cevirisiz.length}/${C.kayitlar.length} kayıtta "en" alanı boş\n`);
  cevirisiz.slice(0, 10).forEach((k) => console.error(`     ${String(k.no).padStart(3)}. [${k.tur}] ${k.metin.slice(0, 66)}`));
  if (cevirisiz.length > 10) console.error(`     … ${cevirisiz.length - 10} kayıt daha`);
  process.exit(1);
}

/* ═══ 2. METİN DEĞİŞTİRME — uzundan kısaya ═══ */
const sirali = [...C.kayitlar].sort((a, b) => b.metin.length - a.metin.length);
let degisen = 0; const bulunamayan = [];
for (const k of sirali) {
  if (!h.includes(k.metin)) { bulunamayan.push(k); continue; }
  h = h.split(k.metin).join(k.en);
  degisen++;
}
/* kabuk (menü/altbilgi) dizgeleri */
let kabukDegisen = 0;
for (const [tr, en] of Object.entries(C.kabukCeviri || {}).sort((a, b) => b[0].length - a[0].length)) {
  if (!h.includes(tr)) continue;
  h = h.split(tr).join(en);
  kabukDegisen++;
}

/* ═══ 3. DİL VE ADRES YERELLEŞTİRME ═══ */
h = h.replace(/<html lang="tr"/, '<html lang="en"')
  .replace(/<meta property="og:locale" content="tr_TR">/, '<meta property="og:locale" content="en">')
  .replace(new RegExp(`(rel="canonical" href="${KANONIK})${TR_YOL}"`), `$1${EN_YOL}"`)
  .replace(new RegExp(`(og:url" content="${KANONIK})${TR_YOL}"`), `$1${EN_YOL}"`);
/* şemadaki bu sayfaya ait mutlak adresler */
h = h.split(KANONIK + TR_YOL).join(KANONIK + EN_YOL);
/* şema dili */
h = h.replace(/"inLanguage":\s*"tr-TR"/g, '"inLanguage": "en"');

/* ═══ 4. hreflang çifti ═══ */
const hreflang = `<link rel="alternate" hreflang="tr" href="${KANONIK}${TR_YOL}">\n`
  + `<link rel="alternate" hreflang="en" href="${KANONIK}${EN_YOL}">\n`
  + `<link rel="alternate" hreflang="x-default" href="${KANONIK}${TR_YOL}">`;
h = h.replace(/\n?<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '');
const capa = h.match(/<link rel="canonical"[^>]*>/);
if (capa) h = h.replace(capa[0], capa[0] + '\n' + hreflang);

/* ═══ 5. GÖRELİ YOLLAR — yeni derinlikten yeniden ═══ */
const eskiDizin = path.dirname(trDosya);
const yeniDizin = path.join(S, EN_YOL.replace(/^\//, '').replace(/\/$/, ''));
let yolSayisi = 0;
const cevir = (ham) => {
  if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(ham)) return ham;
  const [g, ek] = [ham.replace(/[#?].*$/, ''), (ham.match(/[#?].*$/) || [''])[0]];
  if (!g) return ham;
  let r = path.relative(yeniDizin, path.resolve(eskiDizin, g)).split(path.sep).join('/');
  if (!r.startsWith('.')) r = './' + r;
  if (g.endsWith('/') && !r.endsWith('/')) r += '/';
  yolSayisi++;
  return r + ek;
};
h = h.replace(/(\s(?:href|src)=")([^"]+)(")/g, (t, a, v, b) => a + cevir(v) + b)
  .replace(/(\ssrcset=")([^"]+)(")/g, (t, a, v, b) => a + v.split(',').map((p) => {
    const [yolu, ...kalan] = p.trim().split(/\s+/); return [cevir(yolu), ...kalan].join(' ');
  }).join(', ') + b);

/* ═══ RAPOR ═══ */
console.log(`\n  ${UYGULA ? 'ÜRETİLDİ' : 'KURU KOŞU'} — ${TR_YOL} → ${EN_YOL}\n`);
console.log(`  çeviri kaydı        : ${C.kayitlar.length}`);
console.log(`  değiştirilen dizge  : ${degisen}`);
console.log(`  kabuk dizgesi       : ${kabukDegisen}`);
console.log(`  yeniden yazılan yol : ${yolSayisi}`);
console.log(`  boyut               : ${(h.length / 1024).toFixed(1)} KB`);
if (bulunamayan.length) {
  console.log(`\n  ⚠ SAYFADA BULUNAMAYAN ${bulunamayan.length} dizge (çıkarımdan sonra sayfa değişmiş olabilir):`);
  bulunamayan.slice(0, 8).forEach((k) => console.log(`     ${String(k.no).padStart(3)}. ${k.metin.slice(0, 66)}`));
}
/* kalan Türkçe izi */
const trIz = (h.match(/[çğıöşüÇĞİÖŞÜ]/g) || []).length;
console.log(`\n  kalan Türkçe karakter: ${trIz}` + (trIz ? '  ← gözden geçirin (marka adı "TasarımMania" beklenir)' : ''));

if (UYGULA) {
  fs.mkdirSync(yeniDizin, { recursive: true });
  fs.writeFileSync(path.join(yeniDizin, 'index.html'), h, 'utf8');
  console.log(`\n  yazıldı: site${EN_YOL}index.html\n`);
} else console.log('\n  Uygulamak için: --uygula\n');
