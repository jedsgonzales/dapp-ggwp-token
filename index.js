const express = require('express');
const path = require('path');
var proxy = require('express-http-proxy');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/ball', (req,res) => {
    var list = [0, 0];
    var index = (Math.random() * 10) > 5 ? 1: 0;
    var prize = Math.ceil(Math.random() * 100);

    list[index] = prize;

    res.json(list);
    console.log('Sent picks!');
});

// Handles any requests that don't match the ones above
/* app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
}); */

app.use('/', proxy('http://localhost:8000'));

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);