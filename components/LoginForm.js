class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="column is-half container form-container">
      <div className="box">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success">Login</button>
          </p>
        </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
