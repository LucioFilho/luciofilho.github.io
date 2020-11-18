/*jshint esversion: 6 */

function infoMainLang() {
   let i = 0;
   while (i < 6) {
      document.getElementById("butTxt" + i).textContent = lang[1][i][setLang];
      i++;
   }
}

//move mini pieces out from board.
function removePieces() {
   let i = 1;
   while (i < 21) {
      document.getElementById("intMA" + i).setAttributeNS(null, "cx", 600);
      document.getElementById("intMB" + i).setAttributeNS(null, "cx", 600);

      document.getElementById("midMA" + i).setAttributeNS(null, "cx", 600);
      document.getElementById("midMB" + i).setAttributeNS(null, "cx", 600);

      document.getElementById("extMA" + i).setAttributeNS(null, "cx", 600);
      document.getElementById("extMB" + i).setAttributeNS(null, "cx", 600);
      i++;
   }
   //remove mMarks
   document.getElementById("miniMove1").setAttributeNS(null, "x", 600);
   document.getElementById("miniMove2").setAttributeNS(null, "x", 600);
}

//set attributes to draw pieces
function setMiniPieces(I) {
   let fS1 = "";
   let fS2 = "";
   PPos = PieceType;

   if (PPos === "q" || PPos === "c" || PPos === "r" || PPos === "Q" || PPos === "C" || PPos === "R") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceFill";
         fS2 = "blackPieceFill";
      } else {
         fS1 = "blackPieceFill";
         fS2 = "whitePieceFill";
      }

      drawCircles(fS1, "circle", "intMA" + I, 600, 600, 9, 0, "geometricPrecision", "infoMain");
      drawCircles(fS2, "circle", "intMB" + I, 600, 600, 8, 0, "geometricPrecision", "infoMain");
   }

   if (PPos === "q" || PPos === "b" || PPos === "c" || PPos === "n" || PPos === "Q" || PPos === "B" || PPos === "C" || PPos === "N") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceStroke";
         fS2 = "blackPieceStroke";
      } else {
         fS1 = "blackPieceStroke";
         fS2 = "whitePieceStroke";
      }

      drawCircles(fS1, "circle", "midMA" + I, 600, 600, 10, 4, "geometricPrecision", "infoMain");
      drawCircles(fS2, "circle", "midMB" + I, 600, 600, 10, 3, "geometricPrecision", "infoMain");

   }

   if (PPos === "c" || PPos === "p" || PPos === "n" || PPos === "C" || PPos === "P" || PPos === "N") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceStroke";
         fS2 = "blackPieceStroke";
      } else {
         fS1 = "blackPieceStroke";
         fS2 = "whitePieceStroke";
      }

      drawCircles(fS1, "circle", "extMA" + I, 600, 600, 13, 4, "geometricPrecision", "infoMain");
      drawCircles(fS2, "circle", "extMB" + I, 600, 600, 13, 3, "geometricPrecision", "infoMain");
   }
}

function callOption() {


   let I = 0;
   while (I < 21) { //Castles 1-10
      I++;
      if (I < 11) {
         PieceType = "C";
      } else { //castles 11-20
         PieceType = "c";
      }
      setMiniPieces(I);
   }

}

//BGs MENU
svger("blackSquareMini", "rect", "butOptionMiniBG", 160, 30, 285, 0, 0, "geometricPrecision", "infoMain", 0, 0, 0);
svger("whiteSquareMini", "rect", "butStepBackMiniBG", 30, 30, 250, 0, 0, "geometricPrecision", "infoMain", 0, 0, 0);
svger("whiteSquareMini", "rect", "butStepForwardMiniBG", 30, 30, 450, 0, 0, "geometricPrecision", "infoMain", 0, 0, 0);

//button Step Forward
pPoints = "220,131 220,123 222,123 222,139 220,139 220,131, 211,139 211,123";
drawer("lightWhiteColor", "polygon", "iconStepForwardMini", 0, "geometricPrecision", "infoMain", pPoints);
document.getElementById("iconStepForwardMini").setAttributeNS(null, "transform", "translate(49,-116)");

