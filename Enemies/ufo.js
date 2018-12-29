function UFO() {
  this.position = createVector(-50, random(height));
  this.velocity = p5.Vector.random2D();
  this.velocity.mult(2);
  this.r = 25;
  this.toDelete = false;
  this.alienLasers;
  this.alienLasers_Sound;
  this.damage = 100;

  this.update = function() {
    this.position.add(this.velocity);
  };

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.position.x, this.position.y, this.r * 2, this.r * 2);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.collided = function(ship) {
    let d = dist(ship.x, ship.y, this.position.x, this.position.y);
    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  };

  this.addLaser = function(laser, sound) {
    this.alienLasers = laser;
    this.alienLasers_Sound = sound;
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
