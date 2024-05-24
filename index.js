const boxes = document.querySelectorAll('.box')
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('#newGame');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// lets create a function to initialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // empty all boxes
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //  Inialize box with css properties again
        box.classList = `box box${index + 1}`;

    })
    newGameBtn.style.display = "none";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }
            // disable pointer 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            //  now we know who is the winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
            }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.style.display = "inline";
        return;
    }

    // tie handling

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.style.display = "inline";
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check if someone wins
        checkGameOver();
    }
}

function swapTurn() {
    if (currentPlayer === 'X') {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener('click', initGame);