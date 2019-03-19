function Goliath() {
    this.position = createVector(width / 2, height / 3);
    this.r = 200;
    this.health = 1000;
    this.power = 100;
    this.xdir = 2;
    this.toDelete = false;
    this.bossWeapons;
  
    this.show = function(sprite) {
      imageMode(CENTER);
      image(sprite, this.position.x, this.position.y, this.r, this.r);
    };
  
    this.move = function() {
      if (frameCount % 400 == 0) {
       this.xdir = floor(random(2,8))
        this.xdir *= -1;
      }
  
      this.position.x += this.xdir;
    };
  
    this.addWeapon = function(w) {
      this.bossWeapons = w;
    };
  
    this.remove = function() {
      this.toDelete = true;
    };
  
    this.damage = function(d) {
      this.health -= d;
    };
  
    this.onEdge = function() {
      if (this.position.x > width - this.r || this.position.x < this.r) {
        this.xdir *= -1;
      }
    };
  
    this.health_bar = function() {
      var greenC = green(color(20, 200, 200));
      var redC = red(color(255, 204, 0));
  
      stroke(255);
      fill(redC, 0, 0);
      rect(this.position.x - 25, this.position.y - 30, 1001, 6);
  
      noStroke();
      fill(0, greenC, 0);
      rect(this.position.x - 24, this.position.y - 29, this.health, 5);
  
      fill(255);
    };
  }
  