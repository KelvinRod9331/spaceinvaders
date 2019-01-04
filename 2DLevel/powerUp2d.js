class PowerUp2D {
  constructor(alien, power) {
    this.position = createVector(alien.position.x, alien.position.y);
    this.velocity = p5.Vector.fromAngle(alien.heading);
    this.velocity.mult(2);
    this.rotation = alien.heading + PI / 2;
    this.r = 40;
    this.typePowerUp = power[0];
    this.sprite = power[0] === "shield" ? power[1][0] : power[1];
  }

  show() {
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    image(this.sprite, 0, 0, this.r, 40);
    pop();
  }

  selected(ship) {
    var d = dist(this.position.x, this.position.y, ship.position.x, ship.position.y);
    if (d < this.r + ship.r) {

      return true;
    } else {
      return false;
    }
  }

  move() {
    this.position.add(this.velocity);
  }

  offScreen() {
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
