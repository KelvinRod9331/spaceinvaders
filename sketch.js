var ship;
var canvas;
var index;
var paused = false;
var aliens = [];
var lasers = [];
var test = false;
var sounds = {};
var sprites = {};

function preload() {
  sprites["ship"] = loadImage("Sprites/Spaceships/SpaceshipTest.png");
  sprites["laser"] = loadImage("Sprites/Lasers/laser-red-02.png");
  sprites["aliens"] = loadImage("Sprites/Spaceships/ufo.svg");
  sprites["explosion"] = [];

  for (let i = 1; i <= 10; i++) {
    sprites.explosion.push(
      loadImage(`Sprites/Explosions/bubble_explo${i}.png`)
    );
  }

  sounds["laser"] = loadSound("Sound Effects/Laser Blast_1.mp3");
  sounds["explosion"] = [];

  for (let i = 1; i <= 3; i++) {
    sounds.explosion.push(loadSound(`Sound Effects/Explosion0${i}.mp3`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    aliens[i] = new Alien(i * 80 + 80, 80);
  }

  setInterval(function() {
    index = floor(random(0, aliens.length));
  }, 4000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

function draw() {
  background(51);
  ship.show(sprites.ship);

  var edge = false;

  if (frameCount % 120 === 0) {
    test = true;
    if(aliens[index]){
        let laser = new EnemyLaser(aliens[index].x, aliens[index].y, index);
        aliens[index].addLaser(laser);
    }
   
  }

  /**
   * Aliens For Loop
   */

  for (let i = 0; i < aliens.length; i++) {
    aliens[i].show(sprites.aliens);
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
  if (test) {
    for (let i = aliens.length - 1; i >= 0; i--) {
      if (aliens[i].alienLasers) {
        aliens[i].alienLasers.show(sprites.laser);
        aliens[i].alienLasers.move();

        if (aliens[i].alienLasers.hits(ship)) {
        //   console.log("hit");
        }

        if (aliens[i].alienLasers.offScreen()) {
          aliens[i].alienLasers = undefined;
        }
      }
    }
  }

  /**
   * Lasers For Loop
   */

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].show(sprites.laser);
    lasers[i].move();
    lasers[i].offScreen();

    for (let j = 0; j < aliens.length; j++) {
      if (lasers[i].hits(aliens[j])) {
        var animated = new Sprite(sprites.explosion, aliens[j]);
        aliens[j].remove();
        if (aliens[j].toDelete) {
          aliens.splice(j, 1);
        }
        lasers[i].remove();
        sounds.explosion[Math.floor(random(0, 2))].play();
        animated.show();
      }
    }
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i].toDelete) {
      lasers.splice(i, 1);
    }
  }

  /**
   * Enemy Lasers
   */

  /**
   * Ship Movement
   */

  if (!ship.offScreen()) {
    if (keyIsDown(RIGHT_ARROW)) {
      ship.move(1);
    } else if (keyIsDown(LEFT_ARROW)) {
      ship.move(-1);
    }
  } else if (ship.offScreen() === "left") {
    ship.move(1);
  } else if (ship.offScreen() === "right") {
    ship.move(-1);
  }

  /**
   * When There is no more aliens
   */

  if (aliens.length == 0) {
    for (let i = 0; i < 10; i++) {
      aliens[i] = new Alien(i * 80 + 80, 80);
    }
  }
}

function keyPressed() {
  if (key === " " && !paused) {
    var laser = new Laser(ship.x, height - 60);
    lasers.push(laser);
    sounds.laser.play();
  } else if (key === "p") {
    paused = true;
    // sounds.song.stop();
    frameRate(0);
  } else if (key === "r") {
    paused = false;
    frameRate(60);
  }
}
