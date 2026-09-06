/* TÜM GEO onarım turlarını doğru sırayla koşar.
 *
 * NEDEN VAR: onarımların büyük bölümü blog-uret.js ÇIKTISININ ÜZERİNE
 * uygulanıyor. Bir blog yazısı yeniden üretildiğinde şu kazanımlar SESSİZCE
 * kaybolur: @graph birleştirmesi, WebSite/WebPage düğümleri, knowsAbout,
 * subjectOf, fetchpriority. Sayfa çalışmaya devam ettiği için fark edilmez.
 *
 * KURAL: `node plan/blog-uret.js ...` her koşusundan sonra bu betik koşulur.
 *
 * Sıra rastgele değil:
 *   1 meta      → şema betiği head'deki açıklamayı okuyor
 *   5 öksüz     → şemadaki subjectOf bu bloktaki linklerden türüyor
 *   6 yapısal   → aside/dl dönüşümleri
 *   8 başlık    → 9'dan önce; ikisi de head yazıyor
 *   9 açıklama  → şema description'ını da eşitliyor
 *   3 şema      → EN SON: yukarıdaki değişiklikleri toplayıp grafiğe yazıyor
 *   7 görsel    → sitemap en güncel HTML'den üretilsin
 *
 * Kullanım: node plan/onarim-turu.js [--uygula]
 */
const { execFileSync } = require('child_process');
const path = require('path');
const UYGULA = process.argv.includes('--uygula');

const TURLAR = [
  ['geo-onar-1-meta.js', 'head meta alanları'],
  ['geo-onar-5-oksuz.js', 'hizmet → blog blokları'],
  ['geo-onar-6-yapisal.js', 'yapısal etiketler'],
  ['geo-onar-8-basliklar.js', 'title uzunlukları'],
  ['geo-onar-9-aciklama.js', 'description uzunlukları'],
  ['geo-onar-10-soru-h2.js', 'soru biçimli H2 başlıkları'],
  ['geo-onar-11-hizmetler-sss.js', '/hizmetler/ SSS bölümü'],
  ['geo-onar-3-sema.js', 'şema grafiği'],
  ['geo-onar-7-gorsel.js', 'görsel öznitelikleri + sitemap'],
];

console.log(`\n  ONARIM TURU — ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);
for (const [betik, ad] of TURLAR) {
  const arg = UYGULA ? ['--uygula'] : [];
  let cikti;
  try {
    cikti = execFileSync('node', [path.join(__dirname, betik), ...arg], { encoding: 'utf8', maxBuffer: 1 << 24 });
  } catch (e) {
    console.log(`  ✗ ${betik} ÇÖKTÜ: ${String(e.message).slice(0, 120)}`);
    process.exit(1);
  }
  const ozet = cikti.split('\n').filter((s) => /UYGULANDI|KURU KOŞU|^  [A-F]\.|sayfa$|sayfa ·/.test(s))
    .map((s) => s.trim()).filter(Boolean).slice(0, 4).join('  |  ');
  console.log(`  ${ad.padEnd(32)} ${ozet}`);
}

/* son kontroller */
for (const [betik, ad] of [['etiket-denge.js', 'etiket dengesi'], ['geo-denetim-derin.js', 'derin denetim']]) {
  let cikti = '';
  try { cikti = execFileSync('node', [path.join(__dirname, betik)], { encoding: 'utf8', maxBuffer: 1 << 24 }); }
  catch (e) { cikti = String(e.stdout || e.message); }
  const son = cikti.trim().split('\n').filter(Boolean).pop();
  console.log(`  ${ad.padEnd(32)} ${son.trim()}`);
}
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
