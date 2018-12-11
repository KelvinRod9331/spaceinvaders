class Sprite {
  constructor(animation, obj, type) {
    this.animation = animation;
    this.len = animation.length;
    this.x = obj.x;
    this.y = obj.y;
    this.type = type
  }

  show() {
    if(this.type === 'alien'){
      for(let i = 0; i < this.len; i++){
          imageMode(CENTER)
          image(this.animation[i], this.x, this.y, 80, 80);
      }
    } else if(this.type === 'laser'){
          imageMode(CENTER)
          image(this.animation[1], this.x, this.y, 100, 100);
    }
  }
  
}
