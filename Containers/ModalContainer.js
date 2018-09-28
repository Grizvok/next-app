import { Container } from 'unstated';

class ModalContainer extends Container {
  state = {
    addVideoModalToggled: false,
  };

  showAddVideoModal = async () => {
    await this.setState({ addVideoModalToggled : true});
    console.log(this.state.addVideoModalToggled);
  }
}

const modalcontainer = new ModalContainer();

export default modalcontainer;
