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
let soundTimeout = new Sound("sounds/timeout.mp3");


//tooltips show/hide
function showTooltip(l1, l2) {

   let tooltip = document.getElementById("tooltip");
   tooltip.innerHTML = lang[l1][l2][setLang];
   tooltip.style.display = "inline-block";

   onmouseover = function(e) {

      tooltip.style.left = e.pageX + 10 + "px";
      tooltip.style.top = e.pageY - 30 + "px";

   };

   onmouseout = function(e) {

      let tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";

   };

}

//get board on html
const PlayerUP = document.getElementById("PlayerUP");
const Board = document.getElementById("Board"); //game board where match happens
const PlayerDown = document.getElementById("PlayerDown");

const PlayerUpRight = document.getElementById("PlayerUPRight");
const GameDisplay = document.getElementById("GameDisplay");
const PlayerDownRight = document.getElementById("PlayerDownRight");

//vars to manage loops
let addTimeW = 0;
let addTimeB = 0;
let Again = 0;
let ArrowColor = "";
let BlackCastlesInCheck = [];
let BSqSel = null;
let Checkered = 0;
let Cli = 0;
let DrawCanvas = null;
let EvenOdd = null;
let Filler = "rgba(200,200,200,0.5)";
let FillStyle = null;
let gameLog = [];
let gameNotation = null;
let gameover = 0;
let I = 0;
let J = 0;
let LastBSquaresToGo = [];
let LastWSquaresToGo = [];
let Letters = [];
let LockFlipBoard = 0;
let LookOutSir = true;
let M = 0;
let MarkerControl = 0;
let MarkerCount = 0;
let miliseconds = 0;
let MilisecondsB = 0;
let MilisecondsW = 0;
let Minis = 0;
let minutes = "00";
let MinutesB = "00";
let MinutesW = "00";
let MMoveLanding = 0;
let MMoveLeaving = 0;
let MMovesLanding = [];
let MMovesLeaving = [];
let Numbers = [];
let opChoice = 0;
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
let PieceType = "C";
let PPos = null;
let PromoControl = 0;
let PromoID = 71;
let R = 0;
let RealBCheck = 0;
let RealWCheck = 0;
let RowEvenOdd = null;
let seconds = "00";
let SecondsB = "00";
let SecondsW = "00";
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
let TurnsTotalWCastles = [];
let TurnsTotalBCastles = [];
let TurnsTotalWBishops = [];
let TurnsTotalBBishops = [];
let TurnsTotalWRooks = [];
let TurnsTotalBRooks = [];
let VerseReverse = "wb";
let WhiteCastlesInCheck = [];
let winner = null;
let XLeaving = null;
let XMark = 0;
let YLeaving = null;
let YMark = 0;

