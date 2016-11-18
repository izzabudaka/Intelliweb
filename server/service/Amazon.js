var request = require('request'),
    dom = require('jsdom'),
    fibrous = require('fibrous'),
    htmlToText = require('textversionjs'),
    Card = require('../model/Card').Card;

exports.getProduct = (url) => _getProduct.sync(url);

function _getProduct(url, callback) {
    request(url, (error, response, body) => {
        var doc =  dom.jsdom(body);
        try {
            var title = doc.querySelector('#productTitle').innerHTML.trim();
            var price = doc.querySelector('#priceblock_ourprice').innerHTML;
            var image = doc.querySelector('#landingImage').src;

            var descriptionEle = doc.querySelector('#feature-bullets .technicalData');
            var description = '';
            if (descriptionEle) {
                description = htmlToText(descriptionEle.innerHTML).replace(/\n---/g, ', ');
            }

            var card = Card();
            card.addTitle(title);
            card.addSubtitle(price);
            card.addImage(image);
            card.addButton(url, 'View product');

            callback(null, card.elements);
        }
        catch (e) {
            callback(null, []);
        }
    });
}
