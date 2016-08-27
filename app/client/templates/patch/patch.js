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
  var self = this;
  const subscriptions = new SubsManager();
  self.ready = new ReactiveVar();
  self.autorun(function() {
      var handle = subscriptions.subscribe('ItemSets');
      self.ready.set(handle.ready());
  });
});

Template.Patch.onRendered(function () {
});

Template.Patch.onDestroyed(function () {
});
