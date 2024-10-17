// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push(); // saves transformation matrix
  translate (200, 200); // moves origin
  rotate(mouseX);
  fill("red")
  square(0, 0, 50);
  pop(); // reset to the pushed transformation matrix

  fill("green")
  rect(width/2, 400, width*2, 200)
}
