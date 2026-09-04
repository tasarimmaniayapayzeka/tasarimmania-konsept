/* SAHNE — mobil-uygulama / uygulama-ui-ux
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Bilgi Mimarisi ve Wireframe
 *      "Ekranlar arası geçiş haritası çıkarılır, her ekranın hangi bilgiyi
 *       taşıyacağı ve kullanıcıyı bir sonraki adıma nasıl yönlendireceği düşük
 *       çözünürlüklü taslaklarla netleştirilir. Bu aşamada geri bildirim almak,
 *       ileride yüksek çözünürlüklü ekranlarda yapılacak değişiklik sayısını
 *       azaltır."
 *   02 Tasarım Sistemi ve Bileşen Kütüphanesi
 *      "Buton, form alanı, kart ve navigasyon gibi tekrar eden öğeler tek bir
 *       bileşen kütüphanesinde toplanır. Bu kütüphane sayesinde yeni bir ekran
 *       eklendiğinde tasarım tutarlılığı bozulmaz ve geliştirme ekibi aynı
 *       bileşeni farklı ekranlarda yeniden kullanabilir."
 *   03 Kullanıcı Testi ve Prototip Doğrulama
 *      "Tıklanabilir prototip gerçek kullanıcılarla veya iç ekiple test
 *       edilerek akışta kafa karışıklığı yaratan noktalar tespit edilir.
 *       Bulgular yüksek çözünürlüklü tasarıma işlenir ve geliştirme ekibine
 *       yalnızca doğrulanmış ekranlar teslim edilir."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üstte geçiş haritası (dört ekran karesi, aralarında akan bağlar);
 *      ortada düşük çözünürlüklü taslak çizilir — RENK YOK, yalnız gri yer
 *      tutucular; taslağın eylem hapından çıkan ok, sağdaki kesik çerçeveli
 *      "bir sonraki ekran"a gider; altta iki geri bildirim notu toplanır,
 *      ok sağa akar ve onay halkası kapanınca taslaktaki bir satır YENİ
 *      genişliğine oturur (eski genişlik kesik hayalet olarak kalır) —
 *      "değişiklik taslak aşamasında yapılır".
 *   02 üstte kütüphane paneli, içinde sayfanın saydığı DÖRT bileşen yan yana
 *      (buton, form alanı, kart, navigasyon); panelden inen tek dağıtım
 *      düğümünden üç ekrana aynı anda aynı jeton akar; alttaki üç ekranın
 *      ilk ikisi aynı bileşenleri farklı sırada kullanır, üçüncüsü sayfanın
 *      kendi cümlesindeki "yeni eklenen ekran"dır: kesik çerçeveyle girer ve
 *      aynı kütüphaneden dolar.
 *   03 üstte iki eşit katılımcı kartı (yüzsüz siluet) prototipe bağlanır;
 *      ortada tıklanabilir prototip: sol ekranın eylem hapında dokunma
 *      halkası büyür, ileri ok yanar, sağ ekran açılır — sonra AŞAĞIDAN geri
 *      dönen yay, kullanıcının geri döndüğünü, yani akıştaki takılmayı
 *      gösterir; yayın tepesindeki halka tespit edilen noktadır. Bulgu jetonu
 *      oradan aşağı iner, yüksek çözünürlüklü ekrandaki bir blok yeni yerine
 *      oturur; en altta kapıdan yalnız onaylı iki ekran geçer, doğrulanmamış
 *      olan kesik çerçeveyle kapının solunda kalır.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER ───────────────────────────────────────────────────────────
 * Üç etiket sayfanın kendi başlıklarından alınmış tek kelimelerdir; tam
 * başlıklar 246 px istasyona SIĞMIYOR (ölçüm aşağıda). Adımın öbür yarısı
 * çizimle anlatılıyor: 01'de bilgi mimarisi üstteki geçiş haritası,
 * 03'te kullanıcı testi katılımcı kartları + dokunma halkasıdır.
 *
 * ── YASAK (yasaklar.md "mobil" modül geneli + "uygulama-ui-ux") ─────────
 *  - MAĞAZA LOGOSU YOK: App Store / Google Play işareti ya da onlara benzeyen
 *    hiçbir simge çizilmedi. Hiçbir yerde marka, ürün ya da platform işareti
 *    yok; tasarım aracı (Figma) arayüzü ya da adı da çizilmedi.
 *  - TELEFON ÇERÇEVELERİ JENERİK: bütün ekranlar düz yuvarlatılmış
 *    dikdörtgen. Çentik, kamera adası, hoparlör yuvası, ana ekran çizgisi,
 *    yan tuş — HİÇBİRİ çizilmedi, yani tanınabilir bir cihaz silueti yok.
 *  - RAKAM YOK: indirme, sürüm, cihaz, test sayısı, ekran sayısı, kontrast
 *    oranı, dokunma alanı ölçüsü, yüzde — hiçbiri yazılmadı. Göstergelerin
 *    üzerinde sayı yok. Tek rakam durak numaraları (01/02/03), sayfanın
 *    kendi numaralandırması.
 *  - İNSAN YÜZÜ YOK: 03'teki iki katılımcı YÜZSÜZ siluettir (baş dairesi +
 *    omuz yayı); göz, ağız, saç, ifade çizgisi yok.
 *  - GERÇEK ARAYÜZ YOK: ekran içerikleri adsız yer tutucu çubuklardır,
 *    okunur sahte metin ya da gerçek bir uygulamadan alınmış düzen yok.
 *
 * ── DÜŞÜK / YÜKSEK ÇÖZÜNÜRLÜK AYRIMI NEDEN RENKLE ÇİZİLDİ ──────────────
 * Sayfanın kendi SSS cevabı: "Wireframe ... renk, görsel veya marka unsuru
 * içermez, sadece yerleşim ve akışı test eder. Yüksek çözünürlüklü tasarım
 * ise aynı iskeletin tipografi, renk paleti, ikonografi ve gerçek içerikle
 * giydirilmiş ... halidir." Bu yüzden 01'deki taslakta MODÜL AKSANI HİÇ
 * kullanılmadı (yalnız beyaz/gri yer tutucular), 03'teki yüksek çözünürlüklü
 * ekranda ise bloklar aksanla giydirildi. Ayrım uydurma değil, sayfanın
 * kendi cümlesi.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) BİLGİ MİMARİSİ — tek ekran düğümünden
 * aşağı ayrılan üç bağ, üç ekran düğümü, sağdakinden ayrılan kesik "Hata
 * durumları" düğümü + ünlem, solda "Kullanıcı senaryoları" kutusu;
 * (2) WIREFRAME → EKRAN — "Aynı iskelet" başlığı, wireframe telefonu, ara ok,
 * yüksek çözünürlük telefonu, altta Tipografi / Renk paleti / İkonografi
 * çipleri; (3) ERİŞİLEBİLİRLİK — kontrol listesi, kontrast oranı, renk
 * körlüğüne duyarlı palet, ekran okuyucu, dokunma alanı çerçevesi.
 * Bu sahne aynı sayfanın BAŞKA bir kesitini çizer:
 *  · Kardeş figür sayfanın "Derinlemesine" bölümünü çiziyor ve üçüncü durağı
 *    ERİŞİLEBİLİRLİK. Bu sahne "Ayrıntılar"daki 01/02/03 listesini çiziyor ve
 *    üçüncü durağı KULLANICI TESTİ. Erişilebilirlik bu sahnede HİÇ çizilmedi
 *    (kontrast simgesi, palet lekesi, ekran okuyucu, dokunma alanı çerçevesi
 *    yok) — kardeş figürün alanına girilmiyor.
 *  · 01'de ağaç YOK: kardeş figür 1→3 dallanan bir düğüm ağacı çiziyor,
 *    burada geçiş haritası YATAY bir ekran zinciri. Hata durumları dalı ve
 *    ünlem işareti bu sahnede hiç yok — o kardeş figürün bulgusudur,
 *    tekrarlanmadı.
 *  · 02'de wireframe→yüksek çözünürlük telefon çifti YOK: o eşleştirme kardeş
 *    figürün ikinci kutusunun konusu. Burada aynı adımın öbür yarısı var —
 *    kütüphanenin KENDİSİ ve aynı bileşenin farklı ekranlarda yeniden
 *    kullanılması. Tipografi/renk paleti/ikonografi çipleri de çizilmedi.
 *  · 03'teki geri dönüş yayı, kardeş figürdeki kesik "Hata durumları" dalıyla
 *    aynı şey DEĞİL ve onunla çelişmez: orada ekranın hata hâli haritalanıyor,
 *    burada kullanıcının akışta geri dönmesi (takılma) ölçülüyor. Ayırt
 *    edilsin diye ünlem işareti bilerek kullanılmadı.
 *
 * ── EŞİTLİK — SAYFA NEREDE "HEPSİ GEÇERLİ" DİYOR ────────────────────────
 * Üç yerde eşitlik iddiası var, üçü de PİKSEL ÖLÇÜLDÜ (değerler aşağıda):
 *  · 02'nin DÖRT BİLEŞEN KUTUSU — sayfa "Buton, form alanı, kart ve
 *    navigasyon gibi" diyerek dördünü örnek sayıyor, sıralamıyor. Kutular
 *    aynı ölçü, aynı kontur, aynı dolgu, aynı gecikme (gecikme HİÇ yok:
 *    dördü de yalnız p'ye bağlı) ve TEK SIRADA (aynı y) duruyor.
 *  · 03'ün İKİ KATILIMCI KARTI — sayfa "gerçek kullanıcılarla VEYA iç ekiple"
 *    diyor; ikisi de geçerli. Kartlar birebir aynı çizim, aynı y, aynı
 *    gecikme; durak merkezine simetrik yerleştirildi.
 *  · 03'ün İKİ ONAYLI EKRAN ÇİPİ — kapıdan geçen iki çip birbirinin aynı.
 *    Kapının solunda kalan üçüncü çip BİLEREK farklı (kesik çerçeve, sönük):
 *    sayfa "yalnızca doğrulanmış ekranlar teslim edilir" diyor, bu bir
 *    üstünlük değil sayfanın kendi ayrımı.
 * Eşitlik iddiası OLMAYAN yerler (bilerek farklı): 02'deki üçüncü ekran
 * sayfanın "yeni bir ekran eklendiğinde" cümlesinin karşılığıdır, sonradan
 * girer; 01'deki taslak ile yanındaki kesik çerçeve iki seçenek değil, bir
 * ekran ve onun bir sonraki adımıdır.
 *
 * ── DİKİŞSİZ DÖNGÜ ─────────────────────────────────────────────────────
 * Tüm hareket faz cinsinden periyodik: kesik akışların kayması desenin TAM
 * SAYI katı (bir turda 4 desen), dokunma halkası turda 2 kez büyüyüp sönüyor,
 * dağıtım jetonları turda 2 gidiş-dönüş (kosinüs), takılma halkasının nabzı
 * turda 3 çevrim. Sıralı canlanmaların hepsi p'ye bağlı; p durak penceresi
 * dışında 0 olduğu için tek seferlik hareket yok.
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü, hiçbiri tahmin değil ──
 *
 * 1) ETİKET GENİŞLİĞİ. Kod hesabıyla değil: etiket tek başına basılıp mürekkep
 *    kutusu piksel piksel tarandı (28 px, Consolas, ağırlık 600, harf arası
 *    1,2). İstasyon 246 px:
 *      "01 WIREFRAME"        196 px  ✓ SEÇİLDİ
 *      "02 BİLEŞENLER"       214 px  ✓ SEÇİLDİ
 *      "03 PROTOTİP"         180 px  ✓ SEÇİLDİ
 *      "01 EKRAN AKIŞI"      229 px  (sığar, seçilmedi)
 *      "02 KÜTÜPHANE"        196 px  (sığar, seçilmedi)
 *      "03 DOĞRULAMA"        198 px  (sığar, seçilmedi — kardeş teknik-seo
 *                                     sahnesi aynı etiketi kullanıyor)
 *      "03 PROTOTİP TESTİ"   279 px  ✗ TAŞAR
 *      "01 BİLGİ MİMARİSİ"   279 px  ✗ TAŞAR
 *      "02 TASARIM SİSTEMİ"  295 px  ✗ TAŞAR
 *      "03 KULLANICI TESTİ"  295 px  ✗ TAŞAR
 *    Kısaltmanın gerekçesi bu. Videodaki TEK yazı bu üç etikettir; en küçük
 *    yazı boyu 28 px (masaüstünde 0,517 ölçekle 14,5 px).
 *
 * 2) EŞİTLİK — TEK KAREDE DEĞİL DÖNGÜ ORTALAMASINDA (40 kare). Yanına motorun
 *    BOŞ KABUĞUNDA (motor.kabuk('') — içinde hiç çizim yok) aynı kutuların
 *    ölçümü yazıldı, çünkü tepe vinyeti + zemin halesi zaten bir rampa
 *    yaratıyor ve sahnenin payı ondan ayrılmalı:
 *      01 harita karesi (4)      : 30,07 / 30,31 / 30,38 / 30,45   %1,2
 *                                  (boş kabuk %7,7 → çizim rampayı AZALTIYOR)
 *      01 geri bildirim notu (2) : 39,04 / 39,11                   %0,2
 *                                  (boş kabuk %5,5)
 *      02 bileşen kutusu (4)     : 31,08 / 31,21 / 31,15 / 31,23   %0,5
 *                                  (boş kabuk %0,5)
 *      02 ekran 1 ve 2           : 37,11 / 37,14                   %0,1
 *      03 katılımcı kartı (2)    : 25,76 / 25,46                   %1,2
 *                                  (boş kabuk %3,3)
 *      03 onaylı ekran çipi (2)  : 33,31 / 33,22                   %0,3
 *                                  (boş kabuk %5,1)
 *    Eşitliğin YATAY dizilimle sağlandığını not düş: karşılaştırılan her grup
 *    AYNI y'de duruyor. Dikey dizilim denenmedi çünkü motorun `ustKarart`
 *    vinyeti tuvalin üst %42'sini karartıyor ve o rampa çizimin ÜSTÜNE
 *    biniyor — arka plan perdesiyle bastırılamıyor.
 *
 * 3) DÖRT BİLEŞEN KUTUSU — BULUNAN VE DÜZELTİLEN GERÇEK KUSUR.
 *    İlk sürüm ölçüldüğünde: 29,65 / 31,54 / 35,49 / 30,82 → **%16,5 fark**,
 *    yani "kart" kutusu ötekilerden belirgin parlaktı. Boş kabuk aynı
 *    kutularda yalnız %0,5 veriyordu, demek ki kusur motorun ışığı değil
 *    ÇİZİMDİ. Koda bakınca dördü de "aynı ölçü, aynı kontur, aynı gecikme"
 *    görünüyordu — kusur ancak piksel ölçümüyle çıktı. İki kaynağı vardı:
 *      a) GÖVDE ALANLARI ÇOK FARKLI: buton 448, form 640, kart 1024,
 *         navigasyon 476 px² — DİKKAT, buradaki "buton 448" O ANIN değeridir
 *         (tek hap); (b)'de ikinci hap eklenince 832'ye çıktı ve BS_ALAN[0]
 *         BUGÜN 832'dir. Kodla karşılaştırırken 448'i arama.
 *         Aynı alfayla doldurulunca kart iki kat mürekkep
 *         taşıyordu. Dolgu alfası 448/alan ile normallendi; bu tek başına
 *         kutuları ayrıntısız hâlde %0,4'e indirdi (28,61/28,71/28,66/28,73).
 *      b) AYRINTI MÜREKKEBİ: ayrıntının katkısı 3,07 / 2,74 / 4,15 / 2,06
 *         (butona ikinci hap eklendikten SONRAKİ değerler; öncesinde buton
 *         yalnız 1,04 taşıyordu ve alfayı büyütmek 1'i aşıyordu).
 *         Ortak hedef 3,00 seçilemedi: navigasyon için 1,462 çarpan gerekir,
 *         bu p=1'de aksan alfasını 1,14'e çıkarır (geçersiz). Hedef 2,50
 *         alındı → BS_KAL = [0,814, 0,912, 0,602, 1,214], p=1'deki aksan
 *         alfaları 0,635 / 0,711 / 0,470 / 0,947 (hepsi ≤ 1).
 *    Sonuç: %16,5 → **%0,5**.
 *
 * 4) DÖNGÜ DİKİŞİ — crf SEÇİMİ. Kaynak kareler KUSURSUZ dikişsiz; ham SVG
 *    karelerinde ölçüldü: ardışık kare ortalaması 0,117, 119→0 farkı 0,038,
 *    yani oran **0,32×** (eşik 1,6). Sorun çizimde değil KODLAYICIDA — kardeş
 *    kurumsal-web-sitesi ve teknik-seo sahnelerinde de aynı şey ölçülmüştü.
 *    Aynı sahne üç ayarla basıldı:
 *      crf 26 → dikiş 0,71  oran 2,02× ✗  (167 KB)
 *      crf 24 → dikiş 0,61  oran 1,72× ✗  (207 KB)
 *      crf 22 → dikiş 0,53  oran 1,47× ✓  (258 KB)  ← SEÇİLDİ
 *    BU SAHNE crf 22 İLE BASILIR; `uret.js` motorun varsayılanı crf 26 ile
 *    basar ve o ayar eşiği GEÇMEZ:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-mobil/uygulama-ui-ux','mobil',
 *                      require('./plan/video-uret/sahne-uygulama-ui-ux.js'),{crf:22})"
 *    258 KB, kardeş videoların aralığında (163–318 KB).
 *
 * 5) OYNATMA (headless Chrome, _vd.html ile, --autoplay-policy bayrağı YOK,
 *    gerçek zamanlı beklenerek):
 *      normal                        : paused=false, currentTime 1,90 → 3,61
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *      kaynak: uygulama-ui-ux.mp4, data-dongu: var, öğe görünür (rectTop 209)
 *
 * ── BAĞIMSIZ DENETİM (ikinci ajan, ayrı ölçüm hattı) ────────────────────
 * Her şey sıfırdan ölçüldü; ÇİZİME DOKUNULMADI, yalnız yanlış çıkan YORUM
 * cümleleri düzeltildi (önizleme PNG sha256'sı öncesi/sonrası aynı).
 *   ✓ DOĞRULANDI
 *     · Etiket genişlikleri, izole render + piksel tarama: 196 / 214 / 180 px
 *       (246 yuvaya sığıyor). Gerçek karede yuva içinde, taşma yok:
 *       sol/sağ paylar 25/27, 16/18, 33/34 px. Yorumdaki 10 aday etiketin
 *       ONUNUN DA ölçüsü birebir tutuyor (279/295'ler gerçekten taşıyor).
 *     · Videodaki tek yazı bu üç etiket; ham <text> yok, hepsi motor.yaz()
 *       (font-weight 600 dayatılıyor). En küçük boy 28 px.
 *     · Eşitlik, 40 kare döngü ortalaması (yanında boş kabuk):
 *         01 harita karesi (4) : 29,91/30,09/30,12/30,17  %0,9 (boş %6,0)
 *         01 geri bildirim (2) : 35,47/35,53              %0,2 (boş %5,5)
 *         02 bileşen kutusu(4) : 30,33/30,56/30,54/30,51  %0,8 (boş %0,1)
 *         02 ekran 1 ve 2      : 35,98/36,00              %0,1 (boş %0,5)
 *         03 katılımcı kartı(2): 25,49/25,30              %0,8 (boş %1,5)
 *         03 onaylı çip (2)    : 32,41/32,33              %0,2 (boş %5,2)
 *       Hiçbir grupta çizim kaynaklı eşitsizlik yok (üründe %14 kusur
 *       bulunmuştu, burada en büyüğü %0,9 ve çoğunda boş kabuğun rampasından
 *       KÜÇÜK — yani çizim rampayı azaltıyor).
 *     · Dokuz kesik akışın dokuzu da bir turda TAM 4 desen kayıyor.
 *       Ham SVG karelerinde dikiş 0,0401, ardışık kare farkı 0,222 →
 *       oran 0,18× (kaynak kareler kusursuz dikişsiz; mp4'teki 1,47
 *       kodlayıcıdan geliyor, crf 22 seçimi doğru).
 *     · mp4 döngü denetimi: dikiş 0,53 / ortalama 0,36 = 1,47× (eşik 1,6).
 *     · Oynatma, CDP ile GERÇEK ZAMANLI (sanal zaman kullanılmadı):
 *       normal paused=false, currentTime 1,96 → 3,67, ilerledi;
 *       --force-prefers-reduced-motion paused=true, 0 → 0.
 *     · Yasak taraması: mağaza işareti / çatı-dil logosu / tanınabilir cihaz
 *       silueti (çentik, kamera adası, hoparlör, ana ekran çizgisi) YOK;
 *       01/02/03 dışında rakam YOK; katılımcılar yüzsüz.
 *     · Kardeş .akis figürünün üç kutusu okundu (Bilgi mimarisi / Wireframe →
 *       Ekran / Erişilebilirlik). Yorumun kardeş figür çözümlemesi birebir
 *       doğru; erişilebilirlik motifleri (kontrast, renk körlüğü paleti,
 *       ekran okuyucu, dokunma alanı çerçevesi + ölçü oku) bu sahnede
 *       gerçekten hiç çizilmemiş.
 *   ✗ DÜZELTİLEN YORUM HATALARI (beşi de ölçümle yakalandı)
 *     1. 03'te tespit halkasının yeri "DY+148" yazılmıştı, kodda DY+152.
 *        Darbeye uzaklık 56 değil 52,09 px ve halkanın alt kenarı gradyanın
 *        içinde — "hiç yıkanmıyor" iddiası yanlıştı.
 *     2. Geri dönüş yayı "darbenin tamamen dışında" deniyordu; en alt
 *        noktası 51,8 px, yani yarıçapın 0,2 px içinde.
 *     3. 02'de bileşen kutularının darbeye uzaklığı 79 değil 81,2 px.
 *     4. 03'te katılımcı kartları "150+" deniyordu; 148,5 ve 149,7 px.
 *     5. 01'de harita kareleri "DY+22–54" deniyordu, kodda DY+20–54;
 *        notların uzaklığı 103/75 değil 101,0/73,6 px.
 *        Ayrıca bileşen docstring'i "buton 448 px²" diyordu — kodda 832;
 *        bu, BS_ALAN[0]'ın yanlış "düzeltilmesine" davetiyeydi.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 WIREFRAME' },
  { x: 437, fazMerkez: 0.50, etiket: '02 BİLEŞENLER' },
  { x: 812, fazMerkez: 0.80, etiket: '03 PROTOTİP' },
];
const DW = 246, DH = 344, DY = 126;

module.exports = function sahne(faz, a) {
  const { cam, yaz, boru, seritYolu, darbeIsigi, canlilik } = a;
  const A = a.aksan.rgb.join(',');
  const yol = seritYolu(SERIT);

  const canli = DURAK.map((d) => canlilik(faz, d.fazMerkez, 0.19));

  let s = '';

  /* --- zemin ızgarası: çok soluk, derinlik için ------------------------ */
  s += '<g opacity=".5">';
  for (let x = 80; x < 1120; x += 80) {
    s += `<line x1="${x}" y1="0" x2="${x}" y2="626" stroke="rgba(255,255,255,.022)" stroke-width="1"/>`;
  }
  for (let y = 80; y < 626; y += 80) {
    s += `<line x1="0" y1="${y}" x2="1120" y2="${y}" stroke="rgba(255,255,255,.022)" stroke-width="1"/>`;
  }
  s += '</g>';

  /* --- akan cam boru (durakların ARKASINDA) ---------------------------- */
  s += boru(yol, faz, a.aksan.rgb, { kalin: 20, desen: 48, hiz: 3 });

  /* --- duraklar -------------------------------------------------------- */
  DURAK.forEach((d, i) => {
    const p = canli[i];
    s += `<g>`;
    if (p > 0.02) {
      s += `<rect x="${d.x - 14}" y="${DY - 14}" width="${DW + 28}" height="${DH + 28}" rx="26"
              fill="rgba(${A},${(0.10 * p).toFixed(3)})" filter="url(#yumusaCok)"/>`;
    }
    s += cam({ x: d.x, y: DY, w: DW, h: DH, r: 18, parlaklik: p, aksan: a.aksan.rgb });
    s += (i === 0 ? bilgiMimarisi(d.x, p, faz, a)
       : i === 1 ? bilesenKutuphanesi(d.x, p, faz, a)
       : prototipTesti(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · BİLGİ MİMARİSİ VE WIREFRAME ────────────────────────────────────
   Üstte geçiş haritası, ortada düşük çözünürlüklü taslak + bir sonraki ekran,
   altta geri bildirim şeridi.
   ÖLÇÜ NOTU — IŞIK DARBESİ NEREYE DÜŞÜYOR: bu durakta darbe (bx+126, DY+242)
   noktasında duruyor (faz 0.20'de seritNokta = 188, 368), yarıçapı 52.
   Eşitlik iddiası taşıyan iki grup bilerek dışarıda bırakıldı — DENETİMDE
   YENİDEN ÖLÇÜLDÜ, ilk yazımdaki üç sayı yanlıştı, düzeltildi:
   harita kareleri DY+20–54'te (yazım "DY+22–54" diyordu; kutuların ty'si
   DY+20), darbeye en yakın noktaları 188,2 / 188,6 / 197,6 / 199,6 px —
   yani en yakını bile yarıçapın üç katından uzak; geri bildirim notları
   (bx+44 / bx+82, DY+301) merkezden 101,0 ve 73,6 px uzakta (yazım "103 ve
   75" diyordu). Darbenin altında kalan tek şey taslağın eylem hapı ve
   oradan çıkan geçiş oku — yani ışık tam "bir sonraki adıma
   yönlendirme"nin üstünden geçiyor. */
function bilgiMimarisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const akis = (faz * 36).toFixed(1);              // desen 9 → turda 4 desen
  let s = '';

  /* --- geçiş haritası: dört ekran karesi, aralarında akan bağ -----------
     Kardeş .akis figürü aynı adımı DALLANAN AĞAÇ olarak çiziyor; burada
     yatay zincir var, hata dalı yok. Dört kare birbirinin aynı: aynı ölçü,
     aynı dolgu, aynı kontur, aynı y ve GECİKME YOK — sayfa ekranları
     sıralamıyor, yalnız aralarındaki geçişten söz ediyor. */
  s += `<rect x="${bx + 12}" y="${DY + 12}" width="222" height="54" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${bx + 12}" y="${DY + 12}" width="222" height="54" rx="10" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  for (let i = 0; i < 4; i++) {
    const tx = bx + 31 + i * 52, ty = DY + 20, tw = 28, th = 34;
    s += `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="4.5"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.11 + 0.17 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<rect x="${tx + 5}" y="${ty + 6}" width="18" height="4" rx="2"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p).toFixed(3)})"/>`;
    s += `<rect x="${tx + 5}" y="${ty + 14}" width="18" height="3" rx="1.5"
            fill="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})"/>`;
    s += `<rect x="${tx + 5}" y="${ty + 21}" width="11" height="3" rx="1.5"
            fill="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})"/>`;
    if (i < 3) {
      const c0 = tx + tw + 3, c1 = tx + tw + 16;
      s += `<line x1="${c0}" y1="${DY + 37}" x2="${c1}" y2="${DY + 37}"
              stroke="rgba(${A},${(0.20 + 0.50 * p).toFixed(3)})" stroke-width="1.6"
              stroke-dasharray="4 5" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
      s += `<path d="M${c1} ${DY + 33.4} L${c1 + 4.6} ${DY + 37} L${c1} ${DY + 40.6} Z"
              fill="rgba(${A},${(0.24 + 0.52 * p).toFixed(3)})"/>`;
    }
  }

  /* --- düşük çözünürlüklü taslak: RENK YOK, yalnız gri yer tutucular ----
     Sayfanın SSS cevabı: "Wireframe ... renk, görsel veya marka unsuru
     içermez". Bu yüzden TASLAĞIN KENDİSİNDE ve yanındaki "bir sonraki
     ekran" kesik çerçevesinde modül aksanı hiç kullanılmadı; aksan ancak
     bu iki bloktan SONRA, geçiş okunda ve geri bildirim şeridinde başlıyor
     (yazım "aşağıdaki hiçbir çizimde" diyordu, kapsamı belirsizdi).
     Çerçeve jenerik: çentik / kamera adası / hoparlör yuvası YOK. */
  const dX = bx + 16, dY0 = DY + 80, dW = 104, dH = 176;
  s += `<rect x="${dX}" y="${dY0}" width="${dW}" height="${dH}" rx="12" fill="rgba(14,17,24,.62)"/>`;
  s += `<rect x="${dX}" y="${dY0}" width="${dW}" height="${dH}" rx="12"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.13 + 0.19 * p).toFixed(3)})" stroke-width="1.4"/>`;

  const gri = (k) => `rgba(255,255,255,${(0.10 + 0.16 * p * k).toFixed(3)})`;
  const ciz = (i) => kis01((p - i * 0.075) / 0.34);   // taslak yukarıdan aşağı çizilir

  /* başlık yer tutucusu */
  s += `<rect x="${dX + 12}" y="${dY0 + 14}" width="${(80 * ciz(0)).toFixed(1)}" height="11" rx="3" fill="${gri(1)}"/>`;
  /* görsel yer tutucusu — köşegen çarpı, klasik wireframe işareti */
  const g2 = ciz(1);
  s += `<rect x="${dX + 12}" y="${dY0 + 34}" width="80" height="46" rx="4"
          fill="rgba(255,255,255,${(0.030 * g2).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p * g2).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<path d="M${dX + 12} ${dY0 + 34} L${dX + 92} ${dY0 + 80} M${dX + 92} ${dY0 + 34} L${dX + 12} ${dY0 + 80}"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p * g2).toFixed(3)})" stroke-width="1.1"/>`;
  /* iki metin satırı — ikincisi geri bildirim sonrası YENİ genişliğine oturur */
  const duzelt = kis01((p - 0.45) / 0.40);
  s += `<rect x="${dX + 12}" y="${dY0 + 90}" width="${(80 * ciz(2)).toFixed(1)}" height="6" rx="3" fill="${gri(0.85)}"/>`;
  /* ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: eski genişliğin kesik hayaleti önce çiziliyordu ve
     yeni (daha geniş) dolu çubuk onu TAMAMEN örtüyordu — önizlemede
     "değişiklik yapıldı" okuması hiç görünmüyordu. Hayalet artık dolu
     çubuğun ÜSTÜNE, yalnız kontur olarak çiziliyor ve opaklığı düzeltmeyle
     birlikte artıyor: çubuk uzuyor, eski ucu kesik çizgi olarak kalıyor. */
  const eskiG = 46, yeniG = 74;
  s += `<rect x="${dX + 12}" y="${dY0 + 102}" width="${((eskiG + (yeniG - eskiG) * duzelt) * ciz(3)).toFixed(1)}"
          height="6" rx="3" fill="${gri(0.85)}"/>`;
  s += `<rect x="${dX + 12}" y="${dY0 + 102}" width="${eskiG}" height="6" rx="3" fill="none"
          stroke="rgba(14,17,24,${(0.30 + 0.45 * duzelt).toFixed(3)})"
          stroke-width="1.2" stroke-dasharray="3 3"/>`;
  /* liste satırları */
  [0, 1].forEach((r) => {
    const k = ciz(4 + r), ry = dY0 + 116 + r * 20;
    s += `<rect x="${dX + 12}" y="${ry}" width="14" height="14" rx="3"
            fill="rgba(255,255,255,${(0.045 * k).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p * k).toFixed(3)})" stroke-width="1.1"/>`;
    s += `<rect x="${dX + 32}" y="${ry + 5}" width="${(56 * k).toFixed(1)}" height="5" rx="2.5" fill="${gri(0.8)}"/>`;
  });
  /* eylem hapı — "bir sonraki adıma yönlendirme"nin çıkış noktası */
  const g6 = ciz(6);
  s += `<rect x="${dX + 22}" y="${dY0 + 154}" width="60" height="16" rx="8"
          fill="rgba(255,255,255,${(0.05 + 0.07 * p * g6).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.14 + 0.22 * p * g6).toFixed(3)})" stroke-width="1.3"/>`;

  /* --- bir sonraki ekran: kesik çerçeve, henüz taslağı çıkmamış --------- */
  const nT = kis01((p - 0.30) / 0.40);
  const gX = bx + 146, gY = DY + 108, gW = 84, gH = 120;
  s += `<rect x="${gX}" y="${gY}" width="${gW}" height="${gH}" rx="11"
          fill="rgba(255,255,255,${(0.014 * nT).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.08 + 0.16 * p * nT).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="5 5"/>`;
  [0, 1, 2].forEach((r) => {
    s += `<rect x="${gX + 12}" y="${gY + 18 + r * 22}" width="${[60, 46, 54][r]}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.06 + 0.09 * p * nT).toFixed(3)})"/>`;
  });

  /* --- geçiş oku: eylem hapından bir sonraki ekrana --------------------- */
  s += `<path d="M${dX + 84} ${dY0 + 162} C${bx + 112} ${DY + 242} ${bx + 124} ${DY + 206} ${bx + 141} ${DY + 188}"
          fill="none" stroke="rgba(${A},${(0.24 + 0.54 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 6" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 137} ${DY + 185.5} L${bx + 145} ${DY + 184} L${bx + 141.5} ${DY + 191.5} Z"
          fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"/>`;

  /* --- geri bildirim şeridi ---------------------------------------------
     İki not birebir aynı ve AYNI ANDA doluyor (sayfa notları sıralamıyor).
     Notların taslaktaki hangi bloğa ait olduğu ÇİZİLMEDİ — sayfa bunu
     söylemiyor, bağ çekmek uydurma olurdu. Sağdaki halka kapanınca yukarıdaki
     ikinci metin satırı yeni genişliğine oturur: "geri bildirim ... taslak
     aşamasında" alınır. */
  s += `<rect x="${bx + 12}" y="${DY + 272}" width="222" height="58" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${bx + 12}" y="${DY + 272}" width="222" height="58" rx="10" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const not = kis01((p - 0.10) / 0.30);
  [bx + 44, bx + 82].forEach((nx) => {
    s += `<circle cx="${nx}" cy="${DY + 301}" r="9"
            fill="rgba(255,255,255,${(0.030 + 0.055 * not).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.13 + 0.30 * not).toFixed(3)})" stroke-width="1.4"/>`;
    s += `<circle cx="${nx}" cy="${DY + 301}" r="2.8" fill="rgba(255,255,255,${(0.16 + 0.42 * not).toFixed(3)})"/>`;
  });
  s += `<line x1="${bx + 102}" y1="${DY + 301}" x2="${bx + 158}" y2="${DY + 301}"
          stroke="rgba(${A},${(0.18 + 0.48 * p).toFixed(3)})" stroke-width="1.7"
          stroke-dasharray="5 6" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 158} ${DY + 297.4} L${bx + 164} ${DY + 301} L${bx + 158} ${DY + 304.6} Z"
          fill="rgba(${A},${(0.24 + 0.52 * p).toFixed(3)})"/>`;
  const ox = bx + 190, oy = DY + 301;
  s += `<circle cx="${ox}" cy="${oy}" r="13" fill="rgba(${A},${(0.10 * duzelt).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.58 * duzelt).toFixed(3)})" stroke-width="1.7"/>`;
  s += `<path d="M${ox - 5.8} ${oy + 0.6} L${ox - 1.6} ${oy + 5.2} L${ox + 6.4} ${oy - 4.8}"
          fill="none" stroke="rgba(255,255,255,${(0.20 + 0.70 * duzelt).toFixed(2)})"
          stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="21" stroke-dashoffset="${(21 * (1 - duzelt)).toFixed(2)}"/>`;

  return s;
}

/* ── 02 · TASARIM SİSTEMİ VE BİLEŞEN KÜTÜPHANESİ ─────────────────────────
   Üstte kütüphane paneli (sayfanın saydığı dört bileşen), ortada tek dağıtım
   düğümü, altta üç ekran.
   ÖLÇÜ NOTU — IŞIK DARBESİ: bu durakta darbe (bx+123, DY+177,1) noktasında,
   yarıçapı 52. Dört bileşen kutusu DY+40–96'da (en yakın nokta 81,2 px
   uzakta; yazım "79 px" diyordu, denetimde düzeltildi), üç ekran DY+232'de
   başlıyor (en yakın nokta 54,9 px uzakta) — yani eşitlik taşıyan hiçbir
   öğe darbeden ışık ALMIYOR. Darbenin tam üstüne dağıtım düğümü oturtuldu
   (r=9; merkezler arası 0,13 px): darbe geçerken düğüm kendiliğinden
   yanıyor, teknik-seo sahnesindeki çözümün aynısı. */
function bilesenKutuphanesi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- kütüphane paneli ------------------------------------------------- */
  s += `<rect x="${bx + 12}" y="${DY + 14}" width="222" height="96" rx="11" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${bx + 12}" y="${DY + 14}" width="222" height="96" rx="11" fill="none"
          stroke="rgba(${A},${(0.14 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${bx + 24}" y="${DY + 24}" width="44" height="6" rx="3"
          fill="rgba(255,255,255,${(0.13 + 0.20 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 74}" y="${DY + 25}" width="24" height="4" rx="2"
          fill="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})"/>`;

  /* --- dört bileşen kutusu: buton / form alanı / kart / navigasyon -------
     GECİKME YOK, hepsi yalnız p'ye bağlı; aynı y, aynı ölçü, aynı kontur,
     aynı dolgu. Sayfa dördünü örnek olarak sayıyor, sıralamıyor. */
  for (let i = 0; i < 4; i++) {
    const tx = bx + 25 + i * 50, ty = DY + 40, tw = 46, th = 56;
    s += `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="7"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.11 + 0.17 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += bilesenSimgesi(i, tx, ty, A, p);
  }

  /* --- dağıtım: panelden tek düğüme, düğümden üç ekrana ------------------
     Jeton HERHANGİ BİR kutudan değil panelin altından çıkıyor: hangi bileşenin
     dağıtıldığını iddia etmemek için. Üç dala AYNI ANDA aynı jeton gider —
     "aynı bileşeni farklı ekranlarda yeniden kullanabilir". */
  const nx = bx + 123, ny = DY + 177;
  s += `<line x1="${nx}" y1="${DY + 112}" x2="${nx}" y2="${ny - 10}"
          stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="9" fill="rgba(${A},${(0.06 + 0.14 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.55 * p).toFixed(3)})" stroke-width="1.6"/>`;

  const hedef = [bx + 50, bx + 124, bx + 198];
  const u = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);      // turda 2 gidiş-dönüş
  hedef.forEach((hx) => {
    s += `<line x1="${nx}" y1="${ny + 9}" x2="${hx}" y2="${DY + 228}"
            stroke="rgba(${A},${(0.13 + 0.34 * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
    const jx = nx + (hx - nx) * u, jy = (ny + 9) + (DY + 228 - ny - 9) * u;
    s += `<rect x="${(jx - 4).toFixed(1)}" y="${(jy - 3).toFixed(1)}" width="8" height="6" rx="2"
            fill="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})"/>`;
  });

  /* --- üç ekran ----------------------------------------------------------
     1 ve 2 aynı bileşenleri FARKLI SIRADA kullanır (aynı öğeler, aynı ölçü —
     toplam mürekkep aynı, yalnız dizilim farklı). 3 ise sayfanın kendi
     cümlesindeki "yeni eklenen ekran": kesik çerçeveyle girer, sonra aynı
     kütüphaneden dolar. Çerçeveler jenerik: çentik / kamera adası yok. */
  const duzen = [['nav', 'kart', 'form', 'btn'], ['nav', 'form', 'kart', 'btn'], ['nav', 'kart', 'btn']];
  const yeni = kis01((p - 0.50) / 0.36);
  [bx + 18, bx + 92, bx + 166].forEach((sx, i) => {
    const sy = DY + 232, sw = 64, sh = 104;
    const g = i === 2 ? yeni : 1;
    s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="9" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="9"
            fill="rgba(255,255,255,${(0.026 + 0.026 * p * g).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.20 * p * (0.35 + 0.65 * g)).toFixed(3)})"
            stroke-width="1.3"${i === 2 && yeni < 0.98 ? ' stroke-dasharray="5 5"' : ''}/>`;
    let cy = sy + 8;
    duzen[i].forEach((tur) => {
      s += ekranBileseni(tur, sx + 8, cy, 48, A, p * g);
      cy += tur === 'kart' ? 40 : tur === 'form' ? 19 : tur === 'nav' ? 17 : 19;
    });
  });

  return s;
}

