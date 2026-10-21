/* Kuchařka — data receptů.
   Tento soubor upravuje Claude: nový recept = nový objekt v RECIPES, úprava = zvýšit version a přidat záznam do history.
   Jednotky: g, ml, tbsp, tsp, ks, nebo vlastní text (neškáluje se, pokud scale:false). a:0 = "podle chuti". */

const WM = f => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + f + '?width=900';
const WP = f => 'https://commons.wikimedia.org/wiki/File:' + f;

window.APP_VERSION = '2026-10-21.3';

window.KITCHEN = {
  intro: 'Plně vybavená kuchyně. Recepty píšu přímo na tohle vybavení — když něco přibude nebo se něco chová jinak, napiš mi to a doplním.',
  items: [
    { id: 'sklokeramika', name: 'Sklokeramická deska', group: 'Vaření', note: 'Elektrická — reaguje pomalu. Ztlumit o chvilku dřív, než se zdá potřeba. U papiňáku po natlakování stáhnout na ⅓ výkonu.' },
    { id: 'trouba', name: 'Horkovzdušná trouba', group: 'Vaření', note: 'Teploty v receptech jsou pro horní/spodní ohřev; s horkovzduchem ubrat cca 20 °C.' },
    { id: 'mikrovlnka', name: 'Mikrovlnka', group: 'Vaření', note: 'Na ohřev zbytků a předvaření brambor (tortilla).' },
    { id: 'papinak', name: 'Papiňák', group: 'Vaření', note: 'Guláš 35 min pod tlakem, paprikáš. Po natlakování plotnu hned stáhnout.' },
    { id: 'ryzovar', name: 'Rýžovar', group: 'Vaření', note: 'Obvykle 1–2 hrnky rýže; je rychlejší než 40minutové návody — řídit se pípnutím.' },
    { id: 'gril', name: 'Kontaktní gril (oboustranný)', group: 'Vaření', note: 'Maso i tousty.' },
    { id: 'robot', name: 'Bosch MUM 5', group: 'Pečení', note: 'Na máslo s cukrem míchací metla (ne šlehací), stupeň 4. Vejce stupeň 3, mouka stupeň 1 jen do spojení.' },
    { id: 'forma', name: 'Hranatá forma cca 30 × 11 cm', group: 'Pečení', note: 'Bábovka, banana bread. Vždy pečicí papír s přesahem.' },
    { id: 'plech', name: 'Plech do trouby', group: 'Pečení', note: 'Vždy pečicí papír.' },
    { id: 'pekac', name: 'Pekáč (s víkem / alobal)', group: 'Pečení', note: 'Pečená plec.' },
    { id: 'panev24', name: 'Titanová pánev 24 cm', group: 'Pánve a hrnce', note: 'Nepřilnavá — vejce, lívance (3–4 najednou).' },
    { id: 'wok', name: 'Wok s kamenným povrchem', group: 'Pánve a hrnce', note: 'Široké dno — asijská jídla, větší dávky, těstoviny s omáčkou v jednom.' },
    { id: 'hrnec', name: 'Hrnce', group: 'Pánve a hrnce', note: 'Polévky, guláš, rizoto.' },
    { id: 'vaha', name: 'Kuchyňská váha', group: 'Pomocníci', note: 'Proto jsou sypké suroviny v gramech.' }
  ]
};

window.PEOPLE = ['Lukáš', 'Tomáš', 'Anička'];

