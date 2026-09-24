// Sayaçların HTML'ine gerçek değeri yazar (JS çalıştırmayan tarayıcı / yapay zekâ botu "0" görmesin).
// data-say (tm.js) ve ana sayfadaki data-count (satır içi betik) sayaçları. Animasyon JS'te 0'dan başlar.
const fs = require('fs');
const path = require('path');
const SITE = path.join(__dirname, '..', 'site');
const dosyalar = ['index.html', 'en/index.html', 'hakkimizda/index.html', 'en/about/index.html',
  'hizmetler/index.html', 'en/services/index.html'];

for (const d of dosyalar) {
  const f = path.join(SITE, d);
  let t = fs.readFileSync(f, 'utf8');
  let n = 0;
  t = t.replace(/(data-say="([^"]*)"[^>]*>)0</g, (m, a, v) => {
    n++;
    const ondalik = (v.split('.')[1] || '').length;
    return a + parseFloat(v).toLocaleString('tr-TR', { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }) + '<';
  });
  t = t.replace(/(<b data-count="([^"]*)" data-suffix="([^"]*)">)0</g, (m, a, v, s) => {
    n++;
    return a + (parseFloat(v) || 0).toLocaleString('tr-TR') + s + '<';
  });
  // ana sayfanın satır içi sayaç betiği: animasyon için 0'dan başlat
  if (t.includes("var els = $$('[data-count]');") && !t.includes('animasyon için sıfırlanır')) {
    t = t.replace('  function run(el){',
      '  // HTML gerçek değeri taşır (JS çalıştırmayan bot "0" görmesin); animasyon için sıfırlanır\n' +
      '  if (!reduced) els.forEach(function(el){ el.textContent = fmt(0); });\n\n  function run(el){');
    n++;
  }
  fs.writeFileSync(f, t);
  console.log(d, n);
}