/* Kütüphane kutularının içindeki dört bileşen. Marka/platform işareti yok;
   hepsi soyut yer tutucu.
   MÜREKKEP EŞİTLİĞİ — ölçülerek yapıldı, göz kararı değil. Dört bileşen aynı
   şey değil, bu yüzden çizimleri de aynı olamaz; ama sayfa dördünü eşit
   sayıyor, o hâlde KUTU ORTALAMALARI eşit olmalı. İki düzeltme uygulandı:
   1) ZEMİN DOLGUSU ALANA GÖRE NORMALLENDİ. Simgelerin gövde alanları çok
      farklı; aynı alfayla doldurulunca kart kutusu ötekilerden belirgin
      parlak çıkıyordu. Dolgu alfası 448/alan ile ölçekleniyor, böylece
      dördünün dolgu MÜREKKEBİ (alfa × alan) birebir aynı — ölçüldü:
      dördü de 33,6 birim.
      DİKKAT — BS_ALAN'A DOKUNMA: aşağıdaki dizi kodun ÇİZDİĞİ gerçek
      gövde alanlarıdır, denetimde tek tek sayıldı:
        buton 832 px² (İKİ hap, her biri 32×13 = 416)
        form  640 px² (32×20)   kart 1024 px² (32×32)   nav 476 px² (34×14)
      Paydaki 448 yalnız ORTAK ÇARPAN, bir alan değil — hangi sayı seçilirse
      seçilsin dördünün mürekkebi eşit çıkar, 448 sadece alfaları 1'in altında
      tutmak için seçildi. (Bu blok bir süre "buton 448" yazıyordu; o değer
      ikinci hap EKLENMEDEN önceki tek hapın alanıydı ve kodla çelişiyordu.
      Sonraki okuyucu BS_ALAN[0]'ı 832 → 448 diye "düzeltirse" buton kutusu
      iki kat parlar ve %16,5'lik eski kusur geri gelir.)
   2) AYRINTI ALFALARI KALİBRE EDİLDİ. Kalan fark kontur ve ayrıntı
      mürekkebiydi (kartta iki satır + iki kontur, butonda tek hap). Her kutu
      iki kez ölçüldü — ayrıntısız (KAL=0) ve ayrıntılı (KAL=1) — ve aradaki
      doğrusal ilişkiden her kutunun çarpanı çözüldü. Değerler ve öncesi/
      sonrası ölçüm dosya sonundaki ÖLÇÜM bloğunda. */
