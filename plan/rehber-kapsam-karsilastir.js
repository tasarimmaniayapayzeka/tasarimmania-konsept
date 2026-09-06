/* PDF rehberinin TÜM maddelerini çıkarır ve denetim aracıyla karşılaştırır.
 *
 * ⚠ NEDEN: "PDF kurallarının hepsi uygulandı mı?" sorusuna, kendi yazdığım
 *   denetim aracının "36/40 geçti" çıktısına bakarak cevap vermek yetmez —
 *   o araç PDF'i eksik temsil ediyorsa cevap da eksik olur. Bu betik ham
 *   rehber metnini okuyup madde madde döker; hangi maddenin denetimde
 *   karşılığı var, hangisinin yok, ölçülerek görülür.
 *
 * Kaynak: C:\Temp\rehber.txt (pdftotext -layout çıktısı)
 *
 * Kullanım: node plan/rehber-kapsam-karsilastir.js
 */
const fs = require('fs'), path = require('path');
const METIN = 'C:/Temp/rehber.txt';

if (!fs.existsSync(METIN)) {
  console.error('  ✗ rehber metni yok: ' + METIN);
  console.error('    pdftotext -enc UTF-8 -layout ile üretin.');
  process.exit(2);
}
const ham = fs.readFileSync(METIN, 'utf8');
const satirlar = ham.split(/\r?\n/).map((s) => s.replace(/\s+$/, ''));

/* --- modülleri ayıkla: tek başına duran "01".."40" satırı + sonraki başlık --- */
const moduller = [];
for (let i = 0; i < satirlar.length; i++) {
  const s = satirlar[i].trim();
  if (!/^\d{2}$/.test(s)) continue;
  const no = parseInt(s, 10);
  if (no < 1 || no > 60) continue;
  /* başlık: sonraki boş olmayan satır */
  let j = i + 1, baslik = '';
  while (j < satirlar.length && j < i + 5) {
    const t = satirlar[j].trim();
    if (t && !/^\d{2}$/.test(t)) { baslik = t; break; }
    j++;
  }
  if (!baslik) continue;
  if (moduller.some((m) => m.no === no)) continue;
  moduller.push({ no, baslik, satir: i });
}
moduller.sort((a, b) => a.no - b.no);

/* --- her modülün madde işaretli satırları --- */
for (let k = 0; k < moduller.length; k++) {
  const bas = moduller[k].satir;
  const son = k + 1 < moduller.length ? moduller[k + 1].satir : satirlar.length;
  const maddeler = [];
  for (let i = bas; i < son; i++) {
    const t = satirlar[i].trim();
    if (/^[•▪◦]\s*/.test(t)) maddeler.push(t.replace(/^[•▪◦]\s*/, ''));
  }
  moduller[k].maddeler = maddeler;
}

/* --- denetim aracının dokunduğu modül numaraları --- */
const denetimDosyalari = ['geo-denetim.js', 'geo-denetim-derin.js'];
const kapsanan = new Set();
for (const d of denetimDosyalari) {
  const p = path.join(__dirname, d);
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, 'utf8');
  for (const m of s.matchAll(/\bmod\(\s*(\d{1,2})\s*,/g)) kapsanan.add(+m[1]);
  for (const m of s.matchAll(/B\(\s*'P\d'\s*,\s*(\d{1,2})\s*,/g)) kapsanan.add(+m[1]);
}

console.log('\n  PDF REHBERİ ↔ DENETİM ARACI KAPSAM KARŞILAŞTIRMASI\n');
console.log(`  rehberde bulunan modül : ${moduller.length}`);
console.log(`  denetimde karşılığı olan: ${[...kapsanan].filter((n) => moduller.some((m) => m.no === n)).length}`);

const eksik = moduller.filter((m) => !kapsanan.has(m.no));
console.log(`  denetimde KARŞILIĞI YOK : ${eksik.length}\n`);

console.log('  ── modül modül ──');
let toplamMadde = 0;
for (const m of moduller) {
  toplamMadde += m.maddeler.length;
  const im = kapsanan.has(m.no) ? '✓' : '✗';
  console.log(`  ${im} ${String(m.no).padStart(2, '0')}  ${m.baslik.slice(0, 46).padEnd(48)} ${m.maddeler.length} madde`);
}
console.log(`\n  rehberdeki toplam alt madde: ${toplamMadde}`);

if (eksik.length) {
  console.log('\n  ── DENETİMDE HİÇ ÖLÇÜLMEYEN MODÜLLER ──');
  for (const m of eksik) {
    console.log(`\n  ${String(m.no).padStart(2, '0')} ${m.baslik}`);
    m.maddeler.slice(0, 8).forEach((x) => console.log('      • ' + x.slice(0, 78)));
    if (m.maddeler.length > 8) console.log(`      … ${m.maddeler.length - 8} madde daha`);
  }
}
console.log('');
