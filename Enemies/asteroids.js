function Asteroids(position, r) {

this.position = position
    ? position.copy()
    : createVector(random(-width, width), random(-height));
  this.velocity = p5.Vector.random2D();
  this.r = r ? r * 0.5 : random(10, 50);
  this.amount = floor(random(5, 15));
  this.heading = random(0,10)

  this.show = function(sprite) {
    this.heading += 0.01
    push();
    translate(this.position.x, this.position.y);
    imageMode(CENTER);
    rotate(this.heading + PI / 2);
    for (let i = 1; i < this.amount; i++) {
      image(sprite, 0, 0, this.r * 2, this.r * 2);
    }
    pop();
  };


  this.update = function() {
    this.position.add(this.velocity);
  };

  this.collision = function() {
    var piece = [];
    piece[0] = new Asteroids(this.position, this.r);
    piece[1] = new Asteroids(this.position, this.r);
    return piece;
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
