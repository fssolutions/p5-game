class Credits extends Level {
  constructor() {
    super()
  }

  draw() {
    this._background();
    this._text_infors();
  }

  keyPressed(key) {
    //yeasteggs/cheats in future

    currentScene = 'level1';
  }

  // to botton to right #future
  _deepskyblue = color(0, 191, 255);
  _skyblue = color(135, 206, 235);

  _background() {
    setGradient(0, 0, width, height, this._deepskyblue, this._skyblue, Y_AXIS);
    // image(imagemTelaInicial, 0, 0, width, height);
    image(image_logo, width / 2 - image_logo.width / 2, 0);
    image(image_relva, 0, height - image_relva.height);
  }

  _width = width;
  _text_infors() {
    textFont(font_segoeuil);
    textAlign(CENTER)
    textSize(100);
    text('Shadow DEV', width / 2, image_logo.height + 5);
    textSize(40);
    text('pressione para iniciar', width / 2, image_logo.height + 50);

    textSize(100);
    textAlign(LEFT)
    let text_credit = text('Alura    #imersaogamedev    Flávio Oliveira Silva    https://github.com/fssolutions/p5-game', this._width, height - 25);
    this._width -= 2;
    if ((text_credit.width * 2.8 + this._width) < 0) {
      this._width = width;
    }
  }

}