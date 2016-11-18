var github = require('./Github');

var services = [];

var register = (regex, func) => {
    services.push({
        regex: regex,
        func: func
    });
};

exports.runService = (url, data) => {
    for (var ser of services) {
        if (url.match(ser.regex)) {
            return ser.func(url, data);
        }
    }
};

register(/github\.com\/([A-Za-z0-9]+)\/*(.*)/, (url, data) => {
    var matches = url.match(/github\.com\/([A-Za-z0-9]+)\/*(.*)/);
    if (matches[2] == '') {
        return github.getUser(matches[1]);
    }
    else {
        return github.getRepo(matches[1], matches[2]);
    }
});