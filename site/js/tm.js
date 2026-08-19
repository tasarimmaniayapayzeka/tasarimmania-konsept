/* ==========================================================================
   TasarımMania — paylaşılan davranış katmanı
   Harici kütüphane yok. Tüm modüller kendi kancasını arar, bulamazsa sessizce çıkar.
   ========================================================================== */
(function () {
  "use strict";

  var AZALT = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, k) { return (k || document).querySelector(s); };
  var $$ = function (s, k) { return [].slice.call((k || document).querySelectorAll(s)); };

  /* --- 1. Görünürlük ölçümü ------------------------------------------------
     IntersectionObserver bazı gömülü/önizleme bağlamlarında hiç tetiklenmiyor;
     bu yüzden konum ölçümü zamanlayıcı tabanlı yapılıyor (rAF'a bağlı değil). */
  var izlenen = [];
  function gorunurMu(el, pay) {
    var r = el.getBoundingClientRect(), h = window.innerHeight || 800;
    pay = pay == null ? 0.12 : pay;
    return r.top < h * (1 - pay) && r.bottom > h * pay;
  }
  var sonKontrol = 0;
  function kontrol() {
    var simdi = Date.now();
    if (simdi - sonKontrol < 90) return;
    sonKontrol = simdi;
    for (var i = izlenen.length - 1; i >= 0; i--) {
      var it = izlenen[i], acik = gorunurMu(it.el, it.pay);
      if (acik !== it.durum) { it.durum = acik; it.cb(acik); if (it.tek && acik) izlenen.splice(i, 1); }
    }
  }
  function izle(el, cb, opt) {
    opt = opt || {};
    izlenen.push({ el: el, cb: cb, durum: false, tek: !!opt.tek, pay: opt.pay });
  }
  window.addEventListener('scroll', kontrol, { passive: true });
  window.addEventListener('resize', kontrol, { passive: true });

  /* --- 2. Beliren öğeler --------------------------------------------------- */
  $$('.rv').forEach(function (el) {
    if (AZALT) { el.classList.add('in'); return; }
    izle(el, function (a) { if (a) el.classList.add('in'); }, { tek: true, pay: 0.06 });
  });

  /* --- 3. Sayaçlar --------------------------------------------------------- */
  $$('[data-say]').forEach(function (el) {
    var hedef = parseFloat(el.dataset.say);
    var ondalik = (el.dataset.say.split('.')[1] || '').length;
    var bicim = function (v) {
      return v.toLocaleString('tr-TR', { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik });
    };
    if (AZALT || isNaN(hedef)) { el.textContent = bicim(hedef || 0); return; }
    izle(el, function (a) {
      if (!a) return;
      var t0 = null, sure = 1500;
      (function adim(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / sure, 1);
        el.textContent = bicim(hedef * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(adim);
      })(performance.now());
    }, { tek: true, pay: 0.2 });
  });

  /* --- 4. Scroll'a bağlı 3D simülasyon ------------------------------------
     Videonun zamanı doğrudan scroll konumuna bağlanır: kullanıcı kaydırdıkça
     obje döner. Gerçek zamanlı 3D hissi verir, tek bir mp4 maliyetiyle. */
  $$('[data-scrub]').forEach(function (sarmal) {
    var vid = $('video', sarmal);
    if (!vid) return;
    vid.pause();
    vid.removeAttribute('autoplay');
    var sure = 0, hazir = false;
    function olc() { sure = vid.duration || 0; hazir = sure > 0 && isFinite(sure); }
    vid.addEventListener('loadedmetadata', olc);
    if (vid.readyState >= 1) olc();

    function ilerlemeyiHesapla() {
      var r = sarmal.getBoundingClientRect();
      var h = window.innerHeight || 800;
      // öğe ekrana girerken 0, çıkarken 1
      var toplam = r.height + h;
      var gecen = h - r.top;
      return Math.max(0, Math.min(1, gecen / toplam));
    }

    /* Konumu DOĞRUDAN scroll olayında uygular. requestAnimationFrame'e bağlanmaz:
       gömülü/önizleme bağlamlarında rAF hiç tetiklenmiyor ve video donuyordu. */
    var sonSeek = 0;
    function tetikle() {
      if (AZALT || !hazir) return;
      var simdi = Date.now();
      if (simdi - sonSeek < 32) return;      // ~30 fps, seek kuyruğunu şişirmemek için
      sonSeek = simdi;
      var t = ilerlemeyiHesapla() * (sure - 0.05);
      if (Math.abs(t - vid.currentTime) < 0.01) return;
      try { vid.currentTime = t; } catch (e) { /* seek henüz hazır değil */ }
    }
    window.addEventListener('scroll', tetikle, { passive: true });
    window.addEventListener('resize', tetikle, { passive: true });
    vid.addEventListener('loadeddata', function () {
      olc();
      try { vid.currentTime = 0.001; } catch (e) {}
      tetikle();
    });
    if (vid.readyState >= 2) { olc(); tetikle(); }
  });

  /* --- 5. Arka plan video döngüleri: ekran dışında ve sekme arkada duraklat -- */
  $$('video[data-dongu]').forEach(function (v) {
    v.muted = true; v.loop = true; v.playsInline = true;
    if (AZALT) { v.removeAttribute('autoplay'); return; }
    var gorunuyor = false;
    function oynat() { if (gorunuyor && !document.hidden) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }
    izle(v, function (a) { gorunuyor = a; oynat(); }, { pay: 0.05 });
    document.addEventListener('visibilitychange', oynat);
  });

  /* --- 6. Mobil menü ------------------------------------------------------- */
  var burger = $('[data-burger]'), menu = $('[data-mobmenu]');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var acik = menu.classList.toggle('open');
      menu.setAttribute('aria-hidden', acik ? 'false' : 'true');
      burger.setAttribute('aria-expanded', acik ? 'true' : 'false');
      document.body.style.overflow = acik ? 'hidden' : '';
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- 7. Menü gölgesi ----------------------------------------------------- */
  var nav = $('[data-nav]');
  if (nav) {
    var navKontrol = function () { nav.classList.toggle('scrolled', window.pageYOffset > 24); };
    window.addEventListener('scroll', navKontrol, { passive: true });
    navKontrol();
  }

  /* --- 8. Yatay taşma koruması (geliştirme yardımcısı) ---------------------
     overflow-x:hidden varken scrollWidth taşmayı gizler; gerçek ölçüm
     her öğenin sağ kenarını viewport ile karşılaştırmaktır. */
  window.tmTasmaDenetimi = function () {
    var w = document.documentElement.clientWidth, suclular = [];
    $$('body *').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > w + 1) {
        suclular.push({ el: el.tagName + '.' + (el.className || '').toString().slice(0, 40), sag: Math.round(r.right), fark: Math.round(r.right - w) });
      }
    });
    return suclular.slice(0, 20);
  };

  kontrol();
  window.addEventListener('load', kontrol);
})();
