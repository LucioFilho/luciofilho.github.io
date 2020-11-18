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

//add time
pPoints = "M 27.4499321,9.0769501l-5.168869-5.1688685c-0.4516602-0.4321437-1.1032772-0.390342-1.4836559,0l-0.9332676,0.9332681 c-0.4068089,0.4068089-0.4068089,1.1007771,0,1.507586l0.7657566,0.7657585l-0.909338,0.8854079 c-3.1604519-1.7304196-6.947711-1.6262951-9.9309273,0l-0.909337-0.8854079l0.7657585-0.7657585 c0.4068089-0.4068093,0.4068089-1.0768476,0-1.507586L8.7127838,3.9080815c-0.4037457-0.4037459-1.0693731-0.4142828-1.4836559,0 L2.0363295,9.0769501c-0.399395,0.399395-0.4255123,1.0581436,0,1.4836559l0.9332681,0.9332676 c0.4068091,0.4068098,1.0768473,0.4068098,1.5075867,0l0.8375483-0.8375483l0.741828,0.741828 c-1.0768471,1.6511669-1.7229557,3.5894918-1.7229557,5.7192574c0,5.743187,4.6663389,10.3855972,10.3855963,10.3855972 s10.3855963-4.6663399,10.3855963-10.3855972c0-2.105835-0.6221771-4.0680904-1.7229557-5.6953268l0.7418289-0.7657585 l0.8375473,0.8375483c0.4068089,0.4068098,1.1007767,0.4068098,1.5075874,0l0.9332676-0.9332676 C27.7517109,10.1848783,27.8899593,9.5169773,27.4499321,9.0769501 z M 14.7431297,24.9903622 c-4.3313198,0-7.872952-3.5416317-7.872952-7.8729515s3.5416322-7.8729525,7.872952-7.8729525 s7.8729515,3.5416327,7.8729515,7.8729525C22.6160812,21.472662,19.0744514,24.9903622,14.7431297,24.9903622 z M 16.7053852,16.4473743h-1.2682877v-1.2682886c0-0.3828793-0.3110895-0.6700382-0.6700382-0.6700382 c-0.3828783,0-0.6700382,0.3110886-0.6700382,0.6700382v1.2682886h-1.2682867 c-0.3828783,0-0.6700382,0.3110886-0.6700382,0.6700382c0,0.3828793,0.3110895,0.6700401,0.6700382,0.6700401h1.2443571v1.2682877 c0,0.3828773,0.3110895,0.6700382,0.6700382,0.6700382c0.3828802,0,0.6700382-0.3110905,0.6700382-0.6700382v-1.24436h1.2922173 c0.3828793,0,0.6700401-0.3110905,0.6700401-0.6700401C17.3754253,16.758461,17.0643349,16.4473743,16.7053852,16.4473743 z M 14.7431297,11.3742237c-3.2066116,0-5.8149757,2.6083651-5.8149757,5.8149757s2.6083641,5.8149776,5.8149757,5.8149776 s5.8149757-2.6083641,5.8149757-5.8149776S17.9497414,11.3742237,14.7431297,11.3742237 z M 14.7431297,20.7786922 c-1.9861851,0-3.5894918-1.6033039-3.5894918-3.5894909s1.6033068-3.5894918,3.5894918-3.5894918 s3.5894928,1.6033068,3.5894928,3.5894918S16.7293148,20.7786922,14.7431297,20.7786922 z";
drawer("lightWhiteColor", "path", "butAddTimeTopBG", 0, "geometricPrecision", "GameDisplay", pPoints);
drawer("lightWhiteColor", "path", "butAddTimeBotBG", 0, "geometricPrecision", "GameDisplay", pPoints);

document.getElementById("butAddTimeTopBG").setAttributeNS(null, "transform", "translate(270,80)");
document.getElementById("butAddTimeBotBG").setAttributeNS(null, "transform", "translate(270,370)");

//button move to end
pPoints = "280,131 280,123 282,123 282,139 280,139 280,131, 271,139 271,131, 262,139, 262,123 271,131 271,123";
drawer("lightWhiteColor", "polygon", "iconMoveToEnd", 0, "geometricPrecision", "GameDisplay", pPoints);

//button move to start
pPoints = "284,131 284,123 282,123 282,139 284,139 284,131, 293,139 293,131, 302,139, 302,123 293,131 293,123";
drawer("lightWhiteColor", "polygon", "iconMoveToStart", 0, "geometricPrecision", "GameDisplay", pPoints);
document.getElementById("iconMoveToStart").setAttributeNS(null, "transform", "translate(-188,0)");

//flip board icon
pPoints = 0; //0 avoid to use d values, instead it uses arc function
drawer("greyColorStroke", "path", "arcIconTop", 3, "geometricPrecision", "GameDisplay", pPoints);
document.getElementById("arcIconTop").setAttributeNS(null, "d", describeArc(48, 132, 12, -90, 90));

drawer("lightWhiteColorStroke", "path", "arcIconBot", 3, "geometricPrecision", "GameDisplay", pPoints);
document.getElementById("arcIconBot").setAttributeNS(null, "d", describeArc(48, 132, 12, 90, 270));

//take back icon
pPoints = 0;
drawer("lightWhiteColorStroke", "path", "arcTakebackTop", 4, "geometricPrecision", "GameDisplay", pPoints);
document.getElementById("arcTakebackTop").setAttributeNS(null, "d", describeArc(104, 348, 10, 0, 90));