//mark numbers to manage show/hide marks for each kind of piece
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
   //console.log(noteMove + " " + evenOdd + " | " + Notation[Move] + notaMate + " | Cc " + TotalWCastles + "·" + TotalBCastles + " | BR " + TotalWBishops + "·" + TotalWRooks + " | br " + TotalBBishops + "·" + TotalBRooks);
   gameLog.push(noteMove + " " + evenOdd + " | " + Notation[Move] + notaMate + " | Cc " + TotalWCastles + "·" + TotalBCastles + " | BR " + TotalWBishops + "·" + TotalWRooks + " | br " + TotalBBishops + "·" + TotalBRooks + " | " + TurnNotation[Move]);


   //Pieces Position controller
   extMoves[Move] = Array.from(extPiecesPosition);
   midMoves[Move] = Array.from(midPiecesPosition);
   intMoves[Move] = Array.from(intPiecesPosition);
   TurnsPiecesPosition[Move] = Array.from(PiecesPosition);

   //counter pieces controller

   TurnsTotalWCastles.push(TotalWCastles);
   TurnsTotalBCastles.push(TotalBCastles);
   TurnsTotalWBishops.push(TotalWBishops);
   TurnsTotalBBishops.push(TotalBBishops);
   TurnsTotalWRooks.push(TotalWRooks);
   TurnsTotalBRooks.push(TotalBRooks);


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

   if (I < 33) {
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
      }
   } else {
      if (I < 41) {
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
}

function gameDisplay888(turns) {
   if (VerseReverse === "wb") {
      document.getElementById("digitMinutsB").setAttributeNS(null, "y", 97);
      document.getElementById("digitSecondsB").setAttributeNS(null, "y", 97);
      document.getElementById("digitMilisecondsB").setAttributeNS(null, "y", 97);
      document.getElementById("digitMinutsW").setAttributeNS(null, "y", 420);
      document.getElementById("digitSecondsW").setAttributeNS(null, "y", 420);
      document.getElementById("digitMilisecondsW").setAttributeNS(null, "y", 420);

      //counter pieces
      document.getElementById("countBishopTop").textContent = TurnsTotalBBishops[turns];
      document.getElementById("countRookTop").textContent = TurnsTotalBRooks[turns];
      document.getElementById("countCastleTop").textContent = TurnsTotalBCastles[turns];
      document.getElementById("countBishopBot").textContent = TurnsTotalWBishops[turns];
      document.getElementById("countRookBot").textContent = TurnsTotalWRooks[turns];
      document.getElementById("countCastleBot").textContent = TurnsTotalWCastles[turns];

      fillerStroker("whitePieceFillTransp");
      document.getElementById("intCastleTopA").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookTopA").setAttributeNS(null, "fill", Filler);

      fillerStroker("blackPieceFill");
      document.getElementById("intCastleTopB").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookTopB").setAttributeNS(null, "fill", Filler);

      fillerStroker("whitePieceStrokeTransp");
      document.getElementById("midCastleTopA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleTopA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopTopA").setAttributeNS(null, "stroke", Stroker);

      fillerStroker("blackPieceStroke");
      document.getElementById("midCastleTopB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleTopB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopTopB").setAttributeNS(null, "stroke", Stroker);

      //
      fillerStroker("blackPieceFill");
      document.getElementById("intCastleBotA").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookBotA").setAttributeNS(null, "fill", Filler);

      fillerStroker("whitePieceFill");
      document.getElementById("intCastleBotB").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookBotB").setAttributeNS(null, "fill", Filler);

      fillerStroker("blackPieceStroke");
      document.getElementById("midCastleBotA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleBotA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopBotA").setAttributeNS(null, "stroke", Stroker);

      fillerStroker("whitePieceStroke");
      document.getElementById("midCastleBotB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleBotB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopBotB").setAttributeNS(null, "stroke", Stroker);

      //count value colors
      fillerStroker("count" + TotalBBishops);
      document.getElementById("countBishopTop").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalBRooks);
      document.getElementById("countRookTop").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalBCastles);
      document.getElementById("countCastleTop").setAttributeNS(null, "fill", Filler);

      fillerStroker("count" + TotalWBishops);
      document.getElementById("countBishopBot").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalWRooks);
      document.getElementById("countRookBot").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalWCastles);
      document.getElementById("countCastleBot").setAttributeNS(null, "fill", Filler);


   } else {
      document.getElementById("digitMinutsB").setAttributeNS(null, "y", 420);
      document.getElementById("digitSecondsB").setAttributeNS(null, "y", 420);
      document.getElementById("digitMilisecondsB").setAttributeNS(null, "y", 420);
      document.getElementById("digitMinutsW").setAttributeNS(null, "y", 97);
      document.getElementById("digitSecondsW").setAttributeNS(null, "y", 97);
      document.getElementById("digitMilisecondsW").setAttributeNS(null, "y", 97);

      //counter pieces
      document.getElementById("countBishopBot").textContent = TurnsTotalBBishops[turns];
      document.getElementById("countRookBot").textContent = TurnsTotalBRooks[turns];
      document.getElementById("countCastleBot").textContent = TurnsTotalBCastles[turns];
      document.getElementById("countBishopTop").textContent = TurnsTotalWBishops[turns];
      document.getElementById("countRookTop").textContent = TurnsTotalWRooks[turns];
      document.getElementById("countCastleTop").textContent = TurnsTotalWCastles[turns];

      fillerStroker("blackPieceFill");
      document.getElementById("intCastleTopA").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookTopA").setAttributeNS(null, "fill", Filler);

      fillerStroker("whitePieceFill");
      document.getElementById("intCastleTopB").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookTopB").setAttributeNS(null, "fill", Filler);

      fillerStroker("blackPieceStroke");
      document.getElementById("midCastleTopA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleTopA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopTopA").setAttributeNS(null, "stroke", Stroker);

      fillerStroker("whitePieceStroke");
      document.getElementById("midCastleTopB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleTopB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopTopB").setAttributeNS(null, "stroke", Stroker);

      //
      fillerStroker("whitePieceFillTransp");
      document.getElementById("intCastleBotA").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookBotA").setAttributeNS(null, "fill", Filler);

      fillerStroker("blackPieceFill");
      document.getElementById("intCastleBotB").setAttributeNS(null, "fill", Filler);
      document.getElementById("intRookBotB").setAttributeNS(null, "fill", Filler);

      fillerStroker("whitePieceStrokeTransp");
      document.getElementById("midCastleBotA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleBotA").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopBotA").setAttributeNS(null, "stroke", Stroker);

      fillerStroker("blackPieceStroke");
      document.getElementById("midCastleBotB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extCastleBotB").setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midBishopBotB").setAttributeNS(null, "stroke", Stroker);

      //count value colors
      fillerStroker("count" + TotalWBishops);
      document.getElementById("countBishopTop").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalWRooks);
      document.getElementById("countRookTop").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalWCastles);
      document.getElementById("countCastleTop").setAttributeNS(null, "fill", Filler);

      fillerStroker("count" + TotalBBishops);
      document.getElementById("countBishopBot").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalBRooks);
      document.getElementById("countRookBot").setAttributeNS(null, "fill", Filler);
      fillerStroker("count" + TotalBCastles);
      document.getElementById("countCastleBot").setAttributeNS(null, "fill", Filler);
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

   gameDisplay888(Move - 1);
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

