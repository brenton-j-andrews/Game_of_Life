// Select DOM elements
let game_board = document.getElementById("game-board");
let start_btn = document.getElementById("start-btn");
let reset_btn = document.getElementById("reset-btn");


// Canvas properties.
const canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
c.fillStyle = "white";

let x_coord = 0;
let y_coord = 0;


for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
        c.fillRect(x_coord, y_coord, 15, 15);
        x_coord += 16;
    }
    x_coord = 0;
    y_coord += 16;

}

