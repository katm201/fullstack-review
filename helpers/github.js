const rp = require('request-promises');
const config = require('../config.js');

const TOKEN = process.env.TOKEN || config.TOKEN;

let getReposByUsername = (username, callback) => {
  let options = {
    uri: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request-promise',
      'Authorization': `token ${TOKEN}`
    },
    type: 'owner',
  };

  rp(options)
    .then(function(data) {
      let repos = JSON.parse(data.body);
      callback(repos);
    })
    .catch(function(err) {
      console.log(err);
    });
}

module.exports.getReposByUsername = getReposByUsername;