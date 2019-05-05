import React from 'react';

export default class DeleteCommentModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Delete comment</p>
            <button
              onClick={this.props.close}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            Are you sure you want to delete your comment?
          </section>
          <footer className="modal-card-foot">
            <button
              onClick={() => {
                const id = this.props.id;

                this.props.deleteComment(id);
              }}
              className="button is-danger"
            >
              Delete
            </button>
            <button onClick={this.props.close} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
