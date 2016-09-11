import styles from './header.mss';

/*****************************************************************************/
/* Header: Event Handlers */
/*****************************************************************************/
Template.Header.events({
});

/*****************************************************************************/
/* Header: Helpers */
/*****************************************************************************/
Template.Header.helpers({
  styles: styles,
  showLoginButtons: () => {
    return Template.instance().showLoginButtons.get();
  }
});

/*****************************************************************************/
/* Header: Lifecycle Hooks */
/*****************************************************************************/
Template.Header.onCreated(function () {
  let template = Template.instance();
  template.showLoginButtons = new ReactiveVar(true);
  Meteor.call('server/getConfig', 'showLoginButtons', function (err, response) {
    if (!err) {
      template.showLoginButtons.set(response.value == 'true');
    }
  });
});

Template.Header.onRendered(function () {
});

Template.Header.onDestroyed(function () {
});
