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
  var self = this;
  const subscriptions = new SubsManager();
  self.ready = new ReactiveVar();
  self.autorun(function() {
      var handle = subscriptions.subscribe('TwitterAnnouncements.last');
      self.ready.set(handle.ready());
  });
});

Template.Announcements.onRendered(function () {
});

Template.Announcements.onDestroyed(function () {
});
