import { Container } from "unstated";
import axios from "axios";
import Router from "next/router";

class UserContainer extends Container {
  constructor() {
    super();

    this.state = {
      currentUser: "",
      error: ""
    };
  }
  handleUserRegister = async (email, password) => {
    const { currentUser, error } = await axios
      .post("/api/login", {
        email: email,
        password: password
      })
      .then(response => ({ currentUser: response.data }))
      .catch(error => ({ error }));
    await this.setState({ currentUser, error });

    if (this.state.currentUser) {
      await console.log(this.state);

      Router.push("/dashboard/");
    }
    await console.log(this.state);
  };

  handleUserUpdate = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = await formData.get("email");
    const password = await formData.get("password");

    const { currentUser, error } = await axios
      .post("/api/login", {
        email: email,
        password: password
      })
      .then(response => ({ currentUser: response.data }))
      .catch(error => ({ error }));
    this.setState({ currentUser, error });
  };

  addCurrentUser = async user => {
    await this.setState({ currentUser: user });
  };

  removeCurrentUser = async () => {
    await this.setState({ currentUser: "" });
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
