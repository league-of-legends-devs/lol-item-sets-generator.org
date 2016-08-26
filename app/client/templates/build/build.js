import styles from './build.mss';

/*****************************************************************************/
/* Build: Event Handlers */
/*****************************************************************************/
Template.Build.events({
});

/*****************************************************************************/
/* Build: Helpers */
/*****************************************************************************/
Template.Build.helpers({
  styles: styles,
  links: function () {
    let owningItemSets = this.build.itemSets;
    if (!owningItemSets) {
      return [{
        route: 'Sets',
        name: `Back to the sets`
      }];
    }
    return [{
      route: 'SetsId',
      name: `Back to ${owningItemSets.patchVersion} sets`,
      _id: owningItemSets._id.valueOf()
    }];
  },
  routeItemSet: function () {
    return this.build;
  }
});

/*****************************************************************************/
/* Build: Lifecycle Hooks */
/*****************************************************************************/
Template.Build.onCreated(function () {
  this.subscribe('ItemSets');
});

Template.Build.onRendered(function () {
});

Template.Build.onDestroyed(function () {
});
