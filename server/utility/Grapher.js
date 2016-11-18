var cheerio = require("cheerio");
var Card = require('../model/Card').Card;

var reverse_factorial = function(n){
	if (n == 0 || n == 1){
		return 1
	}
	var start = 2
	while(n > 1) {
		n = n/start
		start++
	}
	return start
}

this.get_plot = function(html, callback) {
  var $ = cheerio.load(html);
  result = {}
  $('tr').each(function() {
  	var title = $(this)[0].children[0].children[0].data
  	values = []

  	for(var i = 1; i < reverse_factorial($(this)[0].children.length-1); i++){
  		var data = $(this)[0].children[i]
  		for(var j = 0; j < i; j++)
  			data = data.next
  		values.push(data.children[0].data)
  	}
  	result[title] = values
  });
  var card = new Card()
  card.addGraph(result)
  callback(card)
}