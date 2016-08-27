import styles from './item_set.mss';

/*****************************************************************************/
/* ItemSet: Event Handlers */
/*****************************************************************************/
Template.ItemSet.events({
});

/*****************************************************************************/
/* ItemSet: Helpers */
/*****************************************************************************/
Template.ItemSet.helpers({
  styles: styles,
  shownSet: function () {
    return this.itemSet.itemSets;
  },
  getItemSetOfSet: function (set) {
    return this.itemSet.itemSet;
  },
  championImage: (patch, champion) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
  },
  itemImage: (patch, itemId) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`;
  }
});

/*****************************************************************************/
/* ItemSet: Lifecycle Hooks */
/*****************************************************************************/
Template.ItemSet.onCreated(function () {
});

Template.ItemSet.onRendered(function () {
});

Template.ItemSet.onDestroyed(function () {
});
