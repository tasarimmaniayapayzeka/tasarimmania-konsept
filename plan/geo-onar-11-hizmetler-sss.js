/* GEO onarım — Aşama 11: /hizmetler/ hub'ına gerçek SSS
 *
 * Denetimde iki bulgu vardı: hub'da FAQPage şeması yok ve dateModified yok.
 * Diğer 28 hizmet sayfasında ikisi de var — çünkü onların GÖRÜNÜR bir SSS
 * bölümü var ve dateModified o FAQPage düğümünde duruyor.
 *
 * ⚠ ŞEMAYI TEK BAŞINA EKLEMEK YANLIŞ OLURDU: Google, FAQPage işaretlemesinin
 *   sayfada GÖRÜNÜR karşılığı olmasını şart koşuyor. Bu yüzden önce içerik
 *   yazıldı, şema onun üzerine kuruldu.
 *
 * İÇERİĞİN KAYNAĞI — hiçbir cevap uydurulmadı, hepsi sitede zaten yazılı:
 *   · "her modül tek başına çalışır / çoğu müşteri tek modülle başlıyor"
 *     → ana sayfa SSS, "Sadece tek bir hizmet alabilir miyim?"
 *   · "beşi ayrı ayrı da alınır, birlikte daha ucuza gelir"  → bu sayfanın H2'si
 *   · "sorun çıkınca herkes bir diğerini gösterir"           → bu sayfanın H2'si
 *   · "tek ekip, tek fatura" / "BEŞ MODÜL · TEK PANEL"       → ana sayfa, altbilgi
 *   · "ilk görüşmede kayıp noktaları birlikte işaretleriz"   → ana sayfa CTA
 *
 * Kullanım: node plan/geo-onar-11-hizmetler-sss.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');
const F = path.join(S, 'hizmetler/index.html');
const KANONIK = 'https://www.tasarimmania.com';
/* Bölümün yazıldığı gün. Sabit tutuluyor: her koşuda "bugün" yazmak,
   içerik değişmediği hâlde tarihi tazeleyip yanlış sinyal verirdi. */
const TARIH = '2026-09-06';

const SORULAR = [
  {
    s: 'Beş modülün hepsini almak zorunda mıyım?',
    k: 'Hayır. Her modül tek başına çalışır ve tek başına sözleşmelenir.',
    d: 'Sadece web sitesi, sadece reklam yönetimi ya da sadece video prodüksiyon için de '
      + 'anlaşabilirsiniz. Çoğu müşterimiz tek modülle başlayıp zamanla diğerlerini ekliyor.',
  },
  {
    s: 'Modülleri birlikte almak neden daha ucuza geliyor?',
    k: 'Aynı keşif, aynı marka dosyası ve aynı takvim iki kez kurulmuyor.',
    d: 'Ayrı ajanslarla çalışırken her biri markayı sıfırdan tanır, her biri ayrı toplantı '
      + 've ayrı brief ister. Tek çatı altında keşif bir kez yapılır; bir modülde üretilen '
      + 'görsel, metin ve ölçüm kurulumu diğerinde yeniden kullanılır.',
  },
  {
    s: 'Her modül için ayrı kişiyle mi muhatap olacağım?',
    k: 'Hayır. Tek ekip, tek panel, tek fatura.',
    d: 'Beş modülün tamamı aynı takvimde ilerler ve tek noktadan yönetilir. Bir sorun '
      + 'çıktığında modüller birbirini göstermez; sorumluluk aynı ekipte kalır.',
  },
  {
    s: 'Sonradan modül ekleyebilir miyim?',
    k: 'Evet, istediğiniz ay ekleyebilirsiniz.',
    d: 'Modüller birbirinden bağımsız sözleşmelenir. Yeni bir modül eklendiğinde mevcut '
      + 'çalışmanın brief’i ve marka dosyaları devralınır, süreç sıfırdan başlamaz.',
  },
  {
    s: 'Hangi modülle başlamalıyım?',
    k: 'Kaybın nerede olduğuna bakarak.',
    d: 'İlk görüşmede ekranı paylaşır, sitenizin ve reklam hesabınızın para kaybettiği '
      + 'noktaları birlikte işaretleriz. Başlangıç modülü tahmine göre değil, o listeye göre seçilir.',
  },
];

