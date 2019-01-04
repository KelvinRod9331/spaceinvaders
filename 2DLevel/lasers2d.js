function Laser2D(ship) {
  this.position = createVector(ship.position.x, ship.position.y);
  this.velocity = p5.Vector.fromAngle(ship.heading);
  this.velocity.mult(10);
  this.rotation = ship.heading + PI / 2;
  this.wingmanxL = ship.wingmanX - 10;
  this.wingmanxR = ship.wingmanX + 10;
  this.r = 2;
  this.toDelete = false;
  this.power = 20;
  this.wingman_activated = ship.wingman_activated;

  this.move = function() {
    this.position.add(this.velocity);
  };

  this.show = function(sprite) {
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    image(sprite, 0, 0, this.r, 20);
    pop();
  };

  this.hits = function(alien) {
    var d = dist(
      this.position.x,
      this.position.y,
      alien.position.x,
      alien.position.y
    );

    var alienDis = alien.r;

    if (this.wingman_activated) {
      var wingmanDis = dist(
        this.wingmanX,
        this.wingmanY,
        alien.position.x,
        alien.position.y
      );

      if (d < alienDis || wingmanDis < alienDis) {
        return true;
      }
      return false;
    }

    if (d < alienDis) {
      return true;
    } else {
      return false;
    }

  };

    this.collided = function(asteroid) {
      let d = dist(
        this.position.x,
        this.position.y,
        asteroid.position.x,
        asteroid.position.y
      );
      if (d < asteroid.radius) {
        return true;
      }
      return false;
    };

  this.remove = function() {
    this.toDelete = true;
  };

  this.offScreen = function() {
    if (
      this.position.x > width ||
      this.position.x < 0 ||
      this.position.y > height ||
      this.position.y < 0 
    ) {
      return true;
    }
    return false;
  };
}
