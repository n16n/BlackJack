//niz svih karata i nizovi za "ruku"
var nizKarte = [];
var nizIgrac = [];
var nizKuca = [];
var spilBrojKarata = 52;

//novac igrača - 1000
var novacIgrac = document.getElementById("novacIgrac");
var novacIgracPolje = document.getElementById("novacIgrac");
var novacIgracInt;

//novac kuće - 100 000
var novacKuca = document.getElementById("novacKuca").innerText;
var novacKucaPolje = document.getElementById("novacKuca");
var novacKucaInt = parseInt(novacKuca);

//labela na sredini u kojoj se ispisuju poruke
var poruka = document.getElementById("sredina");

//input za unos novca za trenutnu "ruku"
var unosNovca = document.getElementById("unosNovca");
var unosNovcaInt;
var noviNovac;
var ulog = 0;

//dugmad
var dugmeIzadji = document.getElementById("izadji");
var dugmeStart = document.getElementById("start");
var dugmeHit = document.getElementById("hit");
var dugmeStand = document.getElementById("stand");
var dugmeSurrender = document.getElementById("surrender");
var dugmeDouble = document.getElementById("double");

//osluškivači
window.addEventListener("load", proveraImena);
dugmeIzadji.addEventListener("click", Izlaz);
dugmeStart.addEventListener("click", proveraUnosa);
dugmeHit.addEventListener("click", Hit);
dugmeStand.addEventListener("click", Stand);
dugmeSurrender.addEventListener("click", Surrender);
dugmeDouble.addEventListener("click", Double);

var zastavicaPrvaIgra = 0;
var brojKarataIgrac = 0;
var brojKarataKuca = 0;
var nizDouble = [9,10,11];

//jedna okrenuta karta licem na dole kuće
var poledjina = document.getElementById("poledjina");

//div karte kuće i igrača
var kucaKarta1 = document.getElementById("kucaKarta1");
var kucaKarta2 = document.getElementById("kucaKarta2");
var kucaKarta3 = document.getElementById("kucaKarta3");
var kucaKarta4 = document.getElementById("kucaKarta4");
var kucaKarta5 = document.getElementById("kucaKarta5");
var kucaKarta6 = document.getElementById("kucaKarta6");
var igracKarta1 = document.getElementById("igracKarta1");
var igracKarta2 = document.getElementById("igracKarta2");
var igracKarta3 = document.getElementById("igracKarta3");
var igracKarta4 = document.getElementById("igracKarta4");
var igracKarta5 = document.getElementById("igracKarta5");
var igracKarta6 = document.getElementById("igracKarta6");

//vrednost karata
var vrednostKuca = 0;
var vrednostIgrac = 0;

//pozadinska muzika
var muzika = new Audio("pesma.mp3");

//proverava da li postoji korisnik koji je zatrazio isplatu
function proveraImena() {
    muzika.play();
    var ime = sessionStorage.getItem("igrac");
    var imeKuca = ime + "Kuca";
    for(var i = 0, len = sessionStorage.length; i < len; i++) {
        var key = sessionStorage.key(i);
        var value = sessionStorage[key];
        if(ime == key) {
            console.log(key + " => " + value);
            novacIgracPolje.innerHTML = value;
        }
        if(imeKuca == key) {
            console.log(key + " => " + value);
            novacKucaPolje.innerHTML = value;
        }
    }
    dugmeHit.disabled = true;
    dugmeStand.disabled = true;
    dugmeSurrender.disabled = true;
    dugmeDouble.disabled = true;
}

//korisnik trazi isplatu
function Izlaz() {
    var idem = confirm("Да ли сте сигурни?");
    if(zastavicaPrvaIgra == 0) {
        novacIgrac = novacIgrac.innerText;
        novacIgracInt = parseInt(novacIgrac);
    }
    if (idem) {
        var ime = sessionStorage.getItem("igrac");
        var igracIkuca = ime + "Kuca";
        sessionStorage.setItem(ime, novacIgracInt.toString());
        sessionStorage.setItem(igracIkuca, novacKucaInt.toString());
        window.open("index.html","_self");
    }
}

