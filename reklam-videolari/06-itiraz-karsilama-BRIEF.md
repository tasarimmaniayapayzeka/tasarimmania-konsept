# Reklam Videosu 6 — "Reels çekiyoruz ama randevuya dönmüyor"

**Açı:** İtiraz karşılama · **Hedef:** Klinik sahibi (diş, medikal estetik, güzellik)
**Tarih:** 19.08.2026 · **Durum:** Onay bekliyor, üretim başlamadı

---

## 1. Kilitli teknik parametreler

| Parametre | Değer |
|---|---|
| Model | `seedance_2_5`, mode `t2v` |
| `aspect_ratio` | **9:16** — istisnasız |
| `resolution` | **1080p** |
| `bitrate_mode` | **high** |
| `duration` | **5 sn** üret → kurguda 1.5–2.2 sn kullan |
| `generate_audio` | **false** — müzik tek parça, altta sürekli |
| Toplam süre | ~20 sn (16.4 sn gövde + 3.6 sn bitiş kartı) |
| Plan sayısı | 9 AI planı + 1 statik bitiş kartı |

---

## 2. Marka sabitleri (logo dosyalarından ölçüldü)

| | Değer | Kaynak |
|---|---|---|
| Turkuaz | **`#00D6CE`** | Yuvarlak logo, 8.620 px örneklem |
| Koyu zemin | **`#0A1517`** | Her iki logo dosyası |
| Beyaz | `#FFFFFF` | — |
| Sarı vurgu | `#FFC107` | TM3 overlay'inden |
| Telefon | 0554 791 65 45 | — |
| Adres | Sakızağacı Mah. İstanbul Caddesi – Arifbey İş Merkezi No: 52 Kat: 3 / 302 Bakırköy / İSTANBUL | — |
| Slogan | Video Çekmiyoruz, Randevu Getiriyoruz | — |

> Videolardaki `#11EECB` **yanlış** — render sırasında parlaklık kaymış. Doğrusu `#00D6CE`.

---

## 3. Font kararı

**Karar: Poppins ailesi.** (Kurulu, tam Türkçe desteği, ücretsiz.)

- Başlık / overlay → **Poppins SemiBold**
- Bitiş kartı slogan → **Poppins Bold**
- Telefon → **Poppins Medium**
- Adres → **Poppins Light Italic**
- Logo altı harf aralıklı satır → **Poppins Light**, +13px tracking

**Gerekçe:** Kurulu 445 fontun tamamı tarandı. Referans videoların bitiş kartındaki font **geniş/kare tekno** bir aile (Eurostile–Square 721 kolu) ve sistemde yok. Ama daha önemlisi: **o font logonun tipografisiyle uyuşmuyor.** Logonun "mania" wordmark'ı ve "CREATIVE AGENCY" satırı dairesel geometrik — tek katlı yuvarlak `a`, monoline gövde. Bu tam olarak Poppins'in karakteri. Marka rehberi olarak logo verildiğine göre doğru hizalama logo tarafı.

*Alternatif:* Videodaki kare fontta ısrar edilirse Eurostile / Square 721 lisansı satın alınmalı — ama bu logoyla çelişmeye devam eder. Önerim Poppins.

---

## 4. Konsept

Klinik sahibinin kafasındaki cümleyi videonun ilk 2 saniyesinde söyleyip, sonra çürütüyoruz:

> "Reels atıyoruz ama randevuya dönmüyor."

**Ark:** Problem (boş koltuk) → Teşhis (sorun video değil, videodan sonrası) → Çözüm (strateji + çekim + reklam + ölçüm) → Ödül (dolu salon)

---

## 5. Plan listesi

