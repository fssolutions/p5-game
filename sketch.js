function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(28)
  level1 = new Level1()
  level1.setup();
  credits = new Credits();
  scenes = {
    credits,
    level1
  };
}

function keyPressed() {
  scenes[currentScene].keyPressed(key);
}

function keyReleased() {
  scenes[currentScene].keyReleased(key);
}

function draw() {
  scenes[currentScene].draw();
}