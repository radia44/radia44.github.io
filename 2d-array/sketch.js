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
const gridSizeY = 9;
const gridSizeX = 16;
const originalWidth = 640;
const originalHeight = 360;
let slicedImages = [];
let rotations = [];

function preload() {
  fullImage = loadImage("painting.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliceImageIntoGrid(fullImage, gridSizeX, gridSizeY);
}

function draw() {
  background(0);
  displayGrid();
}

// Function that slices the image into pieces for the grid
function sliceImageIntoGrid(img, gridSizeX, gridSizeY) {
  let pieceWidth = img.width / gridSizeX;
  let pieceHeight = img.height / gridSizeY;

  for (let y = 0; y < gridSizeY; y++) {
    slicedImages.push([]);
    rotations.push([]);  // Initialize each row in rotations

    for (let x = 0; x < gridSizeX; x++) {
      let imgPiece = img.get(x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
      slicedImages[y].push(imgPiece);

      // Assign a random rotation (0, 90, 180, or 270 degrees)
      let randomRotation = floor(random(4)) * 90;
      rotations[y].push(randomRotation);
    }
  }
}

// Display each piece in the grid
function displayGrid() {
  let pieceWidth = originalWidth / gridSizeX;
  let pieceHeight = originalHeight / gridSizeY;

  let xOffset = (width - originalWidth) / 2;
  let yOffset = (height - originalHeight) / 2;

  for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
      push();  // Save transformation state

      // Calculate position and rotation
      translate(xOffset + x * pieceWidth + pieceWidth / 2, yOffset + y * pieceHeight + pieceHeight / 2);
      rotate(radians(rotations[y][x]));

      // Display the image piece centered on its grid cell
      imageMode(CENTER);
      image(slicedImages[y][x], 0, 0, pieceWidth, pieceHeight);

      pop();  // Restore transformation state
    }
  }
}

// Rotate pieces on click to complete the puzzle
function mousePressed() {
  let pieceWidth = originalWidth / gridSizeX;
  let pieceHeight = originalHeight / gridSizeY;
  let xOffset = (width - originalWidth) / 2;
  let yOffset = (height - originalHeight) / 2;

  for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
      let px = xOffset + x * pieceWidth;
      let py = yOffset + y * pieceHeight;

      // Check if mouse is over the puzzle piece
      if (mouseX > px && mouseX < px + pieceWidth && mouseY > py && mouseY < py + pieceHeight) {
        rotations[y][x] = (rotations[y][x] + 90) % 360;  // Rotate by 90 degrees on each click
      }
    }
  }
}