//draw paths
function drawer(setColor, sType, sID, sStrokeWidth, sPrecision, rootSvg, pPoints, strokeLinecap, markerEnd) {

   fillerStroker(setColor);

   const pen = document.createElementNS(SvgNS, sType);
   pen.setAttributeNS(null, "id", sID);
   pen.setAttributeNS(null, "fill", Filler);
   pen.setAttributeNS(null, "stroke", Stroker);
   pen.setAttributeNS(null, "stroke-width", sStrokeWidth);
   pen.setAttributeNS(null, "shape-rendering", sPrecision);

   if (sType === "polygon") {
      pen.setAttributeNS(null, "points", pPoints);
   } else if (sType === "polyline") {
      pen.setAttributeNS(null, "points", pPoints);
      pen.setAttributeNS(null, "fill", "none");
      pen.setAttributeNS(null, "stroke-linecap", strokeLinecap);
      pen.setAttributeNS(null, 'marker-end', markerEnd);
   } else if (sType === "path" && pPoints !== 0) {
      pen.setAttributeNS(null, "d", pPoints);
   }

   if (rootSvg === "Board") {
      Board.appendChild(pen);
   } else if (rootSvg === "PlayerUPRight") {
      PlayerUPRight.appendChild(pen);
   } else if (rootSvg === "infoMain") {
      infoMain.appendChild(pen);
   } else if (rootSvg === "GameDisplay") {
      GameDisplay.appendChild(pen);
   }

}

