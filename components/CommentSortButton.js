import React from 'react';
import { Subscribe } from 'unstated';
import { userStore } from '../Containers/UserContainer';

export default () => (
  <div className="comment-wrapper-div">
    <div className="select comment-select-div">
      <span className="sort-text">Sort by</span>
      <select className="comment-sorting-select">
        <option>BEST</option>
        <option>TOP</option>
        <option>NEW</option>
      </select>
    </div>
  </div>
);
