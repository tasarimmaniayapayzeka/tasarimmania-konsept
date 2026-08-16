# TasarımMania 5 Demo — ORTAK ŞARTNAME (her üretim ve denetim ajanı önce bunu okur)

Bu demolar, 46 rakip sitenin kaynak-kod analizinden çıkan boşluk haritasının CEVABIDIR. Rakiplerin
hiçbirinde olmayan 6 şey her demoda VİTRİNDE olacak: ① uçtan uca dönüşüm kurgusu ② video-SEO şablonu
(VideoObject+FAQPage) ③ brief toplayan chatbot ④ interaktif fiyat hesaplayıcı ⑤ sektörel vaka anlatımı
⑥ hız (performans bütçesi).

## Dosya yapısı (demo başına 8 dosya, klasör: `demo/<slug>/`)
- `style.css` — ortak stiller (sayfalar `<link rel="stylesheet" href="style.css">` ile bağlar)
- `app.js` — ortak JS: mobil menü + chatbot + sticky CTA (sayfalar `<script src="app.js" defer>`)
- `index.html` — ana sayfa
- `tanitim-filmi-cekimi.html` — hizmet şablonu 1 (ana kelime: "tanıtım filmi çekimi")
- `instagram-reels-cekimi.html` — hizmet şablonu 2 (ana kelime: "instagram reels çekimi")
- `portfolyo.html` — vaka listesi (6 vaka kartı + 1 açık vaka detayı)
- `fiyat.html` — 3 paket + İNTERAKTİF HESAPLAYICI
- `iletisim.html` — form + iletişim + çalışma alanı

## Sayfa iskeletleri (zorunlu bölümler)

