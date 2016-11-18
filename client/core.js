let webview  = document.getElementById("webview");
webview.addEventListener('did-start-loading', function() {
    console.log(webview);
    webview.executeJavaScript("(function() { var list = Array.prototype.slice.call(document.getElementsByTagName('a'),0); "+

							" return list.filter(function(reference){ return reference.href.length!=0;}).map(function(reference){return reference.href;});})()", false, function(x) {console.log(x);});
});

$(document).load(function(){
    console.log("OK---");
    console.log();
});

function browser_loaded(){
    console.log("loaded");
}