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
        if (err) {
            callback(null, []);
            return;
        }

        var card = Card();
        card.addTitle("Github User: " + res.name, '#fbfbfb');
        card.addSubtitle(res.login, 'Username', '#fbfbfb');
        card.addIcon(res.avatar_url);
        card.addButton(res.html_url, 'View Profile', '#fbfbfb', '#222');
        card.addColor("#208bc9");
        callback(null, card.elements);
    });
};

var _getRepo = (owner, repoName, callback) => {
    github.repos.get({
        owner: owner,
        repo: repoName
    }, (err, res) => {
        if (err) {
            callback(null, []);
            return;
        }

        var card = Card();
        card.addTitle("Github Repo: " + res.name, '#fbfbfb');
        card.addSubtitle(res.owner.login, 'Username', '#fbfbfb');
        card.addSubtitle(res.owner.description, 'Description', '#fbfbfb');
        card.addSubtitle(res.stargazers_count, 'Stars', '#fbfbfb');
        card.addSubtitle(res.watchers_count, 'Watchers', '#fbfbfb');
        card.addSubtitle(res.forks, 'Forks', '#fbfbfb');
        card.addButton(res.html_url, 'View Repo', '#fbfbfb', '#222');
        card.addColor("#208bc9");
        callback(null, card.elements);
    });
};