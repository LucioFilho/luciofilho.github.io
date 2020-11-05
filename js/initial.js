/*jshint esversion: 6 */

//link to cast svg
const SvgNS = "http://www.w3.org/2000/svg";

//sounds
function Sound(src) {
   this.sound = document.createElement("audio");
   this.sound.src = src;
   this.sound.setAttribute("preload", "auto");
   this.sound.setAttribute("controls", "none");
   this.sound.setAttribute("auto-loop", "false");
   this.sound.style.display = "none";
   this.play = function() {
      this.sound.play();
   };
   this.stop = function() {
      this.sound.pause();
   };
}

let soundCastle = new Sound("sounds/castle.mp3");
let soundRook = new Sound("sounds/rook.mp3");
let soundBishop = new Sound("sounds/bishop.mp3");
let soundQueen = new Sound("sounds/queen.mp3");
let soundPawn = new Sound("sounds/pawn.mp3");
let soundKnight = new Sound("sounds/knight.mp3");
let soundRewind = new Sound("sounds/rewind.mp3");

//tooltips show/hide
function showTooltip(text) {
   let tooltip = document.getElementById("tooltip");
   tooltip.innerHTML = text;
   tooltip.style.display = "inline-block";
   tooltip.style.left = event.pageX + 10 + "px";
   tooltip.style.top = event.pageY + 10 + "px";
}

function hideTooltip() {
   let tooltip = document.getElementById("tooltip");
   tooltip.style.display = "none";
}

//get board on html
const PlayerUP = document.getElementById("PlayerUP");
const Board = document.getElementById("Board"); //game board where match happens
const PlayerDown = document.getElementById("PlayerDown");

const PlayerUpRight = document.getElementById("PlayerUPRight");
const GameDisplay = document.getElementById("GameDisplay");
const PlayerDownRight = document.getElementById("PlayerDownRight");

//vars to manage loops
let Again = 0;
let ArrowColor = "";
let BlackCastlesInCheck = [];
let BlackLandingsInCheck = [];
let BSqSel = null;
let Checkered = 0;
let Cli = 0;
let Clo = 0;
let ColorBlack = "rgba(50,50,100,1.0)";
let ColorOh = "rgba(50,100,50,1.0)";
let ColorWhite = "rgba(130,80,0,1.0)";
let countCheckmate = 0;
let DeathPathBlack = [];
let DeathPathWhite = [];
let DeathPathsBlack = [];
let DeathPathsWhite = [];
let DrawCanvas = null;
let EvenOdd = null;
let Filler = "rgba(200,200,200,0.5)";
let FillStyle = null;
let gameLog = [];
let gameNotation = null;
let gameover = 0;
let I = 0;
let J = 0;
let LandingsAgain = 0;
let Letters = [];
let LockFlipBoard = 0;
let M = 0;
let MarkerControl = 0;
let MarkerCount = 0;
let MatchStatus = 0;
let MMoveLanding = 0;
let MMoveLeaving = 0;
let MMovesLanding = [];
let MMovesLeaving = [];
let Numbers = [];
let PieceFill1 = null;
let PieceFill2 = null;
let PieceID1 = null;
let PieceID2 = null;
let PieceRadius1 = null;
let PieceRadius2 = null;
let PiecesToRemove = null;
let PieceStroke1 = null;
let PieceStroke2 = null;
let PieceStrokeWidth1 = null;
let PieceStrokeWidth2 = null;
let PPos = null;
let PPReversed = [];
let PromoControl = 0;
let PromoID = 71;
let R = 0;
let RowEvenOdd = null;
let SelectPieceStatus = 0;
let ShortPiecePosition = [];
let Square_x = null;
let Square_y = null;
let SquareColor = null;
let SquaresToGo = null;
let Stroker = "rgba(0,0,0,0.3)";
let StrokeStyle = null;
let Timer = 0;
let Timer2 = 0;
let TotalBBishops = 8;
let TotalBCastles = 8;
let TotalBRooks = 8;
let TotalWBishops = 8;
let TotalWCastles = 8;
let TotalWRooks = 8;
let Turn = "W";
let VerseReverse = "wb";
let winner = null;
let WhiteCastlesInCheck = [];
let WhiteLandingsInCheck = [];
let XLeaving = null;
let XMark = 0;
let YLeaving = null;
let YMark = 0;

//mark numbers to manage show/hide marks for each kind of piece
const marksToO = [];
const marksToP = [97, 98, 99];
const marksTop = [127, 128, 129];

const marksToC = [83, 97, 98, 99];
const marksToc = [127, 128, 129, 143];
const marksToX = [97, 98, 99, 112, 114, 127, 128, 129];

const marksToBishopNW = [97, 81, 65, 49, 33, 17, 1];
const marksToBishopNE = [99, 85, 71, 57, 43, 29, 15];
const marksToBishopSW = [127, 141, 155, 169, 183, 197, 211];
const marksToBishopSE = [129, 145, 161, 177, 193, 209, 225];

const marksToRookN = [8, 23, 38, 53, 68, 83, 98];
const marksToRookW = [106, 107, 108, 109, 110, 111, 112];
const marksToRookE = [114, 115, 116, 117, 118, 119, 120];
const marksToRookS = [128, 143, 158, 173, 188, 203, 218];

const marksToB = [1, 15, 17, 29, 33, 43, 49, 57, 65, 71, 81, 85, 97, 99, 127, 129, 141, 145, 155, 161, 169, 177, 183, 193, 197, 209, 211, 225];

const marksToQ = [1, 8, 15, 17, 23, 29, 33, 38, 43, 49, 53, 57, 65, 68, 71, 81, 83, 85, 97, 98, 99, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120, 127, 128, 129, 141, 143, 145, 155, 158, 161, 169, 173, 177, 183, 188, 193, 197, 203, 209, 211, 218, 225];

const marksToN = [82, 84, 96, 100, 126, 130, 142, 144];

const marksToR = [8, 23, 38, 53, 68, 83, 98, 128, 143, 158, 173, 188, 203, 218, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120];

