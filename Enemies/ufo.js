function UFO() {
  this.position = createVector(random(-width, width), random(height));
  this.velocity = p5.Vector.random2D();
  this.velocity.mult(2.3);
  this.heading = random(0,10);
  this.r = 30;
  this.toDelete = false;
  this.alienLasers;
  this.damage = 100;

  this.update = function() {
    this.position.add(this.velocity);
  };

  this.show = function(sprite) {
    this.heading += 0.01
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading + PI / 2);
    image(sprite, 0, 0, this.r * 2, this.r * 2);
    pop();
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

  this.addLaser = function(laser) {
    this.alienLasers = laser;
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
