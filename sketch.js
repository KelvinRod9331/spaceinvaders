var ship,
  canvas,
  power_up,
  hud,
  levels,
  powers,
  setIntervalID,
  boss,
  levelC = 1,
  bossLC = 1,
  livesC = 3,
  playerDied = false,
  highscore = 0,
  newGameStarted = false,
  gameIsOver = false;
(newLevel = false),
  // (newBoss = false),
  (muted = false),
  (paused = false),
  (activated = false),
  (missile_amount = 0),
  (lasers = []),
  (enemies = []),
  (missiles = []),
  (asteroids = []),
  (bosses = {}),
  (sounds = {}),
  (sprites = {});

function preload() {
  sprites["ship"] = loadImage("Sprites/Spaceships/Player Ships/starship.svg");
  sprites["thrust"] = loadImage("Sprites/Spaceships/Player Ships/thrust.png");
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
    eStarFighter: loadImage(`Sprites/Spaceships/Enemy Ships/eStarfighter.png`),
    asteroid: loadImage(`Sprites/space_kit/asteroid.png`)
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
    `Sprites/Background/Background-${floor(random(1, 3))}.png`
  );

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
    diagonal: loadImage(`Sprites/PowerUps/images/diagonal_gun.png`),
    shield: [
      loadImage(`Sprites/PowerUps/images/shield.png`),
      loadImage(`Sprites/PowerUps/images/shieldOrb.png`)
    ],
    special: loadImage("Sprites/PowerUps/images/special_ball.svg")
  };

  sprites["bossWeapon"] = {
    blaster: loadImage(`Sprites/Weapons/laser_canon.png`),
    torpedo: loadImage(`Sprites/Weapons/torpedo.svg`),
    laser: loadImage(`Sprites/Weapons/laser-red-04.png`)
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
    weapon: loadSound(`Sound Effects/Power_Weapon.mp3`),
    coin: loadSound(`Sound Effects/coin.mp3`),
    wingman: loadSound(`Sound Effects/soldierintro.mp3`)
  };

  sounds["music"] = {
    main: loadSound(`Sound Effects/Music/nebula.mp3`),
    paused: loadSound(`Sound Effects/Music/suspense.mp3`),
    boss: loadSound(`Sound Effects/Music/Orbital Colossus.mp3`)
  };

  powers = Object.keys(sprites.powerUp).map(function(key) {
    return [key, sprites.powerUp[key]];
  });

  boss_weapons = Object.keys(sprites.bossWeapon).map(function(key) {
    return [key, sprites.bossWeapon[key]];
  });
}

//******************************************************************************* */

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
}
//******************************************************************************* */

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // switch (levelC) {
  //   case 1:
  //     boss = new xMotherShip();
  //     break;
  //   case 2:
  //     boss = new UFO_MotherShip();
  //     break;
  //   case 3:
  //     boss = new DG_MotherShip();
  //     break;
  //   case 4:
  //     boss = new VE_MotherShip();
  //     break;
  //   case 5:
  //     boss = new Goliath();
  //     break;
  // }

  ship = new Ship();
  hud = new HUD();
  musicConfig();
  newGame();
  BossLevels();
  background(100);
}

//******************************************************************************* */

