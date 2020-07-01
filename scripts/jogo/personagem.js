class Personagem extends AnimationFit {
  constructor(matriz, imagem, variacaoX, variacaoY, scale = 1) {
    super(matriz, imagem, variacaoX, variacaoY, scale, .5, false);
    this.variacaoY = variacaoY;
    this.variacaoX = variacaoX;
    this.xInicial = this.variacaoX;
    this.yInicial = height - matriz[0][3] * scale - this.variacaoY;
    this.y = this.yInicial;
    this.x = this.variacaoX;
    
    this.largura = matriz[0][2] * scale
    this.velocidadeDoPulo = 0;
    this.gravidade = 6;
    this.alturaDoPulo = -50
    this.pulos = 0
    this.invencivel = false
    this.to = null;
    this.sceneSpeed = 1;
  }

  setAutoAnime(status = false) {
    if (this.to == null) {
      this.autoAnime = status;
    }
  }

  pula() {
    if (this.pulos < 2) {
      this.velocidadeDoPulo = this.alturaDoPulo
      this.pulos++
    }
  }

  aplicaGravidade() {
    this.y = this.y + this.velocidadeDoPulo
    this.velocidadeDoPulo = this.velocidadeDoPulo + this.gravidade

    if (this.y > this.yInicial) {
      this.y = this.yInicial
      this.pulos = 0
    }
  }

  tornarInvencivel() {
    this.invencivel = true
    setTimeout(() => {
      this.invencivel = false
    }, 1000)
  }

  estaColidindo(inimigo) {
    if (this.invencivel) {
      return false
    }
    let point = this.getPoint().realSize;
    const colisao = collideRectRect(
      this.x,
      this.y,
      point[0],
      point[1],
      inimigo.x,
      inimigo.y,
      inimigo.largura,
      inimigo.altura
    );

    return colisao;
  }

  moveAhead() {
    this.x += 10;
    this.sceneSpeed = 1;

    if (this.x > width / 2 - this.largura) {
      this.x = width / 2 - this.largura;
      this.sceneSpeed = 2.5;
    }
  }

  moveBack() {
    this.sceneSpeed = 1;
    this.x -= 10;
    if (this.x < this.xInicial) {
      this.x = this.xInicial
    }
  }

  hit() {
    this.setAutoAnime(true);
    clearTimeout(this.to);
    this.setMatriz(matrizPersonagem[0]);
    this.to = setTimeout(() => {
      this.to = null;
      this.setMatriz(matrizPersonagem[1]);
      this.setAutoAnime(false);
    }, 600)
  }
}