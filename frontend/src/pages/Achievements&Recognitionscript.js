// Simulated data for achievements
const achievements = [
    { title: 'First-Time Champion', description: 'Congratulations on winning your first championship!', category: 'milestone', level: 'bronze', progress: 100 },
    { title: 'Highest Scoring Team', description: 'Achieved the highest weekly score.', category: 'weekly', level: 'silver', progress: 80 },
    { title: 'League MVP', description: 'Awarded as the most valuable player of the season.', category: 'standout', level: 'gold', progress: 100 },
    { title: '10 Wins', description: 'Achieved 10 wins in the season.', category: 'milestone', level: 'platinum', progress: 50 },
];

function loadAchievements() {
    const grid = document.getElementById('achievement-grid');
    grid.innerHTML = '';
    achievements.forEach(ach => {
        const card = document.createElement('div');
        card.className = 'achievement-card';
        card.dataset.category = ach.category;

        const icon = document.createElement('div');
        icon.className = `achievement-icon ${ach.level}`;
        card.appendChild(icon);

        const info = document.createElement('div');
        info.className = 'achievement-info';
        info.innerHTML = `<h3>${ach.title}</h3><p>${ach.description}</p>`;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `<span style="width: ${ach.progress}%"></span>`;
        info.appendChild(progressBar);

        card.appendChild(info);
        grid.appendChild(card);
    });
}

function filterAchievements(category) {
    const cards = document.querySelectorAll('.achievement-card');
    cards.forEach(card => {
        card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';
    });
}

// Load all achievements on page load
window.onload = loadAchievements;
