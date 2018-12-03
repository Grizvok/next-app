//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import UserContainer from '../Containers/UserContainer';
import DeleteConfirmationButton from '../components/DeleteConfirmationButton';

class DeleteTicketButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showConfirmation: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
    });
  }

  render() {
    return (
      <div>
        {this.state.showConfirmation ? (
          <DeleteConfirmationButton ticketID={this.props.ticketID} handleClick={this.handleClick}/>
        ) : (
          <button
            onClick={this.handleClick}
            className="is-link is-small button delete-ticket-button"
          >
            Delete Ticket
          </button>
        )}
      </div>
    );
  }
}

class DeleteButtonControl extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => {
          if (usercontainer.state.currentUser === this.props.ticketOwner) {
            return <DeleteTicketButton ticketID={this.props.ticketID} />;
          }
          return null;
        }}
      </Subscribe>
    );
  }
}

export default DeleteButtonControl;
