function getComputerChoice() {
  // Generate a random number from 1 to 3
  const randomNumber = Math.ceil(Math.random() * 3);

  switch (randomNumber) {
    case 1:
      return 'Rock';
    case 2:
      return 'Paper';
    case 3:
    default:
      return 'Scissors';
  }
}

function getHumanChoice() {
  const humanChoice = prompt('What is your choice?', '');

  // human pressed 'Cancel' button on prompt
  if (humanChoice === null) return 'canceled';

  switch (humanChoice.toLowerCase()) {
    case 'rock':
    case 'paper':
    case 'scissors':
      return humanChoice;
    case '':
      return 'nothing';
    default:
      return 'invalid';
  }
}
