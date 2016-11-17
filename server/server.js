var express = require('express'),
    bodyParser = require('body-parser'),
    fibrous = require('fibrous');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fibrous.middleware);


app.post('/api', function(req, res) {
    console.log(req.body);
});

app.listen(port, function () {
    console.log('Server listening on port ' + port + '!');
});