//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

//our packages
import UserContainer from '../Containers/UserContainer';

function LoginButton(props) {
  return (
    <Link prefetch href="/login" as="/login">
      <a className="navbar-item">Login</a>
    </Link>
  );
}

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <Link href="#">
            <a onClick={this.props.handleLogout} className="navbar-item">
              Logout
            </a>
          </Link>
        )}
      </Subscribe>
    );
  }
}

const LoginButtonControl = () => (
  <Subscribe to={[UserContainer]}>
    {(usercontainer) => {
      if (usercontainer.state.currentUser) {
        return <LogoutButton handleLogout={usercontainer.removeCurrentUser} />;
      }
      return <LoginButton />;
    }}
  </Subscribe>
);

// class LoginButtonControl extends React.Component {
//   render() {
//     return (
//       <div>
//         <UserConsumer>
//           {(state)} => (
//             <p>

//             </p>
//           )
//         </UserConsumer>
//       </div>
//     );
//   }
// }

// const LoginButtonControl = () => (
//   <Subscribe to={[UserContainer]}>
//     {(usercontainer) => {
//       const user = usercontainer.state.currentUser;
//       if (user) {
//         return <LogoutButton />;
//       }
//       return <LoginButton />;
//     }}
//   </Subscribe>
// );

// class LoginButtonControl extends React.Component {
//   return (
//     <Subscribe to={[usercontainer]}>
//       {}
//   )
// }

export default LoginButtonControl;
