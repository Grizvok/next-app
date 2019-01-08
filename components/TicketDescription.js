//npm packages
import React from 'react';
import moment from 'moment';
import Link from 'next/link';

//our packages
import TicketBody from './TicketBody';

class TicketDescription extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const creationDate = this.props.ticket.ticket_creation_date;
    const currentDate = moment();
    const momentDate = moment(creationDate).format('MMMM Do YYYY, h:mm a');
    const timeSinceCreation = moment(creationDate).toNow(currentDate);

    return (
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
                    {this.props.ticket.sci_user}
                  </Link>{' '}
                  {timeSinceCreation} ago
                </p>
                <TicketBody ticketBody={this.props.ticket.ticket_description} />
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" aria-label="reply">
                    <span className="icon is-small">
                      <i className="fas fa-reply" aria-hidden="true" />
                    </span>
                  </a>
                  <a className="level-item" aria-label="retweet">
                    <span className="icon is-small">
                      <i className="fas fa-retweet" aria-hidden="true" />
                    </span>
                  </a>
                  <a className="level-item" aria-label="like">
                    <span className="icon is-small">
                      <i className="fas fa-heart" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default TicketDescription;
