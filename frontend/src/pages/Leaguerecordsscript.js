// Sample Data for Table
const sampleData = [
    { year: 2024, team: "Team A", wins: 12, losses: 4, trades: 5, waivers: 10 },
    { year: 2023, team: "Team B", wins: 10, losses: 6, trades: 8, waivers: 12 },
    { year: 2022, team: "Team C", wins: 8, losses: 8, trades: 10, waivers: 15 },
];

const dataBody = document.getElementById('data-body');

// Populate Table with Data
sampleData.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${record.year}</td>
        <td>${record.team}</td>
        <td>${record.wins}</td>
        <td>${record.losses}</td>
        <td>${record.trades}</td>
        <td>${record.waivers}</td>
    `;
    dataBody.appendChild(row);
});

// Scroll to Top Functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
