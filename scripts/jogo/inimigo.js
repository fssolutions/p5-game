class Inimigo extends Animacao {
  constructor(matriz, imagem, x, variacaoY, largura, altura, larguraSprite, alturaSprite, velocidade) {
    super(matriz, imagem, x, variacaoY, largura, altura, larguraSprite, alturaSprite)

    this.velocidade = velocidade;
    this.x = width;
    this.isDead = false;
    this.gravidade = .9;
    this.velocidadeDaQueda = 5;
  }

  move() {
    if(this.isDead){
      this.y += this.velocidadeDaQueda;
      this.velocidadeDaQueda += this.gravidade;

      if(this.y > height){
        this.y = this.variacaoY;
        this.x = -this.largura;
        this.isDead = false;
      }
    }else {
      this.x = this.x - this.velocidade
    }
  }

  aparece() {
    this.x = width
  }

  matar() {
    this.isDead = true;
  }
}