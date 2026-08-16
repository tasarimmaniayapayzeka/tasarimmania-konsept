/* ============================================================
   TasarımMania — Demo 05 "Vaka Dosyası" — ortak JS
   mobil menü + tel/wa/form olay ölçümü (dataLayer stub)
   + showreel tooltip + fiyat hesaplayıcı + chatbot mock
   ============================================================ */
(function () {
  "use strict";

  /* ---------- dataLayer stub (GTM vitrini) ---------- */
  window.dataLayer = window.dataLayer || [];
  function izle(olay, ek) {
    var kayit = { event: olay };
    if (ek) {
      for (var k in ek) {
        if (Object.prototype.hasOwnProperty.call(ek, k)) { kayit[k] = ek[k]; }
      }
    }
    window.dataLayer.push(kayit);
  }

  /* ---------- mobil menü ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var acik = menu.classList.toggle("tabs--open");
      menuBtn.setAttribute("aria-expanded", acik ? "true" : "false");
    });
  }

  /* ---------- tel / WhatsApp tıklama olayları ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) { return; }
    var h = a.getAttribute("href") || "";
    if (h.indexOf("tel:") === 0) {
      izle("tel_click", { link_url: h });
    } else if (h.indexOf("wa.me") !== -1) {
      izle("wa_click", { link_url: h });
    }
  });

  /* ---------- showreel play mock: "temsilî demo" tooltip ---------- */
  var playler = document.querySelectorAll(".play-mock");
  Array.prototype.forEach.call(playler, function (btn) {
    btn.addEventListener("click", function () {
      var kutu = btn.parentElement;
      var tip = kutu.querySelector(".play-tip");
      if (!tip) {
        tip = document.createElement("span");
        tip.className = "play-tip";
        tip.setAttribute("role", "status");
        tip.textContent = "Temsilî demo — gerçek showreel müşteri onaylarıyla eklenecek.";
        kutu.appendChild(tip);
      }
      tip.classList.add("on");
      window.clearTimeout(tip._z);
      tip._z = window.setTimeout(function () { tip.classList.remove("on"); }, 3200);
    });
  });

  /* ---------- lead formları (mock gönderim) ---------- */
  var formlar = document.querySelectorAll("form[data-lead]");
  Array.prototype.forEach.call(formlar, function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      izle("form_submit", { form_id: f.id || "lead-form" });
      var ok = f.querySelector(".form-ok");
      if (!ok) {
        ok = document.createElement("p");
        ok.className = "form-ok";
        ok.setAttribute("role", "status");
        f.appendChild(ok);
      }
      ok.textContent = "Kaydınız dosyaya işlendi. Mesai saatleri içinde aynı gün dönüyoruz. (Demo: form gerçek sunucuya gönderilmez.)";
      f.reset();
    });
  });

  /* ---------- sürekli animasyonları ekran dışında durdur ---------- */
  var animler = document.querySelectorAll("[data-anim]");
  if (animler.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (girisler) {
      girisler.forEach(function (g) {
        g.target.classList.toggle("anim-paused", !g.isIntersecting);
      });
    }, { threshold: 0 });
    Array.prototype.forEach.call(animler, function (el) { io.observe(el); });
  }

  /* ---------- fiyat hesaplayıcı (fiyat.html) ---------- */
  var hesap = document.getElementById("hesap-form");
  if (hesap) {
    var TABAN = {
      tanitim: [45000, 90000],
      reklam: [90000, 200000],
      reels: [25000, 45000],
      fabrika: [55000, 110000],
      etkinlik: [20000, 40000],
      drone: [8000, 18000]
    };
    var AD = {
      tanitim: "Tanıtım Filmi",
      reklam: "Reklam Filmi",
      reels: "Instagram Reels (aylık paket)",
      fabrika: "Fabrika Çekimi",
      etkinlik: "Etkinlik Çekimi",
      drone: "Drone Çekimi (tek uçuş günü)"
    };
    var eHizmet = document.getElementById("c-hizmet");
    var eGun = document.getElementById("c-gun");
    var eGunOut = document.getElementById("c-gun-out");
    var eLok = document.getElementById("c-lokasyon");
    var eDrone = document.getElementById("c-drone");
    var eRev = document.getElementById("c-revizyon");
    var eSonuc = document.getElementById("c-sonuc");
    var eOzet = document.getElementById("c-ozet");
    var eWa = document.getElementById("c-wa");

    var bin = function (n) { return Math.round(n).toLocaleString("tr-TR"); };

    var hesapla = function () {
      var hiz = eHizmet.value;
      var gun = parseInt(eGun.value, 10) || 1;
      var carpan = 1 + 0.6 * (gun - 1);
      var lokCarpan = eLok.value === "dis" ? 1.25 : 1;
      var min = TABAN[hiz][0] * carpan * lokCarpan;
      var max = TABAN[hiz][1] * carpan * lokCarpan;
      var droneVar = eDrone.checked && hiz !== "drone";
      if (droneVar) { min += 8000; max += 15000; }
      if (eRev.checked) { min += 5000; max += 5000; }
      min = Math.round(min / 500) * 500;
      max = Math.round(max / 500) * 500;
      if (eGunOut) { eGunOut.textContent = gun + " gün"; }
      eSonuc.textContent = bin(min) + " – " + bin(max) + " ₺";
      var ozet = AD[hiz] + " · " + gun + " çekim günü · " +
        (eLok.value === "dis" ? "İstanbul dışı" : "İstanbul içi") +
        (droneVar ? " · drone dahil" : "") +
        (eRev.checked ? " · ek revizyon turu" : "");
      if (eOzet) { eOzet.textContent = "Dosya özeti: " + ozet; }
      if (eWa) {
        var mesaj = "Merhaba TasarımMania! Fiyat hesaplayıcıdan geliyorum. " + ozet +
          ". Tahmini bant: " + bin(min) + " – " + bin(max) +
          " TL. Keşif görüşmesi planlayabilir miyiz?";
        eWa.href = "https://wa.me/905386999666?text=" + encodeURIComponent(mesaj);
      }
    };

    hesap.addEventListener("change", hesapla);
    hesap.addEventListener("input", hesapla);
    hesapla();
  }

  /* ---------- chatbot mock: "Ön Görüşme Fişi" ---------- */
  var ADIMLAR = [
    {
      anahtar: "hizmet",
      soru: "Merhaba! TasarımMania kayıt masası. Hangi hizmet için dosya açalım?",
      secenekler: ["Tanıtım Filmi", "Reklam Filmi", "Instagram Reels", "Fabrika Çekimi", "Etkinlik Çekimi", "Drone Çekimi"]
    },
    {
      anahtar: "sektor",
      soru: "Not ettim. Sektörünüz hangisi?",
      secenekler: ["Üretim / Fabrika", "Sağlık / Klinik", "Yeme-İçme", "E-ticaret", "Turizm / Otel", "Diğer"]
    },
    {
      anahtar: "tarih",
      soru: "Peki çekim için hedef tarih nedir?",
      secenekler: ["Bu ay", "1-3 ay içinde", "3 aydan sonra", "Henüz net değil"]
    },
    {
      anahtar: "butce",
      soru: "Son soru: bütçe bandınız?",
      secenekler: ["25-50 bin ₺", "50-100 bin ₺", "100 bin ₺ üzeri", "Keşifte netleşsin"]
    }
  ];

  var botKok = document.createElement("div");
  botKok.className = "bot";
  botKok.innerHTML =
    '<button type="button" class="bot-btn" aria-expanded="false" aria-controls="bot-panel" aria-label="Ön görüşme asistanını aç">' +
    '<span class="dot" aria-hidden="true"></span>ÖN GÖRÜŞME</button>' +
    '<section class="bot-panel" id="bot-panel" role="dialog" aria-label="Ön görüşme fişi" hidden>' +
    '<header class="bot-head"><span>ÖN GÖRÜŞME FİŞİ · TM-2026</span>' +
    '<button type="button" class="bot-close" aria-label="Paneli kapat">&times;</button></header>' +
    '<div class="bot-log" aria-live="polite"></div>' +
    '<div class="bot-opts"></div>' +
    "</section>";
  document.body.appendChild(botKok);

  var botBtn = botKok.querySelector(".bot-btn");
  var botPanel = botKok.querySelector(".bot-panel");
  var botKapat = botKok.querySelector(".bot-close");
  var botLog = botKok.querySelector(".bot-log");
  var botOpts = botKok.querySelector(".bot-opts");
  var cevaplar = {};
  var adimNo = 0;
  var basladi = false;

  function mesaj(metin, kim) {
    var p = document.createElement("p");
    p.className = "bot-msg bot-msg--" + kim;
    p.textContent = metin;
    botLog.appendChild(p);
    botLog.scrollTop = botLog.scrollHeight;
  }

  function secenekleriBas(adim) {
    botOpts.innerHTML = "";
    adim.secenekler.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "bot-opt";
      b.textContent = s;
      b.addEventListener("click", function () { cevapla(adim.anahtar, s); });
      botOpts.appendChild(b);
    });
  }

  function cevapla(anahtar, deger) {
    cevaplar[anahtar] = deger;
    mesaj(deger, "user");
    adimNo += 1;
    if (adimNo < ADIMLAR.length) {
      mesaj(ADIMLAR[adimNo].soru, "bot");
      secenekleriBas(ADIMLAR[adimNo]);
    } else {
      bitir();
    }
  }

  function bitir() {
    var ozet = "Hizmet: " + cevaplar.hizmet +
      " | Sektör: " + cevaplar.sektor +
      " | Tarih: " + cevaplar.tarih +
      " | Bütçe: " + cevaplar.butce;
    mesaj("Fişiniz hazır. " + ozet + ". Dilerseniz WhatsApp'tan kaldığımız yerden devam edelim; keşif görüşmesi ücretsizdir.", "bot");
    izle("bot_lead", {
      hizmet: cevaplar.hizmet,
      sektor: cevaplar.sektor,
      tarih: cevaplar.tarih,
      butce: cevaplar.butce
    });
    botOpts.innerHTML = "";
    var wa = document.createElement("a");
    wa.className = "bot-wa";
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.href = "https://wa.me/905386999666?text=" +
      encodeURIComponent("Merhaba! Ön görüşme fişim: " + ozet + ". Devam edebilir miyiz?");
    wa.textContent = "WhatsApp'tan devam et";
    botOpts.appendChild(wa);
    var tekrar = document.createElement("button");
    tekrar.type = "button";
    tekrar.className = "bot-opt";
    tekrar.textContent = "Baştan al";
    tekrar.addEventListener("click", sifirla);
    botOpts.appendChild(tekrar);
  }

  function sifirla() {
    cevaplar = {};
    adimNo = 0;
    botLog.innerHTML = "";
    mesaj(ADIMLAR[0].soru, "bot");
    secenekleriBas(ADIMLAR[0]);
  }

  function botAc() {
    botPanel.hidden = false;
    botBtn.setAttribute("aria-expanded", "true");
    botBtn.setAttribute("aria-label", "Ön görüşme asistanını kapat");
    if (!basladi) { basladi = true; sifirla(); }
    var ilk = botOpts.querySelector("button, a");
    if (ilk) { ilk.focus(); }
  }

  function botKapa() {
    botPanel.hidden = true;
    botBtn.setAttribute("aria-expanded", "false");
    botBtn.setAttribute("aria-label", "Ön görüşme asistanını aç");
    botBtn.focus();
  }

  botBtn.addEventListener("click", function () {
    if (botPanel.hidden) { botAc(); } else { botKapa(); }
  });
  botKapat.addEventListener("click", botKapa);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") { return; }
    if (!botPanel.hidden) { botKapa(); }
    if (menu && menu.classList.contains("tabs--open")) {
      menu.classList.remove("tabs--open");
      if (menuBtn) { menuBtn.setAttribute("aria-expanded", "false"); }
    }
  });
})();
