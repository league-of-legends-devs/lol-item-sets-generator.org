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
    console.log(this);
    return this.itemSets.sets;
  },
  filterSets: function (sets) {
    const filter = this.filter.get();
    const sortedSets = _.sortBy(sets, 'champion');
    // Define the ID of the item set (for the item set route)
    const indexedSets = _.map(sortedSets, (s, i) => { return { index: i + 1, set: s }; });
    let number = -1;
    let lastChampion = '';
    // Assign an incrementiel number for each champion
    const numberedChampsSets = _.map(indexedSets, s => {
      if (lastChampion != s.set.champion) {
        number++;
        lastChampion = s.set.champion;
      }
      return { index: s.index, set: s.set, championNumber: number };
    });
    let result = numberedChampsSets;
    if (filter && filter !== '') {
      const filterTxt = filter.toLowerCase();
      result = numberedChampsSets.filter(s => {
        return s.set.champion.toLowerCase().includes(filterTxt) || s.set.role.toLowerCase().includes(filterTxt);
      });
    }
    return { total: number, sets: result };
  }
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
