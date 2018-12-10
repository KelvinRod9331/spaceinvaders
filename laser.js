function Laser(x, y) {
  this.x = x;
  this.y = y;
  this.r = 8;
  this.toDelete = false;

  this.show = function() {
    fill(50, 0, 200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.hits = function(alien) {
    var d = dist(this.x, this.y, alien.x, alien.y);

    if (d < this.r + alien.r) {
      return true;
    } else {
      return false;
    }
  };

  this.move = function() {
    this.y = this.y - 10 ;
  };

  this.offScreen = function() {
    if (this.y < 0) {
      this.toDelete = true
    }
   
  };
}
