// Placeholder for updating live scores and data
function updateLiveScores() {
    // Simulate a score update
    document.querySelectorAll('.live-score').forEach(score => {
        let newScore = Math.floor(Math.random() * 50);
        score.innerText = newScore;
    });
    setTimeout(updateLiveScores, 3000); // Repeat every 3 seconds
}

// Placeholder function for chat interaction
function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");

    if (chatInput.value.trim() !== "") {
        const message = document.createElement("div");
        message.textContent = chatInput.value;
        chatBox.appendChild(message);
        chatInput.value = ""; // Clear the input after sending
    }
}

// Redirect function for back button
function backToLeagueHub() {
    window.location.href = "leagueHub.html"; // Update with the correct link
}

// Start live updates on page load
document.addEventListener("DOMContentLoaded", () => {
    updateLiveScores();
});
