const GameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
  };

  const setMove = (row, col, marker) => {
    if (board[row][col] === "") {
      board[row][col] = marker;
      return true;
    }
    return false;
  };

  const checkWin = (marker) => {
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
  };

  const checkDraw = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  return { getBoard, resetBoard, setMove, checkWin, checkDraw };
})();

const DisplayController = (() => {
  const squares = document.querySelectorAll(".square");
  const playAgainButton = document.querySelector(".play-again-button");
  const dialog = document.querySelector("#dialog-container");
  const playerDisplay = document.querySelector(".player");
  const player1Point = document.querySelectorAll(".one-score");
  const player2Point = document.querySelectorAll(".two-score");
  const symbolDisplay = document.querySelector(".symbol");
  const title = document.querySelector(".title");

  let playerXTurn = true;

  playAgainButton.addEventListener("click", () => {
    resetGame();
  });

  const updateDisplay = () => {
    playerDisplay.textContent = playerXTurn ? "Player 1" : "Player 2";
    symbolDisplay.textContent = playerXTurn ? "X" : "O";
  };

  const resetGame = () => {
    dialog.classList.remove("open");
    squares.forEach((square) => {
      square.textContent = "";
    });
    GameBoard.resetBoard();
    playerXTurn = true;
    updateDisplay();
  };

  const handleSquareClick = (event) => {
    const col = event.target.getAttribute("data-col");
    const row = event.target.getAttribute("data-row");
    const marker = playerXTurn ? "X" : "O";

    if (GameBoard.setMove(row, col, marker)) {
      event.target.textContent = marker;

      if (GameBoard.checkWin(marker)) {
        dialog.classList.add("open");
        title.textContent = `Player ${playerXTurn ? "1" : "2"} Wins`;
        if (playerXTurn) {
          player1.addPoint();
          player1Point.forEach((point) => {
            point.textContent = player1.showPoint();
          });
        } else {
          player2.addPoint();
          player2Point.forEach((point) => {
            point.textContent = player2.showPoint();
          });
        }
      } else if (GameBoard.checkDraw()) {
        dialog.classList.add("open");
        title.textContent = "Draw";
      } else {
        playerXTurn = !playerXTurn;
        updateDisplay();
      }
    }
  };

  squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
  });

  return { resetGame };
})();

const createPlayer = (name, symbol, point = 0) => {
  return {
    name,
    symbol,
    point,
    addPoint() {
      this.point += 1;
    },
    showPoint() {
      return this.point;
    },
  };
};

const player1 = createPlayer("Player X", "X");
const player2 = createPlayer("Player O", "O");