//provera se legitimnost unosa uloga
function proveraUnosa() {
    var cifraProvere = parseInt(unosNovca.value);
    if(cifraProvere < 1)
        alert("Погрешан унос улога!");
    else
        Start();
}

//start igre; pokupi se ulog korisnika i pozivaju odredjene f-je
function Start() {
    ulog = 0;
    if(zastavicaPrvaIgra == 0) {
        novacIgrac = novacIgrac.innerText;
        novacIgracInt = parseInt(novacIgrac);
    }
    spilBrojKarata = 52;
    brojKarataIgrac = 0;
    brojKarataKuca = 0;
    vrednostKuca = 0;
    vrednostIgrac = 0;
    kreirajKarte();
    unosNovcaInt = parseInt(unosNovca.value);
    zastavicaPrvaIgra++;
    if (novacKucaInt < 2)
        proveraPobede(novacKucaInt);
    if ((novacIgracInt >= unosNovcaInt) && (novacKucaInt >= unosNovcaInt)) {
        noviNovac = novacIgracInt - unosNovcaInt;
        ulog = unosNovcaInt;
        novacIgracInt = noviNovac;
        novacIgracPolje.innerHTML = noviNovac.toString();
        dugmeIzadji.disabled = true;
        unosNovca.disabled = true;
        dugmeStart.disabled = true;
        dugmeHit.disabled = false;
        dugmeStand.disabled = false;
        dugmeSurrender.disabled = false;
        dugmeDouble.disabled = false;
        podeliKarte();
    }
    else {
        alert("Немате/немамо довољно новца!");
        if (novacIgracInt == 0) {
            dugmeIzadji.disabled = true;
            unosNovca.disabled = true;
            dugmeStart.disabled = true;
            dugmeHit.disabled = true;
            dugmeStand.disabled = true;
            dugmeSurrender.disabled = true;
            dugmeDouble.disabled = true;
            krajPoraz();
        }
    }
}

//dele se pocetne karte za korisnika i kucu
function podeliKarte() {
    nizIgrac = [];
    nizKuca = [];
    kucaKarta1.style.background = "url(slike/poledjina.png) no-repeat";
    kucaKarta3.style.background = "url() no-repeat";
    kucaKarta4.style.background = "url() no-repeat";
    kucaKarta5.style.background = "url() no-repeat";
    kucaKarta6.style.background = "url() no-repeat";
    igracKarta3.style.background = "url() no-repeat";
    igracKarta4.style.background = "url() no-repeat";
    igracKarta5.style.background = "url() no-repeat";
    igracKarta6.style.background = "url() no-repeat";

    var igracPrva = Math.floor(Math.random() * spilBrojKarata);
    nizIgrac[brojKarataIgrac] = nizKarte[igracPrva];
    nizKarte.splice(igracPrva, 1);
    spilBrojKarata--;
    brojKarataIgrac++;
    var dest11 = nizIgrac[0].dest;
    igracKarta1.style.background = "url("+ dest11 +") no-repeat";

    var igracDruga = Math.floor(Math.random() * spilBrojKarata);
    nizIgrac[brojKarataIgrac] = nizKarte[igracDruga];
    nizKarte.splice(igracDruga, 1);
    spilBrojKarata--;
    brojKarataIgrac++;
    var dest12 = nizIgrac[1].dest;
    igracKarta2.style.background = "url("+ dest12 +") no-repeat";
    proveraOznake(nizIgrac);
    
    var kucaPrva = Math.floor(Math.random() * spilBrojKarata);
    nizKuca[brojKarataKuca] = nizKarte[kucaPrva];
    nizKarte.splice(kucaPrva, 1);
    spilBrojKarata--;
    brojKarataKuca++;

    var kucaDruga = Math.floor(Math.random() * spilBrojKarata);
    nizKuca[brojKarataKuca] = nizKarte[kucaDruga];
    nizKarte.splice(kucaDruga, 1);
    spilBrojKarata--;
    brojKarataKuca++;
    var dest22 = nizKuca[1].dest;
    kucaKarta2.style.background = "url("+ dest22 +") no-repeat";
    proveraOznake(nizKuca);
    
    zbirKarataIgrac();
    poruka.innerHTML = "Играч је на потезу... Вредност = " + vrednostIgrac;

    if (!nizDouble.includes(vrednostIgrac)) {
        dugmeDouble.disabled = true;
    }
    
    if (vrednostIgrac == 21) {
        poruka.innerHTML = "BlackJack!";
        dugmeHit.disabled = true;
        Pobednik();
    }
    console.log("noviNovac = ",noviNovac);
    console.log("novacIgrac = ",novacIgracInt);
    console.log("novacKuca = ",novacKucaInt);
}

