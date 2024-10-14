const squares = document.querySelectorAll(".square");
let playerXTurn = true;
const playAgainButton = document.querySelector(".play-again-button");
const dialog = document.querySelector("#dialog-container");
const player = document.querySelector(".player");
const player1Point = document.querySelectorAll(".one-score");

playAgainButton.addEventListener("click", () => {
  resetGame();
});

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const createPlayer = (name, symbol, point) => {
  return {
    name,
    symbol,
    point,
    addPoint: () => {
      point += 1;
    },
    showPoint: () => {
      console.log(point);
      return point;
    },
  };
};

const player1 = createPlayer("Player X", "X", 0);
const player2 = createPlayer("Player O", "O", 0);

squares.forEach((element) => {
  element.addEventListener("click", (event) => {
    const col = event.target.getAttribute("data-col");
    const row = event.target.getAttribute("data-row");

    createMove(col, row, event.target);
    player.textContent = playerXTurn ? "Player 1" : "Player 2";
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
    dialog.classList.add("open");
    if (playerXTurn) {
      player1.addPoint();
      player1Point.forEach((player1point) => {
        player1point.textContent = player1.showPoint();
      });
    }
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

function resetGame() {
  dialog.classList.remove("open");
  squares.forEach((square) => {
    square.textContent = "";
  });
}
