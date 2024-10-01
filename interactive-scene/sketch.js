
// Millipede Simulator
// Radia Jannat
// September 27, 2024
//
// Use of vectors
// Utilizing arrays to make the millipede helped me take this project above and beyond!

let millipede = [];
let totalSegments = 30;
let segmentLength = 15;
let legOffset = 10;
let direction;
let gameState = "start"; // Game state variable

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize millipede positions
  for (let i = 0; i < totalSegments; i++ ){
    let segmentPos = createVector(width / 2, height / 2);
    millipede.push(segmentPos);
  }
}

function draw() {
  if (gameState === "start") {
    showStartScreen(); // Show start screen
  } 
  else if (gameState === "playing") {
    playGame(); // Run the game
  }
}

// Start screen function
function showStartScreen() {
  background(0);
  fill(222, 255, 0);
  stroke(222, 255, 0);
  textAlign(CENTER, CENTER);
  
  textSize(40);
  text("Millipede Simulator", windowWidth / 2, windowHeight / 2 - 50);
  
  textSize(20);
  text("Click and press SPACE to play", windowWidth / 2, windowHeight / 2 + 20);
}

// Gameplay function
function playGame() {
  background(0);
  
  // The first segment (head) follows the mouse
  let head = createVector(mouseX, mouseY);
  millipede[0] = head;
  
  // Make each segment follow the one ahead of it
  for (let i = 1; i < millipede.length; i++) {
    let prevSegment = millipede[i - 1];
    let currentSegment = millipede[i];
    
    // Calculate direction from current segment to segment ahead
    direction = p5.Vector.sub(prevSegment, currentSegment);
    direction.setMag(segmentLength);
    
    // Update the current segment's position to follow the previous segment
    currentSegment = p5.Vector.sub(prevSegment, direction);
    millipede[i] = currentSegment; // Store the updated position
  }
  
  // Draw each segment and legs
  for (let i = 0; i < millipede.length; i++) {
    fill("white");
    noStroke();
    square(millipede[i].x, millipede[i].y, segmentLength);
    
    // Draw legs
    for (let j = 0; j < 2; j++) {
      let legOffsetX = legOffset * (j === 0 ? -1 : 1); // Left or right leg
      let legX = millipede[i].x + legOffsetX;
      let legY = millipede[i].y;
      
      fill("white");
      rect(legX, legY, 10, 5);
    }
  }
}

// Detect key press to start the game
function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "playing"; // Switch to gameplay when spacebar is pressed
  }
}

