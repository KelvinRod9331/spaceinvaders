function Ship() {
  this.x = windowWidth / 2;
  this.y = windowHeight - 60
  this.r = 30
  this.shield = false
  this.health = 400
  this.score = 0
  this.level = 1
  this.high_score = 0

  this.show = function(sprite) {
    imageMode(CENTER);
    image(sprite, this.x, this.y, this.r * 2, this.r * 2);
  };

  this.showShield = function(sprite){
    imageMode(CENTER);
    image(sprite, this.x, this.y, this.r * 4, this.r * 3);
  }

  this.move = function(dir) {
    this.x += dir * 5;
  };

  this.offScreen = function() {
    if (this.x < this.r) {
      return "left";
    } else if (this.x > width - this.r) {
      return "right";
    }
  };

  this.damage = function(){
    this.health -= 40
  }
}
