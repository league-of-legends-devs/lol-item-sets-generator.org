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
    const leftLinks = [];
    const rightLinks = [];
    if (this.itemSets.id) {
      leftLinks.push({
        route: 'Sets',
        name: 'Latest item sets'
      });
    }
    rightLinks.push({
      template: 'NavBarCreateAndSearchSets',
      data: {
        textChangeHandler: (text) => {
          template.searchQuery.set(text);
        }
      }
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
