const pointSequence = [];
const undone = [];

const blueTeamButton = document.querySelector('.blue-team-btn');
const redTeamButton = document.querySelector('.red-team-btn');

const resetScoreBtn = document.querySelector('.reset-score-btn');

const blueProgressBar = document.querySelector('.blue-team-progress-bar .progress-bar-fill');
const redProgressBar = document.querySelector('.red-team-progress-bar .progress-bar-fill');

let targetScore = Number(document.querySelector('.target-score-input').value);

blueTeamButton.addEventListener('click', (e) => {
  pointSequence.push('blue');
  const newScore = Number(e.target.innerHTML) + 1;
  e.target.innerHTML = newScore;
  renderServeIcon();
  renderTeamProgressBar(blueProgressBar, newScore);
  renderPointSequence();
});

redTeamButton.addEventListener('click', (e) => {
  pointSequence.push('red');
  const newScore = Number(e.target.innerHTML) + 1;
  e.target.innerHTML = newScore;
  renderServeIcon();
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
  renderServeIcon();
});

document.querySelector('.undo-button').addEventListener('click', () => {
  if (pointSequence.length) {
    const previousPoint = pointSequence.pop();
    undone.push(previousPoint);
    const newScore = aggregatePoints(previousPoint);
    renderPointSequence();
    renderServeIcon();

    if (previousPoint === 'blue') {
      blueTeamButton.innerHTML = newScore;
      renderTeamProgressBar(blueProgressBar, newScore);
    } else {
      redTeamButton.innerHTML = newScore;
      renderTeamProgressBar(redProgressBar, newScore);
    }
  } else {
    console.log('No points to undo.')
  }
});

document.querySelector('.redo-button').addEventListener('click', () => {
  if (undone.length) {
    const redo = undone.pop();
    pointSequence.push(redo);
    const newScore = aggregatePoints(redo);
    renderPointSequence();
    renderServeIcon();

    if (redo === 'blue') {
      blueTeamButton.innerHTML = newScore;
      renderTeamProgressBar(blueProgressBar, newScore);
    } else {
      redTeamButton.innerHTML = newScore;
      renderTeamProgressBar(redProgressBar, newScore);
    }
  } else {
    console.log('No points to redo.')
  }
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
    pointIcon.classList.add(point === 'blue' ? 'blue-point-icon' : 'red-point-icon');
    document.querySelector('.point-sequence').appendChild(pointIcon);
  });
}

function renderServeIcon() {
  document.querySelectorAll('.serve-icon').forEach(icon => {
    icon.classList.remove('serving');
  });
  const scoringTeam = pointSequence.slice(-1)[0];

  if (scoringTeam) {
    document.querySelector(`.icon-section.${scoringTeam} .serve-icon`).classList.add('serving');
  }
}

function aggregatePoints(team) {
  return pointSequence.filter(point => point === team).length;
}