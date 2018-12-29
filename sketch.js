var ship,
  canvas,
  power_up,
  hud,
  levels,
  powers,
  setIntervalID,
  levelC = 1;
  (newLevel = false),
  (muted = true),
  (paused = false),
  (activated = false),
  (missile_amount = 0);
(lasers = []), (enemies = []), (bosses = {});
(missiles = []), (sounds = {}), (sprites = {});

function preload() {
  sprites["ship"] = loadImage("Sprites/Spaceships/Player Ships/starship.svg");
  sprites["laser"] = loadImage("Sprites/Weapons/laser-yellow-04.png");
  sprites["missile"] = loadImage("Sprites/Weapons/torpedo.svg");

  /**
   *  Enemies Ships Sprite Object
   */

  sprites["enemies"] = {
    xStarFighter: loadImage(`Sprites/Spaceships/Enemy Ships/xStarFighter.png`),
    ufo: loadImage(`Sprites/Spaceships/Enemy Ships/ufo.png`),
    death_glider: loadImage(`Sprites/Spaceships/Enemy Ships/death-gliders.png`),
    vStarFighter: loadImage(`Sprites/Spaceships/Enemy Ships/vStarfighter.png`),
    eStarFighter: loadImage(`Sprites/Spaceships/Enemy Ships/eStarfighter.png`)
  };

  //******************************************************************************* */
  /**
   * Bosses Ship Sprites Object
   */
  sprites["bosses"] = {
    xMotherShip: loadImage(`Sprites/Spaceships/Boss Ships/xMotherShip.png`),
    ufoMotherShip: loadImage(`Sprites/Spaceships/Boss Ships/ufoMotherShip.png`),
    dgMotherShip: loadImage(`Sprites/Spaceships/Boss Ships/dgMotherShip.png`),
    vMotherShip: loadImage(`Sprites/Spaceships/Boss Ships/vMotherShip.png`), // Companions
    eMotherShip: loadImage(`Sprites/Spaceships/Boss Ships/eMotherShip.png`), // Companions
    Goliath: loadImage(`Sprites/Spaceships/Boss Ships/Goliath.png`)
  };

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

  powers = Object.keys(sprites.powerUp).map(function(key) {
    return [key, sprites.powerUp[key]];
  });
}

//******************************************************************************* */

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
}
//******************************************************************************* */

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  hud = new HUD();
  newGame();
  // background(100);
}

//******************************************************************************* */

