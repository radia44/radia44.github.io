// Arrays and Object Notation Fish Tank Fun
// Radia Jannat
// October 20, 2025
//
// Use of WEBGL to make a 3d canvas
// Use of trigenometry to animate in WEBGL

let fishTankSize = 500; // Size of the fish tank
let fish = [];
let bubbles = [];
let sand;
let seaweeds = [];
let numFish = 8; // Number of fish
let numBubbles = 20; // Number of bubbles

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < numFish; i++) {
    fish.push(new Fish());
  }
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push(new Bubble());
  }

  // Create sand
  sand = new Sand();

  // Create seaweed
  for (let i = 0; i < 5; i++) {
    seaweeds.push(new Seaweed(random(-fishTankSize / 2 + 10, fishTankSize / 2 - 10), random(-fishTankSize / 2 + 10, fishTankSize / 2 - 10), random(50, 100)));
  }
}

function draw() {
  background(107, 198, 254);  // Water colour background

  // Pink lighting
  ambientLight(255, 105, 180); // Pink ambient light
  pointLight(255, 105, 180, mouseX - width / 2, mouseY - height / 2, 200); 

  // Rotate the scene 
  rotateY(map(mouseX, 0, width, -PI, PI));
  rotateX(map(mouseY, 0, height, -PI / 2, PI / 2));

  // Move and show fish
  for (let f of fish) {
    f.move();
    f.display();
  }

  // Move and show bubbles
  for (let b of bubbles) {
    b.move();
    b.display();
  }

  // Draw the sand
  sand.display();

  // Draw seaweeds
  for (let seaweed of seaweeds) {
    seaweed.display();
  }
}

// Mouse clicks on the fish
function MousePressed() {
  for (let f of fish) {
    if (f.isMouseOver()) {
      f.hearts.push(new Heart(f.position.x, f.position.y, f.position.z)); // Create a new heart at the fish's position
    }
  }
}

class Fish {
  constructor() {
    this.position = createVector(
      random(-fishTankSize / 2 + 20, fishTankSize / 2 - 20),
      random(-fishTankSize / 2 + 20, fishTankSize / 2 - 20),
      random(-fishTankSize / 2 + 20, fishTankSize / 2 - 20)
    );
    this.size = random(20, 30);
    this.speed = createVector(random(-1, 1), random(-1, 1), random(-1, 1));
    this.color = color(random(100, 255), random(100, 255), random(100, 255)); // Random color for the fish
    this.hearts = []; // Array to store hearts
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

    // Update hearts
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      this.hearts[i].update();
      if (!this.hearts[i].isAlive()) {
        this.hearts.splice(i, 1); // Remove heart if it's no longer alive
      }
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);

    // Fish body
    fill(this.color);
    noStroke();
    ellipsoid(this.size, this.size / 2, this.size); // Fish body

    // Fish tail
    push();
    translate(-this.size * 1.2, 0, 0); // Move the tail to the back
    rotateZ(HALF_PI);
    fill(this.color);  // Tail color
    cone(this.size / 4, this.size / 2); // Tail as a cone
    pop();

    // Fish face
    this.addFace();

    // Display hearts
    for (let heart of this.hearts) {
      heart.display();
    }

    pop();
  }

  addFace() {
    // Random eye position and size
    let eyeSize = this.size / 5;

    // Left eye
    push();
    translate(this.size / 2.5, -this.size / 4, this.size / 2);
    fill(0); // Eye color (black)
    sphere(eyeSize); // Eye as a sphere
    pop();

    // Right eye
    push();
    translate(this.size / 2.5, -this.size / 4, -this.size / 2);
    fill(0); // Eye color (black)
    sphere(eyeSize); // Eye as a sphere
    pop();

    // Mouth
    push();
    translate(this.size / 2, this.size / 4, 0);
    fill(255, 0, 0); // Mouth color (red)
    ellipsoid(eyeSize / 2, eyeSize / 4, eyeSize / 4); // Mouth as an ellipsoid
    pop();
  }

  // Check if mouse is over this fish
  isMouseOver() {
    let d = dist(mouseX - width / 2, mouseY - height / 2, this.position.x, this.position.y);
    return d < this.size; // Check if the mouse is close enough
  }
}

class Bubble {
  constructor() {
    this.position = createVector(
      random(-fishTankSize / 2, fishTankSize / 2),
      fishTankSize / 2 + 10, // Start above the tank
      random(-fishTankSize / 2, fishTankSize / 2)
    );
    this.size = random(5, 15);
    this.speed = random(0.5, 2); // Bubble speed (adjusted to move upwards faster)
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
    fill(173, 216, 230, 150); // Light blue color for the bubbles (with some transparency)
    noStroke();
    sphere(this.size); // Draw bubble as sphere
    pop();
  }
}

// Heart class to create heart animations
class Heart {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.size = 10; // Size of the heart
    this.lifetime = 255; // Heart opacity
  }

  update() {
    this.position.y -= 2; // Move heart upwards
    this.lifetime -= 5; // Fade out the heart
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255, 0, 0, this.lifetime); // Red heart color
    noStroke();
    beginShape();
    vertex(0, -this.size / 2);
    bezierVertex(this.size / 2, -this.size, this.size, -this.size / 2, 0, 0);
    bezierVertex(-this.size, -this.size / 2, -this.size / 2, -this.size, 0, -this.size / 2);
    endShape(CLOSE);
    pop();
  }

  isAlive() {
    return this.lifetime > 0;
  }
}

class Sand {
  display() {
    push();
    translate(0, fishTankSize / 2 - 5, 0); // Position the sand at the bottom of the tank
    fill(255, 236, 0);// 
    noStroke();
    box(fishTankSize, 1, fishTankSize); // Draw a thin box for the sand
    pop();
  }
}

class Seaweed {
  constructor(x, z, height) {
    this.position = createVector(x, fishTankSize / 2 - height / 2, z); // Start from the bottom
    this.height = height;
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);

    fill(34, 139, 34); // Seaweed green color
    noStroke();

    // Draw seaweed as wavy cylinders
    for (let i = 0; i < 5; i++) {
      push();
      translate(0, -this.height / 5 * i); // Stack small segments to form the seaweed
      rotateZ(sin(frameCount * 0.05 + i) * PI / 8); // Waving effect
      cylinder(3, this.height / 5); // Thin seaweed cylinder
      pop();
    }

    pop();
  }
}
