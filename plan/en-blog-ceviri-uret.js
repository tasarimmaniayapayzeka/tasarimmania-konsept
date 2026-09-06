/* /blog/ çevirisini ÜRETİR — 299 kaydın 210'u düzenli desende.
 *
 * NEDEN ÜRETEÇ: blog dizininde 42 kart var ve her kart tam 5 kayıt:
 *   kategori · H2 başlık · özet · tarih · "Oku"
 * Bunları elle numaralamak 210 satırda kayma riski demek. Desen koddan
 * üretiliyor; yalnız 42 özet ve tekil kayıtlar elle yazılıyor.
 *
 * ⚠ DESEN DOĞRULANIYOR: üreteç, çıkarımdaki her kaydın beklenen türde
 *   olduğunu (kategori sözlükte mi, tarih biçimi tutuyor mu, 5. kayıt
 *   "Oku" mu) tek tek kontrol eder. Tutmazsa yazmaz, durur.
 *
 * Kullanım: node plan/en-blog-ceviri-uret.js
 */
const fs = require('fs'), path = require('path');
const C = JSON.parse(fs.readFileSync('C:/Temp/en-blog.json', 'utf8'));
const K = C.kayitlar;

/* --- kart deseni --- */
const KART_BAS = 83, KART_SAY = 42;

const KATEGORI = {
  'E-Ticaret': 'E-Commerce', 'Seo': 'SEO', 'Dijital Pazarlama': 'Digital Marketing',
  'Sosyal Medya': 'Social Media', 'Grafik Tasarım': 'Graphic Design',
  'Web Tasarım': 'Web Design', 'Mobil': 'Mobile', 'Video': 'Video',
};
const AY = { 'Eylül': 'September', 'Ekim': 'October' };

/* 42 yazı başlığı — şemadaki sırayla aynı (kayıt 25-66). Oradan okunuyor
   ki iki yerde farklı çeviri olma ihtimali kalmasın. */
