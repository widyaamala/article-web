const diagonalDifference = (matrix) => {
  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][n - 1 - i];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9]
];
const total = diagonalDifference(Matrix);
console.log(total);