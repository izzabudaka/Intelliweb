var github = require('./Github'),
    amazon = require('./Amazon'),
    medium = require('./Medium'),
    default_link = require('./DefaultLink')
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
    return default_link.get_default(url)
};

register(/github\.com\/([A-Za-z0-9-_]+)\/*(.*)/, (url) => {
    var matches = url.match(/github\.com\/([A-Za-z0-9-_]+)\/*(.*)/);
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

register(/medium.com\/.*\/.+/, (url) => {
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