Meteor.startup(function () {
  Accounts.onCreateUser(function (options, user) {
    user.profile = {};
    // Create a empty array to avoid the Exception while invoking method 'adminCheckAdmin'
    // see : https://github.com/yogiben/meteor-admin/issues/260
    user.emails = [];
    // The first user is an admin
    if (Meteor.users.find().count() === 0) {
      user.roles = ['admin'];
    }
    return user;
  });
});
