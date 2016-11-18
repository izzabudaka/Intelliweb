var GitHubApi = require('github'),
    fibrous = require('fibrous'),
    Card = require('../model/Card').Card;

var github = new GitHubApi();
if (process.env.GithubToken) {
    github.authenticate({
        type: 'token',
        token: process.env.GithubToken
    });
}

exports.getUser = username => _getUser.sync(username);
exports.getRepo = (owner, repoName) => _getRepo.sync(owner, repoName);

var _getUser = (username, callback) => {
    github.users.getForUser({
        username: username
    }, function(err, res) {
        var card = Card();
        card.addTitle(res.login);
        card.addSubtitle(res.name);
        card.addImage(res.avatar_url);
        card.addButton(res.html_url, 'View Profile');

        callback(null, card.elements);
    });
};

var _getRepo = (owner, repoName, callback) => {
    github.repos.get({
        owner: owner,
        repo: repoName
    }, (err, res) => {
        if (err) console.log(err);

        var card = Card();
        card.addTitle(res.name);
        card.addSubtitle(res.owner.login);
        card.addSubtitle(res.owner.description);
        card.addButton(res.html_url, 'View Repo');

        callback(null, card.elements);
    });
};