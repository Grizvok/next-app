import { Container } from 'unstated';


class VideoContainer extends Container {
  constructor() {
    super();

    this.state = {
      videoList: '',
    };
  }
}

const videocontainer = new VideoContainer();

export default videocontainer;
