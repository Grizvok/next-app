import React from 'react';
import Layout from "../components/MyLayout";
import RegisterForm from "../components/RegisterForm";

export default class RegisterPage extends React.Component {
  render() {
    return (
      <Layout>
        <RegisterForm />
      </Layout>
    );
  }
}
