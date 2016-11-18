const ImagesClient = require('google-images');

var client = new ImagesClient('013050441357216548743:vc_qq83pkea', 'AIzaSyCdXimkwNFZgVICv2awOhK8Tvk5e7BqNiM');

this.get_image = function(title, callback){
	callback("https://pbs.twimg.com/media/CuQJh6tWgAEexHR.jpg")
    /*
    client.search(title)
    .then(function (images) {
    	callback(images[0].url)
        });
        */
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
}
