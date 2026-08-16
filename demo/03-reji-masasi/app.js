/* ============================================================
   TasarımMania — Demo 03 "REJİ PANELİ" — ortak JS
   timecode + dalga formu + mobil menü + chatbot mock +
   fiyat hesaplayıcı + dataLayer stub'ları
   ============================================================ */
(function () {
  "use strict";

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- dataLayer stub'ları (GTM vitrini) ---------- */
  window.dataLayer = window.dataLayer || [];
  function dl(o) {
    try { window.dataLayer.push(o); } catch (e) { /* stub */ }
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var h = a.getAttribute("href") || "";
    if (h.indexOf("tel:") === 0) {
      dl({ event: "tel_click", link_url: h, page: location.pathname });
    } else if (h.indexOf("wa.me") > -1) {
      dl({ event: "wa_click", link_url: h, page: location.pathname });
    }
  });

  /* ---------- canlı timecode (üst bar) ---------- */
  var tcEl = document.getElementById("tc");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  if (tcEl) {
    var tcVis = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { tcVis = en.isIntersecting; });
      }, { threshold: 0 }).observe(tcEl);
    }
    var tcTick = function () {
      if (!tcVis) return; // ekran dışında sayaç durur
      var d = new Date();
      var f = RM ? 0 : Math.floor(d.getMilliseconds() / 40); // 25 fps
      tcEl.textContent = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + ":" + pad(f);
    };
    tcTick();
    window.setInterval(tcTick, RM ? 1000 : 80);
  }

  /* ---------- sürekli animasyonlar ekran dışında dursun ---------- */
  var ioEls = document.querySelectorAll(".io-anim");
  if ("IntersectionObserver" in window && ioEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle("paused", !en.isIntersecting);
      });
    }, { threshold: 0 });
    ioEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- mobil menü ---------- */
  var hdr = document.querySelector(".hdr");
  var mb = document.getElementById("menuBtn");
  if (mb && hdr) {
    mb.addEventListener("click", function () {
      var open = hdr.classList.toggle("open");
      mb.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- oynat butonu -> "temsilî demo" tooltip ---------- */
  var plays = document.querySelectorAll(".play");
  Array.prototype.forEach.call(plays, function (btn) {
    btn.addEventListener("click", function () {
      var tip = btn.parentElement ? btn.parentElement.querySelector(".tip") : null;
      if (!tip) return;
      tip.classList.add("show");
      window.clearTimeout(tip._t);
      tip._t = window.setTimeout(function () { tip.classList.remove("show"); }, 2600);
    });
  });

  /* ---------- hero ses dalga formu (Canvas 2D) ---------- */
  (function () {
    var c = document.getElementById("wave");
    if (!c || !c.getContext) return;
    var x = c.getContext("2d");
    var t = 0;
    var running = false;
    var raf = null;

    function size() {
      var w = c.clientWidth || (c.parentElement ? c.parentElement.clientWidth : 600) || 600;
      c.width = Math.max(280, w);
      c.height = 110;
    }

    function frame() {
      var w = c.width, h = c.height, mid = h / 2;
      x.clearRect(0, 0, w, h);
      x.fillStyle = "#242c37";
      x.fillRect(0, mid, w, 1);
      var ph = ((t % 320) / 320) * w; // playhead
      for (var i = 0; i < w; i += 4) {
        var a = Math.sin(i * 0.045 + t * 0.09) * Math.sin(i * 0.012 + t * 0.03) * Math.sin(i * 0.003 + 1.7);
        var amp = Math.abs(a) * (mid - 10) + 2;
        x.fillStyle = i < ph ? "#ED1E24" : "#4a5462";
        x.fillRect(i, mid - amp, 2, amp * 2);
      }
      x.fillStyle = "#f2f5f8";
      x.fillRect(ph, 0, 1, h);
      t++;
    }

    function loop() {
      frame();
      if (running) raf = window.requestAnimationFrame(loop);
    }
    function start() {
      if (running) return;
      running = true;
      loop();
    }
    function stop() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
    }

    size();
    if (RM) {
      t = 140;
      frame(); // tek statik kare
      window.addEventListener("resize", function () { size(); frame(); });
    } else {
      window.addEventListener("resize", function () { size(); if (!running) frame(); });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { start(); } else { stop(); }
          });
        }, { threshold: 0 }).observe(c);
      } else {
        start();
      }
    }
  })();

  /* ---------- chatbot mock: "Reji Asistanı" ---------- */
  var BOT_STEPS = [
    { k: "Hizmet", q: "Hangi hizmete ihtiyacınız var?", o: ["Tanıtım Filmi", "Reklam Filmi", "Instagram Reels", "Fabrika Çekimi", "Etkinlik Çekimi", "Drone Çekimi"] },
    { k: "Sektör", q: "Sektörünüz hangisi?", o: ["Üretim / Fabrika", "Sağlık / Klinik", "Restoran / Kafe", "E-ticaret", "Otel / Turizm", "Diğer"] },
    { k: "Tarih", q: "Çekim için hedef tarih ne?", o: ["Bu ay", "1-3 ay içinde", "3 aydan sonra", "Tarih henüz esnek"] },
    { k: "Bütçe", q: "Bütçe bandınız hangisine yakın?", o: ["25-50 bin ₺", "50-100 bin ₺", "100-200 bin ₺", "Henüz belirsiz"] }
  ];

  (function () {
    var wrap = document.createElement("div");
    wrap.className = "bot";
    wrap.innerHTML =
      '<button id="botBtn" type="button" aria-expanded="false" aria-controls="botPanel" aria-label="Reji Asistanı brief sohbetini aç">' +
      '<span class="dot" aria-hidden="true"></span>REJİ ASİSTANI</button>' +
      '<div id="botPanel" role="dialog" aria-label="Reji Asistanı — 4 soruda brief sihirbazı" hidden>' +
      '<div class="bot-h"><span><b>REJİ&gt;</b> ASİSTAN <span class="stt">[KAYIT HAZIR]</span></span>' +
      '<button type="button" class="bot-x" aria-label="Sohbet penceresini kapat">ESC ✕</button></div>' +
      '<div class="bot-b" id="botBody"></div></div>';
    document.body.appendChild(wrap);

    var btn = document.getElementById("botBtn");
    var panel = document.getElementById("botPanel");
    var body = document.getElementById("botBody");
    var idx = 0;
    var ans = [];

    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function render() {
      var html = "";
      if (idx === 0 && !ans.length) {
        html += '<p class="bot-in">4 kısa soruda brief’inizi alıp doğru fiyat bandını çıkarıyorum. Kayıt başlasın:</p>';
      }
      if (ans.length) {
        html += '<div class="bot-log">' + ans.map(function (a) {
          return "<span>" + esc(a.k) + ": <b>" + esc(a.v) + "</b></span>";
        }).join("") + "</div>";
      }
      if (idx < BOT_STEPS.length) {
        var s = BOT_STEPS[idx];
        html += '<p class="bot-q">' + esc(s.q) + '</p><div class="bot-opts">' +
          s.o.map(function (o, i) {
            return '<button type="button" data-i="' + i + '">' + esc(o) + "</button>";
          }).join("") + "</div>";
      } else {
        var msg = "Merhaba! Sitedeki Reji Asistanı'ndan geliyorum. " +
          ans.map(function (a) { return a.k + ": " + a.v; }).join(" | ") +
          " — bant teklif rica ediyorum.";
        html += '<p class="bot-q">Brief kaydedildi. Ekip mesai saatleri içinde ort. 2 saatte bant teklifle dönüyor. Dilerseniz aynı özetle WhatsApp’tan hemen devam edin:</p>' +
          '<a class="bot-wa" target="_blank" rel="noopener" href="https://wa.me/905386999666?text=' +
          encodeURIComponent(msg) + '">WHATSAPP’TAN DEVAM ET</a>' +
          '<button type="button" class="bot-reset">[BAŞTAN AL]</button>';
      }
      body.innerHTML = html;

      var opts = body.querySelectorAll(".bot-opts button");
      Array.prototype.forEach.call(opts, function (b) {
        b.addEventListener("click", function () {
          var st = BOT_STEPS[idx];
          ans.push({ k: st.k, v: st.o[parseInt(b.getAttribute("data-i"), 10)] });
          idx++;
          if (idx === BOT_STEPS.length) {
            dl({
              event: "bot_lead",
              bot_answers: ans.map(function (a) { return a.k + ":" + a.v; }).join("|"),
              page: location.pathname
            });
          }
          render();
        });
      });
      var rs = body.querySelector(".bot-reset");
      if (rs) rs.addEventListener("click", function () { idx = 0; ans = []; render(); });
      var first = body.querySelector(".bot-opts button, .bot-wa");
      if (first) first.focus();
    }

    function openBot() {
      panel.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      render();
    }
    function closeBot() {
      panel.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
    btn.addEventListener("click", function () {
      if (panel.hidden) { openBot(); } else { closeBot(); }
    });
    panel.querySelector(".bot-x").addEventListener("click", closeBot);

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!panel.hidden) closeBot();
      if (hdr && hdr.classList.contains("open")) {
        hdr.classList.remove("open");
        if (mb) mb.setAttribute("aria-expanded", "false");
      }
    });
  })();

  /* ---------- form gönderimi (demo: gerçek gönderim yok) ---------- */
  var forms = document.querySelectorAll("form[data-form]");
  Array.prototype.forEach.call(forms, function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      dl({ event: "form_submit", form_id: f.getAttribute("data-form"), page: location.pathname });
      var ok = f.querySelector(".form-ok");
      if (ok) {
        ok.setAttribute("role", "status");
        ok.textContent = "[KAYIT ALINDI] Brief'iniz reji masasına düştü — mesai içinde ort. 2 saatte dönüyoruz. (Demo sayfası: form gerçek gönderim yapmaz.)";
        ok.classList.add("show");
      }
    });
  });

  /* ---------- fiyat hesaplayıcı (reji konsolu) ---------- */
  (function () {
    var f = document.getElementById("calcForm");
    if (!f) return;

    var BASE = {
      tanitim:  { lo: 45, hi: 90,  ad: "Tanıtım Filmi" },
      reklam:   { lo: 90, hi: 200, ad: "Reklam Filmi" },
      reels:    { lo: 25, hi: 45,  ad: "Instagram Reels (aylık paket)" },
      fabrika:  { lo: 55, hi: 110, ad: "Fabrika Çekimi" },
      etkinlik: { lo: 20, hi: 40,  ad: "Etkinlik Çekimi" },
      dronetek: { lo: 8,  hi: 18,  ad: "Drone Çekimi (tek seans)" }
    };

    var days = document.getElementById("calcDays");
    var dayVal = document.getElementById("dayVal");
    var out = document.getElementById("calcOut");
    var wa = document.getElementById("calcWa");

    function tl(nBin) {
      return (Math.round(nBin) * 1000).toLocaleString("tr-TR");
    }

    function calc() {
      var svcEl = f.querySelector('input[name="svc"]:checked');
      var locEl = f.querySelector('input[name="loc"]:checked');
      var svc = svcEl ? svcEl.value : "tanitim";
      var loc = locEl ? locEl.value : "ic";
      var d = parseInt(days.value, 10) || 1;
      var drone = f.querySelector("#optDrone").checked;
      var rev = f.querySelector("#optRev").checked;

      var b = BASE[svc] || BASE.tanitim;
      var m = 1 + 0.6 * (d - 1);
      var lo = b.lo * m;
      var hi = b.hi * m;
      if (loc === "disi") { lo *= 1.25; hi *= 1.25; }
      if (drone) { lo += 8; hi += 15; }
      if (rev) { lo += 5; hi += 5; }

      if (dayVal) dayVal.textContent = d;
      if (out) out.textContent = tl(lo) + " – " + tl(hi) + " ₺";

      if (wa) {
        var msg = "Merhaba! Sitedeki fiyat hesaplayıcıdan geliyorum. " +
          "Hizmet: " + b.ad +
          " | Çekim günü: " + d +
          " | Lokasyon: " + (loc === "disi" ? "İstanbul dışı" : "İstanbul içi") +
          " | Drone: " + (drone ? "var" : "yok") +
          " | Ek revizyon: " + (rev ? "var" : "yok") +
          " | Tahmini bant: " + tl(lo) + " - " + tl(hi) + " TL. Net teklif için keşif görüşmesi rica ediyorum.";
        wa.setAttribute("href", "https://wa.me/905386999666?text=" + encodeURIComponent(msg));
      }
    }

    f.addEventListener("input", calc);
    f.addEventListener("change", calc);
    calc();
  })();

})();
