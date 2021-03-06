var request = require('request'),
    dom = require('jsdom'),
    fibrous = require('fibrous'),
    Card = require('../model/Card').Card;

exports.getPost = (url) => _getPost.sync(url);

function _getPost(url, callback) {
    request(url, (error, response, body) => {
        var doc =  dom.jsdom(body);
        try {
            var title = doc.querySelector('h1').innerHTML.trim();
            var subtitle = doc.querySelector('h2').innerHTML;

            var card = Card();
            card.addTitle(title);
            card.addSubtitle(subtitle);
            card.addButton(url, 'View post');
            card.addColor("#00ab6b");
            callback(null, card.elements);
        }
        catch (e) {
            callback(null, []);
        }
    });
}
