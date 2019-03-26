//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import { userStore } from '../Containers/UserContainer';

function RegisterButton() {
  return (
    <Link prefetch href="/register" as="/register">
      <a className="button is-light">Register</a>
    </Link>
  );
}

const RegisterButtonControl = () => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      if (!userstore.state.currentUser) {
        return <RegisterButton />;
      }
      return null;
    }}
  </Subscribe>
);

export default RegisterButtonControl;
