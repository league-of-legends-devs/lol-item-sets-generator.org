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
    // const lastItemSetGeneration = ItemSets.findOne();
    // const patch = lastItemSetGeneration ? lastItemSetGeneration.patchVersion : 'unknown';
    // return patch;
    const lastPatch = PatchVersions.findOne({}, { sort: { importDate: -1 } });
    const patch = lastPatch ? lastPatch.patchVersion : 'unknown';
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
  self.autorun(function () {
    // var handle = subscriptions.subscribe('ItemSets.last');
    const handle = subscriptions.subscribe('PatchVersions.limit');
    self.ready.set(handle.ready());
  });
});

Template.Patch.onRendered(function () {
});

Template.Patch.onDestroyed(function () {
});
