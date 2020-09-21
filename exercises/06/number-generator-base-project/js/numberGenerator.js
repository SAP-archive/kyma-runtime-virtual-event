// The lottery expects the player to pick 5 number + a so called powerball which gets generated sperately.
// The generatedNumbers array represents the first 5 numbers.
var generatedNumbers = new Array(5)

// This method generates a random number between 1 0 and 69.
// returns a random number.
function generateNumber() {
    return Math.ceil(Math.random(0, 1) * 69);
}

// This method iterates over the generatedNumbers array and fills it with randomly generated numbers through the generateNumber() method.
// returns an array of 5 randomly generated numbers.
function generate() {
    for (i = 0; i < generatedNumbers.length; i++) {
        generatedNumbers[i] = generateNumber();
    }
    return generatedNumbers
}

// Calls the genrateNumber() and generate() method.
// returns the first 5 numbers and the so called powerball.
function giveWinningNumbers() {
    document.getElementById('baseNumbersLabel').textContent = generate()
    document.getElementById('pNumberLabel').textContent = "Powerball: " + generateNumber()
}