/* ============================================================
   TasarımMania Demo 01 — "Sinema Karanlığı" ortak JS
   Mobil menü + chatbot mock (Reji Asistanı) + sticky CTA olayları
   + dataLayer stub'ları + IO reveal + fiyat hesaplayıcı.
   Harici kütüphane yok.
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- dataLayer stub (GTM vitrini) ---------- */
  window.dataLayer = window.dataLayer || [];
  function dlPush(eventName, data) {
    var payload = { event: eventName };
    if (data) {
      for (var k in data) {
        if (Object.prototype.hasOwnProperty.call(data, k)) payload[k] = data[k];
      }
    }
    window.dataLayer.push(payload);
  }

  /* ---------- Mobil menü ---------- */
  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  if (header && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- tel / wa tık olayları (delege) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      dlPush('tel_click', { link_url: href, page: location.pathname });
    } else if (href.indexOf('wa.me') !== -1) {
      dlPush('wa_click', { link_url: href.split('?')[0], page: location.pathname });
    }
  });

  /* ---------- Demo formlar ---------- */
  var forms = document.querySelectorAll('form[data-demo-form]');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      dlPush('form_submit', { form_id: form.id || 'form', page: location.pathname });
      var ok = form.querySelector('.form-ok');
      if (ok) ok.classList.add('show');
      form.reset();
    });
  });

  /* ---------- Showreel "temsilî demo" tooltip ---------- */
  var playBtns = document.querySelectorAll('[data-demo-play]');
  Array.prototype.forEach.call(playBtns, function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.viewfinder');
      if (!box) return;
      box.classList.add('show-tip');
      window.clearTimeout(box._tipTimer);
      box._tipTimer = window.setTimeout(function () {
        box.classList.remove('show-tip');
      }, 3600);
    });
  });

  /* ---------- IntersectionObserver: reveal + letterbox ---------- */
  var ioTargets = document.querySelectorAll('[data-io]');
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          revealIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.16 });
    Array.prototype.forEach.call(ioTargets, function (el) { revealIO.observe(el); });

    /* sürekli animasyonlar ekran dışında dursun */
    var animIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('paused', !en.isIntersecting);
      });
    }, { threshold: 0.05 });
    Array.prototype.forEach.call(document.querySelectorAll('.anim'), function (el) {
      animIO.observe(el);
    });
  } else {
    Array.prototype.forEach.call(ioTargets, function (el) { el.classList.add('in-view'); });
  }

  /* ============================================================
     CHATBOT MOCK — "Reji Asistanı" (4 adım, buton akışı)
     ============================================================ */
  var WA_NUM = '905386999666';

  var BOT_STEPS = [
    {
      key: 'Hizmet',
      q: 'Merhaba, ben Reji Asistanı. Hangi hizmet için teklif arıyorsunuz?',
      opts: ['Tanıtım Filmi', 'Reklam Filmi', 'Instagram Reels', 'Fabrika Çekimi', 'Etkinlik Çekimi', 'Drone Çekimi']
    },
    {
      key: 'Sektör',
      q: 'Not aldım. Hangi sektördesiniz?',
      opts: ['Üretim / Fabrika', 'Sağlık / Klinik', 'Restoran / Kafe', 'E-ticaret', 'Otel / Turizm', 'Diğer']
    },
    {
      key: 'Tarih',
      q: 'Çekim için hedeflediğiniz tarih aralığı nedir?',
      opts: ['Bu ay', '1–3 ay içinde', '3 aydan sonra', 'Henüz belirsiz']
    },
    {
      key: 'Bütçe',
      q: 'Son soru: yaklaşık bütçe bandınız?',
      opts: ['50.000 ₺ altı', '50–100 bin ₺', '100–250 bin ₺', '250 bin ₺ üzeri', 'Keşifte netleşsin']
    }
  ];

  var botState = { step: 0, answers: {}, leadPushed: false };
  var botPanel, botMsgs, botOpts, botLauncher;

  function botBuild() {
    botLauncher = document.createElement('button');
    botLauncher.type = 'button';
    botLauncher.className = 'bot-launcher';
    botLauncher.setAttribute('aria-label', 'Reji Asistanı sohbetini aç (demo)');
    botLauncher.setAttribute('aria-expanded', 'false');
    botLauncher.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M3 8.2 20.6 4l.7 2.9-2.6.6 1.9 1.6-2.9.7-1.9-1.6-2.4.6 1.9 1.6-2.9.7-1.9-1.6-2.4.6 1.9 1.6-2.9.7L5.2 11l-1.5.4L3 8.2Zm.4 4.6h17.2V20H3.4v-7.2Z"/></svg>';

    botPanel = document.createElement('div');
    botPanel.className = 'bot-panel';
    botPanel.setAttribute('role', 'dialog');
    botPanel.setAttribute('aria-label', 'Reji Asistanı sohbet paneli — temsilî demo');
    botPanel.innerHTML =
      '<div class="bot-head">' +
      '<span class="bt">Reji Asistanı</span>' +
      '<span class="bd">Demo · canlı değil</span>' +
      '<button type="button" class="bot-close" aria-label="Sohbeti kapat">&times;</button>' +
      '</div>' +
      '<div class="bot-msgs" aria-live="polite"></div>' +
      '<div class="bot-opts"></div>';

    document.body.appendChild(botLauncher);
    document.body.appendChild(botPanel);
    botMsgs = botPanel.querySelector('.bot-msgs');
    botOpts = botPanel.querySelector('.bot-opts');

    botLauncher.addEventListener('click', botToggle);
    botPanel.querySelector('.bot-close').addEventListener('click', botClose);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && botPanel.classList.contains('open')) botClose();
    });
  }

  function botToggle() {
    if (botPanel.classList.contains('open')) { botClose(); return; }
    botPanel.classList.add('open');
    botLauncher.setAttribute('aria-expanded', 'true');
    if (botState.step === 0 && !botMsgs.childNodes.length) botAsk();
    var first = botOpts.querySelector('button, a');
    if (first) first.focus();
  }

  function botClose() {
    botPanel.classList.remove('open');
    botLauncher.setAttribute('aria-expanded', 'false');
    botLauncher.focus();
  }

  function botSay(text, who) {
    var div = document.createElement('div');
    div.className = 'bot-msg ' + (who === 'user' ? 'b-user' : 'b-bot');
    div.textContent = text;
    botMsgs.appendChild(div);
    botMsgs.scrollTop = botMsgs.scrollHeight;
  }

  function botStepTag(n) {
    var s = document.createElement('span');
    s.className = 'bot-adim';
    s.textContent = 'Sahne ' + n + ' / 4';
    botMsgs.appendChild(s);
  }

  function botAsk() {
    var step = BOT_STEPS[botState.step];
    botStepTag(botState.step + 1);
    botSay(step.q, 'bot');
    botOpts.innerHTML = '';
    step.opts.forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bot-opt';
      b.textContent = opt;
      b.addEventListener('click', function () { botAnswer(opt); });
      botOpts.appendChild(b);
    });
  }

  function botAnswer(opt) {
    var step = BOT_STEPS[botState.step];
    botState.answers[step.key] = opt;
    botSay(opt, 'user');
    botState.step += 1;
    if (botState.step < BOT_STEPS.length) {
      botAsk();
    } else {
      botFinish();
    }
  }

  function botFinish() {
    var a = botState.answers;
    var ozet = 'Hizmet: ' + a['Hizmet'] + ' · Sektör: ' + a['Sektör'] +
      ' · Tarih: ' + a['Tarih'] + ' · Bütçe: ' + a['Bütçe'];
    botSay('Teşekkürler, çekim notunuz hazır: ' + ozet, 'bot');
    botSay("Ekibimiz aynı gün içinde dönüş yapar. Dilerseniz bu özetle WhatsApp'tan hemen devam edin.", 'bot');

    if (!botState.leadPushed) {
      botState.leadPushed = true;
      dlPush('bot_lead', {
        hizmet: a['Hizmet'], sektor: a['Sektör'], tarih: a['Tarih'], butce: a['Bütçe'],
        page: location.pathname
      });
    }

    var waText = 'Merhaba TasarımMania! Reji Asistanı üzerinden geliyorum. ' + ozet + '. Teklif alabilir miyim?';
    botOpts.innerHTML = '';
    var wa = document.createElement('a');
    wa.className = 'btn btn-red bot-wa';
    wa.href = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(waText);
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.textContent = "WhatsApp'tan devam et";
    botPanel.insertBefore(wa, null);

    var again = document.createElement('button');
    again.type = 'button';
    again.className = 'bot-opt';
    again.textContent = 'Baştan başla';
    again.addEventListener('click', function () {
      botState = { step: 0, answers: {}, leadPushed: false };
      botMsgs.innerHTML = '';
      if (wa.parentNode) wa.parentNode.removeChild(wa);
      botAsk();
    });
    botOpts.appendChild(again);
    wa.focus();
  }

  botBuild();

  /* ============================================================
     FİYAT HESAPLAYICI (yalnız fiyat.html'de #hesap varsa çalışır)
     ============================================================ */
  var calcForm = document.getElementById('hesap');
  if (calcForm) {
    var BASE = {
      tanitim:  { ad: 'Tanıtım Filmi',        min: 45000, max: 90000 },
      reklam:   { ad: 'Reklam Filmi',          min: 90000, max: 200000 },
      reels:    { ad: 'Instagram Reels (aylık)', min: 25000, max: 45000 },
      fabrika:  { ad: 'Fabrika / Tesis Çekimi', min: 55000, max: 110000 },
      etkinlik: { ad: 'Etkinlik Çekimi',        min: 20000, max: 40000 },
      drone:    { ad: 'Drone Çekimi (tek)',     min: 8000,  max: 18000 }
    };

    var elHizmet = document.getElementById('c-hizmet');
    var elGun = document.getElementById('c-gun');
    var elGunOut = document.getElementById('c-gun-out');
    var elDrone = document.getElementById('c-drone');
    var elRev = document.getElementById('c-rev');
    var elSonuc = document.getElementById('c-sonuc');
    var elWa = document.getElementById('c-wa');

    function lokasyon() {
      var sec = calcForm.querySelector('input[name="c-lokasyon"]:checked');
      return sec ? sec.value : 'ic';
    }

    function paraTR(n) {
      return (Math.round(n / 1000) * 1000).toLocaleString('tr-TR');
    }

    function hesapla() {
      var svc = BASE[elHizmet.value] || BASE.tanitim;
      var gun = parseInt(elGun.value, 10) || 1;
      var carpan = 1 + 0.6 * (gun - 1);
      var min = svc.min * carpan;
      var max = svc.max * carpan;
      if (lokasyon() === 'dis') { min *= 1.25; max *= 1.25; }
      if (elDrone.checked) { min += 8000; max += 15000; }
      if (elRev.checked) { min += 5000; max += 5000; }

      var metin = paraTR(min) + ' – ' + paraTR(max) + ' ₺';
      elSonuc.textContent = metin;
      if (elGunOut) elGunOut.textContent = gun + ' gün';

      if (elWa) {
        var waOzet = 'Merhaba TasarımMania! Fiyat hesaplayıcıdan geliyorum. ' +
          'Hizmet: ' + svc.ad +
          ' · Çekim günü: ' + gun +
          ' · Lokasyon: ' + (lokasyon() === 'dis' ? 'İstanbul dışı' : 'İstanbul içi') +
          ' · Drone: ' + (elDrone.checked ? 'var' : 'yok') +
          ' · Ek revizyon: ' + (elRev.checked ? 'var' : 'yok') +
          ' · Temsilî bant: ' + metin + '. Net teklif alabilir miyim?';
        elWa.href = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(waOzet);
      }
    }

    calcForm.addEventListener('input', hesapla);
    calcForm.addEventListener('change', hesapla);
    calcForm.addEventListener('submit', function (e) { e.preventDefault(); });
    hesapla();
  }
})();
