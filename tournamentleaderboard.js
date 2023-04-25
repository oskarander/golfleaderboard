import axios from 'axios';

const leaderboardApp = document.getElementById('leaderboard-app');

const fetchLeaderboard = async () => {
    try {
        const response = await axios.get('https://golf-leaderboard-data.p.rapidapi.com/leaderboard/501', {
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': '5bafd4ae9fmsh7104b6d78f98516p1b2e71jsn9b72b95b1cfc', // Replace with your own RapidAPI key
                'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com',
            },
        });

        const leaderboard = response.data.results.leaderboard;
        return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return [];
    }
};

const renderLeaderboardApp = (leaderboard) => {
    leaderboardApp.innerHTML = `
        <div class="leaderboard">
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Total Strokes</th>
                        <th>Total To Par</th>
                    </tr>
                </thead>
                <tbody>
                    ${leaderboard.map(player => `
                        <tr>
                            <td>${player.position}</td>
                            <td>${player.first_name} ${player.last_name}</td>
                            <td>${player.country}</td>
                            <td>${player.strokes}</td>
                            <td>${player.total_to_par}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

const initLeaderboardApp = async () => {
    const leaderboard = await fetchLeaderboard();
    renderLeaderboardApp(leaderboard);
};

initLeaderboardApp();
