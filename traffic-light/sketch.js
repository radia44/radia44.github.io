// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let waitTime = 2000;
let lastTimeSwitched = 0;
let green;
let red;
let yellow;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  while (millis() > lastTimeSwitched + waitTime){
    red = true;
    if (red === true){
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill("black")
    ellipse(width/2, height/2, 50, 50); //middle
    fill("black")
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
    lastTimeSwitched = millis();
  }
    }
}