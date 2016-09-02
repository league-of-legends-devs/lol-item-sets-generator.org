import styles from './nav_bar_create_and_search_sets.mss';

/*****************************************************************************/
/* NavBarCreateAndSearchSets: Event Handlers */
/*****************************************************************************/
Template.NavBarCreateAndSearchSets.events({
  'keyup [name="search"]': function (event, template) {
    let value = event.target.value.trim();
    this.textChangeHandler(value);
  }
});

/*****************************************************************************/
/* NavBarCreateAndSearchSets: Helpers */
/*****************************************************************************/
Template.NavBarCreateAndSearchSets.helpers({
  styles: styles
});

/*****************************************************************************/
/* NavBarCreateAndSearchSets: Lifecycle Hooks */
/*****************************************************************************/
Template.NavBarCreateAndSearchSets.onCreated(function () {
});

Template.NavBarCreateAndSearchSets.onRendered(function () {
});

Template.NavBarCreateAndSearchSets.onDestroyed(function () {
});