window.RECIPES = [
{
  id: 'kure-kari', title: 'Kuře na žlutém kari', subtitle: 'Mírné kari s kokosovým mlékem na jedné pánvi, bez chilli.',
  category: 'Hlavní jídlo', time: 35, servings: 4, equipment: ['wok', 'ryzovar'], tags: ['hit', 'kure', 'ryze', 'dvakrat'],
  kidsLiked: true,
  photo: { src: WM('Creamy_Chicken_Curry.jpg'), page: WP('Creamy_Chicken_Curry.jpg') },
  key: 'Koření sypej až do pánve stažené z plotny. V horkém tuku se rozvoní za pár vteřin, na přímém ohni by stejně rychle zhořklo.',
  ingredients: [
    { n: 'kuřecí prsa, kostky ~2,5 cm', a: 550, u: 'g' },
    { n: 'velká cibule', a: 1, u: 'ks' },
    { n: 'stroužky česneku', a: 2, u: 'ks' },
    { n: 'řepkový olej', a: 2, u: 'tbsp' },
    { n: 'kari koření (nepálivé)', a: 1.5, u: 'tbsp' },
    { n: 'mletá kurkuma', a: 1, u: 'tsp' },
    { n: 'bramborový škrob', a: 1, u: 'tbsp' },
    { n: 'kokosové mléko', a: 400, u: 'ml' },
    { n: 'kuřecí vývar (bezlepkový) nebo voda', a: 150, u: 'ml' },
    { n: 'sůl', a: 1, u: 'tsp' },
    { n: 'cukr', a: 1, u: 'tsp' },
    { n: 'citronová šťáva', a: 1, u: 'tbsp' },
    { n: 'rýže', a: 300, u: 'g' }
  ],
  steps: [
    { t: 'Nachystat', d: 'Kuře nakrájej na kostky a osol polovinou soli. Nakrájej cibuli, prolisuj česnek. Kari, kurkumu a škrob smíchej v malé misce — budeš je sypat rychle.' },
    { t: 'Rýže', d: 'Pusť rýži v rýžovaru. Kari stihneš mezitím.', s: 720 },
    { t: 'Cibule', d: 'Ve woku rozehřej olej a na středním stupni osmahni cibuli doměkka a dosklovata. Poslední minutu přidej česnek.', s: 360 },
    { t: 'Koření mimo plotnu', d: 'Stáhni wok z plotny. Vsyp směs koření se škrobem a asi půl minuty míchej v horkém tuku.', s: 40, key: true },
    { t: 'Zalít', d: 'Vrať na mírný stupeň a za stálého míchání přilévej kokosové mléko a vývar. Rozmíchej hrudky a nech přijít k varu.' },
    { t: 'Dovařit kuře', d: 'Vlož syrové kuře do bublající omáčky, ztlum na minimum a vař pod pokličkou. Nesmí prudce vřít, kuře by vyschlo.', s: 720 },
    { t: 'Dochutit', d: 'Vmíchej cukr, citron a zbytek soli. Nech 5 minut odstát mimo plotnu, omáčka zhoustne.', s: 300 }
  ],
  tips: [
    'Kuře nesmaž předem — když se táhne přímo v omáčce, zůstane měkké i druhý den.',
    'Kari dej nejdřív 1 tbsp, ochutnej po zalití a případně přidej.',
    'Řídká omáčka: poslední 3 minuty bez pokličky. Hustá: přilij vývar.',
    'Dospělí si přidají chilli na talíři, dětská porce zůstane jemná.',
    'Dvojitá dávka: v lednici vydrží 3 dny a druhý den chutná líp.'
  ],
  notes: [{ who: 'Lukáš', date: '2026-09', text: 'Děti snědly dva dny po sobě, zabralo.' }],
  version: 2, updated: '2026-10-21', source: 'chat 16. 10. 2026',
  history: [{ v: 2, date: '2026-10-21', text: 'Hladká mouka nahrazena bramborovým škrobem (bezlepkové).' }]
},
{
  id: 'kureci-testoviny', title: 'Kuřecí těstoviny s paprikou', subtitle: 'Rajčatová omáčka z passaty, jemná pro děti, vše ve woku.',
  category: 'Hlavní jídlo', time: 35, servings: 4, equipment: ['wok', 'hrnec'], tags: ['kure', 'testoviny', 'rychle', 'dvakrat'],
  photo: { src: WM('Spaghetti_al_Pomodoro.JPG'), page: WP('Spaghetti_al_Pomodoro.JPG') },
  key: 'Mletou papriku vmíchej až po stažení woku z plotny — na rozpálené plotně se hned připálí a zhořkne.',
  ingredients: [
    { n: 'bezlepkové těstoviny', a: 400, u: 'g' },
    { n: 'kuřecí prsa', a: 500, u: 'g' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'stroužky česneku', a: 3, u: 'ks' },
    { n: 'červená paprika', a: 1, u: 'ks' },
    { n: 'passata', a: 500, u: 'ml' },
    { n: 'olej', a: 2, u: 'tbsp' },
    { n: 'sůl', a: 1, u: 'tsp' },
    { n: 'sladká mletá paprika', a: 1, u: 'tsp' },
    { n: 'oregano nebo bazalka (sušené)', a: 1, u: 'tsp' },
    { n: 'cukr (proti kyselosti)', a: 0.25, u: 'tsp' },
    { n: 'Rama nebo máslo', a: 1, u: 'tbsp' }
  ],
  steps: [
    { t: 'Příprava', d: 'Kuře na kostky cca 2 cm, cibuli nadrobno, papriku na proužky, česnek nasekej.' },
    { t: 'Těstoviny', d: 'Osolenou vodu přiveď k varu, vař těstoviny podle obalu. Před slitím odeber hrnek vody.', s: 600 },
    { t: 'Cibule a paprika', d: 'Ve woku na oleji restuj cibuli a papriku na středním stupni, až cibule zesklovatí.', s: 240 },
    { t: 'Kuře', d: 'Přidej kuře a sůl, opékej, dokud maso nezbělá ze všech stran.', s: 360 },
    { t: 'Česnek a koření', d: 'Přidej česnek a minutu míchej. Stáhni wok z plotny a vmíchej papriku a oregano.', s: 60, key: true },
    { t: 'Omáčka', d: 'Vrať na plotnu, vlij passatu, přidej cukr a nech mírně probublávat. Hustou omáčku uvolni vodou z těstovin.', s: 720 },
    { t: 'Spojení', d: 'Vmíchej Ramu, přidej slité těstoviny a promíchej. Dochuť solí.' }
  ],
  tips: [
    'Vodu na těstoviny postav, když začneš restovat cibuli — bude to hotové najednou.',
    'Škrobová voda z těstovin omáčku spojí a přilne k těstovinám.',
    'Hrnec od těstovin hned vypláchni horkou vodou, škrob nezaschne.',
    'Krémovější verze: na konci pár tbsp kokosového mléka místo Ramy.'
  ],
  notes: [], version: 1, updated: '2026-10-19', source: 'chat 19. 10. 2026', history: []
},
{
  id: 'kureci-rizoto', title: 'Kuřecí rizoto s paprikou', subtitle: 'Krémová rýže v jednom hrnci, jemná pro děti.',
  category: 'Hlavní jídlo', time: 40, servings: 4, equipment: ['hrnec'], tags: ['kure', 'ryze', 'jedno-nadobi', 'dvakrat'],
  photo: { src: WM('Risotto_(1).jpg'), page: WP('Risotto_(1).jpg') },
  key: 'Horký vývar přilévej postupně ve třech dávkách a občas zamíchej. Míchání uvolní škrob a rizoto je krémové i bez smetany.',
  ingredients: [
    { n: 'rýže arborio (nebo kulatozrnná)', a: 300, u: 'g' },
    { n: 'kuřecí prsa', a: 500, u: 'g' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'stroužky česneku', a: 2, u: 'ks' },
    { n: 'červená paprika', a: 1, u: 'ks' },
    { n: 'horký vývar (bezlepkový bujón)', a: 1000, u: 'ml' },
    { n: 'olej', a: 1, u: 'tbsp' },
    { n: 'Rama nebo máslo', a: 2, u: 'tbsp' },
    { n: 'sůl', a: 0.5, u: 'tsp' },
    { n: 'sladká mletá paprika', a: 0.5, u: 'tsp' },
    { n: 'eidam, nastrouhaný', a: 60, u: 'g' },
    { n: 'citronová šťáva', a: 1, u: 'tsp' }
  ],
  steps: [
    { t: 'Příprava', d: 'Kuře na menší kostky, cibuli nadrobno, papriku na kostičky, česnek nasekej. Vývar připrav v konvici a rozpusť v něm bujón.' },
    { t: 'Cibule a paprika', d: 'V hrnci rozehřej olej a lžíci Ramy, restuj cibuli s paprikou, až zesklovatí.', s: 240 },
    { t: 'Kuře', d: 'Přidej kuře a sůl, opékej, dokud nezbělá.', s: 300 },
    { t: 'Rýže', d: 'Přidej česnek a suchou rýži a míchej, až zrnka na okrajích zprůsvitní. Stáhni z plotny a vmíchej papriku.', s: 120 },
    { t: 'První dávka vývaru', d: 'Vrať na plotnu, vlij třetinu vývaru a nech mírně pobublávat. Občas zamíchej.', s: 360, key: true },
    { t: 'Druhá dávka', d: 'Až se vývar skoro vsákne, přilij další třetinu.', s: 360 },
    { t: 'Poslední dávka', d: 'Přilij zbytek a vař, až je rýže měkká, uprostřed lehce pevná. Hustou uvolni horkou vodou.', s: 360 },
    { t: 'Dokončení', d: 'Stáhni z plotny, vmíchej zbytek Ramy, sýr a citron. Přikryj, nech dojít a dochuť.', s: 120 }
  ],
  tips: [
    'Rýži nepropírej — škrob na povrchu je přesně to, co chceš.',
    'Elektrickou plotnu stáhni na minimum o chvilku dřív, rizoto ještě dotáhne.',
    'Rizoto má být spíš tekoucí než suchá hromádka.',
    'Hrášek nebo kukuřici ze sklenice přidej v posledním kroku, děti to mají rády.'
  ],
  notes: [], version: 1, updated: '2026-10-20', source: 'chat 20. 10. 2026', history: []
},
{
  id: 'fazolova-polevka', title: 'Fazolová polévka s rajčaty', subtitle: 'Hustá polévka z plechovek, zahuštěná fazolemi místo mouky.',
  category: 'Polévka', time: 30, servings: 4, equipment: ['hrnec'], tags: ['polevka', 'rychle', 'jedno-nadobi'],
  photo: { src: WM('Fasolka_po_breto%C5%84sku.jpg'), page: WP('Fasolka_po_breto%C5%84sku.jpg') },
  key: 'Asi třetinu fazolí rozmačkej přímo v hrnci. Polévka zhoustne bez mouky a jíšky.',
  ingredients: [
    { n: 'fazole v plechovce (400 g)', a: 2, u: 'ks' },
    { n: 'krájená rajčata z plechovky', a: 400, u: 'g' },
    { n: 'horký vývar (bezlepkový bujón)', a: 750, u: 'ml' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'stroužky česneku', a: 2, u: 'ks' },
    { n: 'šunka (volitelně)', a: 100, u: 'g' },
    { n: 'olej', a: 2, u: 'tbsp' },
    { n: 'sladká mletá paprika', a: 1, u: 'tsp' },
    { n: 'majoránka', a: 1, u: 'tsp' },
    { n: 'sůl', a: 0.5, u: 'tsp' },
    { n: 'cukr', a: 0.25, u: 'tsp' },
    { n: 'ocet nebo citronová šťáva', a: 1, u: 'tsp' }
  ],
  steps: [
    { t: 'Příprava', d: 'Cibuli nadrobno, česnek nasekej, šunku na kostičky. Fazole sceď a propláchni, připrav horký vývar.' },
    { t: 'Cibule a šunka', d: 'V hrnci na oleji restuj cibuli a šunku, až cibule zesklovatí.', s: 300 },
    { t: 'Česnek a paprika', d: 'Přidej česnek a minutu míchej. Stáhni z plotny a vmíchej papriku.', s: 60 },
    { t: 'Vaření', d: 'Vrať na plotnu, přidej rajčata, vývar, fazole, sůl a cukr. Přiveď k varu a nech mírně probublávat.', s: 900 },
    { t: 'Zahuštění', d: 'Šťouchadlem rozmačkej asi třetinu fazolí přímo v hrnci a promíchej.', key: true },
    { t: 'Majoránka', d: 'Vmíchej rozmnutou majoránku a povař.', s: 180 },
    { t: 'Dochucení', d: 'Stáhni z plotny, přidej ocet nebo citron a dochuť solí.' }
  ],
  tips: [
    'Fazole propláchni — zbavíš se slizkého nálevu.',
    'Majoránku až na konci, dlouhým varem ztrácí vůni.',
    'Druhý den je polévka hustší — při ohřevu přilij vodu.',
    'Fazole Heinz v omáčce fungují taky, jen vynech cukr a zkontroluj lepek.'
  ],
  notes: [], version: 1, updated: '2026-10-20', source: 'chat 20. 10. 2026', history: []
},
{
  id: 'veprova-plec', title: 'Pečená vepřová plec s kmínem', subtitle: 'Klasika s výpekem, k hranolkám. 1,2 kg masa = 4 porce.',
  category: 'Hlavní jídlo', time: 160, servings: 4, equipment: ['trouba', 'pekac'], tags: ['veprove', 'trouba', 'vikend'],
  photo: { src: WM('Knedlo_vepro_zelo_czech_food.jpg'), page: WP('Knedlo_vepro_zelo_czech_food.jpg') },
  key: 'Dno pekáče nesmí nikdy vyschnout. Každých 30 minut zkontroluj a dolij horkou vodu, jinak se výpek připálí a zhořkne.',
  ingredients: [
    { n: 'vepřová plec (s kůží nebo tukem)', a: 1200, u: 'g' },
    { n: 'sůl', a: 2, u: 'tsp' },
    { n: 'kmín celý', a: 1, u: 'tbsp' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'stroužky česneku (nepovinné)', a: 3, u: 'ks' },
    { n: 'sádlo nebo máslo', a: 1, u: 'tbsp' },
    { n: 'voda na podlévání (+ dolévat)', a: 300, u: 'ml' }
  ],
  steps: [
    { t: 'Příprava masa', d: 'Kůži nebo tuk nařízni do mřížky (ne až do masa). Maso osuš papírovou utěrkou.' },
    { t: 'Okořenění', d: 'Vetři sůl, kmín a prolisovaný česnek. Nech 20 minut odpočinout a předehřej troubu na 170 °C.', s: 1200 },
    { t: 'Do pekáče', d: 'Na dno cibuli na měsíčky a sádlo, maso kůží nahoru. Podlij vodou asi 1 cm.' },
    { t: 'Pečení přikryté', d: 'Přikryj víkem nebo alobalem, peč na 170 °C. Každých 30 minut přelij šťávou a dolij vodu.', s: 5400, key: true },
    { t: 'Pečení odkryté', d: 'Odkryj, zvyš na 200 °C a peč dozlatova. Vodu jen dolévej, maso už nepřelévej.', s: 1800 },
    { t: 'Odpočinek', d: 'Maso na prkénko, volně přikryj alobalem.', s: 600 },
    { t: 'Výpek', d: 'Výpek přeceď, cibuli rozmačkej přes sítko. Když je ho málo, dolij vodu, povař a vyškrábej připečené kousky.', s: 300 },
    { t: 'Podávání', d: 'Krájej na plátky přes vlákno, přelij výpekem.' }
  ],
  tips: [
    'Na večeři v 18:30 dej maso do trouby kolem 16:00.',
    'Měkkost: vidlička jde snadno. Když klade odpor, ještě 15–20 minut přikryté.',
    'Hranolky dej do trouby, jakmile maso odpočívá (220 °C, cca 20 min).',
    'Pekáč namoč hned po vylití výpeku.'
  ],
  notes: [], version: 1, updated: '2026-10-18', source: 'chat 18. 10. 2026', history: []
},
{
  id: 'sekana-plech', title: 'Sekaná na plechu s bramborami', subtitle: 'Z kila mletého vepřového, vše na jednom plechu.',
  category: 'Hlavní jídlo', time: 75, servings: 6, equipment: ['trouba', 'plech'], tags: ['veprove', 'trouba', 'jedno-nadobi', 'dvakrat'],
  photo: { src: WM('Meatloaf_on_white_plate.jpg'), page: WP('Meatloaf_on_white_plate.jpg') },
  key: 'Směs hněť rukama jen krátce, dokud se nespojí. Přepracovaná sekaná je tuhá.',
  ingredients: [
    { n: 'mleté vepřové', a: 1000, u: 'g' },
    { n: 'vejce', a: 2, u: 'ks' },
    { n: 'střední cibule', a: 1, u: 'ks' },
    { n: 'stroužky česneku', a: 3, u: 'ks' },
    { n: 'menší syrová brambora (do směsi)', a: 1, u: 'ks' },
    { n: 'bramborový škrob', a: 2, u: 'tbsp' },
    { n: 'hořčice (bezlepková)', a: 1, u: 'tbsp' },
    { n: 'sůl do masa', a: 2, u: 'tsp' },
    { n: 'sušená majoránka', a: 1, u: 'tbsp' },
    { n: 'mletý pepř', a: 0.5, u: 'tsp' },
    { n: 'brambory na plech', a: 1000, u: 'g' },
    { n: 'olej', a: 2, u: 'tbsp' },
    { n: 'sůl na brambory', a: 1, u: 'tsp' },
    { n: 'kečup na potření (nepovinné)', a: 2, u: 'tbsp' }
  ],
  steps: [
    { t: 'Trouba', d: 'Předehřej na 200 °C (horkovzduch 180 °C). Plech vylož pečicím papírem.' },
    { t: 'Brambory', d: 'Brambory nakrájej na měsíčky, promíchej s olejem a solí přímo na plechu a rozlož po okrajích.' },
    { t: 'Směs', d: 'Do mísy maso, vejce, najemno nastrouhanou cibuli a bramboru, česnek, škrob, hořčici, sůl, majoránku a pepř. Krátce prohněť.', key: true },
    { t: 'Tvarování', d: 'Mokrýma rukama vytvaruj dvě šišky a polož doprostřed plechu.' },
    { t: 'První pečení', d: 'Peč 25 minut.', s: 1500 },
    { t: 'Obrácení', d: 'Brambory promíchej, sekanou potři kečupem. Peč dalších 25 minut.', s: 1500 },
    { t: 'Odpočinek', d: 'Nech sekanou 10 minut odpočinout, než ji nakrájíš.', s: 600 }
  ],
  tips: [
    'Cibule syrová a nastrouhaná — nemusíš ji smažit a ušetříš pánev.',
    'Hotovo, když vytéká čirá šťáva, s teploměrem aspoň 72 °C uvnitř.',
    'Sekaná jde zamrazit na plátky proložené papírem (2–3 měsíce). Brambory ne.',
    'Misku od směsi namoč hned.'
  ],
  notes: [], version: 1, updated: '2026-10-10', source: 'chat 10. 10. 2026', history: []
},
{
  id: 'veprovy-gulas', title: 'Vepřový guláš z plece', subtitle: 'Klasika se sekaným kmínem, zahuštěná škrobem. 1 kg masa = 5 porcí.',
  category: 'Hlavní jídlo', time: 135, servings: 5, equipment: ['hrnec', 'papinak'], tags: ['veprove', 'papinak', 'dvakrat'],
  photo: { src: WM('Hospodsky_gulasek.jpg'), page: WP('Hospodsky_gulasek.jpg') },
  key: 'Papriku vmíchej do hrnce staženého z plotny. Na plotně by zhořkla.',
  ingredients: [
    { n: 'vepřová plec, kostky cca 3 cm', a: 1000, u: 'g' },
    { n: 'cibule (cca 4 velké)', a: 700, u: 'g' },
    { n: 'sádlo nebo olej', a: 3, u: 'tbsp' },
    { n: 'sladká paprika', a: 3, u: 'tbsp' },
    { n: 'pálivá paprika (volitelně)', a: 1, u: 'tsp' },
    { n: 'kmín celý', a: 2, u: 'tsp' },
    { n: 'rajčatový protlak', a: 2, u: 'tbsp' },
    { n: 'stroužky česneku', a: 4, u: 'ks' },
    { n: 'majoránka', a: 2, u: 'tsp' },
    { n: 'sůl', a: 2, u: 'tsp' },
    { n: 'mletý pepř', a: 0.5, u: 'tsp' },
    { n: 'voda', a: 1000, u: 'ml' },
    { n: 'bramborový škrob', a: 2, u: 'tbsp' }
  ],
  steps: [
    { t: 'Kmín', d: 'Nasyp na prkénko se špetkou soli a nasekej velkým nožem, dokud se nezlomí většina zrnek.' },
    { t: 'Krájení', d: 'Cibuli nadrobno, maso na kostky.' },
    { t: 'Restování cibule', d: 'Na sádle restuj cibuli za častého míchání do zlatohněda. Tady vzniká chuť i hustota.', s: 1200 },
    { t: 'Maso', d: 'Přidej maso, osol, opepři a opékej, až zbělá.', s: 600 },
    { t: 'Paprika mimo plotnu', d: 'Odstav hrnec z plotny a vmíchej papriku.', key: true },
    { t: 'Kmín a protlak', d: 'Přidej kmín a protlak, podlij vodou, aby bylo maso skoro ponořené.' },
    { t: 'Dušení', d: 'Přiveď k varu, ztlum a duš pod pokličkou. Občas promíchej a podlij. (Papiňák: 35 min pod tlakem.)', s: 5400 },
    { t: 'Dochucení', d: 'Přidej česnek a majoránku. Škrob rozmíchej ve studené vodě, vlij za stálého míchání a provař.', s: 300 },
    { t: 'Odpočinek', d: 'Stáhni z plotny a nech pod pokličkou dojít.', s: 600 }
  ],
  tips: [
    'Papiňák: po natlakování stáhni plotnu na ⅓ výkonu (3–4 z 9).',
    'Pálivou papriku pro děti vynech, dospělí si přisypou chilli.',
    'Druhý den je guláš lepší — vař rovnou dvojitou dávku.',
    'Příloha: brambory nebo rýže (klasický knedlík má lepek).'
  ],
  notes: [], version: 1, updated: '2026-10-08', source: 'chat 8. 10. 2026', history: []
},
{
  id: 'kureci-polevka', title: 'Kuřecí polévka s rýží a zeleninou', subtitle: 'Vývarová, hotová za 30 minut v jednom hrnci.',
  category: 'Polévka', time: 30, servings: 4, equipment: ['hrnec'], tags: ['polevka', 'kure', 'rychle', 'jedno-nadobi'],
  photo: { src: WM('Bowl_of_chicken_soup.jpg'), page: WP('Bowl_of_chicken_soup.jpg') },
  key: 'Zeleninu nejdřív pořádně orestuj dozlatova. Polévka pak chutná jako poctivý vývar, i když se vaří jen chvilku.',
  ingredients: [
    { n: 'olej nebo máslo', a: 1, u: 'tbsp' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'mrkev', a: 3, u: 'ks' },
    { n: 'petržel (kořen)', a: 1, u: 'ks' },
    { n: 'stroužky česneku', a: 2, u: 'ks' },
    { n: 'kuřecí prsa', a: 400, u: 'g' },
    { n: 'voda', a: 1500, u: 'ml' },
    { n: 'bujón (bezlepkový)', a: 2, u: 'ks' },
    { n: 'rýže', a: 80, u: 'g' },
    { n: 'mražený hrášek', a: 100, u: 'g' },
    { n: 'petrželová nať', a: 1, u: 'hrst' },
    { n: 'sůl', a: 0.5, u: 'tsp' }
  ],
  steps: [
    { t: 'Zelenina', d: 'Cibuli najemno, mrkev a petržel na kolečka, česnek na plátky.' },
    { t: 'Orestovat', d: 'V hrnci na oleji orestuj cibuli, mrkev a petržel dozlatova, na konci přidej česnek.', s: 300, key: true },
    { t: 'Kuře', d: 'Kuře na malé kostky, přidej a krátce opeč, až zbělá.', s: 180 },
    { t: 'Zalít a rýže', d: 'Zalij vodou, rozdrob bujóny, přisyp propláchnutou rýži. Vař mírně pod pokličkou.', s: 900 },
    { t: 'Hrášek', d: 'Přidej hrášek, povař, dochuť. Vypni a vmíchej nať.', s: 180 }
  ],
  tips: [
    'Rýže rovnou do polévky — nic dalšího k mytí.',
    'Kuře krájej až po zelenině, ať nemusíš mezi tím mýt prkénko.',
    'Stehenní řízky místo prsou jsou šťavnatější.',
    'Druhý den rýže vývar nasaje — při ohřevu dolij vodu.'
  ],
  notes: [], version: 1, updated: '2026-10-10', source: 'chat 10. 10. 2026', history: []
},
{
  id: 'hamburgery', title: 'Hamburgery mezi krajíci', subtitle: 'Z 500 g míchaného mletého masa, s opečeným bezlepkovým chlebem.',
  category: 'Hlavní jídlo', time: 30, servings: 4, equipment: ['panev24'], tags: ['hit', 'rychle', 'jedno-nadobi'],
  kidsLiked: true,
  photo: { src: WM('Cheeseburger_maison.jpg'), page: WP('Cheeseburger_maison.jpg') },
  key: 'Maso nesol dopředu a placky na pánvi nemačkej. Zbytek odpustí chyby.',
  ingredients: [
    { n: 'míchané mleté maso', a: 500, u: 'g' },
    { n: 'plnotučná hořčice (bezlepková)', a: 1, u: 'tbsp' },
    { n: 'stroužky česneku', a: 2, u: 'ks' },
    { n: 'sladká mletá paprika', a: 1, u: 'tsp' },
    { n: 'sůl', a: 1, u: 'tsp' },
    { n: 'mletý pepř', a: 0.5, u: 'tsp' },
    { n: 'krajíce bezlepkového chleba', a: 8, u: 'ks' },
    { n: 'plátky sýra', a: 4, u: 'ks' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'kyselé okurky', a: 2, u: 'ks' },
    { n: 'rajče', a: 1, u: 'ks' },
    { n: 'olej na smažení', a: 2, u: 'tbsp' },
    { n: 'kečup a majonéza', a: 0, u: 'podle chuti' }
  ],
  steps: [
    { t: 'Ochucení', d: 'Maso, hořčici, česnek, papriku a pepř promíchej rukou jen do spojení. Sůl zatím ne.' },
    { t: 'Placky', d: '4 placky o kus širší než krajíc, 1,5 cm silné, palcem důlek doprostřed. Do lednice.', s: 600 },
    { t: 'Chleba', d: 'Na suché pánvi opeč krajíce z obou stran dozlatova.', s: 180 },
    { t: 'První strana', d: 'Až teď placky osol. Na rozpálený olej je polož a nehýbej s nimi.', s: 210, key: true },
    { t: 'Otočit a sýr', d: 'Otoč jednou, polož sýr a dosmaž. Uvnitř šťavnaté, ne růžové.', s: 180 },
    { t: 'Odpočinek', d: 'Sundej na prkénko, ať se šťáva vsákne.', s: 180 },
    { t: 'Složení', d: 'Krajíc s kečupem a majonézou, maso se sýrem, cibule, okurka, rajče, druhý krajíc.' }
  ],
  tips: [
    'Placka se při smažení stáhne — proto širší než krajíc.',
    'Chleba opeč ve stejné pánvi před masem, žádné nádobí navíc.',
    'Mísu od masa hned vypláchni studenou vodou.'
  ],
  notes: [{ who: 'Lukáš', date: '2026-09', text: 'Děti hamburgery snědly, hit.' }],
  version: 2, updated: '2026-10-21', source: 'chat 13. 9. 2026',
  history: [{ v: 2, date: '2026-10-21', text: 'Chleba upřesněn na bezlepkový.' }]
},
{
  id: 'mac-and-cheese', title: 'Mac and cheese se šunkou', subtitle: 'Verze se sójovým mlékem, omáčka zahuštěná škrobem.',
  category: 'Hlavní jídlo', time: 25, servings: 4, equipment: ['hrnec'], tags: ['testoviny', 'rychle', 'jedno-nadobi'],
  photo: { src: WM('Homemade_mac_and_cheese.jpg'), page: WP('Homemade_mac_and_cheese.jpg') },
  key: 'Sójové mléko jen mírně probublávej a sýr přidávej mimo plotnu. Při prudkém varu se sója i sýr srazí.',
  ingredients: [
    { n: 'bezlepkové těstoviny (kolínka)', a: 400, u: 'g' },
    { n: 'šunka, kostičky', a: 200, u: 'g' },
    { n: 'máslo (nebo 3 tbsp oleje)', a: 40, u: 'g' },
    { n: 'kukuřičný škrob (Solamyl)', a: 2, u: 'tbsp' },
    { n: 'sójové mléko, neslazené', a: 600, u: 'ml' },
    { n: 'nastrouhaný eidam', a: 250, u: 'g' },
    { n: 'tavený sýr (nepovinné)', a: 2, u: 'ks' },
    { n: 'sůl (až nakonec)', a: 0.5, u: 'tsp' },
    { n: 'muškátový oříšek', a: 0, u: 'špetka' }
  ],
  steps: [
    { t: 'Těstoviny', d: 'Vař v osolené vodě o minutu kratší než na obalu, sceď.', s: 480 },
    { t: 'Škrob a šunka', d: 'Škrob rozmíchej se 4 tbsp studeného sójového mléka, šunku nakrájej.' },
    { t: 'Šunka', d: 'Ve stejném hrnci rozpusť máslo a šunku krátce opeč.', s: 120 },
    { t: 'Omáčka', d: 'Ztlum na střední stupeň, přilij zbytek mléka, nech jen mírně probublávat. Vmíchej škrob a nech zhoustnout.', s: 180 },
    { t: 'Sýr mimo plotnu', d: 'Stáhni hrnec z plotny, přidávej sýr po hrstech a míchej, dokud se nerozpustí. Ochutnej.', key: true },
    { t: 'Spojení', d: 'Vrať těstoviny, promíchej a nech chvilku stát.', s: 60 }
  ],
  tips: [
    'Sójové mléko neslazené a bez příchutě.',
    'Nezhoustne? Ještě ½ tbsp škrobu ve studené vodě.',
    'Šunka bývá slaná — sol až po ochutnání. A mrkni na složení kvůli lepku.',
    'Hrnec namoč hned, zaschlý sýr se drhne špatně.'
  ],
  notes: [], version: 1, updated: '2026-10-07', source: 'chat 7. 10. 2026', history: []
},
{
  id: 'sladkokysele-kure', title: 'Sladkokyselé kuře', subtitle: 'S paprikou a ananasem, evropská verze bez speciálních surovin.',
  category: 'Hlavní jídlo', time: 40, servings: 4, equipment: ['wok', 'ryzovar'], tags: ['kure', 'ryze'],
  photo: { src: WM('Sweet_and_sour_chicken_5.jpg'), page: WP('Sweet_and_sour_chicken_5.jpg') },
  key: 'Kuře vrať do omáčky až úplně na konci a hned podávej. Když se v ní vaří, obal změkne.',
  ingredients: [
    { n: 'kuřecí prsa, kostky', a: 600, u: 'g' },
    { n: 'vejce', a: 1, u: 'ks' },
    { n: 'bramborový škrob (obal)', a: 4, u: 'tbsp' },
    { n: 'sůl', a: 0.5, u: 'tsp' },
    { n: 'olej', a: 4, u: 'tbsp' },
    { n: 'cibule', a: 1, u: 'ks' },
    { n: 'paprika (červená a zelená)', a: 2, u: 'ks' },
    { n: 'stroužky česneku', a: 2, u: 'ks' },
    { n: 'ananas v kousích (plechovka)', a: 1, u: 'ks' },
    { n: 'kečup', a: 4, u: 'tbsp' },
    { n: 'ocet', a: 3, u: 'tbsp' },
    { n: 'cukr', a: 2, u: 'tbsp' },
    { n: 'bezlepková sójovka (tamari)', a: 2, u: 'tbsp' },
    { n: 'škrob do omáčky + 3 tbsp vody', a: 1, u: 'tbsp' },
    { n: 'rýže', a: 300, u: 'g' }
  ],
  steps: [
    { t: 'Rýže', d: 'Pusť rýži v rýžovaru jako první.' },
    { t: 'Omáčka', d: 'Smíchej šťávu z ananasu (cca 120 ml), kečup, ocet, cukr a sójovku. Přilij rozmíchaný škrob. Kousky ananasu odlož.' },
    { t: 'Obalení', d: 'Kuře osol, promíchej s vejcem a zasyp škrobem.' },
    { t: '1. dávka', d: 'Na polovině oleje opeč polovinu kuřete dozlatova. Vyndej.', s: 300 },
    { t: '2. dávka', d: 'Stejně opeč druhou polovinu.', s: 300 },
    { t: 'Zelenina', d: 'Ve stejné pánvi krátce orestuj cibuli, papriku a česnek. Má zůstat křupavá.', s: 180 },
    { t: 'Zahuštění', d: 'Omáčku promíchej, vlij a nech probublat, dokud nezhoustne a nezleskne.', s: 120 },
    { t: 'Spojení', d: 'Přidej ananas a kuře, jen promíchej a hned podávej.', s: 60, key: true }
  ],
  tips: [
    'Kuře opékej ve dvou dávkách, přeplněná pánev ho dusí.',
    'Dětem omáčku zvlášť na namáčení.',
    'Zbytky skladuj kuře a omáčku odděleně.',
    'Pánev hned namoč, zaschlý škrob se špatně drhne.'
  ],
  notes: [], version: 1, updated: '2026-09-22', source: 'chat 22. 9. 2026', history: []
},
{
  id: 'oyakodon', title: 'Oyakodon z rýžovaru', subtitle: 'Kuře s vejcem na rýži, vše v rýžovaru.',
  category: 'Hlavní jídlo', time: 55, servings: 4, equipment: ['ryzovar'], tags: ['kure', 'ryze', 'jedno-nadobi'],
  photo: { src: WM('Oyakodon_003.jpg'), page: WP('Oyakodon_003.jpg') },
  key: 'Navrstvi a nemíchej: rýže dole, kuře s omáčkou a cibule navrch. Vejce až po pípnutí.',
  ingredients: [
    { n: 'rýže (jasmínová nebo kulatozrnná)', a: 300, u: 'g' },
    { n: 'kuřecí stehna bez kosti', a: 500, u: 'g' },
    { n: 'větší cibule', a: 1, u: 'ks' },
    { n: 'voda', a: 280, u: 'ml' },
    { n: 'bezlepková sójovka (tamari)', a: 4, u: 'tbsp' },
    { n: 'cukr', a: 1, u: 'tsp' },
    { n: 'vejce', a: 4, u: 'ks' },
    { n: 'jarní cibulka (nepovinné)', a: 2, u: 'ks' }
  ],
  steps: [
    { t: 'Rýže', d: 'Propláchni 2–3× studenou vodou, slij.' },
    { t: 'Omáčka', d: 'Smíchej vodu, sójovku a cukr.' },
    { t: 'Naložit', d: 'Kuře na kostky 2–3 cm, cibuli na proužky. Kuře vmíchej do omáčky.', s: 600 },
    { t: 'Navrstvit', d: 'Rýži do misky, zalij omáčkou s kuřetem, navrch cibule. Nemíchej.', key: true },
    { t: 'Vařit', d: 'Spusť program na rýži. Tvůj rýžovar bývá rychlejší — řiď se pípnutím.', s: 2400 },
    { t: 'Vejce', d: 'Lehce rozmíchaná vejce nalij navrch, zavři a nech na ohřevu. Pro děti o 5 minut déle.', s: 600 },
    { t: 'Podávej', d: 'Nabírej po vrstvách, posyp jarní cibulkou.' }
  ],
  tips: [
    'Stehna jsou lepší než prsa, v rýžovaru nevyschnou.',
    'Nepřekroč rysku maximální náplně.',
    'Misku hned namoč, připečená rýže pak jde dolů sama.'
  ],
  notes: [], version: 2, updated: '2026-10-21', source: 'chat 17. 9. 2026',
  history: [{ v: 2, date: '2026-10-21', text: 'Sójová omáčka nahrazena bezlepkovou (tamari).' }]
},
{
  id: 'livance', title: 'Bezlepkové lívance', subtitle: 'Nadýchané, z běžné bezlepkové směsi. 4 porce ≈ 16 lívanců.',
  category: 'Snídaně', time: 30, servings: 4, equipment: ['panev24'], tags: ['snidane', 'sladke', 'rychle'],
  photo: { src: WM('Pancakes_(Unsplash_CKipn7XSyEU).jpg'), page: WP('Pancakes_(Unsplash_CKipn7XSyEU).jpg') },
  key: 'Nech těsto 10 minut odpočinout. Bezlepková mouka pomalu nasává tekutinu a lívance pak drží tvar.',
  ingredients: [
    { n: 'bezlepková mouka (univerzální směs)', a: 250, u: 'g' },
    { n: 'vejce', a: 2, u: 'ks' },
    { n: 'mléko', a: 300, u: 'ml' },
    { n: 'cukr', a: 1, u: 'tbsp' },
    { n: 'bezlepkový prášek do pečiva', a: 1, u: 'tsp' },
    { n: 'sůl', a: 0, u: 'špetka' },
    { n: 'rozpuštěné máslo', a: 30, u: 'g' },
    { n: 'olej na pánev', a: 1, u: 'tbsp' }
  ],
  steps: [
    { t: 'Suché', d: 'V míse prošlehej mouku, cukr, prášek do pečiva a sůl.' },
    { t: 'Mokré', d: 'Přidej vejce, mléko a máslo, vyšlehej hladké hustší těsto.' },
    { t: 'Odpočinek', d: 'Nech těsto stát. Mezitím rozehřej pánev.', s: 600, key: true },
    { t: 'První strana', d: 'Pánev potři olejem, po 1 tbsp těsta, 3–4 najednou. Peč, dokud nejsou bublinky.', s: 120 },
    { t: 'Obrátit', d: 'Obrať a dopeč dozlatova. Opakuj s dalším těstem.', s: 90 },
    { t: 'Podávej', d: 'S tvarohem a ovocem, marmeládou nebo javorovým sirupem.' }
  ],
  tips: [
    'Po prvním lívanci ztlum na střední stupeň, elektrická plotna drží teplo.',
    'Obracej, až okraje zmatní, dřív se trhají.',
    'Hotové na talíř do trouby na 60 °C.',
    'Mísu hned namoč, těsto zaschne jako beton.'
  ],
  notes: [], version: 1, updated: '2026-10-10', source: 'chat 10. 10. 2026', history: []
},
{
  id: 'banana-bread', title: 'Bezlepkový banana bread', subtitle: 'Hranatá forma 30 × 11 cm, 175 °C, v robotu Bosch MUM 5.',
  category: 'Pečení', time: 100, servings: 12, servingsLabel: 'plátků', equipment: ['robot', 'forma', 'trouba'], tags: ['peceni', 'sladke'],
  photo: { src: WM('Banana_bread_loaf_on_a_plate.jpg'), page: WP('Banana_bread_loaf_on_a_plate.jpg') },
  key: 'Po přidání mouky už jen krátce promíchej (stupeň 1, cca 30 s). Přemíchané bezlepkové těsto je hutné.',
  ingredients: [
    { n: 'velmi zralé banány (cca 400 g bez slupky)', a: 4, u: 'ks' },
    { n: 'vejce', a: 3, u: 'ks' },
    { n: 'změklé máslo nebo Hera', a: 110, u: 'g' },
    { n: 'cukr', a: 120, u: 'g' },
    { n: 'vanilkový cukr (sáček)', a: 1, u: 'ks' },
    { n: 'bezlepková mouka na pečení', a: 250, u: 'g' },
    { n: 'bezlepkový kypřicí prášek', a: 12, u: 'g' },
    { n: 'sůl', a: 0, u: 'špetka' },
    { n: 'mléko', a: 50, u: 'ml' },
    { n: 'čokoláda nebo ořechy (volitelně)', a: 80, u: 'g' }
  ],
  steps: [
    { t: 'Příprava', d: 'Troubu na 175 °C horní/spodní, formu vylož papírem s přesahem.', s: 600 },
    { t: 'Banány', d: 'Rozmačkej vidličkou na kaši.' },
    { t: 'Máslo a cukr', d: 'Míchací metlou šlehej máslo s cukry do světlé pěny.', s: 180, tag: 'stupeň 4' },
    { t: 'Vejce', d: 'Po jednom, každé nech zapracovat.', tag: 'stupeň 3' },
    { t: 'Banány a mléko', d: 'Přidej a krátce promíchej.', tag: 'stupeň 2' },
    { t: 'Mouka', d: 'Mouku s práškem a solí přisyp a míchej jen do spojení. Čokoládu vmíchej stěrkou.', tag: 'stupeň 1', key: true },
    { t: 'Odpočinek těsta', d: 'Nech těsto stát, mouka nasaje tekutinu.', s: 600 },
    { t: 'Pečení', d: 'Nalij do formy, peč 55–65 minut. Po 35 minutách přikryj alobalem. Hotovo, když špejle vyjde suchá.', s: 3600 },
    { t: 'Chladnutí', d: '15 minut ve formě, pak vytáhni za papír na mřížku.', s: 900 }
  ],
  tips: [
    'Banány skoro černé = sladší a vláčnější.',
    'Krájej až vychladlý, teplý se drolí. Plátky jdou zamrazit.',
    'Čtvercová forma 20 × 20: špejlí kontroluj už kolem 40. minuty.',
    'Mísu robota a metlu namoč hned.'
  ],
  notes: [], version: 1, updated: '2026-10-10', source: 'chat 10. 10. 2026', history: []
},
{
  id: 'mramorova-babovka', title: 'Mramorová bábovka', subtitle: 'Nadýchaná, v robotu Bosch MUM 5, hranatá forma 30 × 11 cm.',
  category: 'Pečení', time: 90, servings: 12, servingsLabel: 'plátků', equipment: ['robot', 'forma', 'trouba'], tags: ['peceni', 'sladke'],
  photo: { src: WM('Marble_B%C3%A1bovka.JPG'), page: WP('Marble_B%C3%A1bovka.JPG') },
  key: 'Máslo s cukrem šlehej celých 5 minut do světlé pěny — z toho je nadýchanost. V půlce shrň máslo ze stěn.',
  ingredients: [
    { n: 'změklé máslo nebo Hera', a: 200, u: 'g' },
    { n: 'cukr', a: 180, u: 'g' },
    { n: 'vanilkový cukr (sáček)', a: 1, u: 'ks' },
    { n: 'vejce (pokojová teplota)', a: 4, u: 'ks' },
    { n: 'bezlepková mouka na pečení', a: 250, u: 'g' },
    { n: 'bezlepkový kypřicí prášek', a: 12, u: 'g' },
    { n: 'mléko', a: 100, u: 'ml' },
    { n: 'kakao', a: 2, u: 'tbsp' },
    { n: 'mléko do kakaové části', a: 2, u: 'tbsp' },
    { n: 'sůl', a: 0, u: 'špetka' }
  ],
  steps: [
    { t: 'Příprava', d: 'Máslo a vejce hodinu předem z lednice (Hera stačí 15–20 min). Trouba 170 °C, forma s papírem.', s: 600 },
    { t: 'Máslo a cukr — 1. půlka', d: 'Míchací metla, šlehej máslo s cukry.', s: 150, tag: 'stupeň 4', key: true },
    { t: 'Shrnout', d: 'Zastav a stěrkou shrň máslo ze stěn dolů.' },
    { t: 'Máslo a cukr — 2. půlka', d: 'Šlehej dál do světlé nadýchané pěny.', s: 150, tag: 'stupeň 4' },
    { t: 'Vejce', d: 'Po jednom, každé cca 30 s.', tag: 'stupeň 3' },
    { t: 'Mouka a mléko', d: 'Mouku s práškem a solí střídej s mlékem, jen do spojení (30–40 s). Zbytek dotáhni stěrkou.', tag: 'stupeň 1' },
    { t: 'Kakaová část', d: 'Třetinu těsta do jiné misky, vmíchej kakao s mlékem lžící.' },
    { t: 'Mramorování', d: 'Do formy střídej světlé a tmavé těsto, vidličkou jednou provlni.' },
    { t: 'Pečení', d: 'Peč do suché špejle.', s: 3000 },
    { t: 'Chladnutí', d: '10 minut ve formě, pak vytáhni za papír.', s: 600 }
  ],
  tips: [
    'Šlehací metla (jemné drátky) je na sníh, na máslo použij míchací.',
    'Hera 1 : 1 místo másla funguje, přidej víc vanilky nebo citronovou kůru.',
    'Čtvercová forma 20 × 20: špejle už kolem 40. minuty.',
    'Mísu a metlu napusť vodou hned po nalití těsta.'
  ],
  notes: [], version: 1, updated: '2026-10-10', source: 'chat 10. 10. 2026 (doplněno ze shrnutí)', history: []
}
];
