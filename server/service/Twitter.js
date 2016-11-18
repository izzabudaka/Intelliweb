var request = require('request'),
    dom = require('jsdom'),
    fibrous = require('fibrous'),
    htmlToText = require('textversionjs'),
    Card = require('../model/Card').Card;

exports.getUser = (url) => _getUser.sync(url);
exports.getTweet = (url) => _getTweet.sync(url);

function _getUser(url, callback) {
    request(url, (error, response, body) => {
        var doc =  dom.jsdom(body);

        try {
            var title = doc.querySelector('h1 a').innerHTML.trim();
            var subTitle = doc.querySelector('.ProfileHeaderCard-bio').innerHTML;
            var image = doc.querySelector('.ProfileAvatar-image ').src;

            var card = Card();
            card.addTitle(title);
            card.addSubtitle(subTitle);
            card.addImage(image);
            card.addButton(url, 'View profile');
            card.addColor("#1da1f2");
            callback(null, card.elements);
        }
        catch (e) {
            console.log(e)
            callback(null, []);
        }
    });
}

function _getTweet(url, callback) {
    request(url, (error, response, body) => {
        var doc =  dom.jsdom(body);

        var title = doc.querySelector('h1 a').innerHTML.trim();
        var subTitle = htmlToText(doc.querySelector('.TweetTextSize').innerHTML, {
            linkProcess: function(href, linkText){
                return linkText;
            }
        }).trim();
        var image = doc.querySelector('.ProfileAvatar-image ').src;

        var card = Card();
        card.addTitle(title);
        card.addSubtitle(subTitle);
        card.addImage(image);
        card.addButton(url, 'View tweet');
        card.addColor("#1da1f2");
        callback(null, card.elements);
    });
}