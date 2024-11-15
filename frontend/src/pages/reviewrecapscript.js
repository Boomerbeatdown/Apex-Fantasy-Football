// Toggle detailed recap view
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => {
        const recapId = button.dataset.id;
        const recap = document.getElementById(`recap-${recapId}`);
        recap.style.display = recap.style.display === 'block' ? 'none' : 'block';
    });
});

// Add to favorites functionality
document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Added Review ${button.dataset.id} to Favorites!`);
    });
});

// Search bar functionality
document.getElementById('searchBar').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const reviews = document.querySelectorAll('.review-card');
    reviews.forEach(review => {
        const title = review.querySelector('.review-title').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            review.style.display = 'block';
        } else {
            review.style.display = 'none';
        }
    });
});
