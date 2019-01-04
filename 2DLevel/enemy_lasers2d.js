function EnemyLaser2D(alien) {
    this.position = createVector(alien.position.x, alien.position.y);
    this.velocity = p5.Vector.fromAngle(alien.heading);
    this.velocity.mult(10);
    this.rotation = alien.heading + PI / 2;
    
    this.r = 2;
    this.toDelete = false;
    this.power = 40;
    this.wingman_activated = alien.wingman_activated;
  
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
  
    this.hits = function(ship) {
      var d = dist(
        this.position.x,
        this.position.y,
        ship.position.x,
        ship.position.y
      );
  
      if (d < ship.r) {
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
  