const BS_ALAN = [832, 640, 1024, 476];
const BS_KAL = [0.814, 0.912, 0.602, 1.214];
function bilesenSimgesi(i, tx, ty, A, p) {
  const k = BS_KAL[i];
  const ak = `rgba(${A},${((0.30 + 0.48 * p) * k).toFixed(3)})`;
  const c = `rgba(255,255,255,${((0.13 + 0.22 * p) * k).toFixed(3)})`;
  const d = `rgba(255,255,255,${((0.035 + 0.040 * p) * 448 / BS_ALAN[i]).toFixed(3)})`;
  if (i === 0) {
    /* buton — iki durum (birincil / ikincil). İKİNCİ HAP MÜREKKEP DENGESİ İÇİN
       EKLENDİ: tek hap, kartın iki konturu + iki satırı yanında çok az mürekkep
       taşıyordu (ölçüm: 1,04'e karşı 4,15) ve alfayı büyütmek 1'i aşıyordu.
       Bir bileşen kutusunda butonun iki durumunun durması zaten doğal. */
    return `<rect x="${tx + 7}" y="${ty + 14}" width="32" height="13" rx="6.5" fill="${d}"
              stroke="${ak}" stroke-width="1.5"/>
            <rect x="${tx + 15}" y="${ty + 19}" width="16" height="3" rx="1.5" fill="${ak}"/>
            <rect x="${tx + 7}" y="${ty + 33}" width="32" height="13" rx="6.5" fill="${d}"
              stroke="${c}" stroke-width="1.4"/>
            <rect x="${tx + 15}" y="${ty + 38}" width="16" height="3" rx="1.5" fill="${c}"/>`;
  }
  if (i === 1) {
    /* form alanı — altında aksan çizgisi (odak hâli); mürekkep dengesi için */
    return `<rect x="${tx + 7}" y="${ty + 18}" width="32" height="20" rx="4" fill="${d}"
              stroke="${c}" stroke-width="1.4"/>
            <rect x="${tx + 12}" y="${ty + 26.5}" width="14" height="3" rx="1.5" fill="${c}"/>
            <rect x="${tx + 30}" y="${ty + 22}" width="1.8" height="12" rx="0.9" fill="${ak}"/>
            <rect x="${tx + 11}" y="${ty + 42}" width="24" height="2.6" rx="1.3" fill="${ak}"/>`;
  }
  if (i === 2) {
    /* kart — görsel bloğu DOLU değil KONTURLU: ölçüm gerekçesi dosya sonunda */
    return `<rect x="${tx + 7}" y="${ty + 12}" width="32" height="32" rx="4" fill="${d}"
              stroke="${c}" stroke-width="1.4"/>
            <rect x="${tx + 11}" y="${ty + 16}" width="24" height="12" rx="2" fill="none"
              stroke="${ak}" stroke-width="1.4"/>
            <rect x="${tx + 11}" y="${ty + 32}" width="24" height="3" rx="1.5" fill="${c}"/>
            <rect x="${tx + 11}" y="${ty + 38}" width="15" height="3" rx="1.5" fill="${c}"/>`;
  }
  /* navigasyon */
  let g = `<rect x="${tx + 6}" y="${ty + 21}" width="34" height="14" rx="4" fill="${d}"
             stroke="${c}" stroke-width="1.4"/>`;
  for (let k = 0; k < 4; k++) {
    g += `<rect x="${tx + 10 + k * 7.4}" y="${ty + 25.5}" width="5" height="5" rx="1.5" fill="${ak}"/>`;
  }
  return g;
}

