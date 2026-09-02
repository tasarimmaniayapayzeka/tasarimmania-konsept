/* EKMEK KIRINTISI ONARIMI — 27 blog yazısının hepsinde ekranda
 * "<span>undefined</span>" yazıyordu. Şablon üretiminde tanımsız bir değişken
 * basılmış; kullanıcıya görünen gerçek bir hata.
 *
 * NEDEN H1 METNİ: BreadcrumbList şemasının 3. basamağı zaten yazının H1'ini
 * taşıyor. Ekranla şemayı AYNI metinde birleştiriyoruz — SSS'te uyguladığımız
 * "şema neyi diyorsa ekran onu göstersin" kuralının aynısı.
 *
 * Kullanım: node plan/kirinti-onar.js [--kuru]
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const KURU = process.argv.includes('--kuru');

function tara(dir, liste) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) tara(tam, liste);
    else if (e.name === 'index.html') liste.push(tam);
  });
  return liste;
}

/* HTML öznitelik/metin kaçışı — başlıkta & veya < geçerse bozmasın */
const kacir = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let onarilan = 0, atlanan = 0;
const hata = [];

tara(path.join(KOK, 'site'), []).forEach((f) => {
  let h = fs.readFileSync(f, 'utf8');
  const kisa = path.relative(KOK, f).replace(/\\/g, '/');
  if (!h.includes('<span>undefined</span>')) { atlanan++; return; }

  /* H1'i al — şemanın 3. basamağıyla aynı metin */
  const h1M = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1M) { hata.push(kisa + ' → H1 bulunamadı'); return; }
  const baslik = h1M[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!baslik) { hata.push(kisa + ' → H1 boş'); return; }

  /* Şemadaki 3. basamak adıyla tutuyor mu — tutmuyorsa DOKUNMA, bildir */
  const semaAd = (h.match(/"position":\s*3[\s\S]{0,120}?"name":\s*"([^"]*)"/) ||
                  h.match(/"name":\s*"([^"]*)"[\s\S]{0,60}?"position":\s*3/) || [])[1];
  if (semaAd && semaAd.replace(/\s+/g, ' ').trim() !== baslik) {
    hata.push(kisa + ' → H1 ile şema 3. basamağı farklı:\n      H1  : ' + baslik + '\n      şema: ' + semaAd);
    return;
  }

  h = h.replace('<span>undefined</span>',
    '<span aria-current="page">' + kacir(baslik) + '</span>');

  if (!KURU) fs.writeFileSync(f, h, 'utf8');
  onarilan++;
});

console.log('kırıntı onarıldı : ' + onarilan + ' sayfa');
console.log('zaten sağlamdı   : ' + atlanan + ' sayfa');
console.log('sorunlu          : ' + hata.length);
hata.forEach((x) => console.log('   ' + x));
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
