const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

console.log('MongoDB connected')

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  forks_count: Number,
  login: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (reposFromGH, callback) => {
  let currentIDs = {};

  let login = reposFromGH[0].owner.login;
  Repo.find({login: login}).exec()
    .then(reposInMongo => {
      reposInMongo.forEach( repo => {
        currentIDs[repo.id] = repo.forks_count;
      });

      let reposToAdd = reposFromGH.filter( repo => {
        return !currentIDs.hasOwnProperty(repo.id)
      }).map( repo => {
          return {
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            forks_count: repo.forks_count,
            login: repo.owner.login
          }
        });

      return Repo.insertMany(reposToAdd);
    })
    .then( mongooseRepos => {
      return Repo.find( {login: login} ).exec();
    }).then( allUserRepos => {
      callback(allUserRepos);
    });
};

let findTop25 = (callback) => {

  Repo.find().exec()
    .then(repos => {
      repos.sort((a, b) => { 
        return b.forks_count - a.forks_count; 
      });

      let moreThan25 = repos.length > 25;

      if (moreThan25) {
        let top25 = [];
        for (var i = 0; i < 25; i++) {
          top25.push(repos[i]);
        }
        callback(top25);
      } else {
        callback(repos);
      }
    });
};

module.exports.save = save;
module.exports.findTop25 = findTop25;
