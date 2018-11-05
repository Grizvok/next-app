import React from 'react';

export default (props) => (
  <div className="column videocontainer is-three-fifths">
    <div className="card">
      <header className="card-header">
        <p className="card-header-title is-centered">Overview</p>
        <a href="#" className="card-header-icon" aria-label="more options" />
      </header>
      <div className="card-content">
        <div className="content">
          {props.tickets.map((anObjectMapped, index) => {
            return (
              //TODO return the ticket id from my API to use as a key
              <p
                key={`${
                  anObjectMapped.ticket_category
                }_{anObjectMapped.ticket_title}`}
              >
                {anObjectMapped.ticket_category} - {anObjectMapped.ticket_title}
              </p>
            );
          })}
        </div>
      </div>
      <footer className="card-footer" />
    </div>
  </div>
);
