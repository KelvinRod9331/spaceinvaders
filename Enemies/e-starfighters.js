function eStarFighter() {
  this.position = createVector(random(-width,width), random(-height));
  this.velocity = p5.Vector.random2D();
  this.velocity.mult(1.2);
  this.heading = random(0,100);
  this.rotation = 0;
  this.r = 15;

  this.xdir = 3;
  this.ydir = 2;
  this.isThrusting = true;
  this.toDelete = false;
  this.switch_movement = false
  this.counter = 0;
  this.alienLasers;
  this.power = 100;
  this.health = 50;

  this.show = function(sprite) {
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading + PI / 2);
    image(sprite, 0, 0, this.r * 2, this.r * 2);
    pop();
  };

  this.health_bar = function() {
    var greenC = green(color(20, 200, 200));
    var redC = red(color(255, 204, 0));

    stroke(255);
    fill(redC, 0, 0);
    rect(this.position.x - 25, this.position.y - 30, 51, 6);

    noStroke();
    fill(0, greenC, 0);
    rect(this.position.x - 24, this.position.y - 29, this.health, 5);

    fill(255);

    /**
     *  push();
    stroke(255);
    fill(redC, 0, 0);
    translate(this.position.x - 25, this.position.y - 30);
    rect(0, 0, 51, 6);
    pop();

    push();
    noStroke();
    fill(0, greenC, 0);
    translate(this.position.x - 24, this.position.y - 29);
    rect(0, 0, this.health, 5);
    pop();
    fill(255);
     */
  };

  this.update = function() {
    if (this.isThrusting) {
      this.thrust();
    }
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
  };

   

  this.remove = function() {
    this.toDelete = true;
  };

  this.thrust = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.01);
    this.velocity.add(force);
  };

  this.addLaser = function(laser) {
    this.alienLasers = laser;
  };

  this.turn = function() {
    this.heading += this.rotation;
  };

  this.setRotation = function(a) {
    this.rotation = a;
  };

  this.collided = function(ship) {
    let d = dist(ship.position.x, ship.position.y, this.position.x, this.position.y);
    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  };

  this.damaged = function(d) {
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
