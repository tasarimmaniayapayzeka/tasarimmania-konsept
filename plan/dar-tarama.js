/* DAR EKRAN TAM TARAMASI — 62 sayfa, gerçek 320/360 px viewport
 *
 * NEDEN AYRI BİR TARAMA: plan/duzen-olc.js ile yapılan "390px mobil tarama"
 * aslında 500 px'te yapılmıştı — headless Chrome `--window-size` ile 500'ün
 * ALTINA İNMİYOR ve istenen genişliği sessizce yok sayıyor. Bu betik hedefi
 * genişliği ayarlanmış bir <iframe> içinde açar, medya sorguları iframe'in
 * kendi genişliğine göre çalıştığı için 320 gerçekten 320 olur.
 *
 * Ayrıca iframe yüksekliği içeriğe eşitlenir: dikey kaydırma çubuğu 15 px
 * yiyip sonucu karamsar gösteriyordu. Gerçek telefonda çubuk bindirmelidir.
 *
 * Aranan: yatay taşma (negatif margin riski), grafik yazı boyu (eşik 9 px),
 * kırık görsel, ekranda kalan şablon kalıntısı.
 *
 * Kullanım: node plan/dar-tarama.js <hedef-index.html> <genislikler>
 *   → hedefin yanına _dt.html yazar; Chrome ile açıp DTSONUC satırını oku.
 */
const fs = require('fs');
const path = require('path');

const hedef = process.argv[2];
const genislikler = (process.argv[3] || '320,360').split(',').map(Number);
const dosyaAdi = path.basename(hedef);

const HTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>dar tarama</title>
<style>html,body{margin:0;background:#111}</style></head>
<body>
<pre id="DTOUT" style="color:#fff;font:12px monospace">bekliyor</pre>
<script>
(function(){
  var GENISLIKLER = ${JSON.stringify(genislikler)};
  var sonuc = [];

  function olcBir(genislik, bitti) {
    var f = document.createElement('iframe');
    f.style.cssText = 'width:' + genislik + 'px;height:900px;border:0;position:absolute;left:-99999px';
    document.body.appendChild(f);
    f.src = ${JSON.stringify(dosyaAdi)};
    var birKez = false;
    f.addEventListener('load', function(){
      if (birKez) return;   // load birden cok kez tetiklenebiliyor
      birKez = true;
      setTimeout(function(){
        /* kaydırma çubuğunu ortadan kaldır */
        try { f.style.height = (f.contentDocument.documentElement.scrollHeight + 40) + 'px'; } catch (e) {}
        setTimeout(function(){
          var d = f.contentDocument, w = f.contentWindow;
          var kayit = { vp: genislik };
          try {
            kayit.gercek = w.innerWidth;

            /* yatay taşma — kırpan atası olanlar elenir */
            var tasan = [];
            d.querySelectorAll('body *').forEach(function(e){
              var r = e.getBoundingClientRect();
              if (r.width === 0 || r.right <= genislik + 1) return;
              for (var n = e.parentElement; n; n = n.parentElement) {
                var o = w.getComputedStyle(n).overflowX;
                if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') return;
              }
              tasan.push(e.tagName + '.' + String(e.className || '').slice(0, 26));
            });
            kayit.tasan = tasan.slice(0, 3);
            kayit.belgeTasmasi = d.documentElement.scrollWidth > genislik + 1;

            /* grafik yazı boyu — akis ve serp */
            var enKucuk = null, hangi = '';
            d.querySelectorAll('figure.akis, figure.serp').forEach(function(fig){
              var svg = fig.querySelector('svg');
              if (!svg) return;
              var vb = svg.viewBox.baseVal.width || 380;
              var olcek = svg.getBoundingClientRect().width / vb;
              fig.querySelectorAll('text').forEach(function(t){
                var px = parseFloat(w.getComputedStyle(t).fontSize) * olcek;
                if (px > 0 && (enKucuk === null || px < enKucuk)) {
                  enKucuk = px; hangi = fig.className.split(' ')[0];
                }
              });
            });
            kayit.yazi = enKucuk === null ? null : +enKucuk.toFixed(2);
            kayit.grafik = hangi || null;

            /* kırık görsel */
            var kirik = [];
            d.querySelectorAll('img').forEach(function(i){
              if (i.complete && i.naturalWidth === 0) kirik.push((i.getAttribute('src')||'?').split('/').pop());
            });
            kayit.kirik = kirik.slice(0, 3);

            kayit.kalinti = (d.body.innerText.match(/\\b(undefined|NaN|\\[object Object\\])\\b/g) || []).slice(0, 2);
          } catch (e) { kayit.hata = String(e.message).slice(0, 60); }
          sonuc.push(kayit);
          document.body.removeChild(f);
          bitti();
        }, 500);
      }, 600);
    });
  }

  var i = 0;
  (function sira(){
    if (i >= GENISLIKLER.length) {
      document.getElementById('DTOUT').textContent = 'DTSONUC ' + JSON.stringify(sonuc);
      return;
    }
    olcBir(GENISLIKLER[i++], sira);
  })();
})();
</script></body></html>`;

fs.writeFileSync(path.join(path.dirname(hedef), '_dt.html'), HTML, 'utf8');