/* Ekranların içine yerleşen bileşen örnekleri — kütüphanedekilerin aynısı. */
function ekranBileseni(tur, x, y, w, A, k) {
  const ak = `rgba(${A},${(0.26 + 0.44 * k).toFixed(3)})`;
  const c = `rgba(255,255,255,${(0.11 + 0.19 * k).toFixed(3)})`;
  const d = `rgba(255,255,255,${(0.030 + 0.035 * k).toFixed(3)})`;
  if (tur === 'nav') {
    let g = `<rect x="${x}" y="${y}" width="${w}" height="11" rx="3" fill="${d}" stroke="${c}" stroke-width="1"/>`;
    for (let i = 0; i < 4; i++) g += `<rect x="${x + 5 + i * 10.5}" y="${y + 3.5}" width="4" height="4" rx="1.2" fill="${ak}"/>`;
    return g;
  }
  if (tur === 'kart') {
    return `<rect x="${x}" y="${y}" width="${w}" height="34" rx="4" fill="${d}" stroke="${c}" stroke-width="1"/>
            <rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="14" rx="2" fill="${ak}"/>
            <rect x="${x + 4}" y="${y + 22}" width="${w - 8}" height="3" rx="1.5" fill="${c}"/>
            <rect x="${x + 4}" y="${y + 27}" width="${(w - 8) * 0.6}" height="3" rx="1.5" fill="${c}"/>`;
  }
  if (tur === 'form') {
    return `<rect x="${x}" y="${y}" width="${w}" height="13" rx="3" fill="${d}" stroke="${c}" stroke-width="1"/>
            <rect x="${x + 5}" y="${y + 5}" width="18" height="3" rx="1.5" fill="${c}"/>
            <rect x="${x + w - 8}" y="${y + 3}" width="1.6" height="7" rx="0.8" fill="${ak}"/>`;
  }
  /* btn */
  return `<rect x="${x + 6}" y="${y}" width="${w - 12}" height="13" rx="6.5" fill="${d}"
            stroke="${ak}" stroke-width="1.3"/>
          <rect x="${x + 14}" y="${y + 5}" width="${w - 28}" height="3" rx="1.5" fill="${ak}"/>`;
}

