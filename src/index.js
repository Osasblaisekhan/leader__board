import './style.css';
import Game from './modules/game.js';
import Display from './modules/display.js';

const refreshBtn = document.getElementById('refresh-Btn');

const scoreForm = document.getElementById('score-form');
const nameInput = document.getElementById('input-name');
const scoreInput = document.getElementById('input-score');

nameInput.value = '';

scoreInput.value = '';

const game = new Game();

const display = new Display();

let gameId;

if (module.hot) {
  module.hot.accept();
}

const getLeaderBoard = () => {
  game.getLeaderBoard()
    .then((res) => {
      display.renderToPage(res);
    });
};

const addScore = (Event) => {
  const score = {
    gameId,
    user: nameInput.value,
    score: scoreInput.value,
  };
  Event.preventDefault();

  game.addScore(score)
    .then(() => {
      getLeaderBoard();
      display.cleanPageInputs();
    });
};

const timeDisplay = (time) => {
  const timeprop = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return time.toLocaleString('en-US', timeprop);
};

setInterval(() => {
  const d = new Date();
  const Time = document.getElementById('time');
  Time.innerHTML = timeDisplay(d);
});

scoreForm.addEventListener('submit', addScore);
scoreForm.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addScore();
  }
});

refreshBtn.addEventListener('click', getLeaderBoard);

const startGame = () => {
  game.startGame('Football tournament')
    .then((response) => {
      gameId = response.id;
      getLeaderBoard();
    });
};

document.addEventListener('DOMContentLoaded', startGame);