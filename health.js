class HealthBar {
  show(health, shield) {
    var c = health > 100 ? color(20, 200, 200) : color(255, 204, 0);
    var ColorValue = health > 100 ? green(c) : red(c);

    noStroke();
    health > 100 ? fill(0, ColorValue, 0) : fill(ColorValue, 0, 0);
    rect(width / 3 + 2, height / 32 + 1, health, 28);
    textAlign(CENTER);

    fill(255)
    textSize(25);
    shield ? text('SHIELDED', width/2, 45) : text('HEALTH', width/2, 45)
  }
}
