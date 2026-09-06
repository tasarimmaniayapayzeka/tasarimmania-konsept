/* GEO onarım — Aşama 16: hizmet sayfalarındaki kaynak bağlantısının görünümü
 *
 * ÖLÇÜLEN SORUN: Aşama 15'te eklenen dış kaynak bağlantıları hizmet
 * sayfalarında gövde metninden HİÇ ayrışmıyordu — rengi paragrafla aynı
 * (rgb(114,125,147)), altı çizili değil. Tarayıcıda ölçüldü.
 * Bu hem kullanılabilirlik hem erişilebilirlik sorunu: bağlantının yalnız
 * renkle bile değil, hiçbir işaretle ayırt edilemiyor olması.
 *
 * Blog tarafında sorun yok; orada `.yz-govde a` kuralı bağlantıyı vurgu
 * rengine boyayıp altını çiziyor. Hizmet sayfalarında karşılığı yoktu.
 *
 * Çözüm: kaynak bağlantılarına açık bir sınıf (.kaynak) ve dar kapsamlı bir
 * kural. Menü, kart ve buton bağlantılarına dokunulmuyor.
 *
 * Kullanım: node plan/geo-onar-16-kaynak-bicim.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');

const KURAL = `.kaynak{color:var(--acc);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.kaynak:hover{text-decoration-thickness:2px}`;

const KENDI = /tasarimmania|wa\.me|api\.whatsapp|fonts\.|facebook|instagram|linkedin|youtube/i;

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

let n = 0, bagSayisi = 0;
console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);

for (const f of tara(path.join(S, 'hizmetler'))) {
  let h = fs.readFileSync(f, 'utf8');
  const once = h;
  let bu = 0;

  h = h.replace(/<a href="(https?:\/\/[^"]+)" target="_blank" rel="noopener">/g, (t, url) => {
    if (KENDI.test(url)) return t;
    bu++;
    return `<a class="kaynak" href="${url}" target="_blank" rel="noopener">`;
  });
  if (!bu) continue;

  if (!/\.kaynak\{/.test(h)) h = h.replace('</style>', KURAL + '\n  </style>');

  if (h !== once) {
    n++; bagSayisi += bu;
    console.log(`  ✓ ${u(f).padEnd(52)} ${bu} bağ`);
    if (UYGULA) fs.writeFileSync(f, h, 'utf8');
  }
}

console.log(`\n  ${n} sayfa · ${bagSayisi} kaynak bağlantısı biçimlendirildi`);
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
