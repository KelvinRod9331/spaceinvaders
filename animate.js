class Sprite {
  constructor(animation, obj, type, activated) {
    this.animation = animation;
    this.len = animation.length;
    this.x = obj.x;
    this.y = obj.y;
    this.type = type
    this.activated = activated
  }

  show() {
    if(this.type === 'alien'){
      for(let i = 0; i < this.len; i++){
          imageMode(CENTER)
          image(this.animation[i], this.x, this.y, 80, 80);
      }
    } else if(this.type === 'ship'){
        this.y = this.activated ? this.y - 20 : this.y
          imageMode(CENTER)
          image(this.animation[this.activated ?1:2], this.x, this.y - 30, 100, 100);
    }
  }
  
}
