function Laser(ship) {
  this.xL = ship.x - 10;
  this.yL = height - 60;
  this.xR = ship.x + 10;
  this.yR = this.yL;

  this.wingmanxL = ship.wingmanX - 10;
  this.wingmanxR = ship.wingmanX + 10;
  this.r = 2;
  this.toDelete = false;
  this.power = 20;
  this.wingman_activated = ship.wingman_activated;

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.xL, this.yL, this.r, 20);
    image(sprite, this.xR, this.yR, this.r, 20);
  };

  this.wingman = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.wingmanxL, this.yL, this.r, 20);
    image(sprite, this.wingmanxR, this.yR, this.r, 20);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.hits = function(alien) {
    var left = dist(this.xL, this.yL, alien.position.x, alien.position.y);
    var right = dist(this.xR, this.yR, alien.position.x, alien.position.y);
    var alienDis;

    if (alien.r < 200) {
      alienDis = alien.r;
    } else {
      alienDis = alien.r / 3;
    }

    if (this.wingman_activated) {
      var wingmanL = dist(
        this.wingmanxL,
        this.yL,
        alien.position.x,
        alien.position.y
      );
      var wingmanR = dist(
        this.wingmanxR,
        this.yR,
        alien.position.x,
        alien.position.y
      );
      if (
        left < alienDis ||
        right < alienDis ||
        wingmanL < alienDis ||
        wingmanR < alienDis
      ) {
        return true;
      }
      return false;
    }

    if (left < alienDis || right < alienDis) {
      return true;
    } 
      return false;
  };

  this.move = function() {
    this.yL -= 10;
    this.yR -= 10;
  };

  this.offScreen = function() {
    if (this.yL < 0 || this.yR < 0) {
      this.toDelete = true;
    }
  };
}
