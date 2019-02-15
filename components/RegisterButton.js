//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import UserContainer from '../Containers/UserContainer';

function RegisterButton() {
  return (
    <Link prefetch href="/register" as="/register">
      <a className="button is-light">Register</a>
    </Link>
  );
}

const RegisterButtonControl = () => (
  <Subscribe to={[UserContainer]}>
    {(usercontainer) => {
      if (!usercontainer.state.currentUser) {
        return <RegisterButton />;
      }
      return null;
    }}
  </Subscribe>
);

export default RegisterButtonControl;
