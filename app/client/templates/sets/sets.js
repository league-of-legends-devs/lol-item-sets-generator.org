import styles from './sets.mss';

/*****************************************************************************/
/* Sets: Event Handlers */
/*****************************************************************************/
Template.Sets.events({
});

/*****************************************************************************/
/* Sets: Helpers */
/*****************************************************************************/
Template.Sets.helpers({
  styles: styles,
  links: function () {
    let template = Template.instance();
    const olderSetsLinks = [];
    if (this.itemSets.id) {
      olderSetsLinks.push({
        route: 'Sets',
        name: 'Latest item sets'
      });
    }
    return {
      left: [
        ...olderSetsLinks
      ],
      right: {
        template: 'NavBarCreateAndSearchSets',
        data: {
          textChangeHandler: (text) => {
            template.searchQuery.set(text);
          }
        }
      }
    };
  },
  searchQuery: () => {
    return Template.instance().searchQuery;
  },
  routeItemSets: function () {
    return this.itemSets;
  }
});

/*****************************************************************************/
/* Sets: Lifecycle Hooks */
/*****************************************************************************/
Template.Sets.onCreated(function () {
  let template = Template.instance();
  template.searchQuery = new ReactiveVar('');
});

Template.Sets.onRendered(function () {
});

Template.Sets.onDestroyed(function () {
});
