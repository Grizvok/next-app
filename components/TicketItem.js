import React from 'react';
import Link from 'next/link';
import DeleteTicketButton from '../components/DeleteTicketButton';

class TicketItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-content">
        <div className="content">
          {this.props.tickets.map((tickets, index) => (
            <div className="box" key={tickets.id}>
              <Link
                prefetch
                as={`/ticket/${tickets.id}`}
                href={`/ticket?id=${tickets.id}`}
              >
                <a>
                  {tickets.ticket_category} - {tickets.ticket_title} -{' '}
                  {tickets.ticket_creation_date} - {tickets.sci_user}
                </a>
              </Link>
              <DeleteTicketButton
                handleTicketDelete={this.props.handleTicketDelete}
                ticketID={tickets.id}
                ticketOwner={tickets.sci_user}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TicketItem;
