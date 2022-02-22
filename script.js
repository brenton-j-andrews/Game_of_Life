// Select DOM elements
let game_board = document.getElementById("game-board");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");

// Canvas config.
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";


// ------------------------------------------------------  Create grid square objects, init and populate gameArr.
class GridSquare {
    constructor(x, y, dx, dy) {
        this.x = Number(x);
        this.y = Number(y);
        this.dx = Number(dx);
        this.dy = Number(dy);
        this.active = false;
    }
    
    draw = function() {
        if (this.active) ctx.fillStyle = "black";
        else ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.dx, this.dy);
        ctx.stroke();
    }
}

let gameArr = [];

function CreateGameArr() {
    let x_coord = .5;
    let y_coord = .5;

    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            gameArr.push(new GridSquare(x_coord, y_coord, 15, 15));
            x_coord += 16;
        }

        x_coord = .5;
        y_coord += 16;
    }
}

// Add game grid elements to the canvas. 
function drawCanvas() {
    clearCanvas();
    for (let i = 0; i < gameArr.length; i++) {
        gameArr[i].draw();
    }
}

function clearCanvas() {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}


CreateGameArr();
drawCanvas();

// ----------------------------------------------------------- Initial shape creation / cell activation on click.

let mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("click", cellActivation);

function cellActivation(event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;

    for (let i = 0; i < gameArr.length; i++) {

        if (gameArr[i].x + 15 > mouse.x && mouse.x > gameArr[i].x) {
            if (gameArr[i].y + 15 > mouse.y && mouse.y > gameArr[i].y) {

                if (!gameArr[i].active) {
                    gameArr[i].active = true;
                }

                else {
                    gameArr[i].active = false;
                }
            }
        }
    }
    
    drawCanvas();
}

// ------------------------------------------------------------- Game logic -> activates once "start" is pressed.
start_btn.addEventListener("click", function() {
    canvas.removeEventListener("click", cellActivation);
    gameArr = nextGameState(gameArr);
    drawCanvas();
})

// Returns transformed gameArr based on Game of Life Ruleset.
function nextGameState(gameArr) {
    
    let nextGameArr= [
        ...gameArr
      ].map(i => ({ ...i}));

    console.log(nextGameArr);
    for (let i = 0; i < gameArr.length; i++) {
        let neighbor_count = 0;

        // Highest row.
        if (gameArr[i-51] != undefined) {
            if (gameArr[i-51].active) {
                neighbor_count++;
            }
            if (gameArr[i-50].active) {
                neighbor_count++;
            }
            if (gameArr[i-49].active) {
                neighbor_count++;
            }
        }

        // Middle row.
        if (gameArr[i-1] != undefined && gameArr[i-1].active) neighbor_count++;

        if (gameArr[i+1] != undefined && gameArr[i+1].active) neighbor_count++;


        // Lowest row.
        if (gameArr[i+51] != undefined) {
            if (gameArr[i+51].active) {
                neighbor_count++;
            }
            if (gameArr[i+50].active) {
                neighbor_count++;
            }
            if (gameArr[i+49].active) {
                neighbor_count++;
            }
        }

        nextGameArr[i].active = livesOrDies(gameArr[i].active, neighbor_count);
    }

    return nextGameArr;
}

// Game of Life ruleset.
function livesOrDies(alive, neighbor_count) {

    // Rules for living cells.
    if (alive) {
        if (neighbor_count < 2) {
            return false;
        }
        if (2 <= neighbor_count && neighbor_count <= 3) {
            return true;
        }
        if (3 < neighbor_count) return false;
    }

    // Dead cell rules.
    if (!alive) {
        if (neighbor_count === 3) return true;
        else return false;
    }
}