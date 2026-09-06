/* SCRIPT DİZGESİ SÜZGECİ — tek kaynak.
 *
 * en-metin-cikar.js (çıkarım), en-script-metin.js (tarama) ve
 * en-sayfa-uret.js (kalan Türkçe raporu) AYNI kuralı kullanır. Ayrı ayrı
 * yazılsaydı zamanla ayrışır, bir betiğin gördüğünü öteki görmezdi.
 *
 * Ayrım: script içindeki dizge sabiti EKRANDA GÖRÜNÜYOR mu, yoksa KOD mu?
 *   görünür → 'Daha fazla', 'kurumsal web tasarım istanbul'   → çevrilir
 *   kod     → 'use strict', 'var(--cy)', '#seoList'           → çevrilmez
 */

/* Kod kalıpları — bunlar asla insan metni değildir. */
const KOD = [
  /^[#.]?[a-zA-Z][\w-]*$/,                   /* seçici / sınıf / id / değişken */
  /^[#.][\w-]+([\s>,][#.]?[\w-]+)*$/,        /* birleşik seçici */
  /^[a-z]+([A-Z][a-z]+)*$/,                  /* camelCase */
  /^\d+(\.\d+)?(px|%|s|ms|em|rem|vh|vw|deg)?$/,
  /^#[0-9a-fA-F]{3,8}$/,                     /* renk */
  /^[\/.][\w\/.-]*$/,                        /* yol */
  /^https?:\/\//,
  /^[a-z-]+$/,                               /* olay/CSS adı: click, transform, ease-out */
  /^[\s\S]{0,2}$/,                           /* bir-iki karakter */
  /^[<>{}[\]()\s;:,.'"+*=|&!?%$@^~`\\/-]+$/, /* yalnız simge */
  /^(true|false|null|undefined)$/,
  /^var\(--[\w-]+\)$/,                       /* CSS özel değişkeni */
  /^[a-z-]+\(/,                              /* işlev/CSS çağrısı: rgba( calc( var( translate( */
];

/* AÇIK MUAFİYET — kalıba uymayan ama kod olan dizgeler.
   Her birinin GEREKÇESİ yazılı; gerekçesiz satır eklenmez. */
const MUAF = new Map([
  ['use strict', 'JS yönergesi — dile ait, ekranda görünmez'],
  ['sah-msj onlar sah-yaziyor', 'CSS sınıf listesi (className ataması), metin değil'],
  ['var(--amber)', 'CSS özel değişkeni'],
  ['var(--cy)', 'CSS özel değişkeni'],
  ['var(--lime)', 'CSS özel değişkeni'],
  ['var(--muted)', 'CSS özel değişkeni'],
  ['var(--pink)', 'CSS özel değişkeni'],
  ['var(--vi)', 'CSS özel değişkeni'],
]);

const TR_HARF = /[ıİşŞğĞçÇöÖüÜâîû]/;
const TR_KELIME = /\b(ve|ile|için|bir|bu|da|de|olan|olarak|var|yok|tüm|her|daha|en|gibi|kadar|sonra|önce)\b/i;

function insanMetni(ham) {
  const d = String(ham).trim();
  if (d.length < 3) return false;
  if (MUAF.has(d)) return false;
  if (KOD.some((r) => r.test(d))) return false;
  if (TR_HARF.test(d)) return true;
  if (TR_KELIME.test(d)) return true;
  if (!/[a-zçğıöşü]{3}/.test(d)) return false;
  /* boşluklu, harfle başlayan, en az iki kelime → muhtemel cümle */
  if (/^[A-ZÇĞİÖŞÜa-zçğıöşü].*\s\S/.test(d)) return true;
  /* ⚠ TEK KELİMELİK CÜMLE PARÇASI — ölçülmüş kaçak: WhatsApp mesaj
     kurucusundaki 'Merhaba,' boşluksuz ve şapkasız olduğu için "kod" sayıldı
     ve İngilizce sayfada Türkçe kalacaktı. Değişken adında bulunmayan
     noktalama (virgül, iki nokta, soru/ünlem, sonda nokta) varsa insan metni. */
  return /^[A-ZÇĞİÖŞÜa-zçğıöşü][^\s]*[,;:!?]$|^[A-ZÇĞİÖŞÜa-zçğıöşü][^\s]*\.$/.test(d);
}

/* Bir HTML metnindeki ld+json DIŞI script bloklarını verir. */
function scriptBloklari(h) {
  const o = [];
  for (const m of h.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/gi))
    if (m[1].trim()) o.push({ kod: m[1], bas: m.index });
  return o;
}

/* Bir script gövdesindeki görünür dizgeleri AYRINTILI verir:
     ham    → tırnakların arasındaki metin, KIRPILMAMIŞ (girinti korunur)
     tirnak → dizgeyi sınırlayan karakter (' ya da ")
     metin  → kırpılmış hâli (çeviri kaydına giren)
   ⚠ Tırnağı bilmek ZORUNLU: İngilizce çeviri tek tırnaklı bir dizgenin içine
     yazılıyorsa "we've" kesme işareti dizgeyi erken kapatır ve blok sözdizimi
     hatası verir. Ölçüldü — ana sayfanın tüm widget'ları sessizce öldü. */
/* ⚠ YORUMLAR HARİÇ — ölçülmüş gürültü: /iletisim/ betiğindeki bir açıklama
   satırı ("yurt dışından bakan biri \"kapalı\"yı yanlış görürdü") çeviri
   kaydı olarak çıktı. Yorum geliştiriciye aittir, ekranda görünmez; çevirmek
   kodu yarı Türkçe yarı İngilizce bırakır. Düz regex yorumu ayırt edemediği
   için kod küçük bir çözümleyiciyle taranıyor: dizge / yorum / düzenli ifade
   durumları izleniyor, böylece "https://…" içindeki // de yorum sanılmıyor. */
function gorunurDizgelerAyrintili(kod) {
  const o = [];
  const n = kod.length;
  let i = 0, oncekiAnlamli = '';
  while (i < n) {
    const c = kod[i], c2 = kod[i + 1];
    /* yorumlar */
    if (c === '/' && c2 === '/') { while (i < n && kod[i] !== '\n') i++; continue; }
    if (c === '/' && c2 === '*') { i += 2; while (i < n && !(kod[i] === '*' && kod[i + 1] === '/')) i++; i += 2; continue; }
    /* düzenli ifade sabiti: yalnız bir işlecin ardından gelebilir */
    if (c === '/' && /[(,=:[!&|?{};+\-*%~^]/.test(oncekiAnlamli)) {
      i++;
      while (i < n && kod[i] !== '/' && kod[i] !== '\n') { if (kod[i] === '\\') i++; if (kod[i] === '[') { while (i < n && kod[i] !== ']') { if (kod[i] === '\\') i++; i++; } } i++; }
      i++; continue;
    }
    /* dizge sabitleri */
    if (c === "'" || c === '"' || c === '`') {
      const tirnak = c; const bas = ++i;
      while (i < n && kod[i] !== tirnak) { if (kod[i] === '\\') i++; i++; }
      const ham = kod.slice(bas, i);
      i++;
      if (tirnak !== '`') {                     /* şablon dizgesi çevrilmiyor: ${} taşıyabilir */
        const metin = ham.trim();
        if (insanMetni(metin)) o.push({ ham, tirnak, metin });
      }
      oncekiAnlamli = tirnak; continue;
    }
    if (!/\s/.test(c)) oncekiAnlamli = c;
    i++;
  }
  return o;
}
function gorunurDizgeler(kod) { return gorunurDizgelerAyrintili(kod).map((x) => x.metin); }

/* Bir metni JS dizge sabitine güvenle yazılabilir hâle getirir. */
function jsKacir(s, tirnak) {
  return String(s).split('\\').join('\\\\').split(tirnak).join('\\' + tirnak);
}

module.exports = { insanMetni, scriptBloklari, gorunurDizgeler, gorunurDizgelerAyrintili, jsKacir, MUAF, KOD };
