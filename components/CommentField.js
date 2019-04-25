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

  handleSubmit = async (e, payload) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/comment', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      this.setState({
        comment: '',
      });
    }
  };

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          return (
            <form
              onSubmit={(e) => {
                const payload = {
                  comment: this.state.comment.trim(),
                  user: userstore.state.currentUser,
                  ticket: this.props.ticketID,
                };
                this.handleSubmit(e, payload);
              }}
            >
              <textarea
                className="textarea"
                placeholder="Propose your LedgeTrade acquisition!"
                value={this.state.comment}
                onChange={this.handleChange}
                name="comment"
              />
              <div className="field is-grouped">
                {this.state.comment.trim().length > 0 ? (
                  <div className="control">
                    <button className="button is-link">Comment</button>
                  </div>
                ) : (
                  <div className="control">
                    <button
                      className="button is-link"
                      title="Disabled button"
                      disabled
                    >
                      Comment
                    </button>
                  </div>
                )}

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
