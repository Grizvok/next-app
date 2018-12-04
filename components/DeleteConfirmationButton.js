import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class DeleteConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div className="confirm-delete-button">
        Are you sure?
        <Link>
          <a onClick={() => this.props.handleTicketDelete(this.props.ticketID)}>
            {' '}
            Yes{' '}
          </a>
        </Link>{' '}
        /{' '}
        <Link>
          <a onClick={() => this.props.handleDeleteAbort()}> No</a>
        </Link>
      </div>
    );
  }
}

export default DeleteConfirmationButton;
