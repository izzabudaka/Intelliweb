let webview  = document.getElementById("foo");
webview.addEventListener('did-start-loading', function() {
    console.log(webview);
    webview.executeJavaScript("document.getElementsByTagName('a')[0].offsetLeft", false, function(x) {console.log(x);});
});

$(document).load(function(){
    console.log("OK---");
    console.log();
});

function browser_loaded(){
    console.log("loaded");
}