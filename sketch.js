var ship, canvas, index, power_up, hud;
var paused = false;
var activated = false;
var missile_amount = 0;
var aliens = [];
var lasers = [];
var missiles = [];
var sounds = {};
var sprites = {};

function preload() {
  sprites["ship"] = loadImage("Sprites/Spaceships/Player Ships/starship.svg");
  sprites["laser"] = loadImage("Sprites/Weapons/laser-yellow-04.png");
  sprites["missile"] = loadImage("Sprites/Weapons/torpedo.svg");

  /**
   * Sprite Alien Ships Array
   */

  sprites["aliens"] = [];

  for (let i = 1; i <= 4; i++) {
    sprites.aliens.push(
      loadImage(`Sprites/Spaceships/Enemy Ships/Spaceship${i}.png`)
    );
  }
  //******************************************************************************* */

  /**
   * Sprite Explosions Array
   */

  sprites["explosion"] = [];

  for (let i = 1; i <= 10; i++) {
    sprites.explosion.push(
      loadImage(`Sprites/Explosions/bubble_explo${i}.png`)
    );
  }

  //******************************************************************************* */

  /**
   *  Background Array
   */

  sprites["background"] = loadImage(
    `Sprites/Background/Background-${floor(random(1, 4))}.png`
  );

  //   for(let i = 1; i <= 4; i++){
  //       sprites.background.push(
  //         loadImage(`Sprites/Background/Background-${i}.png`)
  //       )
  //   }

  //******************************************************************************* */
  /**
   * Sprite PowerUp
   */

  sprites["powerUp"] = {
    health: loadImage(`Sprites/PowerUps/images/repair.png`),
    missile: loadImage(`Sprites/PowerUps/images/missile.png`),
    lifeUp: loadImage(`Sprites/PowerUps/images/life_up.png`),
    wingman: loadImage(`Sprites/PowerUps/images/wingman.png`),
    coin: loadImage(`Sprites/PowerUps/images/coin.png`),
    straight: loadImage(`Sprites/PowerUps/images/straight_gun.png`),
    // diagonal: loadImage(`Sprites/PowerUps/images/diagonal_gun.png`),
    shield: [
      loadImage(`Sprites/PowerUps/images/shield.png`),
      loadImage(`Sprites/PowerUps/images/shieldOrb.png`)
    ]
  };

  //******************************************************************************* */

  /**
   * Sound Explosion Array
   */
  sounds["explosion"] = [];

  for (let i = 1; i <= 3; i++) {
    sounds.explosion.push(loadSound(`Sound Effects/Explosion0${i}.mp3`));
  }

  //******************************************************************************* */

  /**
   * Sound Laser Array
   */
  sounds["laser"] = [];

  for (let i = 1; i <= 2; i++) {
    sounds.laser.push(loadSound(`Sound Effects/Laser Blast_${i}.mp3`));
  }
  //******************************************************************************* */

  sounds["missile"] = loadSound(`Sound Effects/Missile_Launch.mp3`);

  sounds["powerUp"] = {
    health: loadSound(`Sound Effects/Power_Health.mp3`),
    weapon: loadSound(`Sound Effects/Power_Weapon.mp3`)
  };
}

//******************************************************************************* */

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
}
//******************************************************************************* */

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(100);
  hud = new HUD();
  ship = new Ship();

  for (let i = 0; i < 10; i++) {
    aliens[i] = new Alien(i * 60 + 60, 150);
  }

  setInterval(function() {
    index = floor(random(0, aliens.length));
  }, 1000);

  setInterval(function() {
    let powers = Object.keys(sprites.powerUp).map(function(key) {
      return [key, sprites.powerUp[key]];
    });

    let aI = floor(random(0, aliens.length));
    let pI = floor(random(0, powers.length));
    power_up = new PowerUp(aliens[aI].x, aliens[aI].y, powers[pI]);
  }, 45000);
}

//******************************************************************************* */

