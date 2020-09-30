const http = require('http');
const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
var restRouter = express.Router();

app.use(express.json());
app.use(express.static("express"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));



var counter = 0; // ugly simple counter
var drawnNumbers = []; // ugly keep track of drawn numbers

/**
 * bare minimum RESTful handler exposing operating system info using rest
 * using this to expose the hostname for exercise 06
 */


restRouter.get('/info', (req, res) => {
    var info = {};
    info.hostname = os.hostname + '';
    info.numRequests = ++counter;
    info.values = drawnNumbers;
    res.send(info);
});

restRouter.get('/draw', (req, res) => {
    var numbers = {};
    var generatedNumbers = new Array(5);
    counter++; // increment request counter
    
    for (i = 0; i < generatedNumbers.length; i++) {
        var number = Math.ceil(Math.random(0, 1) * 69);
        generatedNumbers[i] = number;
        drawnNumbers.push(number)
    }
    numbers.numbers = generatedNumbers;
    numbers.powerball = Math.ceil(Math.random(0, 1) * 69);
    res.send(numbers);
});

app.use('/rest', restRouter);

// default URL for website
app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});
const server = http.createServer(app);
const port = 8017;
server.listen(port);
console.debug('Server listening on port ' + port);
