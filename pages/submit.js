//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Router from 'next/router';

//our packages
import Layout from '../components/MyLayout.js';
import AddTicketForm from '../components/AddTicketForm';
import { userStore } from '../Containers/UserContainer';

export default class Submit extends React.Component {
  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          console.log(userstore.state);
          if (userstore.state.currentUser) {
            return (
              <Layout>
                <AddTicketForm />
              </Layout>
            );
          } else {
            return Router.push('/login');
          }
        }}
      </Subscribe>
    );
  }
}
