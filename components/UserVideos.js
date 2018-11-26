import React from 'react';
import Link from 'next/link';

export default (props) => (
  <div className="column videocontainer is-three-fifths">
    <div className="card">
      <header className="card-header">
        <p className="card-header-title is-centered">Overview</p>
        <a href="#" className="card-header-icon" aria-label="more options" />
      </header>
      <div className="card-content">
        <div className="content">
          {props.tickets.map((tickets, index) => {
            console.log(tickets);
            return (
              <li key={tickets.id}>
                <Link as={`/ticket/${tickets.id}`} href={`/ticket?id=${tickets.id}`}>
                  <a>
                    {tickets.ticket_category} - {tickets.ticket_title} -{' '}
                    {tickets.ticket_creation_date} - {tickets.id}
                  </a>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
      <footer className="card-footer" />
    </div>
  </div>
);
