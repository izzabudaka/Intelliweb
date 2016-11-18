var request = require('request'),
    dom = require('jsdom'),
    fibrous = require('fibrous'),
    htmlToText = require('textversionjs'),
    Card = require('../model/Card').Card;

exports.getAnswer = (url) => _getAnswer.sync(url);

function _getAnswer(url, callback) {
    request(url, (error, response, body) => {
        var doc =  dom.jsdom(body);

        try {
            var title = htmlToText(doc.querySelector('h1').innerHTML, {
                linkProcess: function(href, linkText){
                    return linkText;
                }
            }).trim();

            var answerEle = doc.querySelector('#answers .answer .post-text');
            var answer = 'No answers yet';
            if (answerEle) {
                answer = htmlToText(answerEle.innerHTML).trim();
            }

            var card = Card();
            card.addTitle(title, '#fbfbfb');
            card.addSubtitle(answer, 'Answer', '#fbfbfb');
            card.addButton(url, 'View question', '#fbfbfb', '#222');
            card.addColor("#f75200"); // light green
            callback(null, card.elements);
        }
        catch (e) {
            console.log(e)
            callback(null, []);
        }
    });
}
