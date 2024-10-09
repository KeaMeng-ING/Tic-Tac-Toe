const squares = document.querySelectorAll(".square");
let playerXTurn = true;

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

squares.forEach((element) => {
  element.addEventListener("click", (event) => {
    const col = event.target.getAttribute("data-col");
    const row = event.target.getAttribute("data-row");

    createMove(col, row, event.target);

    // console.log(`Square clicked at col: ${col}, row: ${row}`);
  });
});

function createMove(col, row, event) {
  const marker = playerXTurn ? "x" : "o";
  if (board[row][col] == "") {
    board[row][col] = marker;
    event.textContent = marker;
  }

  if (checkWin(marker)) {
    const dialog = document.querySelector("#dialog-container");
    dialog.showModal();
  } else {
    playerXTurn = !playerXTurn;
  }
}

function checkWin(marker) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === marker &&
      board[row][1] === marker &&
      board[row][2] === marker
    ) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === marker &&
      board[1][col] === marker &&
      board[2][col] === marker
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] === marker &&
    board[1][1] === marker &&
    board[2][2] === marker
  ) {
    return true;
  }
  if (
    board[0][2] === marker &&
    board[1][1] === marker &&
    board[2][0] === marker
  ) {
    return true;
  }

  return false;
}
