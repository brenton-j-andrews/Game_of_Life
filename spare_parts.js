
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





// Mouse click event object:
let mouse = {
    x: undefined,
    y: undefined
}

let gameArr = []

// Eventlistener function.
function addColor(event) {
    console.log(event.offsetX);
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;

    for (let i = 0; i < gameArr.length; i++) {

        if (gameArr[i].x + 15 > mouse.x && mouse.x > gameArr[i].x) {
            if (gameArr[i].y + 15 > mouse.y && mouse.y > gameArr[i].y) {

                if (!gameArr[i].active) {
                    gameArr[i].active = true;
                    console.log(gameArr[i]);
                }

                else {
                    gameArr[i].active = false;
                }

            }
        }
    }
    console.log(gameArr);
    drawCanvas();
}

// Add game grid elements to the canvas.
function drawCanvas() {
    for (let i = 0; i < gameArr.length; i++) {
        gameArr[i].draw();
    }
}

// Window eventListener -> Used to create initial game structure with mouse clicks.
canvas.addEventListener("click", addColor);
drawCanvas();


// ------------------------------------  Game logic and button functionality.

start_btn.addEventListener("click", function() {
    canvas.removeEventListener("click", addColor);
    gameArr = nextGameState(gameArr);
    drawCanvas();
    console.log("done!");
})


function nextGameState(gameArr) {
    console.log(gameArr);
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
        // if (i < 200) {
        //     console.log(`Cell ${i} neighbor count: ${neighbor_count}`);
        // }
        
        nextGameArr[i].active = livesOrDies(gameArr[i].active, neighbor_count);
    }
    return nextGameArr;
}

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

    // If dead cell.
    if (!alive) {
        if (neighbor_count === 3) return true;
        else return false;
    }
    
    
}
