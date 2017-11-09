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

module.exports.save = save;