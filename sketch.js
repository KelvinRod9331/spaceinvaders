var ship;
var canvas; 
var aliens = [];
var lasers = [];

function setup() {
 createCanvas(windowWidth, windowHeight)
  ship = new Ship();

  for (let i = 0; i < 6; i++) {
    aliens[i] = new Alien(i * 80 + 80, 80);
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, false);
  }

function draw() {
  background(51);
  ship.show();

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].show();
    lasers[i].move();
    lasers[i].offScreen()

    for (let j = 0; j < aliens.length; j++) {
      if (lasers[i].hits(aliens[j])) {
        aliens[j].remove();
        lasers[i].remove();
      }
    }
  }

  var edge = false;

  /**
   * Aliens For Loop
   */
  for (let i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();
   


    if (aliens[i].x > width || aliens[i].x < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i].shiftDown();
    }
  }

  for (let i = aliens.length - 1; i >= 0; i--) {
    if (aliens[i].toDelete) {
      aliens.splice(i, 1);
    }
  }

  /**
   * Lasers For Loop
   */

  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i].toDelete) {
      lasers.splice(i, 1);
    }
  }

  /**
   * Ship Movement
   */


  if (!ship.offScreen()) {
    if (keyIsDown(RIGHT_ARROW)) {
        ship.move(1);
      } else if (keyIsDown(LEFT_ARROW)) {
        ship.move(-1);
      }
  } else if(ship.offScreen() === 'left'){
    ship.move(1);
  } else if (ship.offScreen() === 'right'){
    ship.move(-1);
  }

 


}

function keyPressed() {
  if (key === " ") {
    var laser = new Laser(ship.x, height);
    lasers.push(laser);
  }
}

