import Header from "./Header";
import "../scss/style.scss";
import { Provider } from "unstated";
import UserContainer from "../Containers/UserContainer";

const Layout = props => (
    <div>
      {/* <Head /> */}
      <Header />
      {props.children}
    </div>
);

export default Layout;
