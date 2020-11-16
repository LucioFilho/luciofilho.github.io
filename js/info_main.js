/*jshint esversion: 6 */

function infoMainLang() {
   let i = 0;
   while (i < 6) {
      document.getElementById("butTxt" + i).textContent = lang[1][i][setLang];
      i++;
   }
}

function hideMoveMarks() {
   document.getElementById("miniMove1").setAttributeNS(null, "x", 600);
   document.getElementById("miniMove1").setAttributeNS(null, "y", 600);
   document.getElementById("miniMove2").setAttributeNS(null, "x", 600);
   document.getElementById("miniMove2").setAttributeNS(null, "y", 600);
}

//clear mini pieces
function removePieces(I) {
   let i = I;
   while (document.getElementById("intMA" + i) !== null) {
      document.getElementById("intMA" + i).remove();
      document.getElementById("intMB" + i).remove();
      i++;
   }
   i = I;
   while (document.getElementById("midMA" + i) !== null) {
      document.getElementById("midMA" + i).remove();
      document.getElementById("midMB" + i).remove();
      i++;
   }
   i = I;
   while (document.getElementById("extMA" + i) !== null) {
      document.getElementById("extMA" + i).remove();
      document.getElementById("extMB" + i).remove();
      i++;
   }
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

      drawCircles(fS1, "circle", "intMA" + I, Square_x + 15, Square_y + 15, 9, 0, "geometricPrecision", "infoMain");
      drawCircles(fS2, "circle", "intMB" + I, Square_x + 15, Square_y + 15, 8, 0, "geometricPrecision", "infoMain");
   }

   if (PPos === "q" || PPos === "b" || PPos === "c" || PPos === "n" || PPos === "Q" || PPos === "B" || PPos === "C" || PPos === "N") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceStroke";
         fS2 = "blackPieceStroke";
      } else {
         fS1 = "blackPieceStroke";
         fS2 = "whitePieceStroke";
      }

      drawCircles(fS1, "circle", "midMA" + I, Square_x + 15, Square_y + 15, 10, 4, "geometricPrecision", "infoMain");
      drawCircles(fS2, "circle", "midMB" + I, Square_x + 15, Square_y + 15, 10, 3, "geometricPrecision", "infoMain");

   }

   if (PPos === "c" || PPos === "p" || PPos === "n" || PPos === "C" || PPos === "P" || PPos === "N") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceStroke";
         fS2 = "blackPieceStroke";
      } else {
         fS1 = "blackPieceStroke";
         fS2 = "whitePieceStroke";
      }

      drawCircles(fS1, "circle", "extMA" + I, Square_x + 15, Square_y + 15, 13, 4, "geometricPrecision", "infoMain");
      drawCircles(fS2, "circle", "extMB" + I, Square_x + 15, Square_y + 15, 13, 3, "geometricPrecision", "infoMain");
   }
}

//MENU
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

function callOption(op) {
   if (op === 1) {
      //create pieces to learn moving Castle
      PieceType = "C";
      Square_x = 60;
      Square_y = 210;
      setMiniPieces(1);
   } else if (op === 2) {
      //create pieces to learn moving Castle
      PieceType = "b";
      Square_x = 600;
      Square_y = 600;
      setMiniPieces(2);
   }
}
callOption(1);
callOption(2);

//clear clearBoard. Move all pieces out from board to let animation start again
function clearBoard() {
   document.getElementById("midMA2").setAttributeNS(null, "cx", 600);
   document.getElementById("midMA2").setAttributeNS(null, "cy", 600);
   document.getElementById("midMB2").setAttributeNS(null, "cx", 600);
   document.getElementById("midMB2").setAttributeNS(null, "cy", 600);
}

