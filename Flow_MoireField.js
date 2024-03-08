//Brandon A. Dalmer 2024
// Moire Flow Field

let resolution = 5;
let stretchFactor = 10;
let seed = 42;
let seedInput;
let lastKeyCode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas size to match the window
  noiseSeed(seed);
  
  seedInput = createInput(seed.toString());
  seedInput.position(10, 10);
  seedInput.size(windowWidth-25);
  seedInput.changed(updateSeed);
  
  textAlign(CENTER);
  redraw();
}

function draw() {
  background(255);
  generateFlowField();
  noLoop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function generateFlowField() {
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let angle = calculateFlowDirection(x, y, frameCount);
      let x2 = x + cos(angle) * resolution * 0.5;
      let y2 = y + sin(angle) * resolution * 0.5;
      let stretchedY = y2 + (y * stretchFactor / height);
      stroke(0);
      line(x, y, x2, stretchedY);
    }
  }
}

function calculateFlowDirection(x, y, frame) {
  let angle = noise(x * 0.03, y * 0.01, frame * 0.01);
  return angle * TWO_PI;
}

function updateSeed() {
  let value = seedInput.value();
  if (!isNaN(value)) {
    seed = int(float(value)); // Update the seed value
    noiseSeed(seed);
    redraw();
  }
}
