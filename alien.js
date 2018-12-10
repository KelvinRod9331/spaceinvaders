function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.r = 30;

  this.xdir = 1;


  this.toDelete = false;
  this.alien_laser = [];

  this.show = function() {
    fill(255, 0, 200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };

  this.remove = function() {
    this.toDelete = true;
  };

  this.shoot = function() {};

  this.shiftDown = function(){
      this.xdir *= -1
      this.y += this.r
  }

  this.move = function() {
    this.x = this.x + this.xdir;
  };

//   this.offScreen = function() {
//     if (this.x > ) {
//       return true;
//     }
//     return false;
//   };
}