// svg element creator
function svger(fS, sType, sID, sWidth, sHeight, sX, sY, sStrokeWidth, sPrecision, rootSvg, b, l1, l2, over, down, up, out) {

   fillerStroker(fS);

   const shapeVger = document.createElementNS(SvgNS, sType);
   shapeVger.setAttributeNS(null, "id", sID);
   shapeVger.setAttributeNS(null, "width", sWidth);
   shapeVger.setAttributeNS(null, "height", sHeight);
   shapeVger.setAttributeNS(null, "x", sX);
   shapeVger.setAttributeNS(null, "y", sY);
   shapeVger.setAttributeNS(null, "fill", Filler);
   shapeVger.setAttributeNS(null, "stroke", Stroker);
   shapeVger.setAttributeNS(null, "stroke-width", sStrokeWidth);
   shapeVger.setAttributeNS(null, "shape-rendering", sPrecision);

   if (rootSvg === "Board") {
      Board.appendChild(shapeVger);
   } else if (rootSvg === "PlayerUPRight") {
      PlayerUPRight.appendChild(shapeVger);
   } else if (rootSvg === "infoMain") {
      infoMain.appendChild(shapeVger);
   } else if (rootSvg === "GameDisplay") {
      GameDisplay.appendChild(shapeVger);
   }

   if (b === 1) {
      const el = document.getElementById(sID);

      el.onclick = function(event) {
         displayActions(sID); // set it on game_display.js
      };
      el.onmouseover = function(event) {
         fillerStroker(over);
         document.getElementById(sID + "BG").setAttributeNS(null, "fill", Filler);
         showTooltip(l1, l2);
      };
      el.onmousedown = function(event) {
         fillerStroker(down);
         document.getElementById(sID + "BG").setAttributeNS(null, "fill", Filler);
      };
      el.onmouseup = function(event) {
         fillerStroker(up);
         document.getElementById(sID + "BG").setAttributeNS(null, "fill", Filler);
      };
      el.onmouseout = function(event) {
         fillerStroker(out);
         document.getElementById(sID + "BG").setAttributeNS(null, "fill", Filler);
      };

   } else if (b === 2) {
      const el = document.getElementById(sID);
      el.onmouseover = function(event) {
         fillerStroker(over);
         showTooltip(l1, l2);
      };
   }

}

function letterer(fS, sType, sID, sX, sY, fontFamily, fontWeight, fontSize, sPrecision, rootSvg, textContent) {

   fillerStroker(fS);

   const lettering = document.createElementNS(SvgNS, sType);
   lettering.setAttributeNS(null, "id", sID);
   lettering.setAttribute("x", sX);
   lettering.setAttribute("y", sY);
   lettering.setAttribute("fill", Filler);
   lettering.setAttribute("font-family", fontFamily);
   lettering.setAttribute("font-weight", fontWeight);
   lettering.setAttribute("font-size", fontSize);
   lettering.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");
   lettering.textContent = textContent;

   if (rootSvg === "Board") {
      Board.appendChild(lettering);
   } else if (rootSvg === "PlayerUPRight") {
      PlayerUPRight.appendChild(lettering);
   } else if (rootSvg === "infoMain") {
      infoMain.appendChild(lettering);
   } else if (rootSvg === "GameDisplay") {
      GameDisplay.appendChild(lettering);
   } else if (rootSvg === "PlayerDownRight") {
      PlayerDownRight.appendChild(lettering);
   }
}

//board limit to check marks inside board area. BL
svger("disable", "rect", "BL", 480, 480, 0, 0, 0, "geometricPrecision", "Board");

//draw board squares
function drawSquares() {
   let setColor;
   if (SquareColor === "white") {
      setColor = "whiteSquare";
   } else {
      setColor = "blackSquare";
   }

   svger(setColor, "rect", DrawCanvas, 60, 60, Square_x, Square_y, 0, "geometricPrecision", "Board");

}

//draw marks moves
function drawMarkMoves() {

   svger("mMove", "rect", "mMove1", 60, 60, 600, 600, 0, "geometricPrecision", "Board");

   svger("mMove", "rect", "mMove2", 60, 60, 600, 600, 0, "geometricPrecision", "Board");

}

