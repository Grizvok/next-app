//npm packages
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import fetch from 'isomorphic-unfetch'; 

//our packages
import UserContainer from '../Containers/UserContainer';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (ctx.req) {
      usercontainer = new UserContainer({
        initialUser: ctx.req.session.passport
      })
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
