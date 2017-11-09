import React from 'react';

const RepoListItem = (props) => (
  <div>
    <div>{props.repo.login}'s <a href={props.repo.url}>{props.repo.name}</a></div>
  </div>
)

const RepoList = (props) => (
  <div>
    <h4>There are {props.repos.length} repos:</h4>
    {props.repos.map( (repo, key) => { return <RepoListItem repo={repo} key={key} /> })}
  </div>
)

export default RepoList;