# TasarımMania Asistanı — şartname (onay bekliyor)

**Tarih:** 5 Eylül 2026 · **Durum:** ⏸ ONAY BEKLİYOR, kod yazılmadı
**Karar verilenler:** arka uç **PHP/cPanel** · kapsam **en kapsamlı**
**Referans:** `02-SmileGroup/chatbot` — çalışan, denetimden geçmiş bot

---

## 0. İki bağlayıcı kısıt

**① Alan adı `tasarimmania.tr` DEĞİL.** (Kullanıcı emri, 5 Eyl 2026.)
Alan adı henüz belli değil. Bu yüzden **hiçbir yere alan adı gömülmez**:
API adresi, CORS izinli köken ve widget'ın çağırdığı uç — üçü de tek bir
yapılandırma dosyasından okunur. Alan adı belli olunca **tek satır** değişir.

**② Görsel/video üretimi yok.** Bot metinle çalışır; SmileGroup'taki "klinik
görselleri şeridi" karşılığı TasarımMania'da **yoktur** (site zaten görsel
üretimi SEO paketine dahil etmiyor).

---

## 1. Bot ne yapar

Ziyaretçinin sorusunu **sitenin kendi içeriğinden** yanıtlar. Uydurmaz;
bilmediğini bilmiyorum der ve teklif/iletişime yönlendirir.

**Bilgi kaynağı:** `plan/bot-dizin.json` — hazır.
62 sayfa · 454 bölüm · 396 SSS · 25.208 kelime · boş kayıt yok.

**Ad:** karar sizde. Öneri: **"TasarımMania Asistanı"**.
Kendini "TasarımMania Asistanı, ajans asistanı" diye tanıtır.

---

## 2. Davranış kuralları

Metinler **kodda değil** `veri/marka.json → kaliplar` içinde durur; siz
düzenlersiniz, kod değişmez.

| Kural | Neden |
|---|---|
| **Fiyat verilmez** — teklife yönlendirir | Siteden fiyatlar bilerek kaldırıldı ("ucuza ya da pahalıya yapacağız, bu bizi bağlar"). Bot da rakam veremez. |
| Israr edilirse aynı cümle tekrarlanır | Rakama yumuşamaz |
| **Rakip ajanstan bahsedilmez** | Ad, kıyas, "başka yere bakın" — hepsi yasak |
| **Süre/sonuç garantisi verilmez** | "2 haftada biter", "1. sıraya çıkarırız" → yasak. Süreç anlatır, sonuç vaat etmez |
| Tanım soruları kısa-net + sayfa linki | "Teknik SEO nedir?" → 1-2 cümle + `/hizmetler/seo/teknik-seo/` |
| Bilmediğinde | "Bu konuda sayfalarımızda bilgi yok; isterseniz sizi ilgili ekibe bağlayayım" |
| Hassas/alakasız konu | Kibarca kapsam dışı der, konuya döner |
| Uydurma adres/link vermez | Yalnız dizindeki 62 yol |

---

## 3. Kalkanlar — model kurala uymazsa devreye girer

SmileGroup'ta kanıtlanmış desen. Sıra önemli:

**① `rakipKalkani()`** — başka ajans/hizmet sağlayıcı yönlendirmesini yakalar,
yanıtı kimlik cümlesiyle değiştirir.
> ⚠️ **Yanlış alarm koruması zorunlu.** SmileGroup'ta "kliniğimizde **başka bir
> hekimimiz** de sürdürebilir" meşru cümlesi kesiliyordu; iyelik eki varsa kalkan
> devreye girmiyor. Aynı koruma buraya da gelir ("**ekibimizden başka biri**").

**② `fiyatKalkani()`** — rakam + para birimi kalıbı görürse yanıtı tümüyle
teklif yönlendirmesiyle değiştirir. `marka.json → fiyatListesi` null olduğu
sürece açık.

**③ `vaatKalkani()`** — *TasarımMania'ya özel, SmileGroup'ta yok.*
"garanti", "kesin", "X günde", "1. sıraya çıkarırız" kalıplarını yakalar.
Ajansın satamayacağı vaadi bot da satamaz.

**④ `linkKalkani()`** — dizinde olmayan her URL'yi siler. Kendi alan adımızdaki
uydurma adres bile silinir.

---

