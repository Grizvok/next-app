import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'unstated';
import UserContainer from '../Containers/UserContainer';

let usercontainer = new UserContainer();



export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    //declare user and call container method only on SSR
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
        <Provider inject={[usercontainer]}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

//CLASS CONTAINER METHODS MUST BE RUN IN THE RENDER PROPS FUNCTION
