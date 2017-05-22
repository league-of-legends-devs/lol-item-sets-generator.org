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
  }
});

/*****************************************************************************/
/* Add: Lifecycle Hooks */
/*****************************************************************************/
Template.Guestbook_Add.onCreated(function () {
});

Template.Guestbook_Add.onRendered(function () {
});

Template.Guestbook_Add.onDestroyed(function () {
});