//lettering to mark squares with numbers and letters
function drawBoardLetters() {

   let i = 0;
   let Letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
   let Numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

   while (i < 8) {
      letterer("lettererBoard", "text", "letter_" + i, (60 * (i + 1)) - 58, 478, "Helvetica", "bold", 13, "geometricPrecision", "Board", Letters[i]);

      letterer("lettererBoard", "text", "number_" + i, 472, (60 * (8 - i)) - 49, "Helvetica", "bold", 13, "geometricPrecision", "Board", Numbers[i]);

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

function drawCircles(fS, sType, sID, scX, scY, sr, sStrokeWidth, sPrecision, rootSvg) {

   fillerStroker(fS);

   const circles = document.createElementNS(SvgNS, sType);
   circles.setAttributeNS(null, "id", sID);
   circles.setAttributeNS(null, "cx", scX);
   circles.setAttributeNS(null, "cy", scY);
   circles.setAttributeNS(null, "r", sr);
   circles.setAttributeNS(null, "fill", Filler);
   circles.setAttributeNS(null, "stroke", Stroker);
   circles.setAttributeNS(null, "stroke-width", sStrokeWidth);
   circles.setAttributeNS(null, "shape-rendering", sPrecision);

   if (rootSvg === "Board") {
      Board.appendChild(circles);
   } else if (rootSvg === "PlayerUPRight") {
      PlayerUPRight.appendChild(circles);
   } else if (rootSvg === "GameDisplay") {
      GameDisplay.appendChild(circles);
   } else if (rootSvg === "infoMain") {
      infoMain.appendChild(circles);
   }
}

//set attributes to draw pieces
function setPieces() {
   let fS1 = "";
   let fS2 = "";
   PPos = PiecesPosition[I - 1];

   if (PPos === "q" || PPos === "c" || PPos === "r" || PPos === "Q" || PPos === "C" || PPos === "R") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceFill";
         fS2 = "blackPieceFill";
      } else {
         fS1 = "blackPieceFill";
         fS2 = "whitePieceFill";
      }

      drawCircles(fS1, "circle", "intA" + I, Square_x + 30, Square_y + 30, 15, 0, "geometricPrecision", "Board");
      drawCircles(fS2, "circle", "intB" + I, Square_x + 30, Square_y + 30, 14, 0, "geometricPrecision", "Board");

   }

   if (PPos === "q" || PPos === "b" || PPos === "c" || PPos === "n" || PPos === "Q" || PPos === "B" || PPos === "C" || PPos === "N") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceStroke";
         fS2 = "blackPieceStroke";
      } else {
         fS1 = "blackPieceStroke";
         fS2 = "whitePieceStroke";
      }

      drawCircles(fS1, "circle", "midA" + I, Square_x + 30, Square_y + 30, 18, 8, "geometricPrecision", "Board");
      drawCircles(fS2, "circle", "midB" + I, Square_x + 30, Square_y + 30, 18, 6, "geometricPrecision", "Board");

   }

   if (PPos === "c" || PPos === "p" || PPos === "n" || PPos === "C" || PPos === "P" || PPos === "N") {

      if (PPos === PPos.toLowerCase()) {
         fS1 = "whitePieceStroke";
         fS2 = "blackPieceStroke";
      } else {
         fS1 = "blackPieceStroke";
         fS2 = "whitePieceStroke";
      }

      drawCircles(fS1, "circle", "extA" + I, Square_x + 30, Square_y + 30, 25, 8, "geometricPrecision", "Board");
      drawCircles(fS2, "circle", "extB" + I, Square_x + 30, Square_y + 30, 25, 6, "geometricPrecision", "Board");
   }
}

