// The lottery expects the player to pick 5 number + a so called powerball which gets generated sperately.
// The generatedNumbers array represents the first 5 numbers.
var client_id=atob('YmVmMzIyMTQtODk4OC00ODlkLWJjY2QtOTdkNTEwYzEwMTkz');
var client_secret=atob('VVlLRzJ2NDc2ckxHNXNRT0J5b002eHVidjg=');
var encodedData = btoa(client_id + ':' + client_secret);

var urlToken = '/oauth2/token';
var urlNumberService = 'https://number-generator-service.kyma.local';
var urlNumbersService = 'https://numbers-generator-service.kyma.local';

function fetchToken(){
    fetch(urlToken, {
        method: 'POST',
        body: 'grant_type=client_credentials&scope=read',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ,
            'client_id': client_id,
            'client_secret': client_secret,
            'Authorization': 'Basic ' + encodedData
        }
    }).then(function (resp) {
        return resp.json();

    }).then(function (data) {
        console.log('token', data.access_token);

        generate(data.access_token);
        generateNumber(data.access_token);

        return data.access_token;

    }).catch(function (err) {
        console.log('something went wrong', err);
    });
}


// This method generates a random number between 1 0 and 69.
// returns a random number.
function generateNumber(bearerToken) {
    fetch(urlNumberService, {
        headers: {
            'Authorization': 'bearer ' + bearerToken,
        }})
        .then(function (response){
            return response.json();
        }).then(function (data){
        console.log(data);
        document.getElementById('pNumberLabel').textContent = 'Powerball: ' + data;
    }).catch(function (err){
        console.warn('Something went wrong.', err);
    })
}

// This method iterates over the generatedNumbers array and fills it with randomly generated numbers through the generateNumber() method.
// returns an array of 5 randomly generated numbers.
function generate(bearerToken) {
    fetch(urlNumbersService, {
        headers: {
            'Authorization': 'bearer ' + bearerToken,
        }})
        .then(function (response){
            return response.json();
        }).then(function (data){
        console.log(data);
        document.getElementById('baseNumbersLabel').textContent = data;
    }).catch(function (err){
        console.warn('Something went wrong.', err);
    })
}

// Calls the genrateNumber() and generate() method.
// returns the first 5 numbers and the so called powerball.
function giveWinningNumbers() {
    fetchToken();
}

function giveWinningNumbersHistory(){
    fetch(urlNumbersService, {
        headers: {
            'Authorization': 'bearer ' + bearerToken,
        }})
        .then(function (response){
            return response.json();
        }).then(function (data){
        console.log(data);
        document.getElementById('baseNumbersLabel').textContent = data;
    }).catch(function (err){
        console.warn('Something went wrong.', err);
    })
}