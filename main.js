const GameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => [...board];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
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

  const setMove = (row, col, marker) => {
    if (board[row][col] == "") {
      board[row][col] = marker;
      return true;
    }
    return false;
  };

  const checkWin = (marker) => {
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

  return { getBoard, checkDraw, setMove, checkWin, resetBoard };
})();

const DisplayController = (() => {
  const squares = document.querySelectorAll(".square");
  const playAgainButton = document.querySelector(".play-again-button");
  const dialog = document.querySelector("#dialog-container");

  const player1Point = document.querySelectorAll(".one-score");
  const player2Point = document.querySelectorAll(".two-score");

  let playerXTurn = true;

  playAgainButton.addEventListener("click", () => {
    resetGame();
  });

  const updateDisplay = () => {
    const symbolDisplay = document.querySelector(".symbol");
    const playerDisplay = document.querySelector(".player");
    playerDisplay.classList.remove("red", "blue");
    symbolDisplay.classList.remove("red", "blue");
    playerDisplay.textContent = playerXTurn ? "Player 1" : "Player 2";
    playerDisplay.classList.add(playerXTurn ? "blue" : "red");
    symbolDisplay.textContent = playerXTurn ? "X" : "O";
    symbolDisplay.classList.add(playerXTurn ? "blue" : "red");
  };

  const resetGame = () => {
    dialog.classList.remove("open");
    squares.forEach((square) => {
      square.textContent = "";
      square.classList.remove("x", "o");
    });
    GameBoard.resetBoard();
    playerXTurn = true;
    updateDisplay();
  };

  const updatePlayerPoints = (player, playerPoint) => {
    player.addPoint();
    playerPoint.forEach((point) => {
      point.textContent = player.showPoint();
    });
  };

  const openDialog = () => {
    const playerDisplay = document.querySelector(".player-title");
    playerDisplay.classList.remove("blue", "red");
    dialog.classList.add("open");
    playerDisplay.textContent = `Player ${playerXTurn ? "1" : "2"}`;
    playerDisplay.classList.add(playerXTurn ? "blue" : "red");
  };

  const handleSquareClick = (event) => {
    const title = document.querySelector(".title");
    const col = event.target.getAttribute("data-col");
    const row = event.target.getAttribute("data-row");
    const marker = playerXTurn ? "X" : "O";

    if (GameBoard.setMove(row, col, marker)) {
      event.target.textContent = marker;
      event.target.classList.add(marker.toLocaleLowerCase());

      if (GameBoard.checkWin(marker)) {
        openDialog();
        updatePlayerPoints(
          playerXTurn ? player1 : player2,
          playerXTurn ? player1Point : player2Point
        );
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
