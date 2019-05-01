import React from 'react';
import { userStore } from '../Containers/UserContainer';
import { Subscribe } from 'unstated';

export default class EditCommentTextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editedComment: this.props.initialComment,
    };
  }

  handleChange = (event) => {
    this.setState({
      editedComment: event.target.value,
    });
  };

  handleSubmit = async (e, payload) => {
    console.log('handlesubmit ran!');
    const status = await userStore.handleCommentEdit(e, payload);

    if (status === 200) {
      this.props.handleEditedComment(payload.text);
      this.props.closeEditMode();
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
                  text: this.state.editedComment,
                  commentID: this.props.commentID,
                };
                this.handleSubmit(e, payload);
              }}
            >
              <textarea
                value={this.state.editedComment}
                onChange={this.handleChange}
                className="textarea"
              />
              <div className="field is-grouped">
                {this.state.editedComment.trim().length > 0 ? (
                  <button type="submit" className="button is-link">
                    Save
                  </button>
                ) : (
                  <button type="submit" disabled className="button is-link">
                    Save
                  </button>
                )}
                <div className="control" />
                <div className="control">
                  <button
                    onClick={this.props.closeEditMode}
                    className="button"
                    type="button is-grey"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Subscribe>
    );
  }
}
