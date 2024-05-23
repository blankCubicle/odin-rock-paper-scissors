function getComputerChoice() {
  // Generate a random number from 1 to 3
  const randomNumber = Math.ceil(Math.random() * 3);

  switch (randomNumber) {
    case 1:
      return 'rock';
    case 2:
      return 'paper';
    case 3:
    default:
      return 'scissors';
  }
}

function getHumanChoice(message = 'What is your choice?') {
  let humanInput = prompt(message);

  // human pressed 'Cancel' button on prompt
  if (humanInput === null) return 'cancel';

  humanInput = humanInput.toLowerCase();

  switch (humanInput) {
    case 'rock':
    case 'paper':
    case 'scissors':
      return humanInput;
    default:
      return getHumanChoice(
        "I didn't get that, try again? (rock/paper/scissors)",
      );
  }
}

function playGame() {
  const RULES = {
    rock: { beatenBy: 'paper' },
    paper: { beatenBy: 'scissors' },
    scissors: { beatenBy: 'rock' },
  };

  let humanScore = 0;
  let computerScore = 0;
  let isRoundCanceled = false;

  console.log('==> First to 3 wins! <==');

  while (humanScore < 3 && computerScore < 3) {
    playRound(getHumanChoice());
    console.log(`( You: ${humanScore} - Computer: ${computerScore} )`);

    if (isRoundCanceled) return;
  }

  if (computerScore > humanScore) {
    console.log('==> You LOST the game :( <==');
  } else {
    console.log('==> You WON the game :D <==');
  }

  function playRound(humanChoice) {
    if (humanChoice === 'cancel') {
      isRoundCanceled = true;
      return console.log('Game canceled :(');
    }

    const computerChoice = getComputerChoice();

    console.log(`--- You chose ${humanChoice}`);
    console.log(`--- Computer chose ${computerChoice}`);

    if (humanChoice === computerChoice) {
      return console.log(`<== It's a tie! ==>`);
    }

    if (RULES[humanChoice].beatenBy === computerChoice) {
      computerScore += 1;
      console.log(
        `<== You lose this round :( — ${humanChoice} is beaten by ${computerChoice} ==>`,
      );
    } else {
      humanScore += 1;
      console.log(
        `<== You WON this round! — ${humanChoice} beats ${computerChoice} ==>`,
      );
    }
  }
}

playGame();
