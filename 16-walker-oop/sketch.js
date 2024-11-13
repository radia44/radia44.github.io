// Walker OOP Demo
// Radia Jannat
// November 13, 2024

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 3;
    this.colour = theColour;
  }
  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }
  move() {
    let choice = random(100);
    if (choice < 25) {
      // up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else if (choice < 100) {
      // right
      this.x += this.speed;
    }
  }
}

let winston;
let radia;

function setup() {
  createCanvas(windowWidth, windowHeight);
  winston = new Walker(width/2, height/2, "red");
  radia = new Walker(200, 300, "blue");
}

function draw() {

  winston.display();
  radia.display();

  winston.move();
  radia.move();
}
