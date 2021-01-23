const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
		${selectedWord
		.split('')
		.map(letter => `
			<span class="letter">
				${correctLetters.includes(letter) ? letter : ''}
			</span>
		`).join('')
	}
	`
	const innnerWord = wordEl.innerText.replace(/\n/g, '')

	if (innnerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃'
		popup.style.display = 'flex'
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	console.log('Update wrong')
}

// Show notification
function showNotification() {
	notification.classList.add('show')

	setTimeout(() => notification.classList.remove('show'), 2000)
}

// Keydown letter press
window.addEventListener('keypress', e => {
	const handleLetter = letter => {
		// console.log(letter)
		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter)
				displayWord()
			} else {
				showNotification()
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter)
				updateWrongLettersEl()
			} else {
				showNotification()
			}
		}
	}

	if (e.defaultPrevented) {
		return; // Should do nothing if the default action has been cancelled
	}

	let handled = false;
	if (e.key !== undefined) {
		// Handle the event with KeyboardEvent.key and set handled true.
		handled = true
		if (e.key >= 'A' && e.key <= 'z') {
			handleLetter(e.key)
		}
	} else if (e.keyCode !== undefined) {
		// Handle the event with KeyboardEvent.keyCode and set handled true.
		handled = true
		if (e.keycode >= 65 && e.keycode <= 90) {
			handleLetter(e.key)
		}
	}

	if (handled) {
		// Suppress "double action" if event handled
		e.preventDefault();
	}

	/** Brad uses keycode which is deprecated. Normally you could use key instead, but not all browser support this
	 * @url https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
	 * I'll use Brad's code in the else if block
	 * I am also using 'keypress' instead of 'keypress' like Brad does. So it's possible to handle characters with
	 * shift pressed or capslock on.
	 * there's an example for dealing key and keycode:
	 */

	/**
	 * window.addEventListener("keydown", function (event) {
	 * if (event.defaultPrevented) {
	 *   return; // Should do nothing if the default action has been cancelled
	 * }
	 *
	 * var handled = false;
	 * if (event.key !== undefined) {
	 *   // Handle the event with KeyboardEvent.key and set handled true.
	 * } else if (event.keyCode !== undefined) {
	 *   // Handle the event with KeyboardEvent.keyCode and set handled true.
	 * }
	 *
	 * if (handled) {
	 *   // Suppress "double action" if event handled
	 *   event.preventDefault();
	 * }
	 *}, true);
	 *
	 */
})

displayWord()