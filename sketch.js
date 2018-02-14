var freqSlider;

function setup() { 
  createCanvas(400, 800);
  frameRate(1);
  freqSlider = createSlider(0, 10, 5, 0.01);
  freqSlider.position(20, 750);
}

function f(t) {
  return 1 + Math.cos(t * (2 * Math.PI) * 5);
  //return math.exp(math.multiply(math.i, t, 2, math.pi, 5));
}

function ftPoint(f, freq) {
  return (t) =>
    math.multiply(f(t), math.exp(math.multiply(-1, 2, math.pi, math.i, freq, t)));
}

function draw() { 
  background(255);
  var freq = freqSlider.value();
  stroke(0);
  fill(0);
  text(freq, 300, 750);
  var ftp = ftPoint(f, freq);
  var integral = math.bignumber('0');

  stroke(0);
  noFill();
  beginShape();
  lastT = 0;
  for (var i = 0; i < 2000; i++) {
    var t = i / 1000;
    var z = ftp(t);
    var x = (z.re + 1) * 80 + 80;
    var y = (1 - z.im) * 80 + 480;
    var dt = t - lastT;
    integral = math.add(integral, math.multiply(dt, z));
    lastT = t;
    vertex(x, y)
  }
  endShape();
  noStroke();
  fill(color('red'));
  ellipse((integral.re + 1) * 80 + 80, (1 - integral.im) * 80 + 480, 5, 5);

  stroke(0);
  noFill();
  beginShape();
  for (var i = 1; i < 200; i++) {
    var t = i/100;
    var x = t * 200 + 80;
    var y = (1-f(t)) * 50 + 80;
    vertex(x, y);
  }
  endShape();
}
