/*jshint esversion: 6 */
let pPoints;

let GameDate = new Date();
let UTCGame = GameDate.toUTCString();

//save pgn file
function download(text) {
   let file = new Blob([text], {
      type: "text/plain;charset=utf-8"
   });
   window.open(URL.createObjectURL(file));
}

//arc
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
   let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

   return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
   };
}

function describeArc(x, y, radius, startAngle, endAngle) {

   let start = polarToCartesian(x, y, radius, endAngle);
   let end = polarToCartesian(x, y, radius, startAngle);

   let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

   let d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
   ].join(" ");

   return d;
}

function drawCountdown() {
   let i = 0;
   let cronoID = "";
   let digitX = 0;
   let digitY = 0;
   let digitSize = 0;

   while (i < 8) {

      const digit = document.createElementNS(SvgNS, "text");

      if (i === 0) {
         cronoID = "digitMinutsB";
         digitX = 24;
         digitY = 97;
         digitSize = 52;
         digit.textContent = MinutesB;
      } else if (i === 1) {
         cronoID = "digitSecondsB";
         digitX = 90;
         digitY = 97;
         digitSize = 52;
         digit.textContent = SecondsB;
      } else if (i === 2) {
         cronoID = "digitMilisecondsB";
         digitX = 150;
         digitY = 97;
         digitSize = 25;
         digit.textContent = MilisecondsB;
      }
      if (i === 3) {
         cronoID = "digitMinutsW";
         digitX = 24;
         digitY = 420;
         digitSize = 52;
         digit.textContent = MinutesW;
      } else if (i === 4) {
         cronoID = "digitSecondsW";
         digitX = 90;
         digitY = 420;
         digitSize = 52;
         digit.textContent = SecondsW;
      } else if (i === 5) {
         cronoID = "digitMilisecondsW";
         digitX = 150;
         digitY = 420;
         digitSize = 25;
         digit.textContent = MilisecondsW;
      } else if (i === 6) {
         cronoID = "digitMilisecondsW";
         digitX = 80;
         digitY = 90;
         digitSize = 32;
         digit.textContent = ":";
      } else if (i === 7) {
         cronoID = "digitMilisecondsW";
         digitX = 80;
         digitY = 412;
         digitSize = 32;
         digit.textContent = ":";
      }

      digit.setAttributeNS(null, "id", cronoID);
      digit.setAttribute("x", digitX);
      digit.setAttribute("y", digitY);
      digit.setAttribute("fill", "rgba(0,0,0,0.7)");
      digit.setAttribute("font-family", "Helvetica");
      digit.setAttribute("font-weight", "normal");
      digit.setAttribute("font-size", digitSize);
      digit.setAttribute("style", "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");

      GameDisplay.appendChild(digit);

      i++;
   }
}

