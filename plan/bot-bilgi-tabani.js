/* CHATBOT BİLGİ TABANI ÜRETİCİ
 *
 * Sitenin 63 sayfasını botun okuyabileceği tek bir dizine çevirir.
 * Desen SmileGroup botundan alındı (02-SmileGroup/chatbot/veri/dizin.json):
 * sayfa listesi + her sayfanın başlığı, özeti, bölümleri ve SSS'si.
 *
 * ARKA UÇTAN BAĞIMSIZ: bu çıktı PHP, Worker ya da başka bir arka uçla
 * çalışabilir. Bu yüzden arka uç kararı beklenmeden üretilebilir.
 *
 * NE ÇIKARILIR
 *   - başlık, meta açıklama, URL, sayfa türü (hub / alt sayfa / blog / kurumsal)
 *   - H2 başlıkları ve her birinin ilk paragrafı (doğrudan cevap)
 *   - SSS soru-cevap çiftleri (şemadan — ekranla aynı kaynak, Madde 21)
 *   - modül/dal bilgisi (data-dal)
 *
 * NE ÇIKARILMAZ
 *   - navigasyon, altbilgi, CTA kartları — bot bunları cevap sanmamalı
 *   - SVG/video işaretlemesi — görsel içerik metin değildir
 *
 * Kullanım: node plan/bot-bilgi-tabani.js
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');

function sayfalar() {
  const liste = [];
  (function tara(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) return tara(p);
      if (e.name !== 'index.html') return;
      const h = fs.readFileSync(p, 'utf8');
      /* yönlendirme kütüğü bilgi taşımaz */
      if (/http-equiv="refresh"/i.test(h) && /location\.replace/.test(h)) return;
      liste.push(p);
    });
  })(SITE);
  return liste.sort();
}

const etiketsiz = (s) => s
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"').replace(/&[a-z]+;/g, ' ')
  .replace(/\s+/g, ' ').trim();

