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
  this.alienLasers_Sound;

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

  this.offScreen = function() {
    if (this.position.y > height - 110) {
      return true;
    }
    return false;
  };
}