//bg
svger("lightWhiteColor", "rect", "gameDisplayBG", 280, 256, 20, 110, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "topTime", 150, 60, 20, 50, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("blackSquare", "rect", "topTimeline", 280, 4, 20, 110, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "botTime", 150, 60, 20, 370, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("blackSquare", "rect", "botTimeline", 280, 4, 20, 366, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("blackSquare", "rect", "topButsline", 280, 2, 20, 150, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);

//buttons bg
svger("whiteSquare", "rect", "butFlipBoardBG", 56, 36, 20, 114, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "butMoveToStartBG", 56, 36, 76, 114, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "butStepBackBG", 56, 36, 132, 114, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "butStepForwardBG", 56, 36, 188, 114, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "butMoveToEndBG", 56, 36, 244, 114, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);

//bottom buttons
svger("whiteSquare", "rect", "butSaveFileBG", 56, 36, 20, 330, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("whiteSquare", "rect", "butTakebackBG", 56, 36, 76, 330, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);
svger("blackSquare", "rect", "botButsline", 280, 2, 20, 328, 0, "geometricPrecision", "GameDisplay", 0, 0, 0);

//icon Save File
pPoints = "40,342 56,342 56,343 40,343";
drawer("greyColor", "polygon", "iconSaveFile0", 0, "geometricPrecision", "GameDisplay", pPoints);

pPoints = "40,347 56,347 56,348 40,348";
drawer("greyColor", "polygon", "iconSaveFile1", 0, "geometricPrecision", "GameDisplay", pPoints);

pPoints = "40,352 56,352 56,353 40,353";
drawer("greyColor", "polygon", "iconSaveFile2", 0, "geometricPrecision", "GameDisplay", pPoints);

pPoints = "36,336, 36,335 60,335 60,360 36,360 36,336 37,336 37,359 59,359 59,342 53,336";
drawer("greyColor", "polygon", "iconSaveFile3", 0, "geometricPrecision", "GameDisplay", pPoints);

//button Step Forward
pPoints = "220,131 220,123 222,123 222,139 220,139 220,131, 211,139 211,123";
drawer("lightWhiteColor", "polygon", "iconStepForward", 0, "geometricPrecision", "GameDisplay", pPoints);

//button Stepback
pPoints = "284,131 284,123 282,123 282,139 284,139 284,131, 293,139 293,123";
drawer("lightWhiteColor", "polygon", "iconStepBack", 0, "geometricPrecision", "GameDisplay", pPoints);
document.getElementById("iconStepBack").setAttributeNS(null, "transform", "translate(-127,0)");


//button move to end
pPoints = "280,131 280,123 282,123 282,139 280,139 280,131, 271,139 271,131, 262,139, 262,123 271,131 271,123";
drawer("lightWhiteColor", "polygon", "iconMoveToEnd", 0, "geometricPrecision", "GameDisplay", pPoints);

//button move to start
pPoints = "284,131 284,123 282,123 282,139 284,139 284,131, 293,139 293,131, 302,139, 302,123 293,131 293,123";
drawer("lightWhiteColor", "polygon", "iconMoveToStart", 0, "geometricPrecision", "GameDisplay", pPoints);
document.getElementById("iconMoveToStart").setAttributeNS(null, "transform", "translate(-188,0)");

//flip board icon
drawer("greyColorStroke", "path", "arcIconTop", 3, "geometricPrecision", "GameDisplay");
document.getElementById("arcIconTop").setAttributeNS(null, "d", describeArc(48, 132, 12, -90, 90));

drawer("lightWhiteColorStroke", "path", "arcIconBot", 3, "geometricPrecision", "GameDisplay");
document.getElementById("arcIconBot").setAttributeNS(null, "d", describeArc(48, 132, 12, 90, 270));

//take back icon
drawer("lightWhiteColorStroke", "path", "arcTakebackTop", 4, "geometricPrecision", "GameDisplay");
document.getElementById("arcTakebackTop").setAttributeNS(null, "d", describeArc(104, 348, 10, 0, 90));

drawer("greyColorStroke", "path", "arcTakebackBot", 4, "geometricPrecision", "GameDisplay");
document.getElementById("arcTakebackBot").setAttributeNS(null, "d", describeArc(104, 348, 10, 90, 270));

//draw arrow icon
pPoints = "104,344 96,338 104,332";
drawer("lightWhiteColor", "polygon", "iconArrowTakeback", 0, "geometricPrecision", "GameDisplay", pPoints);

//buttons with actions
svger("disable", "rect", "butFlipBoard", 56, 36, 20, 114, 0, "geometricPrecision", "GameDisplay", 1, 0, 0, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");
svger("disable", "rect", "butMoveToStart", 56, 36, 76, 114, 0, "geometricPrecision", "GameDisplay", 1, 0, 1, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");
svger("disable", "rect", "butStepBack", 56, 36, 132, 114, 0, "geometricPrecision", "GameDisplay", 1, 0, 2, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");
svger("disable", "rect", "butStepForward", 56, 36, 188, 114, 0, "geometricPrecision", "GameDisplay", 1, 0, 3, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");
svger("disable", "rect", "butMoveToEnd", 56, 36, 244, 114, 0, "geometricPrecision", "GameDisplay", 1, 0, 4, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");

svger("disable", "rect", "butSaveFile", 56, 36, 20, 330, 0, "geometricPrecision", "GameDisplay", 1, 0, 5, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");
svger("disable", "rect", "butTakeback", 56, 36, 76, 330, 0, "geometricPrecision", "GameDisplay", 1, 0, 6, "blackSquare", "lightWhiteColor", "blackSquare", "whiteSquare");

//call crono
drawCountdown();

//execute actions to takeback move
let cli = 0;

function takeback() {
   cli++;
   clearTimeout(Timer);

   if (cli === 1) {

      Turn = Turn === "W" ? "b" : "W";

      LandingsAgain = 0;
      Again = 0;

      backForward("takeback");

      unClickSquare();
      clearMarkers();

      TurnsPiecesPosition.pop();
      extMoves.pop();
      midMoves.pop();
      intMoves.pop();
      TurnNotation.pop();
      MMovesLeaving.pop();
      MMovesLanding.pop();
      Notation.pop();
      gameLog.pop();

      Move--;

      extPiecesPosition = Array.from(extMoves[MoveWatch]);
      midPiecesPosition = Array.from(midMoves[MoveWatch]);
      intPiecesPosition = Array.from(intMoves[MoveWatch]);
      PiecesPosition = Array.from(TurnsPiecesPosition[MoveWatch]);

      iconsSetColor();

      call888();

      castlesInCheck();

      soundRewind.play();

      clearTimeout(Timer);

   }
   Timer = setTimeout(function() {
      cli = 0;
   }, 1000);
}

//displayActions
function displayActions(k) {
   if (LockFlipBoard === 0) {
      if (k === "butFlipBoard") {
         reversePieces();
      } else if (k === "butStepBack") {
         if (MoveWatch > 0) {
            backForward("left");
            soundRewind.play();
         }
      } else if (k === "butStepForward") {
         if (MoveWatch < Move - 1) {
            backForward("right");
            soundRewind.play();
         }
      } else if (k === "butStepBackMini") {

            soundRewind.play();

      } else if (k === "butStepForwardMini") {

            soundRewind.play();

      } else if (k === "butOptionMini") {
         opChoice = 0;
         popups(1, 3, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini1") {
         opChoice = 1;
         popups(1, 2, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini2") {
         opChoice = 2;
         popups(1, 2, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini3") {
         opChoice = 3;
         popups(1, 2, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini4") {
         opChoice = 4;
         popups(1, 2, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini5") {
         opChoice = 5;
         popups(1, 2, 1, 6);
         soundRewind.play();

      } else if (k === "butMoveToEnd") {
         if (MoveWatch < Move - 1) {
            backForward("end");
            soundRewind.play();
         }
      } else if (k === "butMoveToStart") {
         if (MoveWatch > 0) {
            backForward("start");
            soundRewind.play();
         }
      } else if (k === "butTakeback" && gameover === 0 && Move > 1) {
         if (MoveWatch === Move - 1) {
            takeback();
         }
      } else if (k === "butSaveFile") {
         gameNotation = "";
         for (i = 0; i < gameLog.length; i++) {
            gameNotation += gameLog[i] + " \n";
         }
         let pgnInfo = "game: Super C \nevent_id: 0 \nmatch_rating: none \nmatch_result: [learning]\nevent_type: Play yourself\nUTCDate: " + UTCGame + "\nwhite: [Visitant, 0, 100]\nblack: [Visitant, 0, 100] \nMatch Point: 0\ntime_mode: none \nmove_id: [none] \nUCI: [" + Notation + "]\n\n" + gameNotation;
         download(pgnInfo);
      }
   }
}