function draw() {
  var edge = false;
  // imageMode(CENTER);
  // image(sprites.background, width / 2, height / 2, width, height);
  background(51);
  hud.show(ship);

  /* Ship Movements */
  ship.show(sprites.ship);
  ship.offScreen();

  if (keyIsDown(RIGHT_ARROW)) {
    ship.move(1);
  } else if (keyIsDown(LEFT_ARROW)) {
    ship.move(-1);
  }

  if (enemies.length > 0) {
    if (frameCount % 100 == 0) {
      if (ship.level == 1 || ship.level == 3) {
        for (let i = 1; i <= 10; i++) {
          let row = floor(random(0, enemies.length));
          let column = floor(random(0, enemies[row].length));
          if (enemies[row][column]) {
            const laser = new EnemyLaser(enemies[row][column]);
            enemies[row][column].addLaser(laser, sounds.laser[1]);
          }
        }
      } else if (ship.level == 2 || ship.level == 4) {
        for (let i = 1; i <= 6; i++) {
          let index = floor(random(0, enemies.length));
          if (enemies[index]) {
            const laser = new EnemyLaser(enemies[index]);
            enemies[index].addLaser(laser, sounds.laser[1]);
          }
        }
      } 
    }

    if (ship.level == 1) {
      levels.xStarFighters(enemies, edge);
    } else if (ship.level == 2) {
      levels.ufosLoop(enemies);
    } else if (ship.level == 3) {
      levels.deathGliders(enemies, edge);
      if (frameCount % 300 == 0) {
        var row = floor(random(0, enemies.length - 1));
        var column = floor(random(0, enemies[row].length - 1));
        enemies[row][column].switch_movement = true;
      }
    } else if(ship.level == 4){
      levels.vStarFighters(enemies)
    }
  }

  

  //******************************************************************************* */

  /**
   * New Enemies (Test)
   */

  // enemies.forEach(enemy => {
  //   enemy.show(sprites.enemies[2])
  //   enemy.update()
  //   enemy.screenEdge()
  // })

  //******************************************************************************* */

  /**
   * Enemies Laser Loop
   */

  // for (let i = enemies.length - 1; i >= 0; i--) {
  //   if (enemies[i].alienLasers) {
  //     enemies[i].alienLasers.show(sprites.laser);
  //     enemies[i].alienLasers.move();

  //     if (enemies[i].alienLasers_Sound) {
  //       muted
  //         ? enemies[i].alienLasers_Sound.pause()
  //         : enemies[i].alienLasers_Sound.play();
  //       enemies[i].alienLasers_Sound = undefined;
  //     }

  //     if (enemies[i].alienLasers.hits(ship)) {
  //       var animated = new Sprite(sprites.explosion, ship, "ship", ship.shield);
  //       enemies[i].alienLasers = undefined;
  //       muted
  //         ? sounds.explosion[Math.floor(random(0, 2))].pause()
  //         : sounds.explosion[Math.floor(random(0, 2))].play();
  //       animated.show();
  //       if (!ship.shield) {
  //         ship.damage();
  //       }
  //     } else if (enemies[i].alienLasers.offScreen()) {
  //       enemies[i].alienLasers = undefined;
  //     }
  //   }
  // }

  //******************************************************************************* */

  /**
   * Players Lasers Loop
   */

  lasers.forEach((laser, i) => {
    if (laser.toDelete) {
      lasers.splice(i, 1);
    }
  });

  //******************************************************************************* */

  /**
   * Players Missiles For Loop
   */

  missiles.forEach((missile, i) => {
    if (missile.toDelete) {
      missiles.splice(i, 1);
    }
  });

  //******************************************************************************* */

  /*  Checking for Players Health and Score*/

  if (ship.health <= 0) {
    GameOver();
  }

  if (ship.score > ship.high_score) {
    ship.high_score = ship.score;
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
          muted ? sounds.powerUp.health.pause() : sounds.powerUp.health.play();

          break;
        case "straight":
          muted ? sounds.powerUp.weapon.pause() : sounds.powerUp.weapon.play();

          break;
        case "coin":
          ship.score += 500;
          sounds.powerUp.weapon.play();
          break;
        case "missile":
          hud.special = `Missiles`;
          hud.number = 10;
          missile_amount = 10;
          muted ? sounds.powerUp.weapon.pause() : sounds.powerUp.weapon.play();
          break;

        case "shield":
          ship.shield = true;
          muted ? sounds.powerUp.health.pause() : sounds.powerUp.health.play();
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
   * When There is no more enemies
   */

  if (enemies.length == 0) {
    text("YOU WON! PRESS N KEY FOR THE NEXT LEVEL", width / 2, height / 2);
    newLevel = true;
  }
  //******************************************************************************* */

  if (missile_amount === 0) {
    hud.number = "";
    hud.special = "None";
    missile_amount = 0;
  }
}

function GameOver() {
  ship.score = 0;
  ship.health = 0;
  lasers = [];
  paused = true;
  text("GAME OVER! PRESS N KEY TO START A NEW GAME", width / 2, height / 2);

  setTimeout(() => {
    levelC = 1;
    frameRate(0);
  }, 100);
}

function keyPressed() {
  let pressedKey = key
  if ((pressedKey === " " && !paused) || (pressedKey.toLowerCase() === "z" && !paused)) {
    var laser = new Laser(ship);
    lasers.push(laser);
    muted ? sounds.laser[0].pause() : sounds.laser[0].play();
  } else if (pressedKey.toLowerCase() === "p") {
    paused = true;
    textAlign(CENTER);
    textSize(35);
    fill(255);
    text(`PAUSED`, width / 2, height / 2);
    frameRate(0);
    // sounds.song.stop();
  } else if (pressedKey.toLowerCase() === "r") {
    paused = false;
    frameRate(60);
  } else if (pressedKey.toLowerCase() === "x") {
    if (missile_amount > 0) {
      let missile = new Missile(ship);
      missiles.push(missile);
      muted ? sounds.missile.pause() : sounds.missile.play();
      hud.number--;
    }
    missile_amount--;
  } else if (pressedKey.toLowerCase() === "m") {
    muted = !muted;
  } else if (pressedKey.toLowerCase() === "n") {
    laser = []
    window.clearInterval(setIntervalID)
    newGame();
  }
}

function newGame() {
  frameRate(60);
  levels = new Levels();
  ship = new Ship();
  paused = false;
  if (newLevel) {
    levelC++;
    newLevel = false;
  }

  ship.level = levelC;

  switch (ship.level) {
    case 1:
      for (let row = 0; row < 5; row++) {
        let column = [];
        for (let i = 0; i < 15; i++) {
          column.push(new xStarFighter(i * 60 + 60, row * 50 + 160));
        }
        enemies[row] = column;
      }
      break;
    case 2:
      for (let i = 0; i < 20; i++) {
        enemies[i] = new UFO();
      }
      break;
    case 3:
      for (let row = 0; row < 5; row++) {
        let column = [];
        for (let i = 0; i < 15; i++) {
          column.push(new DeathGlider(i * 60 + 60, row * 50 + 160));
        }
        enemies[row] = column;
      }
      break;
    case 4:
      for (let i = 0; i < 20; i++) {
        enemies[i] = new vStarFighter();
      }
      break;
    case 5:
      for (let i = 0; i < 10; i++) {
        enemies[i] = new eStarFighter();
      }
      break;
  }

  setIntervalID = setInterval(function() {
    let rI = floor(random(0, enemies.length - 1));
    let eI = floor(random(0, enemies[rI].length - 1));
    let pI = floor(random(0, powers.length));

    if (ship.level == 1 || ship.level == 3) {
      power_up = new PowerUp(
        enemies[rI][eI].position.x,
        enemies[rI][eI].position.y,
        powers[pI]
      );
    } else {
      power_up = new PowerUp(
        enemies[rI].position.x,
        enemies[rI].position.y,
        powers[pI]
      );
    }
  }, 30000);
}
