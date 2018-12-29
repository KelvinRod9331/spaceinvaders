function vStarFighter() {
  this.position = createVector(random(-width/2, width/2), -100);
  this.velocity = p5.Vector.random2D();
  this.velocity.mult(2);
  this.r = 15;
  this.xdir = 2;
  this.ydir = 2;
  this.toDelete = false;
  this.counter = 0
  this.alienLasers;
  this.alienLasers_Sound;
  this.power = 100;
  this.health = 50

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.position.x, this.position.y, this.r * 2, this.r * 2);
  };

  this.health_bar = function(){
    var greenC = green(color(20, 200, 200));
    var redC = red(color(255, 204, 0));
 
    stroke(255);
    fill(redC, 0, 0);
    rect(this.position.x - 25, this.position.y - 30 , 51, 6);

    noStroke();
    fill(0, greenC, 0);
    rect(this.position.x - 24, this.position.y - 29 , this.health, 5);

    fill(255);
  }

  this.update = function() {
    this.position.add(this.velocity);
  };

  this.kamikaze = function(ship) {
    if (this.counter === 200) {
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
      this.ydir = 4
    
    }
    this.position.x += this.xdir;
    this.position.y += this.ydir;
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.addLaser = function(laser, sound) {
    this.alienLasers = laser;
    this.alienLasers_Sound = sound;
  };

  this.collided = function(ship) {
    let d = dist(ship.x, ship.y, this.position.x, this.position.y);
    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  };

  this.damaged = function(d){
      this.health -= d
  }

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