function tur(url) {
  if (url === '/') return 'anasayfa';
  if (url.startsWith('/blog/') && url !== '/blog/') return 'blog';
  if (url === '/blog/') return 'blog-dizin';
  if (/^\/hizmetler\/[^/]+\/$/.test(url)) return 'hub';
  if (/^\/hizmetler\/.+\/.+\//.test(url)) return 'alt-sayfa';
  if (url === '/hizmetler/') return 'hizmet-dizin';
  return 'kurumsal';
}

const kayitlar = [];
let sssToplam = 0, bolumToplam = 0, navAtlanan = 0;

sayfalar().forEach((p) => {
  const h = fs.readFileSync(p, 'utf8');
  const rel = path.relative(SITE, path.dirname(p)).split(path.sep).filter(Boolean).join('/');
  const url = '/' + (rel ? rel + '/' : '');

  const baslik = etiketsiz((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const aciklama = ((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '').trim();
  const dal = (h.match(/data-dal="([^"]+)"/) || [])[1] || null;

  /* H2 başlıkları + altındaki ilk anlamlı metin = botun "doğrudan cevap" kaynağı
   *
   * İKİ DÜZELTME (ölçümle bulundu, ilk sürümde ikisi de eksikti):
   *
   * 1. NAVİGASYON BÖLÜMÜ ATLANIR. "Bu konuyla bağlantılı sayfalar" bloğu bir
   *    link listesi; bot onu cevap sanmamalı. İlk sürümde 25 boş kaydın 23'ü
   *    buydu ve "%5,2 içerik kusuru" diye yanlış raporlandı — kusur içerikte
   *    değil, çıkarıcıdaydı.
   *
   * 2. YALNIZ <p> OKUMAK YETMİYOR. Bazı bölümlerin ilk öğesi paragraf değil:
   *    /hakkimizda/ "Beş disiplin…" altında çip listesi, / "Çalıştığımız yığın"
   *    altında platform listesi var. Metin YERİNDE, çıkarıcı görmüyordu.
   *    Artık paragraf yoksa liste/çip metni alınır.
   */
  const NAV_BASLIK = /bağlantılı sayfalar|ilgili hizmet|ilgili sayfa|ilgili içerik/i;

  const bolumler = [];
  let atlananNav = 0;
  const govde = (h.match(/<main[\s\S]*?<\/main>/) || [h])[0];
  const h2ler = [...govde.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|<\/main>)/g)];
  h2ler.forEach((m) => {
    const b = etiketsiz(m[1]);
    if (!b) return;
    if (NAV_BASLIK.test(b)) { atlananNav++; return; }

    const icerik = m[2];
    let cevap = '';

    /* önce paragraf */
    const p = (icerik.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1];
    if (p && etiketsiz(p)) cevap = etiketsiz(p);

    /* Paragraf yoksa liste/çip metni alınır.
     *
     * İLK DENEME BAŞARISIZ OLDU: `<(li|span|div)[^>]*>([^<]{3,})<\/…>` deseni
     * metnin açılış etiketinden HEMEN sonra gelmesini bekliyordu. Gerçek
     * işaretlemede araya boş bir öğe giriyor —
     *   <span><i></i>Aynı takvimde çalışır</span>
     *   <div role="listitem"><span class="dotv"></span>Meta Ads</div>
     * — ilk karakter `<` olduğu için desen hiç eşleşmedi ve iki bölüm boş kaldı.
     *
     * Çözüm: yakalamaya çalışmak yerine bölümün metnini düzleştir. Sınır olarak
     * bir sonraki <section> alınır: yeni bölüm = yeni konu, oraya taşmamalı. */
    if (!cevap) {
      const sinir = icerik.search(/<section[\s>]/);
      const parca = sinir > 0 ? icerik.slice(0, sinir) : icerik;
      cevap = etiketsiz(parca);
    }

    bolumler.push({ baslik: b, cevap: cevap.slice(0, 400) });
  });
  navAtlanan += atlananNav;

  /* SSS — şemadan (ekranla aynı kaynak) */
  const sss = [];
  [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach((b) => {
    try {
      const j = JSON.parse(b[1]);
      const f = j['@type'] === 'FAQPage' ? j
              : (j['@graph'] || []).find((x) => x['@type'] === 'FAQPage');
      if (f && f.mainEntity) f.mainEntity.forEach((q) => {
        sss.push({ s: q.name, c: (q.acceptedAnswer && q.acceptedAnswer.text) || '' });
      });
    } catch (e) { /* bozuk şema site-denetim.js'in işi */ }
  });

  bolumToplam += bolumler.length;
  sssToplam += sss.length;

  kayitlar.push({ url, tur: tur(url), dal, baslik, aciklama, bolumler, sss });
});

const kelime = kayitlar.reduce((s, k) =>
  s + k.bolumler.reduce((a, b) => a + b.cevap.split(' ').length, 0)
    + k.sss.reduce((a, q) => a + q.c.split(' ').length, 0), 0);

const cikti = {
  uretim: new Date().toISOString().slice(0, 10),
  kaynak: 'site/ (63 sayfa)',
  not: 'Görsel/video içerik DIŞARIDA — bot yalnız metni bilir.',
  sayac: { sayfa: kayitlar.length, bolum: bolumToplam, sss: sssToplam, kelime, atlananNavigasyon: navAtlanan },
  sayfalar: kayitlar,
};

const hedef = path.join(KOK, 'plan', 'bot-dizin.json');
fs.writeFileSync(hedef, JSON.stringify(cikti, null, 1), 'utf8');

console.log('  yazıldı: plan/bot-dizin.json');
console.log('  sayfa : ' + cikti.sayac.sayfa);
console.log('  bölüm : ' + cikti.sayac.bolum);
console.log('  SSS   : ' + cikti.sayac.sss);
console.log('  kelime: ' + cikti.sayac.kelime);
console.log('');
const turler = {};
kayitlar.forEach((k) => { turler[k.tur] = (turler[k.tur] || 0) + 1; });
Object.entries(turler).sort((a, b) => b[1] - a[1])
  .forEach(([t, n]) => console.log('    ' + t.padEnd(14) + n));
const bos = kayitlar.filter((k) => !k.bolumler.length && !k.sss.length);
if (bos.length) {
  console.log('');
  console.log('  ⚠ içerik çıkarılamayan sayfa: ' + bos.length);
  bos.slice(0, 5).forEach((k) => console.log('      ' + k.url));
}
