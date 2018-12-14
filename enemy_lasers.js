function EnemyLaser(alien) {
  this.xL = alien.x - 10;
  this.yL =  alien.y + 20;
  this.xR = alien.x + 10;
  this.yR = this.yL;
  this.r = 2;
  this.toDelete = false;

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.xL, this.yL, this.r, 20);
    image(sprite, this.xR, this.yR, this.r, 20);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.hits = function(ship) {
    var left = dist(this.xL, this.yL, ship.x, ship.y);
    var right = dist(this.xR, this.yR, ship.x, ship.y);
    if (left < this.r + ship.r || right < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  };

  this.move = function() {
    this.yL = this.yL + 10;
    this.yR = this.yR + 10;
  };

  this.offScreen = function() {
    if (this.y > height) {
      return true;
    }
    return false;
  };
}
