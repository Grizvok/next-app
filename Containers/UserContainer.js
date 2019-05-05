//npm packages
import { Container } from 'unstated';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

const getAuthedUserTickets = async (user) => {
  let userTickets;
  try {
    const res = await fetch(`http://localhost:3000/api/ticket/${user}`);
    userTickets = await res.json();
    return userTickets;
  } catch (e) {
    return (userTickets = []);
  }
};

// grab all followedUsers of the currently authed user
const getAuthedFollowedUsers = async (user) => {
  let followedUsers;
  try {
    const res = await fetch(`http://localhost:3000/api/user/follow/${user}`);
    followedUsers = await res.json();
    return followedUsers;
  } catch (e) {
    return (followedUsers = []);
  }
};

export default class UserContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      currentUser: '',
      userTickets: [],
      followedUsers: [],
      error: '',
    };
  }

  initState = (state) => {
    this.state = { ...state };
  };

  handleAddFollowedUser = async (followerUser, followingUser) => {
    console.log(followingUser);
    if (this.state.followedUsers.includes(followingUser)) {
      return;
    }
    const payload = {
      followerUser,
      followingUser,
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

  handleCommentDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/comment/${id}`, {
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status;
  };

  handleCommentEdit = async (e, payload) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:3000/api/comment/${payload.commentID}`,
      {
        method: 'PATCH',
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.status;
  };

  handleTicketCreation = async (e, payload) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/ticket', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resJSON = await res.json();
    if (res.status === 200) {
      this.setState({
        userTickets: [resJSON.ticket, ...this.state.userTickets],
      });

      Router.push(
        `/ticket?id=${resJSON.ticket.id}`,
        `/ticket/${resJSON.ticket.id}`
      );
    }
  };

  handleTicketDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/ticket/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 200) {
      throw Error(res.statusText);
    }
    const newArray = this.state.userTickets.filter(
      (ticket) => ticket.id !== id
    );
    this.setState({
      userTickets: newArray,
    });
  };

  handleUserRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = await formData.get('user');
    const password = await formData.get('password');
    const confirmPassword = await formData.get('confirmPassword');

    const payload = {
      user: user,
      password: password,
    };

    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      Router.push('/login');
    }
  };

  getAuthedUser = async () => {
    const res = fetch('http://localhost:3000/api/user');
    const data = await res.json();
    await this.setState({ currentUser: data.user });
  };

  handleUserUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = await formData.get('user');
    const password = await formData.get('password');

    const payload = {
      user: user,
      password: password,
    };

    let data;

    try {
      data = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      Router.push('/login');
      return;
    }

    const res = await data.json();

    if (data.status === 200) {
      const userTickets = await getAuthedUserTickets(res.user);
      const followedUsers = await getAuthedFollowedUsers(res.user);
      await this.setState({
        currentUser: res.user,
        userTickets: userTickets.tickets,
        followedUsers: followedUsers.data,
      });

      Router.push(
        `/user?id=${this.state.currentUser}`,
        `/user/${this.state.currentUser}`
      );
    }
  };

  removeCurrentUser = async () => {
    await this.setState({
      currentUser: '',
    });
    const res = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      Router.push('/login');
    }
  };
}

export const userStore = new UserContainer();
