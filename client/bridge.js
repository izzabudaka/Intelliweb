const {ipcRenderer} = require('electron');
window.onscroll = function() {
      ipcRenderer.sendToHost('scrolling',window.scrollY);
};

let $ = require("jQuery");
