/* HİZMET SAYFASI SSS DENETİMİ
 * Şemadaki her soru VE cevabı gerçekten sayfada var mı, tıklayınca görünüyor mu?
 * Google: FAQ içeriği kullanıcıya görünür olmalı; sekme/akordiyon ardında
 * olması SORUN DEĞİL — ama DOM'da bulunmalı ve etkileşimle açılmalı. */
const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="SSSOUT">bekliyor</pre>
<script>
(function(){
  var cikti = document.getElementById('SSSOUT');
  function yaz(o){ cikti.textContent = 'SSSSONUC ' + JSON.stringify(o); }
  var kayit = {};
  /* şemadan soru+cevapları çıkar */
  var sorular = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s){
    try { var j = JSON.parse(s.textContent);
      var liste = j['@type'] === 'FAQPage' ? j.mainEntity
                : (j['@graph'] || []).filter(function(x){return x['@type']==='FAQPage';})[0];
      if (liste && liste.mainEntity) liste = liste.mainEntity;
      if (Array.isArray(liste)) liste.forEach(function(q){
        sorular.push({ s: q.name, c: (q.acceptedAnswer && q.acceptedAnswer.text) || '' });
      });
    } catch(e){}
  });
  kayit.semaSoru = sorular.length;

  var govde = document.body.innerText;
  var html  = document.body.innerHTML;

  kayit.domdaOlmayanSoru  = sorular.filter(function(q){ return html.indexOf(q.s.slice(0,40)) < 0; }).length;
  kayit.domdaOlmayanCevap = sorular.filter(function(q){ return q.c && html.indexOf(q.c.slice(0,40)) < 0; }).length;
  kayit.metindeOlmayanSoru = sorular.filter(function(q){ return govde.indexOf(q.s.slice(0,40)) < 0; }).length;

  /* SSS bileşeni: hangi tür, kaç düğme, panel görünür mü */
  var sd = document.querySelector('[data-sd]');
  var det = document.querySelectorAll('.sss details, .akor details');
  kayit.bilesen = sd ? 'sekme(tablist)' : (det.length ? 'akordiyon(details)' : 'YOK');
  kayit.dugme = sd ? sd.querySelectorAll('.sd-soru').length : det.length;

  /* her soruya tıklayıp cevabın EKRANDA göründüğünü doğrula */
  var gorunmeyen = [];
  if (sd) {
    var dugmeler = [].slice.call(sd.querySelectorAll('.sd-soru'));
    dugmeler.forEach(function(d, i){
      d.click();
      var panel = sd.querySelector('.sd-sag, .sd-panel, [role="tabpanel"]');
      var g = panel ? (panel.innerText || '').trim() : '';
      if (g.length < 40) gorunmeyen.push(i + 1);
    });
    kayit.tiklamaSonrasiBosPanel = gorunmeyen;
  }
  yaz(kayit);
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_sss.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
