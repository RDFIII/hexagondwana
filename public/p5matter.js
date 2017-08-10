// Hexagondwana

soundArray = []

// function preload() {
//   sound1 = loadSound('audio/melo_flute/1.mp3');
// 	sound2 = loadSound('audio/melo_flute/2.mp3');
// 	sound3 = loadSound('audio/melo_flute/3.mp3');
// 	sound4 = loadSound('audio/melo_flute/4.mp3');
// 	sound5 = loadSound('audio/melo_flute/5.mp3');
// 	sound6 = loadSound('audio/melo_flute/6.mp3');
// 	sound7 = loadSound('audio/melo_flute/7.mp3');
// 	sound8 = loadSound('audio/melo_flute/8.mp3');
// 	sound9 = loadSound('audio/melo_flute/9.mp3');
// 	sound10 = loadSound('audio/melo_flute/10.mp3');
// 	sound11 = loadSound('audio/melo_flute/11.mp3');
// 	sound12 = loadSound('audio/melo_flute/12.mp3');
// 	sound13 = loadSound('audio/melo_flute/13.mp3');
// 	sound14 = loadSound('audio/melo_flute/14.mp3');
// 	sound15 = loadSound('audio/melo_flute/15.mp3');
// 	sound16 = loadSound('audio/melo_flute/16.mp3');
// 	sound17 = loadSound('audio/melo_flute/17.mp3');
// 	sound18 = loadSound('audio/melo_flute/18.mp3');
// 	sound19 = loadSound('audio/melo_flute/19.mp3');
// 	sound20 = loadSound('audio/melo_flute/20.mp3');
// 	sound21 = loadSound('audio/melo_flute/21.mp3');
// 	sound22 = loadSound('audio/melo_flute/22.mp3');
// 	sound23 = loadSound('audio/melo_flute/23.mp3');
// 	soundArray.push(sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10, sound11, sound12, sound13, sound14, sound15, sound16, sound17, sound18, sound19, sound20, sound21, sound22, sound23);
// }

function preload() {
  sound1 = loadSound('audio/shimmer_melo_flute/1.mp3');
	sound2 = loadSound('audio/shimmer_melo_flute/2.mp3');
	sound3 = loadSound('audio/shimmer_melo_flute/3.mp3');
	sound4 = loadSound('audio/shimmer_melo_flute/4.mp3');
	sound5 = loadSound('audio/shimmer_melo_flute/5.mp3');
	sound6 = loadSound('audio/shimmer_melo_flute/6.mp3');
	sound7 = loadSound('audio/shimmer_melo_flute/7.mp3');
	sound8 = loadSound('audio/shimmer_melo_flute/8.mp3');
	sound9 = loadSound('audio/shimmer_melo_flute/9.mp3');
	sound10 = loadSound('audio/shimmer_melo_flute/10.mp3');
	sound11 = loadSound('audio/shimmer_melo_flute/11.mp3');
	sound12 = loadSound('audio/shimmer_melo_flute/12.mp3');
	sound13 = loadSound('audio/shimmer_melo_flute/13.mp3');
	sound14 = loadSound('audio/shimmer_melo_flute/14.mp3');
	sound15 = loadSound('audio/shimmer_melo_flute/15.mp3');
	sound16 = loadSound('audio/shimmer_melo_flute/16.mp3');
	soundArray.push(sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10, sound11, sound12, sound13, sound14, sound15, sound16);
}


let ballRadius = 10;
let pegCount = 6;
let maximumBalls = 1;
let ballEveryNFrames = 1;

let w = 750;
let h = 900;
let countX = 10;
let countY = 20;
let m;

const { Bodies, Body, Composite, Engine, Events, World } = Matter;

let canvas;
let engine;
let wheel;

