Meteor.startup(function () {

  Accounts.onCreateUser(function (options, user) {
    console.log(user);
    user.profile = user.profile || {};
    // Create a empty array to avoid the Exception while invoking method 'adminCheckAdmin'
    // see : https://github.com/yogiben/meteor-admin/issues/260
    user.emails = [{ address: user.services.twitter.email }] || [];
    // The first user is an admin
    if (Meteor.users.find().count() === 0) {
      user.roles = ['admin'];
    }
    return user;
  });

});
