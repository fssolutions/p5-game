class Level1 extends Level {
  constructor() {
    super();
    this.indice = 0;

    // this.mapa = fita.mapa
  }

  setup() {
    this.imagemScenario1 = loadImage('assets/image/back-1.png');
    this.imagemScenario2 = loadImage('assets/image/back-2.png');
    this.imagemScenario3 = loadImage('assets/image/back-3.png');
    this.imagemScenario4 = loadImage('assets/image/back-4.png');
    this.imagemScenario5 = loadImage('assets/image/back-5.png');
    this.scenario5 = new Scenario(this.imagemScenario5, .5);
    this.scenario4 = new Scenario(this.imagemScenario4, 1);
    this.scenario3 = new Scenario(this.imagemScenario3, 1.5);
    this.scenario2 = new Scenario(this.imagemScenario2, 2);
    this.scenario1 = new Scenario(this.imagemScenario1, 3);
    // pontuacao = new Pontuacao()
    // vida = new Vida(fita.configuracoes.vidaMaxima, fita.configuracoes.vidaInicial)

    personagem = new Personagem(matrizPersonagem[1], imagemPersonagem, 20, 10, 2);
    
    // const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 30, 52, 52, 104, 104, 10);
    // const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width - 52, 200, 100, 75, 200, 150, 10);
    // const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 15)

    // inimigos.push(inimigo)
    // inimigos.push(inimigoGrande)
    // inimigos.push(inimigoVoador)
  }

  keyPressed(key) {
    if (key === 'ArrowUp') {
      personagem.pula()
      // somDoPulo.play()
    } else if (key === ' ') {
      personagem.hit();
    }
  }

  keyReleased(key) {
    if (key !== ' ') {
      personagem.setAutoAnime(false);
    }
  }

  _randon(max = 255) {
    return Math.floor(Math.random() * max);
  }

  _deepskyblue = color(135, 206, 235);
  _skyblue = color(this._randon(), this._randon(), this._randon());

  _moveScene() {

    this.scenario5.move();
    this.scenario4.move();
    this.scenario3.move();
    this.scenario2.move();
    this.scenario1.move();
  }

  _control() {
    if (keyIsDown(LEFT_ARROW)) {
      personagem.setAutoAnime(true);
      personagem.moveBack();
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this._moveScene();
      personagem.setAutoAnime(true);
      personagem.moveAhead();
    }
  }

  draw() {
    setGradient(0, 0, width, height, this._deepskyblue, this._skyblue, Y_AXIS);

    this.scenario5.show()
    this.scenario4.show()
    this.scenario3.show()
    this.scenario2.show()
    // vida.draw()
    // pontuacao.exibe()
    // pontuacao.adicionarPonto()
    personagem.exibe();
    this.scenario1.show()
    personagem.aplicaGravidade();
    // const linhaAtual = this.mapa[this.indice]
    // const inimigo = inimigos[linhaAtual.inimigo];
    // const inimigoVisivel = inimigo.x < -inimigo.largura;

    // inimigo.velocidade = linhaAtual.velocidade;

    // inimigo.exibe()
    // inimigo.move()


    // if (inimigoVisivel) {
    //   this.indice++;
    //   inimigo.aparece()
    //   if (this.indice > this.mapa.length - 1) {
    //     this.indice = 0;
    //   }
    // }

    // if (personagem.estaColidindo(inimigo)) {
    //   vida.perdeVida()
    //   personagem.tornarInvencivel()
    //   if (vida.vidas === 0) {
    //     image(imagemGameOver, width / 2 - 200, height / 3)
    //     noLoop()
    //   }
    // }
    this._control();
  }
}