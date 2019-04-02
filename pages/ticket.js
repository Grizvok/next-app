//npm packages
import React from 'react';
import fetch from 'isomorphic-unfetch';

//our packages
import Layout from '../components/MyLayout.js';
import TicketDescription from '../components/TicketDescription.js';
import CommentControl from '../components/CommentControl';

class Ticket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <section className="hero is-bold is-light is-fullheight">
          <div className="hero-head">
            <div className="columns">
              <div className="box column is-two-thirds is-offset-1 ticket-box">
                <TicketDescription ticket={this.props.ticketData.ticket[0]} />
                <CommentControl />
              </div>
            </div>
          </div>
          <div className="hero-body" />
        </section>
      </Layout>
    );
  }
}

Ticket.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/ticket/user/${id}`);
  const ticketData = await res.json();
  return { ticketData };
};

export default Ticket;
