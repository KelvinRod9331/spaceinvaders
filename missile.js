function Missile(ship) {
    this.x = ship.x;
    this.y = ship.y - 10;
    this.r = 30
    this.power = 10
    this.toDelete = false;
  
    this.show = function(sprite) {
      imageMode(CENTER);
      image(sprite, this.x, this.y, 30 , 40);
    };
  
    this.remove = function() {
      this.toDelete = true;
    };
  
    this.hits = function(alien) {
      var d = dist(this.x, this.y, alien.position.x, alien.position.y);
      if (d < this.r + alien.r) {
        return true;
      } else {
        return false;
      }
    };
  
    this.move = function() {
      this.y = this.y - 5 ;

    };
  
    this.offScreen = function() {
      if (this.y < 0) {
        this.toDelete = true
      }
     
    };
  }
  