drawer("greyColorStroke", "path", "arcTakebackBot", 4, "geometricPrecision", "GameDisplay", pPoints);
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

svger("disable", "rect", "butAddTimeTop", 30, 30, 270, 80, 0, "geometricPrecision", "GameDisplay", 1, 0, 10, "mMove", "lightWhiteColor", "mMove", "lightWhiteColor");
svger("disable", "rect", "butAddTimeBot", 30, 30, 270, 380, 0, "geometricPrecision", "GameDisplay", 1, 0, 10, "mMove", "lightWhiteColor", "mMove", "lightWhiteColor");

//draw pieces count
function drawCounterPieces(pSide, y, fS1, fS2, fS3, fS4) {

   drawCircles(fS3, "circle", "intCastle" + pSide + "A", 145, 24 + y, 11, 0, "geometricPrecision", "GameDisplay");
   drawCircles(fS4, "circle", "intCastle" + pSide + "B", 145, 24 + y, 10, 0, "geometricPrecision", "GameDisplay");
   drawCircles(fS1, "circle", "midCastle" + pSide + "A", 145, 24 + y, 13, 7, "geometricPrecision", "GameDisplay");
   drawCircles(fS2, "circle", "midCastle" + pSide + "B", 145, 24 + y, 13, 5, "geometricPrecision", "GameDisplay");
   drawCircles(fS1, "circle", "extCastle" + pSide + "A", 145, 24 + y, 19, 7, "geometricPrecision", "GameDisplay");
   drawCircles(fS2, "circle", "extCastle" + pSide + "B", 145, 24 + y, 19, 5, "geometricPrecision", "GameDisplay");

   //black Bishop
   drawCircles(fS1, "circle", "midBishop" + pSide + "A", 40, 24 + y, 13, 7, "geometricPrecision", "GameDisplay");
   drawCircles(fS2, "circle", "midBishop" + pSide + "B", 40, 24 + y, 13, 5, "geometricPrecision", "GameDisplay");

   //black Rook
   drawCircles(fS3, "circle", "intRook" + pSide + "A", 90, 24 + y, 11, 0, "geometricPrecision", "GameDisplay");
   drawCircles(fS4, "circle", "intRook" + pSide + "B", 90, 24 + y, 10, 0, "geometricPrecision", "GameDisplay");

   letterer("count8", "text", "countBishop" + pSide, 35, 31 + y, "Helvetica", "normal", 19, "geometricPrecision", "GameDisplay", 8);
   letterer("count8", "text", "countRook" + pSide, 85, 31 + y, "Helvetica", "normal", 19, "geometricPrecision", "GameDisplay", 8);
   letterer("count8", "text", "countCastle" + pSide, 140, 31 + y, "Helvetica", "normal", 19, "geometricPrecision", "GameDisplay", 8);

   document.getElementById("countBishop" + pSide).setAttributeNS(null, "stroke-width", 0.5);
   document.getElementById("countBishop" + pSide).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");
   document.getElementById("countRook" + pSide).setAttributeNS(null, "stroke-width", 0.5);
   document.getElementById("countRook" + pSide).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");
   document.getElementById("countCastle" + pSide).setAttributeNS(null, "stroke-width", 0.5);
   document.getElementById("countCastle" + pSide).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");

}
drawCounterPieces("Top", 0, "whitePieceStrokeTransp", "blackPieceStroke", "whitePieceFillTransp", "blackPieceFill");
drawCounterPieces("Bot", 432, "blackPieceStrokeTransp", "whitePieceStroke", "blackPieceFillTransp", "whitePieceFill");

svger("disable", "rect", "butCountBishopTop", 40, 40, 20, 5, 0, "geometricPrecision", "GameDisplay", 2, 0, 11);
svger("disable", "rect", "butCountRookTop", 40, 40, 70, 5, 0, "geometricPrecision", "GameDisplay", 2, 0, 12);
svger("disable", "rect", "butCountCastleTop", 40, 40, 125, 5, 0, "geometricPrecision", "GameDisplay", 2, 0, 13);

svger("disable", "rect", "butCountBishopBot", 40, 40, 20, 436, 0, "geometricPrecision", "GameDisplay", 2, 0, 11);
svger("disable", "rect", "butCountRookBot", 40, 40, 70, 436, 0, "geometricPrecision", "GameDisplay", 2, 0, 12);
svger("disable", "rect", "butCountCastleBot", 40, 40, 125, 436, 0, "geometricPrecision", "GameDisplay", 2, 0, 13);
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

      } else if (k === "butOptionMini") { //learn castles
         opChoice = 0;
         popups(24, 49, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini1") {
         opChoice = 1;
         popups(1, 23, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini2") {
         opChoice = 2;
         popups(50, 57, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini3") {
         opChoice = 3;
         popups(58, 65, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini4") {
         opChoice = 4;
         popups(66, 73, 1, 6);
         soundRewind.play();

      } else if (k === "butOptionMini5") {
         opChoice = 5;
         popups(74, 81, 1, 6);
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
      } else if (Move > 3 && Turn === "b" && timeCounter < 540000) {
         if ((k === "butAddTimeTop" && VerseReverse === "wb") || (k === "butAddTimeBot" && VerseReverse === "bw")) {
            realClockB += 10000;
         }
      } else if (Move > 2 && Turn === "W" && timeCounter < 540000) {
         if ((k === "butAddTimeTop" && VerseReverse === "bw") || (k === "butAddTimeBot" && VerseReverse === "wb")) {
            realClockW += 10000;
         }
      }
   }
}
