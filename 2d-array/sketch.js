// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//const PUZZLE = [[1, 2, 3]
//  [4, 5, 6]
//  [7, 8, 9]];


function preload() {
  part001 = loadImage("image_part_001.jpg");
  part002 = loadImage("image_part_002.jpg");
  part003 = loadImage("image_part_003.jpg");
  part004 = loadImage("image_part_004.jpg");
  part005 = loadImage("image_part_005.jpg");
  part006 = loadImage("image_part_006.jpg");
  part007 = loadImage("image_part_007.jpg");
  part008 = loadImage("image_part_008.jpg");
  part009 = loadImage("image_part_009.jpg");
}

let grid;
let cellSize;
const PAINTING_GRID_SIZE = 3;

function setup() {
  createCanvas(668, 521);
  cellSize = height / PAINTING_GRID_SIZE;
  grid = generateRandomGrid(PAINTING_GRID_SIZE, PAINTING_GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}


function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //make it a 1 half the time, a 0 half the time
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y < PAINTING_GRID_SIZE; y++) {
    for (let x = 0; x < PAINTING_GRID_SIZE; x++) {
      fill("white");
      stroke("black");
      rect(x * cellSize, y * cellSize, width / PAINTING_GRID_SIZE, height / PAINTING_GRID_SIZE);
    }
  }
}