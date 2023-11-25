const form = document.querySelector('form');
const input = form.querySelector('input');
document.addEventListener('DOMContentLoaded', function () {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = input.value;
        localStorage.setItem('username', username);
        window.location.href = 'main.html';
    });
});

let savedUsername = localStorage.getItem('username');

if (!savedUsername || savedUsername.length === 0) {
    input.value = "";
} else {
    input.value = savedUsername;
}

function updateTable() {

    const scoreTable = document.getElementById('scoreTable');
    scoreTable.innerHTML = '';

    const records = JSON.parse(localStorage.getItem('records')) || [];

    records.sort((a, b) => b.score - a.score);

    records.forEach((record, index) => {
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        const usernameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        rankCell.textContent = index + 1;
        usernameCell.textContent = record.name;
        scoreCell.textContent = record.score;

        row.appendChild(rankCell);
        row.appendChild(usernameCell);
        row.appendChild(scoreCell);

        scoreTable.appendChild(row);
    });
}
window.addEventListener('load', updateTable);