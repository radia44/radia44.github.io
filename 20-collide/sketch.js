// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let hit = false;

function draw() {
    background(255);
    rect(200, 200, 100, 150);

    hit = collidePointRect(mouseX, mouseY, 200, 200, 100, 150);

    // Use vectors as input:
    // const mouse      = createVector(mouseX, mouseY);
    // const rect_start = createVector(200, 200);
    // const rect_size  = createVector(50, 150);
    // hit = collidePointRectVector(mouse, rect_start, rect_size);

    stroke(hit ? color('red') : 0);
    print('colliding?', hit);
}