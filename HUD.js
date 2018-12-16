class HUD {

    constructor(){
        this.special = 'Empty'
        this.number = ''
    }
  show(score, level, health, highscore, special) {
    this.healthBar = new HealthBar();
    this.healthBar.show(health);
    this.LeftHUD(level, special);
    this.RightHUD(score, highscore);
  }

  LeftHUD(level, special) {
    textAlign(LEFT);
    textSize(15);
    fill(255);
    text(`Level: ${level}`, 80, 50);
    text(`Special: ${this.special} ${this.number}`, 80, 80);
  }

  RightHUD(score, highscore) {
    // textFont();
    textAlign(RIGHT);
    textSize(15);
    fill(255);
    text(`Score: ${score}`, width - 80, 50);
    text(`Hi-Score: ${highscore}`, width - 80, 80);
  }
}
