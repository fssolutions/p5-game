function preload() {
  font_segoeuil = loadFont('fonts/segoeuil.otf');
  image_logo = loadImage('assets/image/logo.png')
  image_relva = loadImage('assets/image/relva.png')
  imagemPersonagem = loadImage('assets/image/player.png');
  fita = loadJSON('fita/fita.json')
  imagemGameOver = loadImage('assets/image/game_over.png');
  imagemControle = loadImage('assets/image/control.png');
  // somDoJogo = loadSound('sons/trilha_jogo.mp3');
  // somDoPulo = loadSound('sons/somPulo.mp3');
  somGameOver = loadSound('assets/sounds/game_over.mp3');
  somDoJogo = loadSound('assets/sounds/level1.mp3');
  somKnifesharpener = loadSound('assets/sounds/qubodup-megaswosh2.wav');
  somMiss = loadSound('assets/sounds/2.wav');
}

const Y_AXIS = 1;
const X_AXIS = 2;
function setGradient(x, y, w, h, c1, c2, axis) {
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
  stroke(0);
}