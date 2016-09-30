import styles from './edit.mss';

/*****************************************************************************/
/* Edit: Event Handlers */
/*****************************************************************************/
Template.Edit.events({
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
  }
});

/*****************************************************************************/
/* Edit: Lifecycle Hooks */
/*****************************************************************************/
Template.Edit.onCreated(function () {
});

Template.Edit.onRendered(function () {
});

Template.Edit.onDestroyed(function () {
});
