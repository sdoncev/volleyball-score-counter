const pointSequence = [];

const blueTeamButton = document.querySelector('.blue-team-btn');
const redTeamButton = document.querySelector('.red-team-btn');

const resetScoreBtn = document.querySelector('.reset-score-btn');

const blueProgressBar = document.querySelector('.blue-team-progress-bar .progress-bar-fill');
const redProgressBar = document.querySelector('.red-team-progress-bar .progress-bar-fill');

let targetScore = Number(document.querySelector('.target-score-input').value);

blueTeamButton.addEventListener('click', (e) => {
  const newScore = Number(e.target.innerHTML) + 1;
  e.target.innerHTML = newScore;
  pointSequence.push('b');
  renderTeamProgressBar(blueProgressBar, newScore);
  renderPointSequence();
});

redTeamButton.addEventListener('click', (e) => {
  const newScore = Number(e.target.innerHTML) + 1;
  e.target.innerHTML = newScore;
  pointSequence.push('r');
  renderTeamProgressBar(redProgressBar, newScore);
  renderPointSequence();
});

resetScoreBtn.addEventListener('click', () => {
  blueTeamButton.innerHTML = 0;
  redTeamButton.innerHTML = 0;
  pointSequence.length = 0;     // clear score sequence for new game
  renderTeamProgressBar(blueProgressBar, 0);
  renderTeamProgressBar(redProgressBar, 0);
  renderPointSequence();
});

function getTeamPointsProgress(points) {
  return Math.round(points / targetScore * 100);
}

function renderTeamProgressBar(progressBarElem, points) {
  progressBarElem.style.width = `${getTeamPointsProgress(points)}%`;
}

function renderPointSequence() {
  document.querySelector('.point-sequence').innerHTML = '';

  pointSequence.forEach((point) => {
    const pointIcon = document.createElement('div');
    pointIcon.classList.add(point === 'b' ? 'blue-point-icon' : 'red-point-icon');
    document.querySelector('.point-sequence').appendChild(pointIcon);
  })
}