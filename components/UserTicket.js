import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Subscribe } from 'unstated';

import DeleteTicketButton from './DeleteTicketButton';
import ShareTicketLink from './ShareTicketLink';
import ExpandTicketButton from './ExpandTicketButton';
import { userStore } from '../Containers/UserContainer';

class UserTicket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props.ticket;
    const ticketTitle = this.props.ticket.ticket_title;
    const creator = this.props.ticket.sci_user;
    const ticketDescription = this.props.ticket.ticket_description;

    const date = moment(this.props.ticket.ticket_creation_date).format(
      'MMMM Do YYYY, h:mm a'
    );
    const href = `http://localhost:3000/ticket/${id}`;
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          if (userstore.state.currentUser === this.props.user) {
            return (
              <div className="content ticket-content-div">
                <div className="box commented-on-box">
                  <Link as={`/ticket/${id}`} href={`/ticket?id=${id}`}>
                    <a className="ticket-title">{ticketTitle}</a>
                  </Link>
                  <p className="ticket-creation-info is-marginless">
                    Ticket created by {creator} on {date}
                  </p>
                  <ExpandTicketButton ticketDescription={ticketDescription} />
                  <DeleteTicketButton ticketID={id} ticketOwner={creator} />
                  <ShareTicketLink ticketHref={href} />
                </div>
              </div>
            );
          } else {
            return (
              <div className="content">
                <div className="box commented-on-box">
                  <Link as={`/ticket/${id}`} href={`/ticket?id=${id}`}>
                    <a className="ticket-title">{ticketTitle}</a>
                  </Link>
                  <p className="ticket-creation-info is-marginless">
                    Ticket created by {creator} on {date}
                  </p>
                  <ExpandTicketButton ticketDescription={ticketDescription} />
                  <DeleteTicketButton ticketID={id} ticketOwner={creator} />
                  <ShareTicketLink ticketHref={href} />
                </div>
              </div>
            );
          }
        }}
      </Subscribe>
    );
  }
}

export default UserTicket;
