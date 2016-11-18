var GitHubApi = require('github'),
    fibrous = require('fibrous');

var github = new GitHubApi();
github.authenticate({
    type: 'token',
    token: process.env.GithubToken
});

exports.getUser = username => _getUser.sync(username);
exports.getRepo = (owner, repoName) => _getRepo.sync(owner, repoName);

var _getUser = (username, callback) => {
    github.users.getForUser({
        username: username
    }, function(err, res) {
        callback(null, res);
    });
};

var _getRepo = (owner, repoName, callback) => {
    github.repos.get({
        owner: owner,
        repo: repoName
    }, (err, res) => {
        if (err) console.log(err);
         callback(null, res);
    });
};