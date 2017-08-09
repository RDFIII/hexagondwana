context = new AudioContext();

var oscHash = {}

function startOsc(frequency){  // Frequency is passed to this function

	// oscillatorNode
	const oscillator = context.createOscillator(); // Create sound source
	oscillator.type = 'sine'; // Sine wave
	oscillator.frequency.value = frequency; // Frequency in hertz (passed from noteHash)
	oscillator.start(0); // Play oscillator immediately, start at 0 seconds

	// gainNode
	gain = context.createGain(); // Create gain node
	gain.gain.value = 0.1; // Set gain to full volume

	// Connect the Nodes
	oscillator.connect(gain); // Connect oscillator to gain
	gain.connect(context.destination); // Connect gain to output

  oscillator.stop(context.currentTime + .5);

  return oscillator;
};


freqHash = {
  0: 440,
  1: 261.63,
  2: 392.00,
  3: 493.88,
  4: 739.99,
  5: 659.25,
  6: 587.33,
  7: 523.25,
  8: 783.99,
  9: 987.77,
  10: 739.99
}
