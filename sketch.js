let freqSlider;
let fSelect;

function setup() { 
  createCanvas(400, 800);
  freqSlider = createSlider(0, 10, 5, 0.01);
  freqSlider.position(20, 750);
  fSelect = createSelect();
  fSelect.option('5hz cosine', 'cos5hz');
  fSelect.option('5hz cosine + 1', 'cos5hzplus1');
  fSelect.option('2hz cosine + 5Hz cosine', 'cos2plus5hz');
  fSelect.option('2hz cosine + 5Hz cosine + 2', 'cos2plus5hzplus2');
  fSelect.option('5hz "rotation function" (e^ix or cosx + isinx)', 'expi5hz');
  fSelect.position(20, 20);
}

const funcs = {
  cos5hz: (t) => Math.cos(t * (2 * Math.PI) * 5),
  cos5hzplus1: (t) => Math.cos(t * (2 * Math.PI) * 5) + 1,
  cos2plus5hz: (t) => Math.cos(t * 2 * Math.PI * 2) + Math.cos(t * 2 * Math.PI * 5),
  cos2plus5hzplus2: (t) => Math.cos(t * 2 * Math.PI * 2) + Math.cos(t * 2 * Math.PI * 5) + 2,
  expi5hz: (t) => math.exp(math.multiply(math.i, t, 2, math.pi, 5))
}

function ftPoint(f, freq) {
  return (t) =>
    math.multiply(f(t), math.exp(math.multiply(-1, 2, math.pi, math.i, freq, t)));
}

function draw() { 
  background(255);
  const freq = freqSlider.value();
  const f = funcs[fSelect.value()];
  stroke(0);
  fill(0);
  text(freq, 300, 750);
  const ftp = ftPoint(f, freq);
  const integral = math.bignumber('0');

  stroke(0);
  noFill();
  beginShape();
  lastT = 0;
  for (let i = 0; i < 2000; i++) {
    const t = i / 1000;
    const z = ftp(t);
    const x = (z.re + 1) * 80 + 80;
    const y = (1 - z.im) * 80 + 480;
    const dt = t - lastT;
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
  for (let i = 1; i < 200; i++) {
    const t = i/100;
    const x = t * 200 + 80;
    const ft = math.complex(f(t)).re;
    const y = (1-ft) * 50 + 200;
    vertex(x, y);
  }
  endShape();
}
