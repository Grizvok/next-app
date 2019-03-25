//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import UserContainer from '../Containers/UserContainer';
import userStore from '../helpers/localForage';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = !!ctx.req;
    let user;
    let tickets;

    // if SSR
    if (isServer) {
      if (ctx.req.user) {
        user = ctx.req.user.sci_user;
        const res = await fetch(`http://localhost:3000/api/ticket/${user}`);
        const ticketObj = await res.json();
        tickets = ticketObj.tickets;
      }
      if (!ctx.req.user) {
        user = '';
        tickets = [];
      }
    }

    if (process.browser) {
      // maybe refactor so this as an api call to get currently authed user if they exist?
      user = await userStore.getItem('user');
      tickets = await userStore.getItem('tickets');
    }

    //declare user and call container method only on SSR
    let pageProps = {};
    //if getInitialProps is run on specific page component return those props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, user, tickets };
  }

  render() {
    const { Component, pageProps } = this.props;
    const user = new UserContainer({
      initialUser: this.props.user || '',
      initialTickets: this.props.tickets || [],
    });

    return (
      <Container>
        <Provider inject={[user]}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

//CLASS CONTAINER METHODS MUST BE RUN IN THE RENDER PROPS FUNCTION
