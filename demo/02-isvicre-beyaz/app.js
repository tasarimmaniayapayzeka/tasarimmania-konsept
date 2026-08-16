/* TasarımMania — Demo 02 "İsviçre Editoryal" — ortak JS
   mobil menü + marker altçizgi + sol ray + chatbot mock + hesaplayıcı + dataLayer stub */
(function () {
  'use strict';

  /* ---------- dataLayer stub (GTM ölçüm vitrini) ---------- */
  window.dataLayer = window.dataLayer || [];
  function dl(ev, data) {
    var o = { event: ev, page: location.pathname.split('/').pop() || 'index.html' };
    if (data) { for (var k in data) { if (Object.prototype.hasOwnProperty.call(data, k)) { o[k] = data[k]; } } }
    window.dataLayer.push(o);
  }

  var WA = 'https://wa.me/905386999666';
  var TEL = 'tel:+905386999666';

  /* ---------- tel / wa tıklama olayları ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) { return; }
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) { dl('tel_click', { href: h }); }
    else if (h.indexOf('wa.me') !== -1) { dl('wa_click', { href: h }); }
  });

  /* ---------- mobil menü ---------- */
  var burger = document.getElementById('menuBtn');
  var hd = document.querySelector('.hd');
  if (burger && hd) {
    burger.addEventListener('click', function () {
      var open = hd.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- imza etkileşim: elle çekilmiş kırmızı marker altçizgi ---------- */
  var MK_SVG = '<svg viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
    '<path d="M2 7 Q 28 3 56 6 T 118 5"/></svg>';
  var mks = document.querySelectorAll('.mk');
  for (var i = 0; i < mks.length; i++) { mks[i].insertAdjacentHTML('beforeend', MK_SVG); }

  /* ---------- showreel play mock (video gömülmez) ---------- */
  var plays = document.querySelectorAll('.play');
  Array.prototype.forEach.call(plays, function (btn) {
    btn.addEventListener('click', function () {
      var tip = btn.parentElement.querySelector('.tip');
      if (tip) {
        tip.classList.add('on');
        window.setTimeout(function () { tip.classList.remove('on'); }, 2600);
      }
      dl('showreel_mock_play', {});
    });
  });

  /* ---------- form stub ---------- */
  var forms = document.querySelectorAll('form.js-form');
  Array.prototype.forEach.call(forms, function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      dl('form_submit', { form: f.id || 'form' });
      var ok = f.querySelector('.form-ok');
      if (ok) { ok.classList.add('on'); }
      f.reset();
    });
  });

  /* ---------- sol ray: aktif bölüm numarası ---------- */
  var secs = document.querySelectorAll('.sec[data-sec]');
  if (secs.length && window.matchMedia('(min-width:1240px)').matches && 'IntersectionObserver' in window) {
    var rail = document.createElement('nav');
    rail.className = 'rail';
    rail.setAttribute('aria-label', 'Sayfa bölümleri');
    var html = '<span class="rail-t">BÖLÜM</span>';
    Array.prototype.forEach.call(secs, function (s) {
      html += '<span class="rail-i" data-for="' + s.getAttribute('data-sec') + '">' + s.getAttribute('data-sec') + '</span>';
    });
    rail.innerHTML = html;
    document.body.appendChild(rail);
    var items = rail.querySelectorAll('.rail-i');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.getAttribute('data-sec');
          Array.prototype.forEach.call(items, function (it) {
            it.classList.toggle('on', it.getAttribute('data-for') === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    Array.prototype.forEach.call(secs, function (s) { io.observe(s); });
  }

  /* ---------- ticker: ekran dışında dur ---------- */
  var ticks = document.querySelectorAll('.ticker');
  if (ticks.length && 'IntersectionObserver' in window) {
    var tio = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { en.target.classList.toggle('paused', !en.isIntersecting); });
    });
    Array.prototype.forEach.call(ticks, function (t) { tio.observe(t); });
  }

  /* ---------- chatbot mock: 4 adımlı brief botu ---------- */
  var STEPS = [
    { key: 'Hizmet', q: 'Hangi hizmete ihtiyacınız var?', opts: ['Tanıtım Filmi', 'Reklam Filmi', 'Instagram Reels', 'Fabrika Çekimi', 'Etkinlik Çekimi', 'Drone Çekimi'] },
    { key: 'Sektör', q: 'Hangi sektördesiniz?', opts: ['Üretim / Fabrika', 'Sağlık / Klinik', 'Yeme-İçme', 'E-ticaret', 'Turizm / Otel', 'Diğer'] },
    { key: 'Zaman', q: 'Çekim ne zaman olsun?', opts: ['Bu ay', '1–3 ay içinde', '3 aydan sonra', 'Henüz net değil'] },
    { key: 'Bütçe', q: 'Bütçe bandınız?', opts: ['50.000 ₺ altı', '50–100 bin ₺', '100–250 bin ₺', '250 bin ₺ üzeri'] }
  ];
  var cbBtn = document.createElement('button');
  cbBtn.className = 'cb-btn';
  cbBtn.type = 'button';
  cbBtn.setAttribute('aria-haspopup', 'dialog');
  cbBtn.setAttribute('aria-expanded', 'false');
  cbBtn.setAttribute('aria-label', 'Brief botunu aç');
  cbBtn.textContent = 'Brief Botu';
  var cbPanel = document.createElement('div');
  cbPanel.className = 'cb-panel';
  cbPanel.setAttribute('role', 'dialog');
  cbPanel.setAttribute('aria-modal', 'false');
  cbPanel.setAttribute('aria-label', 'Brief botu — 4 soruda teklif özeti');
  cbPanel.innerHTML = '<div class="cb-hd"><b>TM<i>—</i>BRIEF BOTU</b>' +
    '<button type="button" class="cb-x" aria-label="Botu kapat">×</button></div>' +
    '<div class="cb-body" aria-live="polite"></div>';
  document.body.appendChild(cbBtn);
  document.body.appendChild(cbPanel);

  var cbBody = cbPanel.querySelector('.cb-body');
  var answers = [];
  var step = 0;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderStep() {
    if (step >= STEPS.length) { renderSummary(); return; }
    var st = STEPS[step];
    var h = '<p class="cb-step">Adım ' + (step + 1) + ' / ' + STEPS.length + '</p>' +
      '<p class="cb-q">' + esc(st.q) + '</p>';
    st.opts.forEach(function (o, idx) {
      h += '<button type="button" class="cb-opt" data-i="' + idx + '">' + esc(o) + '</button>';
    });
    if (step > 0) { h += '<button type="button" class="cb-back">← Geri</button>'; }
    cbBody.innerHTML = h;
    var first = cbBody.querySelector('.cb-opt');
    if (first) { first.focus(); }
  }

  function renderSummary() {
    var lines = answers.map(function (a) { return a.key + ': ' + a.val; });
    var msg = 'Merhaba, TasarımMania web demosundaki brief botundan yazıyorum. ' +
      lines.join(' · ') + '. Teklif görüşmek isterim.';
    var h = '<p class="cb-step">Özet</p><p class="cb-q">Brief hazır. Devam edelim mi?</p><ul class="cb-sum">';
    answers.forEach(function (a) {
      h += '<li><b>' + esc(a.key) + '</b><span>' + esc(a.val) + '</span></li>';
    });
    h += '</ul><a class="cb-wa" href="' + WA + '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">WhatsApp’tan devam et</a>' +
      '<p class="cb-note">Bot temsilî demodur; brief WhatsApp mesajı olarak hazırlanır, otomatik gönderilmez.</p>' +
      '<button type="button" class="cb-back">↺ Baştan başla</button>';
    cbBody.innerHTML = h;
    var payload = {};
    answers.forEach(function (a) { payload['brief_' + a.key.toLowerCase().replace(/[^a-z0-9]/g, '')] = a.val; });
    dl('bot_lead', payload);
    var wa = cbBody.querySelector('.cb-wa');
    if (wa) { wa.focus(); }
  }

  cbBody.addEventListener('click', function (e) {
    var opt = e.target.closest ? e.target.closest('.cb-opt') : null;
    var back = e.target.closest ? e.target.closest('.cb-back') : null;
    if (opt) {
      var st = STEPS[step];
      answers[step] = { key: st.key, val: st.opts[parseInt(opt.getAttribute('data-i'), 10)] };
      step += 1;
      renderStep();
    } else if (back) {
      if (step >= STEPS.length) { step = 0; answers = []; } else { step -= 1; answers = answers.slice(0, step); }
      renderStep();
    }
  });

  function cbOpen() {
    cbPanel.classList.add('open');
    cbBtn.setAttribute('aria-expanded', 'true');
    step = 0; answers = [];
    renderStep();
  }
  function cbClose() {
    cbPanel.classList.remove('open');
    cbBtn.setAttribute('aria-expanded', 'false');
    cbBtn.focus();
  }
  cbBtn.addEventListener('click', function () {
    if (cbPanel.classList.contains('open')) { cbClose(); } else { cbOpen(); }
  });
  cbPanel.querySelector('.cb-x').addEventListener('click', cbClose);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cbPanel.classList.contains('open')) { cbClose(); }
  });

  /* ---------- fiyat hesaplayıcı (fiyat.html) ---------- */
  var calc = document.getElementById('calc');
  if (calc) {
    var BASE = {
      tanitim: { ad: 'Tanıtım Filmi', min: 45000, max: 90000 },
      reklam: { ad: 'Reklam Filmi', min: 90000, max: 200000 },
      reels: { ad: 'Instagram Reels (aylık)', min: 25000, max: 45000 },
      fabrika: { ad: 'Fabrika Çekimi', min: 55000, max: 110000 },
      etkinlik: { ad: 'Etkinlik Çekimi', min: 20000, max: 40000 },
      drone: { ad: 'Drone Çekimi (tek)', min: 8000, max: 18000 }
    };
    var elH = document.getElementById('c-hizmet');
    var elG = document.getElementById('c-gun');
    var elGO = document.getElementById('c-gun-out');
    var elD = document.getElementById('c-drone');
    var elR = document.getElementById('c-rev');
    var elMin = document.getElementById('c-min');
    var elMax = document.getElementById('c-max');
    var elWa = document.getElementById('c-wa');

    var fmt = function (n) { return Math.round(n / 500) * 500; };
    var tl = function (n) { return n.toLocaleString('tr-TR'); };

    var hesapla = function () {
      var b = BASE[elH.value];
      var gun = parseInt(elG.value, 10);
      var lokEl = calc.querySelector('input[name="c-lok"]:checked');
      var lok = lokEl ? lokEl.value : 'ici';
      var m = 1 + 0.6 * (gun - 1);
      var min = b.min * m;
      var max = b.max * m;
      if (lok === 'disi') { min *= 1.25; max *= 1.25; }
      var droneVar = elD.checked && elH.value !== 'drone';
      if (droneVar) { min += 8000; max += 15000; }
      if (elR.checked) { min += 5000; max += 5000; }
      min = fmt(min); max = fmt(max);
      elGO.textContent = gun;
      elMin.textContent = tl(min);
      elMax.textContent = tl(max);
      var msg = 'Merhaba, TasarımMania fiyat hesaplayıcısından yazıyorum. ' +
        'Hizmet: ' + b.ad + ' · Çekim günü: ' + gun +
        ' · Lokasyon: ' + (lok === 'disi' ? 'İstanbul dışı' : 'İstanbul içi') +
        ' · Drone: ' + (droneVar ? 'var' : 'yok') +
        ' · Ek revizyon: ' + (elR.checked ? 'var' : 'yok') +
        ' · Tahmini bant: ' + tl(min) + '–' + tl(max) + ' TL. Net teklif isterim.';
      elWa.href = WA + '?text=' + encodeURIComponent(msg);
    };
    calc.addEventListener('input', hesapla);
    calc.addEventListener('change', hesapla);
    hesapla();
  }

  /* ---------- yıl + kb rozeti sabit, ekstra iş yok ---------- */
  void TEL;
})();
