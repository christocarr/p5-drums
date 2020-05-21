
let hh;
let hPat;
let hPhrase;
let drums;

function setup() {

  createCanvas(400, 400)
  // hh = loadSound('assets/hh_sample.mp3', () => {
  //   drums.loop()
  // })

  // hPat = [1, 1, 1, 1];

  // hPhrase = new p5.Phrase('hh', () => {
  //   hh.play()
  // }, hPat)

  // drums = new p5.Part()
  
  // drums.addPhrase(hPhrase)
}

function draw() {
  background(220)
}

function mouseClicked() {
  hh = loadSound('assets/hh_sample.mp3', () => {
    drums.loop()
  })

  hPat = [1, 0, 1, 0];

  hPhrase = new p5.Phrase('hh', (time) => {
    hh.play(time)
    
  }, hPat)

  drums = new p5.Part()
  
  drums.addPhrase(hPhrase)
}