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
var allCards = [];
webview.addEventListener('ipc-message', (event) => {
        if(event.channel === "get_links"){
            var requestLeft = event.args[0].length;
            
            event.args[0].forEach(function(linkBundle){
                    request("http://127.0.0.1:3000/analyse_links?link=" + linkBundle.link, function(error, response, body){
                            if(!error && response.statusCode==200){
                                let json = JSON.parse(response.body);
                                if(linkBundle.link.indexOf("amazon") != -1) console.log(json);
                                let card = json["card"];
                                if(card != undefined && card.length > 0 && allCards.map(x=>x.filter(y=>y.type==0)[0].payload["text"]).indexOf(card.filter(x=>x.type==0)[0].payload["text"]) == -1) {
                                    allCards.push(card);
                                    let inner = React.createElement(window.CardBar, {
                                            height:pageHeight,
                                            loaded:function(v){sideBar = v},
                                            onURLClicked:(url)=>webview.src=url,
                                            request:request,
                                            cards:allCards});
                                    ReactDOM.render(inner,document.getElementById("rail"));
                                }    
                    }
                    });
            });
            
        }
        //post
        //body -> {text:""}
        //card
        if(event.channel === "get_paragraphs"){
            event.args[0].forEach(function(linkBundle){
                request({
                    url:"http://127.0.0.1:3000/analyse_txt",
                    method:"POST",
                    json:true,
                    body:{text:linkBundle.paragraph}
                }, function(err, response, body){
                    console.log("got paragraph data");
                    if(response == undefined) return;
                    let json = response.body;
                    let cards = json["card"];
                    cards.forEach(card => {
                        card = card["card"];
                        let title = card.filter(x=>x.type == 0)[0]["text"];
                        if(card != undefined && allCards.map(x=>x.filter(y=>y.type==0)[0].payload["text"]).indexOf(card.filter(x=>x.type==0)[0].payload["text"]) == -1) {
                            allCards.push(card);
                                let inner = React.createElement(window.CardBar, {
                                    height:pageHeight,
                                    loaded:function(v){sideBar = v},
                                    onURLClicked:(url)=>webview.src=url,
                                    request:request,
                                    cards:allCards});
                                ReactDOM.render(inner,document.getElementById("rail"));
                        }
                        });
                    
                });
            });
        }
        
        

        if(event.channel === "get_tables"){
            event.args[0].forEach(function(table){
                console.log(table.html);
                request({
                    url:"http://127.0.0.1:3000/analyse_table",
                    method:"POST",
                    json:true,
                    body:{data:table.html}
                }, function(err, response, body){
                    let json = response.body;
                    console.log(json);
                    let card = json["card"];
                    if(card != undefined && card.length > 0 ){//&& allCards.map(x=>x.filter(y=>y.type==0)[0].payload["text"]).indexOf(card.filter(x=>x.type==0)[0].payload["text"]) != -1) {
                        allCards.push(card);
                        let inner = React.createElement(window.CardBar, {
                                height:pageHeight,
                                loaded:function(v){sideBar = v},
                                onURLClicked:(url)=>webview.src=url,
                                request:request,
                                cards:allCards});
                        ReactDOM.render(inner,document.getElementById("rail"));
                    }   
                    
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

        function getCards(){
            //if(stash.getAll()!= undefined)
           Object.keys(localStorage).forEach(key=>console.log(localStorage[key]));
        }

        function saveCard(data){
            localStorage.setItem(data.type, JSON.stringify(data.payload));
        }
    });
    // webview.openDevTools();
    // webview.executeJavaScript(scrollCode,false,function(){console.log("code OK")});

function openStash() {
    console.log("open it");
}

webview.addEventListener("will-navigate",function(url){
    console.log(url.url);
    ReactDOM.render(React.createElement(window.Navigator,{title:webview.getTitle(),url:url.url,openStash:
function openStash() {
    ReactDOM.render(React.createElement(window.Stash,{}),document.getElementById("stash"));
                    webview.style = "visibility:hidden;";
                    $("#stash").css("visibility","visible");
},shouldNavigateTo:function(url){webview.loadURL(url)}}),document.getElementById("navigator"));
});

webview.addEventListener("dom-ready",function(){
    ReactDOM.render(React.createElement(window.Navigator,{shouldNavigateTo:function(url){webview.loadURL(url)},title:webview.getTitle(),url:webview.getURL(),openStash:
    function openStash() {
        ReactDOM.render(React.createElement(window.Stash,{}),document.getElementById("stash"));
                    webview.style = "visibility:hidden;";
                    $("#stash").css("visibility","visible");
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