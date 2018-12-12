function Ship() {
  this.x = width / 2;
  this.y = height - 60
  this.r = 30
  this.health = 400

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.x, this.y, this.r * 2, this.r * 2);
  };

  this.move = function(dir) {
    this.x += dir * 5;
  };

  this.offScreen = function() {
    if (this.x < 10) {
      return "left";
    } else if (this.x > width - 10) {
      return "right";
    }
  };

  this.damage = function(){
    this.health -= 40

    console.log(this.health)
  }
}
