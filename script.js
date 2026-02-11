const ROWS = 6;
const COLS = 7;

let board = [];
let freeRow = [];
let currentPlayer = "R";
let gameEnded = false;

window.onload = () => {
    initGame();
};

function initGame() {
    board = [];
    freeRow = [5, 5, 5, 5, 5, 5, 5];
    gameEnded = false;
    currentPlayer = "R";

    document.getElementById("status").innerText = "Pink's Turn";
    document.getElementById("board").innerHTML = "";

    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLS; c++) {
            row.push("");

            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = r + "-" + c;
            cell.addEventListener("click", dropPiece);
            document.getElementById("board").appendChild(cell);
        }
        board.push(row);
    }
}

function dropPiece() {
    if (gameEnded) return;

    let col = parseInt(this.id.split("-")[1]);
    let row = freeRow[col];

    if (row < 0) return;

    board[row][col] = currentPlayer;

    let cell = document.getElementById(row + "-" + col);
    cell.classList.add(currentPlayer === "R" ? "Pink" : "Blue");

    freeRow[col]--;

    if (checkWin(row, col)) {
        document.getElementById("status").innerText =
            currentPlayer === "R" ? "Pink Wins 🎉" : "Blue Wins 🎉";
        gameEnded = true;
        return;
    }

    currentPlayer = currentPlayer === "R" ? "Y" : "R";
    document.getElementById("status").innerText =
        currentPlayer === "R" ? "Pink's Turn" : "Blue's Turn";
}

function checkWin(r, c) {
    return (
        checkDirection(r, c, 0, 1) ||   // horizontal
        checkDirection(r, c, 1, 0) ||   // vertical
        checkDirection(r, c, 1, 1) ||   // diagonal \
        checkDirection(r, c, 1, -1)     // diagonal /
    );
}

function checkDirection(r, c, dr, dc) {
    let count = 1;
    count += countPieces(r, c, dr, dc);
    count += countPieces(r, c, -dr, -dc);
    return count >= 4;
}

function countPieces(r, c, dr, dc) {
    let total = 0;
    let player = board[r][c];

    r += dr;
    c += dc;

    while (
        r >= 0 && r < ROWS &&
        c >= 0 && c < COLS &&
        board[r][c] === player
    ) {
        total++;
        r += dr;
        c += dc;
    }
    return total;
}

function resetGame() {
    initGame();
}