//button Stepback
pPoints = "284,131 284,123 282,123 282,139 284,139 284,131, 293,139 293,123";
drawer("lightWhiteColor", "polygon", "iconStepBackMini", 0, "geometricPrecision", "infoMain", pPoints);
document.getElementById("iconStepBackMini").setAttributeNS(null, "transform", "translate(177,-116)");

// buts MENU 1
function Options() {
   let i = 0;
   while (i < 6) {

      if (i > 0) {
         svger("blackSquareMini", "rect", "butOptionMini" + i + "BG", 160, 30, 285, 600, 0, "geometricPrecision", "infoMain", 0, 0, 0);
      }

      letterer("disable", "text", "butTxt" + i, 300, 20 + (i * 30), "Helvetica", "normal", 14, "geometricPrecision", "infoMain", lang[1][i][setLang]);

      if (i > 0) {
         svger("disable", "rect", "butOptionMini" + i, 160, 30, 285, 600, 0, "geometricPrecision", "infoMain", 1, 0, 7, "whiteSquareMini", "blackSquareMini", "whiteSquareMini", "blackSquareMini");
      }

      i++;
   }
}
Options();

fillerStroker("textColorWhite");
document.getElementById("butTxt0").setAttribute("fill", Filler);

//buttons
svger("disable", "rect", "butStepBackMini", 30, 30, 250, 0, 0, "geometricPrecision", "infoMain", 1, 0, 8, "blackSquareMini", "whiteSquareMini", "blackSquareMini", "whiteSquareMini");
svger("disable", "rect", "butStepForwardMini", 30, 30, 450, 0, 0, "geometricPrecision", "infoMain", 1, 0, 9, "blackSquareMini", "whiteSquareMini", "blackSquareMini", "whiteSquareMini");
svger("disable", "rect", "butOptionMini", 160, 30, 285, 0, 0, "geometricPrecision", "infoMain", 1, 0, 7, "whiteSquareMini", "blackSquareMini", "whiteSquareMini", "blackSquareMini");

//draw board squares
function drawMiniSquares() {
   let setColor;
   if (SquareColor === "white") {
      setColor = "whiteSquareMini";
   } else {
      setColor = "blackSquareMini";
   }

   svger(setColor, "rect", DrawCanvas, 30, 30, Square_x, Square_y, 0, "geometricPrecision", "infoMain");

}

//row by row black and white and square positions controller
function squarerMini(I) {

   if (I < 33) {
      if (I < 9) {
         RowEvenOdd = 1;
         Square_x = (I - 1) * 30;
         Square_y = 0;
      } else if (I < 17) {
         RowEvenOdd = 0;
         Square_x = (I - 9) * 30;
         Square_y = 30;
      } else if (I < 25) {
         RowEvenOdd = 1;
         Square_x = (I - 17) * 30;
         Square_y = 60;
      } else if (I < 33) {
         RowEvenOdd = 0;
         Square_x = (I - 25) * 30;
         Square_y = 90;
      }
   } else {
      if (I < 41) {
         RowEvenOdd = 1;
         Square_x = (I - 33) * 30;
         Square_y = 120;
      } else if (I < 49) {
         RowEvenOdd = 0;
         Square_x = (I - 41) * 30;
         Square_y = 150;
      } else if (I < 57) {
         RowEvenOdd = 1;
         Square_x = (I - 49) * 30;
         Square_y = 180;
      } else {
         RowEvenOdd = 0;
         Square_x = (I - 57) * 30;
         Square_y = 210;
      }
   }
}

function createMiniBoard(miniID) {
   I = 0;
   while (I < 64) {
      I++;
      EvenOdd = I % 2;
      DrawCanvas = miniID + I;

      //get x y squares to positioning
      squarerMini(I);

      //define sequence of colors on board squares
      if (RowEvenOdd === 0) {
         if (EvenOdd === 0) {
            SquareColor = "white";
         } else {
            SquareColor = "black";
         }
      } else {
         if (EvenOdd === 1) {
            SquareColor = "white";
         } else {
            SquareColor = "black";
         }
      }

      drawMiniSquares(I);

   }

}

createMiniBoard("SquareMini" + Minis + "_");
Minis++;

