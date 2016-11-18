var express = require('express'),
    bodyParser = require('body-parser'),
    fibrous = require('fibrous'),
    entity_recognizer = require('./utility/EntityRecognizer'),
    wikipedia_service = require('./service/Wikipedia');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fibrous.middleware);


app.post('/api', function(req, res) {
    console.log(req.body);
});

app.post('/analyse_txt', function(req, res) {
	console.log(req.body.text);
	entity_recognizer.get_entities(req.body.text, function(entities){
		wikipedia_service.get_entity_cards(entities, function(entity_cards){
			console.log("MADE")
			res.send(entity_cards)
		})
	})
});


app.listen(port, function () {
    console.log('Server listening on port ' + port + '!');
});