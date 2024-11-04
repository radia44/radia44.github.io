// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//const PUZZLE = [[1, 2, 3]
//  [4, 5, 6]
//  [7, 8, 9]];

let fullImage;
const gridSize = 5;
const originalWidth = 640;
const originalHeight = 370;
let slicedImages = [];

function preload() {
  fullImage = loadImage("painting.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliceImageIntoGrid(fullImage, gridSize);
}

function draw() {
  background(0);
  displayGrid();
}


// Function that slices the image into pieces for the grid
function sliceImageIntoGrid(img, gridSize) {
  let pieceWidth = img.width / gridSize;
  let pieceHeight = img.height / gridSize;
  
  // Slice the image and store each piece in a 2d array
  for (let y = 0; y < gridSize; y++) {
    slicedImages.push([]);
    for (let x = 0; x < gridSize; x++) {
      let imgPiece = img.get(x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
      slicedImages[y].push(imgPiece);
    }
  }
}

// Display each piece in the grid
function displayGrid(){
  let pieceWidth = originalWidth / gridSize;
  let pieceHeight = originalHeight / gridSize;
  
  // Calculate offset to center the grid on the canvas
  let xOffset = (width - originalWidth) / 2;
  let yOffset = (height - originalHeight) / 2;
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++){
      image(slicedImages[y][x], xOffset + x * pieceWidth, yOffset + y * pieceHeight, pieceWidth, pieceHeight);
    }
  }
}