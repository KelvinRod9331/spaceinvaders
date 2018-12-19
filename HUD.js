class HUD {

    constructor(){
        this.special = 'Empty'
        this.number = ''
    }
  show(ship) {
    this.healthBar = new HealthBar();
    this.healthBar.show(ship.health, ship.shield);
    this.LeftHUD(ship.level);
    this.RightHUD(ship.score, ship.high_score);
    this.Instructions()
  }

  LeftHUD(level) {
    textAlign(LEFT);
    textSize(15);
    fill(255);
    text(`Level: ${level}`, 200, 60);
    text(`Special: ${this.special} ${this.number}`, 200, 90);
  }

  RightHUD(score, highscore) {
    // textFont();
    textAlign(RIGHT);
    textSize(15);
    fill(255);
    text(`Score: ${score}`, width - 200, 60);
    text(`Hi-Score: ${highscore}`, width - 200, 90);
  }

  Instructions(){
    textAlign(CENTER);
    textSize(15);
    fill(255);
    text(`◀ Move Left | Move Right ▶`, width / 2, 90);
    text('Z : Shoot  |  X : Special  |  P : Pause  |  R : Resume  |  M : Mute Sound', width / 2, 120);
  }
}