//board notation
let squaresNotation = ["8a", "8b", "8c", "8d", "8e", "8f", "8g", "8h", "7a", "7b", "7c", "7d", "7e", "7f", "7g", "7h", "6a", "6b", "6c", "6d", "6e", "6f", "6g", "6h", "5a", "5b", "5c", "5d", "5e", "5f", "5g", "5h", "4a", "4b", "4c", "4d", "4e", "4f", "4g", "4h", "3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h", "2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h", "1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h"];
let Notation = ["0"];

//control pieces position by id
let extPiecesPosition = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64];
let midPiecesPosition = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64];
let intPiecesPosition = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64];

let extMoves = [];
let midMoves = [];
let intMoves = [];

extMoves[0] = Array.from(extPiecesPosition);
midMoves[0] = Array.from(midPiecesPosition);
intMoves[0] = Array.from(intPiecesPosition);

//take initial pieces position
const InitialNotation = "8c48O8C"; //compact code to initial position on board

//split the compacted code to work with its Letters and Numbers
const ReadInitialNotation = InitialNotation.split("");

//here we insert decoded code
let InitialPiecesPosition = "";

//open code to place pieces on board
while (R < ReadInitialNotation.length) {
   let n = 0;
   let l = 0;
   let c = 0;
   let p = 0;
   if (isNaN(ReadInitialNotation[R])) {
      n = 1;
      InitialPiecesPosition = InitialPiecesPosition.concat(ReadInitialNotation[R]);
   } else if (isNaN(ReadInitialNotation[R + 1])) {
      l = ReadInitialNotation[R + 1];
      n = l.repeat(ReadInitialNotation[R]);
      InitialPiecesPosition = InitialPiecesPosition.concat(n);
      R++;
   } else {
      l = ReadInitialNotation[R];
      n = l.concat(ReadInitialNotation[R + 1]);
      c = ReadInitialNotation[R + 2];
      p = c.repeat(n);
      InitialPiecesPosition = InitialPiecesPosition.concat(p);
      R++;
      R++;
   }
   R++;
}

//piecesPosition keep open code to manage local moves
let PiecesPosition = InitialPiecesPosition.split(""); //get deciphered code to work with Letters and Numbers
let letPiecesPosition = []; //check if piece protect last castle

//ghost array to test last castle move in check
let GhostPiecesPosition = [];

//compact code to send it
let TurnNotation = [];
let TurnsPiecesPosition = [];
TurnsPiecesPosition[0] = Array.from(PiecesPosition);
let Move = 0;
let MoveWatch = 0;

//compact code to send it to db and opponent player
function shortCode() {

   let i = 0;
   ShortPiecePosition = Array.from(PiecesPosition);

   let r = 0;
   let shortIt = "";
   let turnPush = "";
   let evenOdd;

   while (r < 64) {
      let c = 1;
      if (ShortPiecePosition[r] === ShortPiecePosition[r + c]) {
         while (ShortPiecePosition[r] === ShortPiecePosition[r + c]) {
            c++;
         }
         shortIt = c + ShortPiecePosition[r];
      } else {
         shortIt = ShortPiecePosition[r];
      }
      r += c;
      turnPush += shortIt;
   }

   TurnNotation.push(turnPush);
   evenOdd = Move % 2 === 0 ? "b" : "w";

   //PGN to be saved
   let noteMove = Move;
   let notaMate = "";
   if (Move < 10) {
      noteMove = " " + Move;
   }
   if (TotalWCastles === 0 || TotalBCastles === 0) {
      notaMate = "++";
   }
   console.log(noteMove + " " + evenOdd + " | " + Notation[Move] + notaMate + " | Cc " + TotalWCastles + "·" + TotalBCastles + " | BR " + TotalWBishops + "·" + TotalWRooks + " | br " + TotalBBishops + "·" + TotalBRooks);
   gameLog.push(noteMove + " " + evenOdd + " | " + Notation[Move] + notaMate + " | Cc " + TotalWCastles + "·" + TotalBCastles + " | BR " + TotalWBishops + "·" + TotalWRooks + " | br " + TotalBBishops + "·" + TotalBRooks + " | " + TurnNotation[Move]);


   //Pieces Position controller
   extMoves[Move] = Array.from(extPiecesPosition);
   midMoves[Move] = Array.from(midPiecesPosition);
   intMoves[Move] = Array.from(intPiecesPosition);
   TurnsPiecesPosition[Move] = Array.from(PiecesPosition);

   Move++;
   MoveWatch = Move - 1;

   //refresh display buttons
   if (Move > 1) {
      fillerStroker("greyColor");
      document.getElementById("iconStepBack").setAttributeNS(null, "fill", Filler);
      document.getElementById("iconMoveToStart").setAttributeNS(null, "fill", Filler);
   }

}
shortCode();

//row by row black and white and square positions controller
function squarer(I) {

   if (I < 9) {
      RowEvenOdd = 1;
      Square_x = (I - 1) * 60;
      Square_y = 0;
   } else if (I < 17) {
      RowEvenOdd = 0;
      Square_x = (I - 9) * 60;
      Square_y = 60;
   } else if (I < 25) {
      RowEvenOdd = 1;
      Square_x = (I - 17) * 60;
      Square_y = 120;
   } else if (I < 33) {
      RowEvenOdd = 0;
      Square_x = (I - 25) * 60;
      Square_y = 180;
   } else if (I < 41) {
      RowEvenOdd = 1;
      Square_x = (I - 33) * 60;
      Square_y = 240;
   } else if (I < 49) {
      RowEvenOdd = 0;
      Square_x = (I - 41) * 60;
      Square_y = 300;
   } else if (I < 57) {
      RowEvenOdd = 1;
      Square_x = (I - 49) * 60;
      Square_y = 360;
   } else {
      RowEvenOdd = 0;
      Square_x = (I - 57) * 60;
      Square_y = 420;
   }
}

