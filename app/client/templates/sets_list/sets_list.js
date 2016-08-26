import styles from './sets_list.mss';

/*****************************************************************************/
/* SetsList: Event Handlers */
/*****************************************************************************/
Template.SetsList.events({
});

/*****************************************************************************/
/* SetsList: Helpers */
/*****************************************************************************/
Template.SetsList.helpers({
  styles: styles,
  getIdFromObjectId: objectId => {
    return objectId.valueOf();
  },
  shownItemSets: function () {
    return this.itemSets.sets;
  },
  championImage: (patch, champion) => {
    return `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
  },
  getSetNumberFromIndex: index => index + 1
});

/*****************************************************************************/
/* SetsList: Lifecycle Hooks */
/*****************************************************************************/
Template.SetsList.onCreated(function () {
});

Template.SetsList.onRendered(function () {
});

Template.SetsList.onDestroyed(function () {
});
