const countOccurrences = (input, query) => {
  return query.map((q) => `${q}: ${input.filter((i) => i === q).length}`);
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const occurrencesWord = countOccurrences(INPUT, QUERY);
console.log(occurrencesWord);