//reverse control to flip pieces on board game.
function reversePieces() {
   VerseReverse = VerseReverse === "wb" ? "bw" : "wb";
   if (VerseReverse === "wb") {
      fillerStroker("greyColor");
      document.getElementById("arcIconTop").setAttributeNS(null, "stroke", Stroker);
      fillerStroker("lightWhiteColor");
      document.getElementById("arcIconBot").setAttributeNS(null, "stroke", Stroker);
   } else {
      fillerStroker("greyColor");
      document.getElementById("arcIconBot").setAttributeNS(null, "stroke", Stroker);
      fillerStroker("lightWhiteColor");
      document.getElementById("arcIconTop").setAttributeNS(null, "stroke", Stroker);
   }

   unClickSquare();
   clearMarkers();

   //to control moved pieces marks reverse
   let mMLeaving1x = 0;
   let mMLeaving1y = 0;
   let mMLanding2x = 0;
   let mMLanding2y = 0;

   let pX = 0;
   let pY = 0;
   let i = 0;

   //pieces reposition to flip board
   while (i < 64) {

      //get squares positions from last until first square

      pX = parseInt(document.getElementById("butSquare" + (64 - i)).getAttributeNS(null, "x")) + 30;
      pY = parseInt(document.getElementById("butSquare" + (64 - i)).getAttributeNS(null, "y")) + 30;


      //find and reposition all pieces to flip board
      if (extMoves[MoveWatch][i] !== 0) {
         document.getElementById("extA" + extMoves[MoveWatch][i]).setAttributeNS(null, "cx", pX);
         document.getElementById("extA" + extMoves[MoveWatch][i]).setAttributeNS(null, "cy", pY);
         document.getElementById("extB" + extMoves[MoveWatch][i]).setAttributeNS(null, "cx", pX);
         document.getElementById("extB" + extMoves[MoveWatch][i]).setAttributeNS(null, "cy", pY);
      }
      if (midMoves[MoveWatch][i] !== 0) {
         document.getElementById("midA" + midMoves[MoveWatch][i]).setAttributeNS(null, "cx", pX);
         document.getElementById("midA" + midMoves[MoveWatch][i]).setAttributeNS(null, "cy", pY);
         document.getElementById("midB" + midMoves[MoveWatch][i]).setAttributeNS(null, "cx", pX);
         document.getElementById("midB" + midMoves[MoveWatch][i]).setAttributeNS(null, "cy", pY);
      }
      if (intMoves[MoveWatch][i] !== 0) {
         document.getElementById("intA" + intMoves[MoveWatch][i]).setAttributeNS(null, "cx", pX);
         document.getElementById("intA" + intMoves[MoveWatch][i]).setAttributeNS(null, "cy", pY);
         document.getElementById("intB" + intMoves[MoveWatch][i]).setAttributeNS(null, "cx", pX);
         document.getElementById("intB" + intMoves[MoveWatch][i]).setAttributeNS(null, "cy", pY);
      }

      i++;
   }

   //flip buttons to organize board square buttons
   I = 0;
   while (I < 64) {
      I++;

      squarer(I);

      if (VerseReverse === "bw") {
         document.getElementById("butSquare" + (65 - I)).setAttributeNS(null, "x", Square_x);
         document.getElementById("butSquare" + (65 - I)).setAttributeNS(null, "y", Square_y);
      } else {
         document.getElementById("butSquare" + I).setAttributeNS(null, "x", Square_x);
         document.getElementById("butSquare" + I).setAttributeNS(null, "y", Square_y);
      }
   }

   //wb control marks used to show where pieces move
   if (MMoveLeaving !== 0) {
      if (MoveWatch > 0) {
         mMLeaving1x = parseInt(document.getElementById("butSquare" + MMovesLeaving[MoveWatch - 1]).getAttributeNS(null, "x"));
         mMLeaving1y = parseInt(document.getElementById("butSquare" + MMovesLeaving[MoveWatch - 1]).getAttributeNS(null, "y"));
         mMLanding2x = parseInt(document.getElementById("butSquare" + MMovesLanding[MoveWatch - 1]).getAttributeNS(null, "x"));
         mMLanding2y = parseInt(document.getElementById("butSquare" + MMovesLanding[MoveWatch - 1]).getAttributeNS(null, "y"));

         document.getElementById("mMove1").setAttributeNS(null, "x", mMLeaving1x);
         document.getElementById("mMove1").setAttributeNS(null, "y", mMLeaving1y);
         document.getElementById("mMove2").setAttributeNS(null, "x", mMLanding2x);
         document.getElementById("mMove2").setAttributeNS(null, "y", mMLanding2y);

      }

   }

   //board Letters and Numbers
   if (VerseReverse === "wb") {

      Letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
      Numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

   } else {

      Letters = ["h", "g", "f", "e", "d", "c", "b", "a"];
      Numbers = ["8", "7", "6", "5", "4", "3", "2", "1"];

   }

   J = 0;
   while (J < 8) {
      //flip board Letters and Numbers
      document.getElementById("letter_" + J).textContent = Letters[J];
      document.getElementById("number_" + J).textContent = Numbers[J];

      J++;
   }

   //reverse hidden marks
   let n = 225;
   let marksX = [];
   let marksY = [];
   let underMarksX = [];
   let underMarksY = [];

   while (n > 0) {
      //get positions to perform swaps
      marksX.push(parseInt(document.getElementById("Mark" + n).getAttributeNS(null, "cx")));
      marksY.push(parseInt(document.getElementById("Mark" + n).getAttributeNS(null, "cy")));
      underMarksX.push(parseInt(document.getElementById("underMark" + n).getAttributeNS(null, "cx")));
      underMarksY.push(parseInt(document.getElementById("underMark" + n).getAttributeNS(null, "cy")));

      n--;
   }
   let m = 0;
   while (m < 225) {

      document.getElementById("Mark" + (m + 1)).setAttributeNS(null, "cx", marksX[m]);
      document.getElementById("Mark" + (m + 1)).setAttributeNS(null, "cy", marksY[m]);
      document.getElementById("underMark" + (m + 1)).setAttributeNS(null, "cx", underMarksX[m]);
      document.getElementById("underMark" + (m + 1)).setAttributeNS(null, "cy", underMarksY[m]);

      m++;
   }

   TotalWCastles = 0;
   TotalBCastles = 0;
   TotalWBishops = 0;
   TotalBBishops = 0;
   TotalWRooks = 0;
   TotalBRooks = 0;
   PiecesPosition.forEach(count888);

}

