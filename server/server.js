var express = require('express'),
    bodyParser = require('body-parser'),
    fibrous = require('fibrous'),
    entity_recognizer = require('./utility/EntityRecognizer'),
    grapher = require('./utility/Grapher'),
    wikipedia_service = require('./service/Wikipedia');
    linkService = require('./service/LinkService');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fibrous.middleware);

app.get('/analyse_links', (req, res) => {
    var card = linkService.runService(req.query.link);
    res.json({
        card: card
    });
});

app.post('/analyse_table', function(req, res) {
	console.log(req.body.data);
	grapher.get_plot(req.body.data, function(parsed){
		res.json({
			card: parsed.toJson()
		})
	})
});

app.post('/analyse_txt', function(req, res) {
	console.log(req.body.text);
	entity_recognizer.get_entities(req.body.text, function(entities){
		wikipedia_service.get_entity_cards(entities, function(entity_cards){
			console.log("MADE");
			res.json({
				card: entity_cards.toJson()
			})
		})
	})
});


app.listen(port, function () {
    console.log('Server listening on port ' + port + '!');
});