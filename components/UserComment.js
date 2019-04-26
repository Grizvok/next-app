import React from 'react';
import moment from 'moment';
import { Subscribe } from 'unstated';
import { userStore } from '../Containers/UserContainer';
import CommentDropDown from './CommentDropDown';

export default class UserComment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const currentDate = moment();

    return this.props.comments.map((comment, index) => {
      const creationDate = comment.comment_creation_date;
      const timeSinceCreation = moment(creationDate).toNow(currentDate);
      return (
        <Subscribe to={[userStore]}>
          {(userstore) => (
            <article className="media user-comment" key={comment.id}>
              <div className="media-content">
                <div className="content">
                  <p className="commenter-username">
                    {comment.sci_user}
                    <span className="comment-time-separator has-text-grey">
                      ·
                    </span>
                    <span className="has-text-grey time-since-comment">
                      {' '}
                      {`${timeSinceCreation} ago`}
                    </span>
                  </p>
                  <p className="comment-text">{comment.comment}</p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item comment-level-item">
                      <span className="icon is-small">
                        <i className="fas fa-comment-alt" />
                      </span>
                      <span className="comment-reply-text">Reply</span>
                    </a>
                    {userstore.state.currentUser === comment.sci_user ? (
                      <a className="level-item comment-level-item">
                        <span className="icon is-small">
                          <CommentDropDown key={comment.id} comment={comment} />
                        </span>
                      </a>
                    ) : null}
                  </div>
                </nav>
              </div>
            </article>
          )}
        </Subscribe>
      );
    });
  }
}
