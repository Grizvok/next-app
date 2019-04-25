import React from 'react';

class PasswordResetModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.handleModalClose();
  }

  render() {
    if (this.props.showPasswordReset === true) {
      return (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content">
            <div className="box modal-confirmation-box">
              <div className="close-modal-div">
                <button
                  onClick={this.handleClose}
                  className="delete "
                  aria-label="close"
                />
              </div>
              <h2 className="reset-password-h2">Reset your password</h2>
              <p>
                Don't worry! You may have forgotten your password, but we can
                help you out. Enter your username below and we'll email you a
                link to reset your password.
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default PasswordResetModal;
