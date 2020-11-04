/*jshint esversion: 6 */

function uncheckCastles() {
   let k = 0;
   while (k < 64) {

      if (PiecesPosition[k] === "C") {
         document.getElementById("extA" + extPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");
         document.getElementById("midA" + midPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");
         document.getElementById("intA" + intPiecesPosition[k]).setAttributeNS(null, "fill", "rgba(0,0,0,1.0)");
      }

      if (PiecesPosition[k] === "c") {
         document.getElementById("extA" + extPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(255,255,255,1.0)");
         document.getElementById("midA" + midPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(255,255,255,1.0)");
         document.getElementById("intA" + intPiecesPosition[k]).setAttributeNS(null, "fill", "rgba(255,255,255,1.0)");
      }

      k++;
   }
}

function markCastleInCheck(n) {
   //mark castles in check
   fillerStroker("castleCheck");
   Checkered = 1;
   document.getElementById("extA" + extPiecesPosition[n - 1]).setAttributeNS(null, "stroke", Stroker);
   document.getElementById("midA" + midPiecesPosition[n - 1]).setAttributeNS(null, "stroke", Stroker);
   document.getElementById("intA" + intPiecesPosition[n - 1]).setAttributeNS(null, "fill", Filler);
}

//set loser transp
function loserPiecesTransp() {

   let i = 0;
   while (i < 86) {

      i++;

      if (i < 65) {
         fillerStroker("black");
         if (winner === "white" && document.getElementById("extB" + i).getAttributeNS(null, "stroke") === Filler) {
            fillerStroker("blackloser");
            document.getElementById("extA" + i).setAttributeNS(null, "stroke", Stroker);
            document.getElementById("extB" + i).setAttributeNS(null, "stroke", Filler);
         }
         fillerStroker("white");
         if (winner === "black" && document.getElementById("extB" + i).getAttributeNS(null, "stroke") === Filler) {
            fillerStroker("whiteloser");
            document.getElementById("extA" + i).setAttributeNS(null, "stroke", Stroker);
            document.getElementById("extB" + i).setAttributeNS(null, "stroke", Filler);
         }
      }
      fillerStroker("black");
      if (winner === "white" && document.getElementById("midB" + i).getAttributeNS(null, "stroke") === Filler) {
         fillerStroker("blackloser");
         document.getElementById("midA" + i).setAttributeNS(null, "stroke", Stroker);
         document.getElementById("midB" + i).setAttributeNS(null, "stroke", Filler);

      }
      fillerStroker("white");
      if (winner === "black" && document.getElementById("midB" + i).getAttributeNS(null, "stroke") === Filler) {
         fillerStroker("whiteloser");
         document.getElementById("midA" + i).setAttributeNS(null, "stroke", Stroker);
         document.getElementById("midB" + i).setAttributeNS(null, "stroke", Filler);

      }
      fillerStroker("black");
      if (winner === "white" && document.getElementById("intB" + i).getAttributeNS(null, "fill") === Filler) {
         fillerStroker("blackloser");
         document.getElementById("intA" + i).setAttributeNS(null, "fill", Stroker);
         document.getElementById("intB" + i).setAttributeNS(null, "fill", Filler);
      }
      fillerStroker("white");
      if (winner === "black" && document.getElementById("intB" + i).getAttributeNS(null, "fill") === Filler) {
         fillerStroker("whiteloser");
         document.getElementById("intA" + i).setAttributeNS(null, "fill", Stroker);
         document.getElementById("intB" + i).setAttributeNS(null, "fill", Filler);
      }

      i = i === 8 ? 56 : i;
      i = i === 64 ? 70 : i;

   }

}

function blackC(n) {
   if (BlackCastlesInCheck.includes(n) === false) {
      BlackCastlesInCheck.push(n);
      markCastleInCheck(n);
      //checkmate White Won
      if (TotalBCastles === 1) {
         clickSquare(n);
         unClickSquare();
         clearMarkers();
         Again = 1;
      }

   }
}

function whiteC(n) {
   if (WhiteCastlesInCheck.includes(n) === false) {
      WhiteCastlesInCheck.push(n);
      markCastleInCheck(n);
      //checkmate Black Won
      if (TotalWCastles === 1) {
         clickSquare(n);
         unClickSquare();
         clearMarkers();
         Again = 1;
      }

   }
}

function castlesInCheck() {
   WhiteCastlesInCheck = [];
   BlackCastlesInCheck = [];

   //clear castles in check marksTo
   uncheckCastles();

   let tripleCheck = 0;
   let i = 0;
   while (i < 64) {
      i++;
      let marksOnBoardToRookN = [];
      let marksOnBoardToRookE = [];
      let marksOnBoardToRookW = [];
      let marksOnBoardToRookS = [];
      let marksOnBoardToBishopNW = [];
      let marksOnBoardToBishopNE = [];
      let marksOnBoardToBishopSW = [];
      let marksOnBoardToBishopSE = [];
      let undercx113 = null;
      let undercy113 = null;
      let xButSq = null;
      let yButSq = null;
      let xMove = 0;
      let yMove = 0;
      let marksToType = [];
      let marksOnBoard = [];
      let pP = PiecesPosition[i - 1];
      let P = 0;
      let Q = 0;
      let R = 0;
      let deathLineBlack = [];
      let deathLineWhite = [];

      //marks positioning
      undercx113 = document.getElementById("underMark113").getAttribute("cx");
      undercy113 = document.getElementById("underMark113").getAttribute("cy");
      xButSq = document.getElementById("butSquare" + i).getAttribute("x");
      yButSq = document.getElementById("butSquare" + i).getAttribute("y");

      //Marks positioner

      if (xButSq < undercx113 - 30) {
         xMove = (undercx113 - xButSq) - 30;
         underxyMover("xNegative", xMove, yMove);
      } else if (xButSq > undercx113 - 30) {
         xMove = (xButSq - undercx113) + 30;
         underxyMover("xPositive", xMove, yMove);
      }

      if (yButSq < undercy113 - 30) {
         yMove = (undercy113 - yButSq) - 30;
         underxyMover("yNegative", xMove, yMove);
      } else if (yButSq > undercy113 - 30) {
         yMove = (yButSq - undercy113) + 30;
         underxyMover("yPositive", xMove, yMove);
      }

      // select only marks by type and inside the board
      if (pP !== "O") { //check if piece I click is not empty
         if (tripleCheck === 0) { //cover Castles moves exceptions
            if (pP === "C") {
               marksToType = marksToC;
            } else if (pP === "c") {
               marksToType = marksToc;
            } else if (pP === "P") {
               marksToType = marksToP;
            } else if (pP === "p") {
               marksToType = marksTop;
            } else if (pP === "Q" || pP === "q") {
               marksToType = marksToQ;
            } else if (pP === "B" || pP === "b") {
               marksToType = marksToB;
            } else if (pP === "R" || pP === "r") {
               marksToType = marksToR;
            } else if (pP === "N" || pP === "n") {
               marksToType = marksToN;
            }
         } else if (tripleCheck === 1 || tripleCheck === 2) {
            if (pP === "C" && WhiteCastlesInCheck.includes(i)) {
               marksToType = marksToX;
            } else if (pP === "C" && TotalBCastles === 1) {
               marksToType = marksToX;
            } else if (pP === "c" && BlackCastlesInCheck.includes(i)) {
               marksToType = marksToX;
            } else if (pP === "c" && TotalWCastles === 1) {
               marksToType = marksToX;
            } else if (pP === "C") {
               marksToType = marksToC;
            } else if (pP === "c") {
               marksToType = marksToc;
            } else if (pP === "P") {
               marksToType = marksToP;
            } else if (pP === "p") {
               marksToType = marksTop;
            } else if (pP === "Q" || pP === "q") {
               marksToType = marksToQ;
            } else if (pP === "B" || pP === "b") {
               marksToType = marksToB;
            } else if (pP === "R" || pP === "r") {
               marksToType = marksToR;
            } else if (pP === "N" || pP === "n") {
               marksToType = marksToN;
            }
         }

         let p = 0;
         while (p < marksToType.length) { //check Board limit to get only marks inside board
            let markL = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cx")) - 5;
            let markR = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cx")) + 5;
            let markT = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cy")) - 5;
            let markB = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cy")) + 5;
            let sqL = parseInt(document.getElementById("BL").getAttributeNS(null, "x"));
            let sqR = parseInt(document.getElementById("BL").getAttributeNS(null, "x")) + 480;
            let sqT = parseInt(document.getElementById("BL").getAttributeNS(null, "y"));
            let sqB = parseInt(document.getElementById("BL").getAttributeNS(null, "y")) + 480;
            if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) {
               marksOnBoard.push(parseInt(marksToType[p])); //get array marks to be used
               if (pP === "B" || pP === "b" || pP === "Q" || pP === "q") {
                  if (marksToBishopNW.includes(marksToType[p])) {
                     marksOnBoardToBishopNW.push(parseInt(marksToType[p]));
                  } else if (marksToBishopNE.includes(marksToType[p])) {
                     marksOnBoardToBishopNE.push(parseInt(marksToType[p]));
                  } else if (marksToBishopSW.includes(marksToType[p])) {
                     marksOnBoardToBishopSW.push(parseInt(marksToType[p]));
                  } else if (marksToBishopSE.includes(marksToType[p])) {
                     marksOnBoardToBishopSE.push(parseInt(marksToType[p]));
                  }
               }
               if (pP === "R" || pP === "r" || pP === "Q" || pP === "q") {
                  if (marksToRookN.includes(marksToType[p])) {
                     marksOnBoardToRookN.push(parseInt(marksToType[p]));
                  } else if (marksToRookS.includes(marksToType[p])) {
                     marksOnBoardToRookS.push(parseInt(marksToType[p]));
                  } else if (marksToRookE.includes(marksToType[p])) {
                     marksOnBoardToRookE.push(parseInt(marksToType[p]));
                  } else if (marksToRookW.includes(marksToType[p])) {
                     marksOnBoardToRookW.push(parseInt(marksToType[p]));
                  }
               }
            }
            p++;
         }
         marksOnBoardToBishopNW.reverse();
         marksOnBoardToBishopNE.reverse();
         marksOnBoardToRookN.reverse();
         marksOnBoardToRookW.reverse();

         //check collisions for each valid mark against all 64 squares on board, break when find it and jump next.
         let m = 0;
         while (m < marksOnBoard.length) {
            m++;
            let n = 0;
            while (n < 64) {
               n++;
               let pPn = PiecesPosition[n - 1];
               let markL = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) - 5;
               let markR = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) + 5;
               let markT = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) - 5;
               let markB = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) + 5;
               let sqL = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "x"));
               let sqR = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "x")) + 60;
               let sqT = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "y"));
               let sqB = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "y")) + 60;
               if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) { //check collisions marks/squares
                  if (pP === "C") { //C vs c
                     if (pPn === "c" && n !== i - 16) {
                        if (n === i - 7 || n === i - 9 || WhiteCastlesInCheck.includes(i) || BlackCastlesInCheck.includes(n) || TotalWCastles === 1 || TotalBCastles === 1) { //check exceptions to special Castle's not in check diagonal moves
                           blackC(n);
                           if (DeathPathBlack.includes(i) === false) {
                              DeathPathBlack.push(i);
                           }
                        }
                     }
                  } else if (pP === "c") { //c vs C
                     if (pPn === "C" && n !== i + 16) {
                        if (n === i + 7 || n === i + 9 || WhiteCastlesInCheck.includes(n) || BlackCastlesInCheck.includes(i) || TotalWCastles === 1 || TotalBCastles === 1) { //check exceptions to special Castle's not in check diagonal moves
                           whiteC(n);
                           if (DeathPathWhite.includes(i) === false) {
                              DeathPathWhite.push(i);
                           }
                        }
                     }
                  } else if (tripleCheck === 0) {
                     if (pP === "P") { //P
                        if ((n === i - 9 && pPn === "c") || (n === i - 7 && pPn === "c")) { //P vs c
                           blackC(n);
                           if (DeathPathBlack.includes(i) === false) {
                              DeathPathBlack.push(i);
                           }
                        }
                     } else if (pP === "p") { //p
                        if ((n === i + 9 && pPn === "C") || (n === i + 7 && pPn === "C")) { //p vs C
                           whiteC(n);
                           if (DeathPathWhite.includes(i) === false) {
                              DeathPathWhite.push(i);
                           }
                        }
                     } else if (pP === "B" || pP === "b") { //B
                        if (marksOnBoardToBishopNW.includes(marksOnBoard[m - 1])) { //NW
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopNW[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r * 9);
                              Q = i - (r * 9);
                              R = i - (lineSize * 9);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "B" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "b" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToBishopNE.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopNE[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r * 7);
                              Q = i - (r * 7);
                              R = i - (lineSize * 7);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "B" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "b" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToBishopSW.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopSW[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r * 7 - 1);
                              Q = i + (r * 7);
                              R = i + (lineSize * 7);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "B" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "b" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToBishopSE.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopSE[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r * 9 - 1);
                              Q = i + (r * 9);
                              R = i + (lineSize * 9);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "B" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "b" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        }
                     } else if (pP === "R" || pP === "r") { //R
                        if (marksOnBoardToRookN.includes(marksOnBoard[m - 1])) { //NW
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookN[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r * 8);
                              Q = i - (r * 8);
                              R = i - (lineSize * 8);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "R" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "r" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToRookW.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookW[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r);
                              Q = i - (r);
                              R = i - (lineSize);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "R" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "r" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToRookE.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookE[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r - 1);
                              Q = i + (r);
                              R = i + (lineSize);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "R" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "r" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToRookS.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookS[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r * 8 - 1);
                              Q = i + (r * 8);
                              R = i + (lineSize * 8);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "R" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "r" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        }
                     } else if (pP === "Q" || pP === "q") { //Q
                        fillerStroker("disable");
                        if (marksOnBoardToBishopNW.includes(marksOnBoard[m - 1])) { //NW
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopNW[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r * 9);
                              Q = i - (r * 9);
                              R = i - (lineSize * 9);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToBishopNE.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopNE[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r * 7);
                              Q = i - (r * 7);
                              R = i - (lineSize * 7);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToBishopSW.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopSW[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r * 7 - 1);
                              Q = i + (r * 7);
                              R = i + (lineSize * 7);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToBishopSE.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToBishopSE[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r * 9 - 1);
                              Q = i + (r * 9);
                              R = i + (lineSize * 9);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        }
                        if (marksOnBoardToRookN.includes(marksOnBoard[m - 1])) { //NW
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookN[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;

                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r * 8);
                              Q = i - (r * 8);
                              R = i - (lineSize * 8);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToRookW.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookW[s] > marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i - (1 + r);
                              Q = i - (r);
                              R = i - (lineSize);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToRookE.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookE[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r - 1);
                              Q = i + (r);
                              R = i + (lineSize);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        } else if (marksOnBoardToRookS.includes(marksOnBoard[m - 1])) {
                           let lineSize = 1;
                           let s = 0;
                           while (marksOnBoardToRookS[s] < marksOnBoard[m - 1]) {
                              lineSize++;
                              s++;
                           }
                           let r = 0;
                           while (r < lineSize) {
                              r++;
                              P = i + (r * 8 - 1);
                              Q = i + (r * 8);
                              R = i + (lineSize * 8);

                              if (PiecesPosition[P] !== "O" && r < lineSize) { //following line
                                 break;
                              } else {
                                 if (pP === "Q" && deathLineBlack.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineBlack.push(Q); //death line candidate
                                 }
                                 if (pP === "q" && deathLineWhite.includes(Q) === false && PiecesPosition[P] === "O") {
                                    deathLineWhite.push(Q); //death line candidate
                                 }
                              }

                              if (r === lineSize) {
                                 if (PiecesPosition[P] === "C" || PiecesPosition[P] === "c") {
                                    if (pP === pP.toUpperCase() && PiecesPosition[P] === PiecesPosition[P].toLowerCase()) {
                                       blackC(n);

                                       //catch death line black
                                       if (BlackCastlesInCheck.includes(R) === true) {
                                          if (DeathPathBlack.includes(i) === false) {
                                             DeathPathBlack.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineBlack.length) {
                                             if (DeathPathBlack.includes(deathLineBlack[a]) === false) {
                                                DeathPathBlack.push(deathLineBlack[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathBlack);
                                       }

                                    } else if (pP === pP.toLowerCase() && PiecesPosition[P] === PiecesPosition[P].toUpperCase()) {
                                       whiteC(n);

                                       //catch death line white
                                       if (WhiteCastlesInCheck.includes(R) === true) {
                                          if (DeathPathWhite.includes(i) === false) {
                                             DeathPathWhite.push(i);
                                          }
                                          let a = 0;
                                          while (a < deathLineWhite.length) {
                                             if (DeathPathWhite.includes(deathLineWhite[a]) === false) {
                                                DeathPathWhite.push(deathLineWhite[a]);
                                             }
                                             a++;
                                          }
                                          console.log(DeathPathWhite);
                                       }

                                    }
                                 }
                              }
                           }
                        }
                     } else if (pP === "N" || pP === "n") { //K
                        if (pPn === "C" || pPn === "c") {
                           if (pP === pP.toUpperCase() && pPn === pPn.toLowerCase()) {
                              blackC(n);
                              if (DeathPathBlack.includes(i) === false) {
                                 DeathPathBlack.push(i);
                              }
                           } else if (pP === pP.toLowerCase() && pPn === pPn.toUpperCase()) {
                              whiteC(n);
                              if (DeathPathWhite.includes(i) === false) {
                                 DeathPathWhite.push(i);
                              }
                           }
                        }
                     }
                  }
                  n = 64; //breaker. dont need look for all 64 squares, just until find the square we are searching for.
               }
            }
         }
      }
      if (i === 64 && tripleCheck < 2) {
         tripleCheck++;
         i = 0;
      }
   }
}
