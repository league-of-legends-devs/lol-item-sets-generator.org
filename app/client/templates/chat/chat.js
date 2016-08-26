import styles from './chat.mss';

/*****************************************************************************/
/* Chat: Event Handlers */
/*****************************************************************************/
Template.Chat.events({
  'click #chat-show': function() {
    $('#chat-show').hide();
    $('#chat-box').show();
  },
  'click #chat-hide': function(event) {
    event.preventDefault();
    $('#chat-show').show();
    $('#chat-box').hide();
  }
});

/*****************************************************************************/
/* Chat: Helpers */
/*****************************************************************************/
Template.Chat.helpers({
  styles: styles,
  'users': function() { // TODO: Online users
    return Meteor.users.find({ "status.online": true }).count();
  }
});

/*****************************************************************************/
/* Chat: Lifecycle Hooks */
/*****************************************************************************/
Template.Chat.onCreated(function () {
});

Template.Chat.onRendered(function () {
});

Template.Chat.onDestroyed(function () {
});
