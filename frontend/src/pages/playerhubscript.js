// script.js

// Back to League Hub
function backToLeagueHub() {
    alert("Returning to League Hub...");
}

// Player Rankings
document.getElementById("overall-rank-btn").addEventListener("click", () => {
    document.getElementById("ranking-display").textContent = "Overall Rankings: Player X, Player Y, Player Z.";
});

document.getElementById("position-rank-btn").addEventListener("click", () => {
    document.getElementById("ranking-display").textContent = "Positional Rankings: QB1, RB1, WR1.";
});

document.getElementById("projection-rank-btn").addEventListener("click", () => {
    document.getElementById("ranking-display").textContent = "Projection Rankings: Player A, Player B, Player C.";
});

// Performance Trend Graph (Mock Graph Using Chart.js)
const ctx = document.getElementById("trendGraph").getContext("2d");
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [{
            label: "Points Scored",
            data: [10, 15, 20, 25],
            backgroundColor: "rgba(0, 255, 204, 0.2)",
            borderColor: "#00ffcc",
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});
