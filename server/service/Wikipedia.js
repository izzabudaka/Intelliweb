var wikipedia = require("wikipedia-js");
var modler = require("../model/Modeler");
var Card = require('../model/Card').Card;
var location = require("./Location");
var image_finder = require("./ImageFinder");

var async = require('async');

var get_person_card = function(title, callback){
	var options = {query: title, format: "html", summaryOnly: true};
	wikipedia.searchArticle(options, function(err, wiki_text){
	    if(err){
	      console.log("An error occurred[query=%s, error=%s]", query, err);
	      return;
	    }
	    image_finder.get_image(title, function(img_url){
			callback(wiki_text, title, img_url)
	    })
    })
}

var get_location_card = function(title, callback){
	var options = {query: title, format: "html", summaryOnly: true};
	wikipedia.searchArticle(options, function(err, wiki_text){
	    if(err){
	      console.log("An error occurred[query=%s, error=%s]", query, err);
	      return;
	    }
	    location.get_map_image(title, function(img_url){
			callback(wiki_text, title, img_url)
	    })
    })
}

var get_organization_card = function(title, callback){
	var options = {query: title, format: "html", summaryOnly: true};
	console.log(options)
	wikipedia.searchArticle(options, function(err, wiki_text){
	    if(err){
	      console.log("An error occurred[query=%s, error=%s]", query, err);
	      return;
	    }
	    image_finder.get_image(title, function(img_url){
			callback(wiki_text, title, img_url)
	    })
    })
}

this.get_entity_cards = function(entities, callback){
	result = []
	var processed = 0
	var last_processed = processed
	var size = 0
	var keys = Object.keys(entities)
	async.forEach(keys, function(key){
		size += entities[key].length
	})

	var addToResult = function(card, title, img_url){
		var no_html = card.replace(/<(?:.|\n)*?>/gm, '')
		//result.push(modler.get_title_sub(title, no_html))
		var cardEle = Card();
		cardEle.addTitle(title);
		cardEle.addSubtitle(no_html);
		cardEle.addImage(img_url);
		result.push({ card: cardEle.elements });

		last_processed = processed
		processed++
		if(processed == size)
			callback(result)
	}
	
	if(entities["ORGANIZATION"] != undefined){
		entities["ORGANIZATION"] = new Set(entities["ORGANIZATION"])
		async.forEach(entities["ORGANIZATION"], function(val){
			console.log(val)
			get_organization_card(val, addToResult)			
		})
	}

	if(entities["PERSON"] != undefined){
		entities["PERSON"] = new Set(entities["PERSON"])
		async.forEach(entities["PERSON"], function(val){
			console.log(val)
			get_person_card(val, addToResult)			
		})
	}

	if(entities["LOCATION"] != undefined){
		entities["LOCATION"] = new Set(entities["LOCATION"])
		async.forEach(entities["LOCATION"], function(val){
			console.log(val)
			get_location_card(val, addToResult)			
		})
	}

	setTimeout(function(){
		callback(result)
	}, 5*1000);
}