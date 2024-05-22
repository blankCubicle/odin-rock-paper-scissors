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
  let humanInput = prompt(message, '');

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

const rules = {
  rock: { beatenBy: 'paper' },
  paper: { beatenBy: 'scissors' },
  scissors: { beatenBy: 'rock' },
};

let computerScore = 0;
let humanScore = 0;

function playRound(humanChoice, computerChoice) {
  if (humanChoice === 'cancel') return console.log('Round canceled :(');

  console.log(`You chose ${humanChoice}`);
  console.log(`Computer chose ${computerChoice}`);

  if (humanChoice === computerChoice) {
    return console.log(`<== It's a tie! ==>`);
  }

  if (rules[humanChoice].beatenBy === computerChoice) {
    computerScore += 1;
    console.log(
      `<== You lose :( — ${humanChoice} is beaten by ${computerChoice} ==>`,
    );
  } else {
    humanScore += 1;
    console.log(`<== You WON! — ${humanChoice} beats ${computerChoice} ==>`);
  }
}

playRound(getHumanChoice(), getComputerChoice());
