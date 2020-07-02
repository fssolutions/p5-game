class Level1 extends Level {
  constructor() {
    super();
    this.indice = 0;

    /**
     * Exemplo da matriz de inimigos... mas será refeito pela funcão setup()
     * para gera posição e quantidade aletoria.
     */

    this.mapa = [
      {
        "inimigo": 0,
        "velocidade": 10
      },
      {
        "inimigo": 1,
        "velocidade": 12
      },
      {
        "inimigo": 2,
        "velocidade": 15
      },
      {
        "inimigo": 0,
        "velocidade": 10
      },
      {
        "inimigo": 2,
        "velocidade": 10
      }
    ]
  }

  _randomBetween(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
  }

  setup() {
    this.imagemScenario1 = loadImage('assets/image/back-1.png');
    this.imagemScenario2 = loadImage('assets/image/back-2.png');
    this.imagemScenario3 = loadImage('assets/image/back-3.png');
    this.imagemScenario4 = loadImage('assets/image/back-4.png');
    this.imagemScenario5 = loadImage('assets/image/back-5.png');
    this.imagemInimigo = loadImage('assets/image/gotinha.png');
    this.imagemInimigoVoador = loadImage('assets/image/gotinha-voadora.png');
    this.troll = loadImage('assets/image/troll.png');

    this.showTutorial = true;

    this.scenario5 = new Scenario(this.imagemScenario5, .5);
    this.scenario4 = new Scenario(this.imagemScenario4, 1);
    this.scenario3 = new Scenario(this.imagemScenario3, 1.5);
    this.scenario2 = new Scenario(this.imagemScenario2, 2);
    this.scenario1 = new Scenario(this.imagemScenario1, 3);
    pontuacao = new Pontuacao();
    vida = new Vida(fita.configuracoes.vidaMaxima, fita.configuracoes.vidaInicial);

    personagem = new Personagem(matrizPersonagem[1], imagemPersonagem, 20, 10, 1.5);

    // const inimigo = new Inimigo(matrizInimigo, this.imagemInimigo, width - 52, 30, 52, 52, 104, 104, 10);
    let numeroInimigos = this._randomBetween(20, 5);
    this.mapa = [];
    for (let i = 0; i < numeroInimigos; i++) {
      inimigos.push(new Inimigo(matrizInimigoVoador, this.imagemInimigoVoador, width - 52, this._randomBetween(400, 200), 100, 75, 200, 150, 10));
      this.mapa.push({
        "inimigo": this._randomBetween(numeroInimigos - 1),
        "velocidade": this._randomBetween(15, 8)
      });
    }

    somDoJogo.loop();
  }

  keyPressed(key) {
    this.showTutorial = false;

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

  _deepskyblue = color(135, 206, 235);
  _skyblue = color(this._randomBetween(255), this._randomBetween(255), this._randomBetween(255));

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
      pontuacao.adicionarPonto();
    }
  }

  draw() {
    setGradient(0, 0, width, height, this._deepskyblue, this._skyblue, Y_AXIS);

    this.scenario5.show()
    this.scenario4.show()
    this.scenario3.show()
    this.scenario2.show()

    personagem.exibe();
    personagem.aplicaGravidade();
    this.scenario1.show()

    vida.draw()
    pontuacao.exibe()

    const linhaAtual = this.mapa[this.indice]
    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < -inimigo.largura;

    inimigo.velocidade = linhaAtual.velocidade;

    inimigo.exibe()
    inimigo.move()


    if (inimigoVisivel) {
      this.indice++;
      inimigo.aparece()
      if (this.indice > this.mapa.length - 1) {
        this.indice = 0;
      }
    }

    if (!inimigo.isDead && personagem.estaColidindo(inimigo)) {
      if (personagem.isHited()) {
        inimigo.matar();
        pontuacao.adicionarPonto(100);
        personagem.tornarInvencivel();
      } else {
        somMiss.play();
        vida.perdeVida();
        personagem.tornarInvencivel();
        if (vida.vidas === 0) {
          image(imagemGameOver, width / 2 - 330, height / 3);
          somDoJogo.stop();
          somGameOver.play();
          noLoop();
        }
      }
    }
    this._control();

    if(this.showTutorial){
      image(imagemControle, width / 2 - 565.5, height / 2.5)
    }
  }
}