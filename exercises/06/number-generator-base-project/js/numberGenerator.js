// The lottery expects the player to pick 5 number + a so called powerball which gets generated sperately.
// The generatedNumbers array represents the first 5 numbers.
var generatedNumbers = new Array(5);

// This method generates a random number between 1 0 and 69.
// returns a random number.
function generateNumber() {
    var number = Math.ceil(Math.random(0, 1) * 69);
    return number;
}

// This method iterates over the generatedNumbers array and fills it with randomly generated numbers through the generateNumber() method.
// returns an array of 5 randomly generated numbers.
function generate() {
    for (i = 0; i < generatedNumbers.length; i++) {
        generatedNumbers[i] = generateNumber();
    }
    return generatedNumbers;
}

// Calls the genrateNumber() and generate() method.
// returns the first 5 numbers and the so called powerball.
function giveWinningNumbers() {
    document.getElementById('baseNumbersLabel').textContent = generate();
    document.getElementById('pNumberLabel').textContent = "Powerball: " + generateNumber();
}



/**
 * retrieve the lottery numbers as RESTFul request
 * updates also the text field in DOM markup
 */
const giveWinningNumbersRest = async () => {
    restUtils.get('/rest/draw')
        .then((drawnNumbers) => {
            console.log('drawnNumbers', drawnNumbers);
            let numberJson = JSON.parse(drawnNumbers);
            document.getElementById('baseNumbersLabel').textContent = numberJson.numbers;
            document.getElementById('pNumberLabel').textContent = "Powerball: " + numberJson.powerball;

            
        })
        .catch((error) => {
            return "could not draw numbers. Status: " + error.status + ", Reason:" + error.statusText;
        })
}

/**
 * get 100 numbers sequentially. Really ugly code :-)
 */
const giveWinningNumbersRest100 = async () => {
    for (var i = 0; i <= 100; i++)
    {
        await giveWinningNumbersRest();
    }
};

/**
 * get numbers sequentially. Really ugly code :-)
 * runs forever, until global flag is set to false
 */

var produceNumbersLoop = false;

/*const giveWinningNumbersRestLoop = async () => {
    while (produceNumbersLoop == true)
    {
        await setTimeout(() => {
            giveWinningNumbersRest();
        }, 500);
        
    }
};*/

const startNumbersLoop = async () => {
    produceNumbersLoop = true;

    while (produceNumbersLoop == true)
    {
        await new Promise(resolve => setTimeout(resolve, 250));
        giveWinningNumbersRest();
        getHostName();
        
    }
};
   


const stopNumbersLoop = () => {
    produceNumbersLoop = false;
};