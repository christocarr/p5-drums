let hh, clap, bass; //a container that holds the sound source
let hPat, cPat, bPat; //pattern for beats that can be changed
let hPhrase, cPhrase, bPhrase;
let drums;
let bpmCTRL;
let beatLength;

function preload() {
  hh = loadSound('assets/hh_sample.mp3');

  clap = loadSound('assets/clap_sample.mp3');

  bass = loadSound('assets/bass_sample.mp3');
}

function setup() {
  createCanvas(320, 60);

  beatLength = 16;

  hPat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  cPat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  bPat = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];

  // hPhrase = new p5.Phrase('hh', (time) => {
  //   hh.play(time)

  // }, hPat)

  // cPhrase = new p5.Phrase('clap', (time) => {
  //   clap.play(time)

  // }, cPat)

  // bPhrase = new p5.Phrase('bass', (time) => {
  //   bass.play(time)

  // }, bPat)

  // drums = new p5.Part()

  // drums.addPhrase(hPhrase)
  // drums.addPhrase(cPhrase)
  // drums.addPhrase(bPhrase)

  bpmCTRL = createSlider(30, 600, 80, 1);
  bpmCTRL.position(10, 70);
  bpmCTRL.input(() => drums.setBPM(bpmCTRL.value()));

  background(80);
  stroke('gray');
  strokeWeight(2);
  for (let i = 0; i < beatLength + 1; i++) {
    line(i * (width / beatLength), 0, i * (width / beatLength), height);
  }
  for (let i = 0; i < 4; i++) {
    line(0, i * (height / 3), width, i * (height / 3));
  }
  noStroke();
  for (let i = 0; i < beatLength; i++) {
    if(hPat[i] === 1) {
      ellipse(i * (width / beatLength) + 0.5 * (width / beatLength), height / 6, 10)
    }
  }
  for (let i = 0; i < beatLength; i++) {
    if(cPat[i] === 1) {
      ellipse(i * (width / beatLength) + 0.5 * (width / beatLength), height / 2, 10)
    }
  }
  for (let i = 0; i < beatLength; i++) {
    if(bPat[i] === 1) {
      ellipse(i * (width / beatLength) + 0.5 * (width / beatLength), height * (5 / 6), 10)
    }
  }
}

function mouseClicked() {

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

  drums.setBPM('60');
}

function keyPressed() {
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
