let hh, clap, bass; //a container that holds the sound source
let hPat, cPat, bPat; //pattern for beats that can be changed
let hPhrase, cPhrase, bPhrase;
let drums;
let bpmCTRL;
let beatLength;
let cellWidth;
let seqPat;

function preload() {
  hh = loadSound('assets/hh_sample.mp3');

  clap = loadSound('assets/clap_sample.mp3');

  bass = loadSound('assets/bass_sample.mp3');
}

function setup() {
  let cnv = createCanvas(320, 60);
  cnv.mousePressed(canvasClicked);

  beatLength = 16;
  cellWidth = width / beatLength;

  hPat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  cPat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  bPat = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
  seqPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  bpmCTRL = createSlider(30, 600, 80, 1);
  bpmCTRL.position(10, 70);
  bpmCTRL.input(() => drums.setBPM(bpmCTRL.value()));

  drawMatrix();
}

function drawMatrix() {
  background(80);
  stroke('gray');
  strokeWeight(2);
  fill('white')
  for (let i = 0; i < beatLength + 1; i++) {
    line(i * cellWidth, 0, i * cellWidth, height);
  }
  for (let i = 0; i < 4; i++) {
    line(0, i * (height / 3), width, i * (height / 3));
  }
  noStroke();
  for (let i = 0; i < beatLength; i++) {
    if (hPat[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height / 6, 10);
    }
  }
  for (let i = 0; i < beatLength; i++) {
    if (cPat[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height / 2, 10);
    }
  }
  for (let i = 0; i < beatLength; i++) {
    if (bPat[i] === 1) {
      ellipse(i * cellWidth + 0.5 * cellWidth, height * (5 / 6), 10);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    hPhrase = new p5.Phrase(
      'hh',
      (time) => {
        hh.play(time);
      },
      hPat
    );

    cPhrase = new p5.Phrase(
      'clap',
      (time) => {
        clap.play(time);
      },
      cPat
    );

    bPhrase = new p5.Phrase(
      'bass',
      (time) => {
        bass.play(time);
      },
      bPat
    );

    drums = new p5.Part();

    drums.addPhrase(hPhrase);
    drums.addPhrase(cPhrase);
    drums.addPhrase(bPhrase);

    drums.addPhrase('seq', sequence, seqPat)

    drums.setBPM('60');
  }

  if (key === ' ') {
    if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
      if (!drums.isPlaying) {
        drums.loop();
      } else {
        drums.stop();
      }
    } else {
      console.log('Still loading');
    }
  }
}

function canvasClicked() {
  let rowClicked = floor((3 * mouseY) / height);
  let indexClicked = floor((16 * mouseX) / width);
  if (rowClicked === 0) {
    hPat[indexClicked] = hPat[indexClicked] === 1 ? 0 : 1
  } else if (rowClicked === 1) {
    cPat[indexClicked] = cPat[indexClicked] === 1 ? 0 : 1
  } else if (rowClicked === 2) {
    bPat[indexClicked] = bPat[indexClicked] === 1 ? 0 : 1
  }

  drawMatrix()
}

function sequence(time, beatIndex) {
  setTimeout(() => {
    drawMatrix()
    stroke('red')
    fill(255, 0, 0, 33)
    rect((beatIndex - 1) * cellWidth, 0, cellWidth, height)
  }, time * 1000)
}