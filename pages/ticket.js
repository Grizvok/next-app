import React from 'react';
import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
// import Ticket from '../components/TicketDescription.js';

// export default class Tickets extends React.Component {
//   static async getInitialProps({ req }) {
//     const res = await fetch(
//       `http://localhost:3000/api/ticket/user/${req.params.ticketID}`
//     );
//     const json = await res.json();
//     console.log('this runs');
//     return { json };
//   }

//   render() {
//     return (
//       <Layout>
//         <Ticket tickets={this.props.json.ticket} />
//       </Layout>
//     );
//   }
// }

const Ticket = (props) => (
  <Layout>
    {console.log(props.ticketData.ticket[0])}
    <h1>{props.ticketData.ticket[0].ticket_title}</h1>
  </Layout>
);

Ticket.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/ticket/user/${id}`);
  const ticketData = await res.json();
  return { ticketData };
};

export default Ticket;
