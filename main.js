const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function player(name, marker) {
  return { name, marker };
}

const playerX = player("me", "X");
const playerO = player("you", "O");
let playerXTurn = true;
let gameOn = true;

function createMove(col, row) {
  if (playerXTurn) {
    board[row][col] = "X";
  } else {
    board[row][col] = "O";
  }
  playerXTurn = !playerXTurn;
}

for (let i = 0; i < 2; i++) {
  col = prompt("What is your next play col?") - 1;
  row = prompt("What is your next play row?") - 1;

  createMove(col, row);
  console.log(board);
}
