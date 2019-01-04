class PowerUp{
    constructor(x,y,power){
        this.x = x
        this.y = y
        this.r = 40
        this.typePowerUp = power[0]
        this.sprite = power[0] === 'shield' ? power[1][0] : power[1]
    }


    show(){
        imageMode(CENTER);
        image(this.sprite, this.x, this.y, this.r , 40);
    }


    selected(ship) {
        var d = dist(this.x, this.y, ship.x, ship.y);
        if (d < this.r + ship.r) {
          return true;
        } else {
          return false;
        }
      };
    
     move() {
        this.y = this.y + 4 ;
      };
    
      offScreen() {
        if (this.y > height) {
          return true
        }
       return false
      };
}