//create move marks
svger("mMove", "rect", "miniMove1", 30, 30, 600, 600, 0, "geometricPrecision", "infoMain");
svger("mMove", "rect", "miniMove2", 30, 30, 600, 600, 0, "geometricPrecision", "infoMain");

//draw mini pieces
callOption();

// ANIMATION CASTLE IN CHECK
function castlesMotion(pawnId, bishopId, rookId, leavX, leavY, landX, landY, coll) {

   let travelY = 1;
   let travelX = 1;
   let c = 0;

   document.getElementById("extMA" + pawnId).setAttributeNS(null, "cx", leavX);
   document.getElementById("extMA" + pawnId).setAttributeNS(null, "cy", leavY);
   document.getElementById("extMB" + pawnId).setAttributeNS(null, "cx", leavX);
   document.getElementById("extMB" + pawnId).setAttributeNS(null, "cy", leavY);

   document.getElementById("midMA" + bishopId).setAttributeNS(null, "cx", leavX);
   document.getElementById("midMA" + bishopId).setAttributeNS(null, "cy", leavY);
   document.getElementById("midMB" + bishopId).setAttributeNS(null, "cx", leavX);
   document.getElementById("midMB" + bishopId).setAttributeNS(null, "cy", leavY);

   document.getElementById("intMA" + rookId).setAttributeNS(null, "cx", leavX);
   document.getElementById("intMA" + rookId).setAttributeNS(null, "cy", leavY);
   document.getElementById("intMB" + rookId).setAttributeNS(null, "cx", leavX);
   document.getElementById("intMB" + rookId).setAttributeNS(null, "cy", leavY);

   function animate() {
      if (leavY !== landY) {
         let animaY = setInterval(function() {
            if (leavY > landY) {
               travelY = parseInt(document.getElementById("extMA" + pawnId).getAttributeNS(null, "cy")) - 1;
            } else {
               travelY = parseInt(document.getElementById("extMA" + pawnId).getAttributeNS(null, "cy")) + 1;
            }
            document.getElementById("extMA" + pawnId).setAttributeNS(null, "cy", travelY);
            document.getElementById("extMB" + pawnId).setAttributeNS(null, "cy", travelY);
            document.getElementById("midMA" + pawnId).setAttributeNS(null, "cy", travelY);
            document.getElementById("midMB" + pawnId).setAttributeNS(null, "cy", travelY);
            document.getElementById("intMA" + pawnId).setAttributeNS(null, "cy", travelY);
            document.getElementById("intMB" + pawnId).setAttributeNS(null, "cy", travelY);

            if (travelY === landY) {
               clearInterval(animaY);
            }

         }, 1);
      }

      if (leavX !== landX) {
         let animaX = setInterval(function() {
            if (leavX > landX) {
               travelX = parseInt(document.getElementById("extMA" + pawnId).getAttributeNS(null, "cx")) - 1;
            } else {
               travelX = parseInt(document.getElementById("extMA" + pawnId).getAttributeNS(null, "cx")) + 1;
            }
            document.getElementById("extMA" + pawnId).setAttributeNS(null, "cx", travelX);
            document.getElementById("extMB" + pawnId).setAttributeNS(null, "cx", travelX);
            document.getElementById("midMA" + pawnId).setAttributeNS(null, "cx", travelX);
            document.getElementById("midMB" + pawnId).setAttributeNS(null, "cx", travelX);
            document.getElementById("intMA" + pawnId).setAttributeNS(null, "cx", travelX);
            document.getElementById("intMB" + pawnId).setAttributeNS(null, "cx", travelX);

            if (travelX === landX) {
               clearInterval(animaX);
            }

         }, 1);
      }

      function callColl() {
         if (coll !== null) {
            collateral(coll);
         }

         document.getElementById("miniMove1").setAttributeNS(null, "x", leavX - 15);
         document.getElementById("miniMove1").setAttributeNS(null, "y", leavY - 15);
         document.getElementById("miniMove2").setAttributeNS(null, "x", landX - 15);
         document.getElementById("miniMove2").setAttributeNS(null, "y", landY - 15);

      }

      let animaZ = setInterval(function() {
         callColl();
         clearInterval(animaZ);
      }, 200);

   }

   let stay = setInterval(function() {
      animate();
      clearInterval(stay);
   }, 1000);

}

