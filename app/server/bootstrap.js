import prerenderio from 'prerender-node';

Meteor.startup(function () {
  // Prerender
  var prerenderToken = process.env.PRERENDER_TOKEN;
  if (prerenderToken) {
    prerenderio.set('prerenderToken', prerenderToken);
    prerenderio.set('host', process.env.ROOT_URL);
    prerenderio.set('protocol', 'https');
    WebApp.rawConnectHandlers.use(prerenderio);
  }

  // Accounts.onCreateUser(function (options, user) {
  //   user.profile = {};
  //   // Create a empty array to avoid the Exception while invoking method 'adminCheckAdmin'
  //   // see : https://github.com/yogiben/meteor-admin/issues/260
  //   user.emails = [];
  //   // The first user is an admin
  //   if (Meteor.users.find().count() === 0) {
  //     user.roles = ['admin'];
  //   }
  //   return user;
  // });
});
