import Header from './Header';
import '../scss/style.scss';

const Layout = props => (
  <div>
    {/* <Head /> */}
    <Header />
    {props.children}
  </div>
);

export default Layout;
