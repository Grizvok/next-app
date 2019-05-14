import React from 'react';
import AvatarCard from '../../components/AvatarCard';
import Layout from '../../components/MyLayout';
import UserNav from '../../components/UserNav';
import groupBy from '../../helpers/groupBy';
import UserActivity from '../../components/UserActivity';
import UserComments from '../../components/UserComments';
import TicketItem from '../../components/TicketItem';
import moment from 'moment';
import _ from 'lodash';
import UserTicket from '../../components/UserTicket';
import CommentedOnPost from '../../components/CommentedOnPost';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    const userTickets = await fetch(
      `http://localhost:3000/api/ticket/${context.query.id}`
    ).then((r) => r.json());

    const comments = await fetch(
      `http://localhost:3000/api/comment/user/${context.query.id}`
    ).then((r) => r.json());

    const groupedComments = groupBy(comments.comments, 'ticket_id_fkey');

    return {
      user: context.query.id,
      tickets: userTickets.tickets,
      comments: groupedComments,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      allActivity: [],
    };

    const { comments } = this.props;
    const { tickets } = this.props;

    const posts = Object.entries(comments);

    for (const [post, comment] of posts) {
      const grouping = {};
      grouping.comments = [];
      const postTitle = comment[0].ticket_title;
      const postCreator = comment[0].ticket_creator;

      grouping.post = { title: postTitle, postCreator: postCreator };

      let lastActivity = moment().format();

      comment.map((val) => {
        if (moment(val.comment_creation_date).isBefore(lastActivity)) {
          lastActivity = val.comment_creation_date;
        }
        grouping.lastActivity = lastActivity;
        grouping.comments.push(val);
      });

      this.state.allActivity.push(grouping);
    }

    tickets.map((ticket, index) => {
      ticket.lastActivity = ticket.ticket_creation_date;
      this.state.allActivity.push(ticket);
    });

    const sortedArray = _.orderBy(
      this.state.allActivity,
      'lastActivity',
      'desc'
    );

    this.state.allActivity = sortedArray;
  }

  componentDidUpdate({ user }) {
    if (this.props.user !== user) {
      const userComments = sortComments(this.props.comments);
      const userTickets = sortTickets(this.props.tickets);
      const state = [...userComments, ...userTickets];
      const sortedState = _.orderBy(state, 'lastActivity', 'desc');

      this.setState(() => ({
        allActivity: [...sortedState],
      }));
    }
  }

  render() {
    return (
      <Layout>
        <UserNav user={this.props.user} />
        <section className="hero is-bold is-light is-fullheight">
          <div className="hero-head">
            <div className="columns user-overview-columns">
              <div className="column is-9">
                {this.state.allActivity.map((item) => {
                  if (item.id) {
                    return <UserTicket user={this.props.user} ticket={item} />;
                  } else {
                    return (
                      <CommentedOnPost
                        user={this.props.user}
                        ticketID={item.comments[0].ticket_id_fkey}
                        comments={item.comments}
                        postCreator={item.post.postCreator}
                        postTitle={item.post.title}
                      />
                    );
                  }
                })}
              </div>
              <AvatarCard user={this.props.user} />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const sortComments = (comments) => {
  const state = [];
  const posts = Object.entries(comments);

  for (const [post, comment] of posts) {
    const grouping = {};
    grouping.comments = [];
    const postTitle = comment[0].ticket_title;
    const postCreator = comment[0].ticket_creator;

    grouping.post = { title: postTitle, postCreator: postCreator };

    let lastActivity = moment().format();

    comment.map((val) => {
      if (moment(val.comment_creation_date).isBefore(lastActivity)) {
        lastActivity = val.comment_creation_date;
      }
      grouping.lastActivity = lastActivity;
      grouping.comments.push(val);
    });
    state.push(grouping);
  }
  return state;
};

const sortTickets = (tickets) => {
  const state = [];
  tickets.map((ticket) => {
    ticket.lastActivity = ticket.ticket_creation_date;
    state.push(ticket);
  });
  return state;
};
