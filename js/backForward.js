/*jshint esversion: 6 */

function iconsSetColor() {

   //set icon colors. enable/disable buttons
   if (MoveWatch === 0) {
      fillerStroker("lightWhiteColor");
      document.getElementById("iconStepBack").setAttributeNS(null, "fill", Filler);
      document.getElementById("iconMoveToStart").setAttributeNS(null, "fill", Filler);
   } else {
      fillerStroker("greyColor");
      document.getElementById("iconStepBack").setAttributeNS(null, "fill", Filler);
      document.getElementById("iconMoveToStart").setAttributeNS(null, "fill", Filler);
   }

   if (MoveWatch === Move - 1) {
      fillerStroker("lightWhiteColor");
      document.getElementById("iconStepForward").setAttributeNS(null, "fill", Filler);
      document.getElementById("iconMoveToEnd").setAttributeNS(null, "fill", Filler);
   } else {
      fillerStroker("greyColor");
      document.getElementById("iconStepForward").setAttributeNS(null, "fill", Filler);
      document.getElementById("iconMoveToEnd").setAttributeNS(null, "fill", Filler);
   }

}

function backForwardColoring(p, q, landing, but) {
   let pSq = landing;
   let Xpos = parseInt(document.getElementById("butSquare" + but).getAttributeNS(null, "x")) + 30;
   let Ypos = parseInt(document.getElementById("butSquare" + but).getAttributeNS(null, "y")) + 30;

   //coloring pieces
   document.getElementById(p + "A" + pSq).setAttributeNS(null, q, Stroker);
   document.getElementById(p + "B" + pSq).setAttributeNS(null, q, Filler);

   //positioning pieces
   document.getElementById(p + "A" + pSq).setAttributeNS(null, "cx", Xpos);
   document.getElementById(p + "B" + pSq).setAttributeNS(null, "cx", Xpos);
   document.getElementById(p + "A" + pSq).setAttributeNS(null, "cy", Ypos);
   document.getElementById(p + "B" + pSq).setAttributeNS(null, "cy", Ypos);
}

function backForward(side) {
   if (side === "left") {
      MoveWatch--;
      moveMarks();
   } else if (side === "right") {
      MoveWatch++;
      moveMarks();
   } else if (side === "end") {
      MoveWatch = Move - 1;
      moveMarks();
   } else if (side === "start") {
      MoveWatch = 0;
      moveMarks();
   } else if (side === "takeback") {
      MoveWatch--;
      moveMarks();
   }

   if (side !== "takeback") {
      iconsSetColor();
   }

   //set every piece transparent
   let i = 0;
   fillerStroker("disable");
   while (i < 8) {

      i++;
      document.getElementById("extA" + i).setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extB" + i).setAttributeNS(null, "stroke", Filler);
      document.getElementById("midA" + i).setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midB" + i).setAttributeNS(null, "stroke", Filler);
      document.getElementById("intA" + i).setAttributeNS(null, "fill", Stroker);
      document.getElementById("intB" + i).setAttributeNS(null, "fill", Filler);
   }
   i = 56;
   while (i < 64) {

      i++;
      document.getElementById("extA" + i).setAttributeNS(null, "stroke", Stroker);
      document.getElementById("extB" + i).setAttributeNS(null, "stroke", Filler);
      document.getElementById("midA" + i).setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midB" + i).setAttributeNS(null, "stroke", Filler);
      document.getElementById("intA" + i).setAttributeNS(null, "fill", Stroker);
      document.getElementById("intB" + i).setAttributeNS(null, "fill", Filler);
   }

   i = 71;
   while (i < 87) {
      document.getElementById("midA" + i).setAttributeNS(null, "stroke", Stroker);
      document.getElementById("midB" + i).setAttributeNS(null, "stroke", Filler);
      document.getElementById("intA" + i).setAttributeNS(null, "fill", Stroker);
      document.getElementById("intB" + i).setAttributeNS(null, "fill", Filler);

      i++;
   }

   //repositioning all pieces
   i = 0;
   while (i < 64) {
      if (TurnsPiecesPosition[MoveWatch][i] !== "O" && TurnsPiecesPosition[MoveWatch][i] === TurnsPiecesPosition[MoveWatch][i].toUpperCase()) {
         fillerStroker("white");

         if (extMoves[MoveWatch][i] !== 0) {
            backForwardColoring("ext", "stroke", extMoves[MoveWatch][i], i + 1);
         }
         if (midMoves[MoveWatch][i] !== 0) {
            backForwardColoring("mid", "stroke", midMoves[MoveWatch][i], i + 1);
         }
         if (intMoves[MoveWatch][i] !== 0) {
            backForwardColoring("int", "fill", intMoves[MoveWatch][i], i + 1);
         }
      }

      if (TurnsPiecesPosition[MoveWatch][i] !== "O" && TurnsPiecesPosition[MoveWatch][i] === TurnsPiecesPosition[MoveWatch][i].toLowerCase()) {
         fillerStroker("black");

         if (extMoves[MoveWatch][i] !== 0) {
            backForwardColoring("ext", "stroke", extMoves[MoveWatch][i], i + 1);
         }
         if (midMoves[MoveWatch][i] !== 0) {
            backForwardColoring("mid", "stroke", midMoves[MoveWatch][i], i + 1);
         }
         if (intMoves[MoveWatch][i] !== 0) {
            backForwardColoring("int", "fill", intMoves[MoveWatch][i], i + 1);
         }
      }

      i++;
   }

   if (MoveWatch === Move - 1) {
      castlesInCheck();
   }

}

function moveMarks() {
   if (MoveWatch > 0) {
      mMLeaving1x = parseInt(document.getElementById("butSquare" + MMovesLeaving[MoveWatch - 1]).getAttributeNS(null, "x"));
      mMLeaving1y = parseInt(document.getElementById("butSquare" + MMovesLeaving[MoveWatch - 1]).getAttributeNS(null, "y"));
      mMLanding2x = parseInt(document.getElementById("butSquare" + MMovesLanding[MoveWatch - 1]).getAttributeNS(null, "x"));
      mMLanding2y = parseInt(document.getElementById("butSquare" + MMovesLanding[MoveWatch - 1]).getAttributeNS(null, "y"));
   } else if (MoveWatch === 0) {
      mMLeaving1x = 1000;
      mMLeaving1y = 1000;
      mMLanding2x = 1000;
      mMLanding2y = 1000;
   }

   document.getElementById("mMove1").setAttributeNS(null, "x", mMLeaving1x);
   document.getElementById("mMove1").setAttributeNS(null, "y", mMLeaving1y);
   document.getElementById("mMove2").setAttributeNS(null, "x", mMLanding2x);
   document.getElementById("mMove2").setAttributeNS(null, "y", mMLanding2y);
}