//board limit to check marks inside board area. BL
function boardLimits() {
   const shapeBoardLimits = document.createElementNS(SvgNS, "rect");
   shapeBoardLimits.setAttributeNS(null, "id", "BL");
   shapeBoardLimits.setAttributeNS(null, "width", 480);
   shapeBoardLimits.setAttributeNS(null, "height", 480);
   shapeBoardLimits.setAttributeNS(null, "x", 0);
   shapeBoardLimits.setAttributeNS(null, "y", 0);
   shapeBoardLimits.setAttributeNS(null, "fill", "transparent");
   shapeBoardLimits.setAttributeNS(null, "stroke-width", 0);
   Board.appendChild(shapeBoardLimits);
}
boardLimits();

//draw board squares
function drawSquares() {
   let actualSquareColor;
   if (SquareColor === "white") {
      fillerStroker("whiteSquare");
      actualSquareColor = Filler;
   } else {
      fillerStroker("blackSquare");
      actualSquareColor = Filler;
   }
   const shape1 = document.createElementNS(SvgNS, "rect");
   shape1.setAttributeNS(null, "id", DrawCanvas);
   shape1.setAttributeNS(null, "width", 60);
   shape1.setAttributeNS(null, "height", 60);
   shape1.setAttributeNS(null, "x", Square_x);
   shape1.setAttributeNS(null, "y", Square_y);
   shape1.setAttributeNS(null, "fill", actualSquareColor);
   shape1.setAttributeNS(null, "stroke-width", 0);
   shape1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   Board.appendChild(shape1);
}

//draw marks moves
function drawMarkMoves() {

   const shapeMoves1 = document.createElementNS(SvgNS, "rect");
   shapeMoves1.setAttributeNS(null, "id", "mMove1");
   shapeMoves1.setAttributeNS(null, "width", 60);
   shapeMoves1.setAttributeNS(null, "height", 60);
   shapeMoves1.setAttributeNS(null, "x", 600);
   shapeMoves1.setAttributeNS(null, "y", 600);
   shapeMoves1.setAttributeNS(null, "fill", "rgba(255,200,0,0.8)");
   shapeMoves1.setAttributeNS(null, "stroke-width", 0);
   shapeMoves1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   Board.appendChild(shapeMoves1);

   const shapeMoves2 = document.createElementNS(SvgNS, "rect");
   shapeMoves2.setAttributeNS(null, "id", "mMove2");
   shapeMoves2.setAttributeNS(null, "width", 60);
   shapeMoves2.setAttributeNS(null, "height", 60);
   shapeMoves2.setAttributeNS(null, "x", 600);
   shapeMoves2.setAttributeNS(null, "y", 600);
   shapeMoves2.setAttributeNS(null, "fill", "rgba(255,200,0,0.8)");
   shapeMoves2.setAttributeNS(null, "stroke-width", 0);
   shapeMoves2.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   Board.appendChild(shapeMoves2);
}

//lettering to mark squares with numbers and letters
function drawBoardLetters() {

   let i = 0;
   let Letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
   let Numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

   while (i < 8) {
      const lettering = document.createElementNS(SvgNS, "text");
      lettering.setAttributeNS(null, "id", "letter_" + i);
      lettering.setAttribute("x", (60 * (i + 1)) - 58);
      lettering.setAttribute("y", 478);
      lettering.setAttribute("fill", "rgba(0,0,0,0.4)");
      lettering.setAttribute("font-family", "Helvetica");
      lettering.setAttribute("font-weight", "bold");
      lettering.setAttribute("font-size", 13);
      lettering.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");
      lettering.textContent = Letters[i];
      Board.appendChild(lettering);

      const numbering = document.createElementNS(SvgNS, "text");
      numbering.setAttributeNS(null, "id", "number_" + i);
      numbering.setAttribute("x", 472);
      numbering.setAttribute("y", (60 * (8 - i)) - 49);
      numbering.setAttribute("fill", "rgba(0,0,0,0.4)");
      numbering.setAttribute("font-family", "Helvetica");
      numbering.setAttribute("font-weight", "bold");
      numbering.setAttribute("font-size", 13);
      numbering.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");
      numbering.textContent = Numbers[i];
      Board.appendChild(numbering);

      i++;
   }
}

//marks and undermarks control to check castles in check
function underxyMover(moverVal, xMove, yMove) {
   let m = 0;
   while (m < 225) {
      m++;
      if (moverVal === "xNegative") {
         let actualX = parseInt(document.getElementById("underMark" + m).getAttribute("cx")) - xMove;
         document.getElementById("underMark" + m).setAttributeNS(null, "cx", actualX);
      }
      if (moverVal === "yNegative") {
         let actualY = parseInt(document.getElementById("underMark" + m).getAttribute("cy")) - yMove;
         document.getElementById("underMark" + m).setAttributeNS(null, "cy", actualY);
      }
      if (moverVal === "xPositive") {
         let actualX = parseInt(document.getElementById("underMark" + m).getAttribute("cx")) + xMove;
         document.getElementById("underMark" + m).setAttributeNS(null, "cx", actualX);
      }
      if (moverVal === "yPositive") {
         let actualY = parseInt(document.getElementById("underMark" + m).getAttribute("cy")) + yMove;
         document.getElementById("underMark" + m).setAttributeNS(null, "cy", actualY);
      }
   }
}

//drawPieces
function drawPieces() {
   const shape2 = document.createElementNS(SvgNS, "circle");
   shape2.setAttributeNS(null, "id", PieceID1);
   shape2.setAttributeNS(null, "cx", Square_x + 30);
   shape2.setAttributeNS(null, "cy", Square_y + 30);
   shape2.setAttributeNS(null, "r", PieceRadius1);
   shape2.setAttributeNS(null, "fill", PieceFill1);
   shape2.setAttributeNS(null, "stroke", PieceStroke1);
   shape2.setAttributeNS(null, "stroke-width", PieceStrokeWidth1);
   shape2.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   Board.appendChild(shape2);
   const shape3 = document.createElementNS(SvgNS, "circle");
   shape3.setAttributeNS(null, "id", PieceID2);
   shape3.setAttributeNS(null, "cx", Square_x + 30);
   shape3.setAttributeNS(null, "cy", Square_y + 30);
   shape3.setAttributeNS(null, "r", PieceRadius2);
   shape3.setAttributeNS(null, "fill", PieceFill2);
   shape3.setAttributeNS(null, "stroke", PieceStroke2);
   shape3.setAttributeNS(null, "stroke-width", PieceStrokeWidth2);
   shape3.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   Board.appendChild(shape3);
}

