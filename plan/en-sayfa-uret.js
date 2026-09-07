/* İngilizce sayfayı üretir: TR sayfanın BİREBİR kopyası + çevrilmiş metin.
 *
 * YÖNTEM: yeni HTML yazılmıyor. Türkçe sayfa kopyalanıyor, yalnız insanın
 * gördüğü dizgeler değiştiriliyor. CSS, JS, sınıf adları, animasyonlar,
 * yapı bit bit aynı kalıyor — tasarım kaymıyor.
 *
 * SIRA:
 *   1. node plan/en-metin-cikar.js <sayfa> --json   → C:/Temp/en-<sayfa>.json
 *   2. JSON'daki her kayda "en" alanı yazılır (çeviri)
 *   3. node plan/en-sayfa-uret.js <sayfa> [--uygula]
 *
 * ⚠ SAYIM KİLİDİ: çeviri dosyasındaki kayıt sayısı sayfadan çıkarılanla
 *   birebir tutmuyorsa üretim DURUR. "en" alanı boş kalan kayıt varsa da
 *   durur. Eksik çeviri sessizce Türkçe kalamaz.
 *
 * ⚠ DEĞİŞTİRME SIRASI UZUNDAN KISAYA: kısa bir dizge uzun bir dizgenin
 *   içinde geçebilir ("SEO" → "SEO Hizmetleri" içinde). Kısa olan önce
 *   uygulanırsa uzun olanı bozar. Bu proje bu tuzağa üç kez düştü.
 *
 * ⚠ YOL DERİNLİĞİ: /seo/ (1 seviye) → /en/seo/ (2 seviye). Göreli yollar
 *   yeniden hesaplanır; "../" sayısıyla oynanmaz, mutlak çözüp yeniden yazılır.
 *
 * Kullanım: node plan/en-sayfa-uret.js <sayfa-yolu> [--uygula]
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const { scriptBloklari, gorunurDizgeler, jsKacir } = require('./en-script-suzgec.js');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
/* ⚠ ANA SAYFA İÇİN "anasayfa" — Git Bash "/" argümanını Windows yoluna çevirir. */
const HAM = process.argv[2];
const HEDEF = (HAM === 'anasayfa' || HAM === '.') ? '' : HAM;
const AD = HEDEF === '' ? 'anasayfa' : HEDEF.replace(/[\\/]/g, '_');
const KANONIK = 'https://www.tasarimmania.com';
if (!HAM) { console.error('  kullanım: node plan/en-sayfa-uret.js <sayfa-yolu|anasayfa> [--uygula]'); process.exit(2); }

const HARITA = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
const TR_YOL = HEDEF === '' ? '/' : '/' + HEDEF.replace(/^\/|\/$/g, '') + '/';
/* ⚠ BÖLÜM ADI SABİTLENMESİN. Önce yalnız hizmetler+kurumsal'a bakılıyordu;
 * blog bölümü eklenince 42 yazının hepsi "adres haritada yok" dedi.
 * Artık tüm bölümler taranıyor — yeni bölüm eklenince burası bozulmaz. */
function haritadaAra(yol) {
  for (const [bolum, girdiler] of Object.entries(HARITA)) {
    if (bolum.startsWith('_') || typeof girdiler !== 'object') continue;
    const d = girdiler[yol];
    if (d && typeof d === 'object' && d.en) return d.en;
  }
  return null;
}
const EN_YOL = TR_YOL === '/' ? '/en/' : haritadaAra(TR_YOL);
if (!EN_YOL) { console.error(`  ✗ ${TR_YOL} için İngilizce adres haritada yok`); process.exit(2); }

const trDosya = path.join(S, HEDEF, 'index.html');
if (!fs.existsSync(trDosya)) { console.error('  ✗ Türkçe sayfa yok: ' + trDosya); process.exit(2); }

/* Çıkarım dosyası (numara + Türkçe metin) ile çeviri dosyası (numara → İngilizce)
   AYRI tutuluyor: çeviri dosyasında Türkçe metni tekrar yazmak gerekmiyor,
   yazım farkı kaynaklı eşleşmeme riski doğmuyor. */
const cikarimDosya = path.join('C:/Temp', `en-${AD}.json`);
const ceviriDosya = path.join(__dirname, `en-ceviri-${AD}.json`);
for (const [p, ad] of [[cikarimDosya, 'çıkarım'], [ceviriDosya, 'çeviri']])
  if (!fs.existsSync(p)) { console.error(`  ✗ ${ad} dosyası yok: ${p}`); process.exit(2); }

