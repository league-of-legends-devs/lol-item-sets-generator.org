import styles from './custom_sets.mss';

/*****************************************************************************/
/* CustomSets: Event Handlers */
/*****************************************************************************/
Template.CustomSets.events({
  'click .itemSet__ratingButton': function (e) {
    e.preventDefault();
    const buildId = $(e.target).data('id');
    const rating = $('#rating-' + buildId).data('userrating') || 1;
    Meteor.call('server/rateCustomItemSet', buildId, rating, (err) => {
      if (err) {
        $.notify({
          message: err.message,
          icon: 'glyphicon glyphicon-warning-sign'
        },{
          type: 'danger'
        });
        console.error(err);
      }
    });
  },
  'click .itemSet__reportLink': function (e) {
    e.preventDefault();

  },
  'change #sorting': function (e) {
    CustomItemSetsIndex
      .getComponentMethods()
      .addProps('sortBy', $(e.target).val());
  },
  'change #patchFilter': function (e) {
    CustomItemSetsIndex
      .getComponentMethods()
      .addProps('filter', { patchVersion: $(e.target).val() });
  }
});

/*****************************************************************************/
/* CustomSets: Helpers */
/*****************************************************************************/
Template.CustomSets.helpers({
  styles: styles,
  links: function () {
    const leftLinks = [];
    const rightLinks = [];
    leftLinks.push({
      route: 'Sets',
      name: 'Latest item sets'
    });
    rightLinks.push({
      template: 'NavBarLinkCreateBuild',
      data: {
      }
    });
    return {
      left: leftLinks,
      right: rightLinks
    };
  },
  patchVersions: () => {
    return PatchVersions.find().fetch()
  },
  customItemSetsIndex: () => CustomItemSetsIndex,
  inputAttributes: function (placeholder, classes) {
    return { type: 'text', class: ['easy-search-input', classes].join(' '), placeholder: placeholder };
  },
  searchInputStyles: () => `form-control input-lg ${styles.sorting}`,
  resultsCount: () => {
    return CustomItemSetsIndex.getComponentDict().get('count');
  },
  championImage: (patch, champion) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
  },
  itemImage: (patch, itemId) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`;
  },
  getIdFromObjectId: objectId => {
    return objectId.valueOf();
  },
  formatRatingId: buildId => 'rating-' + buildId,
  getRating: (itemSet) => {
    return lodash.head(itemSet.ratings || []).rating || 0;
  }
});

/*****************************************************************************/
/* CustomSets: Lifecycle Hooks */
/*****************************************************************************/
Template.CustomSets.onCreated(function () {
});

Template.CustomSets.onRendered(function () {
  const lastPatch = PatchVersions.findOne({}, { sort: { patchVersion: -1 } });
  CustomItemSetsIndex
    .getComponentMethods()
    .addProps('filter', { patchVersion: lastPatch.patchVersion });
});

Template.CustomSets.onDestroyed(function () {
});
