//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import { userStore } from '../Containers/UserContainer';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = !!ctx.req;
    const userState = {};
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // if SSR
    if (isServer) {
      if (ctx.req.user) {
        userState.currentUser = ctx.req.user.sci_user;
        try {
          const res = await fetch(
            `http://localhost:3000/api/ticket/${ctx.req.user.sci_user}`
          ).then((r) => r.json());
          console.log(ctx.req.user);
          userState.userTickets = res.tickets;
          await userStore.initState(userState);
          return { serverState: userStore.state, pageProps };
        } catch (e) {
          console.log(e);
        }
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