const CIKARIM = JSON.parse(fs.readFileSync(cikarimDosya, 'utf8'));
const CEVIRI_HAM = JSON.parse(fs.readFileSync(ceviriDosya, 'utf8'));
const CEV = CEVIRI_HAM.ceviri;
const C = { kayitlar: CIKARIM.kayitlar.map((k) => ({ ...k, en: CEV[String(k.no)] })) };
let h = fs.readFileSync(trDosya, 'utf8');

/* ═══ 0. NUMARA KİLİDİ ═══
   ⚠ Çeviriler SIRA NUMARASIYLA eşleşiyor. Çıkarıcı geliştiğinde araya yeni
   kayıt girebilir ve numaralar kayar — o zaman her çeviri YANLIŞ dizgeye
   uygulanır ve bu SESSİZ bir bozulmadır (sayım tutmaya devam eder).
   Ölçüldü: süzgece noktalama kuralı eklenince ana sayfada 'marka:' kaydı
   430. sıraya girdi ve sonraki 12 kayıt birer kaydı.
   Çözüm: çeviri dosyası her kaydın Türkçesinin ilk 48 karakterini de tutar.
   Yazmak için: node plan/en-sayfa-uret.js <sayfa> --kaynak-yaz */
const kaynakKisa = (s) => String(s).replace(/\s+/g, ' ').trim().slice(0, 48);
if (process.argv.includes('--kaynak-yaz')) {
  CEVIRI_HAM._kaynak = {};
  for (const k of CIKARIM.kayitlar) CEVIRI_HAM._kaynak[String(k.no)] = kaynakKisa(k.metin);
  fs.writeFileSync(ceviriDosya, JSON.stringify(CEVIRI_HAM, null, 2) + '\n', 'utf8');
  console.log(`\n  ✓ _kaynak yazıldı — ${CIKARIM.kayitlar.length} kayıt · ${path.basename(ceviriDosya)}\n`);
  process.exit(0);
}
if (CEVIRI_HAM._kaynak) {
  const kayma = CIKARIM.kayitlar.filter((k) => {
    const b = CEVIRI_HAM._kaynak[String(k.no)];
    return b !== undefined && b !== kaynakKisa(k.metin);
  });
  if (kayma.length) {
    console.error(`\n  ✗ ÜRETİM DURDU — NUMARA KAYMASI: ${kayma.length} kayıt çevirisinin yazıldığı metinle eşleşmiyor\n`);
    kayma.slice(0, 8).forEach((k) => {
      console.error(`     ${String(k.no).padStart(3)}. beklenen: "${CEVIRI_HAM._kaynak[String(k.no)]}"`);
      console.error(`          şimdiki: "${kaynakKisa(k.metin)}"`);
    });
    if (kayma.length > 8) console.error(`     … ${kayma.length - 8} kayıt daha`);
    console.error('\n     Çeviri dosyasındaki numaraları düzeltin, sonra --kaynak-yaz ile kilidi tazeleyin.\n');
    process.exit(1);
  }
}

/* ═══ 1. SAYIM KİLİDİ ═══ */
const cevirisiz = C.kayitlar.filter((k) => !k.en || !String(k.en).trim());
if (cevirisiz.length) {
  console.error(`\n  ✗ ÜRETİM DURDU — ${cevirisiz.length}/${C.kayitlar.length} kayıtta "en" alanı boş\n`);
  cevirisiz.slice(0, 10).forEach((k) => console.error(`     ${String(k.no).padStart(3)}. [${k.tur}] ${k.metin.slice(0, 66)}`));
  if (cevirisiz.length > 10) console.error(`     … ${cevirisiz.length - 10} kayıt daha`);
  process.exit(1);
}

/* ═══ 1a. META UZUNLUK KİLİDİ ═══
   ⚠ Denetim title>60 ve description<120 / >165 karakteri P3 olarak yazıyor.
   Bu tuzak ÜÇ KEZ işledi (/en/blog/what-is-a-storyboard/,
   /en/blog/how-long-backlinks-take/, /en/blog/seo-reporting-tools/) ve her
   seferinde sayfa üretildikten SONRA yakalandı — yani çeviri iki kez
   uygulandı. Artık üretimden ÖNCE söylüyoruz. Sert durdurma değil, uyarı:
   Türkçesi zaten uzun olan sayfalar var, kararı çeviren verir. */
{
  const SINIR = { title: [0, 60], 'og:title': [0, 60], 'twitter:title': [0, 60],
                  'meta description': [120, 165], 'og:description': [120, 165],
                  'twitter:description': [120, 165] };
  const uyari = [];
  for (const k of C.kayitlar) {
    if (k.tur !== 'meta') continue;
    const s = SINIR[k.baglam];
    if (!s) continue;
    const n = String(k.en || '').length;
    if (n < s[0]) uyari.push(`${String(k.no).padStart(3)}. ${k.baglam}: ${n} karakter — KISA (alt sınır ${s[0]})`);
    if (n > s[1]) uyari.push(`${String(k.no).padStart(3)}. ${k.baglam}: ${n} karakter — UZUN (üst sınır ${s[1]})`);
  }
  if (uyari.length) {
    console.log(`\n  ⚠ META UZUNLUK — denetim bunları P3 yazacak (${uyari.length}):`);
    uyari.forEach((u) => console.log(`     ${u}`));
  }
}

