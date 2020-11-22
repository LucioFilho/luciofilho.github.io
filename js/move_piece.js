/*jshint esversion: 6 */

//move piece
function animePiece(leaving, landing, piecesToMove) {
   let extPP = extPiecesPosition[leaving];
   let midPP = midPiecesPosition[leaving];
   let intPP = intPiecesPosition[leaving];

   switch (piecesToMove) {
      case "EMI":
         extPiecesPosition[leaving] = 0;
         midPiecesPosition[leaving] = 0;
         intPiecesPosition[leaving] = 0;
         extPiecesPosition[landing - 1] = extPP;
         midPiecesPosition[landing - 1] = midPP;
         intPiecesPosition[landing - 1] = intPP;
         break;
      case "E":
         extPiecesPosition[leaving] = 0;
         extPiecesPosition[landing - 1] = extPP;
         break;
      case "M":
         midPiecesPosition[leaving] = 0;
         midPiecesPosition[landing - 1] = midPP;
         break;
      case "I":
         intPiecesPosition[leaving] = 0;
         intPiecesPosition[landing - 1] = intPP;
         break;
      default:
         break;
   }

   let leavingX = null;
   let leavingY = null;
   let landX = null;
   let landY = null;
   let speedX = null;
   let speedY = null;
   let leavingXExt = null;
   let leavingXMid = null;
   let leavingXInt = null;
   let leavingYExt = null;
   let leavingYMid = null;
   let leavingYInt = null;

   if (piecesToMove === "EMI" || piecesToMove === "E") {
      leavingXExt = parseInt(document.getElementById("extA" + extPP).getAttributeNS(null, "cx"));
      leavingYExt = parseInt(document.getElementById("extA" + extPP).getAttributeNS(null, "cy"));
   }
   if (piecesToMove === "EMI" || piecesToMove === "M") {
      leavingXMid = parseInt(document.getElementById("midA" + midPP).getAttributeNS(null, "cx"));
      leavingYMid = parseInt(document.getElementById("midA" + midPP).getAttributeNS(null, "cy"));
   }
   if (piecesToMove === "EMI" || piecesToMove === "I") {
      leavingXInt = parseInt(document.getElementById("intA" + intPP).getAttributeNS(null, "cx"));
      leavingYInt = parseInt(document.getElementById("intA" + intPP).getAttributeNS(null, "cy"));
   }

   switch (piecesToMove) {
      case "EMI":
      case "E":
         leavingX = leavingXExt;
         leavingY = leavingYExt;
         break;
      case "M":
         leavingX = leavingXMid;
         leavingY = leavingYMid;
         break;
      case "I":
         leavingX = leavingXInt;
         leavingY = leavingYInt;
         break;
   }

   landX = parseInt(document.getElementById("butSquare" + landing).getAttributeNS(null, "x")) + 30;
   landY = parseInt(document.getElementById("butSquare" + landing).getAttributeNS(null, "y")) + 30;

   speedX = leavingX > landX ? parseInt((leavingX - landX) / 30) : speedX = leavingX < landX ? parseInt((landX - leavingX) / 30) : 0;
   speedY = leavingY > landY ? parseInt((leavingY - landY) / 30) : speedY = leavingY < landY ? parseInt((landY - leavingY) / 30) : 0;

   //markMoves
   document.getElementById("mMove1").setAttributeNS(null, "x", leavingX - 30);
   document.getElementById("mMove1").setAttributeNS(null, "y", leavingY - 30);

   let animeEMI = function() {
      let travel = setInterval(function() {

         if (leavingX > landX) {
            leavingX -= speedX;
            if (leavingX < landX) {
               leavingX = landX;
            }
         } else if (leavingX < landX) {
            leavingX += speedX;
            if (leavingX > landX) {
               leavingX = landX;
            }
         }
         if (piecesToMove === "EMI" || piecesToMove === "E") {
            document.getElementById("extA" + extPP).setAttributeNS(null, "cx", leavingX);
            document.getElementById("extB" + extPP).setAttributeNS(null, "cx", leavingX);
         }
         if (piecesToMove === "EMI" || piecesToMove === "M") {
            document.getElementById("midA" + midPP).setAttributeNS(null, "cx", leavingX);
            document.getElementById("midB" + midPP).setAttributeNS(null, "cx", leavingX);
         }
         if (piecesToMove === "EMI" || piecesToMove === "I") {
            document.getElementById("intA" + intPP).setAttributeNS(null, "cx", leavingX);
            document.getElementById("intB" + intPP).setAttributeNS(null, "cx", leavingX);
         }

         if (leavingY > landY) {
            leavingY -= speedY;
            if (leavingY < landY) {
               leavingY = landY;
            }
         } else if (leavingY < landY) {
            leavingY += speedY;
            if (leavingY > landY) {
               leavingY = landY;
            }
         }
         if (piecesToMove === "EMI" || piecesToMove === "E") {
            document.getElementById("extA" + extPP).setAttributeNS(null, "cy", leavingY);
            document.getElementById("extB" + extPP).setAttributeNS(null, "cy", leavingY);
         }
         if (piecesToMove === "EMI" || piecesToMove === "M") {
            document.getElementById("midA" + midPP).setAttributeNS(null, "cy", leavingY);
            document.getElementById("midB" + midPP).setAttributeNS(null, "cy", leavingY);
         }
         if (piecesToMove === "EMI" || piecesToMove === "I") {
            document.getElementById("intA" + intPP).setAttributeNS(null, "cy", leavingY);
            document.getElementById("intB" + intPP).setAttributeNS(null, "cy", leavingY);
         }

         if (leavingX === landX && leavingY === landY) {
            clearInterval(travel);

            //mMove delayed. The second move's mark.
            document.getElementById("mMove2").setAttributeNS(null, "x", landX - 30);
            document.getElementById("mMove2").setAttributeNS(null, "y", landY - 30);

            //promotion
            if (PromoControl === 1) {
               //pawn's Promotion
               let pStroke1;
               let pStroke2;
               if (PiecesPosition[landing - 1] === PiecesPosition[landing - 1].toUpperCase()) {
                  pStroke1 = "rgba(0,0,0,1.0)";
                  pStroke2 = "rgba(255,255,255,1.0)";
               } else {
                  pStroke1 = "rgba(255,255,255,1.0)";
                  pStroke2 = "rgba(0,0,0,1.0)";
               }

               if (extPiecesPosition[landing - 1] !== 0 && (PiecesToRemove === "EMI" || PiecesToRemove === "E")) {
                  document.getElementById("extA" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
                  document.getElementById("extB" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
               }
               if (midPiecesPosition[landing - 1] !== 0 && (PiecesToRemove === "EMI" || PiecesToRemove === "M")) {
                  document.getElementById("midA" + midPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
                  document.getElementById("midB" + midPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
               }
               if (intPiecesPosition[landing - 1] && (PiecesToRemove === "EMI" || PiecesToRemove === "I")) {
                  document.getElementById("intA" + intPiecesPosition[landing - 1]).setAttributeNS(null, "fill", "transparent");
                  document.getElementById("intB" + intPiecesPosition[landing - 1]).setAttributeNS(null, "fill", "transparent");
               }

               extPiecesPosition[landing - 1] = 0;
               midPiecesPosition[landing - 1] = PromoID;
               intPiecesPosition[landing - 1] = PromoID;

               document.getElementById("midA" + PromoID).setAttributeNS(null, "stroke", pStroke1);
               document.getElementById("midB" + PromoID).setAttributeNS(null, "stroke", pStroke2);
               document.getElementById("intA" + PromoID).setAttributeNS(null, "fill", pStroke1);
               document.getElementById("intB" + PromoID).setAttributeNS(null, "fill", pStroke2);


               document.getElementById("midA" + PromoID).setAttributeNS(null, "cx", landX);
               document.getElementById("midA" + PromoID).setAttributeNS(null, "cy", landY);
               document.getElementById("midB" + PromoID).setAttributeNS(null, "cx", landX);
               document.getElementById("midB" + PromoID).setAttributeNS(null, "cy", landY);

               document.getElementById("intA" + PromoID).setAttributeNS(null, "cx", landX);
               document.getElementById("intA" + PromoID).setAttributeNS(null, "cy", landY);
               document.getElementById("intB" + PromoID).setAttributeNS(null, "cx", landX);
               document.getElementById("intB" + PromoID).setAttributeNS(null, "cy", landY);

               PromoID++;
               PromoControl = 0;
            }

            shortCode();
            gameDisplay888(Move - 1);

            LockFlipBoard = 0;

            //mate.
            if (TotalWCastles === 0) {
               gameover = 1;
               winner = "black";
               loserPiecesTransp();
               clearInterval(GameCountdown);
            }
            if (TotalBCastles === 0) {
               gameover = 1;
               winner = "white";
               loserPiecesTransp();
               clearInterval(GameCountdown);
            }

         }

      }, 1);

   };

   animeEMI();
}

function coloring(p, q, landing) {
   let pSq;
   if (p === "ext") {
      pSq = extPiecesPosition[landing - 1];
   } else if (p === "mid") {
      pSq = midPiecesPosition[landing - 1];
   } else if (p === "int") {
      pSq = intPiecesPosition[landing - 1];
   }
   document.getElementById(p + "A" + pSq).setAttributeNS(null, q, Stroker);
   document.getElementById(p + "B" + pSq).setAttributeNS(null, q, Filler);
}

function coloringPieces(leaving, landing) {

   let ppLeaving = PiecesPosition[leaving];
   let ppLanding = PiecesPosition[landing - 1];

   if (ppLanding === "C" || ppLanding === "c") {
      fillerStroker("disable");
      coloring("ext", "stroke", landing);
      coloring("mid", "stroke", landing);
      coloring("int", "fill", landing);
      extPiecesPosition[landing - 1] = 0;
      midPiecesPosition[landing - 1] = 0;
      intPiecesPosition[landing - 1] = 0;

   } else if (ppLanding === "P") {
      if (ppLeaving === "c" || ppLeaving === "p" || ppLeaving === "r" || ppLeaving === "n") {
         fillerStroker("disable");
         coloring("ext", "stroke", landing);
         extPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "b" || ppLeaving === "q") {
         fillerStroker("black");
         coloring("ext", "stroke", landing);
      }

   } else if (ppLanding === "p") {
      if (ppLeaving === "C" || ppLeaving === "P" || ppLeaving === "R" || ppLeaving === "N") {
         fillerStroker("disable");
         coloring("ext", "stroke", landing);
         extPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "B" || ppLeaving === "Q") {
         fillerStroker("white");
         coloring("ext", "stroke", landing);
      }

   } else if (ppLanding === "B") {
      if (ppLeaving === "b" || ppLeaving === "q") {
         fillerStroker("disable");
         coloring("mid", "stroke", landing);
         midPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "c") {
         if (BlackCastlesInCheck.includes(BSqSel)) {
            fillerStroker("disable");
            coloring("mid", "stroke", landing);
            midPiecesPosition[landing - 1] = 0;
         } else {
            fillerStroker("black");
            coloring("mid", "stroke", landing);
         }
      } else if (ppLeaving === "p" || ppLeaving === "n" || ppLeaving === "r") {
         fillerStroker("black");
         coloring("mid", "stroke", landing);
      }

   } else if (ppLanding === "b") {
      if (ppLeaving === "B" || ppLeaving === "Q") {
         fillerStroker("disable");
         coloring("mid", "stroke", landing);
         midPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "C") {
         if (WhiteCastlesInCheck.includes(BSqSel)) {
            fillerStroker("disable");
            coloring("mid", "stroke", landing);
            midPiecesPosition[landing - 1] = 0;
         } else {
            fillerStroker("white");
            coloring("mid", "stroke", landing);
         }
      } else if (ppLeaving === "P" || ppLeaving === "N" || ppLeaving === "R") {
         fillerStroker("white");
         coloring("mid", "stroke", landing);
      }

   } else if (ppLanding === "Q") {
      if (ppLeaving === "b" || ppLeaving === "q" || ppLeaving === "r" || ppLeaving === "c") {
         fillerStroker("disable");
         coloring("mid", "stroke", landing);
         coloring("int", "fill", landing);
         midPiecesPosition[landing - 1] = 0;
         intPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "p" || ppLeaving === "n") {
         fillerStroker("black");
         coloring("mid", "stroke", landing);
         coloring("int", "fill", landing);
      }

   } else if (ppLanding === "q") {
      if (ppLeaving === "B" || ppLeaving === "C" || ppLeaving === "Q" || ppLeaving === "R") {
         fillerStroker("disable");
         coloring("mid", "stroke", landing);
         coloring("int", "fill", landing);
         midPiecesPosition[landing - 1] = 0;
         intPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "P" || ppLeaving === "N") {
         fillerStroker("white");
         coloring("mid", "stroke", landing);
         coloring("int", "fill", landing);
      }

   } else if (ppLanding === "R") {
      if (ppLeaving === "b" || ppLeaving === "q") {
         fillerStroker("black");
         coloring("int", "fill", landing);
      } else if (ppLeaving === "c" || ppLeaving === "p" || ppLeaving === "n" || ppLeaving === "r") {
         fillerStroker("disable");
         coloring("int", "fill", landing);
         intPiecesPosition[landing - 1] = 0;
      }

   } else if (ppLanding === "r") {
      if (ppLeaving === "B" || ppLeaving === "Q") {
         fillerStroker("white");
         coloring("int", "fill", landing);
      } else if (ppLeaving === "C" || ppLeaving === "P" || ppLeaving === "N" || ppLeaving === "R") {
         fillerStroker("disable");
         coloring("int", "fill", landing);
         intPiecesPosition[landing - 1] = 0;
      }

   } else if (ppLanding === "N") {
      if (ppLeaving === "b" || ppLeaving === "q" || ppLeaving === "c" || ppLeaving === "p" || ppLeaving === "n") {
         fillerStroker("disable");
         coloring("ext", "stroke", landing);
         coloring("mid", "stroke", landing);
         extPiecesPosition[landing - 1] = 0;
         midPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "r") {
         fillerStroker("black");
         coloring("ext", "stroke", landing);
         coloring("mid", "stroke", landing);
      }

   } else if (ppLanding === "n") {
      if (ppLeaving === "B" || ppLeaving === "Q" || ppLeaving === "C" || ppLeaving === "P" || ppLeaving === "N") {
         fillerStroker("disable");
         coloring("ext", "stroke", landing);
         coloring("mid", "stroke", landing);
         extPiecesPosition[landing - 1] = 0;
         midPiecesPosition[landing - 1] = 0;
      } else if (ppLeaving === "R") {
         fillerStroker("white");
         coloring("ext", "stroke", landing);
         coloring("mid", "stroke", landing);
      }
   }
}

function movingPiece(i) {

   LockFlipBoard = 1;
   Checkered = 0;

   Turn = PiecesPosition[BSqSel - 1] === PiecesPosition[BSqSel - 1].toUpperCase() ? "b" : "W";


   //call countdown
   // playGameCount();

   //back forward control
   MMoveLeaving = i;
   MMoveLanding = BSqSel;
   MMovesLanding.push(MMoveLanding);
   MMovesLeaving.push(MMoveLeaving);

   let leaving = BSqSel - 1;
   let landing = i;

   if (TotalWCastles === 1) {
      WhiteCastlesInCheck.push(BSqSel);
   }
   if (TotalBCastles === 1) {
      BlackCastlesInCheck.push(BSqSel);
   }

   coloringPieces(leaving, landing);

   switch (PiecesPosition[BSqSel - 1]) { //identify leaving piece
      case "C":
         soundCastle.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "c":
               //fall through
            case "n":
               //fall through
            case "q":
               //fall through
            case "r":
               PiecesPosition[BSqSel - 1] = WhiteCastlesInCheck.includes(BSqSel) ? "O" : "Q";

               if (PiecesPosition[BSqSel - 1] === "O") {
                  if (TotalWCastles > 1 && i < 9) {
                     PiecesPosition[i - 1] = "Q";
                     PromoControl = 1;
                     PiecesToRemove = "EMI";
                  } else {
                     PiecesPosition[i - 1] = "C";
                  }
                  animePiece(leaving, landing, "EMI");

               } else if (PiecesPosition[BSqSel - 1] === "Q") {
                  if (i < 9) {
                     PiecesPosition[i - 1] = "Q";
                     PromoControl = 1;
                     PiecesToRemove = "EMI";
                  } else {
                     PiecesPosition[i - 1] = "P";
                  }
                  animePiece(leaving, landing, "E");
               }
               break;
            case "p":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "C";
               animePiece(leaving, landing, "EMI");
               break;
            case "b":
               PiecesPosition[BSqSel - 1] = WhiteCastlesInCheck.includes(BSqSel) ? "O" : "Q";

               if (PiecesPosition[BSqSel - 1] === "O") {
                  PiecesPosition[i - 1] = "C";
                  animePiece(leaving, landing, "EMI");

               } else if (PiecesPosition[BSqSel - 1] === "Q") {
                  PiecesPosition[i - 1] = "N";
                  animePiece(leaving, landing, "E");
               }
               break;
            case "B":
               PiecesPosition[BSqSel - 1] = "Q";
               PiecesPosition[i - 1] = "N";
               animePiece(leaving, landing, "E");
               break;
            case "Q":
               PiecesPosition[BSqSel - 1] = "Q";
               PiecesPosition[i - 1] = "C";
               animePiece(leaving, landing, "E");
               break;
         }
         break;
      case "c":
         soundCastle.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "C":
               //fall through
            case "N":
               //fall through
            case "Q":
               //fall through
            case "R":
               PiecesPosition[BSqSel - 1] = BlackCastlesInCheck.includes(BSqSel) ? "O" : "q";

               if (PiecesPosition[BSqSel - 1] === "O") {
                  if (TotalBCastles > 1 && i > 56) {
                     PiecesPosition[i - 1] = "q";
                     PromoControl = 1;
                     PiecesToRemove = "EMI";
                  } else {
                     PiecesPosition[i - 1] = "c";
                  }
                  animePiece(leaving, landing, "EMI");
               } else if (PiecesPosition[BSqSel - 1] === "q") {
                  if (i > 56) {
                     PiecesPosition[i - 1] = "q";
                     PromoControl = 1;
                     PiecesToRemove = "EMI";
                  } else {
                     PiecesPosition[i - 1] = "p";
                  }
                  animePiece(leaving, landing, "E");
               }
               break;
            case "P":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "c";
               animePiece(leaving, landing, "EMI");
               break;
            case "B":
               PiecesPosition[BSqSel - 1] = BlackCastlesInCheck.includes(BSqSel) ? "O" : "q";

               if (PiecesPosition[BSqSel - 1] === "O") {
                  PiecesPosition[i - 1] = "c";
                  animePiece(leaving, landing, "EMI");

               } else if (PiecesPosition[BSqSel - 1] === "q") {
                  PiecesPosition[i - 1] = "n";
                  animePiece(leaving, landing, "E");
               }
               break;
            case "b":
               PiecesPosition[BSqSel - 1] = "q";
               PiecesPosition[i - 1] = "n";
               animePiece(leaving, landing, "E");
               break;
            case "q":
               PiecesPosition[BSqSel - 1] = "q";
               PiecesPosition[i - 1] = "c";
               animePiece(leaving, landing, "E");
               break;
         }
         break;
      case "P":
         soundPawn.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "c":
               //fall through
            case "r":
               //fall through
            case "n":
               //fall through
            case "p":
               PiecesPosition[BSqSel - 1] = "O";

               if (i < 9) {
                  PiecesPosition[i - 1] = "Q";
                  PromoControl = 1;
                  PiecesToRemove = "E";
               } else {
                  PiecesPosition[i - 1] = "P";
               }
               animePiece(leaving, landing, "E");

               break;
            case "q":
               //fall through
            case "Q":
               PiecesPosition[BSqSel - 1] = "O";
               if (i < 9) {
                  PiecesPosition[i - 1] = "Q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "C";
               }
               animePiece(leaving, landing, "E");
               break;
            case "B":
               //fall through
            case "b":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "N";
               animePiece(leaving, landing, "E");
               break;
         }
         break;
      case "p":
         soundPawn.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "C":
               //fall through
            case "R":
               //fall through
            case "N":
               //fall through
            case "P":
               PiecesPosition[BSqSel - 1] = "O";
               if (i > 56) {
                  PiecesPosition[i - 1] = "q";
                  PromoControl = 1;
                  PiecesToRemove = "E";
               } else {
                  PiecesPosition[i - 1] = "p";
               }
               animePiece(leaving, landing, "E");
               break;
            case "Q":
               //fall through
            case "q":
               PiecesPosition[BSqSel - 1] = "O";
               if (i > 56) {
                  PiecesPosition[i - 1] = "q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "c";
               }
               animePiece(leaving, landing, "E");
               break;
            case "b":
               //fall through
            case "B":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "n";
               animePiece(leaving, landing, "E");
               break;
         }
         break;
      case "Q":
         soundQueen.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "c":
               //fall through
            case "b":
               //fall through
            case "n":
               //fall through
            case "q":
               PiecesPosition[BSqSel - 1] = "R";
               PiecesPosition[i - 1] = "B";
               animePiece(leaving, landing, "M");
               break;
            case "r":
               //fall through
            case "R":
               PiecesPosition[BSqSel - 1] = "R";
               PiecesPosition[i - 1] = "Q";
               animePiece(leaving, landing, "M");
               break;
            case "p":
               //fall through
            case "P":
               PiecesPosition[BSqSel - 1] = "R";
               PiecesPosition[i - 1] = "N";
               animePiece(leaving, landing, "M");
               break;
         }
         break;
      case "q":
         soundQueen.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "C":
               //fall through
            case "B":
               //fall through
            case "N":
               //fall through
            case "Q":
               PiecesPosition[BSqSel - 1] = "r";
               PiecesPosition[i - 1] = "b";
               animePiece(leaving, landing, "M");
               break;
            case "R":
               //fall through
            case "r":
               PiecesPosition[BSqSel - 1] = "r";
               PiecesPosition[i - 1] = "q";
               animePiece(leaving, landing, "M");
               break;
            case "P":
               //fall through
            case "p":
               PiecesPosition[BSqSel - 1] = "r";
               PiecesPosition[i - 1] = "n";
               animePiece(leaving, landing, "M");
               break;
         }
         break;
      case "B":
         soundBishop.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "c":
               //fall through
            case "b":
               //fall through
            case "n":
               //fall through
            case "q":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "B";
               animePiece(leaving, landing, "M");
               break;
            case "r":
               //fall through
            case "R":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "Q";
               animePiece(leaving, landing, "M");
               break;
            case "p":
               //fall through
            case "P":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "N";
               animePiece(leaving, landing, "M");
               break;
         }
         break;
      case "b":
         soundBishop.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "C":
               //fall through
            case "B":
               //fall through
            case "N":
               //fall through
            case "Q":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "b";
               animePiece(leaving, landing, "M");
               break;
            case "R":
               //fall through
            case "r":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "q";
               animePiece(leaving, landing, "M");
               break;
            case "P":
               //fall through
            case "p":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "n";
               animePiece(leaving, landing, "M");
               break;
         }
         break;
      case "R":
         soundRook.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "p":
               //fall through
            case "c":
               //fall through
            case "q":
               //fall through
            case "r":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "R";
               animePiece(leaving, landing, "I");
               break;
            case "b":
               //fall through
            case "B":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "Q";
               animePiece(leaving, landing, "I");
               break;
            case "n":
               //fall through
            case "N":
               PiecesPosition[BSqSel - 1] = "O";
               if (i < 9) {
                  PiecesPosition[i - 1] = "Q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "C";
               }
               animePiece(leaving, landing, "I");
               break;
         }
         break;
      case "r":
         soundRook.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "P":
               //fall through
            case "C":
               //fall through
            case "Q":
               //fall through
            case "R":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "r";
               animePiece(leaving, landing, "I");
               break;
            case "B":
               //fall through
            case "b":
               PiecesPosition[BSqSel - 1] = "O";
               PiecesPosition[i - 1] = "q";
               animePiece(leaving, landing, "I");
               break;
            case "N":
               //fall through
            case "n":
               PiecesPosition[BSqSel - 1] = "O";
               if (i > 56) {
                  PiecesPosition[i - 1] = "q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "c";
               }
               animePiece(leaving, landing, "I");
               break;
         }
         break;
      case "N":
         soundKnight.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "p":
               //fall through
            case "c":
               //fall through
            case "r":
               //fall through
            case "n":
               PiecesPosition[BSqSel - 1] = "B";
               if (i < 9) {
                  PiecesPosition[i - 1] = "Q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "P";
               }
               animePiece(leaving, landing, "E");
               break;
            case "b":
               //fall through
            case "B":
               PiecesPosition[BSqSel - 1] = "B";
               PiecesPosition[i - 1] = "N";
               animePiece(leaving, landing, "E");
               break;
            case "q":
               //fall through
            case "Q":
               PiecesPosition[BSqSel - 1] = "B";
               if (i < 9) {
                  PiecesPosition[i - 1] = "Q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "C";
               }
               animePiece(leaving, landing, "E");
               break;
         }
         break;
      case "n":
         soundKnight.play();
         switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
            case "O":
               //fall through
            case "P":
               //fall through
            case "C":
               //fall through
            case "R":
               //fall through
            case "N":
               PiecesPosition[BSqSel - 1] = "b";
               if (i > 56) {
                  PiecesPosition[i - 1] = "q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "p";
               }
               animePiece(leaving, landing, "E");
               break;
            case "B":
               //fall through
            case "b":
               PiecesPosition[BSqSel - 1] = "b";
               PiecesPosition[i - 1] = "n";
               animePiece(leaving, landing, "E");
               break;
            case "Q":
               //fall through
            case "q":
               PiecesPosition[BSqSel - 1] = "b";
               if (i > 56) {
                  PiecesPosition[i - 1] = "q";
                  PromoControl = 1;
                  PiecesToRemove = "EMI";
               } else {
                  PiecesPosition[i - 1] = "c";
               }
               animePiece(leaving, landing, "E");
               break;
         }
         break;
   }
   call888(); //count how many castles on board
   RealBCheck = 0;
   RealWCheck = 0;
   castlesInCheck(); //review castles in check

   //get notation
   if (Checkered === 0) {
      Notation[Move] = squaresNotation[BSqSel - 1] + squaresNotation[i - 1];
   } else {
      Notation[Move] = squaresNotation[BSqSel - 1] + squaresNotation[i - 1] + "+";
   }

}
