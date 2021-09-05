// global varibles
let rows = 30,cols = 40;
let grid = createGrid();
let play = false;
// global variable
function createGrid() {
    let result = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(false);
        }
        result.push(row);
    }
    return result;
}

/*
rules:
1. Any live cell with fewer than two live neighbors dies, as if by loneliness.
2. Any live cell with more than three live neighbors dies, as if by overcrowding.
3. Any live cell with two or three live neighbors lives, unchanged, to the next generation.
4. Any dead cell with exactly three live neighbors comes to life.
*/
function nextGeneration() {
    let newGrid = createGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Counts the number of alive neighbors
            let directions = [
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, 1],
                [1, 1]
            ];
            let aliveNeighbors = 0;
            for (d of directions) {
                let neighborRow = i + d[0];
                let neighborCol = j + d[1];
                if (neighborRow >= 0 && neighborCol >= 0 && neighborRow < rows && neighborCol < cols) {
                    if (grid[neighborRow][neighborCol]) {
                        aliveNeighbors++;
                    }
                }
            }
            // Decide whether or not the new cell is alive or dead
            if (grid[i][j]) {
                newGrid[i][j] = aliveNeighbors == 2 || aliveNeighbors == 3;
            } else {
                newGrid[i][j] = aliveNeighbors == 3;
            }
        }
    }
    grid = newGrid;
}

// Called once at the beginning of the program
function setup() {
    let height = 500;
    createCanvas(height * cols / rows, height);
    frameRate(2);
}

// Called over and over 
function draw() {
    background(255);
    // Display the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j]) {
                fill(0);//
                rect(j / cols * width, i / rows * height, width / cols, height / rows);
            }
        }
    }

    // Horizontal grid lines
    stroke(200);
    for (let i = 0; i <= rows; i++) {
        line(0, i / rows * height, width, i / rows * height);
    }

    // Vertical grid lines
    for (let i = 0; i <= cols; i++) {
        line(i / cols * width, 0, i / cols * width, width);
    }
    if (play) {
        nextGeneration();
    }
}
// take input form user
function mouseClicked() {
    let row = Math.floor(mouseY / height * rows);
    let col = Math.floor(mouseX / width * cols);
    if (row >= 0 && col >= 0 && row < rows && col < cols) {
        grid[row][col] = !grid[row][col];
    }
}
// start and stop the intration of cells
let playButton = document.querySelector(".play-button");
playButton.addEventListener("click", function() {
    play = !play;
    if (play) {
        playButton.textContent = "Pause";
    } else {
        playButton.textContent = "Play";
    }
});
// clear cells
let clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", function() {
    grid = createGrid();
});
