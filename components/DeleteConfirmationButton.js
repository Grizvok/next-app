import React from 'react';
import { Subscribe } from 'unstated';

import { userStore } from '../Containers/UserContainer';

class DeleteConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <React.Fragment>
            <span className="confirm-delete-text">Are you sure?</span>
            <a
              className="ticket-actions"
              href="javascript:void(0)"
              onClick={() => userstore.handleTicketDelete(this.props.ticketID)}
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
