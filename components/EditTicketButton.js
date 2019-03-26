//npm packages
import React from 'react';
import { Subscribe } from 'unstated';

//our packages
import { userStore } from '../Containers/UserContainer';

class EditTicketButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          if (userstore.state.currentUser === this.props.ticketOwner) {
            return (
              <a
                href="javascript:void(0)"
                onClick={() => this.props.handleEditMode()}
              >
                <i className="fas specific-ticket-action fa-edit">
                  <span className="ticket-action-text">edit</span>
                </i>
              </a>
            );
          } else {
            return null;
          }
        }}
      </Subscribe>
    );
  }
}

export default EditTicketButton;