| # | Zaman | İçerik | Overlay (post'ta) |
|---|---|---|---|
| 1 | 0.0–2.2 | Klinik sahibi boş bekleme salonunda telefona bakıyor, yüzü düşüyor | "Reels atıyorsunuz…" |
| 2 | 2.2–4.0 | Boş diş koltuğu, tek tepe ışığı, sessiz oda | "…ama koltuk boş." |
| 3 | 4.0–5.8 | Elde telefon yakın plan, ekran **kapalı** | "12.000 izlenme. 0 randevu." + sahte Reels arayüzü |
| 4 | 5.8–7.6 | Ajans ekibi **boş** beyaz tahta başında, biri anlatıyor | "Sorun video değil." + huni çizimi |
| 5 | 7.6–9.4 | Toplantı: ajans + klinik sahibi, arkadaki ekran **kapalı** | "Sorun, videodan sonrası." |
| 6 | 9.4–11.4 | **İmza motif:** klinikte çekim, kamera monitöründe aynı kadraj | — |
| 7 | 11.4–13.2 | Masada el + mouse, iki monitör **kapalı** | "Hedefleme + çağrı + ölçüm" + Ads paneli |
| 8 | 13.2–15.0 | Elde telefon, arkada gülümseyen yüz, ekran **kapalı** | Bildirim yığını + "Randevu." |
| 9 | 15.0–16.4 | Dolu resepsiyon, telefon çalıyor, sekreter not alıyor | — |
| 10 | 16.4–20.0 | **Bitiş kartı** — AI değil, statik üretim | Logo + slogan + tel + adres |

---

## 6. Ortak stil bloğu

Aşağıdaki blok **her prompt'un sonuna** eklenir:

```
Shot on a cinema camera with a fast prime lens, shallow depth of field, natural
handheld micro-movement. Documentary behind-the-scenes realism. Photorealistic
skin with visible pores, natural texture and slight asymmetry — no airbrushed or
plastic skin. Real Turkish people of mixed ages and body types, ordinary everyday
faces, not fashion models. Practical light sources visible in frame: soft window
daylight mixed with clinical LED panels. Subtle film grain in the shadows, mild
lens vignette. No slow motion. No smooth gimbal glide. No text, no lettering, no
signage, no logos anywhere in frame. All screens, monitors and phone displays are
switched off, showing a plain flat dark surface.
```

**Neden:** Metin ve arayüz AI'ya bırakılmıyor — referans videolarda tam da bu patlamış ("digital marketer", "…ımMania"). Boş yüzey üretip post'ta bindirmek hem hatasız hem daha temiz.

---

## 7. Prompt seti

### P1 — Hook
```
A clinic owner in his forties sits alone in an empty modern dental clinic waiting
room in Istanbul, holding a phone low in his lap, scrolling. His expression shifts
from hope to quiet disappointment. Empty upholstered chairs line the wall behind
him. Late afternoon daylight through a tall window on the left, shadows falling to
the right. The camera slowly pushes in from medium-wide to medium.
```

### P2 — Boş koltuk
```
An empty dental treatment room. The chair is unoccupied, a single overhead
examination light casting a pool of light onto the empty seat. Instruments sit
neatly arranged and untouched on the tray. Still, quiet, slightly cold. The camera
drifts laterally past the open doorway.
```

### P3 — Ölü metrik
```
Close-up over a person's shoulder of a hand holding a smartphone in a dim clinic
back office. The phone screen is switched off — a plain black rectangle with a
single soft reflection of the ceiling light. The thumb rests motionless on the
glass. Very shallow focus on the phone edge.
```

### P4 — Dönüş
```
Four creative agency team members in plain black t-shirts stand at a large,
completely blank whiteboard in a bright modern Istanbul office. One person is
mid-gesture, explaining; the others listen and nod. The whiteboard is spotless and
entirely empty. Floor-to-ceiling windows, exposed concrete ceiling, warm afternoon
light raking from the right.
```

### P5 — Teşhis
```
A meeting room. A man in a plain black t-shirt sits across a white table from a
clinic owner in a navy blazer. Both lean in, engaged in conversation. A closed
laptop rests on the table between them. The large wall-mounted display behind them
is switched off, a flat dark grey panel. Soft window light from the left, shadows
falling to the right.
```

