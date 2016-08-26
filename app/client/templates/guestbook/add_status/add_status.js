/*****************************************************************************/
/* GuestbookAddStatus: Event Handlers */
/*****************************************************************************/
Template.GuestbookAddStatus.events({
  'click .close': () => {
    Session.set('guestbook--add_entry_form-result', undefined);
  }
});

/*****************************************************************************/
/* GuestbookAddStatus: Helpers */
/*****************************************************************************/
Template.GuestbookAddStatus.helpers({
  cssStatus: () => {
    return (!Session.get('guestbook--add_entry_form-result').err) ? 'success' : 'danger';
  },
  status: () => {
    return Session.get('guestbook--add_entry_form-result');
  }
});

/*****************************************************************************/
/* GuestbookAddStatus: Lifecycle Hooks */
/*****************************************************************************/
Template.GuestbookAddStatus.onCreated(function () {
});

Template.GuestbookAddStatus.onRendered(function () {
});

Template.GuestbookAddStatus.onDestroyed(function () {
  Session.set('guestbook--add_entry_form-result', undefined);
});
