function Levels() {
  this.xStarFighters = function(enemies, edge) {
    for (let i = 0; i < enemies.length; i++) {
      for (let j = 0; j < enemies[i].length; j++) {
        enemies[i][j].show(sprites.enemies.xStarFighter);
        enemies[i][j].move();
        enemies[i][j].screenEdge();

        if (
          enemies[i][j].position.x > width - 40 ||
          enemies[i][j].position.x < 40
        ) {
          edge = true;
        }
        if (enemies[i][j].collided(ship)) {
          enemies[i][j].remove();
          var animated = new Sprite(
            sprites.explosion,
            ship,
            "ship",
            ship.shield
          );
          if (!ship.shield) {
            muted
              ? sounds.explosion[Math.floor(random(0, 2))].pause()
              : sounds.explosion[Math.floor(random(0, 2))].play();
            animated.show();
            ship.damage(400);
          }
        }

        // if (enemies[i][j].offScreen()) {
        //   enemies[i].splice(j, 1);
        // }
      }

      if (edge) {
        for (let i = 0; i < enemies.length; i++) {
          for (let j = 0; j < enemies[i].length; j++) {
            enemies[i][j].shiftDown();
          }
        }
        edge = false;
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      for (let j = enemies[i].length - 1; j >= 0; j--) {
        if (enemies[i][j].alienLasers) {
          enemies[i][j].alienLasers.show(sprites.laser);
          enemies[i][j].alienLasers.move();

          if (enemies[i][j].alienLasers.hits(ship)) {
            var animated = new Sprite(
              sprites.explosion,
              ship,
              "ship",
              ship.shield
            );
            enemies[i][j].alienLasers = undefined;
            muted
              ? sounds.explosion[Math.floor(random(0, 2))].pause()
              : sounds.explosion[Math.floor(random(0, 2))].play();
            animated.show();
            if (!ship.shield) {
              ship.damage(enemies[i][j].damage);
            }
          } else if (enemies[i][j].alienLasers.offScreen()) {
            enemies[i][j].alienLasers = undefined;
          }
        }
      }
    }

    lasers.forEach(laser => {
      if (ship.wingman_activated) {
        laser.wingman(sprites.laser);
      }

      laser.show(sprites.laser);
      laser.move();
      laser.offScreen();

      

      enemies.forEach((e, ind) => {
        if (e.length !== 0) {
          for (let x = 0; x < e.length; x++) {
            if (laser.hits(e[x])) {
              var animated = new Sprite(sprites.explosion, e[x], "alien");
              e[x].remove();
              laser.remove();
              muted
                ? sounds.explosion[Math.floor(random(0, 2))].pause()
                : sounds.explosion[Math.floor(random(0, 2))].play();
              animated.show();
              ship.score += 2;

              if (e[x].toDelete) {
                e.splice(x, 1);
              }
            }
          }
        } else {
          enemies.splice(ind, 1);
        }
      });
    });

    for (let i = 0; i < missiles.length; i++) {
      missiles[i].show(sprites.missile);
      missiles[i].move();
      missiles[i].offScreen();

      enemies.forEach((e, ind) => {
        if (e.length !== 0) {
          for (let x = 0; x < e.length; x++) {
            if (missiles[i].hits(e[x])) {
              var animated = new Sprite(sprites.explosion, e[x], "alien");
              e[x].remove();
              missiles[i].remove();
              muted
                ? sounds.explosion[Math.floor(random(0, 2))].pause()
                : sounds.explosion[Math.floor(random(0, 2))].play();
              animated.show();
              ship.score += 20;

              if (e[x].toDelete) {
                e.splice(x, 1);
              }
            }
          }
        } else {
          enemies.splice(ind, 1);
        }
      });
    }
  };

  this.xMotherShipBoss = function(boss){
    boss.show(sprites.bosses.xMotherShip)
    boss.move()
    boss.onEdge()
    // boss.health_bar()



    if (boss.bossWeapons) {
      boss.bossWeapons.show();
      boss.bossWeapons.move();

      if (boss.bossWeapons.hits(ship)) {
        var animated = new Sprite(
          sprites.explosion,
          ship,
          "ship",
          ship.shield
        );
        boss.bossWeapons = undefined;
        muted
          ? sounds.explosion[Math.floor(random(0, 2))].pause()
          : sounds.explosion[Math.floor(random(0, 2))].play();
        animated.show();
        if (!ship.shield) {
          ship.damage(boss.power);
        }
      } else if (boss.bossWeapons.offScreen()) {
        boss.bossWeapons = undefined;
      }
    }

    lasers.forEach(laser => {
      if (ship.wingman_activated) {
        laser.wingman(sprites.laser);
      }
      laser.show(sprites.laser);
      laser.move();
      laser.offScreen();

     
        if (laser.hits(boss)) {
          var animated = new Sprite(sprites.explosion, boss, "alien");
          boss.damage(laser.power);

          if (boss.health <= 0) {
            boss.remove();
          }
          laser.remove();
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.score += 10;

          if (boss.toDelete) {
            //do something 
          }
        }
   
    });

    // missiles.forEach(missile => {
    //   missile.show(sprites.missile);
    //   missile.move();
    //   missile.offScreen();

    //     if (missile.hits()) {
    //       var animated = new Sprite(sprites.explosion, boss, "alien");
    //       boss.remove();
    //       missile.remove();
    //       muted
    //         ? sounds.explosion[Math.floor(random(0, 2))].pause()
    //         : sounds.explosion[Math.floor(random(0, 2))].play();
    //       animated.show();
    //       ship.score += 20;

    //       if (boss.toDelete) {
    //         //do something
    //       }
    //     }
      
    // });
  }

  this.ufosLoop = function(ufos) {
    ufos.forEach(ufo => {
      ufo.show(sprites.enemies.ufo);
      ufo.update();
      ufo.screenEdge();

      if (ufo.collided(ship)) {
        if (!ship.shield) {
          ship.damage(3);
        }
      }

      if (ufo.alienLasers) {
        ufo.alienLasers.show(sprites.laser);
        ufo.alienLasers.move();

        if (ufo.alienLasers.hits(ship)) {
          var animated = new Sprite(
            sprites.explosion,
            ship,
            "ship",
            ship.shield
          );
          ufo.alienLasers = undefined;
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          if (!ship.shield) {
            ship.damage(ufo.damage);
          }
        } else if (ufo.alienLasers.offScreen()) {
          ufo.alienLasers = undefined;
        }
      }
    });

    lasers.forEach(laser => {
      if (ship.wingman_activated) {
        laser.wingman(sprites.laser);
      }
      laser.show(sprites.laser);
      laser.move();
      laser.offScreen();

      ufos.forEach((ufo, i) => {
        if (laser.hits(ufo)) {
          var animated = new Sprite(sprites.explosion, ufo, "alien");
          ufo.remove();
          laser.remove();
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.score += 10;

          if (ufo.toDelete) {
            ufos.splice(i, 1);
          }
        }
      });
    });

    missiles.forEach(missile => {
      missile.show(sprites.missile);
      missile.move();
      missile.offScreen();

      ufos.forEach((ufo, ind) => {
        if (missile.hits(ufo)) {
          var animated = new Sprite(sprites.explosion, ufo, "alien");
          ufo.remove();
          missile.remove();
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.score += 20;

          if (ufo.toDelete) {
            ufos.splice(ind, 1);
          }
        }
      });
    });
  };

  this.deathGliders = function(deathGliders, edge) {
    for (let i = 0; i < deathGliders.length; i++) {
      for (let j = 0; j < deathGliders[i].length; j++) {
        deathGliders[i][j].show(sprites.enemies.death_glider);

        if (!deathGliders[i][j].switch_movement) {
          deathGliders[i][j].move();
          if (
            deathGliders[i][j].position.x > width - 40 ||
            deathGliders[i][j].position.x < 40
          ) {
            edge = true;
          }
        } else {
          if (deathGliders[i][j].collided(ship)) {
            deathGliders[i][j].remove();
            var animated = new Sprite(
              sprites.explosion,
              ship,
              "ship",
              ship.shield
            );
            if (!ship.shield) {
              muted
                ? sounds.explosion[Math.floor(random(0, 2))].pause()
                : sounds.explosion[Math.floor(random(0, 2))].play();
              animated.show();
              ship.damage(100);
            }
          }

          deathGliders[i][j].kamikaze(ship);
          deathGliders[i][j].screenEdge();
        }

        if (deathGliders[i][j].toDelete) {
          deathGliders[i].splice(j, 1);
        }

        // if (deathGliders[i][j].offScreen()) {
        //   deathGliders[i].splice(j, 1);
        // }
      }

      if (edge) {
        for (let i = 0; i < deathGliders.length; i++) {
          for (let j = 0; j < deathGliders[i].length; j++) {
            deathGliders[i][j].shiftDown();
          }
        }
        edge = false;
      }
    }

    for (let i = deathGliders.length - 1; i >= 0; i--) {
      for (let j = deathGliders[i].length - 1; j >= 0; j--) {
        if (deathGliders[i][j].alienLasers) {
          deathGliders[i][j].alienLasers.show(sprites.laser);
          deathGliders[i][j].alienLasers.move();

          if (deathGliders[i][j].alienLasers.hits(ship)) {
            var animated = new Sprite(
              sprites.explosion,
              ship,
              "ship",
              ship.shield
            );
            deathGliders[i][j].alienLasers = undefined;
            muted
              ? sounds.explosion[Math.floor(random(0, 2))].pause()
              : sounds.explosion[Math.floor(random(0, 2))].play();
            animated.show();
            if (!ship.shield) {
              ship.damage(deathGliders[i][j].damage);
            }
          } else if (deathGliders[i][j].alienLasers.offScreen()) {
            deathGliders[i][j].alienLasers = undefined;
          }
        }
      }
    }

    lasers.forEach(laser => {
      if (ship.wingman_activated) {
        laser.wingman(sprites.laser);
      }
      laser.show(sprites.laser);
      laser.move();
      laser.offScreen();

      deathGliders.forEach((e, ind) => {
        if (e.length !== 0) {
          for (let x = 0; x < e.length; x++) {
            if (laser.hits(e[x])) {
              var animated = new Sprite(sprites.explosion, e[x], "alien");
              e[x].remove();
              laser.remove();
              muted
                ? sounds.explosion[Math.floor(random(0, 2))].pause()
                : sounds.explosion[Math.floor(random(0, 2))].play();
              animated.show();
              ship.score = ship.score + 2;

              if (e[x].toDelete) {
                e.splice(x, 1);
              }
            }
          }
        } else {
          deathGliders.splice(ind, 1);
        }
      });
    });

    for (let i = 0; i < missiles.length; i++) {
      missiles[i].show(sprites.missile);
      missiles[i].move();
      missiles[i].offScreen();

      deathGliders.forEach((e, ind) => {
        if (e.length !== 0) {
          for (let x = 0; x < e.length; x++) {
            if (missiles[i].hits(e[x])) {
              var animated = new Sprite(sprites.explosion, e[x], "alien");
              e[x].remove();
              missiles[i].remove();
              muted
                ? sounds.explosion[Math.floor(random(0, 2))].pause()
                : sounds.explosion[Math.floor(random(0, 2))].play();
              animated.show();
              ship.score += 25;

              if (e[x].toDelete) {
                e.splice(x, 1);
              }
            }
          }
        } else {
          deathGliders.splice(ind, 1);
        }
      });
    }
  };

  this.vStarFighters = function(enemies) {
    enemies.forEach((e, ind) => {
      e.show(sprites.enemies.vStarFighter);
      e.kamikaze(ship);
      e.update();
      e.screenEdge();
      e.health_bar();

      if (e.collided(ship)) {
        e.remove();
        var animated = new Sprite(sprites.explosion, ship, "ship", ship.shield);
        if (!ship.shield) {
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.damage(100);
        }

        if (e.toDelete) {
          enemies.splice(ind, 1);
        }
      }

      if (e.alienLasers) {
        e.alienLasers.show(sprites.laser);
        e.alienLasers.move();

        if (e.alienLasers.hits(ship)) {
          var animated = new Sprite(
            sprites.explosion,
            ship,
            "ship",
            ship.shield
          );
          e.alienLasers = undefined;
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          if (!ship.shield) {
            ship.damage(e.power);
          }
        } else if (e.alienLasers.offScreen()) {
          e.alienLasers = undefined;
        }
      }
    });

    lasers.forEach(laser => {
      if (ship.wingman_activated) {
        laser.wingman(sprites.laser);
      }
      laser.show(sprites.laser);
      laser.move();
      laser.offScreen();

      enemies.forEach((e, i) => {
        if (laser.hits(e)) {
          var animated = new Sprite(sprites.explosion, e, "alien");
          e.damaged(laser.power);

          if (e.health <= 0) {
            e.remove();
          }
          laser.remove();
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.score += 10;

          if (e.toDelete) {
            enemies.splice(i, 1);
          }
        }
      });
    });

    missiles.forEach(missile => {
      missile.show(sprites.missile);
      missile.move();
      missile.offScreen();

      enemies.forEach((e, ind) => {
        if (missile.hits(e)) {
          var animated = new Sprite(sprites.explosion, e, "alien");
          e.remove();
          missile.remove();
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.score += 20;

          if (e.toDelete) {
            enemies.splice(ind, 1);
          }
        }
      });
    });
  };

  this.eStarFighters = function(enemies, asteroids) {
    
    asteroids.forEach((asteroid, ind) => {
      asteroid.show(sprites.enemies.asteroid)
      asteroid.update()
      asteroid.screenEdge()

      if(ship.collided(asteroid)){
        var animated = new Sprite(
          sprites.explosion,
          ship,
          "ship",
          ship.shield
        );
        muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          if (!ship.shield) {
            if(asteroid.r * 4 > ship.r * 2){
              ship.damage(400);
            }else{
              ship.damage(100);
            }
          }    
        asteroids.splice(ind,1)
      }
    })

    enemies.forEach((e, ind) => {
      e.show(sprites.enemies.eStarFighter);
      e.update();
      e.screenEdge();
      e.health_bar();
      e.turn();

      if (e.switch_movement) {
        e.setRotation(0.1);

        setTimeout(() => {
          e.switch_movement = false;
        }, 100);

      } else {
        e.setRotation(0);
      }

      if (e.collided(ship)) {
        e.remove();
        var animated = new Sprite(sprites.explosion, ship, "ship", ship.shield);
        if (!ship.shield) {
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.damage(100);
        }

        if (e.toDelete) {
          enemies.splice(ind, 1);
        }
      }

      if (e.alienLasers) {
        e.alienLasers.show(sprites.laser);
        e.alienLasers.move();

        if (e.alienLasers.hits(ship)) {
          var animated = new Sprite(
            sprites.explosion,
            ship,
            "ship",
            ship.shield
          );
          e.alienLasers = undefined;
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          if (!ship.shield) {
            ship.damage(e.power);
          }
        } else if (e.alienLasers.offScreen()) {
          e.alienLasers = undefined;
        }
      }
    });



    lasers.reverse().forEach((laser, i) => {
      laser.show(sprites.laser);
      laser.move();
      laser.offScreen();

      enemies.forEach((e, i) => {
        if (laser.hits(e)) {
          var animated = new Sprite(sprites.explosion, e, "alien");
          e.damaged(laser.power);

          if (e.health <= 0) {
            e.remove();
          }

          laser.remove();
          animated.show();
          muted
          ? sounds.explosion[Math.floor(random(0, 2))].pause()
          : sounds.explosion[Math.floor(random(0, 2))].play();
          ship.score += 10;

          if (e.toDelete) {
            enemies.splice(i, 1);
          }
        }
      });
  
      asteroids.reverse().forEach((asteroid, j) => {
        if (laser.hits(asteroid)) {
          var animated = new Sprite(sprites.explosion, asteroid, "alien");
          if (asteroid.r > 10) {
            var pieces = asteroid.collision();
             asteroids.push(...pieces);
          } else {
            ship.score += 5;
          }
          animated.show();
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
        }
      });
  
      if (laser.offScreen()) {
        lasers.splice(i, 1);
      }
    });

    missiles.forEach(missile => {
      missile.show(sprites.missile);
      missile.move();
      missile.offScreen();

      enemies.forEach((e, ind) => {
        if (missile.hits(e)) {
          var animated = new Sprite(sprites.explosion, e, "alien");
          e.remove();
          missile.remove();
          muted
            ? sounds.explosion[Math.floor(random(0, 2))].pause()
            : sounds.explosion[Math.floor(random(0, 2))].play();
          animated.show();
          ship.score += 20;

          if (e.toDelete) {
            enemies.splice(ind, 1);
          }
        }
      });
    });
  };
}
