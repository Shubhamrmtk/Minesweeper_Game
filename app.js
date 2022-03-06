document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let width = 10;
  let squares = [];
  let bombAmount = 20;
  let isGameOver = false;
  let flags = 0;

  // create Board
  function createBoard() {
    const bombArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombArray);
    console.log(gameArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // normal click
      square.addEventListener("click", function (e) {
        click(square);
      });

      // cntrl and left click
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addflag(square);
      };
    }

    // add numbers
    for (let i = 0; i < squares.length; i++) {
      console.log(i);
      let total = 0;
      const isleftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;
      console.log(isRightEdge);
      console.log(isleftEdge);

      if (squares[i].classList.contains("valid")) {
        if (i > 0 && !isleftEdge && squares[i - 1].classList.contains("bomb")) {
          total++;
        }
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        ) {
          total++;
        }
        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
        if (
          i > 11 &&
          !isleftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        ) {
          total++;
        }

        if (
          i < 98 &&
          !isRightEdge &&
          squares[i + 1].classList.contains("bomb")
        ) {
          total++;
        }
        if (
          i < 90 &&
          !isleftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        ) {
          total++;
        }
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        ) {
          total++;
        }
        if (i < 89 && squares[i + width].classList.contains("bomb")) {
          total++;
        }
        squares[i].setAttribute("data", total);

        console.log(squares[i]);
      }
    }
  }

  createBoard();

  // add flag  with right click
  function addflag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "🚩";
        flags++;
        checkForwin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;
      }
    }
  }

  // click on the square action
  function click(square) {
    let currentId = square.id;
    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    ) {
      return;
    }
    if (square.classList.contains("bomb")) {
      // alert("Game over");
    } else {
      let total = square.getAttribute("data");
      console.log(total);
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add("checked");
  }

  // check neighboring square is clicked

  function checkSquare(square, currentId) {
    const isleftEdge = currentId % width == 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isleftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare, newId);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId - width)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isleftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isleftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 100);
  }
  function gameOver(square) {
    // alert(" Boom! Game over!");
    isGameOver = true;
    // show all the bomb
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "💣";
      }
    });
  }
  //  check for win
  function checkForwin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }
      if (matches === bombAmount) {
        alert("you win the game!");
        isGameOver = true;
      }
    }
  }
});
