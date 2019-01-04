function Ship() {
  this.x = windowWidth / 2;
  this.y = windowHeight - 30;
  this.r = 25;
  this.shield = false;
  this.health = 400;
  this.score = 0;
  this.level = 1;
  this.high_score = 0;
  this.lives = 3;
  this.wingman_activated = false;
  this.wingmanX;

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.x, this.y, this.r * 2, this.r * 2);
  };

  this.showShield = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.x, this.y, this.r * 4, this.r * 3);
  };

  this.wingman = function(sprite) {
    this.wingmanX = this.x + this.r * 2;
    imageMode(CENTER);
    image(sprite, this.wingmanX, this.y, this.r * 2, this.r * 2);
  };

  this.move = function(dir) {
    this.x += dir * 5;

    if (this.wingman_activated) {
      this.wingmanX += this.x;
    }
  };

  this.offScreen = function() {
    if (this.x < this.r) {
      this.move(1);
    } else if (this.x > width - this.r) {
      this.move(-1);
    }
  };

  this.damage = function(d) {
    this.health -= d;
  };

  this.lifeIndicator = function() {
    push()
    textAlign(RIGHT);
    textSize(10);
    fill(255);
    text(`${this.lives}`, this.x + this.r, this.y - 10);
    pop();
  };

  this.weapon_Gauge = function() {
    push();
    translate(this.x - this.r * 1.5, this.y - 20);
    rotate(-45);
    noStroke();
    fill(0, 255, 0);
    rect((this.x - this.r * 1.5) / 2, (this.y - 20) / 2, 20, 2);
    pop();
  };
}
