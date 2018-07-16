class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div align="center" className="container register-container">
        <div className="box">
          <div className="column is-three-fifths">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div align="left" className="field">
              <p className="control">
                <button className="button is-success">Register</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
