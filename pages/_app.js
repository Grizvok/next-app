//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import UserContainer from '../Containers/UserContainer';
import FollowedUserContainer from '../Containers/FollowedUsersContainer';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let followedUserContainer;
    let userContainer;
    let user;

    if (typeof Storage !== 'undefined') {
      user = localStorage.getItem('user');
      userContainer = new UserContainer({
        initialUser: user || '',
      });
    }

    if (ctx.req) {
      try {
        if (ctx.req.session.passport.user) {
          user = ctx.req.session.passport.user;
          userContainer = new UserContainer({
            initialUser: ctx.req.session.passport.user || '',
          });
        }
      } catch (e) {
        userContainer = new UserContainer();
      }
    }

    if (ctx.req) {
      console.log('this runs');
      const res = await fetch('http://localhost:3000/api/user/follow');
      console.log(res);
    }
    //declare user and call container method only on SSR
    let pageProps = {};
    //if getInitialProps is run on specific page component return those props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, userContainer };
  }

  render() {
    const { Component, pageProps, userContainer } = this.props;
    return (
      <Container>
        <Provider inject={[this.props.userContainer]}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

//CLASS CONTAINER METHODS MUST BE RUN IN THE RENDER PROPS FUNCTION
