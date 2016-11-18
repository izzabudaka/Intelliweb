const {ipcRenderer} = require('electron');
window.onscroll = function() {
      ipcRenderer.sendToHost('scrolling',window.scrollY);
};

window.onload = function() {
      var list_link = Array.prototype.slice.call(document.getElementsByTagName('a'),0); 

      list_link = list_link.filter(function(ref){ return ref.href.length!=0 && (ref.getBoundingClientRect().top!=0 && ref.getBoundingClientRect().left!=0);})
      .map(function(ref){
            return {
                  link: ref.href,
                  posX: ref.getBoundingClientRect().left,
                  posY: ref.getBoundingClientRect().top
            };
      });
      ipcRenderer.sendToHost('get_links', list_link);
      console.log(list_link);

      var list_paragraph = Array.prototype.slice.call(document.getElementsByTagName('p'),0);

      list_paragraph = list_paragraph.map(function(ref){
            return {
                  paragraph: ref.outerText,
                  posX: ref.getBoundingClientRect().left,
                  posY: ref.getBoundingClientRect().top
            };
      });
      ipcRenderer.sendToHost('get_paragraphs', list_paragraph);
      console.log(list_paragraph);

      var list_image = Array.prototype.slice.call(document.getElementsByTagName('img'),0);

      list_image = list_image.map(function(ref){
            return {
                  image: ref.src,
                  posX: ref.getBoundingClientRect().left,
                  posY: ref.getBoundingClientRect().top
            };
      });
      ipcRenderer.sendToHost('get_images', list_image);
      console.log(list_image);

      var list_title = Array.prototype.slice.call(document.getElementsByTagName('h1'),0);

      list_title = list_title.map(function(ref){
            return {
                  title: ref.innerText,
                  posX: ref.getBoundingClientRect().left,
                  posY: ref.getBoundingClientRect().top
            };
      });
      ipcRenderer.sendToHost('get_titles', list_title);
      console.log(list_title);
};
