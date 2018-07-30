import HomeInstruction from "../components/HomeInstruction";

const HomeHero = () => (
  <section className="hero is-dark is-fullheight has-background-grey-light homehero">
    <div className="hero-head" />
    <div className="container has-text-centered is-fluid">
      <h1 className="title has-text-danger is-size-1">
        <em>Enter</em>&nbsp; Sci Sport
      </h1>
      <p>
        <i className="fas fa-angle-double-down has-text-info fa-2x" />
      </p>
      <h2 className=" is-size-4 has-text-danger subtitle">
        <br />
        A platform for systematic sport improvement
      </h2>
      <HomeInstruction />
    </div>
    <div className="hero-body" />
  </section>
);

export default HomeHero;
