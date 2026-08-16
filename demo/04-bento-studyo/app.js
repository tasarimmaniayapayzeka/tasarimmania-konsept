/* ============================================================
   TasarımMania Demo 04 — "Bento Stüdyo" ortak JS
   Mobil menü + imleç spotlight + hizmet×sektör matrisi +
   fiyat hesaplayıcı + chatbot mock + dataLayer ölçüm stub'ları
   ============================================================ */
(function () {
  'use strict';

  /* ---------- dataLayer stub (GTM: GTM-XXXXXXX buraya) ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(eventName, data) {
    var payload = Object.assign({ event: eventName }, data || {});
    window.dataLayer.push(payload);
  }

  var REDUCED = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- tel / WhatsApp tıklama ölçümü ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      track('tel_click', { link_url: href, page: location.pathname });
    } else if (href.indexOf('wa.me') !== -1) {
      track('wa_click', { link_url: href, page: location.pathname });
    }
  });

  /* ---------- mobil menü ---------- */
  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  if (header && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- İmza etkileşim: imleci takip eden spotlight ---------- */
  if (!REDUCED && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.spot').forEach(function (el) {
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        el.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- sürekli animasyonlar ekran dışında dursun ---------- */
  var animEls = document.querySelectorAll('[data-anim]');
  if ('IntersectionObserver' in window && animEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('in-view', en.isIntersecting);
      });
    }, { threshold: 0.1 });
    animEls.forEach(function (el) { io.observe(el); });
  } else {
    animEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- oynat butonu: temsilî demo tooltip'i ---------- */
  document.querySelectorAll('.play-mock').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var kutu = btn.closest('.poster');
      var tip = kutu ? kutu.querySelector('.play-tip') : null;
      if (tip) {
        tip.classList.add('show');
        clearTimeout(tip._t);
        tip._t = setTimeout(function () { tip.classList.remove('show'); }, 2800);
      }
    });
  });

  /* ---------- demo formları (form_submit push) ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      track('form_submit', { form_id: form.id || 'form', page: location.pathname });
      var ok = form.querySelector('.form-ok');
      if (ok) ok.hidden = false;
      form.reset();
    });
  });

  /* ---------- İmza etkileşim: hizmet × sektör matrisi ---------- */
  var matOut = document.getElementById('matris-cikti');
  document.querySelectorAll('.matrix button[data-ornek]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.matrix button[aria-pressed="true"]').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
      });
      btn.setAttribute('aria-pressed', 'true');
      if (matOut) {
        matOut.hidden = false;
        matOut.innerHTML = '<strong>' + btn.dataset.hizmet + ' × ' +
          btn.dataset.sektor + ':</strong> ' + btn.dataset.ornek +
          ' <span class="not">(temsilî örnek)</span>';
      }
    });
  });

  /* ---------- fiyat hesaplayıcı (fiyat.html) ---------- */
  var calcRoot = document.getElementById('hesaplayici');
  if (calcRoot) {
    var BANT = {
      tanitim:  { ad: 'Tanıtım Filmi',            min: 45000, max: 90000 },
      reklam:   { ad: 'Reklam Filmi',             min: 90000, max: 200000 },
      reels:    { ad: 'Instagram Reels (aylık)',  min: 25000, max: 45000 },
      fabrika:  { ad: 'Fabrika Çekimi',           min: 55000, max: 110000 },
      etkinlik: { ad: 'Etkinlik Çekimi',          min: 20000, max: 40000 },
      drone:    { ad: 'Drone Çekimi (tek uçuş)',  min: 8000,  max: 18000 }
    };
    var elHizmet = document.getElementById('calc-hizmet');
    var elGun = document.getElementById('calc-gun');
    var elGunOut = document.getElementById('calc-gun-out');
    var elDrone = document.getElementById('calc-drone');
    var elRev = document.getElementById('calc-rev');
    var elOut = document.getElementById('calc-sonuc');
    var elOzet = document.getElementById('calc-ozet');
    var elWa = document.getElementById('calc-wa');

    var tl = function (n) { return n.toLocaleString('tr-TR') + ' ₺'; };
    var binYuvarla = function (n) { return Math.round(n / 1000) * 1000; };

    var hesapla = function () {
      var tur = BANT[elHizmet.value] || BANT.tanitim;
      var gun = parseInt(elGun.value, 10) || 1;
      var rev = Math.max(0, Math.min(3, parseInt(elRev.value, 10) || 0));
      var lokSec = calcRoot.querySelector('input[name="calc-lok"]:checked');
      var istDisi = lokSec ? lokSec.value === 'ist-disi' : false;
      var carpan = 1 + 0.6 * (gun - 1);
      var min = tur.min * carpan;
      var max = tur.max * carpan;
      if (istDisi) { min *= 1.25; max *= 1.25; }
      if (elDrone.checked) { min += 8000; max += 15000; }
      min += rev * 5000;
      max += rev * 5000;
      min = binYuvarla(min);
      max = binYuvarla(max);

      elGunOut.textContent = gun + ' gün';
      elOut.textContent = tl(min) + ' – ' + tl(max);

      var ozet = tur.ad + ' · ' + gun + ' çekim günü · ' +
        (istDisi ? 'İstanbul dışı' : 'İstanbul içi') +
        (elDrone.checked ? ' · drone dahil' : '') +
        (rev ? ' · +' + rev + ' ek revizyon' : '');
      if (elOzet) elOzet.textContent = ozet;

      var mesaj = 'Merhaba! Web sitenizdeki hesaplayıcıdan geliyorum. ' + ozet +
        ' — temsilî bant: ' + tl(min) + ' – ' + tl(max) +
        '. Net teklif alabilir miyim?';
      if (elWa) {
        elWa.href = 'https://wa.me/905386999666?text=' + encodeURIComponent(mesaj);
      }
    };

    calcRoot.addEventListener('change', hesapla);
    calcRoot.addEventListener('input', hesapla);
    hesapla();
  }

  /* ---------- chatbot mock: 4 adımlı brief asistanı ---------- */
  (function initBot() {
    var STEPS = [
      {
        key: 'hizmet',
        q: 'Merhaba! 1 dakikada brief’inizi alayım, ekip 72 saat içinde net teklifle dönsün. Hangi hizmete ihtiyacınız var?',
        opts: ['Tanıtım Filmi', 'Reklam Filmi', 'Instagram Reels', 'Fabrika Çekimi', 'Etkinlik Çekimi', 'Drone Çekimi']
      },
      {
        key: 'sektor',
        q: 'Hangi sektördesiniz?',
        opts: ['Üretim / Fabrika', 'Sağlık / Klinik', 'Restoran / Kafe', 'E-ticaret', 'Otel / Turizm', 'Diğer']
      },
      {
        key: 'tarih',
        q: 'Çekimi ne zaman planlıyorsunuz?',
        opts: ['Bu ay', '1–3 ay içinde', 'Tarih esnek']
      },
      {
        key: 'butce',
        q: 'Öngördüğünüz bütçe bandı nedir?',
        opts: ['25–50 bin ₺', '50–100 bin ₺', '100 bin ₺ üzeri', 'Henüz belirsiz']
      }
    ];

    var wrap = document.createElement('div');
    wrap.className = 'bot';
    wrap.innerHTML =
      '<button type="button" class="bot-fab" aria-label="Brief asistanını aç" aria-expanded="false">' +
        '<span class="bot-fab-dot" aria-hidden="true"></span>Brief Asistanı' +
      '</button>' +
      '<section class="bot-panel" role="dialog" aria-label="Brief asistanı" hidden>' +
        '<header class="bot-head">' +
          '<strong>Brief Asistanı</strong>' +
          '<span class="bot-sub">demo · mock akış</span>' +
          '<button type="button" class="bot-close" aria-label="Asistanı kapat">×</button>' +
        '</header>' +
        '<div class="bot-body" aria-live="polite"></div>' +
      '</section>';
    document.body.appendChild(wrap);

    var fab = wrap.querySelector('.bot-fab');
    var panel = wrap.querySelector('.bot-panel');
    var body = wrap.querySelector('.bot-body');
    var closeBtn = wrap.querySelector('.bot-close');
    var cevap = {};
    var adim = 0;

    function bubble(cls, html) {
      var d = document.createElement('div');
      d.className = 'bot-msg ' + cls;
      d.innerHTML = html;
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
      return d;
    }

    function soruSor() {
      var s = STEPS[adim];
      bubble('bot', s.q);
      var opts = document.createElement('div');
      opts.className = 'bot-opts';
      s.opts.forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'bot-opt';
        b.textContent = o;
        b.addEventListener('click', function () { sec(s.key, o, opts); });
        opts.appendChild(b);
      });
      body.appendChild(opts);
      body.scrollTop = body.scrollHeight;
    }

    function sec(key, deger, optsEl) {
      cevap[key] = deger;
      optsEl.remove();
      bubble('user', deger);
      adim += 1;
      if (adim < STEPS.length) { soruSor(); } else { bitir(); }
    }

    function bitir() {
      var ozet = 'Hizmet: ' + cevap.hizmet + ' • Sektör: ' + cevap.sektor +
        ' • Tarih: ' + cevap.tarih + ' • Bütçe: ' + cevap.butce;
      track('bot_lead', {
        hizmet: cevap.hizmet,
        sektor: cevap.sektor,
        tarih: cevap.tarih,
        butce: cevap.butce,
        page: location.pathname
      });
      bubble('bot', 'Harika, brief hazır! <em>' + ozet + '</em><br>' +
        'Ekibimiz WhatsApp üzerinden 72 saat içinde net teklifle dönsün mü?');
      var mesaj = 'Merhaba! Sitenizdeki brief asistanından geliyorum. ' + ozet +
        '. Net teklif alabilir miyim?';
      var act = document.createElement('div');
      act.className = 'bot-opts';
      act.innerHTML =
        '<a class="bot-opt bot-opt--wa" target="_blank" rel="noopener" ' +
          'href="https://wa.me/905386999666?text=' + encodeURIComponent(mesaj) + '">' +
          'WhatsApp’tan devam et</a>' +
        '<button type="button" class="bot-opt" data-bot-restart>Baştan başla</button>';
      act.querySelector('[data-bot-restart]').addEventListener('click', sifirla);
      body.appendChild(act);
      body.scrollTop = body.scrollHeight;
    }

    function sifirla() {
      cevap = {};
      adim = 0;
      body.innerHTML = '';
      soruSor();
    }

    function ac() {
      panel.hidden = false;
      fab.setAttribute('aria-expanded', 'true');
      if (!body.childElementCount) soruSor();
      closeBtn.focus();
    }

    function kapat() {
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
      fab.focus();
    }

    fab.addEventListener('click', function () {
      if (panel.hidden) { ac(); } else { kapat(); }
    });
    closeBtn.addEventListener('click', kapat);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) kapat();
    });
  })();
})();
