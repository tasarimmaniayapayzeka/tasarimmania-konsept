/* HAREKET KISITLI MODDA GÖRÜNÜRLÜK ÖLÇÜMÜ
 *
 * NEDEN: tm.css'in reduce bloğu animation-duration'ı sıfırlıyordu ama
 * animation-delay'i DEĞİL. Akış grafiklerinde canlanma sırası delay ile
 * kurulduğu için (en geç öğe 2.18s), hareketi kapatan kullanıcı grafiği
 * saniyelerce boş görüyordu. Ölçüldü: 300ms'de 21 öğe gizliydi.
 *
 * DEDEKTÖR TUZAĞI (bir kez düştüm): kasıtlı sönme efektlerinin son hâli
 * zaten opacity:0'dır (imleç yazma bitince kaybolur, parlama söner). Bunlar
 * kusur değil. Ama sınıf ADI çoğu zaman ATADA durur — .ks-isik > rect
 * çocuklarının kendi sınıfı yoktur. Bu yüzden ata zinciri taranmalı.
 *
 * Kullanım: node plan/rm-olc.js <index.html yolu>  → yanına _rmt.html yazar
 */
const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="RMOUT">bekliyor</pre>
<script>
(function(){
  var cikti = document.getElementById('RMOUT');
  function yaz(o){ cikti.textContent = 'RMSONUC ' + JSON.stringify(o); }
  var f = document.querySelector('figure.akis, figure.serp');
  if (!f) { yaz({hata:'figure yok'}); return; }
  /* kasıtlı sönen/parlayan efektler — son hâlleri zaten opacity:0 */
  var SONEN = /parla|isik|hale|akan|halka|imlec|yanip/i;
  function sonenMi(e){
    for (var n = e; n && n !== f; n = n.parentNode) {
      if (n.getAttribute && SONEN.test(String(n.getAttribute('class') || ''))) return true;
    }
    return false;
  }
  f.scrollIntoView();
  window.dispatchEvent(new Event('scroll'));
  setTimeout(function(){
    f.classList.add('in');
    setTimeout(function(){
      var gizli = [], toplam = 0;
      f.querySelectorAll('svg *').forEach(function(e){
        if (!e.getBBox || sonenMi(e)) return;
        toplam++;
        if (parseFloat(getComputedStyle(e).opacity) < 0.05) {
          gizli.push(String(e.getAttribute('class') || e.tagName));
        }
      });
      yaz({ reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
            olculen: toplam, gizli300ms: gizli.length, ornek: gizli.slice(0, 3) });
    }, 300);
  }, 400);
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_rmt.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
