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
let speed = 13;
let score = 0;

// Flag to track video play status
let videoPlaying = false;

// Beatmap data
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
}