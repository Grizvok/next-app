//npm packages
import React from 'react';

//our packages
import HomeInstruction from '../components/HomeInstruction';

const HomeHero = () => (
  <section className="hero is-light is-bold is-fullheight homehero">
    <div className="hero-head" />
    <div className="container has-text-centered is-fluid">
      <h1 className="title has-text-danger is-size-1">
        <em>Enter</em>&nbsp; LedgeTrade
      </h1>
      <p>
        <i className="fas fa-angle-double-down has-text-info fa-2x" />
      </p>
      <h2 className=" is-size-4 has-text-danger subtitle">
        <br />A platform for person to person knowledge trading
      </h2>
      <HomeInstruction />
    </div>
    <div className="hero-body" />
  </section>
);

export default HomeHero;
