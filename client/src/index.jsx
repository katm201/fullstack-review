import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import dummyData from '../../data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: dataFormatter(dummyData)
    }
    this.search = this.search.bind(this);
    this.handleRepoData = this.handleRepoData.bind(this);
    this.request = this.request.bind(this);
  }

  handleRepoData (data) {

    this.setState({ repos: data });
  }

  request (options, requestType) {

    let handleRepos = this.handleRepoData;

    $.ajax({
      type: requestType,
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify(options),
      success: function(data) {
        data = JSON.parse(data);
        console.log('request response')
        console.log(data);
        
        handleRepos(data);
      },
      failure: function(err) {
        console.log(err);
      }
    });

  }

  search (term) {
    console.log(`${term} was searched`);

    let options = {
      query: term
    }

    this.request(options, 'POST');
  }

  componentDidMount () {
    console.log('Initial setup GET request');
    
    let options = {
      query: ''
    }

    this.request(options, 'GET');
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

let dataFormatter = function(data) {
  return data.map( repo => {
    return {
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      login: repo.owner.login,
      forks_count: repo.forks_count
    };
  });
}


ReactDOM.render(<App />, document.getElementById('app'));




