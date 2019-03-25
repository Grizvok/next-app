import React from 'react';

import SearchResultHeader from './SearchResultHeader';
import UserSearchResults from './UserSearchResults';
import TicketSearchResults from './TicketSearchResults';

export default (props) => (
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      <SearchResultHeader />
      <UserSearchResults
        handleClick={props.handleClick}
        userSearchResults={props.userSearchResults}
      />
      <TicketSearchResults
        handleClick={props.handleClick}
        ticketSearchResults={props.ticketSearchResults}
      />
    </div>
  </div>
);
