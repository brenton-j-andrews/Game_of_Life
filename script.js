// Select DOM elements
let game_board = document.getElementById("game-board");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");


// Canvas properties.
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
    mouse.x = event.x - 140;
    mouse.y = event.y - 65;

    for (let i = 0; i < gameArr.length; i++) {

        if (gameArr[i].x + 15 > mouse.x && mouse.x > gameArr[i].x) {
            if (gameArr[i].y + 15 > mouse.y && mouse.y > gameArr[i].y) {
                console.log("Mouse x coord: " + mouse.x);
                console.log("Mouse y coord: " + mouse.y)
                console.log("X coord lower bound: " + gameArr[i].x);
                console.log("X coord upper bound: " + (gameArr[i].x + 16));
                console.log("Y coord lower bound: " + gameArr[i].y);
                console.log("Y coord upper bound: " + (gameArr[i].y + 16));
                gameArr[i].active = true;
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