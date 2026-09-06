/* GEO onarım — Aşama 12: Person entity (yazar/uzman kimliği)
 *
 * Denetimin kalan tek bulgusuydu: sitede hiç Person şeması yoktu. Rehberin
 * E-E-A-T bölümü içeriğin arkasında adı geçen bir kişi arıyor.
 *
 * ⚠ BU BİLGİ UYDURULAMAZDI ve uydurulmadı. Site bilinçli olarak isim
 *   yayınlamıyor ("Projede kimin çalışacağını ilk görüşmede isim isim
 *   söyleriz"), KVKK metni bile yalnız "TasarımMania" diyor. Ad, unvan ve
 *   sosyal bağlantı KULLANICIDAN alındı (6 Eyl 2026).
 *
 * ⚠ ŞEMA ÖNCE GÖRÜNÜR İÇERİK: /hakkimizda/ sayfasına gerçek bir "Kurucu"
 *   bölümü eklenir, Person düğümü onun üstüne kurulur. Görünür karşılığı
 *   olmayan kişi işaretlemesi, FAQPage'de olduğu gibi, boş iddiadır.
 *
 * ⚠ 42 BLOG YAZISININ author ALANI Organization'dan Person'a geçer. Bu,
 *   yazıların tamamını tek kişiye atfeder — kullanıcı kararı. Geri almak
 *   için AUTHOR_PERSON'u false yapıp betiği yeniden koşmak yeterli.
 *
 * Kullanım: node plan/geo-onar-12-person.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';
const AUTHOR_PERSON = true;      /* blog author → Person mı, Organization mı */

const KISI = {
  ad: 'İhsan Ar',
  unvan: 'Dijital Pazarlama Uzmanı',
  rol: 'Kurucu · Dijital Pazarlama Uzmanı',
  sosyal: 'https://www.instagram.com/ihsanar86/',
  capa: `${KANONIK}/hakkimizda/#ihsan-ar`,
  sayfa: `${KANONIK}/hakkimizda/#kurucu`,
};

const PERSON = {
  '@type': 'Person',
  '@id': KISI.capa,
  name: KISI.ad,
  jobTitle: KISI.unvan,
  url: KISI.sayfa,
  sameAs: [KISI.sosyal],
  worksFor: { '@id': KANONIK + '/#kurulus' },
};

/* Görünür bölüm. Metin yalnız şemanın iddia ettiği kadarını söylüyor:
   kurucu ve yayın sorumlusu. Biyografi uydurulmuyor. */
const BOLUM = `  <section class="sec" id="kurucu" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <span class="eyebrow"><i></i>Kurucu</span>
        <h2 data-kin>Bu sitedeki içerik kimin imzasını taşıyor</h2>
      </div>
      <div class="krc rv d1">
        <h3 id="ihsan-ar">${KISI.ad}</h3>
        <p class="krc-unvan">${KISI.rol}</p>
        <p>TasarımMania'nın kurucusu. Sitedeki hizmet sayfalarının ve blog yazılarının
          yayın sorumlusu; hangi konunun ne zaman ve hangi derinlikte yazılacağına karar veriyor.</p>
        <p class="krc-bag">
          <a href="${KISI.sosyal}" target="_blank" rel="noopener me">Instagram</a>
          <a href="../iletisim/">İletişim sayfası</a>
        </p>
      </div>
    </div>
  </section>
`;

/* ⚠ ÖZGÜLLÜK TUZAĞI: ".krc p" (0,1,1) ".krc-unvan"den (0,1,0) güçlü;
   unvan vurgu rengini alamayıp muted kalıyordu — tarayıcıda ölçüldü.
   Bu yüzden unvan kuralı ".krc p.krc-unvan" olarak yazılıyor. */
