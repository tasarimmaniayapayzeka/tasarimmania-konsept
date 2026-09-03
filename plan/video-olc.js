/* .akv-video OYNUYOR MU — güvenilir sürüm (3. deneme).
 *
 * İKİ KUSURLU ÖLÇÜM YAŞANDI, ikisi de KODU değil ÖLÇÜMÜ suçlamalıydı:
 *  1) scrollIntoView çağırıp hemen ölçmek: normal modda tembel görseller
 *     yüklendikçe sayfa büyüyor, hedef aşağı kaçıyor (rectTop 844→1557).
 *     Öğe hiç görünmediği için gözlemci tetiklenmiyor ve video "hiç
 *     oynamıyor" sanılıyordu. Sayfada zaten bir IntersectionObserver var.
 *  2) --autoplay-policy bayrağı: gerçek kullanıcıda yok, kullanılmaz.
 *
 * Çözüm: önce sayfayı baştan sona gezip tembel içeriği yükle, düzen
 * oturunca mutlak konuma git, konum SABİTLENENE kadar tekrarla. */
const fs = require('fs');
const src = process.argv[2];
const OLCUM = `
<pre id="VDOUT">bekliyor</pre>
<script>
(function(){
  var v = document.querySelector('.akv-video video');
  var cikti = document.getElementById('VDOUT');
  if (!v) { cikti.textContent = 'VDSONUC {"hata":"video yok"}'; return; }
  /* KRİTİK: html{scroll-behavior:smooth} (tm.css:60) scrollTo yu ANIMASYONLU
     yapar; hemen ölçünce konum hâlâ eskidir. Hareket kısıtlı modda reduce
     bloğu bunu auto ya çevirdiği için orada çalışıyor, normalde çalışmıyordu.
     Üç ölçüm bu yüzden yanlış okundu. Ölçüm süresince anlık kaydırmaya al. */
  document.documentElement.style.scrollBehavior = 'auto';
  var kayit = { azalt: matchMedia('(prefers-reduced-motion: reduce)').matches,
                dataDongu: v.hasAttribute('data-dongu') };

  /* 1) tembel içeriği yükletmek için sayfayı gez */
  var y = 0;
  (function gez(){
    y += 700;
    window.scrollTo(0, y);
    if (y < document.body.scrollHeight + 1400) return setTimeout(gez, 60);
    setTimeout(hedefeGit, 500);
  })();

  /* 2) konum sabitlenene kadar öğeye git */
  var deneme = 0, sonTop = null;
  function hedefeGit(){
    var mutlak = window.scrollY + v.getBoundingClientRect().top;
    window.scrollTo(0, Math.max(0, mutlak - innerHeight / 2 + v.offsetHeight / 2));
    window.dispatchEvent(new Event('scroll'));
    var top = Math.round(v.getBoundingClientRect().top);
    if (sonTop !== top && ++deneme < 10) { sonTop = top; return setTimeout(hedefeGit, 220); }
    kayit.deneme = deneme;
    kayit.rectTop = top;
    kayit.gorunur = top < innerHeight - 40 && top + v.offsetHeight > 40;
    setTimeout(olc, 1600);
  }

  function olc(){
    kayit.paused = v.paused;
    var t1 = v.currentTime;
    setTimeout(function(){
      kayit.zaman1 = +t1.toFixed(2);
      kayit.zaman2 = +v.currentTime.toFixed(2);
      kayit.ilerledi = v.currentTime > t1 + 0.05;
      kayit.kaynak = (v.currentSrc || '').split('/').slice(-1)[0];
      cikti.textContent = 'VDSONUC ' + JSON.stringify(kayit);
    }, 1700);
  }
})();
</script>`;
fs.writeFileSync(src.replace(/index\.html$/, '_vd.html'),
  fs.readFileSync(src, 'utf8').replace('</body>', OLCUM + '</body>'), 'utf8');
