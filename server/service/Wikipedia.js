var wikipedia = require("wikipedia-js");
var modler = require("../model/Modeler");
var Card = require('../model/Card').Card;
var location = require("./Location");
var image_finder = require("./ImageFinder");
var RSVP = require("rsvp");
var async = require('async');

var get_person_card = function(title, callback){
	return new RSVP.Promise(function(fulfill, reject) {
		var options = {query: title, format: "html", summaryOnly: true};
		wikipedia.searchArticle(options, function(err, wiki_text){
		    if(err){
		      console.log("An error occurred[query=%s, error=%s]", query, err);
		      reject()
		    }
		    image_finder.get_image(title, function(img_url){
				fulfill([wiki_text, title, img_url])
		    })
	    })
	});
}

var get_location_card = function(title, callback){
	return new RSVP.Promise(function(fulfill, reject) {
		var options = {query: title, format: "html", summaryOnly: true};
		wikipedia.searchArticle(options, function(err, wiki_text){
		    if(err){
		      console.log("An error occurred[query=%s, error=%s]", query, err);
		      reject()
		    }
		    location.get_map_image(title, function(img_url){
				fulfill([wiki_text, title, img_url])
		    })
	    })
	});
}

var get_organization_card = function(title){
	return new RSVP.Promise(function(fulfill, reject) {
		if(title == "SSH")
			reject()
		else{
			var options = {query: title, format: "html", summaryOnly: true};
			wikipedia.searchArticle(options, function(err, wiki_text){
			    if(err){
			      console.log("An error occurred[query=%s, error=%s]", query, err);
			      reject()
			    }
			    image_finder.get_image(title, function(img_url){
					fulfill([wiki_text, title, img_url])
			    })
		    })
		}
	});
};

this.get_entity_cards = function(entities, callback){
	result = [];
	var promises = [];
	if(entities["ORGANIZATION"] != undefined)
		new Set(entities["ORGANIZATION"])
			.forEach(function(val){
				promises.push(get_organization_card(val))
			});
	if(entities["PERSON"] != undefined)
		new Set(entities["PERSON"])
			.forEach(function(val){
				promises.push(get_person_card(val))
			});
	if(entities["LOCATION"] != undefined)
		new Set(entities["LOCATION"])
			.forEach(function(val){
				promises.push(get_location_card(val))
			});
	RSVP.all(promises)
		.then(function(cards) {
			cards.forEach(function(card){
				var no_html = card[0].replace(/<(?:.|\n)*?>/gm, '')	;
				var cardEle = Card();
				cardEle.addSubtitle(no_html, card[1], '#fbfbfb');
				cardEle.addImage(card[2]);
				cardEle.addColor("#565656"); // some shade of red
				result.push({ card: cardEle.elements });
			});
			callback(result)
		})
};