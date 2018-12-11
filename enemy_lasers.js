function EnemyLaser(x, y, alien) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;
    this.alien = alien

     
    this.show = function(sprite) {
      imageMode(CENTER);
      image(sprite, this.x, this.y, this.r , 20);
    };
  
    this.remove = function() {
      this.toDelete = true;
    };
  
    this.hits = function(ship) {
    console.log('HIT');
      var d = dist(this.x, this.y, ship.x, ship.x);
      console.log(d, this.r);
      if (d < this.r + ship.r) {
        return true;
      } else {
        return false;
      }
    };
  
    this.move = function() {
      this.y = this.y + 7 ;
    };
  
    this.offScreen = function() {
      if (this.y > height) {
        return true
      }
     return false
    };
  }
  