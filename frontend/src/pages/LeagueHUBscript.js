// Countdown Timer
const countdown = document.getElementById('countdown');
const eventTime = new Date().getTime() + (1000 * 60 * 60 * 24); // example: 24 hours from now

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerText = `${hours}:${minutes}:${seconds}`;
    if (distance < 0) countdown.innerText = "Event Started!";
}

setInterval(updateCountdown, 1000);

// Simulate Live Game Tracking
let livePoints = 0;
const livePointsEl = document.getElementById('live-points');

function updateLivePoints() {
    livePoints += Math.floor(Math.random() * 5); // Random points increment
    livePointsEl.innerText = livePoints;
}

setInterval(updateLivePoints, 5000); // Update every 5 seconds

// Simulate Predicted Outcome
const predictedOutcomeEl = document.getElementById('predicted-outcome');
predictedOutcomeEl.innerText = `${Math.floor(Math.random() * 100)}%`;