//set attributes to draw pieces
function setPieces() {
   PPos = PiecesPosition[I - 1];
   if (PPos === PPos.toLowerCase()) {
      FillStyle = "rgba(0,0,0,1.0)";
      StrokeStyle = "rgba(255,255,255,1.0)";
   } else {
      FillStyle = "rgba(255,255,255,1.0)";
      StrokeStyle = "rgba(0,0,0,1.0)";
   }
   if (PPos === "q" || PPos === "c" || PPos === "r" || PPos === "Q" || PPos === "C" || PPos === "R") {
      PieceID1 = "intA" + I;
      PieceID2 = "intB" + I;
      PieceRadius1 = 15;
      PieceRadius2 = 14;
      PieceFill1 = StrokeStyle;
      PieceFill2 = FillStyle;
      PieceStroke1 = "transparent";
      PieceStroke2 = "transparent";
      PieceStrokeWidth1 = 0;
      PieceStrokeWidth2 = 0;
      drawPieces();
   }

   if (PPos === "q" || PPos === "b" || PPos === "c" || PPos === "n" || PPos === "Q" || PPos === "B" || PPos === "C" || PPos === "N") {
      PieceID1 = "midA" + I;
      PieceID2 = "midB" + I;
      PieceRadius1 = 18;
      PieceRadius2 = 18;
      PieceFill1 = "transparent";
      PieceFill2 = "transparent";
      PieceStroke1 = StrokeStyle;
      PieceStroke2 = FillStyle;
      PieceStrokeWidth1 = 8;
      PieceStrokeWidth2 = 6;
      drawPieces();
   }

   if (PPos === "c" || PPos === "p" || PPos === "n" || PPos === "C" || PPos === "P" || PPos === "N") {
      PieceID1 = "extA" + I;
      PieceID2 = "extB" + I;
      PieceRadius1 = 25;
      PieceRadius2 = 25;
      PieceFill1 = "transparent";
      PieceFill2 = "transparent";
      PieceStroke1 = StrokeStyle;
      PieceStroke2 = FillStyle;
      PieceStrokeWidth1 = 8;
      PieceStrokeWidth2 = 6;
      drawPieces();
   }
}

function promoPieces() {
   let p = 70;
   let x = 0;
   let idType = "int";

   let pRadius1 = 15;
   let pRadius2 = 14;

   let pFill1 = "rgba(0,0,0,1.0)";
   let pFill2 = "rgba(255,255,255,1.0)";

   let pStroke1 = "transparent";
   let pStroke2 = "transparent";

   let pStrokeWidth1 = 0;
   let pStrokeWidth2 = 0;

   //generate circles to compose board pieces
   while (p < 86 && x < 2) {
      p++;
      const shapePromo1 = document.createElementNS(SvgNS, "circle");
      shapePromo1.setAttributeNS(null, "id", idType + "A" + p);
      shapePromo1.setAttributeNS(null, "cx", 600);
      shapePromo1.setAttributeNS(null, "cy", 600);
      shapePromo1.setAttributeNS(null, "r", pRadius1);
      shapePromo1.setAttributeNS(null, "fill", pFill1);
      shapePromo1.setAttributeNS(null, "stroke", pStroke1);
      shapePromo1.setAttributeNS(null, "stroke-width", pStrokeWidth1);
      shapePromo1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
      Board.appendChild(shapePromo1);

      const shapePromo2 = document.createElementNS(SvgNS, "circle");
      shapePromo2.setAttributeNS(null, "id", idType + "B" + p);
      shapePromo2.setAttributeNS(null, "cx", 600);
      shapePromo2.setAttributeNS(null, "cy", 600);
      shapePromo2.setAttributeNS(null, "r", pRadius2);
      shapePromo2.setAttributeNS(null, "fill", pFill2);
      shapePromo2.setAttributeNS(null, "stroke", pStroke2);
      shapePromo2.setAttributeNS(null, "stroke-width", pStrokeWidth2);
      shapePromo2.setAttributeNS(null, "shape-rendering", "geometricPrecision");
      Board.appendChild(shapePromo2);

      if (p === 86) {
         idType = "mid";
         p = 70;
         x++;
      }

      if (p === 78 && idType === "int") {
         pFill1 = "rgba(255,255,255,1.0)";
         pFill2 = "rgba(0,0,0,1.0)";
      }

      if (p === 70 && idType === "mid") {
         pRadius1 = 18;
         pRadius2 = 18;

         pFill1 = "transparent";
         pFill2 = "transparent";

         pStroke1 = "rgba(0,0,0,1.0)";
         pStroke2 = "rgba(255,255,255,1.0)";

         pStrokeWidth1 = 8;
         pStrokeWidth2 = 6;
      }

      if (p === 78 && idType === "mid") {
         pRadius1 = 18;
         pRadius2 = 18;

         pFill1 = "transparent";
         pFill2 = "transparent";

         pStroke1 = "rgba(255,255,255,1.0)";
         pStroke2 = "rgba(0,0,0,1.0)";

         pStrokeWidth1 = 8;
         pStrokeWidth2 = 6;
      }
   }
}

//draw marks and undermarks
function drawMarks() {
   const shapeMarks = document.createElementNS(SvgNS, "circle");
   shapeMarks.setAttributeNS(null, "id", "Mark" + M);
   shapeMarks.setAttributeNS(null, "cx", XMark + 30);
   shapeMarks.setAttributeNS(null, "cy", YMark + 30);
   shapeMarks.setAttributeNS(null, "r", 10);
   shapeMarks.setAttributeNS(null, "fill", "rgba(0,0,0,0)");
   shapeMarks.setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
   shapeMarks.setAttributeNS(null, "stroke-width", 1);
   shapeMarks.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   Board.appendChild(shapeMarks);

   const shapeUnderMarks = document.createElementNS(SvgNS, "circle");
   shapeUnderMarks.setAttributeNS(null, "id", "underMark" + M);
   shapeUnderMarks.setAttributeNS(null, "cx", XMark + 30);
   shapeUnderMarks.setAttributeNS(null, "cy", YMark + 30);
   shapeUnderMarks.setAttributeNS(null, "r", 10);
   shapeUnderMarks.setAttributeNS(null, "fill", "rgba(0,0,0,0)");
   shapeUnderMarks.setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
   shapeUnderMarks.setAttributeNS(null, "stroke-width", 1);
   shapeUnderMarks.setAttributeNS(null, "shape-rendering", "optimizeSpeed");
   Board.appendChild(shapeUnderMarks);
}

