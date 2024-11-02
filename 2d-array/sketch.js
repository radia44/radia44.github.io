// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//const PUZZLE = [[1, 2, 3]
//  [4, 5, 6]
//  [7, 8, 9]];

let cellSize;
const PAINTING_GRID_SIZE = 3; // 3x3 grid

let part001, part002, part003, part004, part005, part006, part007, part008, part009;
let pictures;

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

  pictures = [part001, part002, part003, part004, part005, part006, part007, part008, part009];
}

function setup() {
  createCanvas(668, 521);
  cellSize = width / PAINTING_GRID_SIZE; // Calculate cell size based on canvas width and grid size
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  let imgIndex = 0; // Track which image to display

  for (let y = 0; y < PAINTING_GRID_SIZE; y++) {
    for (let x = 0; x < PAINTING_GRID_SIZE; x++) {
      // Calculate the top-left corner position for each cell
      let xPos = x * cellSize;
      let yPos = y * cellSize;

      // Display the image in the current cell
      image(pictures[imgIndex], xPos, yPos, cellSize, cellSize);

      imgIndex++; // Move to the next image in the array
    }
  }
}
