import { Container } from "unstated";
import axios from "axios";
import Router from "next/router";
import { runInThisContext } from "vm";

class UserContainer extends Container {
  state = {
    currentUser: ""
  };

    handleUserUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = await formData.get("email");
    const password = await formData.get("password");
    await this.setCurrentUser(email);
    this.seeCurrentUser();
    
  }

  setCurrentUser = async (email) => {
    await this.setState({currentUser: email});
    console.log(this.state.currentUser);
    
  }

  seeCurrentUser = () => {
    return this.state.currentUser;
  }
  // handleUserUpdate = async e => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const email = await formData.get("email");
  //   const password = await formData.get("password");

  //   this.setState({ currentUser: email });

  //   axios
  //     .post("/api/login", {
  //       email: email,
  //       password: password
  //     })
  //     .then(response => {
  //       Router.push("/dashboard");
  //       return;
  //     })
  //     .catch(error => {
  //       console.log(error.response.data);
  //       return;
  //     });
  // };

  removeCurrentUser = async () => {
    await this.setState({ currentUser: "" });
  };
}
 export default UserContainer;