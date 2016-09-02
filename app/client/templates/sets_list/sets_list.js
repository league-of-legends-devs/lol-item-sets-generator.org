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
  filter: function () {
    return this.filter.get();
  },
  getIdFromObjectId: objectId => {
    return objectId.valueOf();
  },
  shownItemSets: function () {
    return this.itemSets.sets;
  },
  filterSets: function (sets) {
    const filter = this.filter.get();
    if (filter && filter !== '') {
      const filterTxt = filter.toLowerCase();
      return sets.filter(s => {
        return s.champion.toLowerCase().includes(filterTxt) || s.role.toLowerCase().includes(filterTxt);
      });
    }
    return sets;
  },
  championImage: (patch, champion) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
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
