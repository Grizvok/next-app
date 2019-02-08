//npm packages
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Subscribe } from 'unstated';

//our packages
import TicketBody from './TicketBody';
import UserContainer from '../Containers/UserContainer';
import EditTicketButton from './EditTicketButton';
import EditInformation from './EditInformation';

class TicketDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editView: false,
    };
    this.handleEditMode = this.handleEditMode.bind(this);
  }

  handleEditMode = () => {
    this.setState({
      editView: !this.state.editView,
    });
  };

  handleEditCancel = () => {
    this.setState({
      editView: !this.state.editView,
    });
  };

  render() {
    const creationDate = this.props.ticket.ticket_creation_date;
    const currentDate = moment();
    const momentDate = moment(creationDate).format('MMMM Do YYYY, h:mm a');
    const timeSinceCreation = moment(creationDate).toNow(currentDate);
    const timeSinceEdit = moment(this.props.ticket.last_edit).toNow(
      currentDate
    );

    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <div className="columns">
            <div className="box column is-four-fifths ticket-box">
              <article className="media">
                <div className="media-left" />
                <div className="media-content">
                  <div className="content">
                    <p className="ticketpage-title">
                      {this.props.ticket.ticket_title}
                    </p>
                    <p className="ticketpage-creator">
                      submitted by{' '}
                      <Link
                        as={`/user/${this.props.ticket.sci_user}`}
                        href={`/user?id=${this.props.ticket.sci_user}`}
                      >
                        <a> {this.props.ticket.sci_user}</a>
                      </Link>{' '}
                      {timeSinceCreation} ago
                      <EditInformation editDate={timeSinceEdit} />
                    </p>
                    <TicketBody
                      ticketBody={this.props.ticket.ticket_description}
                      editMode={this.state.editView}
                      handleEditCancel={this.handleEditCancel}
                      ticketID={this.props.ticket.id}
                      handleEditMode={this.handleEditMode}
                      ticketOwner={this.props.ticket.sci_user}
                    />
                  </div>
                  <nav className="level ticket-controls is-mobile">
                    <div className="level-left">
                      <a className="level-item" aria-label="reply">
                        <span className="icon is-small">
                          <i className="fas fa-reply" aria-hidden="true" />
                        </span>
                      </a>
                      <EditTicketButton
                        ticketOwner={this.props.ticket.sci_user}
                        handleEditMode={this.handleEditMode}
                      />
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default TicketDescription;
