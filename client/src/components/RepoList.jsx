import React from 'react';

const RepoListItem = (props) => (
  <div>
    <h4> Repo List Item Component </h4>
    <div>
      <ul>
        <li>{props.repo.name}</li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
)

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <RepoListItem repo={props.repos[0]} />
  </div>
)

export default RepoList;