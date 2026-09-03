/* Video ekranda kaç piksel görünüyor? SVG yazı boyu tabanı buna bağlı.
   1120 px'lik tuval 590 px'e sığıyorsa ölçek 0.527'dir ve 14 px'lik yazı
   ekranda 7.4 px olur — .akis için kullandığımız 9 px tabanının altı. */
const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="OLOUT">bekliyor</pre>
<script>
(function(){
  document.documentElement.style.scrollBehavior = 'auto';
  var v = document.querySelector('.akv-video video');
  setTimeout(function(){
    var r = v.getBoundingClientRect();
    document.getElementById('OLOUT').textContent = 'OLSONUC ' + JSON.stringify({
      genislik: Math.round(r.width), yukseklik: Math.round(r.height),
      olcek: +(r.width / 1120).toFixed(4),
      ekran: innerWidth
    });
  }, 900);
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_ol.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
