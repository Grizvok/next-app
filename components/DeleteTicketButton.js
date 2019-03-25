//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import UserContainer from '../Containers/UserContainer';
import DeleteConfirmationButton from '../components/DeleteConfirmationButton';

class DeleteTicketButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirmation: false,
    };

    this.handleDeleteAbort = this.handleDeleteAbort.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDeleteAbort() {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
    });
  }

  handleClick() {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
    });
  }

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => {
          if (
            usercontainer.state.currentUser === this.props.ticketOwner &&
            this.state.showConfirmation
          ) {
            return (
              <DeleteConfirmationButton
                handleTicketDelete={this.props.handleTicketDelete}
                ticketID={this.props.ticketID}
                handleDeleteAbort={this.handleDeleteAbort}
              />
            );
          } else if (
            usercontainer.state.currentUser === this.props.ticketOwner
          ) {
            return (
              <a
                href="javascript:void(0)"
                onClick={() => this.handleDeleteAbort()}
              >
                <span className="ticket-action-text delete-span-text">
                  delete
                </span>
              </a>
            );
          }
          return null;
        }}
      </Subscribe>
    );
  }
}

// render() {
//   return (
//     <Subscribe to={[UserContainer]}>
//       {(usercontainer) => {
//         if (usercontainer.state.currentUser === this.props.ticketOwner && this.state.showConfirmation) {
//           return (
//             <div>
//               {this.state.showConfirmation ? (
//                 <DeleteConfirmationButton
//                   handleTicketDelete={this.props.handleTicketDelete}
//                   ticketID={this.props.ticketID}
//                   handleAbort={this.handleClick}

//                 />
//               ) : (
//                 <button
//                   onClick={this.handleClick}
//                   className="is-link is-small button delete-ticket-button"
//                 >
//                   Delete Ticket
//                 </button>
//               )}
//             </div>
//           );
//         }
//         return null;
//       }}
//     </Subscribe>
//   );
// }

export default DeleteTicketButton;
