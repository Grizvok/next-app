import React from 'react';
import Layout from "../components/MyLayout";
import RegisterForm from "../components/RegisterForm";
import UserContainer from "../Containers/UserContainer";

export default class RegisterPage extends React.Component {
  render() {
    return (
      <Layout>
        <RegisterForm />
      </Layout>
    );
  }
}
