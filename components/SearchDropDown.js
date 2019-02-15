import React from 'react';

import SearchResultHeader from './SearchResultHeader';

export default (props) => (
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      <SearchResultHeader />
      <a className="dropdown-item">Other dropdown item</a>
      <a href="#" className="dropdown-item">
        Active dropdown item
      </a>
      <a href="#" className="dropdown-item">
        Other dropdown item
      </a>
      <a href="#" className="dropdown-item">
        With a divider
      </a>
    </div>
  </div>
);
