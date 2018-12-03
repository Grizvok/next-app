import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class DeleteConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = async (e) => {
    const ticketID = this.props.ticketID;
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/ticket/${ticketID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  render() {
    return (
      <div className="confirm-delete-button">
        Are you sure?
        <Link>
          <a onClick={this.handleDelete}> Yes </a>
        </Link>{' '}
        /{' '}
        <Link>
          <a onClick={this.props.handleClick}> No</a>
        </Link>
        {console.log(this.props.handleClick)}
      </div>
    );
  }
}

export default DeleteConfirmationButton;