const BASLIK = {
  'E-ticaret Yazılımı Seçimi: Hangi Altyapı Hangi İşletmeye Uygun?': 'Choosing E-Commerce Software: Which Platform Suits Which Business?',
  'E-Ticaret SEO Ürün ve Kategori Sayfalarını Nasıl Sıralatır?': 'How Does E-Commerce SEO Rank Product and Category Pages?',
  'Kurumsal Grafik Tasarım Hangi Alanları Kapsar?': 'What Does Corporate Graphic Design Cover?',
  'Sosyal Medya Stratejisi Nedir? Platform Seçimi Neye Göre Yapılır?': 'What Is a Social Media Strategy? How Do You Choose a Platform?',
  'Yerel SEO ile Haritalarda Görünürlüğe Giden Yol': 'Local SEO: The Route to Visibility on Maps',
  'E-Ticaret Sitesi Tasarımı: Hazır Tema mı, Özel Tasarım mı?': 'E-Commerce Site Design: Off-the-Shelf Theme or Bespoke?',
  'E-Posta Pazarlama Stratejisi: Doğru Gönderim Zamanı Var mı?': 'Email Marketing Strategy: Is There a Right Time to Send?',
  'Teknik SEO Denetimi Sitenizde Neleri Ortaya Çıkarır?': 'What Does a Technical SEO Audit Uncover on Your Site?',
  'E-Ticaret Kullanıcı Deneyimi: Sepete Giden Yol Nasıl Kısalır?': 'E-Commerce UX: How Do You Shorten the Route to the Basket?',
  'SEO İçerik Stratejisinde İçerik Takvimi Neden Belirleyicidir?': 'Why Is the Content Calendar Decisive in an SEO Content Strategy?',
  'Grafik Tasarım Süreci Kaç Aşamada Tamamlanır?': 'How Many Stages Does the Graphic Design Process Take?',
  'Google Ads Reklam Yönetimi mi, Organik Büyüme mi? Maliyet Kıyası': 'Google Ads or Organic Growth? A Cost Comparison',
  'Mobil Uygulama Geliştirme Maliyeti Neye Göre Değişir?': 'What Makes Mobile App Development Costs Vary?',
  'Çok Dilli SEO ve Uluslararası Kurulum: hreflang ve URL Yapısı Rehberi': 'Multilingual SEO and International Setup: A Guide to hreflang and URL Structure',
  'Mobil Uygulama Yaptırmadan Önce Hangi Sorular Sorulur?': 'What Should You Ask Before Commissioning a Mobile App?',
  'E-Ticaret Ürün Görseli Satışı Gerçekten Etkiler mi?': 'Do Product Images Really Affect E-Commerce Sales?',
  'Mobil Uygulama Geliştirme Süreci Kaç Aşamadan Oluşur?': 'How Many Stages Does Mobile App Development Take?',
  'Backlink Çalışması Sıralamayı Ne Kadar Sürede Etkiler?': 'How Long Does Backlink Work Take to Affect Rankings?',
  'Native mi Cross-Platform mı? Uygulama Mimarisi Seçimi': 'Native or Cross-Platform? Choosing an App Architecture',
  'Sosyal Medya Reklam Yönetimi: Hangi Mecrada Hangi Format Kazandırır?': 'Social Media Advertising: Which Format Wins on Which Channel?',
  'React Native mi Flutter mı? Tek Kod Tabanı Karşılaştırması': 'React Native or Flutter? Comparing the Single-Codebase Options',
  'Anahtar Kelime Araştırması Neden İçeriğin Pusulasıdır?': 'Why Is Keyword Research the Compass for Your Content?',
  'Uygulama Mağaza Optimizasyonu Nasıl Yapılır? 8 Adım': 'How Do You Do App Store Optimization? Eight Steps',
  'E-Ticaret Ödeme Entegrasyonu Adım Adım Nasıl Kurulur?': 'How Do You Set Up E-Commerce Payments, Step by Step?',
  'Reklam Filmi Çekimi Hangi Aşamalardan Geçer?': 'What Stages Does a Commercial Film Shoot Go Through?',
  '2026 Grafik Tasarım Trendleri: Bu Yıl Neler Değişti?': 'Graphic Design Trends in 2026: What Has Changed This Year?',
  'Reklam Filmi Fiyatını Belirleyen Kalemler Nelerdir?': 'What Line Items Set the Price of a Commercial Film?',
  'SEO Raporlama İçin Hangi Araçları Nasıl Kurmalısınız?': 'Which Tools Should You Set Up for SEO Reporting, and How?',
  'Storyboard Ne İşe Yarar, Çekimden Önce Neyi Kurtarır?': 'What Is a Storyboard For, and What Does It Save Before the Shoot?',
  'Influencer Pazarlama Ajansı Gözüyle: Mikro mu, Makro mu?': "From an Influencer Marketing Agency's View: Micro or Macro?",
  'Reklam Filmi Ajansı Seçerken Nelere Bakılır?': 'What Should You Look for When Choosing a Commercial Film Agency?',
  'Çok Dilli E-Ticaret Dönüşüm Oranınızı Nasıl Değiştirir?': 'How Does Multilingual E-Commerce Change Your Conversion Rate?',
  'Ürün Videosu Çekimi: Stüdyo mu, Mekân mı?': 'Product Video Shoots: Studio or Location?',
  'Arayüz Tasarımı Hangi İlkelere Dayanır?': 'What Principles Is Interface Design Built On?',
  'E-Ticaret Ürün Videosu Formatları ve Ölçüleri': 'E-Commerce Product Video Formats and Dimensions',
  'SEO Uyumlu Web Tasarım Arama Görünürlüğünü Nasıl Etkiler?': 'How Does SEO-Friendly Web Design Affect Search Visibility?',
  'Yapay Zeka ile Video Üretimi Nerede İşe Yarar, Nerede Yaramaz?': 'Where Does AI Video Production Work, and Where Does It Not?',
  'Sosyal Medya Raporlama: Hangi Metrikleri İzlemeli?': 'Social Media Reporting: Which Metrics Should You Track?',
  'Kamerasız Ürün Videosu Nasıl Üretilir? Adım Adım': 'How Do You Make a Product Video Without a Camera? Step by Step',
  'Google Ads Reklam Metni Nasıl Yazılır? 9 Adımlık Formül': 'How to Write Google Ads Copy: A Nine-Step Formula',
  'Web Sitesine Chatbot Eklemek Neyi Değiştirir?': 'What Does Adding a Chatbot to Your Website Change?',
  'Grafik Tasarım Programları Karşılaştırması: Hangisi Kime Uygun?': 'Comparing Graphic Design Software: Which One Suits Whom?',
};

/* 42 kart özeti — kaynakta mekanik olarak kırpılmış; İngilizce karşılıklar
   aynı uzunluk bandında tutuldu ki kart yüksekliği değişmesin. */