/* ═══ 1b. ÇAKIŞMA KİLİDİ ═══
   ⚠ ÖLÇÜLMÜŞ BOZULMA (7 Eyl 2026): "Rakamlarla / TasarımMania" başlığında
   İngilizce sözdizimi için sıra çevrilmiş, "TasarımMania" → "in numbers"
   yazılmıştı. O dizge sayfada BİRÇOK yerde geçtiği için global değişim
   altbilgiyi bozdu: "© 2026 in numbers. Tüm hakları saklıdır."
   Kural: aynı Türkçe dizge sayfada birden çok yerde geçiyorsa, ona bağlama
   özel bir çeviri verilemez — çünkü değişim hepsini birden vurur. */
{
  const cakisma = [];
  const gorulen = new Map();
  for (const k of C.kayitlar) {
    if (gorulen.has(k.metin) && gorulen.get(k.metin) !== k.en)
      cakisma.push({ metin: k.metin, a: gorulen.get(k.metin), b: k.en });
    else gorulen.set(k.metin, k.en);
  }
  /* aynı dizge sayfada kaç kez geçiyor — tek geçişliyse bağlama özel çeviri güvenli */
  const cokGecen = C.kayitlar.filter((k) => {
    if (k.metin === k.en) return false;
    const n = h.split(k.metin).length - 1;
    return n > 1 && k.metin.length < 24;      /* kısa ve çok geçen: riskli */
  });
  if (cakisma.length) {
    console.error(`\n  ✗ ÜRETİM DURDU — aynı dizgeye farklı çeviri verilmiş (${cakisma.length})\n`);
    cakisma.forEach((c) => console.error(`     "${c.metin}" → "${c.a}"  ve  "${c.b}"`));
    process.exit(1);
  }
  if (cokGecen.length) {
    console.log(`\n  ⚠ DİKKAT — kısa ve sayfada çok geçen ${cokGecen.length} dizge çevriliyor:`);
    cokGecen.slice(0, 8).forEach((k) => console.log(`     ${h.split(k.metin).length - 1}× "${k.metin}" → "${k.en}"`));
    console.log('     (hepsinin aynı anlama geldiğini doğrulayın — global değişim hepsini vurur)');
  }
}

/* ═══ 1c. BLOK DEĞİŞİMİ (isteğe bağlı) ═══
   Bazı metin dizge dizge değiştirilemez: ana sayfadaki kod editörü widget'ı
   sahte kod yazıyor ve değişken adları ("kampanya", "marka", "ulke") sayfanın
   BAŞKA yerlerinde de düz metin olarak geçiyor — "kampanya" 14 kez, biri
   "kampanya.config.ts" dosya adı. Global değişim bunları bozar.
   Çözüm: bu bloklar bütün olarak, tek seferde değiştirilir.
   ⚠ SAYIM KİLİDİ: her blok sayfada TAM 1 kez geçmeli; 0 ya da 2 ise durur. */
/* ⚠ KELİME SINIRI — ölçülmüş risk: "Menü" dizgesi sitede 10 kez "Menüyü",
   2 kez "Menüler" önekiydi. Çıplak değişim onları "Menuyü"/"Menuler" yapardı.
   Dizge harfle başlıyor/bitiyorsa iki yanına harf gelmemesi şart koşuluyor.
   Kaydın "sayfada var mı" ölçüsü de bu desenle yapılır — aksi hâlde includes
   "var" derken replace hiçbir şey değiştirmez ve kayıt yanlış sınıflanır. */
const kacKac = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const HARF = 'A-Za-zÇĞİÖŞÜçğıöşü';
const sinirli = (s, esnek) => new RegExp(
  (new RegExp(`^[${HARF}]`).test(s) ? `(?<![${HARF}])` : '')
  + (esnek ? s.split(/\s+/).map(kacKac).join('\\s+') : kacKac(s))
  + (new RegExp(`[${HARF}]$`).test(s) ? `(?![${HARF}])` : ''), 'g');
const varMi = (metin) => sinirli(metin, false).test(h) || sinirli(metin, true).test(h);

