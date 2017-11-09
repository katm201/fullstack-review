import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.handleRepoData = this.handleRepoData.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    let options = {
      query: term
    }

    let handleRepos = this.handleRepoData;

    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify(options),
      success: function(data) {
        data = JSON.parse(data);
        console.log(data);
        
        handleRepos(data);
      },
      failure: function(err) {
        console.log(err);
      }
    });
  }

  handleRepoData (data) {
    this.setState({ repos: data });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));