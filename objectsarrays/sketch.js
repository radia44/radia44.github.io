// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fishTankSize = 300; // Size of the fish tank
let fish = [];
let bubbles = [];
let numFish = 5; // Number of fish
let numBubbles = 20; // Number of bubbles

function setup() {
  createCanvas(800, 600, WEBGL);
  for (let i = 0; i < numFish; i++) {
    fish.push(new Fish());
  }
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push(new Bubble());
  }
}

function draw() {
  background(50, 100, 200);  // Water-like background

  // Set up lighting
  ambientLight(100, 100, 150);
  pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 200);

  // Rotate the scene with mouse dragging
  rotateY(map(mouseX, 0, width, -PI, PI));
  rotateX(map(mouseY, 0, height, -PI / 2, PI / 2));

  // Draw fish tank boundaries
  noFill();
  stroke(255);
  box(fishTankSize);  // 3D box to represent the fish tank

  // Move and display each fish
  for (let f of fish) {
    f.move();
    f.display();
  }

  // Move and display each bubble
  for (let b of bubbles) {
    b.move();
    b.display();
  }
}

class Fish {
  constructor() {
    this.position = createVector(random(-fishTankSize / 2 + 20, fishTankSize / 2 - 20),
                                  random(-fishTankSize / 2 + 20, fishTankSize / 2 - 20),
                                  random(-fishTankSize / 2 + 20, fishTankSize / 2 - 20));
    this.size = random(10, 20);
    this.speed = createVector(random(-1, 1), random(-1, 1), random(-1, 1));
  }

  move() {
    this.position.add(this.speed);

    // Bounce off walls
    if (this.position.x < -fishTankSize / 2 || this.position.x > fishTankSize / 2) {
      this.speed.x *= -1;
    }
    if (this.position.y < -fishTankSize / 2 || this.position.y > fishTankSize / 2) {
      this.speed.y *= -1;
    }
    if (this.position.z < -fishTankSize / 2 || this.position.z > fishTankSize / 2) {
      this.speed.z *= -1;
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255, 150, 0); // Color of the fish
    noStroke();
    ellipsoid(this.size, this.size / 2, this.size); // Draw fish as ellipsoid
    pop();
  }
}

class Bubble {
  constructor() {
    this.position = createVector(random(-fishTankSize / 2, fishTankSize / 2),
                                  fishTankSize / 2 + 10, // Start above the tank
                                  random(-fishTankSize / 2, fishTankSize / 2));
    this.size = random(5, 15);
    this.speed = random(-0.5, 0.5);
  }

  move() {
    this.position.y -= this.speed; // Move bubble upwards
    if (this.position.y < -fishTankSize / 2) {
      this.position.y = fishTankSize / 2 + 10; // Reset bubble to the top
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255, 255, 255, 150); // Color of the bubbles
    noStroke();
    sphere(this.size); // Draw bubble as sphere
    pop();
  }
}