//dodaje se nova karta korisniku kada je zatrazi klikom na dugme "hit"
function Hit() {
    dugmeSurrender.disabled = true;
    var karta = Math.floor(Math.random() * spilBrojKarata);
    nizIgrac[brojKarataIgrac] = nizKarte[karta];
    proveraOznake(nizIgrac);
    nizKarte.splice(karta, 1);
    spilBrojKarata--;
    switch (brojKarataIgrac) {
        case 2:
            var dest13 = nizIgrac[2].dest;
            igracKarta3.style.background = "url("+ dest13 +") no-repeat";
            brojKarataIgrac++;
            break;
        case 3:
            var dest14 = nizIgrac[3].dest;
            igracKarta4.style.background = "url("+ dest14 +") no-repeat";
            brojKarataIgrac++;
            break;
        case 4:
            var dest15 = nizIgrac[4].dest;
            igracKarta5.style.background = "url("+ dest15 +") no-repeat";
            brojKarataIgrac++;
            break;
        case 5:
            var dest16 = nizIgrac[5].dest;
            igracKarta6.style.background = "url("+ dest16 +") no-repeat";
            brojKarataIgrac++;
            dugmeHit.disabled = true;
            break;
    }
    zbirKarataIgrac();
    poruka.innerHTML = "Играч је на потезу... Вредност = " + vrednostIgrac;
    if (vrednostIgrac > 21 || vrednostIgrac == 21) {
        dugmeStand.disabled = true;
        Pobednik();
    }
}

//na klik dugmeta "stand", korisnik oznacava da je zadovoljan dobijenim kartama
function Stand() {
    var dest21 = nizKuca[0].dest;
    kucaKarta1.style.background = "url(" + dest21 + ") no-repeat";
    zbirKarataKuca();
    zbirKarataIgrac();
    while ((zbirKarataKuca() < 16) && (vrednostKuca <= 21)) {
        proveraOznake(nizKuca);
        igraKuca();
    }
    Pobednik();
}

//korisnik se "predaje" i vraca polovinu svog uloga
function Surrender() {
    poruka.innerHTML = "Предали сте се!";
    noviNovac += (ulog/2);
    novacIgracInt = noviNovac;
    novacIgracPolje.innerHTML = novacIgracInt.toString();
    novacKucaInt += (ulog/2);
    novacKucaPolje.innerHTML = novacKucaInt.toString();
    dugmeIzadji.disabled = false;
    dugmeStart.disabled = false;
    unosNovca.disabled = false;
    dugmeHit.disabled = true;
    dugmeStand.disabled = true;
    dugmeSurrender.disabled = true;
    dugmeDouble.disabled = true;
}

//korisnik duplira ulog i dobija jos jednu kartu ako u zbiru ima 9,10 ili 11
function Double() {
    if ((novacIgracInt >= ulog) && (novacKucaInt >= ulog)) {
        noviNovac -= ulog;
        ulog *= 2;
        novacIgracInt = noviNovac;
        novacIgracPolje.innerHTML = noviNovac.toString();
        dugmeSurrender.disabled = true;
        var karta = Math.floor(Math.random() * spilBrojKarata);
        nizIgrac[brojKarataIgrac] = nizKarte[karta];
        proveraOznake(nizIgrac);
        nizKarte.splice(karta, 1);
        spilBrojKarata--;
        var dest13 = nizIgrac[2].dest;
        igracKarta3.style.background = "url("+ dest13 +") no-repeat";
        brojKarataIgrac++;
        zbirKarataIgrac();
        Stand();
    }
    else {
        alert("Немате/немамо довољно новца!");
        dugmeDouble.disabled = true;
    }
}

