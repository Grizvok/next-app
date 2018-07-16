import HomeInstruction from "../components/HomeInstruction";

const HomeHero = () => (
  <section class="hero is-dark is-fullheight has-background-grey-light homehero">
    <div className="hero-head" />
    <div class="container has-text-centered is-fluid">
      <h1 class="title has-text-danger is-size-1">
        <em>Enter</em>&nbsp; Sci Sport
      </h1>
      <p>
        <i class="fas fa-angle-double-down has-text-info fa-2x" />
      </p>
      <h2 class=" is-size-4 has-text-danger subtitle">
        <br />
        A platform for systematic sport improvement
      </h2>
      <HomeInstruction />
    </div>
    <div class="hero-body" />
  </section>
);

export default HomeHero;
