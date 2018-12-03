import React from 'react';

export default (props) => (
  <div>
    <h1>{props.ticket.ticket_category}</h1>
    <h1>{props.ticket.ticket_title}</h1>
    <h1>{props.ticket.ticket_description}</h1>
    <h1>{props.ticket.ticket_creation_date}</h1>
    <h1>{props.ticket.sci_user}</h1>
  </div>
)
