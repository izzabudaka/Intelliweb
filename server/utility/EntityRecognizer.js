var node_ner = require('node-ner');
var fs = require('fs');
var crypto = require('crypto');
var ner = new node_ner({
	install_path:	'./stanford-ner/'
});

var write_text = function(text, hash, callback){
	fs.writeFile("./test_" + hash, text, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	    callback()
	}); 
}

this.get_entities = function(web_txt, callback){
	var hash = crypto.createHash('md5').update(web_txt).digest('hex');
	write_text(web_txt, hash, function(){
		ner.fromFile('./test_' + hash, function(entities) {
			console.log(entities)
			callback(entities)
		})
	})
		/*
		Output:
		{
			"ORGANIZATION": [
				"Samsung Electronics Co Ltd",
				"Microsoft",
				"Apple"
			],
			"DATE": [
				"Thursday"
			],
			"MONEY": [
				"$ 2 billion"
			]
		}
		*/
}