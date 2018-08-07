import Header from "./Header";
import "../scss/style.scss";
import { Provider } from "unstated";

const Layout = props => (
  <Provider>
    <div>
      {/* <Head /> */}
      <Header />
      {props.children}
    </div>
  </Provider>
);

export default Layout;