//set values x y to draw marks inside mc
function callDrawMarks() {
   //draw marks
   while (M < 225) {
      M++;
      if (M < 16) {
         XMark = (M - 1) * 60;
         YMark = 0;
      } else if (M < 31) {
         XMark = (M - 16) * 60;
         YMark = 60;
      } else if (M < 46) {
         XMark = (M - 31) * 60;
         YMark = 120;
      } else if (M < 61) {
         XMark = (M - 46) * 60;
         YMark = 180;
      } else if (M < 76) {
         XMark = (M - 61) * 60;
         YMark = 240;
      } else if (M < 91) {
         XMark = (M - 76) * 60;
         YMark = 300;
      } else if (M < 106) {
         XMark = (M - 91) * 60;
         YMark = 360;
      } else if (M < 121) {
         XMark = (M - 106) * 60;
         YMark = 420;
      } else if (M < 136) {
         XMark = (M - 121) * 60;
         YMark = 480;
      } else if (M < 151) {
         XMark = (M - 136) * 60;
         YMark = 540;
      } else if (M < 166) {
         XMark = (M - 151) * 60;
         YMark = 600;
      } else if (M < 181) {
         XMark = (M - 166) * 60;
         YMark = 660;
      } else if (M < 196) {
         XMark = (M - 181) * 60;
         YMark = 720;
      } else if (M < 211) {
         XMark = (M - 196) * 60;
         YMark = 780;
      } else if (M < 226) {
         XMark = (M - 211) * 60;
         YMark = 840;
      }
      drawMarks();
   }
}

//clear marks
function unClickSquare() {
   let m = 0;
   SquaresToGo = [];
   while (m < 225) {
      m++;
      document.getElementById("Mark" + m).setAttributeNS(null, "fill", "rgba(0,0,0,0)");
      document.getElementById("Mark" + m).setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
      if (m < 65) {
         document.getElementById("butSquare" + m).setAttributeNS(null, "fill", "rgba(0,0,0,0)");
      }
   }
}

///draw arrows to teach the game
function drawMarker(i) {
   MarkerControl++;

   let xy = 0;

   if (MarkerControl === 1) {

      inti = i;
      XLeaving = parseInt(document.getElementById("butSquare" + i).getAttribute("x")) + 30;
      YLeaving = parseInt(document.getElementById("butSquare" + i).getAttribute("y")) + 30;

      if (PiecesPosition[i - 1] === "O") {
         ArrowColor = ColorOh;
      } else if (PiecesPosition[i - 1] === PiecesPosition[i - 1].toUpperCase()) {
         ArrowColor = ColorWhite;
      } else {
         ArrowColor = ColorBlack;
      }
   }

   if (MarkerControl === 2) {

      if (inti !== i) {
         let xLanding = parseInt(document.getElementById("butSquare" + i).getAttribute("x")) + 30;
         let yLanding = parseInt(document.getElementById("butSquare" + i).getAttribute("y")) + 30;

         xy = XLeaving + "," + YLeaving + " " + xLanding + "," + yLanding;

         const marker = document.createElementNS(SvgNS, "marker");
         marker.setAttributeNS(null, "id", "marker" + MarkerCount);
         marker.setAttributeNS(null, "fill", ArrowColor);
         marker.setAttributeNS(null, 'refX', '1');
         marker.setAttributeNS(null, 'refY', '2');
         marker.setAttribute('markerUnits', 'strokeWidth');
         marker.setAttribute('markerWidth', '10');
         marker.setAttribute('markerHeight', '10');
         marker.setAttributeNS(null, "orient", "auto-start-reverse");
         let path = document.createElementNS(SvgNS, "path");
         path.setAttributeNS(null, "d", "m 0 0 L 2 2 L 0 4 z");
         marker.appendChild(path);
         Board.appendChild(marker);

         let polyline = document.createElementNS(SvgNS, "polyline");
         polyline.setAttributeNS(null, "id", "polyline" + MarkerCount);
         polyline.setAttributeNS(null, 'points', xy);
         polyline.setAttributeNS(null, "fill", "none");
         polyline.setAttributeNS(null, "stroke-linecap", "round");
         polyline.setAttributeNS(null, "stroke-width", 7);
         polyline.setAttributeNS(null, "stroke", ArrowColor);
         polyline.setAttributeNS(null, 'marker-end', "url(#marker" + MarkerCount + ")");

         Board.appendChild(polyline);

         MarkerCount++;
         MarkerControl = 0;
      } else {
         clearMarkers();
      }
   }

}

//clear draw arrows to teach the game
function clearMarkers() {
   if (MarkerCount > 0) {
      let i = 0;
      while (i < MarkerCount) {
         document.getElementById("polyline" + i).remove();
         document.getElementById("marker" + i).remove();

         i++;
      }
   }
   MarkerControl = 0;
   MarkerCount = 0;
}

