var dugmePocetak = document.getElementById("dugmePocetak");
var dugmePravila = document.getElementById("dugmePravila");
var divPravila = document.getElementById("divPravila");
dugmePocetak.addEventListener("click", novaIgra);
dugmePravila.p1 = "prikazi";
dugmePravila.p2 = "sakrij";
dugmePravila.addEventListener("click", otvoriPravila);
window.addEventListener("load", main);

var pobednici = JSON.parse(localStorage.getItem("pobednici"));
var gubitnici = JSON.parse(localStorage.getItem("gubitnici"));


function main() {
    proveraPobednika();
    proveraGubitnika(); 
}

function proveraPobednika() {
    if(pobednici === null) {
        pobednici = [];
    }
}

function proveraGubitnika() {
    if(gubitnici === null) {
        gubitnici = [];
    }
}

function novaIgra() {
    var input = prompt("Унесите своје име...");
    input = input.toUpperCase();
    
    if (pobednici.includes(input)) {
        alert("Забрањено Вам је да играте у овом казину!");
    }
    else if (gubitnici.includes(input)) {
        alert("Немате више новца!");
    }
    else if (input != null && input != "") {
        if(sessionStorage.getItem(input) === null) {
            sessionStorage.setItem("igrac", input);
        }
        window.open("rad.html","_self"); 
    }
}
        
function otvoriPravila(e) {
    var a = e.target.p1;
    var b = e.target.p2;
    divPravila.className = (divPravila.className == a) ? b : a; 
}