// ANIMATIONS
function pieceMotion(pieceType, pieceValue, leavX, leavY, landX, landY, coll) {

   let travelY = 1;
   let travelX = 1;

   document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cx", leavX);
   document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cy", leavY);
   document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cx", leavX);
   document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cy", leavY);

   function animate() {
      if (leavY !== landY) {
         let animaY = setInterval(function() {
            if (leavY > landY) {
               travelY = parseInt(document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cy")) - 1;
            } else {
               travelY = parseInt(document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cy")) + 1;
            }
            document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cy", travelY);
            document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cy", travelY);

            if (travelY === landY) {
               clearInterval(animaY);
            }

         }, 1);
      }

      if (leavX !== landX) {
         let animaX = setInterval(function() {
            if (leavX > landX) {
               travelX = parseInt(document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cx")) - 1;
            } else {
               travelX = parseInt(document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cx")) + 1;
            }
            document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cx", travelX);
            document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cx", travelX);

            if (travelX === landX) {
               clearInterval(animaX);
            }

         }, 1);
      }

      function callColl() {
         if (coll !== null) {
            collateral(coll);
         }

         document.getElementById("miniMove1").setAttributeNS(null, "x", leavX - 15);
         document.getElementById("miniMove1").setAttributeNS(null, "y", leavY - 15);
         document.getElementById("miniMove2").setAttributeNS(null, "x", landX - 15);
         document.getElementById("miniMove2").setAttributeNS(null, "y", landY - 15);

      }

      let animaZ = setInterval(function() {
         callColl();
         clearInterval(animaZ);
      }, 200);

   }

   let stay = setInterval(function() {
      animate();
      clearInterval(stay);
   }, 1000);

}

function collateral(coll) {
   if (coll === 2) {
      piecesPositioning("B", 2, 45, 195); //Bb1
      piecesPositioning("B", 11, 45, 600); //B out
   } else if (coll === 3) {
      piecesPositioning("B", 2, 105, 195); //Bd2
      piecesPositioning("B", 11, 105, 600); //B out
   } else if (coll === 8) {
      piecesPositioning("B", 11, 45, 600); //Bb2
      piecesPositioning("B", 2, 45, 195); //Bb2
      piecesPositioning("R", 11, 45, 600); //Rb2
      piecesPositioning("R", 2, 45, 195); //Rb2
   } else if (coll === 9) {
      piecesPositioning("B", 11, 105, 600);
      piecesPositioning("B", 2, 105, 195);
      piecesPositioning("R", 11, 105, 600);
      piecesPositioning("R", 2, 105, 195);
   } else if (coll === 10) {
      piecesPositioning("R", 11, 105, 600);
   } else if (coll === 11) {
      piecesPositioning("R", 11, 105, 600);
   } else if (coll === 12) {
      piecesPositioning("P", 11, 105, 600);
   } else if (coll === 13) {
      piecesPositioning("P", 11, 105, 600);
   } else if (coll === 14) {
      piecesPositioning("P", 11, 105, 600);
      piecesPositioning("B", 11, 105, 600);
   } else if (coll === 15) {
      piecesPositioning("P", 11, 105, 600);
      piecesPositioning("B", 11, 105, 600);
   } else if (coll === 18) {
      piecesPositioning("B", 11, 75, 600);
      piecesPositioning("B", 2, 75, 195);
   } else if (coll === 19) {
      piecesPositioning("B", 11, 75, 600);
      piecesPositioning("R", 11, 75, 600);
      piecesPositioning("B", 2, 75, 195);
      piecesPositioning("R", 2, 75, 195);
   } else if (coll === 22) {
      piecesPositioning("C", 11, 75, 600);
   } else if (coll === 23) {
      piecesPositioning("C", 11, 75, 600);
   } else if (coll === 27) {
      piecesPositioning("B", 11, 45, 600);
   } else if (coll === 28) {
      piecesPositioning("B", 11, 105, 600);
   } else if (coll === 33) {
      piecesPositioning("B", 11, 45, 600); //Bb2
      piecesPositioning("R", 11, 45, 600); //Rb2
   } else if (coll === 34) {
      piecesPositioning("B", 11, 105, 600); //Bd2
      piecesPositioning("R", 11, 105, 600); //Rb2
   } else if (coll === 35) {
      piecesPositioning("R", 11, 45, 600);
   } else if (coll === 36) {
      piecesPositioning("R", 11, 45, 600);
   } else if (coll === 37) {
      piecesPositioning("P", 11, 45, 600);
   } else if (coll === 38) {
      piecesPositioning("P", 11, 105, 600);
   } else if (coll === 39) {
      piecesPositioning("B", 11, 45, 600);
      piecesPositioning("P", 11, 45, 600);
   } else if (coll === 40) {
      piecesPositioning("B", 11, 45, 600);
      piecesPositioning("P", 11, 45, 600);
   } else if (coll === 43) {
      piecesPositioning("B", 11, 75, 600);
      piecesPositioning("B", 2, 75, 195);
   } else if (coll === 44) {
      piecesPositioning("B", 11, 75, 600);
      piecesPositioning("R", 11, 75, 600);
   } else if (coll === 47) {
      piecesPositioning("C", 11, 45, 600);
   } else if (coll === 48) {
      piecesPositioning("C", 11, 105, 600);
   }
}

function piecesPositioning(piece, p, x, y) {

   if (piece === "C") { //insert a white Castle on board
      let c = 0;
      let t = "ext";
      while (c < 3) {
         c++;
         let coord = "cy";
         let xy = 0;
         if (c === 1) {
            t = "ext";
         } else if (c === 2) {
            t = "mid";
         } else if (c === 3) {
            t = "int";
         }
         let e = 0;
         while (e < 2) {
            e++;
            coord = coord === "cx" ? "cy" : "cx";
            if (coord === "cx") {
               xy = x;
            } else {
               xy = y;
            }
            document.getElementById(t + "MA" + p).setAttributeNS(null, coord, xy);
            document.getElementById(t + "MB" + p).setAttributeNS(null, coord, xy);
         }
      }
   }
   if (piece === "N") { //insert a white Castle on board
      let c = 0;
      let t = "ext";
      while (c < 2) {
         c++;
         let coord = "cy";
         let xy = 0;
         if (c === 1) {
            t = "ext";
         } else if (c === 2) {
            t = "mid";
         }
         let e = 0;
         while (e < 2) {
            e++;
            coord = coord === "cx" ? "cy" : "cx";
            if (coord === "cx") {
               xy = x;
            } else {
               xy = y;
            }
            document.getElementById(t + "MA" + p).setAttributeNS(null, coord, xy);
            document.getElementById(t + "MB" + p).setAttributeNS(null, coord, xy);
         }
      }
   }
   if (piece === "B") {
      let e = 0;
      let coord = "cy";
      let xy = 0;
      while (e < 2) {
         e++;
         coord = coord === "cx" ? "cy" : "cx";
         if (coord === "cx") {
            xy = x;
         } else {
            xy = y;
         }
         document.getElementById("midMA" + p).setAttributeNS(null, coord, xy);
         document.getElementById("midMB" + p).setAttributeNS(null, coord, xy);
      }
   }
   if (piece === "R") {
      let e = 0;
      let coord = "cy";
      let xy = 0;
      while (e < 2) {
         e++;
         coord = coord === "cx" ? "cy" : "cx";
         if (coord === "cx") {
            xy = x;
         } else {
            xy = y;
         }
         document.getElementById("intMA" + p).setAttributeNS(null, coord, xy);
         document.getElementById("intMB" + p).setAttributeNS(null, coord, xy);
      }
   }
   if (piece === "P") {
      let e = 0;
      let coord = "cy";
      let xy = 0;
      while (e < 2) {
         e++;
         coord = coord === "cx" ? "cy" : "cx";
         if (coord === "cx") {
            xy = x;
         } else {
            xy = y;
         }
         document.getElementById("extMA" + p).setAttributeNS(null, coord, xy);
         document.getElementById("extMB" + p).setAttributeNS(null, coord, xy);
      }
   }
}

//animations
let animaRunning = 0;

function animatron(act, cut) {

   if (animaRunning === 0) {
      animaRunning = 1;

      let anima = setInterval(function() {

         if (act <= cut) {

            if (act === 1) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 2) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 45, 195); //Bb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 2); //c1b2
            } else if (act === 3) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 105, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 105, 195, 3); //c1d2
            } else if (act === 4) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 45, 195); //Bb2
               pieceMotion("ext", 1, 75, 225, 45, 195, null); //c1b2
            } else if (act === 5) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 105, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 105, 195, null); //c1d2
            } else if (act === 6) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 45, 195); //Bb2
               piecesPositioning("R", 2, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, null); //c1b2
            } else if (act === 7) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 105, 195); //Bd2
               piecesPositioning("R", 2, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, null); //c1d2
            } else if (act === 8) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 45, 195); //Bb2
               piecesPositioning("R", 11, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 8); //c1b2
            } else if (act === 9) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 105, 195); //Bd2
               piecesPositioning("R", 11, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, 9); //c1d2
            } else if (act === 10) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc
               piecesPositioning("R", 11, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 10); //c1b2
            } else if (act === 11) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("R", 11, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, 11); //c1d2
            } else if (act === 12) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc
               piecesPositioning("P", 11, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 12); //c1b2
            } else if (act === 13) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("P", 11, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, 13); //c1d2
            } else if (act === 14) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 45, 195); //Bb2
               piecesPositioning("P", 11, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 14); //c1b2
            } else if (act === 15) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 105, 195); //Bd2
               piecesPositioning("P", 11, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, 15); //c1d2
            } else if (act === 16) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 17) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 75, 195); //Bd2
               piecesPositioning("R", 2, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 18) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, 18); //c1c2
            } else if (act === 19) {
               removePieces();
               piecesPositioning("P", 1, 75, 225);
               piecesPositioning("B", 11, 75, 195);
               piecesPositioning("R", 11, 75, 195);
               pieceMotion("ext", 1, 75, 225, 75, 195, 19);
            } else if (act === 20) {
               removePieces();
               piecesPositioning("P", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 21) {
               removePieces();
               piecesPositioning("P", 1, 75, 225);
               piecesPositioning("B", 2, 75, 195);
               piecesPositioning("R", 2, 75, 195);
               pieceMotion("ext", 1, 75, 225, 75, 195, null);
            } else if (act === 22) {
               removePieces();
               piecesPositioning("P", 1, 75, 225);
               piecesPositioning("C", 11, 45, 195);
               pieceMotion("ext", 1, 75, 225, 45, 195, 22);
            } else if (act === 23) {
               removePieces();
               piecesPositioning("P", 1, 75, 225);
               piecesPositioning("C", 11, 105, 195);
               pieceMotion("ext", 1, 75, 225, 105, 195, 23);
            } else if (act === 24) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 25) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 26) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               pieceMotion("ext", 1, 75, 225, 75, 165, null); //c1c2
            } else if (act === 27) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 45, 195); //Bb2
               castlesMotion(1, 1, 1, 75, 225, 45, 195, 27); //c1b2
            } else if (act === 28) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 105, 195); //Bd2
               castlesMotion(1, 1, 1, 75, 225, 105, 195, 28); //c1d2
            } else if (act === 29) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 45, 195); //Bb2
               pieceMotion("ext", 1, 75, 225, 45, 195, null); //c1b2
            } else if (act === 30) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 105, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 105, 195, null); //c1d2
            } else if (act === 31) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 45, 195); //Bb2
               piecesPositioning("R", 2, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, null); //c1b2
            } else if (act === 32) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 105, 195); //Bd2
               piecesPositioning("R", 2, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, null); //c1d2
            } else if (act === 33) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 45, 195); //Bb2
               piecesPositioning("R", 11, 45, 195); //Rb2
               castlesMotion(1, 1, 1, 75, 225, 45, 195, 33); //c1b2
            } else if (act === 34) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 105, 195); //Bd2
               piecesPositioning("R", 11, 105, 195); //Rb2
               castlesMotion(1, 1, 1, 75, 225, 105, 195, 34); //c1d2
            } else if (act === 35) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc
               piecesPositioning("R", 11, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 35); //c1b2
            } else if (act === 36) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("R", 11, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, 36); //c1d2
            } else if (act === 37) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc
               piecesPositioning("P", 11, 45, 195); //Rb2
               castlesMotion(1, 1, 1, 75, 225, 45, 195, 37); //c1b2
            } else if (act === 38) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("P", 11, 105, 195); //Rb2
               castlesMotion(1, 1, 1, 75, 225, 105, 195, 38); //c1d2
            } else if (act === 39) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 45, 195); //Bb2
               piecesPositioning("P", 11, 45, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 45, 195, 39); //c1b2
            } else if (act === 40) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 105, 195); //Bd2
               piecesPositioning("P", 11, 105, 195); //Rb2
               pieceMotion("ext", 1, 75, 225, 105, 195, 40); //c1d2
            } else if (act === 41) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 42) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 75, 195); //Bd2
               piecesPositioning("R", 2, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 43) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 11, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, 43); //c1c2
            } else if (act === 44) {
               removePieces();
               piecesPositioning("C", 1, 75, 225);
               piecesPositioning("B", 11, 75, 195);
               piecesPositioning("R", 11, 75, 195);
               castlesMotion(1, 1, 1, 75, 225, 75, 195, 44);
            } else if (act === 45) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               piecesPositioning("B", 2, 75, 195); //Bd2
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            } else if (act === 46) {
               removePieces();
               piecesPositioning("C", 1, 75, 225);
               piecesPositioning("B", 2, 75, 195);
               piecesPositioning("R", 2, 75, 195);
               pieceMotion("ext", 1, 75, 225, 75, 195, null);
            } else if (act === 47) {
               removePieces();
               piecesPositioning("C", 1, 75, 225);
               piecesPositioning("C", 11, 45, 195);
               castlesMotion(1, 1, 1, 75, 225, 45, 195, 47);
            } else if (act === 48) {
               removePieces();
               piecesPositioning("C", 1, 75, 225);
               piecesPositioning("C", 11, 105, 195);
               castlesMotion(1, 1, 1, 75, 225, 105, 195, 48);
            } else if (act === 49) {
               removePieces();
               piecesPositioning("C", 1, 75, 225); //Cc1
               pieceMotion("ext", 1, 75, 225, 75, 195, null); //c1c2
            }
         } else {
            animaRunning = 0;
            document.getElementById("butOptionMini").setAttribute("y", 0);
            clearInterval(anima);
         }

         act++;

      }, 3000);
   }
}

