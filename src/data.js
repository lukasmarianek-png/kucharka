/* Kuchařka — data receptů. Upravuje Claude.
   Nový recept = nový objekt v RECIPES. Úprava = version+1, záznam do history, updated.
   Jednotky: g, ml, tbsp, tsp, ks, nebo vlastní text. a:0 = "podle chuti".
   Kroky: i = suroviny použité v kroku (index do ingredients, nebo [index, podíl]). */

window.APP_VERSION = '2026-10-23.1';

window.KITCHEN = {
 "intro": "Plně vybavená kuchyně. Recepty píšu přímo na tohle vybavení — když něco přibude nebo se něco chová jinak, napiš mi to a doplním.",
 "items": [
  {
   "id": "sklokeramika",
   "name": "Sklokeramická deska",
   "group": "Vaření",
   "note": "Elektrická — reaguje pomalu. Ztlumit o chvilku dřív, než se zdá potřeba. U papiňáku po natlakování stáhnout na ⅓ výkonu."
  },
  {
   "id": "trouba",
   "name": "Horkovzdušná trouba",
   "group": "Vaření",
   "note": "Teploty v receptech jsou pro horní/spodní ohřev; s horkovzduchem ubrat cca 20 °C."
  },
  {
   "id": "mikrovlnka",
   "name": "Mikrovlnka",
   "group": "Vaření",
   "note": "Na ohřev zbytků a předvaření brambor (tortilla)."
  },
  {
   "id": "papinak",
   "name": "Papiňák",
   "group": "Vaření",
   "note": "Guláš 35 min pod tlakem, paprikáš. Po natlakování plotnu hned stáhnout."
  },
  {
   "id": "ryzovar",
   "name": "Rýžovar",
   "group": "Vaření",
   "note": "Obvykle 1–2 hrnky rýže; je rychlejší než 40minutové návody — řídit se pípnutím."
  },
  {
   "id": "gril",
   "name": "Kontaktní gril (oboustranný)",
   "group": "Vaření",
   "note": "Maso i tousty."
  },
  {
   "id": "robot",
   "name": "Bosch MUM 5",
   "group": "Pečení",
   "note": "Na máslo s cukrem míchací metla (ne šlehací), stupeň 4. Vejce stupeň 3, mouka stupeň 1 jen do spojení."
  },
  {
   "id": "forma",
   "name": "Hranatá forma cca 30 × 11 cm",
   "group": "Pečení",
   "note": "Bábovka, banana bread. Vždy pečicí papír s přesahem."
  },
  {
   "id": "plech",
   "name": "Plech do trouby",
   "group": "Pečení",
   "note": "Vždy pečicí papír."
  },
  {
   "id": "pekac",
   "name": "Pekáč (s víkem / alobal)",
   "group": "Pečení",
   "note": "Pečená plec."
  },
  {
   "id": "panev24",
   "name": "Titanová pánev 24 cm",
   "group": "Pánve a hrnce",
   "note": "Nepřilnavá — vejce, lívance (3–4 najednou)."
  },
  {
   "id": "wok",
   "name": "Wok s kamenným povrchem",
   "group": "Pánve a hrnce",
   "note": "Široké dno — asijská jídla, větší dávky, těstoviny s omáčkou v jednom."
  },
  {
   "id": "hrnec",
   "name": "Hrnce",
   "group": "Pánve a hrnce",
   "note": "Polévky, guláš, rizoto."
  },
  {
   "id": "vaha",
   "name": "Kuchyňská váha",
   "group": "Pomocníci",
   "note": "Proto jsou sypké suroviny v gramech."
  }
 ]
};

window.PEOPLE = ["Lukáš","Tomáš","Anička"];

