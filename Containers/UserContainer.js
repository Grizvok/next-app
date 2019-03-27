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

  initState = async (state) => {
    this.state = { ...state };
  };

  handleTicketCreation = async (e, payload) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/ticket', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(payload),
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiJ9.R3JpenZvaw.Z9DrrJKETt8i_nZh4Fme2P5snwvgfhzfHpqFqrH5k5g',
        'Content-Type': 'application/json',
      },
    });
    const resJSON = await res.json();
    console.log(resJSON);
    if (res.status === 200) {
      this.setState({
        userTickets: [resJSON.ticket, ...this.state.userTickets],
      });
      console.log(this.state.userTickets);
      Router.push(
        `/ticket?id=${resJSON.ticket.id}`,
        `/ticket/${resJSON.ticket.id}`
      );
      return;
    }
  };

  handleTicketDelete = async (ticketID) => {
    try {
      const res = await fetch(`http://localhost:3000/api/ticket/${ticketID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) {
        throw Error(res.statusText);
      }
      const newArray = this.state.userTickets.filter(
        (ticket) => ticket.id !== ticketID
      );
      this.setState({
        userTickets: newArray,
      });
    } catch (e) {
      throw Error(e);
    }
  };

  //   if (res.status === 200) {
  //     const newArray = this.state.userTickets.filter(
  //       (ticket) => ticket.id !== ticketID
  //     );

  //     await this.setState({
  //       userTickets: newArray,
  //     });
  //   }
  // };

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
      await this.setState({
        currentUser: res.user,
        userTickets: userTickets.tickets,
      });

      const cookieString = `user_cookie=${this.state.token}`;

      document.cookie = cookieString;

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
