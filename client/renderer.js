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
            //console.log(event.args[0]);
            var requestLeft = event.args[0].length;
            var request = require('request');
            request("http://72dbcb84.ngrok.io/analyse_links?link="+event.args[0], function(error, response, body){
                if(!error && response.statusCode==200){
                    console.log(body);
                    requestLeft--;
                    
                    if(requestLeft==0){
                        process.nextTick();
                    }
                }
            });
        }
        if(event.channel === "get_paragraphs"){
            //console.log(event.args[0]);
            var requestLeft = event.args[0].length;
            var request = require('request');
            request('http://72dbcb84.ngrok.io/analyse_text?link='+event.args[0], function(error, response, body){
                if(!error && response.statusCode==200){
                    console.log(body);
                    requestLeft--;

                    if(requestLeft==0){
                        process.nextTick();
                    }
                }
            });
        }
        if(event.channel === "get_images"){
            console.log(event.args[0]);       
            var request = require('request');
            request('', function(error, response, body){
                if(!error && response.statusCode==200){
                    console.log(body);
                }
            });
        }
        if(event.channel === "get_titles"){
            //console.log(event.args[0]);
            var requestLeft = event.args[0].length;
            var request = require('request');
            request('http://72dbcb84.ngrok.io/analyse_text?link='+event.args[0], function(error, response, body){
                if(!error && response.statusCode==200){
                    console.log(body);
                    requestLeft--;

                    if(requestLeft==0){
                        process.nextTick();
                    }

                }
            });
        }
        if(event.channel === "page_height"){
            let inner = React.createElement(window.CardBar, {height:event.args[0],loaded:function(v){sideBar = v}});
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
});


$(document).ready(function(){
                
});