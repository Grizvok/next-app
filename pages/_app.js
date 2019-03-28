//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import { userStore } from '../Containers/UserContainer';

const loadUserTickets = async (user) => {
  const result = await fetch(`http://localhost:3000/api/ticket/${user}`).then(
    (r) => r.json()
  );
  return result.tickets;
};

const loadFollowedUsers = async (user) => {
  const result = await fetch(
    `http://localhost:3000/api/user/follow/${user}`
  ).then((r) => r.json());
  return result.data;
};

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = !!ctx.req;
    const userState = {};
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (isServer) {
      if (ctx.req.user) {
        const user = ctx.req.user.sci_user;

        userState.currentUser = user;
        userState.userTickets = await loadUserTickets(user);
        userState.followedUsers = await loadFollowedUsers(user);

        await userStore.initState(userState);

        return { serverState: userStore.state, pageProps };
      }
      return { pageProps };
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    if (process.browser) {
      userStore.initState(props.serverState);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider inject={[userStore]}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

// if (isServer) {
//   if (ctx.req.user) {
//     userState.currentUser = ctx.req.user.sci_user;
//     try {
//       const res = await fetch(
//         `http://localhost:3000/api/ticket/${ctx.req.user.sci_user}`
//       ).then((r) => r.json());
//       userState.userTickets = res.tickets;
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/user/follow/${ctx.req.user.sci_user}`
//         ).then((r) => r.json());
//         userState.followedUsers = res.data;
//       } catch (e) {
//         throw Error(e);
//       }
//     } catch (e) {
//       throw Error(e);
//     } finally {
//       await userStore.initState(userState);
//       return { serverState: userStore.state, pageProps };
//     }
//   }
//   return { pageProps };
// }