let blokDegisen = 0;
/* Blok değişiminden ÖNCE sayfada bulunan kayıtlar. Blok bir kaydı içine alıp
   yutarsa, sonraki turda "bulunamayan" görünür — bu YANLIŞ ALARM olur.
   Bastırmak yerine doğruluyoruz: yutulan kaydın İngilizcesi sayfada var mı? */
const blokOncesiVar = new Set(C.kayitlar.filter((k) => varMi(k.metin)).map((k) => k.no));
{
  const blokDosya = path.join(__dirname, `en-blok-${AD}.json`);
  if (fs.existsSync(blokDosya)) {
    const BLOK = JSON.parse(fs.readFileSync(blokDosya, 'utf8')).bloklar || {};
    /* ⚠ SATIR SONU DOSYADAN DOSYAYA DEĞİŞİYOR — ölçüldü: /iletisim/ CRLF,
       /teklif/ LF. Blok anahtarını tek bir biçimde yazmak, öteki dosyada
       "0 kez geçiyor" demek. Eşleşme satır sonundan bağımsız yapılıyor:
       anahtardaki her satır sonu \r?\n olarak aranıyor, karşılık ise
       DOSYANIN KENDİ satır sonuyla yazılıyor. */
    const dosyaSS = h.includes('\r\n') ? '\r\n' : '\n';
    const blokDeseni = (s) => new RegExp(s.split(/\r?\n/).map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\r?\\n'), 'g');
    const hata = [];
    for (const tr of Object.keys(BLOK)) {
      const n = (h.match(blokDeseni(tr)) || []).length;
      if (n !== 1) hata.push({ tr, n });
    }
    if (hata.length) {
      console.error(`\n  ✗ ÜRETİM DURDU — ${hata.length} blok tam 1 kez geçmiyor\n`);
      hata.forEach((x) => console.error(`     ${x.n} kez: "${x.tr.slice(0, 72)}…"`));
      process.exit(1);
    }
    for (const [tr, en] of Object.entries(BLOK)) {
      h = h.replace(blokDeseni(tr), () => en.split(/\r?\n/).join(dosyaSS));
      blokDegisen++;
    }
  }
}
/* Bloğun gerçekten yuttuğu kayıtlar: önce vardı, blok sonrası yok. */
const blokYuttuSet = new Set(C.kayitlar.filter((k) => blokOncesiVar.has(k.no) && !varMi(k.metin)).map((k) => k.no));
/* Kayıt döngüsü başlarken sayfada bulunanlar — döngü içinde uzun bir kaydın
   kısa bir kaydı örtmesi NORMAL; onu "bulunamadı" saymak yanlış alarm olur. */
const donguBasiVar = new Set(C.kayitlar.filter((k) => varMi(k.metin)).map((k) => k.no));

/* ═══ 2. METİN DEĞİŞTİRME — uzundan kısaya ═══ */
/* ⚠ TEK SIRA — ölçülmüş bozulma (7 Eyl 2026, /hakkimizda/): kayıtlar ve kabuk
   sözlüğü AYRI turlarda uygulanıyordu. Her tur kendi içinde uzundan kısaya
   sıralıydı ama turlar arasında böyle bir garanti yoktu. Kayıt 38
   ("tek çatı altında") kabuktaki uzun altbilgi cümlesinin içinde geçiyor ve
   önce çalıştığı için onu parçaladı:
     "Web, mobil, reklam, video ve SEO’yu under one roof birleştiren Istanbul…"
   Çözüm: iki sözlük TEK listede toplanıp birlikte sıralanıyor. */
const KABUK = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-kabuk-ceviri.json'), 'utf8')).ceviri;
const sirali = [
  ...C.kayitlar.map((k) => ({ tip: 'kayit', metin: k.metin, k })),
  ...Object.entries(KABUK).map(([tr, en]) => ({ tip: 'kabuk', metin: tr, en })),
].sort((a, b) => b.metin.length - a.metin.length);
let degisen = 0, esnekEslesen = 0, kacisliEslesen = 0, blokYuttu = 0, ortusen = 0;
const bulunamayan = []; const blokEksik = [];
/* ⚠ DEĞİŞTİRME İŞLEVLE: İngilizce metinde "$&" ya da "$1" geçerse replace
   onu desen sanıp bozar; işlev biçimi bu yorumlamayı tamamen kapatır.
   ⚠ SCRIPT KAYDI TIRNAĞIYLA DEĞİŞİR: JS dizgesinin İÇİNE düz yazmak, çeviride
   kesme işareti varsa ("we've") dizgeyi erken kapatıp bloğu öldürür. Ölçüldü:
   ana sayfanın tüm widget'ları sessizce durdu, konsolda iz bırakmadan.
   Bu yüzden script kayıtları 'tırnak + ham + tırnak' bütünü olarak değişir ve
   çeviri içindeki tırnak kaçırılır. Girinti ham'dan aynen taşınır. */
/* ═══ YOL ÖZNİTELİKLERİNİ MASKELE ═══
   ⚠ ÖLÇÜLMÜŞ BOZULMA (/hakkimizda/): kayıt 40 ("marka" → "worked with") bir
   dosya adının içine girdi: assets/logo/marka-yatay-optik.png →
   "logo/worked with-yatay-optik.png". Kelime sınırı koruması yetmedi çünkü
   "marka" iki yanında "/" ve "-" ile duruyordu — ikisi de harf değil.
   href/src/srcset ve url(...) çeviriye KAPALI: içlerinde çevrilecek insan
   metni yok, yollar zaten 5. adımda yeniden hesaplanıyor. */
const yolKasa = [];
const YER = (i) => `@@YOL${i}@@`;
h = h.replace(/(\s(?:href|src|srcset)=")([^"]*)(")/g, (t, a, v, b) => {
  yolKasa.push(v); return a + YER(yolKasa.length - 1) + b;
}).replace(/url\((['"]?)([^)]*?)\1\)/g, (t, q, v) => {
  yolKasa.push(v); return `url(${q}${YER(yolKasa.length - 1)}${q})`;
});

let kabukDegisen = 0; const kabukBulunmayan = [];
for (const g of sirali) {
  /* --- kabuk girdisi: menü/altbilgi, 79 sayfada ortak --- */
  if (g.tip === 'kabuk') {
    const d = sinirli(g.metin, false);
    if (d.test(h)) { d.lastIndex = 0; h = h.replace(d, () => g.en); kabukDegisen++; continue; }
    /* ⚠ BOŞLUK-ESNEK YEDEK — ölçülmüş hata (/hakkimizda/): altbilgi cümlesi
       kaynakta iki satıra bölünmüş ve satır sonu CRLF. Sözlükteki tek satırlı
       (ve \n'li) biçim birebir eşleşmiyordu; cümle çevrilmeden kaldı ve içindeki
       "tek çatı altında" parçası ayrı bir kayıtla değişip cümleyi yarı Türkçe
       yarı İngilizce bıraktı. Kayıtlarda bu yedek zaten vardı, kabukta yoktu. */
    const esnekK = sinirli(g.metin, true);
    if (esnekK.test(h)) { esnekK.lastIndex = 0; h = h.replace(esnekK, () => g.en); kabukDegisen++; esnekEslesen++; continue; }
    kabukBulunmayan.push(g.metin);
    continue;
  }
  const k = g.k;
  if (k.tur === 'script' && k.tirnak) {
    const on = k.ham.match(/^\s*/)[0], arka = k.ham.match(/\s*$/)[0];
    const aranan = k.tirnak + k.ham + k.tirnak;
    const yeni = k.tirnak + on + jsKacir(k.en, k.tirnak) + arka + k.tirnak;
    if (h.includes(aranan)) { h = h.split(aranan).join(yeni); degisen++; continue; }
    /* tırnaklı bütün bulunamadı → blok değişimi yutmuş olabilir; aşağı düşsün */
  }
  const d = sinirli(k.metin, false);
  if (d.test(h)) { d.lastIndex = 0; h = h.replace(d, () => k.en); degisen++; continue; }
  /* ⚠ ÇOK SATIRLI DİZGE: çıkarıcı boşlukları tek boşluğa indiriyor, kaynakta
     ise satır sonu + girinti var. Birebir arama bunları kaçırır (ölçüldü:
     2 uzun paragraf). Boşluk-esnek desenle ikinci bir deneme yapılıyor. */
  const esnek = sinirli(k.metin, true);
  if (esnek.test(h)) { esnek.lastIndex = 0; h = h.replace(esnek, () => k.en); degisen++; esnekEslesen++; continue; }
  /* ⚠ JSON-LD TIRNAK KAÇIŞI: aynı metin hem şemada hem gövdede geçiyorsa,
     şemadaki kopya JSON dizgesi olduğu için çift tırnakları \" biçiminde
     kaçışlıdır; gövdedeki kopya kaçışsızdır. Çıkarıcı ikisini de kaçışsız
     verdiği için şema kopyası eşleşmiyordu — ölçüldü: /blog/yerel-seo/,
     içinde "yakınımda" geçen SSS yanıtı. Kaçışlı biçimle ikinci deneme. */
  if (k.metin.includes('"')) {
    const kacisli = sinirli(k.metin.split('"').join('\\"'), false);
    if (kacisli.test(h)) {
      kacisli.lastIndex = 0;
      h = h.replace(kacisli, () => k.en.split('"').join('\\"'));
      degisen++; kacisliEslesen++; continue;
    }
  }
  /* 1) Bloğun yuttuğu kayıt — İngilizcesi sayfada olmak ZORUNDA. */
  if (blokYuttuSet.has(k.no)) {
    if (h.includes(k.en)) { blokYuttu++; continue; }
    blokEksik.push(k);
    continue;
  }
  /* 2) Döngü başında vardı, şimdi yok → daha uzun bir kaydın içinde kalıp
     onunla birlikte çevrildi. Uzundan kısaya sıranın doğal sonucu. */
  if (donguBasiVar.has(k.no)) { ortusen++; continue; }
  /* 3) Hiç yoktu → çıkarımdan sonra sayfa değişmiş. Gerçek sorun. */
  bulunamayan.push(k);
}
/* maskeyi kaldır — bundan sonrası yolları gerçekten hesaplayacak */
{
  const kalanMaske = (h.match(/@@YOL\d+@@/g) || []).length;
  h = h.replace(/@@YOL(\d+)@@/g, (t, i) => yolKasa[+i]);
  const sonra = (h.match(/@@YOL\d+@@/g) || []).length;
  if (kalanMaske !== yolKasa.length || sonra) {
    console.error(`\n  ✗ ÜRETİM DURDU — yol maskesi bozuldu: ${yolKasa.length} maskelendi, ${kalanMaske} bulundu, ${sonra} geri kaldı`);
    console.error('     Bir çeviri maskenin içine yazmış olabilir.\n');
    process.exit(1);
  }
}

if (blokEksik.length) {
  console.error(`\n  ✗ ÜRETİM DURDU — blok ${blokEksik.length} kaydı yuttu, İngilizcesi sayfada yok\n`);
  blokEksik.forEach((k) => console.error(`     ${String(k.no).padStart(3)}. "${k.metin.slice(0, 44)}" → "${String(k.en).slice(0, 44)}"`));
  process.exit(1);
}
/* Kabuk (menü/altbilgi) artık yukarıdaki TEK sırada işleniyor — ayrı tur yok. */

/* ═══ 3. DİL VE ADRES YERELLEŞTİRME ═══ */
h = h.replace(/<html lang="tr"/, '<html lang="en"')
  .replace(/<meta property="og:locale" content="tr_TR">/, '<meta property="og:locale" content="en">');

/* Bu sayfaya ait mutlak adresler (canonical, og:url, şema @id/url/item).
   ⚠ ANA SAYFA TUZAĞI — ölçülmüş hata: TR_YOL "/" olduğunda düz önek
   değiştirme SİTEDEKİ HER mutlak adresi vurur; canonical iki kez işlenip
   ".../en/en/" oldu. Ana sayfada adres ancak tırnakla BİTİYORSA eşleşir. */
{
  const k = KANONIK.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const desen = TR_YOL === '/'
    ? new RegExp(`${k}/(?=["'\\s])`, 'g')                 /* tam ana sayfa adresi */
    : new RegExp(`${k}${TR_YOL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
  h = h.replace(desen, KANONIK + EN_YOL);
}
/* şema dili */
h = h.replace(/"inLanguage":\s*"tr-TR"/g, '"inLanguage": "en"');

/* ═══ 4. hreflang çifti ═══ */
const hreflang = `<link rel="alternate" hreflang="tr" href="${KANONIK}${TR_YOL}">\n`
  + `<link rel="alternate" hreflang="en" href="${KANONIK}${EN_YOL}">\n`
  + `<link rel="alternate" hreflang="x-default" href="${KANONIK}${TR_YOL}">`;
h = h.replace(/\n?<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '');
const capa = h.match(/<link rel="canonical"[^>]*>/);
if (capa) h = h.replace(capa[0], capa[0] + '\n' + hreflang);

/* ═══ 5. GÖRELİ YOLLAR — yeni derinlikten yeniden ═══ */
const eskiDizin = path.dirname(trDosya);
const yeniDizin = path.join(S, EN_YOL.replace(/^\//, '').replace(/\/$/, ''));
let yolSayisi = 0;
const cevir = (ham) => {
  if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(ham)) return ham;
  const [g, ek] = [ham.replace(/[#?].*$/, ''), (ham.match(/[#?].*$/) || [''])[0]];
  if (!g) return ham;
  let r = path.relative(yeniDizin, path.resolve(eskiDizin, g)).split(path.sep).join('/');
  if (!r.startsWith('.')) r = './' + r;
  if (g.endsWith('/') && !r.endsWith('/')) r += '/';
  yolSayisi++;
  return r + ek;
};
h = h.replace(/(\s(?:href|src)=")([^"]+)(")/g, (t, a, v, b) => a + cevir(v) + b)
  .replace(/(\ssrcset=")([^"]+)(")/g, (t, a, v, b) => a + v.split(',').map((p) => {
    const [yolu, ...kalan] = p.trim().split(/\s+/); return [cevir(yolu), ...kalan].join(' ');
  }).join(', ') + b);

/* ═══ 6. SÖZDİZİMİ KİLİDİ ═══
   ⚠ Çeviri JS ve JSON'un içine de giriyor. Bozuk bir dizge sayfayı çökertmez,
   SESSİZCE öldürür: widget'lar hiç çalışmaz, konsolda iz kalmaz. Ana sayfada
   böyle oldu; ancak TR sayfayla karşılaştırınca görüldü (5 satır → 0 satır).
   Artık bozuk sayfa diske YAZILAMAZ. */
{
  const sozHata = [];
  let i = 0;
  for (const m of h.matchAll(/<script(?![^>]*(?:application\/ld\+json|src=))[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (!m[1].trim()) continue;
    i++;
    try { new vm.Script(m[1], { filename: `blok${i}` }); }
    catch (e) { sozHata.push(`JS blok ${i}: ${e.message}`); }
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1]); } catch (e) { sozHata.push(`ld+json: ${e.message}`); }
  }
  if (sozHata.length) {
    console.error(`\n  ✗ ÜRETİM DURDU — çeviri sözdizimini bozdu (${sozHata.length})\n`);
    sozHata.forEach((x) => console.error(`     ${x}`));
    console.error('\n     Neden: çeviri bir JS dizgesinin içine yazıldı ve tırnağı kapattı.');
    console.error('     Çözüm: kaydın "tirnak" alanı dolu mu bakın (çıkarımı yenileyin).\n');
    process.exit(1);
  }
}

/* ═══ RAPOR ═══ */
console.log(`\n  ${UYGULA ? 'ÜRETİLDİ' : 'KURU KOŞU'} — ${TR_YOL} → ${EN_YOL}\n`);
console.log(`  çeviri kaydı        : ${C.kayitlar.length}`);
console.log(`  değiştirilen dizge  : ${degisen}`);
if (blokDegisen) console.log(`  değiştirilen blok   : ${blokDegisen} (${blokYuttu} kaydı kapsadı, karşılıkları doğrulandı)`);
if (ortusen) console.log(`  uzun kayıtla örtüşen: ${ortusen} (kısa kayıt, uzun olanın içinde çevrildi)`);
console.log(`  TOPLAM hesap        : ${degisen} + ${blokYuttu} + ${ortusen} + ${bulunamayan.length} = ${degisen + blokYuttu + ortusen + bulunamayan.length} / ${C.kayitlar.length}`);
console.log(`  kabuk dizgesi       : ${kabukDegisen}`);
console.log(`  yeniden yazılan yol : ${yolSayisi}`);
console.log(`  boyut               : ${(h.length / 1024).toFixed(1)} KB`);
if (bulunamayan.length) {
  console.log(`\n  ⚠ SAYFADA BULUNAMAYAN ${bulunamayan.length} dizge (çıkarımdan sonra sayfa değişmiş olabilir):`);
  bulunamayan.slice(0, 8).forEach((k) => console.log(`     ${String(k.no).padStart(3)}. ${k.metin.slice(0, 66)}`));
}
/* ═══ KALAN TÜRKÇE — nerede, hangi bağlamda ═══
   Yalnız sayı vermek yetmez; hangi dizgenin çevrilmediğini göstermeli. */
/* Çevrilmeyecekler: marka, kişi adları (müşteri ve kurucu), adres, ülke,
   alan adı ve kod dizgeleri. Bunlarda Türkçe karakter kalması DOĞRU. */
/* Sayfaya özel muafiyetler çeviri dosyasındaki "_muaf" dizisinden gelir —
   yer/istasyon adı gibi çevrilmemesi DOĞRU olan özel adlar. Üreticiye gömmek
   yerine sayfanın yanında durması, kararın gerekçesiyle birlikte kalmasını
   sağlıyor (örn. /iletisim/ → "Özgürlük Meydanı" metro istasyonu). */
const MUAF_LISTE = (CEVIRI_HAM._muaf || []).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const MUAF_TR = new RegExp('TasarımMania|İhsan Ar|Murat Aydın|Selin Erdoğan|Emre Kılıç|Zeytinlik'
  + '|Bakırköy|İstanbul|Türkiye|tasarimmania|kampanya\\.config'
  + (MUAF_LISTE.length ? '|' + MUAF_LISTE.join('|') : ''));
const kalan = new Map();
/* ⚠ SCRIPT/STYLE MASKELENİR — ölçülmüş yanlış pozitif (/blog/): bir JS
   yorumu içinde "<li>" geçiyordu ve ">…<" deseni yorumun Türkçesini
   "çevrilmemiş metin" sandı. Script içindeki gerçek görünür metin zaten
   aşağıda ayrıca taranıyor (gorunurDizgeler yorumları eliyor). */
const hMetin = h.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, (m) => ' '.repeat(m.length));
for (const m of hMetin.matchAll(/>([^<>{}]*[çğıöşüÇĞİÖŞÜ][^<>{}]*)</g)) {
  const t = m[1].replace(/\s+/g, ' ').trim();
  if (!t || MUAF_TR.test(t)) continue;
  kalan.set(t, (kalan.get(t) || 0) + 1);
}
/* ⚠ SCRIPT İÇİ DE SAYILIR — yukarıdaki desen yalnız ">metin<" düğümlerine
   bakıyor; ekrana JS ile basılan Türkçe veriyi görmüyordu ve ana sayfada 5
   dizge bu yüzden sessizce Türkçe kaldı (tarayıcıda yakalandı). */
for (const blok of scriptBloklari(h))
  for (const d of gorunurDizgeler(blok.kod)) {
    if (MUAF_TR.test(d) || !/[çğıöşüÇĞİÖŞÜ]/.test(d)) continue;
    kalan.set('[js] ' + d, (kalan.get('[js] ' + d) || 0) + 1);
  }
/* ⚠ ÖZNİTELİK DE SAYILIR — aynı körlüğün üçüncü hâli. alt/aria-label/title/
   placeholder ekran okuyucuya ve araca giden metindir; ">metin<" deseni
   bunları hiç görmüyordu. Meta ve şema alanları da buraya dahil. */
for (const [oz, re] of [['alt', /\salt="([^"]+)"/g], ['aria-label', /\saria-label="([^"]+)"/g],
  ['title', /\stitle="([^"]+)"/g], ['placeholder', /\splaceholder="([^"]+)"/g],
  ['content', /\scontent="([^"]+)"/g], ['şema', /"(?:name|headline|description|text|articleSection|jobTitle)":\s*"([^"]+)"/g]]) {
  for (const m of h.matchAll(re)) {
    const t = m[1].replace(/\s+/g, ' ').trim();
    if (!t || MUAF_TR.test(t) || !/[çğıöşüÇĞİÖŞÜ]/.test(t)) continue;
    kalan.set(`[${oz}] ` + t, (kalan.get(`[${oz}] ` + t) || 0) + 1);
  }
}
/* ⚠ SAYIYI AYRIŞTIR — ham "kalan Türkçe karakter" sayısı yanıltıcıydı:
   /web-tasarim/ 864 gösterdi ve hepsi HTML/CSS/JS YORUMLARINDAN geliyordu
   ("katman infografiği", "sayfanın KENDİ iddiası"…). Yorumlar geliştiriciye
   aittir, ekranda görünmez, bilinçli olarak Türkçe kalır. Yorumları ayırmadan
   verilen sayı her sayfada elle araştırma gerektiriyordu. */
const yorumsuz = h.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const trHarf = (h.match(/[çğıöşüÇĞİÖŞÜ]/g) || []).length;
const trHarfYorumsuz = (yorumsuz.match(/[çğıöşüÇĞİÖŞÜ]/g) || []).length;
console.log(`\n  kalan Türkçe karakter : ${trHarfYorumsuz} (marka/adres/kişi adı dahil)`
  + `  ·  yorumlarda ayrıca ${trHarf - trHarfYorumsuz}`);
console.log(`  çevrilmemiş dizge     : ${kalan.size}`);
if (kalan.size) [...kalan.entries()].slice(0, 12)
  .forEach(([t, n]) => console.log(`     ✗ ${n}× "${t.slice(0, 70)}"`));
if (esnekEslesen) console.log(`\n  boşluk-esnek eşleşen  : ${esnekEslesen} (çok satırlı dizge)`);
if (kacisliEslesen) console.log(`  JSON kaçışlı eşleşen  : ${kacisliEslesen} (şemadaki tırnak kaçışlı kopya)`);

if (UYGULA) {
  fs.mkdirSync(yeniDizin, { recursive: true });
  fs.writeFileSync(path.join(yeniDizin, 'index.html'), h, 'utf8');
  console.log(`\n  yazıldı: site${EN_YOL}index.html\n`);
} else console.log('\n  Uygulamak için: --uygula\n');
