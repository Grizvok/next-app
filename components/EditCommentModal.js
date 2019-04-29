import React from 'react';

export default class EditCommentModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.comment.id);
    return this.props.isModalOpen ? (
      <div className="modal is-active">
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
            <h2 className="reset-password-h2">Reset your password</h2>
          </div>
        </div>
      </div>
    ) : null;
  }
}
