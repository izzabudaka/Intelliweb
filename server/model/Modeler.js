this.get_title = function(text){
	return {"type": 0, "payload": {"title": text}}
}

this.get_title_sub = function(text, subtitle){
	return {"type": 1, "payload": {"title": text, "subtitle": subtitle}}
}

this.get_image = function(url){
	return {"type": 2, "payload": {"url": url}}
}

this.get_url_button = function(url, name){
	return {"type": 3, "payload": {"url": url, "name": name}}
}