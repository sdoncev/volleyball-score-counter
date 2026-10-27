const pointSequence = [];
const undone = [];

const scoreButtons = document.querySelectorAll('.score-btn');

const resetScoreBtn = document.querySelector('.reset-score-btn');

const blueProgressBar = document.querySelector('[data-id="1"].team-progress-bar .progress-bar-fill');
const redProgressBar = document.querySelector('[data-id="2"].team-progress-bar .progress-bar-fill');

let targetScore = Number(document.querySelector('.target-score-input').value);

scoreButtons.forEach(button => {
  button.addEventListener('click', e => {
    pointSequence.push(e.target.dataset.id);
    const newScore = Number(e.target.innerHTML) + 1;
    e.target.innerHTML = newScore;
    renderServeIcon();
    renderTeamProgressBar(e.target.dataset.id, newScore);
    renderPointSequence();
    isWin(e.target.dataset.id);
  });
});

resetScoreBtn.addEventListener('click', () => {
  scoreButtons.forEach(button => {
    button.innerHTML = 0;
  });
  pointSequence.length = 0;     // clear score sequence for new game
  targetScore = document.querySelector('.target-score-input').value;
  renderTeamProgressBar(1, 0);
  renderTeamProgressBar(2, 0);
  renderPointSequence();
  renderServeIcon();
});

document.querySelector('.undo-button').addEventListener('click', () => {
  if (pointSequence.length) {
    const teamId = pointSequence.pop();
    undone.push(teamId);
    const newScore = aggregatePoints(teamId);
    renderPointSequence();
    renderServeIcon();

    document.querySelector(`[data-id="${teamId}"].score-btn`).innerHTML = newScore;
    renderTeamProgressBar(teamId, newScore);
  }
});

document.querySelector('.redo-button').addEventListener('click', () => {
  if (undone.length) {
    const teamId = undone.pop();
    pointSequence.push(teamId);
    const newScore = aggregatePoints(teamId);
    renderPointSequence();
    renderServeIcon();

    document.querySelector(`[data-id="${teamId}"].score-btn`).innerHTML = newScore;
    renderTeamProgressBar(teamId, newScore);
  }
});

document.querySelector('.target-score-input').addEventListener('change', (e) => {
  targetScore = Number(e.target.value);
  console.log(targetScore);
});

function getTeamPointsProgress(points) {
  return Math.round(points / targetScore * 100);
}

function renderTeamProgressBar(teamId, points) {
  const progressBarElem = document.querySelector(`[data-id="${teamId}"].team-controls .progress-bar-fill`);
  progressBarElem.style.width = `${getTeamPointsProgress(points)}%`;
}

function renderPointSequence() {
  document.querySelector('.point-sequence').innerHTML = '';

  pointSequence.forEach((teamId) => {
    const pointIcon = document.createElement('div');
    pointIcon.classList.add(teamId == 1 ? 'blue-point-icon' : 'red-point-icon');
    document.querySelector('.point-sequence').appendChild(pointIcon);
  });
}

function renderServeIcon() {
  document.querySelectorAll('.serve-icon').forEach(icon => {
    icon.classList.remove('serving');
  });
  const scoringTeamId = pointSequence.at(-1);

  if (scoringTeamId) {
    document.querySelector(`[data-id="${scoringTeamId}"].icon-section .serve-icon`).classList.add('serving');
  }
}

function aggregatePoints(teamId) {
  return pointSequence.filter(id => id == teamId).length;
}

function getOtherTeamId(teamId) {
  return teamId % 2 + 1;
}

function isWin(teamId) {
  const thisTeamPoints = aggregatePoints(teamId);
  const otherTeamPoints = aggregatePoints(getOtherTeamId(teamId));

  if (thisTeamPoints == targetScore && thisTeamPoints - otherTeamPoints >= 2) {
    console.log('Win detected');
    return true;

  } else if (thisTeamPoints == targetScore) {
    targetScore++;
    console.log(targetScore);
  }

  return false;
} 