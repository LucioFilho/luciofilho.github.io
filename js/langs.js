/*jshint esversion: 6 */

/*
Array (setLang) [types][elements][languages]:
   0 is english
   1 is castellano
   2 is portuguese

   Types:
   0 tooltips
   1 text buttons

   example call text: lang[0][0][setLang]
*/

let setLang = 0;

let lang = [];
let element0 = [
   ["Flip Board", "Girar tablero", "Girar tabuleiro"],
   ["Move to Start", "Mover al inicio", "Mover al início"],
   ["Move step Back", "Mover un lance atrás", "Mover um lance atrás"],
   ["Move step Forward", "Mover un lance adelante", "Mover um lance adiante"],
   ["Come to End", "Volver al final", "Voltar ao final"],
   ["Load PGN file", "Abrir arquivo PGN", "Abrir arquivo PGN"],
   ["Take Back", "Volver hacia atrás", "Voltar atrás"],
   ["Select to learn", "Seleciona para aprender", "Selecione para aprender"],
   ["Preview", "Anterior", "Anterior"],
   ["Next", "Próxima", "Próxima"],
   ["Add Time", "Adiciona Tiempo", "Adicione Tempo"]
];
lang[0] = Array.from(element0);

let element1 = [
   ["Moving Castles (C)", "Moviendo Castillos", "Movendo Castelos"],
   ["Moving Walls (P)", "Moviendo Murallas", "Movendo Muralhas"],
   ["Moving Forts (B)", "Moviendo Fuertes", "Movendo Fortes"],
   ["Moving Fortress (N)", "Moviendo Fortalezas", "Movendo Fortalezas"],
   ["Moving Citadels (Q)", "Moviendo Cidadelas", "Movendo Cidadelas"],
   ["Moving Towers (R)", "Moviendo Torres", "Movendo Torres"]
];
lang[1] = Array.from(element1);

//POPUPS
function popupLanguages() {
   //open popup
   if (parseInt(document.getElementById("butLangBG").getAttribute("width")) === 30) {

      document.getElementById("butLangBG").setAttribute("width", 270);
      document.getElementById("butLangBG").setAttribute("x", 30);

      document.getElementById("butLangEng").setAttribute("x", 45);
      document.getElementById("butLangEsp").setAttribute("x", 100);
      document.getElementById("butLangPor").setAttribute("x", 176);

      fillerStroker("textColorWhite");
      document.getElementById("txtLangEng").setAttribute("fill", Filler);
      document.getElementById("txtLangEsp").setAttribute("fill", Filler);
      document.getElementById("txtLangPor").setAttribute("fill", Filler);

      fillerStroker("mMove");
      if (setLang === 0){
         document.getElementById("txtLangEng").setAttribute("fill", Filler);
      } else if (setLang === 1) {
         document.getElementById("txtLangEsp").setAttribute("fill", Filler);
      } else if (setLang === 2) {
         document.getElementById("txtLangPor").setAttribute("fill", Filler);
      }

   } else { //close popup
      document.getElementById("butLangBG").setAttribute("width", 30);
      document.getElementById("butLangBG").setAttribute("x", 270);

      document.getElementById("butLangEng").setAttribute("x", 600);
      document.getElementById("butLangEsp").setAttribute("x", 600);
      document.getElementById("butLangPor").setAttribute("x", 600);

      fillerStroker("disable");

      document.getElementById("txtLangEng").setAttribute("fill", Filler);
      document.getElementById("txtLangEsp").setAttribute("fill", Filler);
      document.getElementById("txtLangPor").setAttribute("fill", Filler);

   }
}

svger("blackTransp", "rect", "butLangBG", 30, 30, 270, 0, 0, "geometricPrecision", "PlayerUPRight");

//buttons languages
function butLanguages(id, Lx, Ly, Ltxt) {

   letterer("disable", "text", id, Lx, Ly, "Helvetica", "normal", 10, "geometricPrecision", "PlayerUPRight", Ltxt);

}

butLanguages("txtLangEng", 50, 20, "ENGLISH");
butLanguages("txtLangEsp", 105, 20, "CASTELLANO");
butLanguages("txtLangPor", 180, 20, "PORTUGUÊS");

svger("disable", "rect", "butLangEng", 53, 12, 600, 10, 0, "geometricPrecision", "PlayerUPRight");
svger("disable", "rect", "butLangEsp", 74, 12, 600, 10, 0, "geometricPrecision", "PlayerUPRight");
svger("disable", "rect", "butLangPor", 72, 12, 600, 10, 0, "geometricPrecision", "PlayerUPRight");

//draw gear icon
pPoints = "2,13 4,12 5.1,9.34 4.39,7.22 7.22,4.39 9.34,5.1 12,4 13,2 17,2 18,4 20.66,5.1 22.77,4.38 25.60,7.22 24.90,9.34 26,12 28,13 28,15 22,15 19.95,10.05 15,8 10.05,10.05 8,15 2,15";
drawer("lightWhiteColor", "polygon", "iconGear1", 0, "geometricPrecision", "PlayerUPRight", pPoints);

pPoints = "2,15 2,17 4,18 5.1,20.66 4.4,22.78 7.23,25.61 9.34,24.90 12,26 13,28 17,28 18,26 20.66,24.90 22.78,25.61 25.61,22.78 24.90,20.66 25.84,18.02 28,17 28,15 22,15 19.95,19.95 15,22 10.05,19.95 8,15";
drawer("greyColor", "polygon", "iconGear2", 0, "geometricPrecision", "PlayerUPRight", pPoints);

document.getElementById("iconGear1").setAttributeNS(null, "transform", "translate(270,0)");
document.getElementById("iconGear2").setAttributeNS(null, "transform", "translate(270,0)");

//but gear
svger("blackTransp", "rect", "butGear", 30, 30, 270, 0, 0, "geometricPrecision", "PlayerUPRight");

const elGear = document.getElementById("butGear");
elGear.onclick = function(event) {
   popupLanguages();
};

// ENGLISH
const elEng = document.getElementById("butLangEng");
elEng.onclick = function(event) {
   setLang = 0;
   LangMaster();
   popupLanguages();
};

// CASTELLANO
const elEsp = document.getElementById("butLangEsp");
elEsp.onclick = function(event) {
   setLang = 1;
   LangMaster();
   popupLanguages();
};

// PORTUGUES
const elPor = document.getElementById("butLangPor");
elPor.onclick = function(event) {
   setLang = 2;
   LangMaster();
   popupLanguages();
};

function LangMaster() {
   infoMainLang();
}