function setup() {
	engine = Engine.create();

	Engine.run(engine);

  // ------------- COLLISION EVENT -------------------

	Events.on(engine, 'collisionStart', function (event) {
		bodyB = event.source.pairs.list[event.source.pairs.list.length-1].bodyB
    // bodyB.soundfile.play();
    console.log(bodyB );
    soundArray[bodyB.label].play();
	});


	canvas = createCanvas(windowWidth, windowHeight);

  // --------------- SETUP SLIDERS  ----------------------

	gravitySlider = createSlider(-1, 1, 0, .1);
	gravitySlider.position(windowWidth/1.2, windowHeight/1.2);

	rotationSlider = createSlider(.0005, .05, .01, .001);
	rotationSlider.position(windowWidth/1.2, windowHeight/1.1)

	// ----------------- HEXAGON GEOMETRY -----------------


	m = min(width, height);
	let ratio = 1 / 5 * 1.5;

	let radius = m * ratio;

	let parts = [];

	for(let i = 0; i < pegCount; i++) {
		let segment = TAU / pegCount;
		let angle = i / pegCount * TAU;
		// divide next line by 1 to delete peg balls, original was 2
		let angle2 = i / pegCount * TAU + segment / 1;
		let x2 = cos(angle2);
		let y2 = sin(angle2);
		let cx2 = x2 * radius;
		let cy2 = y2 * radius;
		// Hexagon
		let rect = addRect({ x: cx2, y: cy2, w: 182	 / 500 * m, h: 30 / 1000 * m, options: { angle: angle2 + HALF_PI, isStatic: true  } });
		// Ocotgon
		// let rect = addRect({ x: cx2, y: cy2, w: 130 / 500 * m, h: 30 / 1000 * m, options: { angle: angle2 + HALF_PI, isStatic: true  } })
		parts.push(rect);
	}

	wheel = Body.create({ parts, isStatic: true });

  // ------------ Create Buttons --------------------

	button1 = createButton("1");
	button1.position(210, 65);
	button1.mousePressed(addCircle.bind(this, 1));

	button2 = createButton("2")
	button2.position(210, 85);
	button2.mousePressed(addCircle.bind(this, 2));

	button3 = createButton("3")
	button3.position(210, 105);
	button3.mousePressed(addCircle.bind(this, 3));

	button4 = createButton("4")
	button4.position(210, 125);
	button4.mousePressed(addCircle.bind(this, 4));

	button5 = createButton("5")
	button5.position(210, 145);
	button5.mousePressed(addCircle.bind(this, 5));

	button6 = createButton("6")
	button6.position(210, 165);
	button6.mousePressed(addCircle.bind(this, 6));

	button7 = createButton("7")
	button7.position(210, 185);
	button7.mousePressed(addCircle.bind(this, 7));

	button8 = createButton("8")
	button8.position(210, 205);
	button8.mousePressed(addCircle.bind(this, 8));

	button9 = createButton("9")
	button9.position(210, 225);
	button9.mousePressed(addCircle.bind(this, 9));

	button10 = createButton("10")
	button10.position(210, 245);
	button10.mousePressed(addCircle.bind(this, 10));

  button11 = createButton("11")
  button11.position(210, 265);
  button11.mousePressed(addCircle.bind(this, 11));

  button12 = createButton("12")
  button12.position(210, 285);
  button12.mousePressed(addCircle.bind(this, 12));

  button13 = createButton("13")
  button13.position(210, 305);
  button13.mousePressed(addCircle.bind(this, 13));

  button14 = createButton("14")
  button14.position(210, 325);
  button14.mousePressed(addCircle.bind(this, 14));

  button15 = createButton("15")
  button15.position(210, 345);
  button15.mousePressed(addCircle.bind(this, 15));

  button16 = createButton("16")
  button16.position(210, 365);
  button16.mousePressed(addCircle.bind(this, 16));

}


// ------------ SETUP FUNCTIONS --------------


function addBody(...bodies) {
	World.add(engine.world, bodies);
}

function removeBody(...bodies) {
	World.remove(engine.world, bodies);
}

function addRect({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) {
	let body = Bodies.rectangle(x, y, w, h, options);
	addBody(body);
	return body;
}

function addCircle(noteNumber) {
	let values = {
			x: 0,
			y: 0,
			r: ballRadius,
			options: {
				// mass: .2,
				restitution: 1.001,
				force: {x:0, y:.003},
				frictionAir: -.001,
				// frictionAir: 0,
				frictionStatic: 2,
				torque: 0,
				// torque: random(-0.05, 0.05),
				gravity: 0,
				inertia: 0,
				inverseInertia: 2,
				isSensor: false,
				label: noteNumber,
          // soundfile: soundArray[noteNumber - 1]
			}
	};
	let body = Bodies.circle(values.x, values.y, values.r, values.options);
  // console.log("ADD CIRICLE")
  // console.log(body);
	addBody(body);
	return body;

}


// --------------------- DRAW --------------------------------------



function draw() {

  // #0099ff light blue
  // #47d147 green

	background("#47d147");

	const rotation = rotationSlider.value();

	Body.rotate(wheel, rotation);

	let bodies = Composite.allBodies(engine.world);

	const gravity = gravitySlider.value();

	engine.world.gravity.x = 0;
	engine.world.gravity.y = gravity;  //  from -1 to 1

	translate(width / 2, height / 2);

	bodies.forEach((n, i) => {

		let render = n.render;
		if(!render.visible) {
			return;
		}

    // #660066 purple
    // #000066 dark blue

		fill("#660066");
		stroke(render.strokeStyle);
		strokeWeight(render.lineWidth);
		if(['peg','ball'].includes(n.label)) {
			ellipse(n.position.x, n.position.y, n.circleRadius * 2);
		}
		// renders the hexagon
		else {
			beginShape();
			n.vertices.forEach(({ x, y, isInternal }) => vertex(x, y));
			endShape(CLOSE);
		}

		if(!n.isStatic && n.position.y > height * 2) {
			removeBody(n);
	  	}
	});
}



function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