function callMovingPiece(i) {

   if (gameover === 0 && TotalWCastles > 0 && TotalBCastles > 0) {

      if (Turn === Turn.toUpperCase()) {

         if (TotalWCastles > 2) {
            movingPiece(i);
            console.log("a");
         } else if (TotalWCastles === 2) {
            if (WhiteCastlesInCheck.length === 1) {
               if (PiecesPosition[BSqSel - 1] === "C") {
                  if (WhiteCastlesInCheck.includes(BSqSel) === true) {
                     movingPiece(i);
                     console.log("b");
                  } else if (DeathPathWhite.includes(i) === true) {
                     movingPiece(i);
                     console.log("c");
                  }
               } else {
                  movingPiece(i);
                  console.log("d");
               }
            } else {
               movingPiece(i);
               console.log("e");
            }
         } else if (TotalWCastles === 1) {
            if (WhiteCastlesInCheck.length === 1) {
               if (PiecesPosition[BSqSel - 1] === "C") {
                  movingPiece(i);
                  console.log("f");
               } else if (DeathPathWhite.includes(i) === true) {
                  movingPiece(i);
                  console.log("g");
               } else if ((PiecesPosition[BSqSel - 1] === "R" && PiecesPosition[i - 1] === "n") || (PiecesPosition[BSqSel - 1] === "P" && PiecesPosition[i - 1] === "q") || (PiecesPosition[BSqSel - 1] === "N" && PiecesPosition[i - 1] === "q") || (PiecesPosition[BSqSel - 1] === "R" && PiecesPosition[i - 1] === "N") || (PiecesPosition[BSqSel - 1] === "P" && PiecesPosition[i - 1] === "Q") || (PiecesPosition[BSqSel - 1] === "N" && PiecesPosition[i - 1] === "Q")) {
                  movingPiece(i);
                  console.log("u");
               }
            } else {
               if (PiecesPosition[BSqSel - 1] === "C" || PiecesPosition[BSqSel - 1] === "R" || PiecesPosition[BSqSel - 1] === "B" || PiecesPosition[BSqSel - 1] === "P") {
                  letPiecesPosition = Array.from(PiecesPosition);
                  letPiecesPosition[i - 1] = PiecesPosition[BSqSel - 1];
                  letPiecesPosition[BSqSel - 1] = "O";
                  letCastleInCheck();

                  if (DeathPathWhite.includes(BSqSel) === false) {
                     movingPiece(i);
                     console.log("h");
                  } else if (DeathPathWhite.includes(i) === true) {
                     movingPiece(i);
                     console.log("i");
                  }

               } else {
                  movingPiece(i);
                  console.log("j");
               }
            }
         }

      } else {

         if (TotalBCastles > 2) {
            movingPiece(i);
            console.log("k");
         } else if (TotalBCastles === 2) {
            if (BlackCastlesInCheck.length === 1) {
               if (PiecesPosition[BSqSel - 1] === "c") {
                  if (BlackCastlesInCheck.includes(BSqSel) === true) {
                     movingPiece(i);
                     console.log("l");
                  } else if (DeathPathBlack.includes(i) === true) {
                     movingPiece(i);
                     console.log("m");
                  }
               } else {
                  movingPiece(i);
                  console.log("n");
               }
            } else {
               movingPiece(i);
               console.log("o");
            }
         } else if (TotalBCastles === 1) {
            if (BlackCastlesInCheck.length === 1) {
               if (PiecesPosition[BSqSel - 1] === "c") {
                  movingPiece(i);
                  console.log("p");
               } else if (DeathPathBlack.includes(i) === true) {
                  movingPiece(i);
                  console.log("q");
               } else if ((PiecesPosition[BSqSel - 1] === "r" && PiecesPosition[i - 1] === "n") || (PiecesPosition[BSqSel - 1] === "p" && PiecesPosition[i - 1] === "q") || (PiecesPosition[BSqSel - 1] === "n" && PiecesPosition[i - 1] === "q") || (PiecesPosition[BSqSel - 1] === "r" && PiecesPosition[i - 1] === "N") || (PiecesPosition[BSqSel - 1] === "p" && PiecesPosition[i - 1] === "Q") || (PiecesPosition[BSqSel - 1] === "n" && PiecesPosition[i - 1] === "Q")) {
                  movingPiece(i);
                  console.log("u");
               }
            } else {
               if (PiecesPosition[BSqSel - 1] === "c" || PiecesPosition[BSqSel - 1] === "r" || PiecesPosition[BSqSel - 1] === "b" || PiecesPosition[BSqSel - 1] === "p") {
                  letPiecesPosition = Array.from(PiecesPosition);
                  letPiecesPosition[i - 1] = PiecesPosition[BSqSel - 1];
                  letPiecesPosition[BSqSel - 1] = "O";
                  letCastleInCheck();

                  if (DeathPathBlack.includes(BSqSel) === false) {
                     movingPiece(i);
                     console.log("r");
                  } else if (DeathPathBlack.includes(i) === true) {
                     movingPiece(i);
                     console.log("s");
                  }

               } else {
                  movingPiece(i);
                  console.log("t");
               }
            }
         }

      }

   }

}

//double click
function doubleClick() {
   SelectPieceStatus = 0;
   reversePieces();
   clearMarkers();
}

//draw buttons to click squares
function drawButtons(i) {
   const shape4 = document.createElementNS(SvgNS, "rect");
   shape4.setAttributeNS(null, "id", "but" + DrawCanvas);
   shape4.setAttributeNS(null, "width", 60);
   shape4.setAttributeNS(null, "height", 60);
   shape4.setAttributeNS(null, "x", Square_x);
   shape4.setAttributeNS(null, "y", Square_y);
   shape4.setAttributeNS(null, "fill", "transparent");
   shape4.setAttributeNS(null, "stroke-width", 0);
   Board.appendChild(shape4);

   function simpleClick() { // click
      if (SelectPieceStatus === 0) {
         SelectPieceStatus = 1;
         BSqSel = i;
         clearMarkers();
         clickSquare(i);
      } else if (BSqSel === i) { //second click on same square
         BSqSel = i;
         SelectPieceStatus = 0;
         unClickSquare();
      } else if (SquaresToGo.includes(i)) { //second click on active squares to move

         if ((PiecesPosition[BSqSel - 1] === PiecesPosition[BSqSel - 1].toUpperCase() && Turn === Turn.toUpperCase()) || (PiecesPosition[BSqSel - 1] === PiecesPosition[BSqSel - 1].toLowerCase() && Turn === Turn.toLowerCase())) {

            let t = 0;
            let transp = "rgba(200,50,0," + (t / 100) + ")";
            let travel = setInterval(function() {

               //animation square border coloring. time to cancel move.
               t++;
               transp = "rgba(200,50,0," + (t / 100) + ")";

               document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke", transp);
               document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke-width", 3);

               if (t > 100) {
                  clearInterval(travel);
                  document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
                  document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke-width", 0);
               }

            }, 1);

            Clo++;

            Timer2 = setTimeout(function() {

               if (Clo === 1) {

                  document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
                  document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke-width", 0);

                  SelectPieceStatus = 0;
                  unClickSquare();

                  callMovingPiece(i);

                  BSqSel = i;

                  Clo = 0;
                  clearTimeout(Timer2);

               } else if (Clo > 1) {

                  document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
                  document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke-width", 0);

                  SelectPieceStatus = 0;
                  unClickSquare();
                  BSqSel = i;

                  Clo = 0;
                  clearTimeout(Timer2);
                  LockFlipBoard = 0;

               }
               Clo = 0;

            }, 300);
         }

      } else {

         document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
         document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke-width", 0);

         SelectPieceStatus = 0;
         unClickSquare();

      }
   }

   //execute actions onclick and double click
   function clicker() {
      Cli++;
      clearTimeout(Timer);
      Timer = setTimeout(function() {
         if (Cli === 1 && MoveWatch === Move - 1) {
            simpleClick();
            clearTimeout(Timer);
         } else if (Cli === 2) {
            if (LockFlipBoard === 0) {
               doubleClick();
            }
            clearTimeout(Timer);
         }
         Cli = 0;
      }, 200);
   }

   //clicker
   const el = document.getElementById("but" + DrawCanvas);
   el.onclick = function(event) {
      if (event.altKey) {
         drawMarker(i);
      } else {
         clicker();
      }
   };


}

