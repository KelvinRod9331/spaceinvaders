function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.r = 25;

  this.xdir = 1;
  this.toDelete = false;
  this.alienLasers;
  this.alienLasers_Sound;

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.x, this.y, this.r * 2, this.r * 2);
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
    this.y += this.r;
  };

  this.move = function() {
    this.x = this.x + this.xdir;
  };

  this.offScreen = function() {
    if (this.y > height - 110) {
      return true;
    }
    return false;
  };
}
