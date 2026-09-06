/* Kaynaksız 14 yazının bölüm başlıklarını listeler — kaynak cümlesinin
 * hangi bölüme konacağına karar vermek için.
 * Kullanım: node plan/bolum-basliklari.js
 */
const fs = require('fs'), path = require('path');

const SLUGLAR = ['e-ticaret-urun-videosu-formatlari', 'kamerasiz-urun-videosu',
  'mobil-uygulama-gelistirme-sureci', 'mobil-uygulama-yaptirma-sorulari',
  'native-mi-cross-platform-mi', 'react-native-mi-flutter-mi', 'reklam-filmi-ajansi-secimi',
  'reklam-filmi-cekim-asamalari', 'reklam-filmi-fiyat-kalemleri', 'storyboard-nedir',
  'urun-videosu-studyo-mu-mekan-mi', 'uygulama-magaza-optimizasyonu',
  'web-sitesine-chatbot-eklemek', 'yapay-zeka-ile-video-uretimi'];

const dosyalar = fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f));
for (const slug of SLUGLAR) {
  const yd = dosyalar.find((f) => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')).slug === slug);
  if (!yd) { console.log(`  ✗ ${slug} — yapılandırma yok`); continue; }
  const C = JSON.parse(fs.readFileSync(path.join(__dirname, yd), 'utf8'));
  console.log(`\n  ${slug}   (${yd})`);
  C.yazi.bolumler.forEach((b, i) => {
    const sonP = (String(b.govde).match(/<p>([\s\S]*?)<\/p>/g) || []).length;
    console.log(`    [${i}] ${String(b.h2).slice(0, 62).padEnd(64)} ${sonP} paragraf`);
  });
}
console.log('');
