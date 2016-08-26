import styles from './redirect.mss';

var timeout;

/*****************************************************************************/
/* Redirect: Event Handlers */
/*****************************************************************************/
Template.Redirect.events({
});

/*****************************************************************************/
/* Redirect: Helpers */
/*****************************************************************************/
Template.Redirect.helpers({
  styles: styles
});

/*****************************************************************************/
/* Redirect: Lifecycle Hooks */
/*****************************************************************************/
Template.Redirect.onCreated(function () {
});

Template.Redirect.onRendered(function () {
  timeout = setTimeout(() => {
    Router.go('Home'); // you're drunk
  }, 5000);
});

Template.Redirect.onDestroyed(function () {
  clearTimeout(timeout);
});
