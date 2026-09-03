/* ÖNİZLEME — mp4 ÜRETMEZ, assets'e DOKUNMAZ, sayfa DEĞİŞTİRMEZ.
 * Seçilen fazları tek bir tabakaya dizip gösterir; onay öncesi bakmak için.
 * Kullanım: node plan/video-uret/onizleme.js <sahne-dosyasi> <dal> <cikti.png> */
const path = require('path');
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');
const motor = require('./motor');

const sahne = require(path.resolve(process.argv[2]));
const dal = process.argv[3] || 'video';
const cikti = path.resolve(process.argv[4]);
const FAZLAR = [0.14, 0.44, 0.74, 0.94];

const aksan = motor.AKSAN[dal];
const arac = {
  EN: motor.EN, BOY: motor.BOY, aksan,
  cam: motor.cam, yaz: motor.yaz, boru: motor.boru,
  seritYolu: motor.seritYolu, seritNokta: motor.seritNokta,
  darbeIsigi: motor.darbeIsigi, canlilik: motor.canlilik,
  yumusak: motor.yumusak, darbe: motor.darbe,
  karis: motor.karis, kis: motor.kis, MONO: motor.MONO, SANS: motor.SANS,
};

(async () => {
  const OLC = 0.62;                       // tabakaya sığsın diye kücült
  const w = Math.round(motor.EN * OLC), h = Math.round(motor.BOY * OLC);
  const bosluk = 16;
  const kareler = [];
  for (const f of FAZLAR) {
    const svg = motor.kabuk(sahne(f, arac), aksan);
    const png = await sharp(Buffer.from(svg)).resize(w, h).png().toBuffer();
    kareler.push({ f, png });
  }
  const tw = w * 2 + bosluk * 3, th = h * 2 + bosluk * 3;
  await sharp({ create: { width: tw, height: th, channels: 3, background: '#05070B' } })
    .composite(kareler.map((k, i) => ({
      input: k.png,
      left: bosluk + (i % 2) * (w + bosluk),
      top: bosluk + Math.floor(i / 2) * (h + bosluk),
    })))
    .png().toFile(cikti);
  console.log('onizleme: ' + cikti);
  console.log('fazlar  : ' + FAZLAR.join('  '));
})().catch((e) => { console.log('HATA: ' + e.message); process.exit(1); });
