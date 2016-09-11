import styles from './add.mss';

/*****************************************************************************/
/* Add: Event Handlers */
/*****************************************************************************/
Template.Guestbook_Add.events({
});

/*****************************************************************************/
/* Add: Helpers */
/*****************************************************************************/
Template.Guestbook_Add.helpers({
  styles: styles,
  links: {
    left: [{
      route: 'Guestbook',
      name: 'Back to the reviews'
    }]
  },
  formSchema: () => {
    return GuestbookEntriesFormSchema;
  },
  showLoginButtons: () => {
    return Template.instance().showLoginButtons.get();
  }
});

/*****************************************************************************/
/* Add: Lifecycle Hooks */
/*****************************************************************************/
Template.Guestbook_Add.onCreated(function () {
  let template = Template.instance();
  template.showLoginButtons = new ReactiveVar(false);
  Meteor.call('server/getConfig', 'showLoginButtons', function (err, response) {
    if (!err) {
      const enabled = response.value == 'true';
      template.showLoginButtons.set(enabled);
      if (!enabled) {
        Meteor.logout();
      }
    }
  });
});

Template.Guestbook_Add.onRendered(function () {
});

Template.Guestbook_Add.onDestroyed(function () {
});