const KRC_CSS = `.krc{border:1px solid var(--hair);border-radius:var(--r-md);background:var(--panel);padding:clamp(20px,3vw,30px);max-width:620px}
.krc h3{font-size:clamp(19px,2.2vw,23px);letter-spacing:-.02em;margin-bottom:5px}
.krc p.krc-unvan{font-family:var(--mono);font-size:11.6px;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);margin-bottom:13px}
.krc p{color:var(--muted);font-size:14.4px;line-height:1.7}
.krc-bag{display:flex;flex-wrap:wrap;gap:18px;margin-top:15px}
.krc-bag a{font-size:13.6px;color:var(--fg);border-bottom:1px solid var(--hair-strong);padding-bottom:2px}
.krc-bag a:hover{color:var(--acc);border-color:currentColor}`;

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* ═══ 1. /hakkimizda/ — görünür bölüm + Person + Organization.founder ═══ */
{
  const f = path.join(S, 'hakkimizda/index.html');
  let h = fs.readFileSync(f, 'utf8');
  const notlar = [];

  if (/id="kurucu"/.test(h)) notlar.push('görünür bölüm zaten var');
  else {
    /* "Sekiz kişi, beş disiplin" kadro bölümünden HEMEN SONRA: kadroyu
       anlatan bölümün ardından kurucuyu tanıtmak akışa uyuyor. */
    const ekip = h.indexOf('Sekiz kişi, beş disiplin');
    const bas = h.lastIndexOf('<section', ekip);
    let d = 0, i = bas, son = -1;
    const re = /<section\b|<\/section>/g; re.lastIndex = bas;
    let m;
    while ((m = re.exec(h))) {
      if (m[0] === '</section>') { d--; if (!d) { son = re.lastIndex; break; } } else d++;
    }
    if (son < 0) { console.log('  ✗ kadro bölümünün sonu bulunamadı'); process.exit(1); }
    h = h.slice(0, son) + '\n' + BOLUM + h.slice(son);
    if (!/\.krc\{/.test(h)) h = h.replace('</style>', KRC_CSS + '\n  </style>');
    notlar.push('görünür "Kurucu" bölümü eklendi');
  }

  const sm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const j = JSON.parse(sm[1]);
  const tur = (n) => [n['@type']].flat();
  if (j['@graph'].some((n) => tur(n).includes('Person'))) notlar.push('Person zaten var');
  else {
    j['@graph'].push(PERSON);
    const org = j['@graph'].find((n) => tur(n).includes('Organization') || tur(n).includes('ProfessionalService'));
    if (org && !org.founder) org.founder = { '@id': KISI.capa };
    h = h.replace(sm[0], '<script type="application/ld+json">\n' + JSON.stringify(j, null, 2) + '\n</script>');
    notlar.push('Person + Organization.founder eklendi');
  }
  console.log(`\n  /hakkimizda/`);
  notlar.forEach((n) => console.log('    · ' + n));
  if (UYGULA) fs.writeFileSync(f, h, 'utf8');
}

/* ═══ 2. blog yazıları — Article.author → Person ═══ */
let blogSayisi = 0;
for (const f of tara(S).filter((x) => /^\/blog\/[^/]+\/$/.test(u(x)))) {
  let h = fs.readFileSync(f, 'utf8');
  const sm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!sm) continue;
  const j = JSON.parse(sm[1]);
  const tur = (n) => [n['@type']].flat();
  const art = j['@graph'].find((n) => tur(n).includes('Article'));
  if (!art) continue;

  const hedef = AUTHOR_PERSON ? { '@id': KISI.capa }
    : { '@type': 'Organization', name: 'TasarımMania', url: KANONIK + '/' };
  if (JSON.stringify(art.author) === JSON.stringify(hedef)
    && j['@graph'].some((n) => tur(n).includes('Person')) === AUTHOR_PERSON) continue;

  art.author = hedef;
  const varMi = j['@graph'].findIndex((n) => tur(n).includes('Person'));
  if (AUTHOR_PERSON && varMi < 0) j['@graph'].push(PERSON);
  if (!AUTHOR_PERSON && varMi >= 0) j['@graph'].splice(varMi, 1);

  h = h.replace(sm[0], '<script type="application/ld+json">\n' + JSON.stringify(j, null, 2) + '\n</script>');
  /* head'deki meta author da yazının gerçek yazarını göstersin */
  h = h.replace(/<meta name="author" content="[^"]*">/,
    `<meta name="author" content="${AUTHOR_PERSON ? KISI.ad : 'TasarımMania'}">`);
  blogSayisi++;
  if (UYGULA) fs.writeFileSync(f, h, 'utf8');
}

console.log(`\n  blog yazısı        · ${blogSayisi} sayfada author → ${AUTHOR_PERSON ? KISI.ad : 'TasarımMania'}`);
console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'}` + (UYGULA ? '\n' : '\n\n  Uygulamak için: --uygula\n'));
