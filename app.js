select = function (e) {
	return document.querySelector(e);
};
selectAll = function (e) {
	return document.querySelectorAll(e);
};
let score = 0;
let trials = 0;

const scoreEl = document.getElementById("score");
const trialsEl = document.getElementById("trials");

//env
var g = 9.81;

//init position
var xstart = -90;
var ystart = 28;

//position for loading
var xinter = 95;
var yinter = -55;

var xloaded = 35;
var yloaded = -125;

// ball in position
var xIn = 648;
var yIn = -210;

var start = 0;
var temptl;
var temptl2;
var temptl3;
var tempRotateTL;

var loadScale = 1.2;

var ball = select("#ball");
var tracker = select("#tracker");
var nets = select("#net");
var rim = select("#hoop");
var circle = select("#rim");
var lines = select("#lines");
var trackerIn = select("#in");
var ground = select("#ground1");

var LarmG = select("#LarmG");
var RarmG = select("#RarmG");
var Rarm = select("#Rarm");
var Larm = select("#Larm");
var Lforearm = select("#Lforearm");
var Rforearm = select("#Rforearm");
var chest = select("#chest");
var short = select("#short");
var head = select("#head");
var foot = select("#foot");
var leg = select("#leg");
var legG = select("#legG");
var player = select("#player");
var hair = select("#hair");
var handTracker = select("#handTracker");
var bottomTracker = select("#bottom");
var bottomRightTracker = select("#bottomRight");
var rightTracker = select("#right");

TweenMax.set(nets, {transformOrigin: "100% 0%"});
TweenMax.set(handTracker, {transformOrigin: "50% 50%", opacity: 0});
TweenMax.set(lines, {transformOrigin: "50% 50%"});
TweenMax.set(trackerIn, {transformOrigin: "100% 0%", opacity: 0});
TweenMax.set(rim, {transformOrigin: "50% 100%"});
TweenMax.set(circle, {transformOrigin: "100% 50%"});
TweenMax.set([ball, tracker], {transformOrigin: "50% 50%"});
TweenMax.set(ball, {transformOrigin: "50% -120%"});
TweenMax.set(tracker, {transformOrigin: "50% -660%", opacity: 0});
TweenMax.set(bottomTracker, {transformOrigin: "50% 50%", opacity: 0});
TweenMax.set(bottomRightTracker, {transformOrigin: "50% 50%", opacity: 0});
TweenMax.set(rightTracker, {transformOrigin: "50% 50%", opacity: 0});

TweenMax.set(LarmG, {transformOrigin: "50% 5%"});
TweenMax.set(RarmG, {transformOrigin: "50% 5%"});
TweenMax.set(Larm, {transformOrigin: "50% 5%"});
TweenMax.set(Rarm, {transformOrigin: "50% 5%"});
TweenMax.set(Rforearm, {transformOrigin: "60% 12%"});
TweenMax.set(Lforearm, {transformOrigin: "60% 12%"});
TweenMax.set(legG, {transformOrigin: "50% 5%"});
TweenMax.set(short, {transformOrigin: "50% 10%"});
TweenMax.set(leg, {transformOrigin: "50% 95%"});
TweenMax.set(foot, {transformOrigin: "100% 95%"});
TweenMax.set(head, {transformOrigin: "50% 100%"});
TweenMax.set(player, {transformOrigin: "50% 100%"});
TweenMax.set(hair, {transformOrigin: "20% 100%"});

//loadin on keyDown
function processKeyDown(e) {
	if (!start) {
		TweenMax.set(
			[ball, tracker, bottomTracker, bottomRightTracker, rightTracker],
			{x: 0, y: 0}
		);
		TweenMax.set(lines, {rotation: 0});
		TweenMax.killAll();
		temptl = createLoadTL();
		temptl.paused(false).play("1.3");
		start = new Date().getTime();
	}
}