//nakon korisnika, kuca dobija karte
function igraKuca() {
    if ((zbirKarataKuca() < 16) && (zbirKarataKuca() <= 21)) {
        switch (brojKarataKuca) {
            case 2:
                var kucaTreca = Math.floor(Math.random() * spilBrojKarata);
                nizKuca[brojKarataKuca] = nizKarte[kucaTreca];
                nizKarte.splice(kucaTreca, 1);
                spilBrojKarata--;
                brojKarataKuca++;
                var dest23 = nizKuca[2].dest;
                kucaKarta3.style.background = "url(" + dest23 + ") no-repeat";
                break;
            case 3:
                var kucaCetvrta = Math.floor(Math.random() * spilBrojKarata);
                nizKuca[brojKarataKuca] = nizKarte[kucaCetvrta];
                nizKarte.splice(kucaCetvrta, 1);
                spilBrojKarata--;
                brojKarataKuca++;
                var dest24 = nizKuca[3].dest;
                kucaKarta4.style.background = "url(" + dest24 + ") no-repeat";
                break;
            case 4:
                var kucaPeta = Math.floor(Math.random() * spilBrojKarata);
                nizKuca[brojKarataKuca] = nizKarte[kucaPeta];
                nizKarte.splice(kucaPeta, 1);
                spilBrojKarata--;
                brojKarataKuca++;
                var dest25 = nizKuca[4].dest;
                kucaKarta5.style.background = "url(" + dest25 + ") no-repeat";
                break;
            case 5:
                var kucaSesta = Math.floor(Math.random() * spilBrojKarata);
                nizKuca[brojKarataKuca] = nizKarte[kucaSesta];
                nizKarte.splice(kucaSesta, 1);
                spilBrojKarata--;
                brojKarataKuca++;
                var dest26 = nizKuca[5].dest;
                kucaKarta6.style.background = "url(" + dest26 + ") no-repeat";
                break;
        }
        proveraOznake(nizKuca);
    }
}

//porede se karte korisnika i kuce i odredjuje pobednik
function Pobednik() {
    dugmeIzadji.disabled = true;
    dugmeHit.disabled = true;
    dugmeStand.disabled = true;
    dugmeSurrender.disabled = true;
    dugmeDouble.disabled = true;
    zbirKarataKuca();
    zbirKarataIgrac();
    if ((vrednostIgrac < vrednostKuca) && (vrednostKuca <= 21)) {
        poruka.innerHTML = "Изгубили сте!  Играч(" +vrednostIgrac+ ") , Кућа(" + vrednostKuca +")";
        console.log("Ulog: "+ulog + ", Igrac: " +(noviNovac) + ", Kuca: " +(ulog+novacKucaInt));
        novacKucaInt += ulog;
        novacKucaPolje.innerHTML = novacKucaInt.toString();
    }
    else if (vrednostIgrac > 21) {
        poruka.innerHTML = "Изгубили сте! Вредност = " + vrednostIgrac;
        console.log("Ulog: "+ulog + ", Igrac: " +(noviNovac) + ", Kuca: " +(ulog+novacKucaInt));
        novacKucaInt += ulog;
        novacKucaPolje.innerHTML = novacKucaInt.toString();
    }
    else if (vrednostIgrac == vrednostKuca) {
        poruka.innerHTML = "Нерешено! Играч(" +vrednostIgrac+ ") , Кућа(" + vrednostKuca +")";
        noviNovac += ulog;
        novacIgracInt = noviNovac;
        novacIgracPolje.innerHTML = novacIgracInt.toString();
    }
    else if ((vrednostIgrac == 21) && (brojKarataIgrac == 2)) {
        poruka.innerHTML = "BlackJack!";
        noviNovac += (ulog * 2.5);
        console.log("Ulog: "+ulog +", Igrac: " + (novacIgracInt+(ulog*2.5)) + ", " +
            "Kuca: "+(novacKucaInt-(ulog + ulog/2)));
        novacIgracInt = noviNovac;
        novacIgracPolje.innerHTML = novacIgracInt.toString();
        novacKucaInt -= (ulog + ulog/2);
        novacKucaPolje.innerHTML = novacKucaInt.toString();
    }
    else if ((vrednostIgrac == 21) && (brojKarataIgrac > 2)) {
        var dest21 = nizKuca[0].dest;
        kucaKarta1.style.background = "url(" + dest21 + ") no-repeat";
        poruka.innerHTML = "Победили сте! Играч(" +vrednostIgrac+ ") , Кућа(" + vrednostKuca +")";
        noviNovac += (ulog * 2);
        console.log("Ulog: "+ulog +", Igrac: " + (novacIgracInt+(ulog*2)) + ", " +
            "Kuca: "+(novacKucaInt-ulog));
        novacIgracInt = noviNovac;
        console.log("Ulog: "+ulog + ", Igrac: " + (novacIgracInt+(ulog*2)));
        novacIgracPolje.innerHTML = novacIgracInt.toString();
        novacKucaInt -= ulog;
        novacKucaPolje.innerHTML = novacKucaInt.toString();
    }
    else {
        poruka.innerHTML = "Победили сте! Играч(" +vrednostIgrac+ ") , Кућа(" + vrednostKuca +")";
        noviNovac += (ulog * 2);
        console.log("Ulog: "+ulog +", Igrac: " + (novacIgracInt+(ulog*2)) + ", " +
            "Kuca: "+(novacKucaInt-ulog));
        novacIgracInt = noviNovac;
        novacIgracPolje.innerHTML = novacIgracInt.toString();
        novacKucaInt -= ulog;
        novacKucaPolje.innerHTML = novacKucaInt.toString();
    }
    if (novacIgracInt != 0) {
        dugmeIzadji.disabled = false;
    }
    unosNovca.disabled = false;
    dugmeStart.disabled = false;
    dugmeHit.disabled = true;
    dugmeStand.disabled = true;
    dugmeSurrender.disabled = true;
    dugmeDouble.disabled = true;
    if (novacKucaInt == 0)
        krajPobeda();
}

