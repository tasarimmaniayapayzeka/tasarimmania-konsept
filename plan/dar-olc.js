/* DAR EKRAN ÖLÇÜMÜ — .akis grafiğinde gerçek yazı boyu
 *
 * NEDEN IFRAME: headless Chrome `--window-size` ile 500 px'in ALTINA İNMİYOR.
 * 320 / 360 / 375 / 390 istendiğinde dördü de innerWidth 500 döndürüyor ve
 * ölçümler birebir aynı çıkıyor — yani dar ekran hiç ölçülmemiş oluyor.
 * (Bu yüzden daha önceki "390 px mobil tarama" aslında 500 px'te yapılmış.)
 *
 * Çözüm: hedef sayfayı genişliği ayarlanmış bir <iframe> içinde açmak.
 * Medya sorguları iframe'in KENDİ genişliğine göre çalışır, dolayısıyla
 * 320 px gerçekten 320 px olur. file:// sayfaları --allow-file-access-from-files
 * ile aynı köken sayılır, contentDocument okunabilir.
 *
 * Kullanım: node plan/dar-olc.js <hedef-index.html> <genislikler virgüllü>
 *   → hedefin yanına _dar.html yazar; Chrome ile açıp DARSONUC satırını oku.
 */
const fs = require('fs');
const path = require('path');

const hedef = process.argv[2];
const genislikler = (process.argv[3] || '320,360,375,414').split(',').map(Number);
const dosyaAdi = path.basename(hedef);

const HTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>dar olcum</title>
<style>html,body{margin:0;background:#111}</style></head>
<body>
<pre id="DAROUT" style="color:#fff;font:12px monospace">bekliyor</pre>
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
        try {
          var yh = f.contentDocument.documentElement.scrollHeight;
          f.style.height = (yh + 40) + 'px';
        } catch (e) {}
        setTimeout(function(){
        var d = f.contentDocument, w = f.contentWindow;
        var kayit = { istenen: genislik };
        try {
          kayit.gercek = w.innerWidth;
          var fig = d.querySelector('figure.akis');
          if (!fig) { kayit.hata = 'akis yok'; }
          else {
            var kutu = fig.querySelector('.akis-kutu');
            var svg  = fig.querySelector('.akis-kutu svg');
            var vb = svg.viewBox.baseVal.width || 380;
            var sr = svg.getBoundingClientRect();
            kayit.kutuGen = Math.round(kutu.getBoundingClientRect().width);
            kayit.svgGen  = Math.round(sr.width);
            kayit.olcek   = +(sr.width / vb).toFixed(4);
            var en = 1e9, enMetin = '';
            fig.querySelectorAll('text').forEach(function(t){
              var px = parseFloat(w.getComputedStyle(t).fontSize) * kayit.olcek;
              if (px > 0 && px < en) { en = px; enMetin = (t.textContent||'').trim().slice(0,20); }
            });
            kayit.enKucukYazi = +en.toFixed(2);
            kayit.enKucukMetin = enMetin;
            var wrap = fig.closest('.wrap');
            kayit.wrapPad = wrap ? w.getComputedStyle(wrap).paddingLeft : '?';
            kayit.akisPad = w.getComputedStyle(fig).paddingLeft;
            kayit.kutuPad = w.getComputedStyle(kutu).paddingLeft;
            kayit.tasma = d.documentElement.scrollWidth > genislik + 1;
            var wr = fig.closest('.wrap');
            kayit.wrapGen = wr ? Math.round(wr.getBoundingClientRect().width) : 0;
            kayit.figGen  = Math.round(fig.getBoundingClientRect().width);
            kayit.figMargin = w.getComputedStyle(fig).marginLeft + '/' + w.getComputedStyle(fig).marginRight;
            var izg = fig.querySelector('.akis-izgara');
            kayit.izgaraGen = izg ? Math.round(izg.getBoundingClientRect().width) : 0;
            kayit.izgaraPad = izg ? w.getComputedStyle(izg).paddingLeft : '?';
            kayit.figBorder = w.getComputedStyle(fig).borderLeftWidth;
            kayit.kutuMax = w.getComputedStyle(kutu).maxWidth;
          }
        } catch (e) { kayit.hata = String(e.message).slice(0, 60); }
        sonuc.push(kayit);
        document.body.removeChild(f);
        bitti();
        }, 500);
      }, 500);
    });
  }

  var i = 0;
  (function sira(){
    if (i >= GENISLIKLER.length) {
      document.getElementById('DAROUT').textContent = 'DARSONUC ' + JSON.stringify(sonuc);
      return;
    }
    olcBir(GENISLIKLER[i++], sira);
  })();
})();
</script></body></html>`;

fs.writeFileSync(path.join(path.dirname(hedef), '_dar.html'), HTML, 'utf8');
console.log('yazildi: ' + path.join(path.dirname(hedef), '_dar.html'));
