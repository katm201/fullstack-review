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

repoSchema.methods.findAllByLogin = function(callback) {
  return this.model('Repo').find({login: this.login}, callback);
};

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

};

module.exports.save = save;