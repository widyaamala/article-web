const findLongestWord = (sentence) => {
  const words = sentence.split(' ');
  let longestWord = '';

  words.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return longestWord;
}

const sentence = "Straight from the Tortured Poets Department";
const theLongest = `${findLongestWord(sentence)}: ${findLongestWord(sentence).length} characters`;
console.log(theLongest);