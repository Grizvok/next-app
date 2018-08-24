import axios from "axios";
import Router from "next/router";
import Layout from "../components/MyLayout";
import DashHero from "../components/HeroWelcomeDash";
import usercontainer from "../Containers/UserContainer";

import { Subscribe } from "unstated";

class Dashboard extends React.Component {
  render() {
    return (
      <Subscribe to={[usercontainer]}>
        {usercontainer => {
          return (
            <Layout>
              <DashHero />
            </Layout>
          );
        }}
      </Subscribe>
    );
  }
}

export default Dashboard;

