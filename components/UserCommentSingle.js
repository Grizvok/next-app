import React from 'react';
import moment from 'moment';
import { Subscribe } from 'unstated';
import { userStore } from '../Containers/UserContainer';
import EditCommentTextArea from './EditCommentTextArea';
import CommentDropDown from './CommentDropDown';
import DeleteCommentModal from './DeleteCommentModal';
import Portal from './Portal';

class UserCommentSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      comment: this.props.comment.comment,
      deleteMode: false,
    };
  }

  handleEditedComment = (comment) => {
    this.setState({
      comment: comment,
    });
  };

  openDeleteMode = () => {
    this.setState({
      deleteMode: true,
    });
  };

  closeDeleteMode = () => {
    this.setState({
      deleteMode: false,
    });
  };

  openEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  closeEditMode = () => {
    this.setState({
      editMode: false,
    });
  };

  render() {
    const creationDate = this.props.comment.comment_creation_date;
    const timeSinceCreation = moment(creationDate).toNow(
      this.props.currentDate
    );
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <article className="media user-comment">
            <div className="media-content">
              <div className="content">
                <p className="commenter-username">
                  {this.props.comment.sci_user}
                  <span className="comment-time-separator has-text-grey">
                    ·
                  </span>
                  <span className="has-text-grey time-since-comment">
                    {' '}
                    {`${timeSinceCreation} ago`}
                  </span>
                </p>
                {this.state.editMode ? (
                  <EditCommentTextArea
                    initialComment={this.state.comment}
                    closeEditMode={this.closeEditMode}
                    commentID={this.props.comment.id}
                    handleEditedComment={this.handleEditedComment}
                  />
                ) : (
                  <p className="comment-text">{this.state.comment}</p>
                )}
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item comment-level-item">
                    <span className="icon is-small">
                      <i className="fas fa-comment-alt" />
                    </span>
                    <span className="comment-reply-text">Reply</span>
                  </a>
                  {userstore.state.currentUser ===
                  this.props.comment.sci_user ? (
                    <div className="level-item comment-level-item">
                      <span className="icon is-small">
                        <CommentDropDown
                          openEditMode={this.openEditMode}
                          closeEditMode={this.closeEditMode}
                          openDeleteMode={this.openDeleteMode}
                          closeDeleteMode={this.closeDeleteMode}
                        />
                      </span>
                    </div>
                  ) : null}
                  {this.state.deleteMode && (
                    <Portal selector={'#modal'}>
                      <DeleteCommentModal close={this.closeDeleteMode} />
                    </Portal>
                  )}
                </div>
              </nav>
            </div>
          </article>
        )}
      </Subscribe>
    );
  }
}

export default UserCommentSingle;
