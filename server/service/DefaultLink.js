var Card = require('../model/Card').Card;
var getPage = require('summarizer').getPage;

var uri = 'http://nodejs.org/api/documentation.html';
 


this.get_default = function(link, callback){
	getPage(link).then(function (data) {
	  var card = Card()
	  card.addTitle(data.title)
	  card.addSubtitle(data.text)
	  return card
	}, console.error);
}