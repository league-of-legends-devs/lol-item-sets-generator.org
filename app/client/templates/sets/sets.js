import styles from './sets.mss';

/*****************************************************************************/
/* Sets: Event Handlers */
/*****************************************************************************/
Template.Sets.events({
});

/*****************************************************************************/
/* Sets: Helpers */
/*****************************************************************************/
Template.Sets.helpers({
  styles: styles,
  links: [{'route': 'Sets', 'name': 'Latest item sets'}],
  routeItemSets: function () {
    return this.itemSets;
  }
});

/*****************************************************************************/
/* Sets: Lifecycle Hooks */
/*****************************************************************************/
Template.Sets.onCreated(function () {
});

Template.Sets.onRendered(function () {
});

Template.Sets.onDestroyed(function () {
});
