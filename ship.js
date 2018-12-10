function Ship() {
  this.x = width / 2;

  this.show = function() {
    fill(255);
    // point(this.x, height - 20 )
    rectMode(CENTER);
    rect(this.x, height - 20, 20, 60);
  };

  this.move = function(dir) {
    this.x += dir * 5;
  };

  this.offScreen = function() {
    if (this.x < 10) {
      return 'left';
    } else if (this.x > width - 10){
        return 'right'
    }
  };
}
