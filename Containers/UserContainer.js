import { Container } from 'unstated';
import axios from 'axios';
import Router from 'next/router';

class UserContainer extends Container {
  constructor() {
    super();

    this.state = {
      currentUser: '',
      error: '',
    };
  }

  handleUserRegister = async (user, password) => {
    const { currentUser, error } = await axios
      .post('/api/login', {
        user,
        password,
      })
      .then((response) => ({ currentUser: response.data }))
      .catch((error) => ({ error }));
      
    await this.setState({ currentUser, error });
    
    if (this.state.currentUser) {
      Router.push('/dashboard');
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
      Router.push(`/dashboard/${this.state.currentUser}`);
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
