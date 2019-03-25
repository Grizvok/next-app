import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Subscribe } from 'unstated';

import UserContainer from '../Containers/UserContainer';

class DeleteConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <React.Fragment>
            <span className="confirm-delete-text">Are you sure?</span>
            <a
              className="ticket-actions"
              href="javascript:void(0)"
              onClick={() =>
                usercontainer.handleTicketDelete(this.props.ticketID)
              }
            >
              Yes
            </a>{' '}
            /{' '}
            <a
              className="ticket-actions confirm-ticket-delete"
              href="javascript:void(0)"
              onClick={() => this.props.handleDeleteAbort()}
            >
              No
            </a>
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

export default DeleteConfirmationButton;