function draw() {
  imageMode(CENTER);
  image(sprites.background, width / 2, height / 2, width, height);

  ship.show(sprites.ship);
  hud.show(ship.score, ship.level,ship.health, ship.high_score);
 

  var edge = false;

  if (frameCount % 100 === 0) {
    if (aliens[index]) {
      let laser = new EnemyLaser(aliens[index]);
      aliens[index].addLaser(laser, sounds.laser[1]);
    }
  }

  /**
   * Aliens For Loop
   */

  for (let i = 0; i < aliens.length; i++) {
    aliens[i].show(sprites.aliens[1]);
    aliens[i].move();

    if (aliens[i].x > width - 40 || aliens[i].x < 40) {
      edge = true;
    }
  }

  if (edge) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i].shiftDown();
    }
  }

  //******************************************************************************* */

  /**
   * Enemy Lasers Loop
   */

  for (let i = aliens.length - 1; i >= 0; i--) {
    if (aliens[i].alienLasers) {
      aliens[i].alienLasers.show(sprites.laser);
      aliens[i].alienLasers.move();

      if (aliens[i].alienLasers_Sound) {
        aliens[i].alienLasers_Sound.play();
        aliens[i].alienLasers_Sound = undefined;
      }

      if (aliens[i].alienLasers.hits(ship)) {
        var animated = new Sprite(sprites.explosion, ship, "ship", ship.shield);
        aliens[i].alienLasers = undefined;
        sounds.explosion[Math.floor(random(0, 2))].play();
        animated.show();
        if (!ship.shield) {
          ship.damage();
        }
      } else if (aliens[i].alienLasers.offScreen()) {
        aliens[i].alienLasers = undefined;
      }
    }
  }

  //******************************************************************************* */

  /**
   * Lasers For Loop
   */

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].show(sprites.laser);
    lasers[i].move();
    lasers[i].offScreen();

    for (let j = 0; j < aliens.length; j++) {
      if (lasers[i].hits(aliens[j])) {
        var animated = new Sprite(sprites.explosion, aliens[j], "alien");
        aliens[j].remove();
        if (aliens[j].toDelete) {
          aliens.splice(j, 1);
        }
        lasers[i].remove();
        sounds.explosion[Math.floor(random(0, 2))].play();
        animated.show();
        ship.score = ship.score + 2;
        if(ship.score > ship.high_score){
            ship.high_score = ship.high_score + 2;
        }
        
      }
    }
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i].toDelete) {
      lasers.splice(i, 1);
    }
  }

  //******************************************************************************* */

  /**
   * Missiles For Loop
   */

  for (let i = 0; i < missiles.length; i++) {
    missiles[i].show(sprites.missile);
    missiles[i].move();
    missiles[i].offScreen();

    for (let j = 0; j < aliens.length; j++) {
      if (missiles[i].hits(aliens[j])) {
        var animated = new Sprite(sprites.explosion, aliens[j], "alien");
        aliens[j].remove();
        if (aliens[j].toDelete) {
          aliens.splice(j, 1);
        }
        missiles[i].remove();
        sounds.explosion[Math.floor(random(0, 2))].play();
        animated.show();
        ship.score = ship.score + 20;
        if(ship.score > ship.high_score){
            ship.high_score = ship.high_score + 20;
        }
      }
    }
  }

  for (let i = missiles.length - 1; i >= 0; i--) {
    if (missiles[i].toDelete) {
      missiles.splice(i, 1);
    }
  }

  //******************************************************************************* */

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

  //******************************************************************************* */

  /**
   * Checking for Players Health
   */

  if (!ship.health) {
    //    GameOver()
    ship.health = 400;
    ship.score = 0;
  }

  //******************************************************************************* */

  /**
   * Releasing PowerUp
   */

  if (power_up) {
    power_up.show();
    power_up.move();

    if (power_up.selected(ship)) {
      switch (power_up.typePowerUp) {
        case "health":
          ship.health = 400;
          sounds.powerUp.health.play();
          break;
        case "straight":
          sounds.powerUp.weapon.play();
          break;
        // case "diagonal":
        //   sounds.powerUp.weapon.play();
        //   break;
        case "missile":
          hud.special = `Missiles`;
          hud.number = 10;
          missile_amount = 10;
          sounds.powerUp.weapon.play();
          break;

        case "shield":
          ship.shield = true;
          sounds.powerUp.health.play();
          break;
        default:
          console.log(power_up.typePowerUp);
          break;
      }

      power_up = undefined;
    } else if (power_up.offScreen()) {
      power_up = undefined;
    }
  }

  if (ship.shield) {
    ship.showShield(sprites.powerUp.shield[1]);
    window.setTimeout(function() {
      ship.shield = false;
    }, 10000);
  }

  //******************************************************************************* */

  /**
   * When There is no more aliens
   */

  if (aliens.length == 0) {
    for (let i = 0; i < 10; i++) {
      aliens[i] = new Alien(i * 60 + 60, 150);
    }
  }
  //******************************************************************************* */

  if (missile_amount === 0) {
    hud.number = "";
    hud.special = "None";
    missile_amount = 0;
  }
}

function GameOver() {
  alert("Game Over");
}

function keyPressed() {
  if (key === " " && !paused) {
    var laser = new Laser(ship);
    lasers.push(laser);
    sounds.laser[0].play();
  } else if (key === "p") {
    paused = true;
    frameRate(0);
    // sounds.song.stop();
  } else if (key === "r") {
    paused = false;
    frameRate(60);
  } else if (key === "z") {
    if (missile_amount > 0) {
      var missile = new Missile(ship);
      missiles.push(missile);
      sounds.missile.play();
      hud.number--;
    }
    missile_amount--;
  }
}
