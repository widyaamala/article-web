const reverseAlphabet = (input) => {
  const letters = input.slice(0, -1);
  const number = input.slice(-1);
  const reversedLetters = letters.split('').reverse().join('');
  return reversedLetters + number;
}

const string = "NEGIE1";
const reversedString = `The reverse of ${string} is ${reverseAlphabet(string)}`;
console.log(reversedString);