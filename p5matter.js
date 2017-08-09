// Hexagondwana
// Ocotgondwana
// Hexagondwana dotcomma


let ballRadius = 10;
let pegCount = 8;
// let pegSize = 4;
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

	Events.on(engine, 'collisionStart', function (event) {
		console.log(event.source.pairs.list[0].bodyA)
		console.log(event.source.pairs.list[0].bodyB)
    startOsc(freqHash[Math.floor((Math.random() * 10))]);
});

	canvas = createCanvas(windowWidth, windowHeight);

	gravitySlider = createSlider(-1, 1, 0, .1);
	gravitySlider.position(windowWidth/1.2, windowHeight/1.2);

	rotationSlider = createSlider(.0005, .05, .01, .001);
	rotationSlider.position(windowWidth/1.2, windowHeight/1.1)

	// ratioSlider = createSlider((1, 3, 1.5, .1);
	// ratioSlider.position(windowWidth/1.2, windowHeight/1.3)

	// restitutionSlider = createSlider()

	m = min(width, height);
	let ratio = 1 / 5 * 1.5;
	// ratio = ratioSlider.value();
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
		// changing w to 4000 is pretty cool
		// Hexagon
		// let rect = addRect({ x: cx2, y: cy2, w: 182	 / 500 * m, h: 30 / 1000 * m, options: { angle: angle2 + HALF_PI, isStatic: true  } });
		// Ocotgon
		let rect = addRect({ x: cx2, y: cy2, w: 130 / 500 * m, h: 30 / 1000 * m, options: { angle: angle2 + HALF_PI, isStatic: true  } })
		// let rect = addRect({ x: cx2, y: cy2, w: 1100 / 500 * m, h: 30 / 1000 * m, options: { angle: angle2 + HALF_PI, isStatic: true  } });
		parts.push(rect);
	}

	wheel = Body.create({ parts, isStatic: true });
}

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
function addCircle({ x = 0, y = 0, r = 40, options = {} } = {}) {
	let body = Bodies.circle(x, y, r, options);
	addBody(body);
	return body;
}





function draw() {
	background("#0099ff");

	const rotation = rotationSlider.value();

	Body.rotate(wheel, rotation); // between .0005 and .05?        .001 is standard

	let bodies = Composite.allBodies(engine.world);

	$(window).unbind().click(function() {
		addCircle({
				x: 0,
				y: 0,
				r: ballRadius / 1000 * m,
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
					// isSensor: false,
					label: 'ball'
				}
			});
	});

	const gravity = gravitySlider.value();

	engine.world.gravity.x = 0;
	engine.world.gravity.y = gravity;  //  from -1 to 1

	translate(width / 2, height / 2);

	bodies.forEach((n, i) => {

		let render = n.render;
		if(!render.visible) {
			return;
		}
		fill("#000066");
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

console.log(frames);