/* .sss bloğunun biçimi diğer hizmet sayfalarında tanımlı; bu sayfada yok.
   Kural kümesi oradan birebir alındı — yeni bir görünüm icat edilmiyor. */
const SSS_CSS = `.sss{display:grid;gap:11px;max-width:820px}
.sss details{border:1px solid var(--hair);border-radius:var(--r-md);background:var(--panel);transition:border-color .3s}
.sss details[open]{border-color:var(--hair-strong)}
.sss summary{cursor:pointer;list-style:none;padding:18px 22px;font-size:15.6px;font-weight:600;display:flex;align-items:center;gap:14px}
.sss summary::-webkit-details-marker{display:none}
.sss summary::after{content:"";width:9px;height:9px;margin-left:auto;flex:none;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg) translateY(-2px);transition:transform .3s var(--ease)}
.sss details[open] summary::after{transform:rotate(-135deg) translateY(-2px)}
.sss summary:hover{color:var(--acc)}
.sss .cvp{padding:0 22px 20px;font-size:14.4px;color:var(--muted);line-height:1.7}`;

let h = fs.readFileSync(F, 'utf8');
const notlar = [];

/* ── 1. görünür SSS bölümü ── */
if (/id="sss"/.test(h)) notlar.push('SSS bölümü zaten var, atlandı');
else {
  const blok = `  <section class="sec" id="sss" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <span class="eyebrow"><i></i>Sık sorulanlar</span>
        <h2 data-kin>Beş modüllü çalışma hakkında sık sorulanlar</h2>
        <p>Modül seçimi, birlikte çalışma ve fiyat tarafında en çok gelen sorular.</p>
      </div>
      <div class="sss rv d1">
${SORULAR.map((q) => `        <details>
          <summary>${q.s}</summary>
          <p class="cvp">${q.k} ${q.d}</p>
        </details>`).join('\n')}
      </div>
    </div>
  </section>
`;
  /* kapanış çağrısından ÖNCE: soruları cevaplanmadan teklife çağırmak olmaz */
  const cta = h.lastIndexOf('<section', h.indexOf('Hangi modüllere ihtiyacınız var'));
  if (cta < 0) { console.log('  ✗ kapanış çağrısı bölümü bulunamadı'); process.exit(1); }
  h = h.slice(0, cta) + blok + h.slice(cta);
  if (!/\.sss\{/.test(h)) h = h.replace('</style>', SSS_CSS + '\n  </style>');
  notlar.push(`görünür SSS eklendi — ${SORULAR.length} soru`);
}

/* ── 2. FAQPage şeması + dateModified ── */
const sm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const j = JSON.parse(sm[1]);
const tur = (n) => [n['@type']].flat();
if (j['@graph'].some((n) => tur(n).includes('FAQPage'))) notlar.push('FAQPage zaten var');
else {
  j['@graph'].push({
    '@type': 'FAQPage',
    '@id': `${KANONIK}/hizmetler/#sss`,
    dateModified: TARIH,
    mainEntity: SORULAR.map((q) => ({
      '@type': 'Question',
      name: q.s,
      acceptedAnswer: { '@type': 'Answer', text: `${q.k} ${q.d}` },
    })),
  });
  const sayfa = j['@graph'].find((n) => tur(n).includes('WebPage'));
  if (sayfa && !sayfa.dateModified) sayfa.dateModified = TARIH;
  h = h.replace(sm[0], '<script type="application/ld+json">\n'
    + JSON.stringify(j, null, 2) + '\n</script>');
  notlar.push(`FAQPage + dateModified (${TARIH}) eklendi`);
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — /hizmetler/\n`);
notlar.forEach((n) => console.log('  · ' + n));
if (UYGULA) fs.writeFileSync(F, h, 'utf8');
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