// ANIMATIONS
function pieceAnimator(pieceType, pieceValue, leavingX, leavingY, landingX, landingY, pieceType2, pieceValue2, leavingX2, leavingY2, landingX2, landingY2) {

   let travel = 1;

   document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cx", leavingX + 15);
   document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cy", leavingY + 15);
   document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cx", leavingX + 15);
   document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cy", leavingY + 15);

   if (pieceType2 !== "none") {

      if (pieceType2 === "mid") {
         fillerStroker("black");
         document.getElementById(pieceType2 + "MA" + pieceValue2).setAttributeNS(null, "stroke", Stroker);
         document.getElementById(pieceType2 + "MB" + pieceValue2).setAttributeNS(null, "stroke", Filler);
      }

      document.getElementById(pieceType2 + "MA" + pieceValue2).setAttributeNS(null, "cx", leavingX2 + 15);
      document.getElementById(pieceType2 + "MA" + pieceValue2).setAttributeNS(null, "cy", leavingY2 + 15);
      document.getElementById(pieceType2 + "MB" + pieceValue2).setAttributeNS(null, "cx", leavingX2 + 15);
      document.getElementById(pieceType2 + "MB" + pieceValue2).setAttributeNS(null, "cy", leavingY2 + 15);
   } else {
      clearBoard();
   }

   function animate() {
      if (leavingY !== landingY) {
         let animaY = setInterval(function() {
            if (leavingY > landingY) {
               travel = document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cy") - 1;
            } else {
               travel = document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cy") + 1;
            }
            document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cy", travel);
            document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cy", travel);

            if (travel === landingY + 15) {
               document.getElementById("miniMove1").setAttributeNS(null, "x", leavingX);
               document.getElementById("miniMove1").setAttributeNS(null, "y", leavingY);
               document.getElementById("miniMove2").setAttributeNS(null, "x", landingX);
               document.getElementById("miniMove2").setAttributeNS(null, "y", landingY);
               clearInterval(animaY);
            }

         }, 1);
      }

      if (leavingX !== landingX) {
         let animaX = setInterval(function() {
            if (leavingX > landingX) {
               travel = document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cx") - 1;
            } else {
               travel = document.getElementById(pieceType + "MA" + pieceValue).getAttributeNS(null, "cx") + 1;
            }
            document.getElementById(pieceType + "MA" + pieceValue).setAttributeNS(null, "cx", travel);
            document.getElementById(pieceType + "MB" + pieceValue).setAttributeNS(null, "cx", travel);

            if (travel === landingX + 15) {
               document.getElementById("miniMove1").setAttributeNS(null, "x", leavingX);
               document.getElementById("miniMove1").setAttributeNS(null, "y", leavingY);
               document.getElementById("miniMove2").setAttributeNS(null, "x", landingX);
               document.getElementById("miniMove2").setAttributeNS(null, "y", landingY);

               if (pieceType2 !== "none") {
                  if (pieceType2 === "mid") {
                     fillerStroker("white");
                     document.getElementById(pieceType2 + "MA" + pieceValue2).setAttributeNS(null, "stroke", Stroker);
                     document.getElementById(pieceType2 + "MB" + pieceValue2).setAttributeNS(null, "stroke", Filler);
                  }
               }

               clearInterval(animaX);
            }

         }, 1);
      }
   }
   let stay = setInterval(function() {
      animate();
      clearInterval(stay);
   }, 1000);

}

//animations
function animatron(act, cut) {

   let anima = setInterval(function() {

      if (act <= cut) {
         if (act === 1) {
            hideMoveMarks();
            pieceAnimator("ext", 1, 60, 210, 60, 150, "none");
         } else if (act === 2) {
            hideMoveMarks();
            pieceAnimator("ext", 1, 60, 210, 60, 180, "none");
         } else if (act === 3) {
            hideMoveMarks();
            pieceAnimator("ext", 1, 60, 210, 30, 180, "mid", 2, 30, 180, 30, 180);
         }

      } else {
         clearInterval(anima);
      }

      act++;

   }, 3000);
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

      fillerStroker("textColorWhite");
      document.getElementById("butTxt" + opChoice).setAttribute("y", 20);
      document.getElementById("butTxt" + opChoice).setAttribute("fill", Filler);

      animatron(act, cut);

   }
}
