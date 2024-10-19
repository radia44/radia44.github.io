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

// Beatmap data
let beatmap = [ 
  { type: '←', time: 133 },
  { type: '←', time: 466 },
  { type: '←', time: 799 },
  { type: '↑', time: 1000 },
  { type: '←', time: 1267 },
  { type: '→', time: 1533 },
  { type: '←', time: 1800 },
  { type: '→', time: 2200 },
  { type: '↑', time: 2800 },
  { type: '↓', time: 3133 },
  { type: '→', time: 3466 },
  { type: '↑', time: 4300 },
  { type: '→', time: 4800 },
  { type: '↑', time: 5133 },
  { type: '↓', time: 5266 },
  { type: '→', time: 5600 },
  { type: '←', time: 6800 },
  { type: '→', time: 7300 },
  { type: '↑', time: 7800 },
  { type: '↓', time: 8300 },
  { type: '↑', time: 8800 },
  { type: '←', time: 9300 },
  { type: '↑', time: 9800 },
  { type: '→', time: 10100 },
  { type: '↑', time: 10800 },
  { type: '↑', time: 11800 },
  { type: '↓', time: 12133 },
  { type: '→', time: 12466 },
  { type: '←', time: 12800 }
];

let currentBeatmapIndex = 0;
let gameState = "start"; // Game states: 'start', 'playing', 'ended'
let songDuration = 15000; // Set an approximate duration for the song in milliseconds

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
  // Play the background music if it's not playing
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

  // Generate arrows according to the beatmap
  let nowTime = millis();
  if (currentBeatmapIndex < beatmap.length && nowTime >= beatmap[currentBeatmapIndex].time) {
    let arrowType = beatmap[currentBeatmapIndex].type;
    let arrowInfo = arrowData.find(arrow => arrow.symbol === arrowType);
    if (arrowInfo) {
      arrows.push(new Arrow(arrowInfo.symbol, arrowInfo.x)); // Add the new arrow from beatmap
    }
    currentBeatmapIndex++;
  }

  // Display the player's score
  fill(255);
  textSize(32);
  text(`Score: ${score}`, 25, 40);

  // Check if the song is over
  if (nowTime >= songDuration) {
    gameState = "ended"; // Switch to end state when the song ends
    backgroundMusic.stop(); // Stop the music
  }
}

function showEndScreen() {
  background(0);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Game Over! Final Score: ${score}`, width / 2, height / 2);
}

function keyPressed() {
  if (gameState === "start" && key === ' ') {
    gameState = "playing"; // Switch to gameplay when spacebar is pressed
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
