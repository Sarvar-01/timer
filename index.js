
const INTERVAL_MS = 1000 / 60;
let timerID;
let lastTimerStartTime = 0;
let millisElapsedBeforeLastStart = 0;


const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");


startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimers);


function startTimer() {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;

    lastTimerStartTime = Date.now();
    timerID = setInterval(updateTimer, INTERVAL_MS);
}


function stopTimer() {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;

    millisElapsedBeforeLastStart += Date.now() - lastTimerStartTime;
    clearInterval(timerID);
}


function resetTimers() {
    resetButton.disabled = true;
    timer.textContent = "00:00:00";
    millisElapsedBeforeLastStart = 0;
}


function updateTimer() {
    const milllisElapsed =
        Date.now() - lastTimerStartTime + millisElapsedBeforeLastStart;
    const secondsElapsed = milllisElapsed / 1000;
    const minutesElapsed = secondsElapsed / 60;

    const millisText = formateNumber(milllisElapsed % 1000, 3);
    const secondsText = formateNumber(Math.floor(secondsElapsed) % 60, 2);
    const minutesText = formateNumber(Math.floor(minutesElapsed), 2);
    timer.textContent = `${minutesText}:${secondsText}:${millisText}`;
}


function formateNumber(number, desiredLength) {
    const stringNumber = String(number);
    if (stringNumber.length > desiredLength) {
        return stringNumber.slice(0, desiredLength);
    }

    return stringNumber.padStart(desiredLength, "0");
}

