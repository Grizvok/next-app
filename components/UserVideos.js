//npm packages
import React from 'react';
import Link from 'next/link';
import { Subscribe } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import UserContainer from '../Containers/UserContainer';
import TicketItem from '../components/TicketItem';

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
    if (res.status === 200) {
      this.fetchAllTickets();
    }
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
              <TicketItem
                handleTicketDelete={this.handleTicketDelete}
                tickets={this.state.tickets}
              />
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