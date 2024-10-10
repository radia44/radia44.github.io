// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let arrows = [];
let arrowData = [
  ,{key: 'ArrowUp', symbol: '↑', x: 100,}
  ,{key: 'ArrowLeft', symbol: '←', x: 150}
  ,{key: 'ArrowDown', symbol: '↓', x: 200,}
  ,{key: 'ArrowRight', symbol: '→', x: 250,}
];

class Arrow {
  constructor(type, x) {
    this.type = type;
    this.x = x;
    this.y = 0;
    this.size = 50;
  }
}