function draw() {
  var edge = false;
  imageMode(CENTER);
  image(sprites.background, width / 2, height / 2, width, height);
  // background(51);
  hud.show(ship, sprites);

  /* Ship Movements */
  if (levelC == 5) {
    Ship2DRendering();
  } else {
    ship.show(sprites.ship);
    ship.offScreen();
    // ship.weapon_Gauge()

    if (keyIsDown(RIGHT_ARROW)) {
      ship.move(1);
    } else if (keyIsDown(LEFT_ARROW)) {
      ship.move(-1);
    }
  }

  if (enemies.length > 0) {
    if (frameCount % 100 == 0) {
      if (ship.level == 1 || ship.level == 3) {
        for (let i = 1; i <= floor(random(5, 10)); i++) {
          let row = floor(random(0, enemies.length - 1));
          let column = floor(random(0, enemies[row].length));
          if (enemies[row][column]) {
            const laser = new EnemyLaser(enemies[row][column]);
            enemies[row][column].addLaser(laser);
          }
        }
        muted ? sounds.laser[1].pause() : sounds.laser[1].play();
      } else if (ship.level == 2 || ship.level == 4 || ship.level == 5) {
        for (let i = 1; i <= floor(random(5, 10)); i++) {
          let index = floor(random(0, enemies.length - 1));
          if (enemies[index]) {
            const laser =
              ship.level == 5
                ? new EnemyLaser2D(enemies[index])
                : new EnemyLaser(enemies[index]);
            enemies[index].addLaser(laser);
          }
        }
        muted ? sounds.laser[1].pause() : sounds.laser[1].play();
      }
    }

    if (ship.level == 1) {
      levels.xStarFighters(enemies, edge);
    } else if (ship.level == 2) {
      levels.ufosLoop(enemies);
    } else if (ship.level == 3) {
      levels.deathGliders(enemies, edge);
      if (frameCount % 200 == 0) {
        for (let i = 1; i <= floor(random(1, 3)); i++) {
          var row = floor(random(0, enemies.length - 1));
          var column = floor(random(0, enemies[row].length - 1));
          enemies[row][column].switch_movement = true;
        }
      }
    } else if (ship.level == 4) {
      levels.vStarFighters(enemies);
    } else if (ship.level == 5) {
      levels.eStarFighters(enemies, asteroids);
      if (frameCount % 200 == 0) {
        for (let i = 0; i < floor(random(3, 10)); i++) {
          var row = floor(random(0, enemies.length - 1));
          enemies[row].switch_movement = true;
        }
      }
    }
  } else {
    // if (newBoss) {
    //   if (ship.level == 1) {
    //     levels.xMotherShipBoss(boss);
    //     if (frameCount % 100 == 0) {
    //       let index = floor(random(0, boss_weapons.length - 1));
    //       let weapon = new BossWeapon(boss, boss_weapons[index]);
    //       boss.addWeapon(weapon);
    //       muted ? sounds.laser[1].pause() : sounds.laser[1].play();
    //     }
    //   }
    // }
  }

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
    playerDied = true;
  }

  if (ship.lives <= 0) {
    GameOver();
  }

  if (playerDied) {
    if (ship.lives >= 1) {
      livesC--;
      ship.health = 400;
      playerDied = false;
    }

    ship.lives = livesC;
  }

  if (ship.score > ship.high_score) {
    ship.high_score = ship.score;
    highscore = ship.high_score;
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
        case "wingman":
          ship.wingman_activated = true;
          muted
            ? sounds.powerUp.wingman.pause()
            : sounds.powerUp.wingman.play();
          break;
        case "coin":
          ship.score += 500;
          muted ? sounds.powerUp.coin.pause() : sounds.powerUp.coin.play();
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

        case "lifeUp":
          livesC += 1;
          ship.lives = livesC;
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

  if (ship.wingman_activated) {
    ship.wingman(sprites.ship);
    window.setTimeout(function() {
      ship.wingman_activated = false;
    }, 10000);
  }

  //******************************************************************************* */

  /**
   * When There is no more enemies
   */

  if (enemies.length === 0) {
    // newBoss = true;
    paused = true;
    newLevel = true;
    lasers = [];
    text(
      "YOU WON! READY FOR THE NEXT LEVEL? PRESS N KEY",
      width / 2,
      height / 2
    );
  }

  // if (boss) {
  //   if (boss.health <= 0) {
  //     newBoss = false;
  //     paused = true;
  //     enemies = [];
  //     newLevel = true;
  //     lasers = [];
  //     text(
  //       "YOU WON! READY FOR THE NEXT LEVEL? PRESS N KEY",
  //       width / 2,
  //       height / 2
  //     );
  //   }
  // }

  //******************************************************************************* */

  if (missile_amount === 0) {
    hud.number = "";
    hud.special = "None";
    missile_amount = 0;
  }
}

