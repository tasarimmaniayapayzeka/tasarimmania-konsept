// Blog detay sayfalarına "C · Bento" tasarımını uygular (kullanıcı kararı, 24 Eylül 2026).
// Kapsam: site/blog/*/index.html ve site/en/blog/*/index.html — yerinde dönüştürür.
// Farklı şablondaki sayfalar (ör. e-ticaret-seo-yeni) ve zaten dönüşmüş sayfalar atlanır.
// Tasarım çizgisi: görseller küçük, çerçeveli, sabit oranlı; başlık + kapak + bilgi kutuları
// bento ızgarasında; içindekiler çipleri; her bölüm numaralı kendi kartında; "kısa cevap" etiketli.
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'site');

function parca(s, a, b) {
  const i = s.indexOf(a);
  if (i < 0) return null;
  const j = s.indexOf(b, i + a.length);
  if (j < 0) return null;
  return { outer: s.slice(i, j + b.length), inner: s.slice(i + a.length, j) };
}
const duz = h => h.replace(/<[^>]+>/g, '').trim();
const slug = t => t.toLocaleLowerCase('tr')
  .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const iki = n => String(n).padStart(2, '0');

const METIN = {
  tr: { kategori: 'Kategori', yayin: 'Yayın', okuma: 'Okuma', bolum: 'Bölüm', baslik: 'başlık',
        kisa: 'Kısa cevap', icindekiler: 'İçindekiler',
        sure: s => s.replace(' dakikalık okuma', ' dk') },
  en: { kategori: 'Category', yayin: 'Published', okuma: 'Reading', bolum: 'Section', baslik: 'sections',
        kisa: 'Short answer', icindekiler: 'Contents',
        sure: s => s.replace(' min read', ' min') }
};

const CSS = dil => `
/* ===== blog detay: Bento düzeni ===== */
.ox-hd{position:relative;isolation:isolate;overflow:hidden}
.ox-hd::before{content:"";position:absolute;inset:0;z-index:-1;
  background:radial-gradient(900px 430px at 14% -12%,rgba(var(--acc-rgb),.13),transparent 62%)}
.ox-hd .crumb{margin-bottom:20px;min-width:0;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ox-hd .ozet{color:var(--fg-dim);font-size:clamp(15.5px,1.7vw,17.5px);line-height:1.75;max-width:62ch;margin:0}
/* görsel dili: küçük, çerçeveli, sabit oran */
.ox-img{margin:0}
.ox-img img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:12px;
  border:1px solid var(--hair);background:#0d1017}
.ox-img figcaption{margin-top:10px;font-size:12.6px;line-height:1.55;color:var(--muted)}
.ox-img .yz-ai{display:block;margin-top:5px;font-size:9.6px;white-space:normal}
.yz-cevap::before{content:"${METIN[dil].kisa}";display:block;font-family:var(--mono);font-size:9.6px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--acc);margin-bottom:8px}
.yz-govde h2{scroll-margin-top:calc(var(--nav-h) + 20px)}
.c-hd{padding:calc(var(--nav-h) + clamp(24px,3.5vw,40px)) 0 clamp(18px,2.5vw,28px)}
.c-bento{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.c-kutu{border:1px solid var(--hair);border-radius:var(--r-lg);background:var(--panel);position:relative;overflow:hidden}
.c-t{grid-column:span 3;padding:clamp(22px,3vw,38px);
  background:radial-gradient(600px 300px at 0% 0%,rgba(var(--acc-rgb),.10),transparent 70%),var(--panel)}
.c-t h1{font-size:clamp(26px,3.8vw,42px);letter-spacing:-.035em;line-height:1.15;margin:0 0 14px;max-width:22ch}
.c-kapak{padding:10px}
.c-kapak img{height:100%;aspect-ratio:auto;min-height:220px}
.c-kapak figcaption{display:none}
.c-m{padding:16px 18px;display:grid;gap:6px}
.c-m span{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.c-m b{font-size:18px;letter-spacing:-.02em;font-weight:600}
.c-m b i{font-style:normal;color:var(--acc)}
.c-cipler{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.c-cipler a{font-size:12.6px;color:var(--fg-dim);border:1px solid var(--hair-strong);border-radius:99px;
  padding:7px 13px;transition:.2s}
.c-cipler a span{font-family:var(--mono);font-size:10.5px;color:var(--acc);margin-right:6px}
.c-cipler a:hover{border-color:var(--acc);color:var(--fg)}
.c-govde{max-width:840px;margin:0 auto;display:grid;gap:14px}
.c-bol{padding:clamp(22px,3vw,36px)}
.c-bol-ust{display:flex;justify-content:space-between;align-items:center;gap:12px;font-family:var(--mono);
  font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);
  padding-bottom:14px;margin-bottom:20px;border-bottom:1px solid var(--hair)}
.c-bol-ust b{color:var(--acc);font-weight:500}
.c-govde.yz-govde h2{margin-top:0}
.c-bol .yz-gorsel{display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:end;margin:26px 0 10px}
.c-bol .yz-kopru{margin-bottom:10px}
.ilgili-bolum .yz-ilgili,#sss .sec-head,#sss .yz-sss{max-width:840px;margin-inline:auto}
@media(max-width:860px){.c-bento{grid-template-columns:repeat(2,minmax(0,1fr))}.c-t,.c-kapak{grid-column:1/-1}
  .c-kapak img{aspect-ratio:16/9;min-height:0;max-height:220px}
  .c-bol .yz-gorsel{grid-template-columns:1fr}.c-bol .yz-gorsel img{max-width:360px}}
`;

