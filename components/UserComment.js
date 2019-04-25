import React from 'react';
import moment from 'moment';
import { Subscribe } from 'unstated';
import { userStore } from '../Containers/UserContainer';

export default (props) => {
  const currentDate = moment();
  return props.comments.map((comment, index) => {
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
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item comment-level-item">
                    <span class="icon is-small">
                      <i class="fas fa-comment-alt" />
                    </span>
                    <span className="comment-reply-text">Reply</span>
                  </a>
                  {userstore.state.currentUser === comment.sci_user ? (
                    <a class="level-item comment-level-item">
                      <span class="icon is-small">
                        <i class="fas fa-ellipsis-h ellipsis-icon" />
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
};
