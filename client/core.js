let webview  = document.getElementById("webview");
webview.addEventListener('did-start-loading', function() {
    console.log(webview);
    webview.executeJavaScript("(function() { var coll = document.getElementsByTagName('a');"+
								"var list = Array.prototype.slice.call(coll,0); "+

									"function isLink(reference){"+
										"return reference.href.length != 0;"+
									"}"+

" return list.filter(isLink);})()", false, function(x) {console.log(x);});
});

$(document).load(function(){
    console.log("OK---");
    console.log();
});

function browser_loaded(){
    console.log("loaded");
}