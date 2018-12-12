class HealthBar {
  show(health) {
    var c = health > 100 ? color(20, 75, 200) : color(255, 204, 0);
    var ColorValue = health > 100 ? green(c) : red(c);

    stroke(255);
    noFill();
    rect(width / 3, height / 32, 403, 50);

    noStroke();
    health > 100 ? fill(0, ColorValue, 0) : fill(ColorValue, 0, 0);
    rect(width / 3 + 2, height / 32 + 1, health, 48);
  }
}
