
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  strokeWeight(20);
  stroke('white');
  line(windowWidth/2, 200, windowWidth/2, 600);

  let y = 25;
  while (y<height){
    stroke('white');
    strokeWeight(5);
    line(width/2-10, y, width/2+10, y);
    y += 10;
  }
}
