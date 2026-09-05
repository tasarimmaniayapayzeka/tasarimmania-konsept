/* SSS CEVAPLARI GERÇEKTEN GÖRÜNÜYOR MU — sağlam sınama.
 *
 * ÖNCEKİ SINAMANIN AÇIĞI: metni ham HTML'de (veya body.innerHTML'de) aramak
 * DAİRESELDİR — JSON-LD bloğu da HTML'in içindedir, dolayısıyla şema kendini
 * doğrular. Görünürlüğün tek geçerli ölçütü innerText'tir (script içeriği
 * innerText'e girmez).
 *
 * Ayrıca sekme düzeninde yalnız SEÇİLİ panelin metni görünür; bu yüzden her
 * sekmeye tıklanıp görünen metin BİRİKTİRİLİR.
 */
const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="GOROUT">bekliyor</pre>
<script>
(function(){
  var sorular = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s){
    try { var j = JSON.parse(s.textContent);
      var f = j['@type']==='FAQPage' ? j : (j['@graph']||[]).filter(function(x){return x['@type']==='FAQPage';})[0];
      if (f && f.mainEntity) f.mainEntity.forEach(function(q){
        sorular.push({ s: q.name, c: (q.acceptedAnswer && q.acceptedAnswer.text) || '' });
      });
    } catch(e){}
  });

  /* her sekmeye tıklayıp GÖRÜNEN metni biriktir */
  var havuz = document.body.innerText;
  var sd = document.querySelector('[data-sd]');
  if (sd) {
    [].slice.call(sd.querySelectorAll('.sd-soru')).forEach(function(d){
      d.click();
      havuz += ' ' + document.body.innerText;
    });
  }
  document.querySelectorAll('details').forEach(function(d){ d.open = true; });
  havuz += ' ' + document.body.innerText;

  function sadeles(t){ return t.replace(/\s+/g,' ').replace(/[""'']/g,'"').trim(); }
  var H = sadeles(havuz);

  var soruYok = [], cevapYok = [];
  sorular.forEach(function(q, i){
    if (H.indexOf(sadeles(q.s).slice(0, 40)) < 0) soruYok.push(i+1);
    if (q.c && H.indexOf(sadeles(q.c).slice(0, 40)) < 0) cevapYok.push(i+1);
  });

  document.getElementById('GOROUT').textContent = 'GORSONUC ' + JSON.stringify({
    semaSoru: sorular.length,
    gorunmeyenSoru: soruYok,
    gorunmeyenCevap: cevapYok,
    ornekEksik: cevapYok.length ? sorular[cevapYok[0]-1].c.slice(0,70) : null
  });
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_gor.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