//POPUPS
function popups(act, cut, popup, options) {
   //open popup
   if (parseInt(document.getElementById("butOptionMiniBG").getAttribute("height")) === 30) {
      document.getElementById("butOptionMiniBG").setAttribute("height", 180);

      fillerStroker("textColorWhite");

      let i = 0;
      while (i < options) {
         document.getElementById("butTxt" + i).setAttribute("y", 20 + (30 * i));
         document.getElementById("butTxt" + i).setAttribute("fill", Filler);

         if (i > 0) {
            document.getElementById("butOptionMini" + i + "BG").setAttribute("y", 30 * i);
            document.getElementById("butOptionMini" + i).setAttribute("y", 30 * i);
         }
         i++;
      }

   } else { //close popup
      document.getElementById("butOptionMiniBG").setAttribute("height", 30);

      fillerStroker("disable");
      let i = 0;
      while (i < options) {
         document.getElementById("butTxt" + i).setAttribute("fill", Filler);

         if (i > 0) {
            document.getElementById("butOptionMini" + i + "BG").setAttribute("y", 600);
            document.getElementById("butOptionMini" + i).setAttribute("y", 600);
         }

         i++;
      }
      document.getElementById("butOptionMini").setAttribute("y", 600);

      fillerStroker("textColorWhite");
      document.getElementById("butTxt" + opChoice).setAttribute("y", 20);
      document.getElementById("butTxt" + opChoice).setAttribute("fill", Filler);

      animatron(act, cut);

   }
}
