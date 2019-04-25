// npm packages
import React from 'react';
import { Subscribe } from 'unstated';
// our packages
import { userStore } from '../Containers/UserContainer';
import RichTextEditor from './RichTextEditor';
import { KeyUtils } from 'slate';
import CommentField from './CommentField';

export default class CommentControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          if (userstore.state.currentUser) {
            return (
              <div className="columns is-centered">
                <div className="column text-editor-column is-four-fifths">
                  <p className="current-comment-user">
                    Comment as {userstore.state.currentUser}
                  </p>
                  <CommentField ticketID={this.props.ticketID} />
                </div>
              </div>
            );
          } else {
            return <div>Hello guest</div>;
          }
        }}
      </Subscribe>
    );
  }
}
