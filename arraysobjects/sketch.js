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
let gameState = "start"; // To track the game state
let currentBeatmapIndex = 0;

// Beatmap data (time is in milliseconds)
let beatmap = [ 
  { type: '←', time: 333 },
  { type: '←', time: 666 },
  { type: '←', time: 999 },
  { type: '↑', time: 1200 },
  { type: '←', time: 1467 },
  { type: '→', time: 1733 },
  // Add the rest of your beatmap entries here...
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "end") {
    showEndScreen();
  }
}

function keyPressed() {
  if (gameState === "start" && key === ' ') {
    gameState = "playing"; // Start the game
    backgroundMusic.loop(); // Start the background music
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

function showStartScreen() {
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Press Space to Start", width / 2, height / 2);
}

function playGame() {
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

  // Check if the current time matches the beatmap for arrow generation
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

  // End game after music finishes (using music duration)
  if (backgroundMusic.currentTime() >= backgroundMusic.duration()) {
    gameState = "end"; // Change game state to end
  }
}

function showEndScreen() {
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Game Over! Your Score: ${score}`, width / 2, height / 2);
}

// Arrow class definition remains the same
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