function GameOver() {
  lasers = [];
  paused = true;
  ship.health = 0;
  text("GAME OVER! PRESS N KEY TO START A NEW GAME", width / 2, height / 2);
  setTimeout(() => {
    levelC = 1;
    gameIsOver = true;
    newLevel = false;
    frameRate(0);
  }, 100);
}

function keyPressed() {
  let pressedKey = key.toLowerCase();
  if ((pressedKey === " " && !paused) || (pressedKey === "z" && !paused)) {
    var laser;
    if (levelC == 5) {
      laser = new Laser2D(ship);
    } else {
      laser = new Laser(ship);
    }

    lasers.push(laser);
    muted ? sounds.laser[0].pause() : sounds.laser[0].play();
  } else if (pressedKey === "p") {
    paused = true;
    textAlign(CENTER);
    textSize(35);
    fill(255);
    text(`PAUSED`, width / 2, height / 2);
    frameRate(0);
    sounds.music.main.pause();
    sounds.music.paused.play();
  } else if (pressedKey === "r") {
    paused = false;
    sounds.music.paused.pause();
    sounds.music.main.play();

    frameRate(60);
  } else if (pressedKey === "x") {
    if (missile_amount > 0) {
      var missile;

      if (levelC == 5) {
        missile = new Missile2D(ship);
      } else {
        missile = new Missile(ship);
      }

      missiles.push(missile);
      muted ? sounds.missile.pause() : sounds.missile.play();
      hud.number--;
    }
    missile_amount--;
  } else if (pressedKey === "m") {
    muted = !muted;

    if (muted) {
      sounds.music.main.pause();
    } else {
      sounds.music.main.loop();
    }
  } else if (pressedKey === "n") {
    window.clearInterval(setIntervalID);
    laser = [];

    if (gameIsOver) {
      newGameStarted = true;
      gameIsOver = false;
    }

    newGame();
  }
}

function newGame() {
  frameRate(60);
  levels = new Levels();
  paused = false;

  if (newLevel) {
    levelC++;
    // newBoss = false;
    boss = null;
    newLevel = false;
  }

  // if (newBoss) {
  //   BossLevels();
  // }

  if (newGameStarted) {
    enemies = [];
    levelC = 1;
    livesC = 4;
    ship = new Ship();
    newGameStarted = false;
  }

  ship.level = levelC;
  ship.high_score = highscore;

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
      ship = new Ship2D();
      ship.score = highscore;
      ship.high_score = highscore;
      for (let i = 0; i < 30; i++) {
        asteroids[i] = new Asteroids();
      }
      for (let i = 0; i < 15; i++) {
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
    } else if (ship.level == 5) {
      power_up = new PowerUp2D(enemies[rI], powers[pI]);
    } else {
      power_up = new PowerUp(
        enemies[rI].position.x,
        enemies[rI].position.y,
        powers[pI]
      );
    }
  }, 30000);
}

function musicConfig() {
  sounds.laser.forEach(laser => {
    laser.setVolume(0.2);
  });

  sounds.explosion.forEach(e => {
    e.setVolume(0.2);
  });

  sounds.music.main.loop();
}

function Ship2DRendering() {
  ship.show(sprites.ship);
  ship.rotate();
  ship.update();
  ship.screenEdge();

  if (keyIsDown(RIGHT_ARROW)) {
    ship.setRotation(0.1);
  } else if (keyIsDown(LEFT_ARROW)) {
    ship.setRotation(-0.1);
  } else if (keyIsDown(UP_ARROW)) {
    ship.thrusting(true);
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.thrusting(false);
}

function BossLevels() {
  switch (ship.level) {
    case 1:
      boss = new xMotherShip();
      break;
    case 2:
      boss = new UFO_MotherShip();
      break;
    case 3:
      boss = new DG_MotherShip();
      break;
    case 4:
      boss = new VE_MotherShip();
      break;
    case 5:
      boss = new Goliath();
      break;
  }
}
