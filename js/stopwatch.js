/*jshint esversion: 6 */

let GameCountdown;
let timeWLength = 180000; // 3 minutos
let timeBLength = 180000; // 3 minutos
let timeLength = 180000;

function updateCountdown() {
   if (Move > 2 && gameover === 0) {
      if (Turn === "W") {
         if (timeWLength > 0) {
            timeWLength -= 100;
            timeLength = timeWLength;

            if (timeWLength === 0) {
               gameover = 1;
            }

         }

      } else {
         if (timeBLength > 0) {
            timeBLength -= 100;
            timeLength = timeBLength;

            if (timeBLength === 0) {
               gameover = 1;
            }

         }

      }

      minutes = Math.floor(timeLength / 60000);
      if (minutes === 3) {
         seconds = 0;
      } else if (minutes === 2) {
         seconds = Math.floor((timeLength / 1000) - 120);
      } else if (minutes === 1) {
         seconds = Math.floor((timeLength / 1000) - 60);
      } else if (minutes === 0) {
         seconds = Math.floor(timeLength / 1000);

      }

      minutes = minutes < 1 ? "00" : "0" + minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      miliseconds = timeLength < 10000 ? (timeLength - (seconds * 1000)) / 100 : "";

      if (Turn === "W") {
         document.getElementById("digitMinutsW").textContent = minutes;
         document.getElementById("digitSecondsW").textContent = seconds;
         document.getElementById("digitMilisecondsW").textContent = miliseconds;

      } else {
         document.getElementById("digitMinutsB").textContent = minutes;
         document.getElementById("digitSecondsB").textContent = seconds;
         document.getElementById("digitMilisecondsB").textContent = miliseconds;

      }

   } else if (Move === 1 && gameover === 0) {
      document.getElementById("digitMinutsW").textContent = "03";
      document.getElementById("digitSecondsW").textContent = "00";
      document.getElementById("digitMilisecondsW").textContent = "";
      document.getElementById("digitMinutsB").textContent = "03";
      document.getElementById("digitSecondsB").textContent = "00";
      document.getElementById("digitMilisecondsB").textContent = "";
   }

   if (timeLength === 10000) {
      soundTimeout.play();
   } else if (timeLength === 5000) {
      soundTimeout.play();
   } else if (timeLength < 1000) {
      soundTimeout.play();
   }

   if (gameover === 1) {
      clearInterval(GameCountdown);
   }

}

GameCountdown = setInterval(updateCountdown, 100);