const OZET = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-blog-ozet.json'), 'utf8'));

/* --- tekil kayıtlar (kart deseni dışında) --- */
const TEKIL = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-blog-tekil.json'), 'utf8'));

const ceviri = {};
const hata = [];

/* 1) tekil kayıtlar */
for (const [no, en] of Object.entries(TEKIL)) ceviri[no] = en;

/* 2) şemadaki 42 başlık (kayıt 25-66) */
for (let i = 0; i < KART_SAY; i++) {
  const no = 25 + i, k = K[no - 1];
  if (!k) { hata.push(`kayıt ${no} yok`); continue; }
  const en = BASLIK[k.metin];
  if (!en) { hata.push(`${no}. şema başlığı sözlükte yok: "${k.metin}"`); continue; }
  ceviri[no] = en;
}

/* 3) 42 kart × 5 kayıt */
for (let i = 0; i < KART_SAY; i++) {
  const b = KART_BAS + i * 5;
  const [kat, bas, ozet, tar, oku] = [b, b + 1, b + 2, b + 3, b + 4].map((n) => K[n - 1]);
  if (!oku) { hata.push(`kart ${i + 1}: kayıt eksik`); continue; }

  if (!KATEGORI[kat.metin]) hata.push(`${b}. kategori sözlükte yok: "${kat.metin}"`);
  else ceviri[b] = KATEGORI[kat.metin];

  if (!BASLIK[bas.metin]) hata.push(`${b + 1}. başlık sözlükte yok: "${bas.metin}"`);
  else ceviri[b + 1] = BASLIK[bas.metin];

  if (!OZET[String(b + 2)]) hata.push(`${b + 2}. özet yazılmamış`);
  else ceviri[b + 2] = OZET[String(b + 2)];

  /* ⚠ \w TÜRKÇE HARFİ KAPSAMAZ — ölçüldü: "Eylül" (ü) eşleşmedi, "Ekim"
     (saf ASCII) eşleşti; 19 tarihin 19'u sessizce düşecekti. Ay adı için
     Türkçe alfabe açıkça yazılıyor. */
  const m = tar.metin.match(/^(\d+) ([A-Za-zÇĞİÖŞÜçğıöşü]+) (\d{4}) · (\d+) dk$/);
  if (!m) hata.push(`${b + 3}. tarih biçimi tanınmadı: "${tar.metin}"`);
  else if (!AY[m[2]]) hata.push(`${b + 3}. ay adı sözlükte yok: "${m[2]}"`);
  else ceviri[b + 3] = `${m[1]} ${AY[m[2]]} ${m[3]} · ${m[4]} min`;

  if (oku.metin !== 'Oku') hata.push(`${b + 4}. beklenen "Oku", bulunan: "${oku.metin}"`);
  else ceviri[b + 4] = 'Read';
}

/* 4) eksik kalan var mı */
for (const k of K) if (ceviri[String(k.no)] === undefined) hata.push(`${k.no}. çevrilmedi: [${k.tur}] ${k.metin.slice(0, 60)}`);

if (hata.length) {
  console.error(`\n  ✗ ÜRETİM DURDU — ${hata.length} sorun\n`);
  hata.slice(0, 20).forEach((h) => console.error('     ' + h));
  if (hata.length > 20) console.error(`     … ${hata.length - 20} tane daha`);
  console.error('');
  process.exit(1);
}

const cikti = {
  _sayfa: '/blog/ → /en/blog/',
  _aciklama: 'Blog dizini çevirisi. Bu dosya ELLE YAZILMADI — plan/en-blog-ceviri-uret.js üretti. '
    + '42 kartın her biri 5 kayıt (kategori · başlık · özet · tarih · "Oku"); 210 kaydı elle numaralamak kayma riskiydi. '
    + 'Üreteç her kaydın beklenen türde olduğunu doğrular, tutmazsa yazmaz. Özetler en-blog-ozet.json, tekil kayıtlar en-blog-tekil.json.',
  _degismeyenler: 'Marka adı, platform adları, yazı slug\'ları.',
  ceviri,
};
fs.writeFileSync(path.join(__dirname, 'en-ceviri-blog.json'), JSON.stringify(cikti, null, 2) + '\n', 'utf8');
console.log(`\n  ✓ ${Object.keys(ceviri).length}/${K.length} kayıt → plan/en-ceviri-blog.json\n`);