/* ── 03 · KULLANICI TESTİ VE PROTOTİP DOĞRULAMA ──────────────────────────
   Üstte iki eşit katılımcı (yüzsüz siluet), ortada tıklanabilir prototip ve
   geri dönüş yayı, altta yüksek çözünürlüklü tasarım + teslim kapısı.
   ÖLÇÜ NOTU — IŞIK DARBESİ: bu durakta darbe (bx+120, DY+204) noktasında,
   yarıçapı 52. Eşitlik taşıyan gruplar dışarıda: katılımcı kartları
   DY+10–58, darbeye 148,5 ve 149,7 px (yazım "150+" diyordu — ikisi de
   150'nin ALTINDA, denetimde düzeltildi; iddia için önemli olan yarıçapın
   ~2,9 katı uzakta olmaları); onaylı ekran çipleri DY+262'de, en yakın
   nokta 69,3 px (uzak olan 94,0 px). Takılma halkası darbenin tam ortasına
   DEĞİL, üst kenarına oturuyor: aşağıdaki ölçüme bak. */
function prototipTesti(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- iki katılımcı: "gerçek kullanıcılarla VEYA iç ekiple" -------------
     İkisi de geçerli olduğu için birebir aynı: aynı kart, aynı siluet, aynı
     y, aynı gecikme, durak merkezine simetrik (bx+75 / bx+171, merkez bx+123).
     YÜZ YOK: baş dairesi ve omuz yayı; göz/ağız/saç çizilmedi. */
  const kat = kis01((p - 0.06) / 0.30);
  [bx + 71, bx + 175].forEach((cx) => {
    s += `<rect x="${cx - 22}" y="${DY + 10}" width="44" height="48" rx="9" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${cx - 22}" y="${DY + 10}" width="44" height="48" rx="9" fill="none"
            stroke="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<circle cx="${cx}" cy="${DY + 27}" r="7"
            fill="rgba(255,255,255,${(0.14 + 0.30 * kat * p).toFixed(3)})"/>`;
    s += `<path d="M${cx - 11} ${DY + 50} a11 11 0 0 1 22 0 Z"
            fill="rgba(255,255,255,${(0.14 + 0.30 * kat * p).toFixed(3)})"/>`;
    s += `<line x1="${cx}" y1="${DY + 58}" x2="${cx}" y2="${DY + 68}"
            stroke="rgba(${A},${(0.16 + 0.42 * kat * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="3 4" stroke-dashoffset="-${(faz * 28).toFixed(1)}"/>`;
  });

  /* --- tıklanabilir prototip: iki ekran, aralarında ileri ok ve geri yay --
     ÖLÇÜLDÜ, YENİDEN YERLEŞTİRİLDİ: ilk iki sürümde geri dönüş yayı ekranların
     ALTINDAN geçiyordu (DY+175–208). Bu durakta akan cam borunun ekseni tam
     DY+204 ve gövdesi 20 px kalınlığında; önizlemede yayın ortası borunun
     parlak kesikleri içinde kayboluyor, geriye kopuk bir ok ucu ve kopuk bir
     halka kalıyordu. Ekranlar 76→70 px'e daraltılıp aradaki boşluk 20→34 px'e
     açıldı: ileri ok ve geri yay artık İKİ EKRANIN ARASINDA.

     DENETİMDE YENİDEN ÖLÇÜLDÜ — bu paragrafın son iki cümlesi YANLIŞTI,
     aşağıdakiler ölçülmüş değerlerdir (darbe bx+120, DY+204; yarıçap 52;
     boru ekseni bu x'te DY+204,6, gövde yarı kalınlığı 10):
       · İLERİ OK (DY+108): darbeye en yakın noktası 96 px — gerçekten
         tamamen dışında, hem gövdenin hem halenin.
       · GERİ DÖNÜŞ YAYI: kübiğin en alt noktası (bx+122,7, DY+152,3),
         darbe merkezine 51,8 px. Yani "darbenin TAMAMEN dışında" DEĞİL,
         yarıçapın 0,2 px içinde — sınırda. Borunun 10 px'lik gövdesinden
         52,4 px yukarıda, ama gövdenin bulanık halesi oraya zayıfça
         ulaşıyor. Kırpma görüntüsünde yay ve ok ucu kopmadan okunuyor;
         yerleştirme geçerli, YANLIŞ OLAN "tamamen" sözcüğüydü.
       · TESPİT HALKASI: kodda cy = DY+152 (yazım "DY+148" diyordu, 4 px
         yanlıştı). Merkezi darbeye 52,09 px — yarıçapın hemen dışında;
         ama halkanın r=9 alt kenarı 43,1 px'te, yani gradyanın İÇİNDE.
         Oradaki aksan alfası ≈ 0,15 (darbeGrad: %28'de 0,72 → %100'de 0),
         gözle bakınca alt kenarda hafif bir parlama var. "Hiç yıkanmıyor"
         iddiası yanlıştı; doğrusu: yıkanma var ama halka okunur kalıyor. */
  const dokun = (faz * 2) % 1;                         // turda 2 dokunuş
  const tetik = Math.max(0, 1 - dokun * 3);            // dokunuşun hemen ardı
  [bx + 36, bx + 140].forEach((sx, i) => {
    const sy = DY + 70, sw = 70, sh = 106;
    const g = i === 0 ? 1 : kis01(0.35 + 0.65 * tetik); // sağdaki ekran dokununca açılır
    s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10" fill="rgba(14,17,24,.68)"/>`;
    s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10"
            fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.12 + 0.20 * p * g).toFixed(3)})" stroke-width="1.3"/>`;
    const c = `rgba(255,255,255,${(0.10 + 0.18 * p * g).toFixed(3)})`;
    s += `<rect x="${sx + 9}" y="${sy + 12}" width="38" height="7" rx="3.5" fill="${c}"/>`;
    if (i === 0) {
      s += `<rect x="${sx + 9}" y="${sy + 26}" width="52" height="30" rx="4" fill="rgba(255,255,255,.028)"
              stroke="${c}" stroke-width="1.1"/>`;
      s += `<rect x="${sx + 9}" y="${sy + 62}" width="52" height="5" rx="2.5" fill="${c}"/>`;
      s += `<rect x="${sx + 9}" y="${sy + 71}" width="34" height="5" rx="2.5" fill="${c}"/>`;
    } else {
      [0, 1, 2, 3].forEach((r) => {
        s += `<rect x="${sx + 9}" y="${sy + 28 + r * 13}" width="${[52, 40, 46, 34][r]}" height="6" rx="3" fill="${c}"/>`;
      });
    }
    /* eylem hapı — soldaki dokunma hedefi */
    s += `<rect x="${sx + 16}" y="${sy + 84}" width="38" height="14" rx="7"
            fill="rgba(${A},${(0.10 + 0.16 * p * g).toFixed(3)})"
            stroke="rgba(${A},${(0.24 + 0.50 * p * g).toFixed(3)})" stroke-width="1.3"/>`;
  });
  /* dokunma halkası: turda iki kez büyüyüp sönüyor → dikişsiz.
     ÖLÇÜ NOTU — İLK SÜRÜM YANLIŞ OKUNUYORDU: halkanın en büyük yarıçapı 27'ydi,
     hapın çevresini aşıp ekran çerçevesinin ALTINA taşıyordu; önizlemede
     dokunma değil "hapın etrafına çizilmiş balon" gibi görünüyordu. Yarıçap
     ekranın içinde kalacak şekilde küçültüldü: hap merkezi DY+161, en büyük
     yarıçap 14 → en alt nokta DY+175, ekranın alt kenarı DY+176. */
  const tx0 = bx + 71, ty0 = DY + 161;
  [0, 0.42].forEach((g) => {
    const u = (dokun + g) % 1;
    s += `<circle cx="${tx0}" cy="${ty0}" r="${(4 + 10 * u).toFixed(1)}" fill="none"
            stroke="rgba(${A},${(0.70 * (1 - u) * (1 - u) * p).toFixed(3)})" stroke-width="1.8"/>`;
  });
  s += `<circle cx="${tx0}" cy="${ty0}" r="4.2" fill="rgba(255,255,255,${(0.30 + 0.55 * p).toFixed(2)})"/>`;
  /* ileri ok — dokunuşla yanar */
  s += `<line x1="${bx + 109}" y1="${DY + 108}" x2="${bx + 130}" y2="${DY + 108}"
          stroke="rgba(${A},${(0.16 + 0.30 * p + 0.36 * tetik * p).toFixed(3)})" stroke-width="1.8"
          stroke-linecap="round"/>`;
  s += `<path d="M${bx + 130} ${DY + 104} L${bx + 136} ${DY + 108} L${bx + 130} ${DY + 112} Z"
          fill="rgba(${A},${(0.20 + 0.32 * p + 0.40 * tetik * p).toFixed(3)})"/>`;

  /* --- geri dönüş yayı: akışta takılma ----------------------------------
     Kullanıcı sağdaki ekrandan sola dönüyor. Kardeş .akis figüründeki kesik
     "hata durumları" dalıyla karışmasın diye ünlem işareti KULLANILMADI. */
  const bul = kis01((p - 0.28) / 0.34);
  s += `<path d="M${bx + 138} ${DY + 128} C${bx + 136} ${DY + 160} ${bx + 110} ${DY + 160} ${bx + 108} ${DY + 130}"
          fill="none" stroke="rgba(${A},${(0.16 + 0.46 * p * bul).toFixed(3)})" stroke-width="1.7"
          stroke-dasharray="5 6" stroke-dashoffset="${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 104} ${DY + 136} L${bx + 107.5} ${DY + 128} L${bx + 112} ${DY + 134.5} Z"
          fill="rgba(${A},${(0.20 + 0.50 * p * bul).toFixed(3)})"/>`;
  const nabiz = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 3);
  s += `<circle cx="${bx + 123}" cy="${DY + 152}" r="9"
          fill="rgba(${A},${(0.08 + 0.16 * bul * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.55 * bul * p * (0.45 + 0.55 * nabiz)).toFixed(3)})" stroke-width="1.8"/>`;
  s += `<circle cx="${bx + 123}" cy="${DY + 152}" r="3"
          fill="rgba(255,255,255,${(0.20 + 0.55 * bul * p).toFixed(3)})"/>`;

  /* --- bulgu jetonu: takılma noktasından yüksek çözünürlüklü tasarıma --- */
  const jU = (faz * 2) % 1;
  const jx = bx + 116 + (bx + 56 - (bx + 116)) * jU;
  const jy = DY + 160 + (DY + 210 - (DY + 160)) * jU;
  s += `<line x1="${bx + 116}" y1="${DY + 160}" x2="${bx + 56}" y2="${DY + 210}"
          stroke="rgba(${A},${(0.12 + 0.32 * p * bul).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}"/>`;
  s += `<rect x="${(jx - 4).toFixed(1)}" y="${(jy - 3).toFixed(1)}" width="8" height="6" rx="2"
          fill="rgba(${A},${(0.55 * Math.sin(Math.PI * jU) * p * bul).toFixed(3)})"/>`;

  /* --- yüksek çözünürlüklü tasarım: bulgu işlenir -----------------------
     Sayfa: "Bulgular yüksek çözünürlüklü tasarıma işlenir." Renk paleti bu
     ekranda var (sayfanın SSS'i yüksek çözünürlüklü tasarımı "renk paleti ...
     ile giydirilmiş" diye tanımlıyor); wireframe'de yoktu. Bir blok, bulgu
     gelince YENİ yerine oturur; eski yeri kesik hayalet olarak kalıyor. */
  const isle = kis01((p - 0.46) / 0.34);
  const hX = bx + 18, hY = DY + 216, hW = 70, hH = 108;
  s += `<rect x="${hX}" y="${hY}" width="${hW}" height="${hH}" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${hX}" y="${hY}" width="${hW}" height="${hH}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${hX + 9}" y="${hY + 11}" width="34" height="8" rx="3"
          fill="rgba(${A},${(0.30 + 0.46 * p).toFixed(3)})"/>`;
  s += `<rect x="${hX + 9}" y="${hY + 25}" width="52" height="26" rx="4"
          fill="rgba(${A},${(0.14 + 0.24 * p).toFixed(3)})"/>`;
  s += `<rect x="${hX + 9}" y="${hY + 57}" width="52" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.11 + 0.18 * p).toFixed(3)})"/>`;
  /* taşınan blok: eski yer kesik, yeni yer dolu */
  s += `<rect x="${hX + 9}" y="${hY + 68}" width="26" height="12" rx="4" fill="none"
          stroke="rgba(255,255,255,${(0.10 * (1 - isle) + 0.06).toFixed(3)})" stroke-width="1"
          stroke-dasharray="3 3"/>`;
  s += `<rect x="${(hX + 9 + 26 * isle).toFixed(1)}" y="${hY + 68}" width="${(26 + 10 * isle).toFixed(1)}" height="12" rx="4"
          fill="rgba(${A},${(0.22 + 0.42 * p).toFixed(3)})"/>`;
  s += `<rect x="${hX + 18}" y="${hY + 88}" width="34" height="12" rx="6"
          fill="rgba(${A},${(0.16 + 0.26 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.26 + 0.44 * p).toFixed(3)})" stroke-width="1.2"/>`;

  /* --- teslim kapısı: yalnız doğrulanmış ekranlar geçer ------------------
     İki onaylı çip birebir aynı (aynı y, aynı ölçü, aynı gecikme). Kapının
     solunda kalan çip BİLEREK farklı — sayfanın kendi ayrımı. */
  s += `<line x1="${bx + 92}" y1="${DY + 282}" x2="${bx + 104}" y2="${DY + 282}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="4 5" stroke-dashoffset="-${(faz * 36).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 104} ${DY + 278.6} L${bx + 109} ${DY + 282} L${bx + 104} ${DY + 285.4} Z"
          fill="rgba(${A},${(0.22 + 0.46 * p).toFixed(3)})"/>`;
  /* doğrulanmamış çip — onaylılarla aynı iç düzen, ama kesik çerçeve, sönük
     ve onay halkası YOK: sayfanın "yalnızca doğrulanmış ekranlar" ayrımı. */
  s += `<rect x="${bx + 112}" y="${DY + 262}" width="26" height="40" rx="5"
          fill="rgba(255,255,255,.018)"
          stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.2" stroke-dasharray="4 4"/>`;
  s += `<rect x="${bx + 117}" y="${DY + 269}" width="16" height="4" rx="2"
          fill="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 117}" y="${DY + 277}" width="16" height="3" rx="1.5"
          fill="rgba(255,255,255,${(0.05 + 0.06 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 117}" y="${DY + 286}" width="10" height="3" rx="1.5"
          fill="rgba(255,255,255,${(0.05 + 0.06 * p).toFixed(3)})"/>`;
  /* kapı */
  s += `<line x1="${bx + 150}" y1="${DY + 248}" x2="${bx + 150}" y2="${DY + 318}"
          stroke="rgba(${A},${(0.18 + 0.40 * p).toFixed(3)})" stroke-width="1.5" stroke-dasharray="6 5"/>`;
  /* iki onaylı çip */
  const gec = kis01((p - 0.34) / 0.36);
  [bx + 158, bx + 194].forEach((cx) => {
    s += `<rect x="${cx}" y="${DY + 262}" width="26" height="40" rx="5" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${cx}" y="${DY + 262}" width="26" height="40" rx="5"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.42 * gec).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${cx + 5}" y="${DY + 269}" width="16" height="4" rx="2"
            fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
    s += `<rect x="${cx + 5}" y="${DY + 277}" width="16" height="3" rx="1.5"
            fill="rgba(255,255,255,${(0.08 + 0.13 * p).toFixed(3)})"/>`;
    const qx = cx + 13, qy = DY + 291;
    s += `<circle cx="${qx}" cy="${qy}" r="7.4" fill="rgba(${A},${(0.10 * gec).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.54 * gec).toFixed(3)})" stroke-width="1.4"/>`;
    s += `<path d="M${qx - 3.4} ${qy + 0.3} L${qx - 1} ${qy + 3} L${qx + 3.8} ${qy - 2.8}"
            fill="none" stroke="rgba(255,255,255,${(0.20 + 0.68 * gec).toFixed(2)})"
            stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="12" stroke-dashoffset="${(12 * (1 - gec)).toFixed(2)}"/>`;
  });

  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
