import { Container } from "unstated";
import axios from "axios";
import Router from "next/router";

class VideoContainer extends Container {
  constructor() {
    super();

    this.state = {
      videoList: "",

    }
  }
}

let videocontainer = new VideoContainer();

export default videocontainer;