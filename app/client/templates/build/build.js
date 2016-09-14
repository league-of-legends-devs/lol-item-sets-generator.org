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
    const build = this.build || {};
    const owningItemSets = build.itemSets;
    const itemSet = build.itemSet;
    const leftLinks = [], rightLinks = [];
    if (owningItemSets) {
      leftLinks.push({
        route: 'SetsId',
        name: `Back to ${owningItemSets.patchVersion} sets`,
        data: {
          _id: owningItemSets._id.valueOf()
        }
      });
    } else {
      // TODO: Show "Back to the sets" if the current item sets generation is the latest
      leftLinks.push({
        route: 'Sets',
        name: `Back to the sets`
      });
    }
    const latestSetsId = build.latestItemSetsId.valueOf();
    const itemSetsId = owningItemSets && owningItemSets._id.valueOf();
    if (latestSetsId !== itemSetsId) {
      rightLinks.push({
        route: 'Build',
        name: `Latest ${itemSet.champion} build`,
        data: {
          _param1: itemSet.champion,
          _param2: itemSet.role
        }
      });
    }
    rightLinks.push({
      template: 'ButtonEditBuild',
      data: {
      }
    });
    return {
      left: leftLinks,
      right: rightLinks
    };
  },
  routeItemSet: function () {
    return this.build || {};
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
