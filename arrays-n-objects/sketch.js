// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let backgroundMusic;
let arrows = [];
let arrowData = [
  { key: 'ArrowLeft', symbol: '←', x: 100 },
  { key: 'ArrowUp', symbol: '↑', x: 200 },
  { key: 'ArrowDown', symbol: '↓', x: 300 },
  { key: 'ArrowRight', symbol: '→', x: 400 },
];
let speed = 10;
let score = 0;
let songDuration = 15000; // Set this to match your music duration
let gameState = "start"; // Game states: 'start', 'playing', 'ended'
let currentBeatmapIndex = 0;
let beatmap = [ 
  { type: '←', time: 333 },
  { type: '←', time: 666 },
  { type: '←', time: 999 },
  { type: '↑', time: 1200 },
  { type: '←', time: 1467 },
  { type: '→', time: 1733 },
  { type: '←', time: 2000 },
  { type: '→', time: 2500 },
  { type: '↑', time: 3000 },
  { type: '↓', time: 3333 },
  { type: '→', time: 3666 },
  { type: '↑', time: 4500 },
  { type: '→', time: 5000 },
  { type: '↑', time: 5333 },
  { type: '↓', time: 5666 },
  { type: '→', time: 6000 },
  { type: '←', time: 7000 },
  { type: '→', time: 7500 },
  { type: '↑', time: 8000 },
  { type: '↓', time: 8500 },
  { type: '↑', time: 9000 },
  { type: '←', time: 9500 },
  { type: '↑', time: 10000 },
  { type: '→', time: 10300 },
  { type: '↑', time: 11000 },
  { type: '↑', time: 12000 },
  { type: '↓', time: 12333 },
  { type: '→', time: 12666 },
  { type: '←', time: 13000 }
];

function preload() {
  // Load the background music from the assets folder
  backgroundMusic = loadSound('Berserk intro (HD).mp3');
}

class Arrow {
  constructor(type, x) {
    this.type = type;
    this.x = x;
    this.y = 0;
    this.size = 50;
  }

  display() {
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.type, this.x, this.y);
  }

  move() {
    this.y += speed;
  }

  isInHitZone() {
    return this.y >= height - 100 && this.y <= height - 50;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "ended") {
    showEndScreen();
  }
}

function showStartScreen() {
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Press Space to Play", width / 2, height / 2);
}

function playGame() {
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();  // Play the music in a loop
  }

  // Draw target area
  fill(255, 0, 0);
  rect(0, height - 100, width, 50);

  // Display and move arrows
  for (let i = arrows.length - 1; i >= 0; i--) {
    arrows[i].display();
    arrows[i].move();

    // Remove arrows that go off the screen
    if (arrows[i].y > height) {
      arrows.splice(i, 1);
    }
  }

  // Check the beatmap for generating arrows
  let nowTime = millis();
  if (currentBeatmapIndex < beatmap.length && nowTime >= beatmap[currentBeatmapIndex].time) {
    let arrowType = beatmap[currentBeatmapIndex].type;
    let arrowInfo = arrowData.find(arrow => arrow.symbol === arrowType);
    if (arrowInfo) {
      arrows.push(new Arrow(arrowInfo.symbol, arrowInfo.x)); // Add the new arrow from beatmap
    }
    currentBeatmapIndex++;
  }

  // Display score
  fill(255);
  textSize(32);
  text(`Score: ${score}`, 25, 40);

  // End the game when the song duration is over
  if (nowTime >= songDuration) {
    gameState = "ended"; // Switch to end state
    backgroundMusic.stop(); // Stop the music
  }
}

function showEndScreen() {
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Game Over! Final Score: ${score}`, width / 2, height / 2);
}

function keyPressed() {
  if (gameState === "start" && key === ' ') {
    gameState = "playing"; // Start the game when spacebar is pressed
  }

  if (gameState === "playing") {
    for (let i = arrows.length - 1; i >= 0; i--) {
      let currentArrow = arrows[i];

      if (
        currentArrow.isInHitZone() &&
         ((keyCode === UP_ARROW && currentArrow.type === '↑') ||
         (keyCode === RIGHT_ARROW && currentArrow.type === '→') ||
         (keyCode === DOWN_ARROW && currentArrow.type === '↓') ||
         (keyCode === LEFT_ARROW && currentArrow.type === '←'))
      ) {
        score++;
        arrows.splice(i, 1); // Remove the arrow
        break;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
