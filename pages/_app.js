import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import UserContainer from '../Containers/UserContainer';

// You just need to keep a couple things in mind:

// You are opting out of dependency injection, you won't be able to <Provider inject> another instance in your tests.
// Your instance will be local to whatever <Subscribe>'s you pass it to, you will end up with multiple instances of your container if you don't pass the same reference in everywhere.
// Also remember that it is okay to use <Provider inject> in your application code, you can pass your instance in there. It's probably better to do that in most scenarios anyways (cause then you get dependency injection and all that good stuff).

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    //declare user and call container method only on SSR
    let user;
    if (ctx.req && ctx.req.user) {
      user = ctx.req.user;
      UserContainer.addCurrentUser(user);
    }
    let pageProps = {};
    //if getInitialProps is run on specific page component return those props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

//CLASS CONTAINER METHODS MUST BE RUN IN THE RENDER PROPS FUNCTION
