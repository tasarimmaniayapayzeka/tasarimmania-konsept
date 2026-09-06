/* Modül 30 — Information Gain (bilgi kazanımı) ÖLÇÜMÜ.
 *
 * ⚠ NEDEN BU BETİK VAR: denetim aracı bu modülü "ÖLÇÜLEMEDİ — rakip
 *   karşılaştırması gerekir; bu betiğin kapsamı dışında" diye geçiyordu.
 *   Oysa 46 rakibin HAM HTML'i bu deponun içinde duruyor (rakip-analiz/raw/).
 *   Gereken veri elimizdeydi; "kapsam dışı" ölçmemenin kılıfıydı.
 *
 * BİLGİ KAZANIMI NEDİR: aynı sorguya cevap veren sayfalar arasında, bizim
 * sayfamızın rakiplerde BULUNMAYAN ne sunduğu. Burada niyet okuma yok;
 * ölçülebilir cevap-katmanı özellikleri iki tarafta da aynı yöntemle sayılıyor.
 *
 * ⚠ KARŞILAŞTIRMANIN SINIRI AÇIKÇA YAZILIYOR: rakip tarafında her siteden
 *   yalnız ANA SAYFA arşivlenmiş (46 dosya). Bizim tarafta hizmet ve blog
 *   sayfaları da var. Bu yüzden "rakipte yok" demek "rakip sitesinin hiçbir
 *   yerinde yok" demek DEĞİL; "ana sayfasında yok" demek. Rapor bunu yazıyor.
 *
 * Kullanım: node plan/bilgi-kazanimi.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const RAW = path.join(KOK, 'rakip-analiz/raw');

/* ---- iki tarafta da AYNI şekilde ölçülen özellikler ---- */
const OZELLIKLER = [
  ['FAQPage şeması', (h) => /"FAQPage"/.test(h)],
  ['Görünür SSS bloğu', (h) => /<details|class="[^"]*(faq|sss)/i.test(h)],
  ['Soru biçimli H2', (h) => /<h2[^>]*>[^<]*\?/.test(h)],
  ['Karşılaştırma tablosu', (h) => /<table/i.test(h)],
  ['Tanım listesi (dl)', (h) => /<dl[\s>]/i.test(h)],
  ['Fiyat/bütçe bandı', (h) => /(₺|TL\b)[^<]{0,40}\d|\d[^<]{0,20}(₺|\bTL\b)|fiyat aral|bütçe band/i.test(h)],
  ['Süre/takvim taahhüdü', (h) => /\d+\s*[-–]\s*\d+\s*(iş günü|hafta|ay)\b/i.test(h)],
  ['"Ne dahil / ne değil"', (h) => /ne dahil|dahil değil|kapsam dışı/i.test(h)],
  ['Adımlı süreç anlatımı', (h) => /(0?1\s*[.·)]\s*\w[^<]{0,40}).{0,3000}?(0?3\s*[.·)]\s*\w)/is.test(h)],
  ['Yazar/kişi entity (Person)', (h) => /"Person"/.test(h)],
  ['Kuruluş şeması', (h) => /"(Organization|ProfessionalService|LocalBusiness)"/.test(h)],
  ['Kırıntı gezinme şeması', (h) => /"BreadcrumbList"/.test(h)],
  ['Güncelleme tarihi (şema)', (h) => /"dateModified"/.test(h)],
  ['Açık adres (PostalAddress)', (h) => /"PostalAddress"/.test(h)],
  ['WhatsApp bağlantısı', (h) => /wa\.me\/|api\.whatsapp/i.test(h)],
  ['Tıklanır telefon', (h) => /href="tel:/i.test(h)],
  ['Dış kaynak referansı', (h) => /<a[^>]+href="https?:\/\/(?!(www\.)?(tasarimmania|facebook|instagram|twitter|linkedin|youtube|wa\.me|api\.whatsapp|fonts\.g|google))/i.test(h)],
  ['llms.txt / AI keşif', () => fs.existsSync(path.join(S, 'llms.txt'))],
];

const metin = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const kelime = (h) => metin(h).split(' ').filter((w) => w.length > 1).length;

/* ---- rakipler ---- */
const rakipDosyalar = fs.readdirSync(RAW).filter((f) => f.endsWith('.html'));
const rakip = rakipDosyalar.map((f) => ({
  ad: f.replace(/^\d+-/, '').replace(/\.html$/, ''),
  h: fs.readFileSync(path.join(RAW, f), 'utf8'),
}));

/* ---- biz: rakiple aynı düzlemde olması için ANA SAYFA + tür temsilcileri ---- */
const BIZ = {
  'ana sayfa': path.join(S, 'index.html'),
  'hizmet hub': path.join(S, 'hizmetler/seo/index.html'),
  'hizmet ayrıntı': path.join(S, 'hizmetler/seo/teknik-seo/index.html'),
  'blog yazısı': path.join(S, 'blog/storyboard-nedir/index.html'),
};
const biz = Object.fromEntries(Object.entries(BIZ).map(([k, f]) => [k, fs.readFileSync(f, 'utf8')]));

console.log(`\n  BİLGİ KAZANIMI — ${rakip.length} rakip ana sayfası vs. TasarımMania\n`);
console.log('  ⚠ Rakip tarafında yalnız ANA SAYFA arşivlenmiş. "Rakipte yok" =');
console.log('    "rakip ana sayfasında yok"; iç sayfalarında olabilir.\n');
console.log('  ' + 'ÖZELLİK'.padEnd(28) + 'RAKİP'.padStart(9) + '   BİZ (ana/hub/ayrıntı/blog)');
console.log('  ' + '─'.repeat(74));

const kazanim = [], acik = [];
for (const [ad, test] of OZELLIKLER) {
  const rn = rakip.filter((r) => { try { return test(r.h); } catch { return false; } }).length;
  const oran = Math.round((rn / rakip.length) * 100);
  const bizim = Object.entries(biz).map(([, h]) => { try { return test(h) ? '●' : '○'; } catch { return '○'; } });
  const bizVar = bizim.some((x) => x === '●');
  console.log(`  ${ad.padEnd(28)}${String(rn + '/' + rakip.length).padStart(9)}  %${String(oran).padStart(3)}   ${bizim.join(' ')}`);
  if (bizVar && oran <= 25) kazanim.push([ad, oran, rn]);
  if (!bizVar && oran >= 50) acik.push([ad, oran, rn]);
}

/* ---- içerik derinliği ---- */
const rkKelime = rakip.map((r) => kelime(r.h)).sort((a, b) => a - b);
const ortanca = rkKelime[Math.floor(rkKelime.length / 2)];
console.log('\n  ── içerik derinliği (ana sayfa metni, kelime) ──');
console.log(`  rakip ortanca ${ortanca}  ·  en yüksek ${rkKelime.at(-1)}  ·  en düşük ${rkKelime[0]}`);
console.log(`  TasarımMania ana sayfa ${kelime(biz['ana sayfa'])}  ·  hizmet ayrıntı ${kelime(biz['hizmet ayrıntı'])}  ·  blog ${kelime(biz['blog yazısı'])}`);

/* ---- şema derinliği ---- */
const semaTur = (h) => {
  const o = new Set();
  const gez = (n) => {
    if (Array.isArray(n)) return n.forEach(gez);
    if (!n || typeof n !== 'object') return;
    if (n['@type']) [n['@type']].flat().forEach((t) => o.add(t));
    Object.values(n).forEach(gez);
  };
  for (const m of h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) { try { gez(JSON.parse(m[1])); } catch { } }
  return o;
};
const rkSema = rakip.map((r) => semaTur(r.h).size).sort((a, b) => a - b);
console.log('\n  ── şema derinliği (benzersiz @type sayısı) ──');
console.log(`  rakip ortanca ${rkSema[Math.floor(rkSema.length / 2)]}  ·  en yüksek ${rkSema.at(-1)}  ·  şeması hiç olmayan ${rkSema.filter((x) => !x).length}/${rakip.length}`);
console.log(`  TasarımMania ${[...semaTur(biz['blog yazısı'])].length} (blog) · ${[...semaTur(biz['hizmet ayrıntı'])].length} (hizmet ayrıntı)`);

console.log('\n  ═══ BİLGİ KAZANIMI (bizde var, rakiplerin ≤%25\'inde var) ═══');
kazanim.length
  ? kazanim.sort((a, b) => a[1] - b[1]).forEach(([a, o, n]) => console.log(`    + ${a.padEnd(28)} rakipte ${n}/${rakip.length} (%${o})`))
  : console.log('    — yok');

console.log('\n  ═══ AÇIK (rakiplerin ≥%50\'sinde var, bizde yok) ═══');
acik.length
  ? acik.sort((a, b) => b[1] - a[1]).forEach(([a, o, n]) => console.log(`    ✗ ${a.padEnd(28)} rakipte ${n}/${rakip.length} (%${o})`))
  : console.log('    — yok');

/* Sonuç dosyaya yazılır; geo-denetim.js modül 30'u buradan okuyor. */
fs.writeFileSync(path.join(__dirname, 'bilgi-kazanimi-sonuc.json'), JSON.stringify({
  rakipSayisi: rakip.length,
  kazanim,
  acik,
  icerikDerinligi: {
    rakipOrtanca: ortanca,
    bizAnaSayfa: kelime(biz['ana sayfa']),
    bizHizmet: kelime(biz['hizmet ayrıntı']),
    bizBlog: kelime(biz['blog yazısı']),
  },
}, null, 2), 'utf8');
console.log('\n  ham veri: plan/bilgi-kazanimi-sonuc.json\n');
