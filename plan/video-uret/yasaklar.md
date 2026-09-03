# Sayfaya özel çizim yasakları — döngü videoları

Ortak kurallar her sayfa için geçerli (`motor.js` başındaki not + iş akışı metni):
logo yok, rakam yok (süre/bütçe/fiyat/adet/yüzde/oran), insan yüzü yok, yazı boyu
en az 28 px, dikişsiz döngü, çizilen her şey sayfanın kendi metninde geçmeli.

Aşağıdakiler **buna ek** olarak, o sayfanın metnini yanlış temsil etmemek için.

---

## video-produksiyon

**urun-videosu** — Sayfa stüdyo çekimini ve işletme mekanında çekimi *iki geçerli
yaklaşım* olarak anlatıyor ("iki yaklaşım da farklı ihtiyaca cevap verir"). Birini
üstün/tercih edilen gösterme: sönük kart, çapraz işaret, "önerilen" rozeti yok.
İki kart aynı boyut, aynı kontur, aynı opaklık, aynı giriş gecikmesi.
Pazaryeri oranları (kare/dikey/yatay) çizilebilir ama **platform adı yazma**.

**sosyal-video-reels** — Platform logosu ya da platforma benzeyen ikon çizme;
etkileşim butonları **nötr yuvarlak** kalsın (kalp, konuşma balonu, paylaş oku yok).
Dikey güvenli alan, altyazı okunabilirliği ve sessiz oynatma çizilebilir.

**ai-destekli-produksiyon** — Sayfa yapay zekânın ekibin yerini aldığını
söylemiyor; ekip rolünü ve kalite kontrolü ayrıca anlatıyor. Görsel "AI her şeyi
kendi yapıyor" izlenimi vermemeli: insan onayı / kalite kontrol adımı en az AI
adımı kadar ağırlıklı olsun. AI ürün ya da model adı yazma.

---

## web (grafik-tasarim + web-tasarim-yazilim)

**grafik-tasarim** — Kimlik kılavuzu / geri bildirim onayı / dosya paketi.
"Logo varyasyonları" çizilecekse **soyut yer tutucu işaret** olmalı; gerçek ya da
gerçeğe benzeyen bir marka işareti çizme. Doğru-yanlış karşılaştırması gerçek bir
markayı ima etmesin. Dosya sayısı/boyutu yazma.

**ai-entegrasyonu** — Chatbot widget'ı, bilgi tabanı, marka sesi, performans takibi.
AI ürün/model adı ya da logosu yok. Yanıt oranı, yanıt süresi, memnuniyet gibi
**rakam yok**. Sohbet balonları soyut çubuk kalsın — okunur sahte diyalog yazma.

**bakim-destek** — 01. adım *kapsam DIŞINDA kalanları* anlatıyor. Görselde bunlar
kapsam içindeymiş gibi görünmemeli; dışarıda kalan açıkça ayrı bir bölgede dursun.
Çalışma süresi yüzdesi, müdahale süresi (SLA) ve paket fiyatı **yazma**.

**e-ticaret** — Ödeme kuruluşu, banka ya da kart markası logosu/işareti **çizme**
(sayfa SSL ve 3D Secure'dan kavram olarak söz ediyor; kilit çizilebilir, marka
çizilemez). Kart numarası, fiyat, stok adedi, komisyon oranı yazma.

**kurumsal-web-sitesi** — Arama motoru logosu yok. Sıralama, trafik, sayfa sayısı
rakamı yok. CRM/bayi bulucu gibi sistemler kutu olarak çizilebilir, **ürün adı**
yazılamaz.

**ozel-yazilim** — ERP/CRM ürün adı ya da logosu yok. Bayi/bölge sayısı, kapasite
rakamı yok. Roller çizilecekse gerçek bir şirket şeması gibi durmasın.

---

## Kalan modüller (seo, mobil, pazarlama)

Sahne yazılmadan önce sayfanın kendi 01/02/03 metni okunup buraya eklenecek.
`node plan/video-uret/adimlari-cikar.js` üç adımı `adimlar.json`'a çıkarır.
