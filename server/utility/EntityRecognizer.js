var node_ner = require('node-ner');
var fs = require('fs');
var ner = new node_ner({
	install_path:	'./stanford-ner/'
});

var write_text = function(text, callback){
	fs.writeFile("./test", text, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	    callback()
	}); 
}

this.get_entities = function(web_txt, callback){
	write_text(web_txt, function(){
		ner.fromFile('./test', function(entities) {
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