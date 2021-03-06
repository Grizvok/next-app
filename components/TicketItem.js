//npm packages
import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Subscribe } from 'unstated';

//our packages
import DeleteTicketButton from './DeleteTicketButton';
import ShareTicketLink from './ShareTicketLink';
import ExpandTicketButton from './ExpandTicketButton';
import { userStore } from '../Containers/UserContainer';

class TicketItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          if (userstore.state.currentUser === this.props.user) {
            return (
              <div className="content">
                {userstore.state.userTickets.map((tickets, index) => {
                  let date = tickets.ticket_creation_date;
                  let momentDate = moment(date).format('MMMM Do YYYY, h:mm a');
                  let href = `http://localhost:3000/ticket/${tickets.id}`;
                  return (
                    <div className="box commented-on-box" key={tickets.id}>
                      <Link
                        prefetch
                        as={`/ticket/${tickets.id}`}
                        href={`/ticket?id=${tickets.id}`}
                      >
                        <a className="ticket-title">{tickets.ticket_title}</a>
                      </Link>
                      <p className="ticket-creation-info is-marginless">
                        Ticket created by {tickets.sci_user} on {momentDate}
                      </p>
                      <ExpandTicketButton
                        ticketDescription={tickets.ticket_description}
                      />
                      <DeleteTicketButton
                        ticketID={tickets.id}
                        ticketOwner={tickets.sci_user}
                      />
                      <ShareTicketLink ticketHref={href} />
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return (
              <div className="content">
                {this.props.tickets.map((tickets, index) => {
                  let date = tickets.ticket_creation_date;
                  let momentDate = moment(date).format('MMMM Do YYYY, h:mm a');
                  let href = `http://localhost:3000/ticket/${tickets.id}`;
                  return (
                    <div className="box commented-on-box" key={tickets.id}>
                      <Link
                        prefetch
                        as={`/ticket/${tickets.id}`}
                        href={`/ticket?id=${tickets.id}`}
                      >
                        <a className="ticket-title">{tickets.ticket_title}</a>
                      </Link>
                      <p className="ticket-creation-info is-marginless">
                        Ticket created by {tickets.sci_user} on {momentDate}
                      </p>
                      <ExpandTicketButton
                        ticketDescription={tickets.ticket_description}
                      />
                      <DeleteTicketButton
                        ticketID={tickets.id}
                        ticketOwner={tickets.sci_user}
                      />
                      <ShareTicketLink ticketHref={href} />
                    </div>
                  );
                })}
              </div>
            );
          }
        }}
      </Subscribe>
    );
  }
}

export default TicketItem;
