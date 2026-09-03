/* SAYFAYI KENDİ VİDEOSUNA BAĞLA
 *
 * İki şey yapar:
 *   1) src/poster'ı sayfanın kendi dosyasına çevirir (modül geneli akis.* yerine)
 *   2) data-dongu ekler — BU OLMADAN VİDEO HİÇ OYNAMIYORDU. Tarayıcıda
 *      ölçüldü: readyState 4, paused true, currentTime 0 → 0. Rozet
 *      "CANLI DÖNGÜ" diyordu ama ekranda donuk poster vardı.
 *      tm.js `video[data-dongu]` seçicisiyle görünürlükte oynatır, ekran
 *      dışında ve sekme arkadayken duraklatır, hareket kısıtlı modda hiç
 *      başlatmaz.
 *
 * Kullanım: node plan/video-uret/bagla.js <sayfa-yolu> <yeni-ad>
 *   örn:    ... site/hizmetler/video-produksiyon/reklam-filmi/index.html modul-video/reklam-filmi
 */
const fs = require('fs');
const path = require('path');

const sayfa = process.argv[2];
const yeniAd = process.argv[3];
let h = fs.readFileSync(sayfa, 'utf8');
const once = h;

/* sayfadan assets'e giden göreli önek, mevcut yoldan aynen alınır */
const m = h.match(/poster="((?:\.\.\/)+)assets\/[^"]+"/);
if (!m) { console.log('✗ poster yolu bulunamadı: ' + sayfa); process.exit(1); }
const onek = m[1];

h = h.replace(/poster="(?:\.\.\/)+assets\/modul-[a-z]+\/[a-z0-9-]+\.jpg"/,
  `poster="${onek}assets/${yeniAd}.jpg"`);
h = h.replace(/src="(?:\.\.\/)+assets\/modul-[a-z]+\/[a-z0-9-]+\.mp4"/,
  `src="${onek}assets/${yeniAd}.mp4"`);

/* data-dongu — yalnız .akv-video içindeki video etiketine, bir kez */
if (!/<video[^>]*data-dongu/.test(h)) {
  h = h.replace(/(<div class="akv-video">[\s\S]{0,300}?<video)(\s)/, '$1 data-dongu$2');
}

/* SATIR İÇİ GÖZLEMCİYİ KALDIR — davranış kaybolmuyor, DEVRALINIYOR.
 *
 * Sayfada her birinde kopyalanmış küçük bir IntersectionObserver vardı:
 * görünürse play(), değilse pause(). Çalışıyordu (ölçüldü: normal modda
 * 2.67 → 4.37 ilerledi), ama prefers-reduced-motion'ı HİÇ sormuyordu —
 * hareketi kapatan kullanıcıya da sürekli oynayan video gidiyordu.
 *
 * tm.js'in `video[data-dongu]` yolu aynı işi yapar ve fazlası vardır:
 * AZALT'ta hiç başlatmaz, sekme arkaya geçince duraklatır, tarayıcı
 * politikası engellerse yeniden dener. 23 kopya yerine tek uygulama.
 * Bu yüzden döngü özelliği KALDIRILMIYOR, daha doğru olanla değiştiriliyor. */
const gozlemci = /\s*<script>\s*"use strict";\s*\/\* döngü videosu yalnız ekrandayken oynar \*\/[\s\S]*?<\/script>/;
const gozlemciVardi = gozlemci.test(h);
if (gozlemciVardi) h = h.replace(gozlemci, '');

if (h === once) { console.log('✗ değişiklik olmadı: ' + sayfa); process.exit(1); }
fs.writeFileSync(sayfa, h, 'utf8');

const v = (h.match(/<div class="akv-video">[\s\S]{0,420}?<\/div>/) || [''])[0];
console.log('✓ ' + sayfa.split(path.sep).join('/').replace('site/hizmetler/', ''));
console.log('    mp4       : ' + ((v.match(/src="[^"]*"/) || [''])[0]));
console.log('    poster    : ' + ((v.match(/poster="[^"]*"/) || [''])[0]));
console.log('    data-dongu: ' + (/data-dongu/.test(v) ? 'VAR' : 'YOK'));
console.log('    satır içi gözlemci: ' + (gozlemciVardi ? 'kaldırıldı' : 'zaten yoktu'));
