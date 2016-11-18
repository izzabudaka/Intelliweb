var cheerio = require("cheerio");
var Card = require('../model/Card').Card;
var COLORS = {
  1: {backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)"},
  2: {backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)"},
  3: {backgroundColor: "rgba(232,179,168,0.2)",
      borderColor: "rgba(255,137,131,1)",
      pointBackgroundColor: "rgba(232,105,92,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)"},
  4: {backgroundColor: "rgba(232,179,168,0.2)",
      borderColor: "rgba(255,137,131,1)",
      pointBackgroundColor: "rgba(232,105,92,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)"}
}

function findEmptyLabel(data) {
  for (var i=0, iLen=data.datasets.length; i<iLen; i++) {
    if (data.datasets[i].label == " "){
      data.datasets.splice(i, 1);
    }
  }
}

var set_color = function(dataset){
  console.log(dataset)
  var current_idx = 1
  dataset.forEach(function(label){
    label["backgroundColor"] = COLORS[current_idx].backgroundColor
    label["borderColor"] = COLORS[current_idx].borderColor
    label["pointBackgroundColor"] = COLORS[current_idx].pointBackgroundColor
    label["pointBorderColor"] = COLORS[current_idx].pointBorderColor
    label["pointHoverBorderColor"] = COLORS[current_idx].pointHoverBorderColor
    label["pointHoverBackgroundColor"] = COLORS[current_idx].pointHoverBackgroundColor
    current_idx++
  })
  console.log(dataset)
}

var clean = function(data){
  var index = data.labels.indexOf('');
  data.labels.splice(index, 1);
  findEmptyLabel(data)
}

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
    if(result.labels.indexOf("Performance") == -1){
      callback(Card())
    } else{
      clean(result)
      var card = Card();
      set_color(result["datasets"])

      card.addTitle("Graph: Figure 1");
      card.addGraph(result);
      card.addColor("#FFE819");
      callback(card)
    }
  } catch(e){
    console.log(e)
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
  card.addColor("#fffff");
  callback(card)
}