//start construct objects
I = 0;
while (I < 64) {
   I++;
   EvenOdd = I % 2;
   DrawCanvas = "Square" + I;

   //get x y squares to positioning
   squarer(I);

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
   //loops to generate objects in Z axis
   if (J === 0) {
      drawSquares();
   } else if (J === 1) {
      drawMarkMoves();
      I = 64;
   } else if (J === 2) {
      drawBoardLetters();
      I = 64;
   } else if (J === 3) {
      setPieces();
   } else if (J === 4) {
      promoPieces();
      I = 64;
   } else if (J === 5) {
      callDrawMarks();
      I = 64;
   } else if (J === 6) {
      drawButtons(I);
   } else {
      I = 65;
   }
   //stop it
   if (I === 64) {
      I = 0;
      J++;
   }
}

//set Colors
function fillerStroker(c) {
   switch (c) {
      case "disable":
         Filler = "rgba(0,0,0,0.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "white":
         Filler = "rgba(255,255,255,1.0)";
         Stroker = "rgba(0,0,0,1.0)";
         break;
      case "black":
         Filler = "rgba(0,0,0,1.0)";
         Stroker = "rgba(255,255,255,1.0)";
         break;
      case "whiteloser":
         Filler = "rgba(255,255,255,0.5)";
         Stroker = "rgba(0,0,0,0.5)";
         break;
      case "blackloser":
         Filler = "rgba(0,0,0,0.5)";
         Stroker = "rgba(255,255,255,0.5)";
         break;
      case "blackSquare":
         Filler = "rgba(102, 153, 51, 1.0)";
         Stroker = "rgba(102, 153, 51, 1.0)";
         break;
      case "whiteSquare":
         Filler = "rgba(210,225,195,1.0)";
         Stroker = "rgba(210,225,195,1.0)";
         break;
      case "turnover":
         Filler = "rgba(0,200,200,0.5)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "empty":
         Filler = "rgba(200,200,200,0.5)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "take":
         Filler = "rgba(255,50,50,0.5)";
         Stroker = "rgba(255,50,50,0.5)";
         break;
      case "mate":
         Filler = "rgba(255,0,0,0.9)";
         Stroker = "rgba(100,0,0,0.9)";
         break;
      case "castleCheck":
         Filler = "rgba(255,0,0,1.0)";
         Stroker = "rgba(255,0,0,1.0)";
         break;
      case "square":
         Filler = "rgba(0,50,100,0.5)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "colorError":
         Filler = "rgba(143,19,233,0.7)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "greenColor":
         Filler = "rgba(100,240,100,1.0)";
         Stroker = "rgba(100,240,100,1.0)";
         break;
      case "greyColor":
         Filler = "rgba(140,140,140,1.0)";
         Stroker = "rgba(140,140,140,1.0)";
         break;
      case "iceWhiteColor":
         Filler = "rgba(230,230,225,1.0)";
         Stroker = "rgba(230,230,225,1.0)";
         break;
      case "lightWhiteColor":
         Filler = "rgba(255,250,255,1.0)";
         Stroker = "rgba(255,250,255,1.0)";
         break;
   }
}

function count888(item) {
   if (item === "R") {
      TotalWRooks++;
   } else if (item === "r") {
      TotalBRooks++;
   } else if (item === "C") {
      TotalWCastles++;
      TotalWBishops++;
      TotalWRooks++;
   } else if (item === "c") {
      TotalBCastles++;
      TotalBBishops++;
      TotalBRooks++;
   } else if (item === "B") {
      TotalWBishops++;
   } else if (item === "b") {
      TotalBBishops++;
   } else if (item === "Q") {
      TotalWBishops++;
      TotalWRooks++;
   } else if (item === "q") {
      TotalBBishops++;
      TotalBRooks++;
   } else if (item === "N") {
      TotalWBishops++;
   } else if (item === "n") {
      TotalBBishops++;
   }
}

// update amount of pieces on board
function call888() {
   TotalWCastles = 0;
   TotalBCastles = 0;
   TotalWBishops = 0;
   TotalBBishops = 0;
   TotalWRooks = 0;
   TotalBRooks = 0;
   PiecesPosition.forEach(count888);
}
call888();

castlesInCheck(); //get first array with all castles in check

logo_superc.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");

function GameVersion() {
   const verser = document.createElementNS(SvgNS, "text");
   verser.setAttributeNS(null, "id", "version");
   verser.setAttribute("x", 10);
   verser.setAttribute("y", 10);
   verser.setAttribute("fill", "rgba(255,255,255,0.3)");
   verser.setAttribute("font-family", "Helvetica");
   verser.setAttribute("font-weight", "normal");
   verser.setAttribute("font-size", 10);
   verser.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");
   verser.textContent = "Alpha_0.0.3";
   PlayerDownRight.appendChild(verser);
}
GameVersion();
