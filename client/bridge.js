const {ipcRenderer} = require('electron');
window.onscroll = function() {
      ipcRenderer.sendToHost('scrolling',window.scrollY);
};



window.onload = function() {var list = Array.prototype.slice.call(document.getElementsByTagName('a'),0); 

      var obj = list.filter(function(reference){ return reference.href.length!=0 && (reference.getBoundingClientRect().top!=0 && reference.getBoundingClientRect().left!=0);})
      .map(function(reference){
      
            return {
                  link: reference.href,
                  posX: reference.getBoundingClientRect().left,
                  posY: reference.getBoundingClientRect().top
            };
      
      });
      ipcRenderer.sendToHost('get_links', obj);
      console.log(obj);
};
