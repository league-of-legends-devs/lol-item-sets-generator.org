import styles from './patch.mss';

/*****************************************************************************/
/* Patch: Event Handlers */
/*****************************************************************************/
Template.Patch.events({
});

/*****************************************************************************/
/* Patch: Helpers */
/*****************************************************************************/
Template.Patch.helpers({
  patch: () => {
    const lastItemSetGeneration = ItemSets.findOne({}, { sort: { patchVersion : 1 }, limit: 1 });
    const patch = lastItemSetGeneration ? lastItemSetGeneration.patchVersion : 'unknown';
    return patch;
  }
});

/*****************************************************************************/
/* Patch: Lifecycle Hooks */
/*****************************************************************************/
Template.Patch.onCreated(function () {
  this.subscribe('ItemSets');
});

Template.Patch.onRendered(function () {
});

Template.Patch.onDestroyed(function () {
});
