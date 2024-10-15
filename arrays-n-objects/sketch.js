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
  { key: 'ArrowUp', symbol: '↑', x: 100 },
  { key: 'ArrowRight', symbol: '→', x: 200 },
  { key: 'ArrowDown', symbol: '↓', x: 300 },
  { key: 'ArrowLeft', symbol: '←', x: 400 }
];
let speed = 3;
let score = 0;
let videoPlaying = false; // Flag to track video play status

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

    // Generate new arrows every second
    setInterval(() => {
      let randomArrow = random(arrowData);
      arrows.push(new Arrow(randomArrow.symbol, randomArrow.x));
    }, 1000);
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

  // Display the player's score
  fill(255);
  textSize(32);
  text(`Score: ${score}`, 10, 40);
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