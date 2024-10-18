// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let backgroundMusic;
let video;
let arrows = [];
let arrowData = [
  { key: 'ArrowLeft', symbol: '←', x: 100 },
  { key: 'ArrowUp', symbol: '↑', x: 200 },
  { key: 'ArrowDown', symbol: '↓', x: 300 },
  { key: 'ArrowRight', symbol: '→', x: 400 },
];
let speed = 10;
let score = 0;
let img;

// Flag to track video play status
let videoPlaying = false;

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
  { type: '←', time: 12800}
];

let currentBeatmapIndex = 0;

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
  
  // Ensure the path to the video file is correct
  video = createVideo('Berserk intro (HD) - GG Analysis (720p, h264, youtube).mp4');
  video.hide(); // Hide default video controls
  
  // Mute the video to allow autoplay
  video.volume(0);
  
  // Play video when loaded, check if it's already playing
  video.onloadeddata = function() {
    if (!videoPlaying) {

      video.play(); // Play the video when it's loaded
      videoPlaying = true; // Set the flag to true
    }
  };
  
  // Fallback to play video on mouse press
  mousePressed = function() {
    if (!videoPlaying) {
      video.play(); // Play the video when the user clicks
      videoPlaying = true; // Set the flag to true
    };

    if (!backgroundMusic.isPlaying()) {
      backgroundMusic.loop();  // Play the music in a loop
    };

    let nowTime = millis();
  };
}

function draw() {
  background(0);
  
  // Draw the video as the background
  image(video, 0, 0, width, height); // Draw the video to cover the entire canvas

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


  // Check if the current time matches the beatmap for arrow generation

  // Track the score
  fill(255);
  textSize(32);
  text(`Score: ${score}`, 25, 40);
}

function keyPressed() {
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
  if (gameState === "start" && key === ' ') {
    gameState = "playing"; // Switch to gameplay when spacebar is pressed
  }
}

function showStartScreen() {
}