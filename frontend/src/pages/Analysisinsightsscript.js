document.addEventListener("DOMContentLoaded", () => {
    // Placeholder function to populate player dropdowns (assuming a data array of player names)
    const players = ["Player A", "Player B", "Player C", "Player D"];
    const player1Select = document.getElementById("player1");
    const player2Select = document.getElementById("player2");

    players.forEach(player => {
        const option1 = document.createElement("option");
        option1.textContent = player;
        player1Select.appendChild(option1);

        const option2 = document.createElement("option");
        option2.textContent = player;
        player2Select.appendChild(option2);
    });
});

// Function to handle player comparison (placeholder functionality)
function comparePlayers() {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    if (player1 !== "Select Player 1" && player2 !== "Select Player 2") {
        alert(`Comparing ${player1} and ${player2}`);
        // Placeholder for actual comparison logic (e.g., fetching data and visualizing it)
    } else {
        alert("Please select both players to compare.");
    }
}
