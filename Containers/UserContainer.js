import { Container } from "unstated";

class UserContainer extends Container {
  state = {
    currentUser: ""
  };

  setCurrentUser = async user => {
    await this.setState({ currentUser: user });
    console.log(this.state.currentUser);
  };

  removeCurrentUser = async () => {
    await this.setState({ currentUser: "" });
  };
}

export default UserContainer;
