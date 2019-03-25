import { Container } from 'unstated';
import fetch from 'isomorphic-unfetch';

export default class FollowedUsersContainer extends Container {
  constructor(props = {}) {
    super(props);
    this.state = {
      followedUsers: [],
    };
  }

  handleAddFollowedUser = async (followerUser, followingUser) => {
    if (this.state.followedUsers.includes(followingUser)) {
      return;
    }

    const payload = {
      followerUser: followerUser,
      followingUser: followingUser,
    };

    const res = await fetch('http://localhost:3000/api/user/follow', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      await this.setState({
        followedUsers: [...this.state.followedUsers, followingUser],
      });
    }
  };

  handleDeleteFollowedUser = async (followerUser, followingUser) => {};
}
