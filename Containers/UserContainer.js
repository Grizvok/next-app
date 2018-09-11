//npm packages
import { Container } from 'unstated';
import axios from 'axios';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

class UserContainer extends Container {
  constructor() {
    super();

    this.state = {
      currentUser: '',
      error: '',
    };
  }

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
    await this.setState({ currentUser, error });

    if (this.state.currentUser) {
      const as = `/user/${this.state.currentUser}`;
      Router.push(`/user/?id=${this.state.currentUser}`, as);
    }
  };

  addCurrentUser = async (user) => {
    await this.setState({ currentUser: user });
  };

  removeCurrentUser = async () => {
    await this.setState({ currentUser: '' });
  };
}

let usercontainer = new UserContainer();

export default usercontainer;

// handleUserUpdate = async e => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const email = await formData.get("email");
//   const password = await formData.get("password");
//   try {
//     const response = await axios.post("/api/login", {
//       email: email,
//       password: password
//     });
//     const currentUser = response.data;
//     this.setState({ currentUser });
//     Router.push("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// };
