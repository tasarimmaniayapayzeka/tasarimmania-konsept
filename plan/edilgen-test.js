/* Edilgen dedektörünün DOĞRULAMASI — seo-denetim.js'teki desen değişirse önce burası koşar.
 *
 * Neden var: ölçüm aracını değiştirmek, ölçtüğü şeyi iyileştirmekle aynı şey değildir.
 * Yeni sürümün eskisinden iyi olduğu KANITLANMALI, iddia edilmemeli.
 *
 * ⚠ İLK TEST KÜMEM YANILTTI: yalnız edilgen "-n-" örnekleri koymuştum ("güncelleniyor"),
 *   etken "-Vn" gövdelerini ("kullanıyoruz", "düşünürüz") hiç sınamıyordu. Test geçti,
 *   araç bozuldu. Artık her yalancı-pozitif sınıfının kendi vakası var.
 *
 * Koşum:  node plan/edilgen-test.js     (çıkış kodu 0 = temiz)
 */
const fs = require('fs'), path = require('path');

/* Deseni KAYNAKTAN oku — testin kopyasını tutmak, aracın değiştiğini görmemek demek */
const src = fs.readFileSync(path.join(__dirname, 'seo-denetim.js'), 'utf8');
/* Nişanlar yorum içinde durduğu için dilim, açılış yorumu KAPANDIKTAN sonra
   başlar ve bitiş nişanının yorumu AÇILMADAN önce biter. */
function nisanArasi() {
  const b = src.indexOf('<EDİLGEN-BLOK-BAŞLA>'), s = src.indexOf('<EDİLGEN-BLOK-BİTİR>');
  if (b < 0 || s < 0) throw new Error('seo-denetim.js içinde edilgen blok nişanları yok');
  return src.slice(src.indexOf('*/', b) + 2, src.lastIndexOf('/*', s));
}
const kod = nisanArasi();
const yeni = new Function(kod + '\nreturn edilgenVar;')();

/* karşılaştırma için ESKİ desen */
const ESKI = /\b\w+(?:ıl|il|ul|ül|ın|in|un|ün)(?:ıyor|iyor|uyor|üyor|dı|di|du|dü|tı|ti|tu|tü|ır|ir|ur|ür|acak|ecek|malı|meli|mış|miş)\w*\b/gi;
const eski = (c) => { ESKI.lastIndex = 0; return ESKI.test(c); };

