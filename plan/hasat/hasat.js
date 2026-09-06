/* İHSAN SEO BLOG — Madde 1: konu seçimi ÖLÇÜMLE.
 * Google autocomplete + alfabe çorbası. Uzun kuyruk (4+ kelime) = konu genişliği.
 *
 * ⚠ Yanıt latin1 gibi geliyor; UTF-8'e çevirmeden Türkçe bozuk okunur. */
const KOK = 'https://suggestqueries.google.com/complete/search?client=firefox&hl=tr&gl=tr&oe=utf-8&ie=utf-8&q=';
const HARF = 'abcdefgiklmnoprstuvyz'.split('');

const TOHUM = {
  'mobil-uygulama':   ['mobil uygulama geliştirme', 'mobil uygulama yaptırma', 'uygulama geliştirme maliyeti'],
  'ios-android':      ['ios android uygulama', 'native uygulama', 'swift kotlin'],
  'react-native':     ['react native', 'react native mi native mi', 'cross platform uygulama'],
  'aso':              ['aso nedir', 'app store optimizasyonu', 'uygulama mağaza optimizasyonu'],
  'reklam-filmi':     ['reklam filmi', 'reklam filmi çekimi', 'storyboard'],
  'urun-videosu':     ['ürün videosu', 'ürün videosu çekimi', 'e-ticaret ürün videosu'],
  'ai-video':         ['yapay zeka video', 'ai video üretimi', 'kamerasız video'],
  'video-produksiyon':['video prodüksiyon', 'video prodüksiyon ajansı', 'kurumsal tanıtım filmi'],
  'ai-chatbot':       ['web sitesi chatbot', 'yapay zeka chatbot', 'siteye chatbot ekleme'],
};

const bekle = ms => new Promise(r => setTimeout(r, ms));

async function sor(q) {
  try {
    const y = await fetch(KOK + encodeURIComponent(q));
    const buf = Buffer.from(await y.arrayBuffer());
    /* Google bu uçta latin1 döndürüyor; önce latin1 oku, sonra UTF-8 çöz */
    /* oe=utf-8 ile geliyor; ek çevrim YAPILMAZ, yaparsak bozar */
    const j = JSON.parse(buf.toString('utf8'));
    return Array.isArray(j[1]) ? j[1] : [];
  } catch { return []; }
}

(async () => {
  const sonuc = {};
  for (const [kume, tohumlar] of Object.entries(TOHUM)) {
    const havuz = new Set();
    for (const t of tohumlar) {
      for (const s of await sor(t)) havuz.add(s.toLowerCase());
      await bekle(120);
      for (const h of HARF) {                       /* alfabe çorbası */
        for (const s of await sor(t + ' ' + h)) havuz.add(s.toLowerCase());
        await bekle(90);
      }
    }
    const hepsi = [...havuz].filter(s => s.length > 8);
    const uzun  = hepsi.filter(s => s.trim().split(/\s+/).length >= 4);
    sonuc[kume] = { toplam: hepsi.length, uzun, hepsi };
    console.log(`  ${kume.padEnd(20)} ${String(hepsi.length).padStart(3)} varyant · ${String(uzun.length).padStart(3)} uzun kuyruk`);
  }
  require('fs').writeFileSync(__dirname + '/hasat-tm.json', JSON.stringify(sonuc, null, 1), 'utf8');
  console.log('\n  hasat-tm.json yazıldı');

  console.log('\n=== KÜME BAŞINA ÖRNEK UZUN KUYRUK ===');
  for (const [k, v] of Object.entries(sonuc)) {
    console.log(`\n■ ${k}  (${v.uzun.length} uzun kuyruk)`);
    v.uzun.slice(0, 12).forEach(s => console.log('   · ' + s));
  }
})();
