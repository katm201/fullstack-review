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

// repoSchema.methods.findAllByLogin = function(callback) {
//   return this.model('Repo').find({login: this.login}, callback);
// };

let save = (reposFromGH) => {
  // create an object that we can add the current ids in our DB to
  let currentIDs = {};

  let login = reposFromGH[0].owner.login;
  Repo.find({login: login}).exec()
    .then(reposInMongo => {
      // save the current IDs as the property
      // save the current forks as the value, as that's the 
      // value we'd be updating
      
      reposInMongo.forEach( repo => {
        currentIDs[repo.id] = repo.forks_count;
      });

      // filter out repos from GH that currently exist in our DB
      // then format our inputs for Mongo
      let reposToAdd = reposFromGH.filter( repo => {
        return !currentIDs.hasOwnProperty(repo.id))
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
      // 
      // filter for repos from GH that exist, but need to be updated
      // let reposToUpdate = reposFromGH.filter( repo => {
      //   return currentIDs.hasOwnProperty(repo.id) && currentIDs[repo.id] !== repo.forks_count;
      // })
    })

  // save whatever is new with correct formatting
};

module.exports.save = save;