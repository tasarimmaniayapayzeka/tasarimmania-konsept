/* ÜRETİCİ — sahne dosyasından mp4 + poster basar.
 * Kullanım: node plan/video-uret/uret.js <sahne> <dal> <cikti-adi>
 * örn:      node plan/video-uret/uret.js sahne-reklam-filmi.js video modul-video/reklam-filmi */
const path = require('path');
const motor = require('./motor');
const sahne = require(path.join(__dirname, process.argv[2]));
const dal = process.argv[3];
const ad = process.argv[4];

motor.uret(ad, dal, sahne)
  .then((b) => {
    console.log('  mp4    : ' + b.mp4KB + ' KB');
    console.log('  poster : ' + b.jpgKB + ' KB  (kare ' + b.posterKare + ')');
    console.log('  kare   : ' + b.kare + ' @ ' + b.fps + ' fps');
  })
  .catch((e) => { console.log('HATA: ' + e.message); process.exit(1); });