function donustur(dosya) {
  const src = fs.readFileSync(dosya, 'utf8');
  if (src.includes('class="c-bento"')) return 'zaten';
  const header = parca(src, '<header class="phd">', '</header>');
  const kapak = parca(src, '<figure class="yz-kapak">', '</figure>');
  const govdeP = parca(src, '<article class="yz-govde">', '</article>');
  if (!header || !kapak || !govdeP || !src.includes('<main id="ana">')) return 'farklı şablon';

  const dil = (src.match(/<html lang="(\w+)"/) || [])[1] === 'en' ? 'en' : 'tr';
  const M = METIN[dil];
  const crumb = parca(header.inner, '<nav class="crumb"', '</nav>').outer;
  const ust = parca(header.inner, '<div class="yz-ust">', '</div>').outer;
  const h1 = parca(header.inner, '<h1>', '</h1>').outer;
  const ozet = parca(header.inner, '<p class="ozet">', '</p>').outer;
  // eski etiket CSS ile büyük harfe çevriliyordu; bilgi kutusunda olduğu gibi yazılır, kısaltma düzeltilir
  const kategori = duz(parca(ust, '<span class="yz-kat">', '</span>').inner).replace(/^Seo$/, 'SEO');
  const [tarih, okuma = ''] = duz(parca(ust, '<span class="yz-meta">', '</span>').inner).split(' · ');

  const kapakImg = parca(kapak.outer, '<img', '>').outer
    .replace(/sizes="[^"]*"/, 'sizes="(max-width: 860px) 100vw, 300px"').replace(/\s*fetchpriority="high"/, '');
  const kapakCap = parca(kapak.outer, '<figcaption>', '</figcaption>').inner;

  let govde = govdeP.inner
    .replace('<figure class="yz-gorsel">', '<figure class="yz-gorsel ox-img">')
    .replace(/(<figure class="yz-gorsel ox-img">\s*<img[^>]*?)sizes="[^"]*"/, '$1sizes="(max-width: 860px) 100vw, 260px"');
  const basliklar = [];
  const kullanilan = new Set();
  govde = govde.replace(/<h2>(.*?)<\/h2>/g, (_, t) => {
    let id = slug(duz(t)) || 'bolum';
    while (kullanilan.has(id)) id += '-2';
    kullanilan.add(id);
    basliklar.push({ id, t: duz(t) });
    return `<h2 id="${id}">${t}</h2>`;
  });
  const N = basliklar.length;
  const bolumler = govde.split(/(?=<h2 id=)/).filter(p => p.trim());
  // ilk h2'den önce içerik varsa ilk karta dahil et
  if (bolumler.length > N) bolumler.splice(0, 2, bolumler[0] + bolumler[1]);

  const mainBas = src.indexOf('<main id="ana">');
  const govdeSonu = src.indexOf('</section>', src.indexOf('</article>')) + '</section>'.length;

  const yeniMain = `<main id="ana">
  <header class="ox-hd c-hd">
    <div class="wrap">
      <div class="c-bento">
        <div class="c-kutu c-t">
          ${crumb}
          ${h1}
          ${ozet}
        </div>
        <figure class="ox-img c-kutu c-kapak">${kapakImg}<figcaption>${kapakCap}</figcaption></figure>
        <div class="c-kutu c-m"><span>${M.kategori}</span><b><i aria-hidden="true">●</i> ${kategori}</b></div>
        <div class="c-kutu c-m"><span>${M.yayin}</span><b>${tarih}</b></div>
        <div class="c-kutu c-m"><span>${M.okuma}</span><b>${M.sure(okuma)}</b></div>
        <div class="c-kutu c-m"><span>${M.bolum}</span><b>${N} ${M.baslik}</b></div>
      </div>
      <nav class="c-cipler" aria-label="${M.icindekiler}">${basliklar.map((b, i) => `<a href="#${b.id}"><span>${iki(i + 1)}</span>${b.t}</a>`).join('')}</nav>
    </div>
  </header>

  <section class="sec" style="padding-top:clamp(20px,3vw,32px)">
    <div class="wrap">
      <article class="yz-govde c-govde">
${bolumler.map((p, i) => `        <section class="c-kutu c-bol"><div class="c-bol-ust"><b>${M.bolum} ${iki(i + 1)}</b><span>${iki(i + 1)} / ${iki(N)}</span></div>${p.trim()}</section>`).join('\n')}
      </article>
    </div>
  </section>`;

  const out = (src.slice(0, mainBas) + yeniMain + src.slice(govdeSonu))
    .replace('</style>', CSS(dil) + '</style>');
  fs.writeFileSync(dosya, out);
  return 'tamam';
}

const sonuc = {};
for (const kok of [path.join(SITE, 'blog'), path.join(SITE, 'en', 'blog')]) {
  for (const ad of fs.readdirSync(kok)) {
    const f = path.join(kok, ad, 'index.html');
    if (!fs.existsSync(f)) continue;
    const r = donustur(f);
    (sonuc[r] = sonuc[r] || []).push(path.relative(SITE, path.dirname(f)));
  }
}
for (const [k, v] of Object.entries(sonuc)) console.log(`${k}: ${v.length}${k === 'tamam' ? '' : ' → ' + v.join(', ')}`);
