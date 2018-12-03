//npm packages
import React from 'react';
import Link from 'next/link';
import { Subscribe } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import UserContainer from '../Containers/UserContainer';
import DeleteButtonControl from '../components/DeleteTicketButton';

class UserVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      loading: true,
    };
    this.fetchAllTickets = this.fetchAllTickets.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
  }

  async componentDidMount() {
    await this.fetchAllTickets();
  }

  async fetchAllTickets() {
    const userTickets = await fetch(
      `http://localhost:3000/api/ticket/${this.props.user}`
    );
    const ticketJSON = await userTickets.json();
    const tickets = ticketJSON.tickets;
    this.setState({ tickets, loading: false });
  }

  async handleTicketDelete(ticketID) {
   const res = await fetch(`http://localhost:3000/api/ticket/${ticketID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
  }

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <div className="column videocontainer is-three-fifths">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title is-centered">Overview</p>
                <a
                  href="#"
                  className="card-header-icon"
                  aria-label="more options"
                />
              </header>
              <div className="card-content">
                <div className="content">
                  {this.state.tickets.map((tickets, index) => (
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
                      <DeleteButtonControl
                        ticketID={tickets.id}
                        ticketOwner={tickets.sci_user}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <footer className="card-footer" />
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default UserVideos;

//TODO(thunka) Fix link coloring in light hero reference: https://github.com/jgthms/bulma/issues/1646
