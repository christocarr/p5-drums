
let hh, clap, bass; //a container that holds the sound source
let hPat, cPat, bPat; //pattern for beats that can be changed
let hPhrase, cPhrase, bPhrase;
let drums;

function setup() {
  hh = loadSound('assets/hh_sample.mp3', () => {
    
  })

  clap = loadSound('assets/clap_sample.mp3', () => {
    
  })

  bass = loadSound('assets/bass_sample.mp3', () => {
    
  })

  hPat = [1, 0, 1, 0];
  cPat = [0, 0, 0, 0];
  bPat = [0, 0, 0, 0];

  hPhrase = new p5.Phrase('hh', (time) => {
    hh.play(time)

  }, hPat)

  cPhrase = new p5.Phrase('clap', (time) => {
    clap.play(time)

  }, cPat)

  bPhrase = new p5.Phrase('bass', (time) => {
    bass.play(time)

  }, bPat)

  drums = new p5.Part()
  
  drums.addPhrase(hPhrase)
  drums.addPhrase(cPhrase)
  drums.addPhrase(bPhrase)

}

function mouseClicked() {
  if (drums.isPaying) {
    drums.stop()
  } else {
    drums.loop()
  }
  
}