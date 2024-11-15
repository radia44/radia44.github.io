// 2D Array Rotation Puzzle
// Radia Jannat
// November 12, 2024
//
// Extra for Experts:
// I used the local storage to make a leaderboard that tracks the measures of the times it took the user on a single PC on the same browser to solve a puzzle.

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
let startTime;
let endTime;
let leaderboard = [];
let puzzleSolved = false;
let gameState = "start"; // New game state variable: "start", "playing", "solved"

function preload() {
  fullImage = loadImage("painting.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliceImageIntoGrid(fullImage, gridSizeX, gridSizeY);
  loadLeaderboard(); // Load leaderboard from local storage
}

function draw() {
  background(0);

  if (gameState === "start") {
    displayStartScreen();
  } 
  else if (gameState === "playing") {
    if (isPuzzleSolved()) {
      if (!puzzleSolved) {
        puzzleSolved = true;
        endTime = millis(); // Record end time when puzzle is solved
        saveScore(); // Save the current score to leaderboard
      }
      displaySolvedMessage();
      displayLeaderboard(); // Show leaderboard only after puzzle is solved
      noLoop(); // Stop the draw loop
    } 
    else {
      displayGrid();
      displayTimer();
    }
  }
}

// Display the start screen with instructions
function displayStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill("white");
  text("Welcome to the Puzzle Game!", width / 2, height / 2 - 40);
  textSize(16);
  text("Rotate the puzzle pieces by clicking on them to complete the image.", width / 2, height / 2);
  text("Press ENTER to start the game", width / 2, height / 2 + 40);
}

// Start the timer and change game state when ENTER is pressed
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "playing"; // Switch to playing state
    startTime = millis(); // Initialize start time
    puzzleSolved = false; // Reset puzzle solved status
    loop(); // Start the draw loop
  }
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
  if (gameState === "playing") {
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
}

// Display the timer during the game
function displayTimer() {
  let elapsedSeconds = (millis() - startTime) / 1000;
  let minutes = floor(elapsedSeconds / 60);
  let seconds = elapsedSeconds % 60;

  textAlign(LEFT, CENTER);
  textSize(10);
  textFont('Courier New');
  fill("white");

  // Format and display the time as "minutes:seconds"
  text(`Time Elapsed: ${nf(minutes, 2)}:${nf(seconds, 2, 1)} min`, 5, 50, 90);
}

// Check if all pieces are correctly rotated
function isPuzzleSolved() {
  for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
      if (rotations[y][x] !== 0) {
        return false; // Puzzle is not solved if any piece is not correctly rotated
      }
    }
  }
  return true; // Puzzle is solved
}

// Display final message when puzzle is solved
function displaySolvedMessage() {
  let totalTime = (endTime - startTime) / 1000;
  let minutes = floor(totalTime / 60);
  let seconds = totalTime % 60;

  textAlign(CENTER, CENTER);
  textSize(20);
  fill("lime");
  text(`Puzzle Solved!\nTime Taken: ${nf(minutes, 2)}:${nf(seconds, 2, 1)} min`, width / 2, height / 2 - 50);
}

// Save the current score to the leaderboard in local storage
function saveScore() {
  let totalTime = (endTime - startTime) / 1000;
  leaderboard.push(totalTime);
  leaderboard.sort((a, b) => a - b); // Sort scores in ascending order

  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Load leaderboard from local storage
function loadLeaderboard() {
  let savedScores = localStorage.getItem('leaderboard');
  if (savedScores) {
    leaderboard = JSON.parse(savedScores);
  }
}

// Display the leaderboard on the screen
function displayLeaderboard() {
  textAlign(LEFT, TOP);
  textSize(12);
  fill("white");
  text("Leaderboard:", 10, 100);

  for (let i = 0; i < leaderboard.length && i < 5; i++) { // Limit to top 5 scores
    let time = leaderboard[i];
    let minutes = floor(time / 60);
    let seconds = time % 60;

    text(`${i + 1}. ${nf(minutes, 2)}:${nf(seconds, 2, 1)} min`, 10, 120 + i * 20);
  }
}