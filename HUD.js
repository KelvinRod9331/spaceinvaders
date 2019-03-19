class HUD {

    constructor(){
        this.special = 'Empty'
        this.number = ''
        this.twoD_UP = ''
    }
  show(ship,sprites) {
    this.healthBar = new HealthBar();
    this.healthBar.show(ship.health, ship.shield);
    this.LeftHUD(ship.level);
    this.RightHUD(ship.score, ship.high_score);
    this.Instructions()
    this.LifeIndicator(sprites.ship,ship.r,ship.lives)
  }

  LeftHUD(level) {
    textAlign(LEFT);
    textSize(15);
    fill(255);
    text(`Level: ${level}`, 200, 60);
    text(`Special: ${this.special} ${this.number}`, 200, 90);
  }

  RightHUD(score, highscore) {
    textAlign(RIGHT);
    textSize(15);
    fill(255);
    text(`Score: ${score}`, width - 200, 60);
    text(`Hi-Score: ${highscore}`, width - 200, 90);
  }

  Instructions(){
    if(levelC == 5) this.twoD_UP = '| ▲ Boost '
    textAlign(CENTER);
    textSize(15);
    fill(255);
    text(`◀ Move Left  ${this.twoD_UP} |  Move Right ▶ `, width / 2, 90);
    text('Z : Shoot  |  X : Special  |  P : Pause  |  R : Resume  |  M : Mute Sound', width / 2, 120);
  }


  LifeIndicator(sprite,r,lives) {
    push()
    textAlign(RIGHT);
    textSize(12);
    fill(255);
    imageMode(CENTER);
    image(sprite, width / 3 - 50, height / 18, r * 1.3, r * 1.3);
    text(`x ${lives}`, width / 3 - 26, height / 20);
    pop();
  };
}
