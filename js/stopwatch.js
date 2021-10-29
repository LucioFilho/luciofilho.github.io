let GameCountdown;
let lockB = false;
let lockRealTime = false;
let lockW = false;
let realClock = 0;
let realClockB = 0;
let realClockW = 0;
let realDays = 0;
let realHours = 0;
let realMilliseconds = 0;
let realMinutes = 0;
let realSeconds = 0;
let realTime = new Date();
let timeBLength = 1800000; // 30 minutos
let timeBOff = 0;
let timeBOffset = 0;
let timeCounter = 1800000;
let timelapseB = 0;
let timelapseW = 0;
let timeLength = 1800000;
let timeWLength = 1800000; // 30 minutos
let timeWOff = 0;
let timeWOffset = 0;
let wTurn = 0;
let bTurn = 0;

function updateCountdown() {

   // get match starting time
   if (lockRealTime === false && Move === 3) {
      realTime = new Date();
      realDays = (realTime.getDay() - 1) * 24 * 3600000;
      realHours = realTime.getHours() * 3600000;
      realMinutes = realTime.getMinutes() * 60000;
      realSeconds = realTime.getSeconds() * 1000;
      realMilliseconds = realTime.getMilliseconds();

      realClock = realDays + realHours + realMinutes + realSeconds + realMilliseconds;
      realClockW = realDays + realHours + realMinutes + realSeconds + realMilliseconds;
      realClockB = realDays + realHours + realMinutes + realSeconds + realMilliseconds;

      lockRealTime = true;

   }

   // get realtime
   let checkTime = new Date();
   let checkDays = (checkTime.getDay() - 1) * 24 * 3600000;
   if (checkDays < realDays) {
      checkDays = realDays + (checkTime.getDay() - 1) * 24 * 3600000;
   }
   let checkHours = checkTime.getHours() * 3600000;
   let checkMinutes = checkTime.getMinutes() * 60000;
   let checkSeconds = checkTime.getSeconds() * 1000;
   let checkMilliseconds = checkTime.getMilliseconds();
   let checkWClock = checkDays + checkHours + checkMinutes + checkSeconds + checkMilliseconds - timeWOffset;
   let checkBClock = checkDays + checkHours + checkMinutes + checkSeconds + checkMilliseconds - timeBOffset;

   if (Move > 2 && gameover === 0) {

      if (Turn === "W") {

         if (!lockW) {
            timeWOffset += timeWOff;

            checkWClock = checkDays + checkHours + checkMinutes + checkSeconds + checkMilliseconds - timeWOffset;

            timeLength = checkWClock - realClockW;

            if (timeLength < timeWLength) {
               timeCounter = timeWLength - timeLength;
               if (timeCounter < 10000) {
                  timeWOffset += 10000 - timeCounter;
                  checkWClock = checkDays + checkHours + checkMinutes + checkSeconds + checkMilliseconds - timeWOffset;
               }
            }

            timelapseB = checkWClock;
            wTurn = timeWLength - (checkWClock - realClockW);

         }
         lockW = true;
         lockB = false;

         timeLength = checkWClock - realClockW;
         timeBOff = checkWClock - timelapseB;

         if (timeLength < timeWLength) {
            timeCounter = timeWLength - timeLength;
         } else {
            timeCounter = 0;
            gameover = 1;
            winner = "black";
            loserPiecesTransp();
         }

      } else {

         if (!lockB) {
            timeBOffset += timeBOff;

            checkBClock = checkDays + checkHours + checkMinutes + checkSeconds + checkMilliseconds - timeBOffset;

            timeLength = checkBClock - realClockB;
            if (timeLength < timeBLength) {
               timeCounter = timeBLength - timeLength;
               if (timeCounter < 10000) {
                  timeBOffset += 10000 - timeCounter;
                  checkBClock = checkDays + checkHours + checkMinutes + checkSeconds + checkMilliseconds - timeBOffset;
               }
            }

            timelapseA = checkBClock;
            bTurn = timeBLength - (checkBClock - realClockB);
         }
         lockB = true;
         lockW = false;

         timeLength = checkBClock - realClockB;
         timeWOff = checkBClock - timelapseA;

         if (timeLength < timeBLength) {
            timeCounter = timeBLength - timeLength;
         } else {
            timeCounter = 0;
            gameover = 1;
            winner = "white";
            loserPiecesTransp();
         }
      }

      minutes = Math.floor(timeCounter / 60000);
      seconds = Math.floor((timeCounter / 1000) - (minutes * 60));

      minutes = minutes < 1 ? "00" : "0" + Math.floor(minutes);
      seconds = seconds < 10 ? "0" + Math.floor(seconds) : Math.floor(seconds);
      miliseconds = timeCounter < 10000 ? Math.floor((timeCounter - (seconds * 1000)) / 100) : "";

      if (Turn === "W") {
         document.getElementById("digitMinutsW").textContent = minutes;
         document.getElementById("digitSecondsW").textContent = seconds;
         document.getElementById("digitMilisecondsW").textContent = miliseconds;

         if (VerseReverse === "wb") {
            document.getElementById("botTimeline").setAttributeNS(null, "width", 2.8 * (100 / (wTurn / timeCounter)));
            document.getElementById("topTimeline").setAttributeNS(null, "width", 280);

            document.getElementById("botTimeline").setAttributeNS(null, "fill", "rgba(" + (255 - (2.55 * (100 / (wTurn / timeCounter)))) + ", " + 2.55 * (100 / (wTurn / timeCounter)) + ", 0, 1.0)");
            fillerStroker("blackSquare");
            document.getElementById("topTimeline").setAttributeNS(null, "fill", Filler);

         } else {
            document.getElementById("topTimeline").setAttributeNS(null, "width", 2.8 * (100 / (wTurn / timeCounter)));
            document.getElementById("botTimeline").setAttributeNS(null, "width", 280);

            document.getElementById("topTimeline").setAttributeNS(null, "fill", "rgba(" + (255 - (2.55 * (100 / (wTurn / timeCounter)))) + ", " + 2.55 * (100 / (wTurn / timeCounter)) + ", 0, 1.0)");
            fillerStroker("blackSquare");
            document.getElementById("botTimeline").setAttributeNS(null, "fill", Filler);

         }

      } else {
         document.getElementById("digitMinutsB").textContent = minutes;
         document.getElementById("digitSecondsB").textContent = seconds;
         document.getElementById("digitMilisecondsB").textContent = miliseconds;

         if (VerseReverse === "wb") {
            document.getElementById("topTimeline").setAttributeNS(null, "width", 2.8 * (100 / (bTurn / timeCounter)));
            document.getElementById("botTimeline").setAttributeNS(null, "width", 280);

            document.getElementById("topTimeline").setAttributeNS(null, "fill", "rgba(" + (255 - (2.55 * (100 / (bTurn / timeCounter)))) + ", " + 2.55 * (100 / (bTurn / timeCounter)) + ", 0, 1.0)");
            fillerStroker("blackSquare");
            document.getElementById("botTimeline").setAttributeNS(null, "fill", Filler);

         } else {
            document.getElementById("botTimeline").setAttributeNS(null, "width", 2.8 * (100 / (bTurn / timeCounter)));
            document.getElementById("topTimeline").setAttributeNS(null, "width", 280);

            document.getElementById("botTimeline").setAttributeNS(null, "fill", "rgba(" + (255 - (2.55 * (100 / (bTurn / timeCounter)))) + ", " + 2.55 * (100 / (bTurn / timeCounter)) + ", 0, 1.0)");
            fillerStroker("blackSquare");
            document.getElementById("topTimeline").setAttributeNS(null, "fill", Filler);

         }

      }

   } else if (Move === 1 && gameover === 0) {
      lockRealTime = false;
      timeWOffset = 0;
      timeBOffset = 0;
      timelapseB = 0;
      timelapseW = 0;
      timeWOff = 0;
      timeBOff = 0;
      lockW = false;
      lockB = false;
      document.getElementById("digitMinutsW").textContent = "03";
      document.getElementById("digitSecondsW").textContent = "00";
      document.getElementById("digitMilisecondsW").textContent = "";
      document.getElementById("digitMinutsB").textContent = "03";
      document.getElementById("digitSecondsB").textContent = "00";
      document.getElementById("digitMilisecondsB").textContent = "";
   }

   if (Math.floor(timeCounter) < 10000 && Math.floor(timeCounter) > 9500) {
      soundTimeout.play();
   } else if (Math.floor(timeCounter) < 5000 && Math.floor(timeCounter) > 4500) {
      soundTimeout.play();
   } else if (Math.floor(timeCounter) < 1000) {
      soundTimeout.play();
   }

   if (gameover === 1) {
      clearInterval(GameCountdown);
   }

}

GameCountdown = setInterval(updateCountdown, 100);
