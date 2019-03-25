import React from 'react';
import Link from 'next/link';

class TicketSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.ticketSearchResults) {
      return null;
    } else {
      return this.props.ticketSearchResults.map((ticket, index) => {
        return (
          <Link
            as={`/ticket/${ticket}`}
            href={`/ticket?id=${ticket}`}
            key={index}
          >
            <a onClick={this.props.handleClick} className="dropdown-item">
              {ticket}
            </a>
          </Link>
        );
      });
    }
  }
}

export default TicketSearchResults;
