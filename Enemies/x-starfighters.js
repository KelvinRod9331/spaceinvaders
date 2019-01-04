function xStarFighter(x, y) {
  this.position = {
    x: x,
    y: y
  }
  this.r = 15;
  this.xdir = 2;
  this.toDelete = false;
  this.damage = 80
  this.alienLasers;


  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.position.x, this.position.y, this.r * 2, this.r * 2);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.addLaser = function(laser) {
    this.alienLasers = laser;
  };

  this.shiftDown = function() {
    this.xdir *= -1;
    this.position.y += 10;

    if (this.position.y > 400 && this.position.y < 700) {
      this.xdir *= 1.20;
    } else if (this.position.y > 700 && this.position.y < 900) {
      this.xdir *= 1.40;
    } else if (this.position.y > 900) {
      this.xdir *= 1.60;
    }
  };

  this.move = function() {
    this.position.x = this.position.x + this.xdir;
  };

  this.collided = function(ship) {
    let d = dist(ship.x, ship.y, this.position.x, this.position.y);
    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  };

  this.offScreen = function() {
    if (this.position.y > height - 110) {
      return true;
    }
    return false;
  };

  this.screenEdge = function() {
    if (this.position.x > width + this.r) {
      this.position.x = -this.r;
    } else if (this.position.x < -this.r) {
      this.position.x = width + this.r;
    }

    if (this.position.y > height + this.r) {
      this.position.y = -this.r;
    } else if (this.position.y < -this.r) {
      this.position.y = height + this.r;
    }
  };
}