**index.html:** showreel hero (poster sahnesi CSS/SVG ile; ortada oynat butonu; tıklayınca "temsilî
demo" tooltip — video embed ETME) → 6 hizmet kartı (Tanıtım Filmi, Reklam Filmi, Instagram Reels,
Fabrika Çekimi, Etkinlik Çekimi, Drone; ilk ikisi kendi sayfasına, diğerleri `iletisim.html#teklif`e
link) → rakamlı sosyal kanıt bandı (temsilî: 214 proje · 96 marka · 12 yıl · 4.9 GBP puanı) → 3 vaka
kartı (portfolyo.html'e) → süreç 4 adım → SSS 4 soru → CTA blok. Web/Yazılım/SEO çapraz satış şeridi
footer üstünde ("Video trafiğini satışa çeviren siteyi de biz yaparız").

**Hizmet sayfaları (2 adet) — rakip raporu 7.2 şablonu birebir:**
H1 = birebir hedef kelime → 90sn örnek video alanı (poster + play mock) → süreç (keşif→çekim→kurgu→
teslim) → 3 vaka kartı → ekipman listesi (gerçekçi: Sony FX3, DJI RS4, Aputure 600d, DJI Mavic 4 Pro…)
→ SSS 6 soru (kaç gün sürer / fiyat neye göre / revizyon / telif-müzik / mekân / teslim formatı)
→ fiyat bandı kutusu ("Tanıtım filmi projeleri genellikle 45.000–120.000 ₺ bandında; net rakam
keşifle netleşir" / Reels: "aylık paketler 25.000–60.000 ₺") → 3 alanlı form (ad, telefon, hizmet) +
WhatsApp + tel butonları.

**portfolyo.html:** 6 vaka kartı (sektör etiketli: fabrika, klinik, restoran, e-ticaret, otel,
etkinlik). 1 vaka AÇIK detay: Müşteri (temsilî ad) · Problem · Çözüm · Sonuç metriği ("lansman
videosu 2,1M görüntülenme; bayi başvurusu %38 arttı" gibi temsilî ama gerçekçi) · süreç künyesi.
Alt notu: "Vakalar temsilîdir; gerçek portfolyo müşteri onaylarıyla eklenecektir."

**fiyat.html:** 3 paket kartı (Başlangıç/Kurumsal/Prestij — kapsam listeli, bant fiyatlı) +
HESAPLAYICI: hizmet türü (6 seçenek) × çekim günü (1-5 kaydırıcı) × lokasyon (İst içi / İst dışı)
× drone (+) × ek revizyon (+) → JS anlık bant hesabı (min–max ₺, binlik ayraçlı) → "Bu bandı
WhatsApp'tan gönder" butonu (wa.me linkine hesap özeti encodeURIComponent ile eklenir). Dipnot:
"Rakamlar temsilî banttır." Fiyat mantığı: taban (tanıtım 45-90k, reklam 90-200k, reels-aylık 25-45k,
fabrika 55-110k, etkinlik 20-40k, drone-tek 8-18k) × gün çarpanı (1+0,6×(gün-1)) + İst dışı %25 +
drone 8-15k + revizyon 5k.

**iletisim.html:** form (ad, telefon, hizmet seçimi, mesaj; `#teklif` çıpası) → tel/WA/adres kartları
→ "Bakırköy stüdyo + tüm Türkiye çekim" metni → çalışma saatleri. Harita embed ETME (harici kaynak
yasak); adresi metin + "Yol tarifi" için https://maps.google.com/?q=Tasar%C4%B1mMania+Bak%C4%B1rk%C3%B6y linki (a href, embed değil).

## Marka gerçekleri (UYDURMA YASAK)
- Logo: `../../assets/logo/logo-beyaz-yazi.png` (koyu zemin) / `logo-koyu-yazi.png` (açık zemin) /
  `logo-kare.png` (favicon). Marka kırmızısı **#ED1E24**.
- Tel: **0538 699 96 66** → `href="tel:+905386999666"`. WhatsApp: `https://wa.me/905386999666`
- Adres: Zeytinlik Mah. Pancar Sk. No:19-11 Bakırköy/İstanbul
- 3D ikonlar kullanılabilir: `../../assets/icon-web.png|icon-video.png|icon-seo.png|icon-reklam.png|icon-mobil.png` (256px şeffaf PNG) + `../../assets/3d-hero.png` (sıvı krom obje)

## Her sayfada zorunlu
1. `<meta name="viewport">` + `<meta name="robots" content="noindex,nofollow">` (bunlar DEMO)
2. Kelime hedefli `<title>` (≤60 kr) + 120-160 kr meta description + TEK H1
3. Header: logo + 6 linkli menü (Ana Sayfa · Tanıtım Filmi · Reels · Portfolyo · Fiyat · İletişim)
   + mobil hamburger (JS'siz checkbox tekniği veya app.js) — iç linkler birebir dosya adlarıyla
4. Sticky mobil alt bar: `tel:` + `wa.me` butonları (≤768px'te görünür)
5. JSON-LD: her sayfada LocalBusiness (ad TasarımMania, gerçek adres/tel, `priceRange:"₺₺"`);
   hizmet sayfalarında EK olarak Service + FAQPage (gerçek SSS metinleriyle) + VideoObject
   (name/description gerçek; `thumbnailUrl` ve `contentUrl` SADECE şu gerçek URL:
   `https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept/assets/og-kapak.jpg`,
   `uploadDate:"2026-08-16"`). JSON'lar parse hatasız olacak.
6. `<!-- GTM: GTM-XXXXXXX buraya -->` yorumu + `wa_click`/`tel_click`/`form_submit`/`bot_lead`
   olaylarını `dataLayer.push` eden stub (app.js'te; dataLayer yoksa oluştur) — ölçüm vitrini
7. Chatbot mock (app.js): sağ altta buton → panel → 4 adım (hizmet? → sektör? → tarih? → bütçe bandı?)
   butonlarla akar; sonunda özetli `wa.me` linki ("WhatsApp'tan devam et") + `bot_lead` push.
   Panel klavyeyle kapanabilir (Esc), `aria-label`'lı.
8. Footer: NAP (ad-adres-tel) tutarlı + hizmet linkleri + "Web Tasarım & Yazılım · SEO · Video" satırı

## Yasaklar
- Harici JS/CSS kütüphanesi ve CDN YASAK (jQuery, GSAP, three.js, bootstrap… hiçbiri). Google Fonts
  SERBEST (en fazla 2 aile, `display=swap`).
- Harici görsel URL YASAK — görsel dünya CSS gradyan/SVG sahneler + `../../assets/` dosyaları.
- `og:image` ya HİÇ koyma ya da SADECE `https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept/assets/og-kapak.jpg`
- Autoplay video, lorem ipsum, İngilizce placeholder, "koyu zemin + mor/turkuaz gradyan + yuvarlak
  kart" jenerik ajans estetiği YASAK — her demo kendi sanat yönetimine %100 sadık.
- Sabit `width` ile 390px'i taşıran blok YASAK; geniş içerik `overflow-x:auto` konteynerde.

## Performans & erişilebilirlik
- Sayfa başına HTML ≤ 90KB hedef; `style.css` ≤ 60KB; `app.js` ≤ 25KB.
- `prefers-reduced-motion: reduce` bloğu tüm animasyonları durdurur; sürekli animasyonlar
  IntersectionObserver ile ekran dışında durur.
- Kontrast: metin arka planla en az 4.5:1. Odak halkaları görünür kalır.
- 390 / 768 / 1440 px'te yatay taşma sıfır.

## İçerik dili
Türkçe, satış odaklı, abartısız-net. Sayılar temsilî ama gerçekçi; her temsilî blokta küçük
"temsilîdir" dipnotu. Sağlık sektörü örneği geçen yerde tedavi vaadi/hasta yorumu YAZMA (mevzuat) —
"klinik tanıtımında mevzuata uygun kurgu" ifadesi kullanılabilir.
