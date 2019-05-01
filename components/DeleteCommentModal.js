import React from 'react';

export default class DeleteCommentModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal is-active delete-comment-modal">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box modal-confirmation-box">
            <div className="close-modal-div">
              <button
                onClick={this.props.close}
                className="delete "
                aria-label="close"
              />
            </div>
            <h2 className="reset-password-h2">Delete your comment?</h2>
          </div>
        </div>
      </div>
    );
  }
}
