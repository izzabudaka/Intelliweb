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
var request = require('request');


webview.addEventListener('did-start-loading', function() {
let scrollCode = "const {ipcRenderer} = require('electron');"+
"window.onscroll = function(){ " +
  "ipcRenderer.sendToHost('pong')" +
"}";
console.log(JSON.parse(JSON.stringify(webview)));
var sideBar;
var pageHeight;
webview.addEventListener('ipc-message', (event) => {

        var buckets = {};
        if(event.channel === "get_links"){
            var requestLeft = event.args[0].length;
            event.args[0].forEach(function(linkBundle){
                    request("http://127.0.0.1:3000/analyse_links?link=" + linkBundle.link, function(error, response, body){
                                    if(!error && response.statusCode==200){
                                        requestLeft--;
                                        let json = JSON.parse(response.body);
                                        let card = json["card"];
                                        if(card != undefined && card.filter((x)=>x == undefined).length == 0) {
                                            
                                            let bucket = Math.floor(linkBundle.posY / 250);
                                            if(buckets[bucket] == undefined){
                                                buckets[bucket] = [card];
                                            }
                                            else {
                                                buckets[bucket].push(card);
                                            }
                                            if(requestLeft==0){
                                                console.log("bucket-on");
                                                console.log(buckets);
                                                console.log("bucket-off");
                                                let inner = React.createElement(window.CardBar, {
                                                    height:pageHeight,
                                                    loaded:function(v){sideBar = v},
                                                    onURLClicked:(url)=>webview.src=url,
                                                    buckets:buckets});
                                                ReactDOM.render(inner,document.getElementById("rail"));
                                            }
                                        }    
                    }
                    });
            });
            
        }
        //post
        //body -> {text:""}
        //card
        if(event.channel === "get_paragraphs"){
            var requestLeft = event.args[0].length;
            event.args[0].forEach(function(linkBundle){
                request({
                    url:"http://127.0.0.1:3000/analyse_txt",
                    method:"POST",
                    json:true,
                    body:{text:linkBundle.paragraph}
                }, function(err, response, body){
                    console.log("got paragraph data");
                    requestLeft--;
                    let json = response.body;
                    console.log(response.body);
                    let cards = json["card"];
                    cards.forEach(card=>{
                        card = card["card"];
                        if(card != undefined) {
                            let bucket = Math.floor(linkBundle.posY / 250);
                            if(buckets[bucket] == undefined){
                                buckets[bucket] = [card];
                            }
                            else{
                                buckets[bucket].push(card);
                            }
                            
                            if(requestLeft==0){
                                let inner = React.createElement(window.CardBar, {
                                    height:pageHeight,
                                    loaded:function(v){sideBar = v},
                                    onURLClicked:(url)=>webview.src=url,
                                    buckets:buckets});
                                ReactDOM.render(inner,document.getElementById("rail"));
                            }
                        }
                        });
                    
                });
                     
                    
                
            });
        }
        // if(event.channel === "get_images"){
        //     console.log(event.args[0]);       
        //     request('', function(error, response, body){
        //         if(!error && response.statusCode==200){
        //             console.log(body);
        //         }
        //     });
        // }
        // if(event.channel === "get_titles"){
        //     //console.log(event.args[0]);
        //     var requestLeft = event.args[0].length;
        //     request('http://72dbcb84.ngrok.io/analyse_text?link='+event.args[0], function(error, response, body){
        //         if(!error && response.statusCode==200){
        //             console.log(body);
        //             requestLeft--;

        //             if(requestLeft==0){
        //                 process.nextTick();
        //             }

        //         }
        //     });
        // }
        if(event.channel === "page_height"){
            console.log(event.args[0])
            pageHeight = event.args[0];
            // let inner = React.createElement(window.CardBar, {height:event.args[0],loaded:function(v){sideBar = v},onURLClicked:(url)=>webview.src=url});
            // ReactDOM.render(inner,document.getElementById("rail"));
        }
        if(event.channel === "scrolling"){
            if(sideBar != undefined){
                sideBar.updateScrollPosition(event.args[0]);
            }
        }
    });
    // webview.openDevTools();
    // webview.executeJavaScript(scrollCode,false,function(){console.log("code OK")});

function openStash() {
    console.log("open it");
}

webview.addEventListener("will-navigate",function(url){
    console.log(url.url);
    ReactDOM.render(React.createElement(window.Navigator,{url:url.url,openStash:
function openStash() {
    console.log("open it");
}}),document.getElementById("navigator"));
});


});

$(document).ready(function(){
        ReactDOM.render(React.createElement(window.Navigator,{
            url:webview.src,
            openStash:
                function openStash() {
                    ReactDOM.render(React.createElement(window.Stash,{}),document.getElementById("stash"));
                    webview.style = "visibility:hidden;";
                    $("#stash").css("visibility","visible");
                }
    }),document.getElementById("navigator"));      
});