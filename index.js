const ANIMATION_KEYFRAMES = [
	{ transform: "rotate(0)" },
	{ transform: "rotate(30deg)" },
	{ transform: "rotate(-30deg)" },
	{ transform: "rotate(0)" }
];

const ANIMATION_OPTIONS = {
	duration: 400,
	iterations: 8,
	direction: "alternate"
};

const NUMBER_FLAKES = 100;
const FLAKE_FADE_IN_DURATION = 500;

const SHAKE_DURATION =
	ANIMATION_OPTIONS.duration * ANIMATION_OPTIONS.iterations;

globe.addEventListener("click", () => {
	globe.animate(ANIMATION_KEYFRAMES, ANIMATION_OPTIONS);

	let count = 0;
	const interval = setInterval(() => {
		spawnFlake();
		count++;
		if (count >= NUMBER_FLAKES) clearInterval(interval);
	}, SHAKE_DURATION / NUMBER_FLAKES - FLAKE_FADE_IN_DURATION / NUMBER_FLAKES);
});

function random(min, max) {
	return Math.random() * (max - min) + min;
}

function withUnit(value, unit) {
	return `${value}${unit}`;
}

function spawnFlake() {
	const flake = document.createElement("div");
	flake.classList.add("flake");

	const fallDuration = random(10, 30);

	flake.dataset.top = withUnit(random(-10, 55), "%");
	flake.dataset.left = withUnit(random(0, 100), "%");
	flake.dataset.size = random(0.4, 1.2);
	flake.dataset.fallDuration = withUnit(fallDuration, "s");
	flake.dataset.amplitudeDuration = withUnit(random(2, 3), "s");
	flake.dataset.amplitudeDelay = withUnit(random(0, 0.4), "s");
	flake.dataset.amplitude = random(0.5, 3.5);

	inner.appendChild(flake);

	flake.animate([{ opacity: 0 }, { opacity: 1 }], {
		duration: FLAKE_FADE_IN_DURATION,
		fill: "forwards"
	});

	setTimeout(() => flake.remove(), fallDuration * 1000);
}
