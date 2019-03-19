function BossWeapon(boss, weapon) {

  this.position = createVector(boss.position.x, boss.position.y);
  this.sprite = weapon[1]
  this.toDelete = false;
  this.r
  this.h
  this.power 

  switch(weapon[0]){
    case 'blaster':
    this.r = 50;
    this.h = 200
    this.power = 200
    break;
    case 'torpedo':
    this.r = 60;
    this.h = 60
    this.power = 100
    break;
    case 'laser':
    this.r = 60;
    this.h = 60
    this.power = 50
    break;
  }

  this.show = function() {
    imageMode(CENTER);
    image(this.sprite, this.position.x, this.position.y + 10, this.r, this.h);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.hits = function(ship) {
    var d = dist(this.position.x, this.position.y, ship.x, ship.y);

    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  };

  this.move = function() {
    this.position.y += 10;
  };

  this.offScreen = function() {
    if (this.position.y > height) {
      return true;
    }
    return false;
  };

}
