// Select DOM elements
let game_board = document.getElementById("game-board");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");


// ------------------------------------  Canvas and game array functions / code.

const canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
c.fillStyle = "white";

// Mouse click event object:
let mouse = {
    x: undefined,
    y: undefined
}

let gameArr = []

// Eventlistener function.
function addColor(event) {
    mouse.x = event.x - 155;
    mouse.y = event.y - 65;

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

// Create game grid, store in gameArr[]
function CreateGameArr() {
    let x_coord = 0;
    let y_coord = 0;
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            gameArr.push(new GridSquare(x_coord, y_coord, 15, 15));
            x_coord += 16;
        }
        x_coord = 0;
        y_coord += 16;
    }
}

// Create grid square objects.
function GridSquare(x, y, dx, dy) {
    this.x = Number(x);
    this.y = Number(y);
    this.dx = Number(dx);
    this.dy = Number(dy);
    this.active = false;

    this.draw = function() {
        c.beginPath();
        c.fillRect(this.x, this.y, this.dx, this.dy);
        if (this.active) c.fillStyle = "black";
        else c.fillStyle = "white";
        c.stroke();
    }
}

// Add game grid elements to the canvas.
function drawCanvas() {
    for (let i = 0; i < gameArr.length; i++) {
        gameArr[i].draw();
    }
}

// Window eventListener -> Used to create initial game structure with mouse clicks.
canvas.addEventListener("click", addColor);
CreateGameArr();
drawCanvas();


// ------------------------------------  Game logic and button functionality.

start_btn.addEventListener("click", function() {
    canvas.removeEventListener("click", addColor);
    gameArr = nextGameState(gameArr);
    drawCanvas();
})


function nextGameState(gameArr) {

    let nextGameArr = gameArr;
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

        // Check status of current cell for next iteration.
        nextGameArr[i].active = livesOrDies(neighbor_count);
    }
    return nextGameArr;
}

function livesOrDies(neighbor_count) {
    if (neighbor_count < 2) return false;
    if (2 <= neighbor_count && neighbor_count <= 3) return true;
    if (neighbor_count > 3) return false;
}