//proverava se da li kuca ima sredstava da isplati dobitak korisniku
function proveraPobede(novac) {
    if (novac < (unosNovcaInt + unosNovcaInt))
        krajPobeda()
}

//proverava se zbir karata kuce
function zbirKarataKuca() {
   vrednostKuca = 0;
   for(var i = 0; i <= nizKuca.length-1; i++) {
       vrednostKuca += nizKuca[i].rank;
   }
   return vrednostKuca;
}

//proverava se zbir karata igraca
function zbirKarataIgrac() {
    vrednostIgrac = 0;
    for(var i = 0; i <= nizIgrac.length-1; i++) {
        vrednostIgrac += nizIgrac[i].rank;
    }
    return vrednostIgrac;
}

//ako u nizu karata postoji "A", odredjuje se njena vrednost
function proveraOznake(niz) {
    zbirKarataIgrac();
    zbirKarataKuca();
    if ((vrednostIgrac > 21) || (vrednostKuca > 21)) {
        for(var i = niz.length-1; i >= 0; i--) {
            if ((niz[i].oznaka == "A") && (niz[i].rank == 11)) {
                niz[i].rank = 1;
                break;
            }
        }
    }
}

//kraj igre - korisnik je izgubio sav novac
function krajPoraz() {
    window.open("krajPoraz.html","_self");
}

//kraj igre - kuca je izgubila sav novac
function krajPobeda() {
    sessionStorage.setItem("pobeda", novacIgracInt);
    window.open("krajPobeda.html","_blank");
}

//kreiranje pojedinacne karte
function Karta(dest, rank, oznaka) {
    this.dest = dest;
    this.rank = rank;
    this.oznaka = oznaka;
}

