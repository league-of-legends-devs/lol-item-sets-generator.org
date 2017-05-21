import styles from './edit.mss';

/*****************************************************************************/
/* Edit: Event Handlers */
/*****************************************************************************/
Template.Edit.events({
  'change #editor__champSelect': function (e) {
    const champKey = e.target.value;
    const itemSet = Session.get('itemSet') || {};
    itemSet.champion = champKey;
    Session.set('itemSet', itemSet);
  },
  'click .sort__sortAscending': function (e) {
    ItemsIndex
      .getComponentMethods()
      .addProps('sort', 'ascending');
  },
  'click .sort__sortDescending': function (e) {
    ItemsIndex
      .getComponentMethods()
      .addProps('sort', 'descending');
  }
});

/*****************************************************************************/
/* Edit: Helpers */
/*****************************************************************************/
Template.Edit.helpers({
  styles: styles,
  links: function () {
    const leftLinks = [];
    const rightLinks = [];
    leftLinks.push({
      route: 'Sets',
      name: 'Latest item sets'
    });
    rightLinks.push({
      template: 'NavBarLinkVotes',
      data: {
      }
    });
    return {
      left: leftLinks,
      right: rightLinks
    };
  },
  roles: () => {
    return ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];
  },
  championImage: (patch, champion) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
  },
  itemImage: (patch, itemId) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`;
  },
  championsIndex: () => ChampionsIndex,
  itemsIndex: () => ItemsIndex,
  itemSet: () => {
    return Session.get('itemSet') || {};
  },
  styles__itemSet_item: () => {
    return 'col-lg-2 col-md-2 col-sm-2 col-xs-2';
  },
  styles__itemList_item: () => {
    return 'col-lg-1 col-md-1 col-sm-2 col-xs-2';
  },
  attributes: () => {
    return {
      id: 'editor__champSelect',
      placeholder: '(champion)',
      highlight: true
    };
  },
  changeConfiguration: () => {
    return function (config) {
      const previousLoad = config.load;
      config.load = (query, previousCallback) => {
        previousLoad(query, (docs) => {
          setTimeout(() => {
            const itemSet = Session.get('itemSet') || {};
            const championKey = itemSet.champion;
            $('#editor__champSelect')[0].selectize.setValue(championKey || docs[0].key);
          }, 100);
          previousCallback(docs);
        });
      };
      return config;
    };
  }
});

/*****************************************************************************/
/* Edit: Lifecycle Hooks */
/*****************************************************************************/
Template.Edit.onCreated(function () {
  const data = this.data || {};
  const build = data.build || {};
  const itemSet = build.itemSet || {};
  const patch = PatchVersions.findOne({}, { sort: { importDate: -1 } });
  itemSet.patchVersion = patch.patchVersion;
  Session.set('itemSet', itemSet);
});

Template.Edit.onRendered(function () {
  const sortableItemSet = document.getElementsByClassName('sortable__item-set');
  for (let i = 0; i < sortableItemSet.length; i++) {
    Sortable.create(sortableItemSet.item(i), {
      group: {
        name: 'items',
        pull: true,
        put: true
      },
      sort: true,
      animation: 100
    });
  }
  const sortableItemsList = document.getElementsByClassName('sortable__items-list');
  for (let i = 0; i < sortableItemsList.length; i++) {
    Sortable.create(sortableItemsList.item(i), {
      group: {
        name: 'items',
        pull: 'clone',
        put: false
      },
      sort: false,
      animation: 100
    });
  }
});

Template.Edit.onDestroyed(function () {
});
