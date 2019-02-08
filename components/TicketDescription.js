//npm packages
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Subscribe } from 'unstated';
import fetch from 'isomorphic-unfetch';

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
      ticketDescription: this.props.ticket.ticket_description,
      editedTicketDescription: this.props.ticket.ticket_description,
      timeSinceEdit: moment(this.props.ticket.last_edit).toNow(moment()),
    };

    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleTicketChange = this.handleTicketChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTicketChange = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleEditMode = () => {
    this.setState({
      editView: !this.state.editView,
    });
  };

  handleEditCancel() {
    this.setState({
      editView: !this.state.editView,
      editedTicketDescription: this.state.ticketDescription,
    });
  }

  handleSubmit = async (e) => {
    const payload = {
      description: this.state.editedTicketDescription,
      ticketOwner: this.props.ticket.sci_user,
    };

    e.preventDefault();

    // refactor so bearer token is NOT hardcoded into fetch
    const res = await fetch(
      `http://localhost:3000/api/ticket/${this.props.ticket.id}`,
      {
        method: 'PATCH',
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiJ9.R3JpenZvaw.Z9DrrJKETt8i_nZh4Fme2P5snwvgfhzfHpqFqrH5k5g',
          'Content-Type': 'application/json',
        },
      }
    );

    const json = await res.json();
    const newDescription = json.description;

    if (res.status === 200) {
      this.setState({
        ticketDescription: newDescription,
        editedTicketDescription: newDescription,
        timeSinceEdit: 'a few seconds',
      });
      this.handleEditMode();
    }
  };

  render() {
    const creationDate = this.props.ticket.ticket_creation_date;
    const currentDate = moment();
    const timeSinceCreation = moment(creationDate).toNow(currentDate);

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
                      <EditInformation editDate={this.state.timeSinceEdit} />
                    </p>
                    <TicketBody
                      ticketBody={this.state.ticketDescription}
                      editedTicketDescription={
                        this.state.editedTicketDescription
                      }
                      editMode={this.state.editView}
                      handleEditCancel={this.handleEditCancel}
                      handleSubmit={this.handleSubmit}
                      handleTicketChange={this.handleTicketChange}
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
