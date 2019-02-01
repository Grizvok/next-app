import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class DeleteConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <span className="confirm-delete-text">Are you sure?</span>
        <a
          className="ticket-actions"
          href="javascript:void(0)"
          onClick={() => this.props.handleTicketDelete(this.props.ticketID)}
        >
          Yes
        </a>{' '}
        /{' '}
        <a
          className="ticket-actions"
          href="javascript:void(0)"
          onClick={() => this.props.handleDeleteAbort()}
        >
          No
        </a>
      </React.Fragment>
    );
  }
}

export default DeleteConfirmationButton;
