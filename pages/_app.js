//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import UserContainer from '../Containers/UserContainer';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let usercontainer;

    if (typeof Storage !== 'undefined') {
      const user = localStorage.getItem('user');
      usercontainer = new UserContainer({
        initialUser: user || '',
      });
    }

    if (ctx.req) {
      try {
        if (ctx.req.session.passport.user) {
          console.log('does this run?');
          usercontainer = new UserContainer({
            initialUser: ctx.req.session.passport.user || '',
          });
        }
      } catch (e) {
        usercontainer = new UserContainer();
      }
    }
    //declare user and call container method only on SSR
    let pageProps = {};
    //if getInitialProps is run on specific page component return those props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, usercontainer };
  }

  render() {
    const { Component, pageProps, usercontainer } = this.props;
    console.log(this.props.usercontainer);
    return (
      <Container>
        <Provider inject={[this.props.usercontainer]}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

//CLASS CONTAINER METHODS MUST BE RUN IN THE RENDER PROPS FUNCTION
