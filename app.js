const RULES = {
  rock: { action: 'smashes', beatenBy: 'paper', beatenHow: 'is covered' },
  paper: { action: 'covers', beatenBy: 'scissors', beatenHow: 'is cut' },
  scissors: { action: 'cut', beatenBy: 'rock', beatenHow: 'are smashed' },
};

const roundResult = document.querySelector('.round-result');
const humanScoreSpan = document.querySelector('.human-score');
const computerScoreSpan = document.querySelector('.computer-score');
const characterChoices = document.querySelector('.character-choice');

Array.from(characterChoices.children).forEach((button) =>
  button.addEventListener('click', playRound),
);

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);

  switch (randomNumber) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
    default:
      return 'scissors';
  }
}

function getRoundResult(humanChoice, computerChoice) {
  let result;
  let reason;
  let winner;

  if (humanChoice === computerChoice) {
    result = "It's a tie!";
    reason = `You both chose ${humanChoice}.`;
    winner = 'none';
  } else if (RULES[humanChoice].beatenBy === computerChoice) {
    result = 'Computer wins the round.';
    reason = `${humanChoice} ${RULES[humanChoice].beatenHow} by ${computerChoice}.`;
    winner = 'computer';
  } else {
    result = 'You win this round!';
    reason = `${humanChoice} ${RULES[humanChoice].action} ${computerChoice}.`;
    winner = 'human';
  }

  return {
    choices: `You chose ${humanChoice}, computer chose ${computerChoice}.`,
    result: result,
    winner: winner,
    reason: reason,
  };
}

function displayRoundResult(round) {
  roundResult.innerHTML = `
  <p>${round.choices}</p>
  <h3 class="${round.winner}">${round.result}</h3>
  <p class="reason">${round.reason}</p>
  `;
  if (round.result !== 'tie') {
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
  }
}

function endGame(humanWon) {
  characterChoices.remove();

  const resetButton = document.createElement('button');
  resetButton.classList.add('reset');
  resetButton.textContent = 'Play again?';
  resetButton.onclick = () => window.location.reload();

  const header = document.querySelector('.actions-title');
  header.textContent = humanWon ? 'You WON the game!' : 'You LOST the game :(';
  header.style.color = humanWon ? '#a6e3a1' : '#f38ba8';

  header.parentNode.append(resetButton);
}

function playRound(event) {
  const humanChoice = event.target.id;
  const computerChoice = getComputerChoice();
  const round = getRoundResult(humanChoice, computerChoice);

  switch (round.winner) {
    case 'computer':
      computerScore += 1;
      break;
    case 'human':
      humanScore += 1;
      break;
    default:
      break;
  }

  displayRoundResult(round);

  if (humanScore >= 3 || computerScore >= 3) {
    endGame(humanScore > computerScore);
  }
}
