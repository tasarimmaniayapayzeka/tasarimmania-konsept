/* CANLI YÜKLEME PAKETİ — gerçek domaine ne çıkacaksa YALNIZ o.
 *
 * KULLANICI EMRİ (2 Eyl 2026): "demolarla işim yok, demolar ayrı kalsın,
 * yüklemede canlıya onlar gelmesin ASLA."
 *
 * Bu yüzden paket bir KARA LİSTE değil, BEYAZ LİSTE ile çalışır. Kara liste
 * yanlış yöndedir: yeni bir klasör eklendiğinde sessizce yayına sızar.
 * Beyaz listede ise açıkça yazılmayan hiçbir şey pakete giremez.
 *
 * PAKETE GİRENLER (tamamı bu):
 *   site/    → paketin KÖKÜ olur (canlıda /site/ öneki OLMAYACAK)
 *   assets/  → paketin içinde assets/ olarak kalır
 *
 * PAKETE ASLA GİRMEYENLER (adları burada, gözden kaçmasın diye):
 *   demo/  konsept/  plan/  rakip-analiz/  arsiv/  _test/  canli-site-yedek/
 *   reklam-videolari/  sosyal-icerik/  .git/  ve kökteki index.html
 *
 * YOL DÜZELTMESİ (bu olmadan paket KIRIK çıkar):
 *   Şu an assets/ ile site/ KARDEŞ. Sayfalar assets'e "derinlik + 1" kadar
 *   ../ ile ulaşıyor (ölçüldü: 296 referansın 296'sı bu kuralda).
 *   site/ paketin kökü olunca bu bir fazla ../ demek — hepsi kökün üstüne
 *   çıkar ve kırılır. Paketleyici her assets referansından tam bir ../ düşürür.
 *
 * Kullanım:
 *   node plan/canli-paket.js            → ../tasarimmania-canli/ üretir
 *   node plan/canli-paket.js --cikti X  → X klasörüne üretir
 *   node plan/canli-paket.js --kuru     → yazmaz, ne olacağını söyler
 *
 * NOT: noindex hâlâ AÇIK. Paketi yükledikten SONRA gerçek domainde
 * `node plan/noindex-uygula.js --ac` çalıştırılmalı.
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const KURU = process.argv.includes('--kuru');
const ci = process.argv.indexOf('--cikti');
const CIKTI = ci > -1 && process.argv[ci + 1]
  ? path.resolve(process.argv[ci + 1])
  : path.join(KOK, '..', 'tasarimmania-canli');

/* --- BEYAZ LİSTE --- */
const IZINLI = [
  { kaynak: 'site', hedef: '.' },        /* site/ paketin kökü olur */
  { kaynak: 'assets', hedef: 'assets' },
];

/* --- YASAK: pakette bu adlardan biri geçerse üretim İPTAL --- */
const YASAK = ['demo', 'konsept', 'rakip-analiz', 'arsiv', '_test',
  'canli-site-yedek', 'reklam-videolari', 'sosyal-icerik', 'plan'];

const METIN = /\.(html|css|js|json|txt|xml|svg)$/i;

function kopyala(kaynak, hedef, sayac) {
  fs.readdirSync(kaynak, { withFileTypes: true }).forEach((e) => {
    const k = path.join(kaynak, e.name);
    const t = path.join(hedef, e.name);
    if (e.isDirectory()) {
      if (!KURU) fs.mkdirSync(t, { recursive: true });
      kopyala(k, t, sayac);
      return;
    }
    sayac.dosya++;
    if (METIN.test(e.name)) {
      let icerik = fs.readFileSync(k, 'utf8');
      /* assets referanslarından tam bir ../ düşür */
      const once = icerik;
      icerik = icerik.replace(/((?:\.\.\/)+)assets\//g, (m, yukari) => {
        const n = yukari.length / 3;
        sayac.yolDuzeltme++;
        return '../'.repeat(Math.max(0, n - 1)) + 'assets/';
      });
      if (icerik !== once) sayac.dosyaDuzeltilen++;
      if (!KURU) fs.writeFileSync(t, icerik, 'utf8');
    } else {
      sayac.ikili++;
      if (!KURU) fs.copyFileSync(k, t);
    }
  });
}

/* --- üret --- */
if (!KURU) {
  if (fs.existsSync(CIKTI)) fs.rmSync(CIKTI, { recursive: true, force: true });
  fs.mkdirSync(CIKTI, { recursive: true });
}

const sayac = { dosya: 0, ikili: 0, yolDuzeltme: 0, dosyaDuzeltilen: 0 };
IZINLI.forEach(({ kaynak, hedef }) => {
  const k = path.join(KOK, kaynak);
  if (!fs.existsSync(k)) { console.log('  ! kaynak yok:', kaynak); return; }
  const t = path.join(CIKTI, hedef);
  if (!KURU) fs.mkdirSync(t, { recursive: true });
  kopyala(k, t, sayac);
});

console.log('CANLI PAKET' + (KURU ? ' (KURU KOŞU)' : ''));
console.log('  çıktı            : ' + CIKTI);
console.log('  kopyalanan dosya : ' + sayac.dosya + '  (' + sayac.ikili + ' ikili)');
console.log('  yol düzeltmesi   : ' + sayac.yolDuzeltme + ' referans, ' + sayac.dosyaDuzeltilen + ' dosyada');

/* --- DENETİM: yasak bir şey sızdı mı --- */
if (!KURU) {
  const sizan = [];
  (function tara(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      const bagil = path.relative(CIKTI, p).split(path.sep);
      if (YASAK.includes(bagil[0])) sizan.push(bagil.join('/'));
      if (e.isDirectory()) tara(p);
    });
  })(CIKTI);

  /* kırık assets referansı kaldı mı */
  const kirik = [];
  (function tara2(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) return tara2(p);
      if (!/\.html$/i.test(e.name)) return;
      const h = fs.readFileSync(p, 'utf8');
      const adaylar = [];
      [...h.matchAll(/<img[^>]+src="([^"]+)"/g)].forEach((m) => adaylar.push(m[1]));
      [...h.matchAll(/srcset="([^"]+)"/g)].forEach((m) =>
        m[1].split(',').forEach((x) => { const y = x.trim().split(/\s+/)[0]; if (y) adaylar.push(y); }));
      [...h.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].forEach((m) => adaylar.push(m[1]));
      adaylar.forEach((src) => {
        if (/^(https?:|data:)/i.test(src)) return;
        if (!fs.existsSync(path.resolve(path.dirname(p), src))) {
          kirik.push(path.relative(CIKTI, p).split(path.sep).join('/') + ' → ' + src);
        }
      });
    });
  })(CIKTI);

  console.log('');
  console.log(sizan.length
    ? '✗ YASAK İÇERİK SIZDI (' + sizan.length + '):\n   ' + sizan.slice(0, 10).join('\n   ')
    : '✓ Yasak içerik sızmadı — demo/, konsept/, plan/ ve diğerleri pakette YOK');
  console.log(kirik.length
    ? '✗ KIRIK VARLIK YOLU (' + kirik.length + '):\n   ' + kirik.slice(0, 10).join('\n   ')
    : '✓ Kırık varlık yolu yok — assets referansları paketin kökünde çözülüyor');
  console.log('');
  console.log('SONRAKİ ADIM: paketi yükledikten sonra gerçek domainde');
  console.log('  node plan/noindex-uygula.js --ac   (indeks kilidini açar)');
}
