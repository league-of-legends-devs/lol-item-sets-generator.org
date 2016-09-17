import styles from './approve_button.mss';

/*****************************************************************************/
/* ApproveButton: Event Handlers */
/*****************************************************************************/
Template.ApproveButton.events({
  'click button': function (e) {
    var docId = $(e.target).data('id');
    Meteor.call('server/approveEntry', docId, (err, result) => {
      if (err) {
        $.notify({
        	message: err,
          icon: 'glyphicon glyphicon-warning-sign'
        },{
        	type: 'danger'
        });
        return;
      }
      $.notify({
        message: 'Approved !',
        icon: 'glyphicons glyphicons-ok'
      },{
        type: 'success'
      });
    });
  }
});

/*****************************************************************************/
/* ApproveButton: Helpers */
/*****************************************************************************/
Template.ApproveButton.helpers({
  styles: styles,
  isApproved: function () {
    return this.value;
  },
  docId: function () {
    return this.doc._id;
  }
});

/*****************************************************************************/
/* ApproveButton: Lifecycle Hooks */
/*****************************************************************************/
Template.ApproveButton.onCreated(function () {
});

Template.ApproveButton.onRendered(function () {
});

Template.ApproveButton.onDestroyed(function () {
});
