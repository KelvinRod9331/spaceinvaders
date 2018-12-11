class Sprite {
  constructor(animation, alien) {
    this.animation = animation;
    this.len = animation.length;
    this.x = alien.x;
    this.y = alien.y;
  }

  show() {
    for(let i = 0; i < this.len; i++){
        imageMode(CENTER)
        image(this.animation[i], this.x, this.y, 80, 80);
    }
  }
  
}
