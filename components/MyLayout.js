//npm packages
import React from 'react';

//our packages
import Header from "./Header";
import "../scss/style.scss";

const Layout = props => (
    <div>
      {/* <Head /> */}
      <Header />
      {props.children}
    </div>
);

export default Layout;
