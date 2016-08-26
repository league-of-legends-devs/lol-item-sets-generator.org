import styles from './formated_date.mss';

/*****************************************************************************/
/* FormatedDate: Event Handlers */
/*****************************************************************************/
Template.FormatedDate.events({
});

/*****************************************************************************/
/* FormatedDate: Helpers */
/*****************************************************************************/
Template.FormatedDate.helpers({
  styles: styles,
  formatedDate: function () {
    var rawDate = this.value;
    var momentDate = moment(rawDate);
    if (!momentDate.isValid()) {
      return '(date error)';
    }
    var formatedDate = momentDate.format('LLL');
    return formatedDate;
  }
});

/*****************************************************************************/
/* FormatedDate: Lifecycle Hooks */
/*****************************************************************************/
Template.FormatedDate.onCreated(function () {
});

Template.FormatedDate.onRendered(function () {
});

Template.FormatedDate.onDestroyed(function () {
});