### P6 — İmza motif
```
Inside a bright dental clinic, a small professional film crew records a treatment.
A camera operator in a plain black t-shirt holds a cinema camera on a tripod; a
second crew member holds a boom microphone overhead. In the background a dentist
wearing a surgical mask and blue nitrile gloves works on a patient reclined in the
chair. The camera's flip-out monitor faces us and shows the same dentist and
patient from the camera's own angle, correctly matched in direction and framing.
Handheld, positioned slightly behind and to the side of the crew.
```

### P7 — Reklam yönetimi
```
Close-up of a hand resting on a mouse beside a keyboard at a desk in a dim office.
Two large monitors stand in front, both switched off, showing flat dark grey.
Cool desk lamp light rakes from the side, putting a soft rim on the knuckles. The
fingers move deliberately, once.
```

### P8 — Ödül
```
Close-up of a hand holding a smartphone in a bright clinic reception. The phone
screen is switched off, plain black. The hand lifts the phone slightly as the
person's face, softly out of focus behind it, breaks into a genuine, unforced
smile. Warm daylight from a window behind the camera.
```

### P9 — Dolu salon
```
A busy clinic reception. A receptionist in scrubs holds a desk phone to her ear
and writes in an open appointment book. Three patients sit in the waiting area
behind her; a fourth stands at the counter. Natural overlapping movement, people
talking. Bright daylight, handheld with a slight sway.
```

---

## 8. Post-prodüksiyon

**Overlay**
- Poppins SemiBold, beyaz, alt-üçlü hizada, `#FFC107` vurgu kelimesi
- Gölge: 4px offset, %55 siyah — okunabilirlik için
- Hashtag hapı: `#0A1517` %70 opak, 12px radius

**Bindirilecek sahte arayüzler** (piksel piksel, AI değil)
- P3 → Instagram Reels: yüksek izlenme, boş DM
- P4 → beyaz tahtaya huni çizimi
- P7 → Meta Ads paneli
- P8 → randevu bildirim yığını

**Bitiş kartı** (statik, 3.6 sn)
- Zemin `#0A1517`, logo `img-10` (beyaz yatay sürüm)
- Slogan Poppins Bold beyaz → telefon Poppins Medium → adres Poppins Light Italic
- Yazı sırayla belirir (referans videolardaki gibi)

**Ses**
- Tek müzik parçası, kesmeler beat'e oturacak
- **Hedef seviye −14 LUFS.** Referans videolar −9.5 LUFS; Instagram/Meta bunu zaten kısıyor, o yüzden hem kazanç yok hem dinamik kayboluyor. −14 daha iyi duyulur.

---

## 9. Kalite kapısı — her klip için

Üretilen her klip ffmpeg ile kare kare çıkarılıp şu listeye göre denetlenir. Takılan elenir, yeniden üretilir.

- [ ] Kadrajda **hiç metin yok** (tabela, tişört, ekran, ambalaj)
- [ ] Tüm ekranlar kapalı / düz yüzey
- [ ] P6: monitördeki kadraj kameranın baktığı yönle **uyumlu**
- [ ] Klinik sahnelerinde **maske + eldiven** eksiksiz
- [ ] (Lazer sahnesi eklenirse) hem hekimde hem **hastada** koruyucu gözlük
- [ ] El ve parmak sayısı doğru
- [ ] Işık yönü ↔ gölge yönü tutarlı
- [ ] Ekipman geometrisi gerçekçi (tripod bacağı, kablo devamlılığı)
- [ ] Plan içinde kişi sayısı sabit
- [ ] Ayna/cam yansımaları sahneyle örtüşüyor
- [ ] Cilt dokusu gerçekçi, plastik parlaklık yok
- [ ] Ağır çekim yok, kaygan gimbal kayması yok

---

## 10. Açık madde

Referans videolardaki **"+45% / −30% / +150"** grafiği bu videoda **kullanılmıyor** — gerçek müşteri verisine dayanmıyorsa Reklam Kurulu tarafında açık yaratır. Gerçek bir vaka varsa eklenir, yoksa niteliksel vaat yeterli.
