//npm packages
import { Container } from 'unstated';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import userStore from '../helpers/localForage';

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

export default class UserContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      currentUser: props.initialUser || '',
      userTickets: props.initialTickets || [],
      followedUsers: props.initialFollowedUsers || [],
      error: '',
      token: '',
    };
  }

  handleTicketDelete = async (ticketID) => {
    const res = await fetch(`http://localhost:3000/api/ticket/${ticketID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      console.log(this.state.userTickets);
      const newArray = this.state.userTickets.filter((ticket) => {
        ticket.id !== ticketID;
      });
      const deletedTickets = await userStore.getItem('tickets');
      const newLocalArray = deletedTickets.filter((ticket) => {
        return ticket.id !== ticketID;
      });
      await userStore.setItem('tickets', newLocalArray);
      await this.setState({
        userTickets: newArray,
      });
    }
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
    //create user
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
    }

    const resJSON = await data.json();

    if (data.status === 200) {
      const userTickets = await getAuthedUserTickets(user);
      await this.setState({
        currentUser: resJSON.user,
        token: resJSON.token,
        userTickets: userTickets.tickets,
      });

      await userStore.setItem('tickets', this.state.userTickets);

      const cookieString = `user_cookie=${this.state.token}`;
      const foragedUser = await userStore.setItem(
        'user',
        this.state.currentUser
      );

      document.cookie = cookieString;

      Router.push(
        `/user?id=${this.state.currentUser}`,
        `/user/${this.state.currentUser}`
      );
    }
  };

  removeCurrentUser = async () => {
    await userStore.removeItem('user');
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
