//npm packages
import { Container } from 'unstated';
import axios from 'axios';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

export default class UserContainer extends Container {
  state = {
    currentUser: '',
    error: '',
  };

  handleUserRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = await formData.get('user');
    const password = await formData.get('password');

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

    const { currentUser, error } = await axios
      .post('/api/login', {
        user: user,
        password: password,
      })
      .then((response) => ({ currentUser: response.data }))
      .catch((error) => ({ error }));
    await this.setState(() => ({ currentUser, error }));

    if (this.state.currentUser) {
      Router.push(
        `/user?id=${this.state.currentUser}`,
        `/user/${this.state.currentUser}`
      );
    }
    console.log(this.state);
  };

  getCurrentUser = async () => {
    return this.state.currentUser;
  };

  addCurrentUser = async (user) => {
    //called on _app getInitialProps during SSR passing req.user from context object
    await this.setState((state, props) => ({
      currentUser: user,
    }));
    console.log(await this.getCurrentUser(user));
  };

  removeCurrentUser = async () => {
    await this.setState({ currentUser: '' });
    console.log('this runs');
  };
}
