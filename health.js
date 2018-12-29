class HealthBar {
  show(health, shield) {
    var txtVal;
    var greenC = green(color(20, 200, 200));
    var redC = red(color(255, 204, 0));
    
    if (shield) {
      txtVal = "SHIELDED";
    } else if (health > 100) {
      txtVal = "HEALTH";
    } else {
      txtVal = "DANGER!";
    }

    stroke(255);
    fill(redC, 0, 0);
    rect(width / 3 + 2, height / 32, 401, 29);

    noStroke();
    fill(0, greenC, 0);
    rect(width / 3 + 3, height / 32 + 1, health, 28);
    textAlign(CENTER);

    fill(255);
    textSize(25);
    text(txtVal, width / 2, 45);
  }
}
