class AnimationFit {
  constructor(matriz, imagem, x, variacaoY, scale = 1, frameRate = 1, autoAnime = true) {
    this.matriz = matriz;
    this.imagem = imagem;
    this.scale = scale;
    this.x = x;
    this.variacaoY = variacaoY;
    this.y = height - this.altura - this.variacaoY;

    this.frameAtual = 0;
    this.frameRate = frameRate;
    this.autoAnime = autoAnime;
  }

  exibe() {
    let fa = Math.floor(this.frameAtual);
    image(this.imagem, this.x, this.y, this.matriz[fa][2] * this.scale, this.matriz[fa][3] * this.scale, this.matriz[fa][0], this.matriz[fa][1], this.matriz[fa][2], this.matriz[fa][3]);

    if (this.autoAnime) {
      this.anima();
    }
  }

  anima() {
    this.frameAtual += this.frameRate;

    if (this.frameAtual >= this.matriz.length - 1) {
      this.frameAtual = 0
    }
  }

  setMatriz(matriz) {
    if (this.matriz != matriz) {
      this.frameAtual = 0;
      this.matriz = matriz;
    }
  }

  setAutoAnime(status = false) {
    this.autoAnime = status;
  }
}