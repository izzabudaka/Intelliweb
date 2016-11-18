// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = require('jQuery');

// var CardBar = require("./CardBar.js");
// console.log(CardBar);

let webview  = document.getElementById("webview");
console.log(webview);

var ReactDOM = require("react-dom");
var React = require("react");

webview.addEventListener('did-start-loading', function() {
let scrollCode = "const {ipcRenderer} = require('electron');"+
"window.onscroll = function(){ " +
  "ipcRenderer.sendToHost('pong')" +
"}";
console.log(JSON.parse(JSON.stringify(webview)));
var sideBar;
webview.addEventListener('ipc-message', (event) => {

        if(event.channel === "get_links"){
            console.log(event.args[0]);
        }
        if(event.channel === "page_height"){
            let inner = React.createElement(window.CardBar, {height:event.args[0],loaded:function(v){sideBar = v},onURLClicked:(url)=>webview.src=url});
            ReactDOM.render(inner,document.getElementById("rail"));
        }
        if(event.channel === "scrolling"){
            if(sideBar != undefined){
                sideBar.updateScrollPosition(event.args[0]);
            }
        }
    });
    // webview.openDevTools();
    // webview.executeJavaScript(scrollCode,false,function(){console.log("code OK")});


webview.addEventListener("will-navigate",function(url){
    console.log(url.url);
    ReactDOM.render(React.createElement(window.Navigator,{url:url.url}),document.getElementById("navigator"));
});


});

$(document).ready(function(){
        ReactDOM.render(React.createElement(window.Navigator,{url:webview.src}),document.getElementById("navigator"));      
});