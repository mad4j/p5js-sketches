let img;
let canvas;

function preload() {
	// load original image
  img = loadImage('photo.jpg');
}

function setup() {
	background(255);
	noStroke();

  frameRate(60);

	img.loadPixels();
	canvas = createCanvas(img.width, img.height);
}

function draw() {
	for(let i=0; i<100; i++)
		drawPill();
}

function mousePressed(){
	background(255);
}

function keyTyped() {
  if (key === 's') {
    saveCanvas(canvas, 'result', 'png');
  } else if (key === 'r') {
    background(255);
  }
  // uncomment to prevent any default behavior
  // return false;
}

function drawPill() {
	let x = random(width);
	let y = random(height);
	let color = img.get(x, y);
	let lum = .2126 * red(color) + .7152 * green(color) + .0722 * blue(color);
	let angle = lum / 255 * PI + ((x / width) * PI);
	angle /=2;
	angle += noise(x/100, y/100) * PI;
	fill(color);
	pill(x, y, random(height/40, width/200), random(height/40, width/200), angle);
}

function pill(x, y, width, height, rotation) {
	let size = width/6;
	let precision = width/600;
	push();
		translate(x, y);
		rotate(rotation);
		beginShape();
			for(let i=0; i<TWO_PI; i+=precision){
				let s = size;
				if(i>PI) s = size*0.7;
					vertex(cos(i+PI)*s, sin(i+PI)*s + (i<PI ? -height/2 : height/2));
			}
		endShape(CLOSE);
	pop();
}