//npm packages
import React from 'react';
import fetch from 'isomorphic-unfetch';

//our packages
import Layout from '../components/MyLayout.js';
import TicketDescription from '../components/TicketDescription.js';

const Ticket = (props) => (
  <Layout>
    <TicketDescription ticket={props.ticketData.ticket[0]} />
  </Layout>
);

Ticket.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/ticket/user/${id}`);
  const ticketData = await res.json();
  return { ticketData };
};

export default Ticket;
