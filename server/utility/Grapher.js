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
  var card = Card();
  card.addGraph(result);
  card.addColor('#ffcc00');
  callback(card)
}

this.plot_radar2 = function(html, callback){
  try{
    var result = { datasets: [], labels: [] }
    html = html.replace("<tr>","").replace("<table>", "").replace("/<table>", "")
      .split("</tr>")
    for(var i = 0; i < html.length; i++){
      var current = html[i].replace("<td>", "").split("</td>")
      if(i == 0){
        current.slice(1,current.length).forEach(function(val){
          result["datasets"].push({label: val.replace("<td>", ""), data: [] })
        })
      } else{
        current[0] = current[0].replace("<tr>", "").trim()
        result.labels.push(current[0])
        for(var j = 1; j < current.length; j++){
          result["datasets"][j-1]["data"].push(current[j].replace("<td>", "").trim())
        }
      }
    }
    var card = Card();

    card.addTitle("Graph: Figure 1");
    card.addGraph(result);
    callback(card)
  } catch(e){
    callback(Card())
  }
}

this.plot_radar = function(html, callback){
  var $ = cheerio.load(html);
  result = {}
  points = {}
  result["labels"] = []

  $('tr').each(function() {
    console.log($(this)[0].children.data)
    var title = $(this)[0].next.data
    console.log(title)
    if(title != ' '){
      console.log(data)
      result["labels"].push(title)
      points[title] = []
      for(var i = 1; i < 4; i++){
        var data = $(this)[0].children[i]
        for(var j = 0; j < i; j++)
          data = data.next
        point.push(data.children[0].data)
      }
    }
    else{
      result["datasets"] = []
      for(var i = 1; i < 4; i++){
        var data = $(this)[0].children[i]
        for(var j = 0; j < i; j++)
          data = data.next
        console.log(data.next.children[0].data)
        result["datasets"].push({ label: data.next.children[0].data })
      }
    }
  })
  Object.keys(points).forEach(function(key){
    for(var i = 0; i < points[key].length; i++){
      if("data" in data["datasets"][i])
        data["datasets"][i]["data"].push(points[key][i])
      else{
        data["datasets"][i]["data"] = [points[key][i]]
      }
    }
  })

  var card = Card()
  card.addGraph(data)
  callback(card)
}