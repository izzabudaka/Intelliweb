var github = require('./Github'),
    amazon = require('./Amazon'),
    medium = require('./Medium'),
    stackOverflow = require('./StackOverflow'),
    twitter = require('./Twitter');

var services = [];

var register = (regex, func) => {
    services.push({
        regex: regex,
        func: func
    });
};

exports.runService = (url) => {
    for (var ser of services) {
        if (url.match(ser.regex)) {
            return ser.func(url);
        }
    }
};

register(/github\.com\/([A-Za-z0-9]+)\/*(.*)/, (url) => {
    var matches = url.match(/github\.com\/([A-Za-z0-9]+)\/*(.*)/);
    if (matches[2] == '') {
        return github.getUser(matches[1]);
    }
    else {
        return github.getRepo(matches[1], matches[2]);
    }
});

register(/amazon.co.uk|amazon.com/, (url) => {
    return amazon.getProduct(url);
});

register(/medium.com\/@.*\/.+/, (url) => {
    return medium.getPost(url);
});

register(/stackoverflow.com\/questions\/\d+/, (url) => {
    return stackOverflow.getAnswer(url);
});

register(/twitter.com\/(.+)/, (url) => {
    var matches = url.match(/twitter.com\/(.+)/);
    var path = matches[1];
    
    if ((path.match(/\//g) || []).length >= 2) {
        return twitter.getTweet(url);
    } else {
        return twitter.getUser(url);
    }
});