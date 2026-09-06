/* Rehberin 01-10. bölümlerindeki TÜM alt maddelerini döker.
 *
 * ⚠ NEDEN: "40 modül" rehberin Bölüm 11'indeki analiz çerçevesi. Asıl
 *   kurallar 01-10. bölümlerin madde listelerinde (173 madde). "Hepsi
 *   uygulandı mı" sorusu bu maddeler üzerinden cevaplanmalı; modül sayısı
 *   üzerinden değil.
 *
 * Kullanım: node plan/rehber-173-madde.js [--liste]
 */
const fs = require('fs');
const METIN = 'C:/Temp/rehber.txt';
const LISTE = process.argv.includes('--liste');

const satirlar = fs.readFileSync(METIN, 'utf8').split(/\r?\n/).map((s) => s.replace(/\s+$/, ''));

const moduller = [];
for (let i = 0; i < satirlar.length; i++) {
  const s = satirlar[i].trim();
  if (!/^\d{2}$/.test(s)) continue;
  const no = parseInt(s, 10);
  if (no < 1 || no > 13) continue;
  let j = i + 1, baslik = '';
  while (j < satirlar.length && j < i + 5) {
    const t = satirlar[j].trim();
    if (t && !/^\d{2}$/.test(t)) { baslik = t; break; }
    j++;
  }
  if (!baslik || moduller.some((m) => m.no === no)) continue;
  moduller.push({ no, baslik, satir: i, maddeler: [] });
}
moduller.sort((a, b) => a.no - b.no);

for (let k = 0; k < moduller.length; k++) {
  const bas = moduller[k].satir;
  const son = k + 1 < moduller.length ? moduller[k + 1].satir : satirlar.length;
  for (let i = bas; i < son; i++) {
    const t = satirlar[i].trim();
    if (/^[•▪◦]\s*/.test(t)) moduller[k].maddeler.push(t.replace(/^[•▪◦]\s*/, '').trim());
  }
}

const kuralBolumleri = moduller.filter((m) => m.no <= 10);
const toplam = kuralBolumleri.reduce((a, m) => a + m.maddeler.length, 0);

console.log(`\n  REHBERİN KURAL MADDELERİ (Bölüm 01-10)\n`);
for (const m of kuralBolumleri) {
  console.log(`  ${String(m.no).padStart(2, '0')} ${m.baslik}  —  ${m.maddeler.length} madde`);
  if (LISTE) m.maddeler.forEach((x, i) => console.log(`      ${String(i + 1).padStart(2)}. ${x}`));
}
console.log(`\n  TOPLAM: ${toplam} madde\n`);

/* makine denetimine uygun mu — kabaca sınıflandır */
if (!LISTE) {
  const hepsi = kuralBolumleri.flatMap((m) => m.maddeler.map((x) => [m.no, x]));
  fs.writeFileSync('C:/Temp/rehber-maddeler.json', JSON.stringify(hepsi, null, 2), 'utf8');
  console.log('  ham liste: C:/Temp/rehber-maddeler.json');
  console.log('  tüm maddeleri görmek için: --liste\n');
}
