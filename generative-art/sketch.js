// Generative Art
// Your Name
// October 4, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const TILE_SIZE = 5;
let theTiles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let x = 0; x < width; x += TILE_SIZE){
    for (let y = 0; y < height; y += TILE_SIZE){
      let someTiles = spawnTile(x, y);
      theTiles.push(someTiles);
    }
  }
}

function draw() {
  background("white");

  for (let myTile of theTiles) {
    stroke(255, 182, 193);
    strokeWeight(1.5)
    line(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
  }
}

function spawnTile(x, y) {
  let tile;
  let choice = random(100);

  if (choice > 50){
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
    };
  }
  else{
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
    };
  }
 
  return tile;
}