//release on keyup
function processKeyUp(e) {
	var delta = (new Date().getTime() - start) * loadScale;
	start = 0;
	temptl.kill();
	temptl2 = createReleaseTL();
	temptl2.paused(false).play("2");
	tempRotateTL = createrotateTL();
	tempRotateTL.play();
	throwBall(
		Math.min(delta / 8.5, 100),
		ball._gsTransform.x,
		ball._gsTransform.y,
		Math.min(Math.PI / 2 - 0.1, ((delta / 1100) * Math.PI) / 2)
	);
	trials++;
	trialsEl.innerHTML = trials;
}

function createrotateTL() {
	rotateTL = new TimelineMax({paused: true, repeat: -1});
	rotateTL.to(lines, 1, {rotation: "-360deg", ease: Power0.easeNone}, "0");
	return rotateTL;
}

function createInTL() {
	InTL = new TimelineMax({paused: true});
	InTL
		//net and rim effect
		.add("0")
		.to(
			[ball, tracker, bottomTracker, bottomRightTracker, rightTracker],
			0.1,
			{x: xIn, y: yIn},
			"2.8"
		)
		.to(
			nets,
			0.1,
			{
				scaleY: 0.8,
				skewX: "10deg",
				rotation: "-5deg",
				ease: Back.easeOut.config(1.7).config(1, 0.3),
			},
			"2.8"
		)
		.to(rim, 0.2, {rotation: "-1deg"}, "2.8")
		.to(circle, 0.1, {rotation: "-5deg"}, "2.8")
		.to(
			nets,
			1,
			{
				scaleY: 1,
				skewX: 0,
				rotation: 0,
				ease: Elastic.easeOut.config(1, 0.3),
			},
			"3"
		)
		.to(rim, 1, {rotation: "0deg", ease: Elastic.easeOut.config(1, 0.3)}, "3")
		.to(
			circle,
			1,
			{rotation: "0deg", ease: Elastic.easeOut.config(1, 0.3)},
			"3"
		)

		//set finalPosition
		.to(
			[ball, tracker, bottomTracker, bottomRightTracker, rightTracker],
			1.5,
			{y: ystart, ease: Bounce.easeOut},
			"2.9"
		)
		.to(
			[ball, tracker, bottomTracker, bottomRightTracker, rightTracker],
			1.5,
			{x: xIn - 10, ease: Power0.easeNone},
			"2.9"
		)
		.to(
			[ball, tracker, bottomTracker, bottomRightTracker, rightTracker],
			3,
			{x: xIn - 50, ease: Power2.easeOut},
			"3.4"
		)
		.to(lines, 3.1, {rotation: "-410deg", ease: Power2.easeOut}, "3.0")

		.timeScale(1.1);
	return InTL;
}

function createLoadTL() {
	loadTL = new TimelineMax({paused: true});

	loadTL
		.to(RarmG, 0.7, {rotation: "-110deg", y: 5, ease: Power0.easeOut}, "1.3")
		.to(Rforearm, 0.7, {rotation: "-75deg", ease: Power0.easeOut}, "1.3")
		.to(LarmG, 0.7, {rotation: "-85deg", y: 5, ease: Power0.easeOut}, "1.3")
		.to(Lforearm, 0.7, {rotation: "-120deg", ease: Power0.easeOut}, "1.3")
		.to(short, 0.7, {rotation: "-10deg", ease: Power0.easeOut}, "1.3")
		.to(leg, 0.7, {rotation: "10deg", ease: Power0.easeOut}, "1.3")
		.to([chest, head], 0.7, {y: 5, ease: Power0.easeOut}, "1.3")
		.to(
			ball,
			0.7,
			{
				bezier: {
					type: "soft",
					values: [
						{x: 0, y: 0},
						{x: xinter, y: yinter},
						{x: xloaded, y: yloaded},
					],
				},
				ease: Power0.easeOut,
				onUpdate: ballTracker,
			},
			"1.3"
		)
		.timeScale(loadScale);
	return loadTL;
}