//kreiranje spila
function kreirajKarte() {
    nizKarte = [];
    var karta1 = new Karta("karte/2h.png", 2, "2");
    var karta2 = new Karta("karte/2k.png", 2, "2");
    var karta3 = new Karta("karte/2p.png", 2, "2");
    var karta4 = new Karta("karte/2t.png", 2, "2");

    var karta5 = new Karta("karte/3h.png", 3, "3");
    var karta6 = new Karta("karte/3k.png", 3, "3");
    var karta7 = new Karta("karte/3p.png", 3, "3");
    var karta8 = new Karta("karte/3t.png", 3, "3");

    var karta9 = new Karta("karte/4h.png", 4, "4");
    var karta10 = new Karta("karte/4k.png", 4, "4");
    var karta11 = new Karta("karte/4p.png", 4, "4");
    var karta12 = new Karta("karte/4t.png", 4, "4");

    var karta13 = new Karta("karte/5h.png", 5, "5");
    var karta14 = new Karta("karte/5k.png", 5, "5");
    var karta15 = new Karta("karte/5p.png", 5, "5");
    var karta16 = new Karta("karte/5t.png", 5, "5");

    var karta17 = new Karta("karte/6h.png", 6, "6");
    var karta18 = new Karta("karte/6k.png", 6, "6");
    var karta19 = new Karta("karte/6p.png", 6, "6");
    var karta20 = new Karta("karte/6t.png", 6, "6");

    var karta21 = new Karta("karte/7h.png", 7, "7");
    var karta22 = new Karta("karte/7k.png", 7, "7");
    var karta23 = new Karta("karte/7p.png", 7, "7");
    var karta24 = new Karta("karte/7t.png", 7, "7");

    var karta25 = new Karta("karte/8h.png", 8, "8");
    var karta26 = new Karta("karte/8k.png", 8, "8");
    var karta27 = new Karta("karte/8p.png", 8, "8");
    var karta28 = new Karta("karte/8t.png", 8, "8");

    var karta29 = new Karta("karte/9h.png", 9, "9");
    var karta30 = new Karta("karte/9k.png", 9, "9");
    var karta31 = new Karta("karte/9p.png", 9, "9");
    var karta32 = new Karta("karte/9t.png", 9, "9");

    var karta33 = new Karta("karte/10h.png", 10, "10");
    var karta34 = new Karta("karte/10k.png", 10, "10");
    var karta35 = new Karta("karte/10p.png", 10, "10");
    var karta36 = new Karta("karte/10t.png", 10, "10");

    var karta37 = new Karta("karte/Ah.png", 11, "A");
    var karta38 = new Karta("karte/Ak.png", 11, "A");
    var karta39 = new Karta("karte/Ap.png", 11, "A");
    var karta40 = new Karta("karte/At.png", 11, "A");

    var karta41 = new Karta("karte/Jh.png", 10, "J");
    var karta42 = new Karta("karte/Jk.png", 10, "J");
    var karta43 = new Karta("karte/Jp.png", 10, "J");
    var karta44 = new Karta("karte/Jt.png", 10, "J");

    var karta45 = new Karta("karte/Qh.png", 10, "Q");
    var karta46 = new Karta("karte/Qk.png", 10, "Q");
    var karta47 = new Karta("karte/Qp.png", 10, "Q");
    var karta48 = new Karta("karte/Qt.png", 10, "Q");

    var karta49 = new Karta("karte/Kh.png", 10, "K");
    var karta50 = new Karta("karte/Kk.png", 10, "K");
    var karta51 = new Karta("karte/Kp.png", 10, "K");
    var karta52 = new Karta("karte/Kt.png", 10, "K");

    nizKarte.push(karta1,karta2,karta3,karta4);
    nizKarte.push(karta5,karta6,karta7,karta8);
    nizKarte.push(karta9,karta10,karta11,karta12);
    nizKarte.push(karta13,karta14,karta15,karta16);
    nizKarte.push(karta17,karta18,karta19,karta20);
    nizKarte.push(karta21,karta22,karta23,karta24);
    nizKarte.push(karta25,karta26,karta27,karta28);
    nizKarte.push(karta29,karta30,karta31,karta32);
    nizKarte.push(karta33,karta34,karta35,karta36);
    nizKarte.push(karta37,karta38,karta39,karta40);
    nizKarte.push(karta41,karta42,karta43,karta44);
    nizKarte.push(karta45,karta46,karta47,karta48);
    nizKarte.push(karta49,karta50,karta51,karta52);
}
