import UserContainer from '../Containers/UserContainer';

const initializeUserContainer = (ctx) => {
  let usercontainer;

  if (typeof Storage !== 'undefined') {
    const user = localStorage.getItem('user');
    usercontainer = new UserContainer({
      initialUser: user || '',
    });
    return usercontainer;
  }
  if (ctx.req) {
    try {
      if (ctx.req.session.passport.user) {
        usercontainer = new UserContainer({
          initialUser: ctx.req.session.passport.user || '',
        });
      }
    } catch (e) {
      usercontainer = new UserContainer();
    }
  }
};

export default initializeUserContainer;
