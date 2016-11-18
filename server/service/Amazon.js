var request = require('request'),
    dom = require('jsdom'),
    fibrous = require('fibrous'),
    htmlToText = require('textversionjs');

exports.getProduct = (url) => _getProduct.sync(url);

function _getProduct(url, callback) {
    request(url, (error, response, body) => {
        var doc =  dom.jsdom(body);

        var title = doc.querySelector('#productTitle').innerHTML.trim();
        var price = doc.querySelector('#priceblock_ourprice').innerHTML;
        var image = doc.querySelector('#landingImage').src;

        var descriptionEle = doc.querySelector('#feature-bullets .technicalData');
        var description = '';
        if (descriptionEle) {
            description = htmlToText(descriptionEle.innerHTML).replace(/\n---/g, ', ');
        }

        callback(null, {
            title: title,
            price: price,
            image: image,
            description: description,
            url: url
        });
    });
}
