import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import TicketTab from './TicketTab';
import CommentTab from './CommentTab';
import SkillTab from './SkillTab';

class UserNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { router } = this.props;
    const { user } = this.props;

    return (
      <div className="tabs has-background-white user-tabs">
        <ul>
          <SkillTab activeTab={router.pathname} user={user} />
          <TicketTab activeTab={router.pathname} user={user} />
          <CommentTab activeTab={router.pathname} user={user} />
        </ul>
      </div>
    );
  }
}

export default withRouter(UserNav);