function createReleaseTL() {
	releaseTL = new TimelineMax({paused: true});
	releaseTL
		.to(
			RarmG,
			0.3,
			{
				rotation: RarmG._gsTransform.rotation + "deg",
				y: -10,
				ease: Back.easeOut.config(1),
			},
			"2"
		)
		.to(
			Rforearm,
			0.3,
			{
				rotation: Rforearm._gsTransform.rotation + 25 + "deg",
				ease: Back.easeOut.config(1),
			},
			"2"
		)
		.to(
			LarmG,
			0.3,
			{
				rotation: LarmG._gsTransform.rotation - 40 + "deg",
				y: -10,
				ease: Back.easeOut.config(1),
			},
			"2"
		)
		.to(Lforearm, 0.3, {rotation: "-5deg", ease: Back.easeOut.config(1)}, "2")
		.to(player, 0.3, {rotation: "1deg", ease: Back.easeOut.config(1)}, "2")
		.to(short, 0.2, {rotation: "0deg", y: -10}, "2")
		.to(leg, 0.2, {rotation: "0deg", y: -10}, "2")
		.to(hair, 0.2, {skewX: "4deg"}, "2")
		.to(head, 0.2, {rotation: "-10deg"}, "2")
		.to(foot, 0.2, {rotation: "20deg"}, "2")
		.to([chest, head], 0.2, {y: -10}, "2")
		.to(
			head,
			3,
			{rotation: "0deg", ease: Elastic.easeOut.config(0.5, 0.3)},
			"2.2"
		)
		.to(hair, 2, {skewX: "0deg", ease: Elastic.easeOut.config(1, 0.3)}, "2.2")
		.to(
			RarmG,
			2.7,
			{rotation: "0", y: 0, ease: Elastic.easeOut.config(0.4, 0.3)},
			"2.3"
		)
		.to(Rforearm, 0.7, {rotation: "0deg"}, "2.3")
		.to(player, 0.7, {rotation: "0deg"}, "2.3")
		.to(
			LarmG,
			2.7,
			{rotation: "0deg", y: 0, ease: Elastic.easeOut.config(0.4, 0.3)},
			"2.3"
		)
		.to(Lforearm, 0.7, {rotation: "0deg"}, "2.3")
		.to(short, 0.7, {rotation: "0deg", y: 0}, "2.2")
		.to(leg, 0.7, {rotation: "0deg", y: 0}, "2.2")
		.to(foot, 0.7, {rotation: "0deg"}, "2.2")
		.to([chest, head], 0.7, {y: 0}, "2.2")
		.timeScale(1.2);
	return releaseTL;
}

function throwBall(vinit, xinit, yinit, alpha) {
	var V0 = {x: Math.cos(alpha) * vinit, y: Math.sin(alpha) * vinit};
	var t = 0;

	// var steps = getSteps(V0,yinit-ystart,xinit - xstart);
	var endTime = getEndTime(V0, yinit - ystart);
	var interval = setInterval(function () {
		t += 0.055;
		moveBall(x(t, V0, xinit), y(t, V0, yinit));
		if (checkRim()) {
			clearInterval(interval);
			temptl3 = createInTL();
			temptl3.play(2.8);
			tempRotateTL.kill();
		} else if (t > endTime) {
			tempRotateTL.kill();
			clearInterval(interval);
		}
	}, 3);
}

function moveBall(x, y) {
	TweenMax.to([ball], 0.05, {
		x: x,
		y: y,
		z: 0,
		ease: Power0.easeNone,
		onUpdate: ballTracker,
	});
}

function x(t, Vinit, xinit) {
	return Vinit.x * t + xinit;
}

function y(t, Vinit, yinit) {
	return (g / 2) * Math.pow(t, 2) - Vinit.y * t + yinit;
}

//check if rim impact
function checkRim() {
	if (Draggable.hitTest("#tracker", "#in")) {
		score++;
		scoreEl.innerHTML = score;
		return true;
	}
}

//get time of ground impact
function getEndTime(Vinit, yinit) {
	var det = Math.pow(Vinit.y, 2) - ((4 * g) / 2) * yinit;
	var sol = (-Vinit.y - Math.sqrt(det)) / -g;
	return sol;
}

//move ball tracker according to ball
function ballTracker() {
	TweenMax.set([tracker, bottomTracker, bottomRightTracker, rightTracker], {
		x: ball._gsTransform.x,
		y: ball._gsTransform.y,
		rotation: ball._gsTransform.rotation,
	});
}

//toDo: bounces on ground and board and rim