## 4. Kapsam — "en kapsamlı" ne demek

| # | Yetenek | SmileGroup'ta | Not |
|---|---|---|---|
| M1 | Soru-cevap (dizinden, uydurmasız) | ✓ | çekirdek |
| M2 | Sayfa yönlendirme + ilgili içerik önerisi | ✓ | 62 yol |
| M3 | Çok dilli (TR + EN) | ✓ (4 dil) | site şu an TR; EN sonradan |
| M4 | Dört kalkan | ✓ (3) | +vaatKalkani |
| M5 | **Aday toplama** — ad/telefon/e-posta/ihtiyaç | ✓ | teklif hunisi |
| M6 | **Yönetim paneli** — görüşmeler, adaylar, arama | ✓ | parola korumalı |
| M7 | **Görüşme dökümü** — TXT / Word / PDF | ✓ | |
| M8 | **Trafik kanalı ve reklam atfı** — UTM yakalama | ✓ | hangi kampanyadan geldi |
| M9 | **Harcama takibi** — jeton/maliyet | ✓ | aylık tavan + uyarı |
| M10 | **CRM aktarımı** — Sheets / webhook | ✓ (Kommo) | hedef sizde |
| M11 | **Sesli görüşme** (eller serbest) | ✓ | TTS + STT, ek maliyet |
| M12 | Hız/önbellek — sık sorulara hazır yanıt | ✓ | jeton tasarrufu |

**"En kapsamlı" = M1–M12 hepsi.** Onayınızla bu liste kilitlenir.

---

## 5. Nerede duracak

```
25-TasarimMania-Site/
└─ chatbot/                 ← AYRI git deposu (PRIVATE), site deposundan bağımsız
   ├─ api/                  PHP uçları (anahtar burada okunur)
   ├─ veri/                 marka.json, dizin.json, kaliplar
   ├─ widget/               tm-bot.js + tm-bot.css (site kimliğiyle)
   ├─ panel/                yönetim paneli
   ├─ ayar.php              ⚠ .gitignore — anahtar, parola, alan adı
   └─ ayar.ornek.php        depoya giren şablon
```

**Neden ayrı depo:** site deposu **public** ve GitHub Pages'e yayınlanıyor.
Bot kodu oraya girerse kaynak herkese açılır. Ayrıca `canli-paket.js`
allowlist'i yalnız `site/` + `assets/` paketliyor — bot zaten dışarıda kalırdı,
ama ayrı depo daha temiz ve cPanel Git deploy akışına uygun
(drramazanersoy/griarts'ta kullandığınız akışın aynısı).

---

## 6. Yapım sırası

| Aşama | İş | Onay |
|---|---|---|
| **A** | İskelet + yapılandırma + `marka.json` + kalkanlar (M1, M4) | — |
| **B** | Widget arayüzü, site kimliğine göre (M2) | görsel onayı |
| **C** | Aday toplama + panel + döküm (M5, M6, M7) | — |
| **D** | Atıf + harcama + CRM (M8, M9, M10) | CRM hedefi sizden |
| **E** | Sesli görüşme (M11) + önbellek (M12) | ek maliyet onayı |

Her aşama sonunda ölçüm: kalkanlar test edilir, uydurma denetimi koşulur.

---

## 7. Sizden gereken

| # | Gerekli | Ne zaman |
|---|---|---|
| 1 | **OpenAI API anahtarı** | A aşamasında |
| 2 | Alan adı (belli olunca) | yayına almadan önce |
| 3 | Bot adı onayı | A aşamasında |
| 4 | Aday bildirimi nereye — e-posta / WhatsApp / Sheets | C aşamasında |
| 5 | Aylık jeton tavanı | D aşamasında |
| 6 | Sesli görüşme istiyor musunuz (ek maliyet) | E aşamasında |

---

## 8. Açık uçlar

- **Site noindex ve konsept adreste.** Bot yayına alınsa da siteyi kimse
  bulamıyor. Botun gerçek değeri domain taşındıktan sonra başlar.
- **EN dil desteği** siteyle sınırlı: site şu an yalnız TR. Bot EN sorabilene
  TR içerikten çeviri yapar; bu SmileGroup'ta DE/FR için kullanılan yöntem.
- Sesli görüşme jeton maliyetini belirgin artırır; E aşamasında ayrıca ölçülür.
