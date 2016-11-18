const ImagesClient = require('google-images');

let client = new ImagesClient('013050441357216548743:vc_qq83pkea', 'AIzaSyAPGO_O7wsbupOtL6i1mEOGxfjhueuU5M4');

this.get_image = function(title, callback){
	client.search(title)
    .then(function (images) {
    	callback(images[0].url)
        /*
        [{
            "url": "http://steveangello.com/boss.jpg",
            "type": "image/jpeg",
            "width": 1024,
            "height": 768,
            "size": 102451,
            "thumbnail": {
                "url": "http://steveangello.com/thumbnail.jpg",
                "width": 512,
                "height": 512
            }
        }]
         */
    });
}
