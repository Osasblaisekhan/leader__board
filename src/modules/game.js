export default class Game {
  async startGame(name) {
    this.input = document.getElementById('input');
    this.input.innerHTML = '';
    const response = await fetch('https://leaderboard-api-tqaq.onrender.com/games', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }

  async addScore({ gameId, user, score }) {
    this.input = document.getElementById('input');
    this.input.innerHTML = '';

    await fetch('https://leaderboard-api-tqaq.onrender.com/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, user, score }),
    });
  }

  async getLeaderBoard() {
    this.input = document.getElementById('input');
    this.input.innerHTML = '';

    const response = await fetch('https://leaderboard-api-tqaq.onrender.com/scores');

    return response.json();
  }
}