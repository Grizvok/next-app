//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import UserContainer from '../Containers/UserContainer';
import FollowedUserContainer from '../Containers/FollowedUsersContainer';

let userContainer = new UserContainer();

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = !!ctx.req;
    // const user = isServer
    //   ? await fetch('http://localhost:3000/api/user')
    //   : 'FETCH FROM LOCAL STORAGE';

    let user;

    if (isServer) {
      if (ctx.req.user) {
        const temp = await fetch(
          `http://localhost:3000/api/user/${ctx.req.user}`
        );
        user = await temp.json();
      }
      console.log(user);
    }
    // if (typeof Storage !== 'undefined') {
    //   user = localStorage.getItem('user');
    //   userContainer = new UserContainer({
    //     initialUser: user || '',
    //   });
    // }

    // if (ctx.req) {
    //   try {
    //     if (ctx.req.session.passport.user) {
    //       user = ctx.req.session.passport.user;
    //       userContainer = new UserContainer({
    //         initialUser: ctx.req.session.passport.user || '',
    //       });
    //     }
    //   } catch (e) {
    //     userContainer = new UserContainer();
    //   }
    // }

    // if (ctx.req) {
    //   try {
    //     if (ctx.req.session.passport.user) {
    //       const res = await fetch('http://localhost:3000/api/follow');
    //       const resJSON = await res.json();
    //       console.log(ctx.req.session.passport.user);
    //       if (res.status === 200) {
    //         console.log(res.status);
    //       }
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
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
        <Provider inject={[userContainer]}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

//CLASS CONTAINER METHODS MUST BE RUN IN THE RENDER PROPS FUNCTION
