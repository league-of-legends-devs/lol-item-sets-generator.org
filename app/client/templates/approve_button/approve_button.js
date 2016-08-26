/*****************************************************************************/
/* ApproveButton: Event Handlers */
/*****************************************************************************/
Template.ApproveButton.events({
  'click button': function (e) {
    var docId = $(e.target).data('id');
    Meteor.call('server/approveEntry', docId, (err, result) => {
      if (err) {
        alert(err);
      }
    });
  }
});

/*****************************************************************************/
/* ApproveButton: Helpers */
/*****************************************************************************/
Template.ApproveButton.helpers({
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