const VAKA = [
  /* --- GERÇEK EDİLGEN --- */
  ['Uygulama iki haftada yapıldı.',              true,  'yap-ıl-dı'],
  ['Sorun geliştirme aşamasında çözülür.',       true,  'çöz-ül-ür · ç,ö ASCII değil (tuzak)'],
  ['Görsel yapay zekâ ile üretildi.',            true,  'üret-il-di'],
  ['Bu kalem sonradan kısılacak.',               true,  'kıs-ıl-acak'],
  ['Ekranlar tasarım aşamasında çizilecek.',     true,  'çiz-il-ecek'],
  ['Bu konu görüşmede konuşulabilir.',           true,  'konuş-ul-abilir · edilgen + yeterlilik'],
  ['Bütçe kalemi kısılabilir.',                  true,  'kıs-ıl-abilir'],
  ['Kapsam sözleşmede sabitlenmiş.',             true,  'sabitle-n-miş', 'SINIR'],
  /* --- YETERLİLİK: -Abilir etken --- */
  ['Bu iş bir haftadan uzun sürebilir.',         false, 'sür-ebilir'],
  ['Teklifleri kolayca karşılaştırabilirsiniz.', false, 'karşılaştır-abilir'],
  ['Ödeme yarıda kalırsa süreç aksayabilir.',    false, 'aksa-y-abilir'],
  /* --- İSİM, fiil bile değil --- */
  ['Uygulama anlık bildirim gönderiyor.',        false, '"bildirim" isim'],
  /* --- ETTİRGEN -t- : etken --- */
  ['Bu karşılaştırma sizi yanıltır.',            false, 'yanıl-T-ır'],
  ['Hatalı ölçüm insanı yanıltıyor.',            false, 'yanıl-T-ıyor'],
  /* --- GÖVDESİ -Vl/-Vn İLE BİTEN ETKEN FİİLLER (sözlüksel) --- */
  ['Kapsamı yazıya döktüğünüzde fark küçülür.',  false, '"küçül-" gövde'],
  ['Bu kalemi biz de böyle düşünürüz.',          false, '"düşün-" gövde, 1. çoğul ETKEN'],
  ['Ölçüyü ekran başına biz kullanıyoruz.',      false, '"kullan-" gövde, 1. çoğul ETKEN'],
  ['Bileşen kurulunca sonraki ekranlar hızlanır.', false, '"hızlan-" gövde'],
  ['Bakımı sürekli gider olarak konumlandırıyoruz.', false, 'ettirgen "-landır-", ETKEN'],
  ['Uygulamanız ortak arka uç kullanacaksa değişir.', false, '"kullan-" gövde'],
  /* --- SIFAT + "-dIr" KOŞACI --- */
  ['Cihaz alışkanlığına yaslanırsanız birincisi uygundur.', false, '"uygun" sıfat + koşaç'],
  ['Bu düzen küçük ekiplerde daha verimlidir.',             false, 'sıfat + koşaç'],
  /* Koşaç kuralı GERÇEK edilgeni yutmamalı: "-mıştır" kalanı "dIr" değildir */
  ['Uygulama iki hafta önce yayına alınmıştır.',            true,  'al-ın-mıştır, edilgen kalmalı'],
  ['Kapsam sözleşmede yazılmıştır.',                        true,  'yaz-ıl-mıştır, edilgen kalmalı'],
  /* --- OLUMSUZLUK EDATI --- */
  ['Görüşme belgesi bir rakam listesi değildir.', false, '"değil" fiil değil'],
  ['Bu bir fiyat listesi değildir.',              false, '"değil" fiil değil'],
  /* --- DÜZ ETKEN --- */
  ['Ekip bu kararı birlikte verir.',              false, 'düz etken'],
  ['Hangisinin ağır bastığı bütçeyi şekillendirir.', false, 'ettirgen "-lendir-", ETKEN'],
];

/* 'SINIR' işaretli vakalar BİLİNEN eksiklerdir — testi kırmazlar ama SAYILIR ve
   raporlanır. Silmek, aracın neyi ölçemediğini unutmak olurdu. */
let eY = 0, yY = 0, sinir = 0;
console.log('\n  cümle                                             bekle   ESKİ  YENİ');
console.log('  ' + '-'.repeat(74));
for (const [c, bek, ger, tur] of VAKA) {
  const e = eski(c), y = yeni(c), dogru = y === bek;
  if (e !== bek) eY++;
  if (!dogru) { if (tur === 'SINIR') sinir++; else yY++; }
  const im = dogru ? ' ✓' : (tur === 'SINIR' ? ' ~' : ' ✗');
  console.log(`  ${c.slice(0, 47).padEnd(48)} ${(bek ? 'EDİL' : 'etken').padEnd(6)} `
    + `${e === bek ? ' ✓ ' : ' ✗ '}  ${im}${!dogru ? '  ← ' + ger : ''}`);
}
console.log('  ' + '-'.repeat(74));
console.log(`  YANLIŞ:  eski desen ${eY}/${VAKA.length}   ·   yürürlükteki desen ${yY}/${VAKA.length}`);
if (sinir) console.log(`  ~ BİLİNEN SINIR: ${sinir} — ünlü gövdeli "-n-" edilgeni ölçülmüyor (bilerek)`);
if (yY) { console.error('\n  ✗ DEDEKTÖR BOZUK — seo-denetim.js edilgen deseni düzeltilmeli\n'); process.exit(1); }
console.log('\n  ✓ dedektör temiz\n');
