/*jshint esversion: 6 */

//arc
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
   var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

   return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
   };
}

function describeArc(x, y, radius, startAngle, endAngle) {

   var start = polarToCartesian(x, y, radius, endAngle);
   var end = polarToCartesian(x, y, radius, startAngle);

   var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

   var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
   ].join(" ");

   return d;
}

function drawIconFlipBoard(drawID, arcStroke, setColor) {
   fillerStroker(setColor);
   const path1 = document.createElementNS(SvgNS, "path");
   path1.setAttributeNS(null, "id", drawID);
   path1.setAttributeNS(null, "fill", "rgba(0,0,0,0)");
   path1.setAttributeNS(null, "stroke", Stroker);
   path1.setAttributeNS(null, "stroke-width", arcStroke);
   path1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   GameDisplay.appendChild(path1);
}

//buttons
function drawObjects(drawID, w, h, x, y, setColor, b) {
   fillerStroker(setColor);
   const shape1 = document.createElementNS(SvgNS, "rect");
   shape1.setAttributeNS(null, "id", drawID);
   shape1.setAttributeNS(null, "width", w);
   shape1.setAttributeNS(null, "height", h);
   shape1.setAttributeNS(null, "x", x);
   shape1.setAttributeNS(null, "y", y);
   shape1.setAttributeNS(null, "fill", Stroker);
   shape1.setAttributeNS(null, "stroke-width", 0);
   shape1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   GameDisplay.appendChild(shape1);
   if (b === 1) {
      const el = document.getElementById(drawID);
      el.onclick = function(event) {
         displayActions(drawID);
      };
      el.onmouseover = function(event) {
         fillerStroker("blackSquare");
         document.getElementById(drawID + "BG").setAttributeNS(null, "fill", Filler);
      };
      el.onmousedown = function(event) {
         fillerStroker("lightWhiteColor");
         document.getElementById(drawID + "BG").setAttributeNS(null, "fill", Filler);
      };
      el.onmouseup = function(event) {
         fillerStroker("blackSquare");
         document.getElementById(drawID + "BG").setAttributeNS(null, "fill", Filler);
      };
      el.onmouseout = function(event) {
         fillerStroker("whiteSquare");
         document.getElementById(drawID + "BG").setAttributeNS(null, "fill", Filler);
      };
   }
}

function drawIcons(drawID, pPoints, setColor) {
   fillerStroker(setColor);
   const polygon1 = document.createElementNS(SvgNS, "polygon");
   polygon1.setAttributeNS(null, "id", drawID);
   polygon1.setAttributeNS(null, "points", pPoints);
   polygon1.setAttributeNS(null, "fill", Stroker);
   polygon1.setAttributeNS(null, "stroke-width", 0);
   polygon1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
   GameDisplay.appendChild(polygon1);
}

drawObjects("topTime", 150, 60, 20, 50, "whiteSquare", 0);
drawObjects("topTimeline", 280, 4, 20, 110, "blackSquare", 0);
drawObjects("botTime", 150, 60, 20, 370, "whiteSquare", 0);
drawObjects("botTimeline", 280, 4, 20, 366, "blackSquare", 0);
drawObjects("botButsline", 280, 2, 20, 150, "blackSquare", 0);

//buttons
drawObjects("butFlipBoardBG", 56, 36, 20, 114, "whiteSquare", 0);
drawObjects("butMoveToStartBG", 56, 36, 76, 114, "whiteSquare", 0);
drawObjects("butStepBackBG", 56, 36, 132, 114, "whiteSquare", 0);
drawObjects("butStepForwardBG", 56, 36, 188, 114, "whiteSquare", 0);
drawObjects("butMoveToEndBG", 56, 36, 244, 114, "whiteSquare", 0);


//button Step Forward
let pPoints = "220,131 220,123 222,123 222,139 220,139 220,131, 211,139 211,123";
drawIcons("iconStepForward", pPoints, "lightWhiteColor");

//button Stepback
pPoints = "284,131 284,123 282,123 282,139 284,139 284,131, 293,139 293,123";
drawIcons("iconStepBack", pPoints, "lightWhiteColor");
document.getElementById("iconStepBack").setAttributeNS(null, "transform", "translate(-127,0)");


//button move to end
pPoints = "280,131 280,123 282,123 282,139 280,139 280,131, 271,139 271,131, 262,139, 262,123 271,131 271,123";
drawIcons("iconMoveToEnd", pPoints, "lightWhiteColor");

//button move to start
pPoints = "284,131 284,123 282,123 282,139 284,139 284,131, 293,139 293,131, 302,139, 302,123 293,131 293,123";
drawIcons("iconMoveToStart", pPoints, "lightWhiteColor");
document.getElementById("iconMoveToStart").setAttributeNS(null, "transform", "translate(-188,0)");

//flip board icon
drawIconFlipBoard("arcIconTop", 3, "greyColor");
document.getElementById("arcIconTop").setAttribute("d", describeArc(48, 132, 12, -90, 90));
drawIconFlipBoard("arcIconBot", 3, "lightWhiteColor");
document.getElementById("arcIconBot").setAttribute("d", describeArc(48, 132, 12, 90, 270));

//buttons with actions
drawObjects("butFlipBoard", 56, 36, 20, 114, "disable", 1);
drawObjects("butMoveToStart", 56, 36, 76, 114, "disable", 1);
drawObjects("butStepBack", 56, 36, 132, 114, "disable", 1);
drawObjects("butStepForward", 56, 36, 188, 114, "disable", 1);
drawObjects("butMoveToEnd", 56, 36, 244, 114, "disable", 1);

//displayActions
function displayActions(k) {
   if (k === "butFlipBoard" && LockFlipBoard === 0) {
      reversePieces();
   } else if (k === "butStepBack") {
      if (MoveWatch > 0 && LockFlipBoard === 0) {
         backForward("left");
         soundRewind.play();
      }
   } else if (k === "butStepForward") {
      if (MoveWatch < Move - 1 && LockFlipBoard === 0) {
         backForward("right");
         soundRewind.play();
      }
   } else if (k === "butMoveToEnd") {
      if (MoveWatch < Move - 1 && LockFlipBoard === 0) {
         backForward("end");
         soundRewind.play();
      }
   } else if (k === "butMoveToStart") {
      if (MoveWatch > 0 && LockFlipBoard === 0) {
         backForward("start");
         soundRewind.play();
      }
   }
}
