function Laser(ship) {
  this.xL = ship.x - 10;
  this.yL = height - 100;
  this.xR = ship.x + 10;
  this.yR = this.yL;
  this.r = 2;
  this.toDelete = false;

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.xL, this.yL, this.r , 20);
    image(sprite, this.xR, this.yR, this.r , 20);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.hits = function(alien) {
    var left = dist(this.xL, this.yL, alien.x, alien.y);
    var right = dist(this.xR, this.yR, alien.x, alien.y)
    if (left < this.r + alien.r || right < this.r + alien.r) {
      return true;
    } else {
      return false;
    }
  };

  this.move = function() {
    this.yL = this.yL - 10 ;
    this.yR = this.yR - 10
  };

  this.offScreen = function() {
    if (this.y < 0) {
      this.toDelete = true
    }
   
  };
}
