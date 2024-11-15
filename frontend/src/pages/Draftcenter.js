// Timer Countdown for Draft Clock
const clockElement = document.getElementById("clock");
let draftTime = 60; // 60 seconds

function startDraftClock() {
    const timer = setInterval(() => {
        let minutes = Math.floor(draftTime / 60);
        let seconds = draftTime % 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        clockElement.textContent = `${minutes}:${seconds}`;

        if (draftTime === 0) {
            clearInterval(timer);
            clockElement.textContent = "Time's Up!";
        } else {
            draftTime--;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    startDraftClock();
});
