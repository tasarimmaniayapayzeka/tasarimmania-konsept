/* DÜZEN ÖLÇÜMÜ — sayfanın kendisine enjekte edilir, file:// ile ölçülür.
 * (Sunucu gerektirmez; 8020 kapalıyken de çalışır.)
 * Aranan: yatay taşma, ekranda kalan şablon kalıntısı, kırık görsel,
 *         grafik yazı boyu, akış kutularının dizilimi. */
const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="DZOUT">bekliyor</pre>
<script>
(function(){
  function olc(){
    var b = {};
    b.genislik = innerWidth;
    /* yatay taşma — kırpan atası olanları eleyerek */
    var tasan = [];
    document.querySelectorAll('body *').forEach(function(e){
      var r = e.getBoundingClientRect();
      if (r.width === 0 || r.right <= innerWidth + 1) return;
      for (var n = e.parentElement; n; n = n.parentElement) {
        var o = getComputedStyle(n).overflowX;
        if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') return;
      }
      tasan.push(e.tagName + '.' + String(e.className || '').slice(0, 30));
    });
    b.tasan = tasan.slice(0, 3);
    b.belgeTasmasi = document.documentElement.scrollWidth > innerWidth + 1;
    /* ekranda kalan şablon kalıntısı */
    b.kalinti = (document.body.innerText.match(/\b(undefined|null|NaN|\[object Object\])\b/g) || []).slice(0, 3);
    /* kırık görsel — sadece yüklenmesi beklenenler */
    var kirik = [];
    document.querySelectorAll('img').forEach(function(i){
      if (i.loading === 'lazy' && i.getBoundingClientRect().top > innerHeight * 2) return;
      if (i.complete && i.naturalWidth === 0) kirik.push(i.getAttribute('src') || '?');
    });
    b.kirik = kirik.slice(0, 3);
    /* grafik: en küçük gerçek yazı + dizilim */
    var f = document.querySelector('figure.akis, figure.serp');
    if (f) {
      var svg = f.querySelector('svg');
      var vb = svg.viewBox.baseVal.width || 380;
      var olcek = svg.getBoundingClientRect().width / vb;
      var en = 1e9;
      f.querySelectorAll('text').forEach(function(t){
        var fs2 = parseFloat(getComputedStyle(t).fontSize) * olcek;
        if (fs2 > 0 && fs2 < en) en = fs2;
      });
      b.enKucukYazi = en === 1e9 ? null : Math.round(en * 100) / 100;
      var k = [].slice.call(f.querySelectorAll('.akis-kutu'));
      if (k.length === 3) {
        var t0 = k.map(function(x){ return Math.round(x.getBoundingClientRect().top); });
        b.dizilim = (t0[0] === t0[1] && t0[1] === t0[2]) ? 'yanyana' : 'altalta';
      }
    }
    document.getElementById('DZOUT').textContent = 'DZSONUC ' + JSON.stringify(b);
  }
  if (document.readyState === 'complete') setTimeout(olc, 250);
  else addEventListener('load', function(){ setTimeout(olc, 250); });
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_dz.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
