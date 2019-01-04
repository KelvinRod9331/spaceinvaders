function DeathGlider(x, y) {
  this.position = {
    x: x,
    y: y
  };
  this.r = 15;
  this.xdir = 2;
  this.ydir = 4;
  this.toDelete = false;
  this.switch_movement = false;
  this.velocity = 0;
  this.damage = 100;
  this.alienLasers;
  this.alienLasers_Sound;
  this.counter = 0;

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.position.x, this.position.y, this.r * 2, this.r * 2);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.addLaser = function(laser, sound) {
    this.alienLasers = laser;
    this.alienLasers_Sound = sound;
  };

  this.shiftDown = function() {
    this.xdir *= -1;
    this.position.y += 10;

    if (this.position.y > 400 && this.position.y < 700) {
      this.xdir *= 1.15;
    } else if (this.position.y > 700 && this.position.y < 900) {
      this.xdir *= 1.25;
    } else if (this.position.y > 900) {
      this.xdir *= 1.35;
    }
  };

  this.move = function() {
    this.position.x = this.position.x + this.xdir;
  };

  this.kamikaze = function(ship) {
    if (this.counter == 150) {
      this.xdir *= -1;
      this.counter = 0;
    } else {
      this.counter++;
    }

    if (
      this.position.x > ship.x - ship.r &&
      this.position.x < ship.x + ship.r &&
      this.position.y > ship.y - 200
    ) {
      this.position.x = ship.x;
    }

    this.position.x += this.xdir * 1.2;
    this.position.y += this.ydir;
  };

  this.collided = function(ship) {
    let d = dist(ship.x, ship.y, this.position.x, this.position.y);
    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
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

  this.offScreen = function() {
    if (this.position.y > height - 110) {
      return true;
    }
    return false;
  };
}
