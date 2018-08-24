import { Container } from "unstated";
import axios from "axios";
import Router from "next/router";

class UserContainer extends Container {
  constructor() {
    super();

    this.state = {
      currentUser: ""
    };
  }
  handleUserRegister = async (email, password) => {
    axios
      .post("/api/login", {
        email: email,
        password: password
      })
      .then(response => {
        this.setState({ currentUser });
        Router.push("/dashboard");
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  handleUserUpdate = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentUser = await formData.get("email");
    const password = await formData.get("password");
    axios
      .post("/api/login", {
        email: currentUser,
        password: password
      })
      .then(response => {
        this.setState({ currentUser });
        Router.push("/dashboard");
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
  
  addCurrentUser = async (user) => {
    await this.setState({ currentUser: user });
  };

  removeCurrentUser = async () => {
    await this.setState({ currentUser: "" });
  };
}

let usercontainer = new UserContainer();

export default usercontainer;
