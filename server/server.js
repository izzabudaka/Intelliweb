var express = require('express'),
    bodyParser = require('body-parser'),
    fibrous = require('fibrous'),
    entity_recognizer = require('./utility/EntityRecognizer'),
    wikipedia_service = require('./service/Wikipedia');
    github = require('./service/Github'),
    amazon = require('./service/Amazon'),
    linkService = require('./service/LinkService');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fibrous.middleware);

app.get('/api/test', (req, res) => {
    var lol = linkService.runService(req.query.link, '{}');
    res.json({
        gh: lol
    });
});

app.get('/api/amazon', (req, res) => {
    amazon.amazon();
    res.json({
        gh: 'lol'
    });
});

app.get('/api/github/person', (req, res) => {
    var gh = github.getUser('Gilbert09');
    res.json({
        gh: gh
    });
});

app.get('/api/github/repo', (req, res) => {
    var gh = github.getRepo('goodeggs', 'fibrous');
    res.json({
        repo: gh
    });
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