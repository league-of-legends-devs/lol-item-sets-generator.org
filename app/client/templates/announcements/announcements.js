import styles from './announcements.mss';

/*****************************************************************************/
/* Announcements: Event Handlers */
/*****************************************************************************/
Template.Announcements.events({
});

/*****************************************************************************/
/* Announcements: Helpers */
/*****************************************************************************/
Template.Announcements.helpers({
  styles: styles,
  tweet: () => {
    return TwitterAnnouncements.findOne();
  }
});

/*****************************************************************************/
/* Announcements: Lifecycle Hooks */
/*****************************************************************************/
Template.Announcements.onCreated(function () {
  this.subscribe('TwitterAnnouncements');
});

Template.Announcements.onRendered(function () {
});

Template.Announcements.onDestroyed(function () {
});
