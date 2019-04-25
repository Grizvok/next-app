//npm packages
import React from 'react';
import fetch from 'isomorphic-unfetch';
import CommentContainer from '../components/CommentContainer';

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
                <CommentControl ticketID={this.props.ticketData.ticket[0].id} />
                <CommentContainer comments={this.props.commentData.comments} />
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

  const result = await fetch(`http://localhost:3000/api/comment/ticket/${id}`);
  const commentData = await result.json();

  return { ticketData, commentData };
};

export default Ticket;
