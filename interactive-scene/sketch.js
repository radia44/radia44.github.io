
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let millipede = [];
let totalSegments = 65;
let segmentLength = 15;
let direction;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize millipede
  for (let i = 0; i < totalSegments; i++ ){
    let position = createVector(width/2, height/2);
    millipede.push(position);
  }
}

function draw() {
  background(0);
  
  // The first segment (head) follows the mouse
  
  let head = createVector(mouseX, mouseY);
  millipede[0] = head;
  
  // Make each segment follow the one ahead of it
  
  for (let i = 1; i < millipede.length; i++){
    let prevSegment = millipede[i - 1];
    let currentSegment = millipede[i];
    
    // Calculate direction from current segment to segment ahead
  
    direction = p5.Vector.sub(prevSegment, currentSegment);
    direction.setMag(segmentLength);
    
    // Update the current segment's position to follow the previous segment
  
    currentSegment = p5.Vector.sub(prevSegment, direction);
    millipede[i] = currentSegment; // Store the updated position
    
    // Draw each segment as an ellipse (circle)
    for (let i = 0; i < millipede.length; i++) {
      fill(222, 255, 0);
      noStroke();
      square(millipede[i].x, millipede[i].y, segmentLength);  // Draw each segment
    }
    
  }
    
  
}
