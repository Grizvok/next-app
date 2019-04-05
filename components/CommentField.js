import React from 'react';
import { Subscribe } from 'unstated';
import { userStore } from '../Containers/UserContainer';
import fetch from 'isomorphic-unfetch';

export default class CommentField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const payload = {};

    const res = await fetch('http://localhost:3000/api/comment/create', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  }

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          return (
            <form method="POST" onSubmit={this.handleSubmit}>
              <textarea
                className="textarea"
                placeholder="Propose your LedgeTrade acquisition!"
                value={this.state.comment}
                onChange={this.handleChange}
                name="comment"
              />
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-text">Cancel</button>
                </div>
              </div>
            </form>
          );
        }}
      </Subscribe>
    );
  }
}
