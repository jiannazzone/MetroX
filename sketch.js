var cardHeight;
var cardWidth;
var cardRadius;
var cardLocationDelta;

var reference;
var referenceHeight;
var referenceWidth;

var fontSize;
var allCards = [];
var currentCards;
var thisCard;

var logo;
var logoHeight;
var logoWidth;

function preload() {
  // Load all image files for later use
  allCards.push(loadImage('assets/free.png'));
  allCards.push(loadImage('assets/twoSkip.png'));
  allCards.push(loadImage('assets/twoSkip.png'));
  allCards.push(loadImage('assets/threeSkip.png'));
  allCards.push(loadImage('assets/three.png'));
  allCards.push(loadImage('assets/three.png'));
  allCards.push(loadImage('assets/three.png'));
  allCards.push(loadImage('assets/four.png'));
  allCards.push(loadImage('assets/four.png'));
  allCards.push(loadImage('assets/four.png'));
  allCards.push(loadImage('assets/five.png'));
  allCards.push(loadImage('assets/five.png'));
  allCards.push(loadImage('assets/six.png'));
  allCards.push(loadImage('assets/transfer.png'));
  allCards.push(loadImage('assets/transfer.png'));
  reference = loadImage('assets/reference.png');
  logo = loadImage('assets/logo.png');
}

function setup() {
  if (windowHeight < windowWidth) {
    cnv = createCanvas(windowHeight, windowHeight);
  } else {
    cnv = createCanvas(windowWidth, windowWidth);
  }
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
  setScaling();
  createUI();
  shuffleCards();
  cnv.touchEnded(mouseReleased);
}

function createUI() {
  background(2,126,198);
  image(logo, width/2, margin + logoHeight/2, logoWidth, logoHeight);
  
  // Make button
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(width*0.75, (height + cardHeight)/2 + margin, cardWidth, buttonHeight, cardRadius);
  
  // Add button text
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text("Flip Card", width*0.75, (height + cardHeight)/2 + margin);
  
  // Load reference card image
  var referenceX = width/3.5
  image(reference, referenceX, height/2,
        referenceWidth, referenceHeight);
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(referenceX, height/2, referenceWidth, referenceHeight, cardRadius);
}

function setScaling() {
  // Generate card size and location
  cardWidth = width/4;
  cardHeight = cardWidth*(1038/744);
  cardRadius = cardHeight/75;
  cardLocationDelta = cardHeight/75;
  referenceWidth = cardWidth*2;
  referenceHeight = referenceWidth*(1099/1380);
  
  // Generate button and font sizing
  buttonHeight = cardWidth/5;
  margin = cardHeight/10;
  fontSize = buttonHeight/1.5;
  
  // Generate logo size
  logoHeight = height/5;
  logoWidth = logoHeight*(709/238);
}

function addCard() {
  // Generate positions for the cards with a small change
  // to simulate a natural-looking stack
  var thisDeltaX = random(-cardLocationDelta, cardLocationDelta);
  var thisDeltaY = random(-cardLocationDelta, cardLocationDelta);
  var cardX = width*0.75 + thisDeltaX;
  var cardY = height/2 + thisDeltaY;
  
  // Pick a card from the shuffled pile and remove it from the list
  // Add card to screen with a small border
  thisCard = currentCards.pop();
  rotate(random(-0.5,0.5));
  image(thisCard, cardX, cardY, cardWidth, cardHeight);
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(cardX, cardY, cardWidth, cardHeight, cardRadius);
  rotate(0);
}

function shuffleCards() {
  currentCards = shuffle(allCards);
}

function mouseReleased() {
  if (mouseX >= width*0.75 - cardWidth/2 &&
      mouseX <= width*0.75 + cardWidth/2 &&
      mouseY >= (height + cardHeight - buttonHeight)/2 + margin &&
      mouseY <= (height + cardHeight + buttonHeight)/2 + margin){
    if (thisCard == allCards[12]) {
      thisCard = '';
      setup();
    } else {
      addCard();
    }
  }
}
