import styles from './guestbook.mss';

/*****************************************************************************/
/* Guestbook: Event Handlers */
/*****************************************************************************/
Template.Guestbook.events({
});

/*****************************************************************************/
/* Guestbook: Helpers */
/*****************************************************************************/
Template.Guestbook.helpers({
  styles: styles,
  links: {},
  entries: () => {
    return GuestbookEntries.find().fetch();
  },
  total_entries: () => {
    return GuestbookEntries.find().count();
  },
  isTwitter: (author) => {
    return author.startsWith('@');
  },
  dateToFormat: (rawDate) => {
    return {
      value: rawDate
    };
  }
});

/*****************************************************************************/
/* Guestbook: Lifecycle Hooks */
/*****************************************************************************/
Template.Guestbook.onCreated(function () {
});

Template.Guestbook.onRendered(function () {
});

Template.Guestbook.onDestroyed(function () {
});