function promoPieces() {
   let p = 70;
   let x = 0;
   let idType = "int";
   let fS = "";
   let pRadius1 = 15;
   let pRadius2 = 14;
   let pStrokeWidth1 = 0;
   let pStrokeWidth2 = 0;

   //generate circles to compose promo pieces
   while (p < 86 && x < 2) {
      p++;

      drawCircles(fS, "circle", idType + "A" + p, 600, 600, pRadius1, pStrokeWidth1, "geometricPrecision", "Board");
      drawCircles(fS, "circle", idType + "B" + p, 600, 600, pRadius2, pStrokeWidth2, "geometricPrecision", "Board");

      if (p === 86) {
         idType = "mid";
         p = 70;
         x++;
      }

      if (p === 78 && idType === "int") {
         fS = "whitePieceFill";
      }

      if (p === 70 && idType === "mid") {
         pRadius1 = 18;
         pRadius2 = 18;

         fS = "whitePieceStroke";

         pStrokeWidth1 = 8;
         pStrokeWidth2 = 6;
      }

      if (p === 78 && idType === "mid") {
         pRadius1 = 18;
         pRadius2 = 18;

         fS = "whitePieceStroke";

         pStrokeWidth1 = 8;
         pStrokeWidth2 = 6;
      }
   }
}

//draw marks and undermarks
function drawMarks() {

   drawCircles("disable", "circle", "Mark" + M, XMark + 30, YMark + 30, 10, 1, "geometricPrecision", "Board");
   drawCircles("disable", "circle", "underMark" + M, XMark + 30, YMark + 30, 10, 1, "optimizeSpeed", "Board");
}

function setxyMark(M) {
   if (M < 106) {
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
      }
   } else {
      if (M < 121) {
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
   }
}

