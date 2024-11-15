// Expand/collapse matchup details
function toggleMatchupDetails(element) {
    const details = element.querySelector('.matchup-details');
    if (details.style.display === 'block') {
        details.style.display = 'none';
    } else {
        details.style.display = 'block';
    }
}

// Post a new message to the message board
function postMessage() {
    const input = document.getElementById('messageInput');
    const messageList = document.getElementById('messageList');
    if (input.value.trim() !== '') {
        const message = document.createElement('p');
        message.textContent = input.value;
        message.classList.add('message');
        messageList.appendChild(message);
        input.value = '';
    }
}

// Navigate back to the League Hub
function goBack() {
    window.location.href = 'league_hub.html'; // Change to the actual URL of the League Hub
}
