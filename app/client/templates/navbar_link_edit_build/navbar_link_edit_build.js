import styles from './navbar_link_edit_build.mss';

/*****************************************************************************/
/* NavbarLinkEditBuild: Event Handlers */
/*****************************************************************************/
Template.NavbarLinkEditBuild.events({
  'click #button-edit--button': function () {
    if (this.buttonData) {
      Router.go('EditSet', this.buttonData);
    } else {
      Router.go('Edit');
    }
  }
});

/*****************************************************************************/
/* NavbarLinkEditBuild: Helpers */
/*****************************************************************************/
Template.NavbarLinkEditBuild.helpers({
  styles: styles
});

/*****************************************************************************/
/* NavbarLinkEditBuild: Lifecycle Hooks */
/*****************************************************************************/
Template.NavbarLinkEditBuild.onCreated(function () {
});

Template.NavbarLinkEditBuild.onRendered(function () {
});

Template.NavbarLinkEditBuild.onDestroyed(function () {
});