//set values x y to draw marks inside mc
function callDrawMarks() {
   //draw marks

   while (M < 225) {
      M++;
      setxyMark(M);
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
         ArrowColor = "ColorMarkerOh";
      } else if (PiecesPosition[i - 1] === PiecesPosition[i - 1].toUpperCase()) {
         ArrowColor = "ColorMarkerWhite";
      } else {
         ArrowColor = "ColorMarkerBlack";
      }
   }

   if (MarkerControl === 2) {

      if (inti !== i) {

         let xLanding = parseInt(document.getElementById("butSquare" + i).getAttribute("x")) + 30;
         let yLanding = parseInt(document.getElementById("butSquare" + i).getAttribute("y")) + 30;

         let xLea = XLeaving;
         let xLan = xLanding;
         let yLea = YLeaving;
         let yLan = yLanding;

         if (XLeaving < xLanding) {
            xLan = xLanding - 10;
         }
         if (YLeaving > yLanding) {
            yLan = yLanding + 10;
         }

         if (XLeaving > xLanding) {
            xLan = xLanding + 10;
         }
         if (YLeaving < yLanding) {
            yLan = yLanding - 10;
         }



         xy = XLeaving + "," + YLeaving + " " + xLan + "," + yLan;

         fillerStroker(ArrowColor);

         const marker = document.createElementNS(SvgNS, "marker");
         marker.setAttributeNS(null, "id", "marker" + MarkerCount);
         marker.setAttributeNS(null, "fill", Filler);
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

         drawer(ArrowColor, "polyline", "polyline" + MarkerCount, 7, "geometricPrecision", "Board", xy, "round", "url(#marker" + MarkerCount + ")");

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
      movingPiece(i);
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

   svger("disable", "rect", "but" + DrawCanvas, 60, 60, Square_x, Square_y, 0, "geometricPrecision", "Board");

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

               //animation square border coloring.
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

            Timer2 = setTimeout(function() {

               document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
               document.getElementById("butSquare" + (i)).setAttributeNS(null, "stroke-width", 0);

               SelectPieceStatus = 0;
               unClickSquare();

               callMovingPiece(i);

               BSqSel = i;

               clearTimeout(Timer2);

            }, 200);
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
      case "whitePieceStroke":
         Filler = "rgba(255,255,255,0.0)";
         Stroker = "rgba(255,255,255,1.0)";
         break;
      case "blackPieceStroke":
         Filler = "rgba(0,0,0,0.0)";
         Stroker = "rgba(0,0,0,1.0)";
         break;
      case "whitePieceStrokeTransp":
         Filler = "rgba(255,255,255,0.0)";
         Stroker = "rgba(255,255,255,0.3)";
         break;
      case "blackPieceStrokeTransp":
         Filler = "rgba(0,0,0,0.0)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "whitePieceFill":
         Filler = "rgba(255,255,255,1.0)";
         Stroker = "rgba(255,255,255,0.0)";
         break;
      case "blackPieceFill":
         Filler = "rgba(0,0,0,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "whitePieceFillTransp":
         Filler = "rgba(255,255,255,0.3)";
         Stroker = "rgba(255,255,255,0.0)";
         break;
      case "blackPieceFillTransp":
         Filler = "rgba(0,0,0,0.3)";
         Stroker = "rgba(0,0,0,0.0)";
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
      case "textColorWhite":
         Filler = "rgba(250,250,250,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "textColorOver":
         Filler = "rgba(0,150,0,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "blackSquare":
         Filler = "rgba(102, 153, 51, 1.0)";
         Stroker = "rgba(102, 153, 51, 1.0)";
         break;
      case "whiteSquare":
         Filler = "rgba(210,225,195,1.0)";
         Stroker = "rgba(210,225,195,1.0)";
         break;
      case "blackSquareMini":
         Filler = "rgba(115, 100, 90, 1.0)";
         Stroker = "rgba(115, 100, 90, 1.0)";
         break;
      case "whiteSquareMini":
         Filler = "rgba(210,200,180,1.0)";
         Stroker = "rgba(210,200,180,1.0)";
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
      case "greyColorStroke":
         Filler = "rgba(140,140,140,0.0)";
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
      case "lightWhiteColorStroke":
         Filler = "rgba(255,250,255,0.0)";
         Stroker = "rgba(255,250,255,1.0)";
         break;
      case "mMove":
         Filler = "rgba(255,200,0,0.8)";
         Stroker = "rgba(255,200,0,0.0)";
         break;
      case "bgBlackTransp":
         Filler = "rgba(31,31,31,0.3)";
         Stroker = "rgba(31,31,31,0.3)";
         break;
      case "blackTransp":
         Filler = "rgba(100,100,100,0.1)";
         Stroker = "rgba(100,100,100,0.1)";
         break;
      case "lettererBoard":
         Filler = "rgba(0,0,0,0.4)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "lettererBlackText":
         Filler = "rgba(0,0,0,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "lettererWhiteText":
         Filler = "rgba(250,250,250,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "lettererWhiteTextTransp":
         Filler = "rgba(250,250,250,0.3)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "ColorMarkerOh":
         Filler = "rgba(50,100,50,1.0)";
         Stroker = "rgba(50,100,50,1.0)";
         break;
      case "ColorMarkerWhite":
         Filler = "rgba(130,80,0,1.0)";
         Stroker = "rgba(130,80,0,1.0)";
         break;
      case "ColorMarkerBlack":
         Filler = "rgba(50,50,100,1.0)";
         Stroker = "rgba(50,50,100,1.0)";
         break;
      case "count16":
         //fall through
      case "count15":
         //fall through
      case "count14":
         //fall through
      case "count13":
         //fall through
      case "count12":
         //fall through
      case "count11":
         //fall through
      case "count10":
         //fall through
      case "count9":
         //fall through
      case "count8":
         Filler = "rgba(160,160,160,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "count7":
         Filler = "rgba(140,140,140,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "count6":
         Filler = "rgba(120,120,120,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "count5":
         Filler = "rgba(100,100,100,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "count4":
         Filler = "rgba(80,80,80,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "count3":
         Filler = "rgba(60,60,60,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "count2":
         Filler = "rgba(255,100,0,1.0)";
         Stroker = "rgba(255,100,0,1.0)";
         break;
      case "count1":
         Filler = "rgba(255,0,0,1.0)";
         Stroker = "rgba(255,0,0,1.0)";
         break;
      case "count0":
         Filler = "rgba(200,0,0,1.0)";
         Stroker = "rgba(200,0,0,1.0)";
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

castlesInCheck(); //get first array with all castles in check
call888();
logo_superc.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");

function GameVersion() {
   letterer("lettererWhiteTextTransp", "text", "version", 10, 10, "Consolas", "normal", 12, "geometricPrecision", "PlayerDownRight", "Alpha_0.0.7 | boardgameturnover@gmail.com");
}
GameVersion();
