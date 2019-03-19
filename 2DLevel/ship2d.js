function Ship2D() {
  this.position = createVector(width / 2, height / 2);
  this.r = 25;
  this.heading = 0;
  this.rotation = 0;
  this.velocity = createVector(0, 0);
  this.isThrusting = false;

  // this.startingP = false
  this.shield = false;
  this.health = 400;
  this.score = 0;
  this.level = 5;
  this.high_score = 0;
  this.lives = 3;
  this.wingman_activated = false;
  this.wingmanX;
  this.tail_heading = this.heading + PI;
  this.x_offset = cos(this.tail_heading) * (this.r / 2);
  this.y_offset = sin(this.tail_heading) * (this.r / 2);
  this.exhaust_center_x = this.position.x + this.x_offset;
  this.exhaust_center_y = this.position.y + this.y_offset;

  this.show = function(sprite) {
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading + PI / 2);
    image(sprite, 0, 0, this.r * 2, this.r * 2);
    pop();

    if (keyIsDown(UP_ARROW)) {
      push();
      translate(this.exhaust_center_x, this.exhaust_center_y);
      rotate(this.heading + PI / 2);
      image(sprites.thrust, 0, 16, 25, this.r);
      pop();
    }
  };

  this.showShield = function(sprite) {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading + PI / 2);
    imageMode(CENTER);
    image(sprite, 0, 0, this.r * 4, this.r * 3);
    pop();
  };

  this.rotate = function() {
    this.heading += this.rotation;
    this.tail_heading = this.heading + PI;
  };

  this.thrusting = function(b) {
    this.isThrusting = b;
  };

  this.setRotation = function(a) {
    this.rotation = a;
  };

  this.update = function() {
    if (this.isThrusting) {
      this.thrust();
    }
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
    this.x_offset = cos(this.tail_heading) * (this.r / 2);
    this.y_offset = sin(this.tail_heading) * (this.r / 2);
    this.exhaust_center_x = this.position.x + this.x_offset;
    this.exhaust_center_y = this.position.y + this.y_offset;
  };

  this.thrust = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
  };

  this.collided = function(asteroid) {
    let d = dist(
      this.position.x,
      this.position.y,
      asteroid.position.x,
      asteroid.position.y
    );

    if (d < asteroid.r) {
      return true;
    }
    return false;
  };

  this.wingman = function(sprite) {
    this.wingmanX = this.x + this.r * 2;
    imageMode(CENTER);
    image(sprite, this.wingmanX, this.y, this.r * 2, this.r * 2);
  };

  this.damage = function(d) {
    this.health -= d;
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
