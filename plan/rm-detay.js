const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="RMOUT">bekliyor</pre>
<script>
(function(){
  var f = document.querySelector('figure.akis, figure.serp');
  setTimeout(function(){
    f.classList.add('in');
    setTimeout(function(){
      var kayit = [];
      f.querySelectorAll('svg *').forEach(function(e){
        if (!e.getBBox) return;
        var c = String(e.getAttribute('class') || '');
        if (/parla|isik|hale|akan|halka/i.test(c)) return;
        var s = getComputedStyle(e);
        if (parseFloat(s.opacity) < 0.05) {
          kayit.push({ etiket: e.tagName, sinif: c || '(yok)',
            anim: s.animationName, gecikme: s.animationDelay, sure: s.animationDuration,
            metin: (e.textContent || '').trim().slice(0, 30) });
        }
      });
      document.getElementById('RMOUT').textContent = 'RMSONUC ' + JSON.stringify(kayit);
    }, 400);
  }, 400);
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_rmt.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