window.RECIPES = [
{
 "id": "kure-kari",
 "title": "Kuře na žlutém kari",
 "subtitle": "Mírné kari s kokosovým mlékem na jedné pánvi, bez chilli.",
 "category": "Hlavní jídlo",
 "time": 35,
 "servings": 4,
 "equipment": [
  "wok",
  "ryzovar"
 ],
 "tags": [
  "hit",
  "kure",
  "ryze",
  "dvakrat"
 ],
 "kidsLiked": true,
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Creamy_Chicken_Curry.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Creamy_Chicken_Curry.jpg"
 },
 "key": "Koření sypej až do pánve stažené z plotny. V horkém tuku se rozvoní za pár vteřin, na přímém ohni by stejně rychle zhořklo.",
 "ingredients": [
  {
   "n": "kuřecí prsa, kostky ~2,5 cm",
   "a": 550,
   "u": "g"
  },
  {
   "n": "velká cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "řepkový olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "kari koření (nepálivé)",
   "a": 1.5,
   "u": "tbsp"
  },
  {
   "n": "mletá kurkuma",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "bramborový škrob",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "kokosové mléko",
   "a": 400,
   "u": "ml"
  },
  {
   "n": "kuřecí vývar (bezlepkový) nebo voda",
   "a": 150,
   "u": "ml"
  },
  {
   "n": "sůl",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "cukr",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "citronová šťáva",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "rýže",
   "a": 300,
   "u": "g"
  }
 ],
 "steps": [
  {
   "t": "Nachystat",
   "d": "Kuře nakrájej na kostky asi 2,5 cm a osol polovinou soli. Cibuli nakrájej najemno, česnek prolisuj. Kari, kurkumu a škrob smíchej v malé misce — budeš je sypat rychle.",
   "i": [
    0,
    [
     9,
     0.5
    ],
    1,
    2,
    4,
    5,
    6
   ]
  },
  {
   "t": "Rýže",
   "d": "Rýži propláchni a pusť v rýžovaru. Kari stihneš mezitím.",
   "s": 720,
   "i": [
    12
   ]
  },
  {
   "t": "Cibule",
   "d": "Ve woku rozehřej olej a na středním stupni osmahni cibuli doměkka a dosklovata. Poslední minutu přidej česnek.",
   "s": 360,
   "i": [
    3,
    1,
    2
   ]
  },
  {
   "t": "Koření mimo plotnu",
   "d": "Stáhni wok z plotny. Vsyp směs koření se škrobem a asi půl minuty míchej v horkém tuku.",
   "s": 40,
   "key": true,
   "i": [
    4,
    5,
    6
   ]
  },
  {
   "t": "Zalít",
   "d": "Vrať wok na mírný stupeň a za stálého míchání přilévej kokosové mléko a vývar. Rozmíchej hrudky a nech přijít k varu.",
   "i": [
    7,
    8
   ]
  },
  {
   "t": "Dovařit kuře",
   "d": "Vlož syrové kuře do bublající omáčky, ztlum na minimum a vař pod pokličkou. Nesmí prudce vřít, kuře by vyschlo.",
   "s": 720,
   "i": [
    0
   ]
  },
  {
   "t": "Dochutit",
   "d": "Vmíchej cukr, citronovou šťávu a zbytek soli. Nech 5 minut odstát mimo plotnu, omáčka zhoustne. Podávej s rýží.",
   "s": 300,
   "i": [
    10,
    11,
    [
     9,
     0.5
    ]
   ]
  }
 ],
 "tips": [
  "Kuře nesmaž předem — když se táhne přímo v omáčce, zůstane měkké i druhý den.",
  "Kari dej nejdřív 1 tbsp, ochutnej po zalití a případně přidej.",
  "Řídká omáčka: poslední 3 minuty bez pokličky. Hustá: přilij vývar.",
  "Dospělí si přidají chilli na talíři, dětská porce zůstane jemná.",
  "Dvojitá dávka: v lednici vydrží 3 dny a druhý den chutná líp."
 ],
 "notes": [
  {
   "who": "Lukáš",
   "date": "2026-09",
   "text": "Děti snědly dva dny po sobě, zabralo."
  }
 ],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 16. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Hladká mouka nahrazena bramborovým škrobem (bezlepkové)."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kureci-testoviny",
 "title": "Kuřecí těstoviny s paprikou",
 "subtitle": "Rajčatová omáčka z passaty, jemná pro děti, vše ve woku.",
 "category": "Hlavní jídlo",
 "time": 35,
 "servings": 4,
 "equipment": [
  "wok",
  "hrnec"
 ],
 "tags": [
  "kure",
  "testoviny",
  "rychle",
  "dvakrat"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Spaghetti_al_Pomodoro.JPG?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Spaghetti_al_Pomodoro.JPG"
 },
 "key": "Mletou papriku vmíchej až po stažení woku z plotny — na rozpálené plotně se hned připálí a zhořkne.",
 "ingredients": [
  {
   "n": "bezlepkové těstoviny",
   "a": 400,
   "u": "g"
  },
  {
   "n": "kuřecí prsa",
   "a": 500,
   "u": "g"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "červená paprika",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "passata",
   "a": 500,
   "u": "ml"
  },
  {
   "n": "olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sladká mletá paprika",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "oregano nebo bazalka (sušené)",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "cukr (proti kyselosti)",
   "a": 0.25,
   "u": "tsp"
  },
  {
   "n": "Rama nebo máslo",
   "a": 1,
   "u": "tbsp"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Kuře nakrájej na kostky asi 2 cm, cibuli nadrobno, papriku na proužky, česnek nasekej.",
   "i": [
    1,
    2,
    4,
    3
   ]
  },
  {
   "t": "Těstoviny",
   "d": "Ve velkém hrnci přiveď k varu osolenou vodu, vsyp těstoviny a vař podle obalu. Před slitím odeber hrnek vody z vaření, pak sceď a nech stranou.",
   "s": 600,
   "i": [
    0
   ]
  },
  {
   "t": "Cibule a paprika",
   "d": "Ve woku na oleji restuj cibuli a papriku na středním stupni, až cibule zesklovatí.",
   "s": 240,
   "i": [
    6,
    2,
    4
   ]
  },
  {
   "t": "Kuře",
   "d": "Přidej kuře a sůl, opékej, dokud maso nezbělá ze všech stran.",
   "s": 360,
   "i": [
    1,
    7
   ]
  },
  {
   "t": "Česnek a koření",
   "d": "Přidej česnek a minutu míchej. Stáhni wok z plotny a vmíchej mletou papriku a oregano.",
   "s": 60,
   "key": true,
   "i": [
    3,
    8,
    9
   ]
  },
  {
   "t": "Omáčka",
   "d": "Vrať wok na plotnu, vlij passatu, přidej cukr a nech mírně probublávat.",
   "s": 720,
   "i": [
    5,
    10
   ]
  },
  {
   "t": "Spojení",
   "d": "Vmíchej Ramu, přidej slité těstoviny a promíchej. Hustou omáčku uvolni odloženou vodou z těstovin, dochuť solí.",
   "i": [
    11,
    0
   ]
  }
 ],
 "tips": [
  "Vodu na těstoviny postav, když začneš restovat cibuli — bude to hotové najednou.",
  "Škrobová voda z těstovin omáčku spojí a přilne k těstovinám.",
  "Hrnec od těstovin hned vypláchni horkou vodou, škrob nezaschne.",
  "Krémovější verze: na konci pár tbsp kokosového mléka místo Ramy."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 19. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kureci-rizoto",
 "title": "Kuřecí rizoto s paprikou",
 "subtitle": "Krémová rýže v jednom hrnci, jemná pro děti.",
 "category": "Hlavní jídlo",
 "time": 40,
 "servings": 4,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "kure",
  "ryze",
  "jedno-nadobi",
  "dvakrat"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Risotto_(1).jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Risotto_(1).jpg"
 },
 "key": "Horký vývar přilévej postupně ve třech dávkách a občas zamíchej. Míchání uvolní škrob a rizoto je krémové i bez smetany.",
 "ingredients": [
  {
   "n": "rýže arborio (nebo kulatozrnná)",
   "a": 300,
   "u": "g"
  },
  {
   "n": "kuřecí prsa",
   "a": 500,
   "u": "g"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "červená paprika",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "horký vývar (bezlepkový bujón)",
   "a": 1000,
   "u": "ml"
  },
  {
   "n": "olej",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "Rama nebo máslo",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "sladká mletá paprika",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "eidam, nastrouhaný",
   "a": 60,
   "u": "g"
  },
  {
   "n": "citronová šťáva",
   "a": 1,
   "u": "tsp"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Kuře nakrájej na menší kostky, cibuli nadrobno, papriku na kostičky, česnek nasekej. Vodu uvař v konvici a rozpusť v ní bujón.",
   "i": [
    1,
    2,
    4,
    3,
    5
   ]
  },
  {
   "t": "Cibule a paprika",
   "d": "V hrnci rozehřej olej a polovinu Ramy, restuj cibuli s paprikou, až zesklovatí.",
   "s": 240,
   "i": [
    6,
    [
     7,
     0.5
    ],
    2,
    4
   ]
  },
  {
   "t": "Kuře",
   "d": "Přidej kuře a sůl, opékej, dokud nezbělá.",
   "s": 300,
   "i": [
    1,
    8
   ]
  },
  {
   "t": "Rýže",
   "d": "Přidej česnek a suchou rýži a míchej, až zrnka na okrajích zprůsvitní. Stáhni z plotny a vmíchej mletou papriku.",
   "s": 120,
   "i": [
    3,
    0,
    9
   ]
  },
  {
   "t": "První dávka vývaru",
   "d": "Vrať na plotnu, vlij třetinu horkého vývaru a nech mírně pobublávat. Občas zamíchej.",
   "s": 360,
   "key": true,
   "i": [
    [
     5,
     0.3333333333333333
    ]
   ]
  },
  {
   "t": "Druhá dávka",
   "d": "Až se vývar skoro vsákne, přilij další třetinu.",
   "s": 360,
   "i": [
    [
     5,
     0.3333333333333333
    ]
   ]
  },
  {
   "t": "Poslední dávka",
   "d": "Přilij zbytek a vař, až je rýže měkká, uprostřed lehce pevná. Hustou uvolni horkou vodou.",
   "s": 360,
   "i": [
    [
     5,
     0.3333333333333333
    ]
   ]
  },
  {
   "t": "Dokončení",
   "d": "Stáhni z plotny, vmíchej zbytek Ramy, sýr a citronovou šťávu. Přikryj, nech dojít a dochuť.",
   "s": 120,
   "i": [
    [
     7,
     0.5
    ],
    10,
    11
   ]
  }
 ],
 "tips": [
  "Rýži nepropírej — škrob na povrchu je přesně to, co chceš.",
  "Elektrickou plotnu stáhni na minimum o chvilku dřív, rizoto ještě dotáhne.",
  "Rizoto má být spíš tekoucí než suchá hromádka.",
  "Hrášek nebo kukuřici ze sklenice přidej v posledním kroku, děti to mají rády."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 20. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "fazolova-polevka",
 "title": "Fazolová polévka s rajčaty",
 "subtitle": "Hustá polévka z plechovek, zahuštěná fazolemi místo mouky.",
 "category": "Polévka",
 "time": 30,
 "servings": 4,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "polevka",
  "rychle",
  "jedno-nadobi"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Fasolka_po_breto%C5%84sku.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Fasolka_po_breto%C5%84sku.jpg"
 },
 "key": "Asi třetinu fazolí rozmačkej přímo v hrnci. Polévka zhoustne bez mouky a jíšky.",
 "ingredients": [
  {
   "n": "fazole v plechovce (400 g)",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "krájená rajčata z plechovky",
   "a": 400,
   "u": "g"
  },
  {
   "n": "horký vývar (bezlepkový bujón)",
   "a": 750,
   "u": "ml"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "šunka (volitelně)",
   "a": 100,
   "u": "g"
  },
  {
   "n": "olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sladká mletá paprika",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "majoránka",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "cukr",
   "a": 0.25,
   "u": "tsp"
  },
  {
   "n": "ocet nebo citronová šťáva",
   "a": 1,
   "u": "tsp"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Cibuli nakrájej nadrobno, česnek nasekej, šunku na kostičky. Fazole sceď a propláchni. Vývar připrav v konvici.",
   "i": [
    3,
    4,
    5,
    0,
    2
   ]
  },
  {
   "t": "Cibule a šunka",
   "d": "V hrnci na oleji restuj cibuli a šunku, až cibule zesklovatí.",
   "s": 300,
   "i": [
    6,
    3,
    5
   ]
  },
  {
   "t": "Česnek a paprika",
   "d": "Přidej česnek a minutu míchej. Stáhni hrnec z plotny a vmíchej mletou papriku.",
   "s": 60,
   "i": [
    4,
    7
   ]
  },
  {
   "t": "Vaření",
   "d": "Vrať na plotnu, přidej rajčata, vývar, fazole, sůl a cukr. Přiveď k varu a nech mírně probublávat.",
   "s": 900,
   "i": [
    1,
    2,
    0,
    9,
    10
   ]
  },
  {
   "t": "Zahuštění",
   "d": "Šťouchadlem rozmačkej asi třetinu fazolí přímo v hrnci a promíchej.",
   "key": true
  },
  {
   "t": "Majoránka",
   "d": "Vmíchej majoránku rozmnutou mezi prsty a povař.",
   "s": 180,
   "i": [
    8
   ]
  },
  {
   "t": "Dochucení",
   "d": "Stáhni z plotny, přidej ocet nebo citron a dochuť solí.",
   "i": [
    11
   ]
  }
 ],
 "tips": [
  "Fazole propláchni — zbavíš se slizkého nálevu.",
  "Majoránku až na konci, dlouhým varem ztrácí vůni.",
  "Druhý den je polévka hustší — při ohřevu přilij vodu.",
  "Fazole Heinz v omáčce fungují taky, jen vynech cukr a zkontroluj lepek."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 20. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "veprova-plec",
 "title": "Pečená vepřová plec s kmínem",
 "subtitle": "Klasika s výpekem, k hranolkám. 1,2 kg masa = 4 porce.",
 "category": "Hlavní jídlo",
 "time": 160,
 "servings": 4,
 "equipment": [
  "trouba",
  "pekac"
 ],
 "tags": [
  "veprove",
  "trouba",
  "vikend"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Knedlo_vepro_zelo_czech_food.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Knedlo_vepro_zelo_czech_food.jpg"
 },
 "key": "Dno pekáče nesmí nikdy vyschnout. Každých 30 minut zkontroluj a dolij horkou vodu, jinak se výpek připálí a zhořkne.",
 "ingredients": [
  {
   "n": "vepřová plec (s kůží nebo tukem)",
   "a": 1200,
   "u": "g"
  },
  {
   "n": "sůl",
   "a": 2,
   "u": "tsp"
  },
  {
   "n": "kmín celý",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku (nepovinné)",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "sádlo nebo máslo",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "voda na podlévání (+ dolévat)",
   "a": 300,
   "u": "ml"
  }
 ],
 "steps": [
  {
   "t": "Příprava masa",
   "d": "Kůži nebo tuk nařízni do mřížky (ne až do masa). Maso osuš papírovou utěrkou.",
   "i": [
    0
   ]
  },
  {
   "t": "Okořenění",
   "d": "Maso ze všech stran vetři solí, kmínem a prolisovaným česnekem. Nech 20 minut odpočinout a mezitím předehřej troubu na 170 °C.",
   "s": 1200,
   "i": [
    1,
    2,
    4
   ]
  },
  {
   "t": "Do pekáče",
   "d": "Cibuli nakrájej na měsíčky a dej na dno pekáče se sádlem. Maso polož kůží nahoru a podlij vodou asi 1 cm.",
   "i": [
    3,
    5,
    6
   ]
  },
  {
   "t": "Pečení přikryté",
   "d": "Přikryj víkem nebo alobalem a peč na 170 °C. Po 30 a 60 minutách zkontroluj vodu na dně, dolij horkou a maso přelij šťávou.",
   "s": 5400,
   "key": true
  },
  {
   "t": "Pečení odkryté",
   "d": "Odkryj, zvyš na 200 °C a peč dozlatova. Vodu jen dolévej, maso už nepřelévej, ať je kůrčička křupavá.",
   "s": 1800
  },
  {
   "t": "Odpočinek",
   "d": "Maso vyndej na prkénko a volně přikryj alobalem. Pekáč s výpekem nech stranou.",
   "s": 600
  },
  {
   "t": "Výpek",
   "d": "Výpek přeceď do kastrůlku, cibuli protlač přes sítko. Když je ho málo, dolij vodu, povař a vyškrábej připečené kousky ze dna pekáče.",
   "s": 300
  },
  {
   "t": "Podávání",
   "d": "Maso nakrájej na plátky přes vlákno a přelij výpekem."
  }
 ],
 "tips": [
  "Na večeři v 18:30 dej maso do trouby kolem 16:00.",
  "Měkkost: vidlička jde snadno. Když klade odpor, ještě 15–20 minut přikryté.",
  "Hranolky dej do trouby, jakmile maso odpočívá (220 °C, cca 20 min).",
  "Pekáč namoč hned po vylití výpeku."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 18. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "sekana-plech",
 "title": "Sekaná na plechu s bramborami",
 "subtitle": "Z kila mletého vepřového, vše na jednom plechu.",
 "category": "Hlavní jídlo",
 "time": 75,
 "servings": 6,
 "equipment": [
  "trouba",
  "plech"
 ],
 "tags": [
  "veprove",
  "trouba",
  "jedno-nadobi",
  "dvakrat"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Meatloaf_on_white_plate.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Meatloaf_on_white_plate.jpg"
 },
 "key": "Směs hněť rukama jen krátce, dokud se nespojí. Přepracovaná sekaná je tuhá.",
 "ingredients": [
  {
   "n": "mleté vepřové",
   "a": 1000,
   "u": "g"
  },
  {
   "n": "vejce",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "střední cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "menší syrová brambora (do směsi)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "bramborový škrob",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "hořčice (bezlepková)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "sůl do masa",
   "a": 2,
   "u": "tsp"
  },
  {
   "n": "sušená majoránka",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "mletý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "brambory na plech",
   "a": 1000,
   "u": "g"
  },
  {
   "n": "olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sůl na brambory",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "kečup na potření (nepovinné)",
   "a": 2,
   "u": "tbsp"
  }
 ],
 "steps": [
  {
   "t": "Trouba",
   "d": "Předehřej na 200 °C (horkovzduch 180 °C). Plech vylož pečicím papírem."
  },
  {
   "t": "Brambory",
   "d": "Brambory nakrájej na měsíčky, promíchej s olejem a solí přímo na plechu a rozlož po okrajích.",
   "i": [
    10,
    11,
    12
   ]
  },
  {
   "t": "Směs",
   "d": "Cibuli a syrovou bramboru nastrouhej najemno, česnek prolisuj. Vše dej do mísy s masem, vejci, škrobem, hořčicí, solí, majoránkou a pepřem a krátce prohněť rukama.",
   "key": true,
   "i": [
    0,
    1,
    2,
    4,
    3,
    5,
    6,
    7,
    8,
    9
   ]
  },
  {
   "t": "Tvarování",
   "d": "Mokrýma rukama vytvaruj dvě šišky a polož je doprostřed plechu mezi brambory."
  },
  {
   "t": "První pečení",
   "d": "Peč 25 minut.",
   "s": 1500
  },
  {
   "t": "Obrácení",
   "d": "Brambory promíchej, sekanou potři kečupem. Peč dalších 25 minut.",
   "s": 1500,
   "i": [
    13
   ]
  },
  {
   "t": "Odpočinek",
   "d": "Nech sekanou 10 minut odpočinout, pak nakrájej na plátky.",
   "s": 600
  }
 ],
 "tips": [
  "Cibule syrová a nastrouhaná — nemusíš ji smažit a ušetříš pánev.",
  "Hotovo, když vytéká čirá šťáva, s teploměrem aspoň 72 °C uvnitř.",
  "Sekaná jde zamrazit na plátky proložené papírem (2–3 měsíce). Brambory ne.",
  "Misku od směsi namoč hned."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 10. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "veprovy-gulas",
 "title": "Vepřový guláš z plece",
 "subtitle": "Klasika se sekaným kmínem, zahuštěná škrobem. 1 kg masa = 5 porcí.",
 "category": "Hlavní jídlo",
 "time": 135,
 "servings": 5,
 "equipment": [
  "hrnec",
  "papinak"
 ],
 "tags": [
  "veprove",
  "papinak",
  "dvakrat"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Hospodsky_gulasek.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Hospodsky_gulasek.jpg"
 },
 "key": "Papriku vmíchej do hrnce staženého z plotny. Na plotně by zhořkla.",
 "ingredients": [
  {
   "n": "vepřová plec, kostky cca 3 cm",
   "a": 1000,
   "u": "g"
  },
  {
   "n": "cibule (cca 4 velké)",
   "a": 700,
   "u": "g"
  },
  {
   "n": "sádlo nebo olej",
   "a": 3,
   "u": "tbsp"
  },
  {
   "n": "sladká paprika",
   "a": 3,
   "u": "tbsp"
  },
  {
   "n": "pálivá paprika (volitelně)",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "kmín celý",
   "a": 2,
   "u": "tsp"
  },
  {
   "n": "rajčatový protlak",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "stroužky česneku",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "majoránka",
   "a": 2,
   "u": "tsp"
  },
  {
   "n": "sůl",
   "a": 2,
   "u": "tsp"
  },
  {
   "n": "mletý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "voda",
   "a": 1000,
   "u": "ml"
  },
  {
   "n": "bramborový škrob",
   "a": 2,
   "u": "tbsp"
  }
 ],
 "steps": [
  {
   "t": "Kmín",
   "d": "Kmín nasyp na prkénko se špetkou soli a nasekej velkým nožem, dokud se nezlomí většina zrnek.",
   "i": [
    5
   ]
  },
  {
   "t": "Krájení",
   "d": "Cibuli nakrájej nadrobno, maso na kostky asi 3 cm.",
   "i": [
    1,
    0
   ]
  },
  {
   "t": "Restování cibule",
   "d": "Na sádle restuj cibuli za častého míchání do zlatohněda. Tady vzniká chuť i hustota.",
   "s": 1200,
   "i": [
    2,
    1
   ]
  },
  {
   "t": "Maso",
   "d": "Přidej maso, osol, opepři a opékej, až zbělá.",
   "s": 600,
   "i": [
    0,
    9,
    10
   ]
  },
  {
   "t": "Paprika mimo plotnu",
   "d": "Odstav hrnec z plotny a vmíchej mletou papriku.",
   "key": true,
   "i": [
    3,
    4
   ]
  },
  {
   "t": "Kmín a protlak",
   "d": "Přidej sekaný kmín a protlak a podlij vodou, aby bylo maso skoro ponořené. Zbytek vody dolévej během dušení.",
   "i": [
    5,
    6,
    11
   ]
  },
  {
   "t": "Dušení",
   "d": "Přiveď k varu, ztlum a duš pod pokličkou do měkka. Občas promíchej a podlij. (V papiňáku 35 min pod tlakem.)",
   "s": 5400
  },
  {
   "t": "Dochucení",
   "d": "Přidej prolisovaný česnek a majoránku. Škrob rozmíchej ve 3 tbsp studené vody, vlij za stálého míchání a provař.",
   "s": 300,
   "i": [
    7,
    8,
    12
   ]
  },
  {
   "t": "Odpočinek",
   "d": "Stáhni z plotny a nech pod pokličkou dojít.",
   "s": 600
  }
 ],
 "tips": [
  "Papiňák: po natlakování stáhni plotnu na ⅓ výkonu (3–4 z 9).",
  "Pálivou papriku pro děti vynech, dospělí si přisypou chilli.",
  "Druhý den je guláš lepší — vař rovnou dvojitou dávku.",
  "Příloha: brambory nebo rýže (klasický knedlík má lepek)."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 8. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kureci-polevka",
 "title": "Kuřecí polévka s rýží a zeleninou",
 "subtitle": "Vývarová, hotová za 30 minut v jednom hrnci.",
 "category": "Polévka",
 "time": 30,
 "servings": 4,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "polevka",
  "kure",
  "rychle",
  "jedno-nadobi"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Bowl_of_chicken_soup.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Bowl_of_chicken_soup.jpg"
 },
 "key": "Zeleninu nejdřív pořádně orestuj dozlatova. Polévka pak chutná jako poctivý vývar, i když se vaří jen chvilku.",
 "ingredients": [
  {
   "n": "olej nebo máslo",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "mrkev",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "petržel (kořen)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "kuřecí prsa",
   "a": 400,
   "u": "g"
  },
  {
   "n": "voda",
   "a": 1500,
   "u": "ml"
  },
  {
   "n": "bujón (bezlepkový)",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "rýže",
   "a": 80,
   "u": "g"
  },
  {
   "n": "mražený hrášek",
   "a": 100,
   "u": "g"
  },
  {
   "n": "petrželová nať",
   "a": 1,
   "u": "hrst"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  }
 ],
 "steps": [
  {
   "t": "Zelenina",
   "d": "Cibuli nakrájej najemno, mrkev a petržel na kolečka, česnek na plátky.",
   "i": [
    1,
    2,
    3,
    4
   ]
  },
  {
   "t": "Orestovat",
   "d": "V hrnci na oleji orestuj cibuli, mrkev a petržel dozlatova. Na konci přidej česnek.",
   "s": 300,
   "key": true,
   "i": [
    0,
    1,
    2,
    3,
    4
   ]
  },
  {
   "t": "Kuře",
   "d": "Kuře nakrájej na malé kostky, přidej do hrnce a krátce opeč, až zbělá.",
   "s": 180,
   "i": [
    5
   ]
  },
  {
   "t": "Zalít a rýže",
   "d": "Zalij vodou, rozdrob bujóny a přisyp propláchnutou rýži. Vař mírně pod pokličkou.",
   "s": 900,
   "i": [
    6,
    7,
    8
   ]
  },
  {
   "t": "Hrášek a dochucení",
   "d": "Přidej hrášek, povař a dochuť solí. Vypni a vmíchej nasekanou nať.",
   "s": 180,
   "i": [
    9,
    11,
    10
   ]
  }
 ],
 "tips": [
  "Rýže rovnou do polévky — nic dalšího k mytí.",
  "Kuře krájej až po zelenině, ať nemusíš mezi tím mýt prkénko.",
  "Stehenní řízky místo prsou jsou šťavnatější.",
  "Druhý den rýže vývar nasaje — při ohřevu dolij vodu."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 10. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "hamburgery",
 "title": "Hamburgery mezi krajíci",
 "subtitle": "Z 500 g míchaného mletého masa, s opečeným bezlepkovým chlebem.",
 "category": "Hlavní jídlo",
 "time": 30,
 "servings": 4,
 "equipment": [
  "panev24"
 ],
 "tags": [
  "hit",
  "rychle",
  "jedno-nadobi"
 ],
 "kidsLiked": true,
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Cheeseburger_maison.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Cheeseburger_maison.jpg"
 },
 "key": "Maso nesol dopředu a placky na pánvi nemačkej. Zbytek odpustí chyby.",
 "ingredients": [
  {
   "n": "míchané mleté maso",
   "a": 500,
   "u": "g"
  },
  {
   "n": "plnotučná hořčice (bezlepková)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "sladká mletá paprika",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sůl",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "mletý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "krajíce bezlepkového chleba",
   "a": 8,
   "u": "ks"
  },
  {
   "n": "plátky sýra",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "kyselé okurky",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "rajče",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "olej na smažení",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "kečup a majonéza",
   "a": 0,
   "u": "podle chuti"
  }
 ],
 "steps": [
  {
   "t": "Ochucení",
   "d": "Maso, hořčici, prolisovaný česnek, papriku a pepř promíchej rukou jen do spojení. Sůl zatím ne.",
   "i": [
    0,
    1,
    2,
    3,
    5
   ]
  },
  {
   "t": "Placky",
   "d": "Vytvaruj 4 placky o kus širší než krajíc, 1,5 cm silné, palcem udělej důlek doprostřed. Dej do lednice a mezitím nakrájej cibuli na kolečka, okurky a rajče na plátky.",
   "s": 600,
   "i": [
    8,
    9,
    10
   ]
  },
  {
   "t": "Chleba",
   "d": "Na suché pánvi opeč krajíce z obou stran dozlatova a dej stranou.",
   "s": 180,
   "i": [
    6
   ]
  },
  {
   "t": "První strana",
   "d": "Až teď placky z obou stran osol. Na rozpálený olej je polož a nehýbej s nimi.",
   "s": 210,
   "key": true,
   "i": [
    4,
    11
   ]
  },
  {
   "t": "Otočit a sýr",
   "d": "Otoč jednou, na každou placku polož plátek sýra a dosmaž. Uvnitř šťavnaté, ne růžové.",
   "s": 180,
   "i": [
    7
   ]
  },
  {
   "t": "Odpočinek",
   "d": "Sundej placky na prkénko, ať se šťáva vsákne zpět.",
   "s": 180
  },
  {
   "t": "Složení",
   "d": "Krajíc potři kečupem a majonézou, navrch maso se sýrem, cibule, okurka, rajče a druhý krajíc.",
   "i": [
    12,
    6,
    8,
    9,
    10
   ]
  }
 ],
 "tips": [
  "Placka se při smažení stáhne — proto širší než krajíc.",
  "Chleba opeč ve stejné pánvi před masem, žádné nádobí navíc.",
  "Mísu od masa hned vypláchni studenou vodou."
 ],
 "notes": [
  {
   "who": "Lukáš",
   "date": "2026-09",
   "text": "Děti hamburgery snědly, hit."
  }
 ],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 13. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Chleba upřesněn na bezlepkový."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "mac-and-cheese",
 "title": "Mac and cheese se šunkou",
 "subtitle": "Verze se sójovým mlékem, omáčka zahuštěná škrobem.",
 "category": "Hlavní jídlo",
 "time": 25,
 "servings": 4,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "testoviny",
  "rychle",
  "jedno-nadobi"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Homemade_mac_and_cheese.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Homemade_mac_and_cheese.jpg"
 },
 "key": "Sójové mléko jen mírně probublávej a sýr přidávej mimo plotnu. Při prudkém varu se sója i sýr srazí.",
 "ingredients": [
  {
   "n": "bezlepkové těstoviny (kolínka)",
   "a": 400,
   "u": "g"
  },
  {
   "n": "šunka, kostičky",
   "a": 200,
   "u": "g"
  },
  {
   "n": "máslo (nebo 3 tbsp oleje)",
   "a": 40,
   "u": "g"
  },
  {
   "n": "kukuřičný škrob (Solamyl)",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sójové mléko, neslazené",
   "a": 600,
   "u": "ml"
  },
  {
   "n": "nastrouhaný eidam",
   "a": 250,
   "u": "g"
  },
  {
   "n": "tavený sýr (nepovinné)",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "sůl (až nakonec)",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "muškátový oříšek",
   "a": 0,
   "u": "špetka"
  }
 ],
 "steps": [
  {
   "t": "Těstoviny",
   "d": "Vař v osolené vodě o minutu kratší než na obalu, sceď a nech stranou.",
   "s": 480,
   "i": [
    0
   ]
  },
  {
   "t": "Škrob a šunka",
   "d": "Škrob rozmíchej v hrnku se studeným sójovým mlékem (cca 4 tbsp). Šunku nakrájej na kostičky.",
   "i": [
    3,
    [
     4,
     0.1
    ],
    1
   ]
  },
  {
   "t": "Šunka",
   "d": "Ve stejném hrnci rozpusť máslo a šunku krátce opeč.",
   "s": 120,
   "i": [
    2,
    1
   ]
  },
  {
   "t": "Omáčka",
   "d": "Ztlum na střední stupeň, přilij zbytek mléka a nech jen mírně probublávat. Vmíchej rozmíchaný škrob a nech zhoustnout.",
   "s": 180,
   "i": [
    [
     4,
     0.9
    ],
    3
   ]
  },
  {
   "t": "Sýr mimo plotnu",
   "d": "Stáhni hrnec z plotny, přidávej sýr po hrstech a míchej, dokud se nerozpustí. Ochutnej, osol a přidej muškát.",
   "key": true,
   "i": [
    5,
    6,
    7,
    8
   ]
  },
  {
   "t": "Spojení",
   "d": "Vrať těstoviny do omáčky, promíchej a nech chvilku stát.",
   "s": 60,
   "i": [
    0
   ]
  }
 ],
 "tips": [
  "Sójové mléko neslazené a bez příchutě.",
  "Nezhoustne? Ještě ½ tbsp škrobu ve studené vodě.",
  "Šunka bývá slaná — sol až po ochutnání. A mrkni na složení kvůli lepku.",
  "Hrnec namoč hned, zaschlý sýr se drhne špatně."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 7. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "sladkokysele-kure",
 "title": "Sladkokyselé kuře",
 "subtitle": "S paprikou a ananasem, evropská verze bez speciálních surovin.",
 "category": "Hlavní jídlo",
 "time": 40,
 "servings": 4,
 "equipment": [
  "wok",
  "ryzovar"
 ],
 "tags": [
  "kure",
  "ryze"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Sweet_and_sour_chicken_5.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Sweet_and_sour_chicken_5.jpg"
 },
 "key": "Kuře vrať do omáčky až úplně na konci a hned podávej. Když se v ní vaří, obal změkne.",
 "ingredients": [
  {
   "n": "kuřecí prsa, kostky",
   "a": 600,
   "u": "g"
  },
  {
   "n": "vejce",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "bramborový škrob (obal)",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "olej",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "paprika (červená a zelená)",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "ananas v kousích (plechovka)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "kečup",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "ocet",
   "a": 3,
   "u": "tbsp"
  },
  {
   "n": "cukr",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "bezlepková sójovka (tamari)",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "škrob do omáčky + 3 tbsp vody",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "rýže",
   "a": 300,
   "u": "g"
  }
 ],
 "steps": [
  {
   "t": "Rýže",
   "d": "Rýži propláchni a pusť v rýžovaru jako první.",
   "i": [
    14
   ]
  },
  {
   "t": "Omáčka",
   "d": "Ananas sceď, šťávu (cca 120 ml) slij do hrnku a smíchej s kečupem, octem, cukrem a sójovkou. Škrob rozmíchej ve 3 tbsp vody a přilij. Kousky ananasu odlož.",
   "i": [
    8,
    9,
    10,
    11,
    12,
    13
   ]
  },
  {
   "t": "Zelenina",
   "d": "Cibuli a papriky nakrájej na kousky asi 2 cm, česnek nasekej.",
   "i": [
    5,
    6,
    7
   ]
  },
  {
   "t": "Obalení",
   "d": "Kuře nakrájej na kostky 2–3 cm, osol, promíchej s rozšlehaným vejcem a zasyp škrobem, aby byl každý kousek obalený.",
   "i": [
    0,
    3,
    1,
    2
   ]
  },
  {
   "t": "1. dávka",
   "d": "Na polovině oleje opeč polovinu kuřete dozlatova. Vyndej na talíř.",
   "s": 300,
   "i": [
    [
     4,
     0.5
    ],
    [
     0,
     0.5
    ]
   ]
  },
  {
   "t": "2. dávka",
   "d": "Přilij zbytek oleje a stejně opeč druhou polovinu. Vyndej k první dávce.",
   "s": 300,
   "i": [
    [
     4,
     0.5
    ],
    [
     0,
     0.5
    ]
   ]
  },
  {
   "t": "Zelenina na pánev",
   "d": "Ve stejné pánvi krátce orestuj cibuli, papriky a česnek. Má zůstat trochu křupavá.",
   "s": 180,
   "i": [
    5,
    6,
    7
   ]
  },
  {
   "t": "Zahuštění",
   "d": "Omáčku v hrnku promíchej (škrob se usadí), vlij do pánve a nech probublat, dokud nezhoustne a nezleskne.",
   "s": 120
  },
  {
   "t": "Vrátit kuře",
   "d": "Vrať opečené kuře z talíře a kousky ananasu, jen promíchej, aby se obalily omáčkou, a hned podávej s rýží.",
   "s": 60,
   "key": true,
   "i": [
    0,
    8
   ]
  }
 ],
 "tips": [
  "Kuře opékej ve dvou dávkách, přeplněná pánev ho dusí.",
  "Dětem omáčku zvlášť na namáčení.",
  "Zbytky skladuj kuře a omáčku odděleně.",
  "Pánev hned namoč, zaschlý škrob se špatně drhne."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 22. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "oyakodon",
 "title": "Oyakodon z rýžovaru",
 "subtitle": "Kuře s vejcem na rýži, vše v rýžovaru.",
 "category": "Hlavní jídlo",
 "time": 55,
 "servings": 4,
 "equipment": [
  "ryzovar"
 ],
 "tags": [
  "kure",
  "ryze",
  "jedno-nadobi"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Oyakodon_003.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Oyakodon_003.jpg"
 },
 "key": "Navrstvi a nemíchej: rýže dole, kuře s omáčkou a cibule navrch. Vejce až po pípnutí.",
 "ingredients": [
  {
   "n": "rýže (jasmínová nebo kulatozrnná)",
   "a": 300,
   "u": "g"
  },
  {
   "n": "kuřecí stehna bez kosti",
   "a": 500,
   "u": "g"
  },
  {
   "n": "větší cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "voda",
   "a": 280,
   "u": "ml"
  },
  {
   "n": "bezlepková sójovka (tamari)",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "cukr",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "vejce",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "jarní cibulka (nepovinné)",
   "a": 2,
   "u": "ks"
  }
 ],
 "steps": [
  {
   "t": "Rýže",
   "d": "Rýži propláchni 2–3× studenou vodou, slij.",
   "i": [
    0
   ]
  },
  {
   "t": "Omáčka",
   "d": "Smíchej vodu, sójovku a cukr, až se cukr rozpustí.",
   "i": [
    3,
    4,
    5
   ]
  },
  {
   "t": "Naložit",
   "d": "Kuře nakrájej na kostky 2–3 cm, cibuli na proužky. Kuře vmíchej do omáčky a nech stát.",
   "s": 600,
   "i": [
    1,
    2
   ]
  },
  {
   "t": "Navrstvit",
   "d": "Rýži do misky rýžovaru, zalij omáčkou i s kuřetem, navrch cibule. Nemíchej.",
   "key": true
  },
  {
   "t": "Vařit",
   "d": "Spusť program na rýži. Tvůj rýžovar bývá rychlejší — řiď se pípnutím. Pak rozkroj větší kousek kuřete, nesmí být růžový.",
   "s": 2400
  },
  {
   "t": "Vejce",
   "d": "Vejce lehce rozmíchej vidličkou, nalij navrch, zavři a nech na ohřevu. Pro děti o 5 minut déle.",
   "s": 600,
   "i": [
    6
   ]
  },
  {
   "t": "Podávej",
   "d": "Jarní cibulku nakrájej na kolečka. Nabírej po vrstvách do misek a posyp cibulkou.",
   "i": [
    7
   ]
  }
 ],
 "tips": [
  "Stehna jsou lepší než prsa, v rýžovaru nevyschnou.",
  "Nepřekroč rysku maximální náplně.",
  "Misku hned namoč, připečená rýže pak jde dolů sama."
 ],
 "notes": [
  {
   "who": "Lukáš, Tomáš, Anička",
   "date": "2026-10-21",
   "text": "Všem třem chutnalo (hodnocení z appky)."
  }
 ],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 17. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Sójová omáčka nahrazena bezlepkovou (tamari)."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ],
 "kidsLiked": true
},
{
 "id": "livance",
 "title": "Bezlepkové lívance",
 "subtitle": "Nadýchané, z běžné bezlepkové směsi. 4 porce ≈ 16 lívanců.",
 "category": "Snídaně",
 "time": 30,
 "servings": 4,
 "equipment": [
  "panev24"
 ],
 "tags": [
  "snidane",
  "sladke",
  "rychle"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Pancakes_(Unsplash_CKipn7XSyEU).jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Pancakes_(Unsplash_CKipn7XSyEU).jpg"
 },
 "key": "Nech těsto 10 minut odpočinout. Bezlepková mouka pomalu nasává tekutinu a lívance pak drží tvar.",
 "ingredients": [
  {
   "n": "bezlepková mouka (univerzální směs)",
   "a": 250,
   "u": "g"
  },
  {
   "n": "vejce",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "mléko",
   "a": 300,
   "u": "ml"
  },
  {
   "n": "cukr",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "bezlepkový prášek do pečiva",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sůl",
   "a": 0,
   "u": "špetka"
  },
  {
   "n": "rozpuštěné máslo",
   "a": 30,
   "u": "g"
  },
  {
   "n": "olej na pánev",
   "a": 1,
   "u": "tbsp"
  }
 ],
 "steps": [
  {
   "t": "Suché",
   "d": "V míse prošlehej mouku, cukr, prášek do pečiva a sůl.",
   "i": [
    0,
    3,
    4,
    5
   ]
  },
  {
   "t": "Mokré",
   "d": "Máslo rozpusť (mikrovlnka 30 s). Přidej do mísy vejce, mléko a máslo a vyšlehej hladké hustší těsto.",
   "i": [
    1,
    2,
    6
   ]
  },
  {
   "t": "Odpočinek",
   "d": "Nech těsto stát. Mezitím rozehřej pánev na středně vysoký stupeň.",
   "s": 600,
   "key": true
  },
  {
   "t": "První strana",
   "d": "Pánev potři olejem, dávej po 1 tbsp těsta, 3–4 lívance najednou. Peč, dokud se na povrchu neudělají bublinky.",
   "s": 120,
   "i": [
    7
   ]
  },
  {
   "t": "Obrátit",
   "d": "Obrať a dopeč dozlatova. Hotové dávej na talíř do trouby na 60 °C a opakuj se zbytkem těsta.",
   "s": 90
  },
  {
   "t": "Podávej",
   "d": "S tvarohem a ovocem, marmeládou nebo javorovým sirupem."
  }
 ],
 "tips": [
  "Po prvním lívanci ztlum na střední stupeň, elektrická plotna drží teplo.",
  "Obracej, až okraje zmatní, dřív se trhají.",
  "Hotové na talíř do trouby na 60 °C.",
  "Mísu hned namoč, těsto zaschne jako beton."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 10. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "banana-bread",
 "title": "Bezlepkový banana bread",
 "subtitle": "Hranatá forma 30 × 11 cm, 175 °C, v robotu Bosch MUM 5.",
 "category": "Pečení",
 "time": 100,
 "servings": 12,
 "servingsLabel": "plátků",
 "equipment": [
  "robot",
  "forma",
  "trouba"
 ],
 "tags": [
  "peceni",
  "sladke"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Banana_bread_loaf_on_a_plate.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Banana_bread_loaf_on_a_plate.jpg"
 },
 "key": "Po přidání mouky už jen krátce promíchej (stupeň 1, cca 30 s). Přemíchané bezlepkové těsto je hutné.",
 "ingredients": [
  {
   "n": "velmi zralé banány (cca 400 g bez slupky)",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "vejce",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "změklé máslo nebo Hera",
   "a": 110,
   "u": "g"
  },
  {
   "n": "cukr",
   "a": 120,
   "u": "g"
  },
  {
   "n": "vanilkový cukr (sáček)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "bezlepková mouka na pečení",
   "a": 250,
   "u": "g"
  },
  {
   "n": "bezlepkový kypřicí prášek",
   "a": 12,
   "u": "g"
  },
  {
   "n": "sůl",
   "a": 0,
   "u": "špetka"
  },
  {
   "n": "mléko",
   "a": 50,
   "u": "ml"
  },
  {
   "n": "čokoláda nebo ořechy (volitelně)",
   "a": 80,
   "u": "g"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Troubu na 175 °C horní/spodní, formu vylož papírem s přesahem.",
   "s": 600
  },
  {
   "t": "Banány",
   "d": "Banány oloupej a rozmačkej vidličkou na kaši.",
   "i": [
    0
   ]
  },
  {
   "t": "Máslo a cukr",
   "d": "Do mísy robota dej máslo s cukrem a vanilkovým cukrem, míchací metlou šlehej do světlé pěny.",
   "s": 180,
   "tag": "stupeň 4",
   "i": [
    2,
    3,
    4
   ]
  },
  {
   "t": "Vejce",
   "d": "Přidávej vejce po jednom, každé nech zapracovat.",
   "tag": "stupeň 3",
   "i": [
    1
   ]
  },
  {
   "t": "Banány a mléko",
   "d": "Přidej banánovou kaši a mléko, krátce promíchej.",
   "tag": "stupeň 2",
   "i": [
    0,
    8
   ]
  },
  {
   "t": "Mouka",
   "d": "Mouku smíchej s práškem a solí, přisyp a míchej jen do spojení (cca 30 s). Čokoládu nebo ořechy vmíchej stěrkou.",
   "tag": "stupeň 1",
   "key": true,
   "i": [
    5,
    6,
    7,
    9
   ]
  },
  {
   "t": "Odpočinek těsta",
   "d": "Nech těsto stát, mouka nasaje tekutinu.",
   "s": 600
  },
  {
   "t": "Pečení",
   "d": "Nalij do formy a uhlaď. Peč 55–65 minut, po 35 minutách přikryj alobalem. Hotovo, když špejle vyjde suchá.",
   "s": 3600
  },
  {
   "t": "Chladnutí",
   "d": "15 minut nech ve formě, pak vytáhni za papír na mřížku a nech úplně vychladnout.",
   "s": 900
  }
 ],
 "tips": [
  "Banány skoro černé = sladší a vláčnější.",
  "Krájej až vychladlý, teplý se drolí. Plátky jdou zamrazit.",
  "Čtvercová forma 20 × 20: špejlí kontroluj už kolem 40. minuty.",
  "Mísu robota a metlu namoč hned."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 10. 10. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "mramorova-babovka",
 "title": "Mramorová bábovka",
 "subtitle": "Nadýchaná, v robotu Bosch MUM 5, hranatá forma 30 × 11 cm.",
 "category": "Pečení",
 "time": 90,
 "servings": 12,
 "servingsLabel": "plátků",
 "equipment": [
  "robot",
  "forma",
  "trouba"
 ],
 "tags": [
  "peceni",
  "sladke"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Marble_B%C3%A1bovka.JPG?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Marble_B%C3%A1bovka.JPG"
 },
 "key": "Máslo s cukrem šlehej celých 5 minut do světlé pěny — z toho je nadýchanost. V půlce shrň máslo ze stěn.",
 "ingredients": [
  {
   "n": "změklé máslo nebo Hera",
   "a": 200,
   "u": "g"
  },
  {
   "n": "cukr",
   "a": 180,
   "u": "g"
  },
  {
   "n": "vanilkový cukr (sáček)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "vejce (pokojová teplota)",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "bezlepková mouka na pečení",
   "a": 250,
   "u": "g"
  },
  {
   "n": "bezlepkový kypřicí prášek",
   "a": 12,
   "u": "g"
  },
  {
   "n": "mléko",
   "a": 100,
   "u": "ml"
  },
  {
   "n": "kakao",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "mléko do kakaové části",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 0,
   "u": "špetka"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Máslo a vejce vytáhni hodinu předem z lednice (Hera stačí 15–20 min). Troubu na 170 °C, formu vylož papírem.",
   "s": 600
  },
  {
   "t": "Máslo a cukr — 1. půlka",
   "d": "Do mísy robota dej máslo, cukr a vanilkový cukr, šlehej míchací metlou.",
   "s": 150,
   "tag": "stupeň 4",
   "key": true,
   "i": [
    0,
    1,
    2
   ]
  },
  {
   "t": "Shrnout",
   "d": "Zastav robota a stěrkou shrň máslo ze stěn dolů."
  },
  {
   "t": "Máslo a cukr — 2. půlka",
   "d": "Šlehej dál do světlé nadýchané pěny.",
   "s": 150,
   "tag": "stupeň 4"
  },
  {
   "t": "Vejce",
   "d": "Přidávej vejce po jednom, každé cca 30 s.",
   "tag": "stupeň 3",
   "i": [
    3
   ]
  },
  {
   "t": "Mouka a mléko",
   "d": "Mouku smíchej s práškem a solí. Střídavě s mlékem přidávej do mísy, jen do spojení (30–40 s). Zbytek dotáhni stěrkou.",
   "tag": "stupeň 1",
   "i": [
    4,
    5,
    9,
    6
   ]
  },
  {
   "t": "Kakaová část",
   "d": "Třetinu těsta přendej do jiné misky a lžící vmíchej kakao s mlékem.",
   "i": [
    7,
    8
   ]
  },
  {
   "t": "Mramorování",
   "d": "Do formy střídavě dávej světlé a tmavé těsto, vidličkou jednou provlni."
  },
  {
   "t": "Pečení",
   "d": "Peč 45–55 minut, od 40. minuty kontroluj špejlí. Hotovo, když vyjde suchá.",
   "s": 3000
  },
  {
   "t": "Chladnutí",
   "d": "10 minut nech ve formě, pak vytáhni za papír.",
   "s": 600
  }
 ],
 "tips": [
  "Šlehací metla (jemné drátky) je na sníh, na máslo použij míchací.",
  "Hera 1 : 1 místo másla funguje, přidej víc vanilky nebo citronovou kůru.",
  "Čtvercová forma 20 × 20: špejle už kolem 40. minuty.",
  "Mísu a metlu napusť vodou hned po nalití těsta."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 10. 10. 2026 (doplněno ze shrnutí)",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "tortilla-espanola",
 "title": "Tortilla española z mikrovlnky",
 "subtitle": "Bramborová tortilla na celou pánev 24 cm, brambory předvařené v mikrovlnce.",
 "category": "Hlavní jídlo",
 "time": 30,
 "servings": 4,
 "equipment": [
  "panev24",
  "mikrovlnka"
 ],
 "tags": [
  "rychle",
  "jedno-nadobi"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Tortilla_Espa%C3%B1ola.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Tortilla_Espa%C3%B1ola.jpg"
 },
 "key": "Brambory z mikrovlnky jsou skoro hotové, stačí je s cibulí jen orestovat dozlatova. Žádné dlouhé dušení v oleji.",
 "ingredients": [
  {
   "n": "brambory (syrové)",
   "a": 600,
   "u": "g"
  },
  {
   "n": "velká vejce",
   "a": 5,
   "u": "ks"
  },
  {
   "n": "menší cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "olej na smažení",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 1,
   "u": "tsp"
  }
 ],
 "steps": [
  {
   "t": "Brambory v mikrovlnce",
   "d": "Brambory oloupej a nakrájej na plátky asi 0,5 cm. Dej do misky, pokap lžící vody, přikryj a dej na plný výkon. V půlce promíchej. Mají být měkké, ale ne rozpadlé.",
   "s": 420,
   "i": [
    0
   ]
  },
  {
   "t": "Cibule",
   "d": "Cibuli nakrájej na tenké proužky.",
   "i": [
    2
   ]
  },
  {
   "t": "Orestovat",
   "d": "Na pánvi 24 cm rozehřej většinu oleje na střední stupeň, orestuj cibuli doměkka, přidej brambory a opatrně restuj, až lehce zezlátnou.",
   "s": 360,
   "key": true,
   "i": [
    [
     3,
     0.75
    ],
    2,
    0
   ]
  },
  {
   "t": "Vejce",
   "d": "V míse rozšlehej vejce se solí, vmíchej brambory s cibulí z pánve a nech pár minut nasáknout.",
   "s": 300,
   "i": [
    1,
    4
   ]
  },
  {
   "t": "První strana",
   "d": "Do pánve dej zbytek oleje, nalij směs a na mírném stupni smaž, dokud okraje nezpevní.",
   "s": 240,
   "i": [
    [
     3,
     0.25
    ]
   ]
  },
  {
   "t": "Obrátit",
   "d": "Přiklop pánev velkým plochým talířem, rychle otoč a tortillu sklouzni zpět nesmaženou stranou dolů."
  },
  {
   "t": "Druhá strana",
   "d": "Dosmaž na mírném stupni, střed má zůstat jemně šťavnatý, ne tekutý.",
   "s": 180
  },
  {
   "t": "Odpočinek",
   "d": "Sundej z pánve, nech chvíli ustálit a krájej na klíny.",
   "s": 180
  }
 ],
 "tips": [
  "Talíř na obracení o něco větší než pánev.",
  "Pánev hned po vyklopení namoč do vody.",
  "Chutná i vlažná nebo studená druhý den."
 ],
 "notes": [
  {
   "who": "Lukáš",
   "date": "2026-10-21",
   "text": "Chutnalo (hodnocení z appky)."
  }
 ],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 26. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kfc-palicky",
 "title": "Domácí „KFC“ paličky z trouby",
 "subtitle": "Křupavé obalované paličky bez smažení. 750 g = 3 porce.",
 "category": "Hlavní jídlo",
 "time": 90,
 "servings": 3,
 "equipment": [
  "trouba",
  "plech"
 ],
 "tags": [
  "hit",
  "kure",
  "trouba"
 ],
 "kidsLiked": true,
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Crispy_Fried_Chicken_Drumsticks_Leg_Piece.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Crispy_Fried_Chicken_Drumsticks_Leg_Piece.jpg"
 },
 "key": "Před obalením nech paličky okapat nad miskou. Moc marinády je důvod, proč obal měkne a opadává.",
 "ingredients": [
  {
   "n": "kuřecí paličky",
   "a": 750,
   "u": "g"
  },
  {
   "n": "kefír nebo bílý jogurt",
   "a": 150,
   "u": "ml"
  },
  {
   "n": "plnotučná hořčice (bezlepková)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "vejce",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "bezlepková strouhanka nebo drcené kukuřičné lupínky",
   "a": 120,
   "u": "g"
  },
  {
   "n": "bramborový škrob",
   "a": 3,
   "u": "tbsp"
  },
  {
   "n": "mletá sladká paprika",
   "a": 2,
   "u": "tsp"
  },
  {
   "n": "sušený česnek",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sušený tymián nebo majoránka",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sůl",
   "a": 1.5,
   "u": "tsp"
  },
  {
   "n": "mletý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "olej na pokapání",
   "a": 3,
   "u": "tbsp"
  }
 ],
 "steps": [
  {
   "t": "Marináda",
   "d": "V misce rozmíchej kefír, hořčici a vejce. Vlož paličky, promíchej a nech stát (klidně půl dne v lednici).",
   "s": 1800,
   "i": [
    1,
    2,
    3,
    0
   ]
  },
  {
   "t": "Trouba",
   "d": "200 °C (horkovzduch 185 °C). Plech s pečicím papírem, ideálně mřížka na plechu.",
   "s": 900
  },
  {
   "t": "Obalovací směs",
   "d": "Na velkém talíři smíchej strouhanku, škrob, koření, sůl a pepř.",
   "i": [
    4,
    5,
    6,
    7,
    8,
    9,
    10
   ]
  },
  {
   "t": "Obalit",
   "d": "Paličky nech okapat nad miskou, pak je přitlač do směsi ze všech stran. Pokládej na plech tak, aby se nedotýkaly. Mokrá ruka, suchá ruka.",
   "key": true,
   "i": [
    0
   ]
  },
  {
   "t": "Pokapat olejem",
   "d": "Rovnoměrně pokapej olejem. Bez něj zůstane obal bílý a moučný.",
   "i": [
    [
     11,
     0.7
    ]
   ]
  },
  {
   "t": "První pečení",
   "d": "Peč a nehýbej s nimi.",
   "s": 1500
  },
  {
   "t": "Obrátit a dopéct",
   "d": "Otoč, spodní stranu jen lehce potři zbytkem oleje. Mražené hranolky můžeš přidat teď. Když je obal měkký, zvyš na 220 °C a posledních 5 minut zapni gril.",
   "s": 1200,
   "i": [
    [
     11,
     0.3
    ]
   ]
  },
  {
   "t": "Odpočinek",
   "d": "Nech 5 minut stát, obal se ustálí.",
   "s": 300
  }
 ],
 "tips": [
  "Opadané kousky nepřimáčkávej zpět, strhneš další.",
  "Drcené neslazené kukuřičné lupínky drží líp a zůstanou křupavé i vychladlé (hlídej, ať jsou bezlepkové).",
  "Dip: zakysaná smetana s pažitkou, nebo kečup.",
  "Studené druhý den do krabičky."
 ],
 "notes": [
  {
   "who": "Lukáš",
   "date": "2026-09",
   "text": "Po obrácení byl obal měkký a opadával. Příště nechat paličky před obalením okapat."
  }
 ],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 12. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Strouhanka a mouka nahrazeny bezlepkovými, přidáno okapání před obalením."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "burtgulas",
 "title": "Buřtguláš z dunajské a uherské",
 "subtitle": "Z trvanlivých klobás. Sůl až úplně na konci.",
 "category": "Hlavní jídlo",
 "time": 40,
 "servings": 4,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "hit",
  "jedno-nadobi",
  "dvakrat"
 ],
 "kidsLiked": true,
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Gulasch.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Gulasch.jpg"
 },
 "key": "Klobásy vyškvař nasucho, vyndej a vrať je až na konci jen prohřát. Kdyby se vařily celou dobu, ztvrdnou a omáčka se přesolí.",
 "ingredients": [
  {
   "n": "dunajská klobása",
   "a": 200,
   "u": "g"
  },
  {
   "n": "uherská klobása",
   "a": 200,
   "u": "g"
  },
  {
   "n": "cibule (asi 2 velké)",
   "a": 300,
   "u": "g"
  },
  {
   "n": "sádlo nebo olej (jen když je potřeba)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "mletá sladká paprika",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "bezlepková mouka nebo bramborový škrob",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "rajčatový protlak",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "voda nebo vývar (bezlepkový)",
   "a": 600,
   "u": "ml"
  },
  {
   "n": "plnotučná hořčice (bezlepková)",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "majoránka",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "mletý kmín",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "pepř, kapka octa, sůl",
   "a": 0,
   "u": "podle chuti"
  }
 ],
 "steps": [
  {
   "t": "Krájení",
   "d": "Obě klobásy nakrájej na tenká kolečka (3 mm), cibuli nadrobno, česnek utři.",
   "i": [
    0,
    1,
    2,
    4
   ]
  },
  {
   "t": "Vyškvařit klobásy",
   "d": "Do suchého hrnce dej kolečka klobás a na středním stupni nech pustit tuk. Vyndej je děrovanou lžící na talíř, tuk nech v hrnci.",
   "s": 240,
   "key": true,
   "i": [
    0,
    1
   ]
  },
  {
   "t": "Cibule",
   "d": "Ve vypečeném tuku restuj cibuli dozlatova. Když je dno suché, přidej sádlo.",
   "s": 360,
   "i": [
    2,
    3
   ]
  },
  {
   "t": "Paprika mimo plotnu",
   "d": "Stáhni hrnec z plotny, vsyp papriku, mouku a kmín a rychle promíchej.",
   "i": [
    5,
    6,
    11
   ]
  },
  {
   "t": "Zalít a povařit",
   "d": "Vrať na plotnu, vmíchej protlak, za stálého míchání zalij vodou a mírně vař odkryté, až omáčka zhoustne.",
   "s": 1080,
   "i": [
    7,
    8
   ]
  },
  {
   "t": "Vrátit klobásy",
   "d": "Vrať kolečka klobás z talíře zpět do hrnce a jen prohřej.",
   "s": 300,
   "i": [
    0,
    1
   ]
  },
  {
   "t": "Dochutit",
   "d": "Vmíchej hořčici, majoránku a česnek, opepři a přidej kapku octa. Teprve teď ochutnej a případně osol.",
   "i": [
    9,
    10,
    4,
    12
   ]
  }
 ],
 "tips": [
  "Uherská je pálivější — mletou papriku jen sladkou.",
  "Dětem naber dřív, než dochutíš pepřem a octem.",
  "400 g klobás = 4 porce s chlebem, s přílohou i 5.",
  "Třetí den s přidanými párky pořád hit."
 ],
 "notes": [
  {
   "who": "Lukáš",
   "date": "2026-09",
   "text": "Vydrželo na tři dny, třetí den s párky — dětem chutnalo."
  }
 ],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 8. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Hladká mouka nahrazena bezlepkovou / škrobem."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kure-na-paprice",
 "title": "Kuře na paprice v papiňáku",
 "subtitle": "Klasika hotová za necelou půlhodinu.",
 "category": "Hlavní jídlo",
 "time": 35,
 "servings": 2,
 "equipment": [
  "papinak"
 ],
 "tags": [
  "kure",
  "papinak",
  "rychle"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Chicken_Paprikas.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Chicken_Paprikas.jpg"
 },
 "key": "Papriku sypej do hrnce staženého z plotny a hned zalij. Spálená paprika je hořká a nejde zachránit.",
 "ingredients": [
  {
   "n": "kuřecí stehna s kostí",
   "a": 700,
   "u": "g"
  },
  {
   "n": "velká cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "sádlo nebo olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "mletá sladká paprika",
   "a": 1.5,
   "u": "tbsp"
  },
  {
   "n": "voda nebo vývar (bezlepkový)",
   "a": 200,
   "u": "ml"
  },
  {
   "n": "sůl",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "smetana ke šlehání 31 %",
   "a": 250,
   "u": "ml"
  },
  {
   "n": "bezlepková mouka nebo bramborový škrob",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "citronová šťáva (volitelně)",
   "a": 1,
   "u": "tsp"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Stehna osuš papírovou utěrkou a osol polovinou soli. Cibuli nakrájej najemno.",
   "i": [
    0,
    [
     5,
     0.5
    ],
    1
   ]
  },
  {
   "t": "Opéct maso",
   "d": "V otevřeném papiňáku rozehřej sádlo a stehna opeč z obou stran dozlatova. Vyndej je na talíř.",
   "s": 420,
   "i": [
    2,
    0
   ]
  },
  {
   "t": "Cibule",
   "d": "Ve výpeku smaž cibuli do sklovita až zlatova.",
   "s": 360,
   "i": [
    1
   ]
  },
  {
   "t": "Paprika mimo plotnu",
   "d": "Papiňák ODSTAV z plotny, vsyp papriku, promíchej a hned zalij vodou. Vrať na plotnu.",
   "key": true,
   "i": [
    3,
    4
   ]
  },
  {
   "t": "Vrátit stehna a natlakovat",
   "d": "Vrať stehna z talíře do papiňáku i se šťávou, která z nich vytekla. Zavři, natlakuj a od zasyčení vař na mírném stupni (po natlakování stáhni plotnu na ⅓). Vykostěná stehna 8 min, prsa 5 min.",
   "s": 720,
   "i": [
    0
   ]
  },
  {
   "t": "Odpustit tlak",
   "d": "Odstav z plotny a nech tlak klesnout sám (nebo po 5 minutách odpusť ventilem). Otevři a stehna přendej na talíř.",
   "s": 300
  },
  {
   "t": "Obrat maso z kostí",
   "d": "Až stehna trochu zchladnou, obereš maso vidličkou z kostí a kůže a natrháš na větší kusy. Kosti a kůži vyhoď. (Můžeš je nechat i vcelku.)"
  },
  {
   "t": "Zahustit omáčku",
   "d": "Mezitím ve smetaně rozšlehej mouku dohladka (vidličkou v hrnku), vlij do omáčky za stálého míchání a povař, až zhoustne.",
   "s": 240,
   "i": [
    6,
    7
   ]
  },
  {
   "t": "Vrátit maso",
   "d": "Vrať maso do omáčky, zamíchej a prohřej na mírném stupni. Už nevař prudce.",
   "s": 180,
   "i": [
    0
   ]
  },
  {
   "t": "Dochutit",
   "d": "Dosol zbytkem soli, případně přidej citronovou šťávu. Podávej s rýží, těstovinami nebo bezlepkovým knedlíkem.",
   "i": [
    [
     5,
     0.5
    ],
    8
   ]
  }
 ],
 "tips": [
  "Po natlakování stáhni plotnu hned na ⅓ výkonu.",
  "Příloha: rýže, bezlepkové těstoviny nebo bezlepkový knedlík.",
  "Nádobí hned umyj, smetana s paprikou zaschne do krusty."
 ],
 "notes": [],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 23. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Mouka a knedlík upraveny na bezlepkové."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kure-plech-brambory",
 "title": "Kuře na plechu s bramborami a paprikami",
 "subtitle": "Plech rozdělený na dětskou a dospěláckou půlku. Jen nakrájet a čekat.",
 "category": "Hlavní jídlo",
 "time": 80,
 "servings": 4,
 "equipment": [
  "trouba",
  "plech"
 ],
 "tags": [
  "kure",
  "trouba",
  "jedno-nadobi"
 ],
 "kidsLiked": true,
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Roasted_chicken_and_potatoes.JPG?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Roasted_chicken_and_potatoes.JPG"
 },
 "key": "Kuře polož nad kořeněnou půlku. Dětské brambory musí ležet mimo kapající šťávu — přesně to rozhodne, jestli jim budou chutnat.",
 "ingredients": [
  {
   "n": "kuřecí čtvrtky nebo stehna",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "brambory (typ B)",
   "a": 1000,
   "u": "g"
  },
  {
   "n": "paprika",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "olej",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "máslo (na dětské brambory)",
   "a": 20,
   "u": "g"
  },
  {
   "n": "stroužky česneku",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "mletá sladká paprika",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "sůl",
   "a": 0,
   "u": "podle chuti"
  }
 ],
 "steps": [
  {
   "t": "Trouba",
   "d": "200 °C (horkovzduch 180 °C), plech s pečicím papírem.",
   "s": 600
  },
  {
   "t": "Brambory",
   "d": "Brambory oloupej a nakrájej na stejné kusy cca 3 cm.",
   "i": [
    1
   ]
  },
  {
   "t": "Rozdělit plech",
   "d": "Brambory promíchej s olejem a solí a rozlož jednovrstvě. Cibuli nakrájej na měsíčky, česnek prolisuj. Na jednu půlku plechu přisyp mletou papriku, česnek a cibuli, druhou nech jen se solí.",
   "i": [
    4,
    8,
    7,
    6,
    3
   ]
  },
  {
   "t": "Kuře",
   "d": "Kuře osol a polož kůží nahoru nad kořeněnou půlku. Dětské brambory musí zůstat mimo kapající šťávu.",
   "key": true,
   "i": [
    0
   ]
  },
  {
   "t": "První pečení",
   "d": "Plech doprostřed trouby, nic nemíchej.",
   "s": 2100
  },
  {
   "t": "Papriky",
   "d": "Papriky nakrájej na širší proužky a rozházej kolem kuřete. Dětskou stranu opatrně promíchej.",
   "i": [
    2
   ]
  },
  {
   "t": "Dopéct",
   "d": "Peč, až kůže zezlátne a šťáva u kosti je čirá.",
   "s": 1500
  },
  {
   "t": "Odpočinek",
   "d": "Nech kuře 5 minut stát, dětské brambory pokapej rozpuštěným máslem.",
   "s": 300,
   "i": [
    5
   ]
  }
 ],
 "tips": [
  "Mletá paprika a bylinky jen na dospěláckou půlku.",
  "Kůži osuš utěrkou, líp zezlátne.",
  "Zbytky v troubě na 180 °C 12 minut, mikrovlnka udělá z brambor gumu.",
  "Nevyjde to? Dětské brambory uvař zvlášť a jen na konci dej na plech."
 ],
 "notes": [
  {
   "who": "Lukáš",
   "date": "2026-08",
   "text": "Kuře dětem chutnalo, brambory byly moc kořeněné — proto dělený plech."
  }
 ],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 28. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Opraveno přepočítávání množství (původní widget počítal suroviny pro 1 porci)."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "smetanove-testoviny",
 "title": "Smetanové těstoviny s kuřetem",
 "subtitle": "Rychlá krémová klasika za 30 minut.",
 "category": "Hlavní jídlo",
 "time": 30,
 "servings": 2,
 "equipment": [
  "panev24",
  "hrnec"
 ],
 "tags": [
  "kure",
  "testoviny",
  "rychle"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Pasta_with_a_Chicken_Lemon_Cream_Sauce_(764644143).jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Pasta_with_a_Chicken_Lemon_Cream_Sauce_(764644143).jpg"
 },
 "key": "Kuře osmahni pořádně dozlatova a omáčku dělej ve stejné pánvi — připečené kousky dají chuť.",
 "ingredients": [
  {
   "n": "bezlepkové těstoviny (penne, vřetena)",
   "a": 200,
   "u": "g"
  },
  {
   "n": "kuřecí prsa",
   "a": 250,
   "u": "g"
  },
  {
   "n": "smetana ke šlehání 31 %",
   "a": 200,
   "u": "ml"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "mletý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "parmezán nebo tvrdý sýr",
   "a": 40,
   "u": "g"
  }
 ],
 "steps": [
  {
   "t": "Těstoviny",
   "d": "Vař v osolené vodě podle obalu. Před slitím odlož hrnek vody, pak sceď.",
   "s": 600,
   "i": [
    0
   ]
  },
  {
   "t": "Krájení",
   "d": "Kuře nakrájej na nudličky, cibuli nadrobno, česnek najemno.",
   "i": [
    1,
    3,
    4
   ]
  },
  {
   "t": "Kuře",
   "d": "Na oleji osmahni kuře dozlatova, osol a opepři. Vyndej na talíř.",
   "s": 360,
   "key": true,
   "i": [
    5,
    1,
    6,
    7
   ]
  },
  {
   "t": "Cibule a česnek",
   "d": "Ve stejné pánvi osmahni cibuli doměkka, pak chvilku česnek.",
   "s": 240,
   "i": [
    3,
    4
   ]
  },
  {
   "t": "Smetana a kuře",
   "d": "Vrať kuře z talíře do pánve, přilij smetanu a nech probublat. Hustou omáčku uvolni vodou z těstovin.",
   "s": 300,
   "i": [
    1,
    2
   ]
  },
  {
   "t": "Spojit",
   "d": "Vmíchej těstoviny a strouhaný sýr, dochuť solí a pepřem.",
   "i": [
    0,
    8
   ]
  }
 ],
 "tips": [
  "Cibuli pro děti nastrouhej nebo vynech.",
  "Hrášek nebo špenát na poslední minuty.",
  "Bez smetany: mléko s lžící másla."
 ],
 "notes": [],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 9. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Těstoviny upřesněny na bezlepkové."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "paprikova-pomazanka",
 "title": "Papriková pomazánka",
 "subtitle": "Jemná, bez vaření, za 10 minut plus odležení.",
 "category": "Svačina",
 "time": 40,
 "servings": 4,
 "equipment": [],
 "tags": [
  "rychle",
  "svacina"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Pomaz%C3%A1nkov%C3%A9_m%C3%A1slo_587.JPG?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Pomaz%C3%A1nkov%C3%A9_m%C3%A1slo_587.JPG"
 },
 "key": "Papriku nakrájej na drobné kostičky a osuš na papírové utěrce. Jinak pomazánka pustí vodu.",
 "ingredients": [
  {
   "n": "pomazánkové máslo",
   "a": 250,
   "u": "g"
  },
  {
   "n": "červená paprika (cca 150 g)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "malá cibule (u dětí vynech)",
   "a": 0.5,
   "u": "ks"
  },
  {
   "n": "mletá sladká paprika",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "zakysaná smetana",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "mletý pepř",
   "a": 0,
   "u": "špetka"
  },
  {
   "n": "nasekaná pažitka (nepovinné)",
   "a": 1,
   "u": "tbsp"
  }
 ],
 "steps": [
  {
   "t": "Paprika",
   "d": "Papriku nakrájej na kostičky 2–3 mm a osuš na papírové utěrce.",
   "key": true,
   "i": [
    1
   ]
  },
  {
   "t": "Cibule",
   "d": "Cibuli nakrájej najemno, přelij v cedníku horkou vodou a nech okapat.",
   "i": [
    2
   ]
  },
  {
   "t": "Mletá paprika",
   "d": "V malé misce rozmíchej mletou papriku se zakysanou smetanou dohladka.",
   "i": [
    3,
    4
   ]
  },
  {
   "t": "Základ",
   "d": "Pomazánkové máslo rozmíchej vidličkou, vmíchej paprikovou smetanu.",
   "i": [
    0
   ]
  },
  {
   "t": "Zbytek",
   "d": "Přidej papriku, cibuli, sůl, pepř a pažitku, zlehka promíchej a ochutnej.",
   "i": [
    1,
    2,
    5,
    6,
    7
   ]
  },
  {
   "t": "Odležet",
   "d": "Dej do lednice, chuť se propojí.",
   "s": 1800
  }
 ],
 "tips": [
  "Večer předem je druhý den ještě lepší, vydrží 2–3 dny.",
  "Pustí vodu? Slij a promíchej.",
  "Lučina nebo žervé místo pomazánkového másla = hustší.",
  "Na bezlepkový chléb nebo rýžové chlebíčky."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 6. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "pho-bo",
 "title": "Rychlé pho bo",
 "subtitle": "Na kupovaném vývaru za 50 minut, z toho 35 se jen louhuje.",
 "category": "Polévka",
 "time": 50,
 "servings": 4,
 "equipment": [
  "hrnec",
  "panev24"
 ],
 "tags": [
  "polevka",
  "experiment"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Ph%E1%BB%9F_b%C3%B2_(39425047901).jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Ph%E1%BB%9F_b%C3%B2_(39425047901).jpg"
 },
 "key": "Cibuli a zázvor opal na suché pánvi opravdu dočerna. To je rozdíl mezi pho a kořeněným bujónem.",
 "ingredients": [
  {
   "n": "hovězí vývar (krabicový, bezlepkový)",
   "a": 2000,
   "u": "ml"
  },
  {
   "n": "velká cibule (neloupaná)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "zázvor",
   "a": 60,
   "u": "g"
  },
  {
   "n": "badyán (hvězdičky)",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "skořice (tyčinka)",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "hřebíček",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "rybí omáčka (zkontroluj lepek)",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "cukr",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "hovězí roštěná nebo zadní",
   "a": 400,
   "u": "g"
  },
  {
   "n": "široké rýžové nudle",
   "a": 250,
   "u": "g"
  },
  {
   "n": "jarní cibulka",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "koriandr",
   "a": 1,
   "u": "hrst"
  },
  {
   "n": "limetka",
   "a": 1,
   "u": "ks"
  }
 ],
 "steps": [
  {
   "t": "Maso do mrazáku",
   "d": "Maso dej na 20 minut do mrazáku, ztuhlé se krájí na tenké plátky mnohem líp.",
   "s": 1200,
   "i": [
    8
   ]
  },
  {
   "t": "Opálit",
   "d": "Cibuli přepul, zázvor podélně rozřízni (nemusíš loupat). Řezem dolů na suchou rozpálenou pánev a nech začernat. Poslední 2 minuty přihoď badyán, skořici a hřebíček.",
   "s": 480,
   "key": true,
   "i": [
    1,
    2,
    3,
    4,
    5
   ]
  },
  {
   "t": "Louhovat",
   "d": "Vývar přiveď k varu, vhoď všechno z pánve a nech táhnout pod pokličkou na mírném stupni.",
   "s": 2100,
   "i": [
    0
   ]
  },
  {
   "t": "Nakrájet maso",
   "d": "Mezitím ztuhlé maso nakrájej na co nejtenčí plátky přes vlákno.",
   "i": [
    8
   ]
  },
  {
   "t": "Nudle a bylinky",
   "d": "Nudle uvař podle obalu, sceď a propláchni studenou vodou. Jarní cibulku nakrájej, koriandr natrhej, limetku na klínky.",
   "s": 300,
   "i": [
    9,
    10,
    11,
    12
   ]
  },
  {
   "t": "Dochutit vývar",
   "d": "Vývar přeceď, koření a cibuli vyhoď. Vmíchej rybí omáčku a cukr. Má být výraznější, nudle to ztlumí.",
   "s": 180,
   "i": [
    6,
    7
   ]
  },
  {
   "t": "Servírovat",
   "d": "Do misek nudle, na ně syrové plátky masa a zalij vroucím vývarem, aby se maso uvařilo. Navrch cibulka, koriandr, limetka.",
   "i": [
    9,
    8,
    10,
    11,
    12
   ]
  }
 ],
 "tips": [
  "Dětská verze: vývar, nudle, maso, nic navrch.",
  "Vývar zdvojnásob — druhý den za 15 minut.",
  "Pánev po opalování jen vytři utěrkou."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 13. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "cervene-kari",
 "title": "Červené kari s kuřetem a cuketou",
 "subtitle": "Krémové, z červené kari pasty, za 25 minut.",
 "category": "Hlavní jídlo",
 "time": 25,
 "servings": 2,
 "equipment": [
  "wok",
  "ryzovar"
 ],
 "tags": [
  "kure",
  "ryze",
  "rychle"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Red_thai_curry.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Red_thai_curry.jpg"
 },
 "key": "Kari pastu nech minutu rozvonět na oleji, než přidáš maso. Tady vzniká chuť.",
 "ingredients": [
  {
   "n": "kuřecí prsa",
   "a": 400,
   "u": "g"
  },
  {
   "n": "cuketa",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "kokosové mléko",
   "a": 400,
   "u": "ml"
  },
  {
   "n": "červená kari pasta (podle pálivosti)",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "olej",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "bezlepková sójovka (tamari)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "rýže",
   "a": 150,
   "u": "g"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Kuře nakrájej na nudličky nebo kostky, cuketu na půlměsíčky, cibuli nadrobno, česnek prolisuj. Pusť rýži v rýžovaru.",
   "i": [
    0,
    1,
    4,
    5,
    9
   ]
  },
  {
   "t": "Základ",
   "d": "Ve woku na oleji orestuj cibuli a česnek do sklovita.",
   "s": 180,
   "i": [
    6,
    4,
    5
   ]
  },
  {
   "t": "Kari pasta",
   "d": "Přidej pastu a minutu restuj, až zavoní.",
   "s": 60,
   "key": true,
   "i": [
    3
   ]
  },
  {
   "t": "Kuře",
   "d": "Přidej kuře a restuj, až zvenku zbělá.",
   "s": 240,
   "i": [
    0
   ]
  },
  {
   "t": "Kokos",
   "d": "Vlij kokosové mléko a sójovku, přiveď k mírnému varu.",
   "s": 120,
   "i": [
    2,
    7
   ]
  },
  {
   "t": "Cuketa",
   "d": "Přidej cuketu, osol a probublávej, až změkne. Podávej s rýží.",
   "s": 540,
   "i": [
    1,
    8
   ]
  }
 ],
 "tips": [
  "Pasty dej nejdřív 1 tbsp, některé jsou dost pálivé. Pro děti spíš žluté kari.",
  "Na závěr pár kapek limetky nebo citronu.",
  "Hutné? Zřeď vodou nebo vývarem."
 ],
 "notes": [],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 6. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Sójovka upřesněna na bezlepkovou."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "hovezi-na-cibuli",
 "title": "Restované hovězí na cibuli a česneku",
 "subtitle": "Jednoduché slané hovězí s rýží, bez cukru. Na dvě večeře.",
 "category": "Hlavní jídlo",
 "time": 30,
 "servings": 4,
 "equipment": [
  "wok",
  "ryzovar"
 ],
 "tags": [
  "rychle",
  "ryze",
  "dvakrat"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Mongolian_Beef_with_rice_and_noodles.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Mongolian_Beef_with_rice_and_noodles.jpg"
 },
 "key": "Maso opékej po dávkách na maximálním stupni jen 1–2 minuty. Přeplněná pánev ho dusí a ztvrdne.",
 "ingredients": [
  {
   "n": "hovězí (květová špička / nízký roštěnec), tenké plátky přes vlákno",
   "a": 700,
   "u": "g"
  },
  {
   "n": "velká cibule",
   "a": 1,
   "u": "ks"
  },
  {
   "n": "stroužky česneku",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "bezlepková sójovka",
   "a": 4,
   "u": "tbsp"
  },
  {
   "n": "bramborový škrob (na obalení)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "olej",
   "a": 2,
   "u": "tbsp"
  },
  {
   "n": "máslo",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "mletý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "voda",
   "a": 60,
   "u": "ml"
  },
  {
   "n": "rýže",
   "a": 300,
   "u": "g"
  }
 ],
 "steps": [
  {
   "t": "Rýže",
   "d": "Rýži propláchni a pusť v rýžovaru.",
   "s": 720,
   "i": [
    9
   ]
  },
  {
   "t": "Krájení",
   "d": "Maso nakrájej na tenké plátky přes vlákno (pomůže 20 minut v mrazáku). Cibuli na tenké proužky, česnek nasekej.",
   "i": [
    0,
    1,
    2
   ]
  },
  {
   "t": "Obalit maso",
   "d": "Maso osuš utěrkou a lehce obal ve škrobu. Nesol.",
   "i": [
    0,
    4
   ]
  },
  {
   "t": "Opéct",
   "d": "Olej rozpal na maximum, maso opékej po dávkách do zhnědnutí. Vyndej na talíř.",
   "s": 120,
   "key": true,
   "i": [
    5,
    0
   ]
  },
  {
   "t": "Cibule",
   "d": "Ve stejném woku osmahni cibuli do sklovita, pak půl minuty česnek.",
   "s": 180,
   "i": [
    1,
    2
   ]
  },
  {
   "t": "Vrátit maso a dokončit",
   "d": "Vrať maso z talíře, zalij sójovkou a vodou a minutu prohřej. Opepři a nakonec vmíchej máslo. Podávej s rýží.",
   "s": 60,
   "i": [
    0,
    3,
    8,
    7,
    6
   ]
  }
 ],
 "tips": [
  "Sójovka je slaná — sol až nakonec.",
  "Na druhou večeři maso zvlášť od rýže, ohřát na pánvi s kapkou vody."
 ],
 "notes": [],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 10. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Mouka nahrazena škrobem, sójovka bezlepková."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "ryzove-nudle-syr",
 "title": "Rýžové nudle se sýrovou omáčkou",
 "subtitle": "Z taveného sýra a eidamu za pár minut. Pro Aničku.",
 "category": "Hlavní jídlo",
 "time": 15,
 "servings": 2,
 "equipment": [
  "panev24"
 ],
 "tags": [
  "rychle",
  "testoviny",
  "jedno-nadobi"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Cavatelli_in_cheese_sauce.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Cavatelli_in_cheese_sauce.jpg"
 },
 "key": "Tavený sýr rozpouštěj pomalu na nízkém stupni. Když je moc horko, sráží se a odděluje se tuk.",
 "ingredients": [
  {
   "n": "rýžové nudle",
   "a": 160,
   "u": "g"
  },
  {
   "n": "tavený sýr (Smetanito)",
   "a": 100,
   "u": "g"
  },
  {
   "n": "eidam nebo gouda, nastrouhaný",
   "a": 50,
   "u": "g"
  },
  {
   "n": "mléko (nebo voda z nudlí)",
   "a": 100,
   "u": "ml"
  },
  {
   "n": "Rama nebo máslo",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "sůl",
   "a": 0.25,
   "u": "tsp"
  },
  {
   "n": "mletý pepř (pro Aničku vynech)",
   "a": 0.25,
   "u": "tsp"
  },
  {
   "n": "žloutek (volitelně)",
   "a": 1,
   "u": "ks"
  }
 ],
 "steps": [
  {
   "t": "Nudle",
   "d": "Nudle spař nebo krátce povař podle sáčku, sceď a odlož trochu vody. Eidam nastrouhej.",
   "s": 300,
   "i": [
    0,
    2
   ]
  },
  {
   "t": "Základ",
   "d": "Na pánvi rozpusť Ramu, přilij mléko a prohřej (nevař).",
   "s": 60,
   "i": [
    4,
    3
   ]
  },
  {
   "t": "Sýry",
   "d": "Na nízkém stupni vmíchej tavený sýr dohladka, pak eidam.",
   "s": 120,
   "key": true,
   "i": [
    1,
    2
   ]
  },
  {
   "t": "Dochutit",
   "d": "Osol a opepři. Hustou omáčku rozvolni vodou z nudlí.",
   "i": [
    5,
    6
   ]
  },
  {
   "t": "Spojit",
   "d": "Vmíchej nudle. Volitelně stáhni z plotny a vmíchej žloutek.",
   "i": [
    0,
    7
   ]
  }
 ],
 "tips": [
  "Bez žloutku je to jistota, že se nic nesrazí.",
  "Šunka na kostičky = víc bílkovin.",
  "Část taveného sýra jde nahradit Lučinou."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 9. 8. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "miso-ramen",
 "title": "Krémový miso ramen s kuřetem",
 "subtitle": "Kuřecí vývar s misem a sójovým mlékem, opečená stehna a vejce.",
 "category": "Polévka",
 "time": 45,
 "servings": 4,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "polevka",
  "kure",
  "experiment"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Miso_Ramen.JPG?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Miso_Ramen.JPG"
 },
 "key": "Po přidání misa a mléka už vývar nesmí vařit. Mléko by se srazilo a miso ztratí chuť.",
 "ingredients": [
  {
   "n": "kuřecí stehna bez kosti",
   "a": 600,
   "u": "g"
  },
  {
   "n": "granulovaný česnek",
   "a": 1,
   "u": "tsp"
  },
  {
   "n": "černý pepř",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "sladká paprika",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "bezlepková sójovka (marináda)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "olej",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "šalotky (nebo 1 malá cibule)",
   "a": 2,
   "u": "ks"
  },
  {
   "n": "jarní cibulky",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "nastrouhaný zázvor",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "stroužky česneku",
   "a": 3,
   "u": "ks"
  },
  {
   "n": "kuřecí vývar (bezlepkový)",
   "a": 1200,
   "u": "ml"
  },
  {
   "n": "světlá miso pasta (bez ječmene)",
   "a": 3,
   "u": "tbsp"
  },
  {
   "n": "bezlepková sójovka (vývar)",
   "a": 1,
   "u": "tbsp"
  },
  {
   "n": "neslazené sójové mléko",
   "a": 400,
   "u": "ml"
  },
  {
   "n": "bezlepkové nudle (rýžové)",
   "a": 400,
   "u": "g"
  },
  {
   "n": "vejce",
   "a": 4,
   "u": "ks"
  },
  {
   "n": "sójové klíčky (nepovinné)",
   "a": 150,
   "u": "g"
  },
  {
   "n": "chilli olej (jen dospělí)",
   "a": 1,
   "u": "tsp"
  }
 ],
 "steps": [
  {
   "t": "Marináda a krájení",
   "d": "Stehna obal v česneku, pepři, paprice a sójovce. Mezitím nakrájej šalotku, jarní cibulku (bílé a zelené části zvlášť) a česnek, nastrouhej zázvor.",
   "s": 600,
   "i": [
    0,
    1,
    2,
    3,
    4,
    6,
    7,
    9,
    8
   ]
  },
  {
   "t": "Vejce",
   "d": "V největším hrnci přiveď vodu k varu, opatrně vlož vejce. Pak rovnou do studené vody. Vodu nevylévej, přijdou do ní nudle.",
   "s": 390,
   "i": [
    15
   ]
  },
  {
   "t": "Kuře",
   "d": "V druhém hrnci rozpal olej a opékej stehna na středně vysokém stupni, v polovině otoč. Hotové přendej na prkénko a nech odpočinout.",
   "s": 600,
   "i": [
    5,
    0
   ]
  },
  {
   "t": "Základ vývaru",
   "d": "Stáhni na střední stupeň. Ve stejném hrnci (bez mytí) osmahni šalotku, bílé části cibulky, zázvor a česnek.",
   "s": 180,
   "i": [
    6,
    7,
    8,
    9
   ]
  },
  {
   "t": "Vývar",
   "d": "Zalij vývarem, seškrábni připečené zbytky ze dna a nech mírně probublávat.",
   "s": 600,
   "i": [
    10
   ]
  },
  {
   "t": "Nudle",
   "d": "Mezitím uvař nudle ve vodě po vejcích a sceď. Klíčky můžeš hodit k nudlím na poslední minutu.",
   "s": 240,
   "i": [
    14,
    16
   ]
  },
  {
   "t": "Nakrájet kuře a vejce",
   "d": "Odpočaté kuře nakrájej na plátky. Vejce oloupej a rozpul.",
   "i": [
    0,
    15
   ]
  },
  {
   "t": "Miso a mléko",
   "d": "Stupeň na minimum. Miso rozmíchej v naběračce vývaru, vlij zpět a přidej sójovku a mléko. Jen prohřej, nevař.",
   "s": 180,
   "key": true,
   "i": [
    11,
    12,
    13
   ]
  },
  {
   "t": "Servírovat",
   "d": "Do misek nudle, zalij vývarem, navrch plátky kuřete, půlky vajec, klíčky a zelené části cibulky. Dospělým chilli olej.",
   "i": [
    14,
    0,
    15,
    16,
    7,
    17
   ]
  }
 ],
 "tips": [
  "Miso kontroluj na složení — některé obsahují ječmen (lepek).",
  "Vývar skladuj zvlášť od nudlí.",
  "Vajíčka přes noc ve směsi sójovky a vody 1:1 = hnědá jako v ramen baru."
 ],
 "notes": [],
 "version": 3,
 "updated": "2026-10-23",
 "source": "chat 17. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-21",
   "text": "Sójovka, nudle a miso upřesněny na bezlepkové."
  },
  {
   "v": 3,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
},
{
 "id": "kure-mrkev-kase",
 "title": "Kuře s mrkví a bramborovou kaší",
 "subtitle": "Šetrné jídlo v jednom hrnci, bez másla a mléka.",
 "category": "Hlavní jídlo",
 "time": 35,
 "servings": 2,
 "equipment": [
  "hrnec"
 ],
 "tags": [
  "kure",
  "jedno-nadobi",
  "setrne"
 ],
 "photo": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Grilled_chicken_with_mashed_potato_and_spinach.jpg?width=900",
  "page": "https://commons.wikimedia.org/wiki/File:Grilled_chicken_with_mashed_potato_and_spinach.jpg"
 },
 "key": "Kaši řeď vodou z vaření, ne mlékem ani máslem.",
 "ingredients": [
  {
   "n": "kuřecí prsa",
   "a": 250,
   "u": "g"
  },
  {
   "n": "brambory (typ B)",
   "a": 500,
   "u": "g"
  },
  {
   "n": "mrkev (asi 2 ks)",
   "a": 200,
   "u": "g"
  },
  {
   "n": "sůl",
   "a": 0.5,
   "u": "tsp"
  },
  {
   "n": "voda",
   "a": 1000,
   "u": "ml"
  }
 ],
 "steps": [
  {
   "t": "Příprava",
   "d": "Brambory a mrkev oloupej a nakrájej na kousky velikosti ořechu. Kuře nakrájej na kostky 2 cm.",
   "i": [
    1,
    2,
    0
   ]
  },
  {
   "t": "Zelenina",
   "d": "Brambory a mrkev dej do hrnce, zalij studenou vodou, osol a přiveď k varu. Pak vař mírně pod pokličkou.",
   "s": 300,
   "i": [
    1,
    2,
    4,
    3
   ]
  },
  {
   "t": "Kuře",
   "d": "Přidej kuře do stejného hrnce a vař, až jsou brambory měkké a kuře propečené.",
   "s": 900,
   "i": [
    0
   ]
  },
  {
   "t": "Kaše",
   "d": "Kuře vylov na talíř. Odlij hrnek vody z vaření, zbytek slij. Brambory s mrkví rozmačkej a řeď vodou z vaření do hladké kaše.",
   "key": true
  },
  {
   "t": "Podávání",
   "d": "Kaši dej na talíř, navrch kuře z talíře a zakápni lžící vody z vaření.",
   "i": [
    0
   ]
  }
 ],
 "tips": [
  "Bez bujónu — bývá ostrý a často s lepkem.",
  "Když je žaludek v pořádku, přidej máslo a koření.",
  "Ohřev s lžící vody na mírném stupni."
 ],
 "notes": [],
 "version": 2,
 "updated": "2026-10-23",
 "source": "chat 21. 9. 2026",
 "history": [
  {
   "v": 2,
   "date": "2026-10-23",
   "text": "Kroky doplněny o množství surovin a chybějící mezikroky (vrácení masa, krájení apod.)."
  }
 ]
}
];
