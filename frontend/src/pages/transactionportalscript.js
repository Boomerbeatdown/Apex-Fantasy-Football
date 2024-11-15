// Open modal
function openModal(modalId) {
    document.getElementById(modalId + '-modal').style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId + '-modal').style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
