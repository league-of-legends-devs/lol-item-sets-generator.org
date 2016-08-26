/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/postEntry': function (doc) {
    check(doc, GuestbookEntriesFormSchema);
    var user = Meteor.users.findOne({ _id: this.userId });
    if (!user.services.twitter) {
      throw new Meteor.Error(403, 'You can\'t post if you are not authenticated with Twitter.', 'Can\'t post if not authenticated');
    }
    var username = `@${user.services.twitter.screenName}`;
    var userAlreadyPosted = GuestbookEntries.findOne({ author: username }) !== undefined;
    if (userAlreadyPosted) {
      throw new Meteor.Error(403, 'You can\'t post an entry twice. If you\'re having a problem, please contact us through our Twitter.', 'Can\'t post twice');
    }
    doc.author = username;
    var entriesCount = GuestbookEntries.find().count() + 1;
    doc.number = entriesCount;
    doc.answer = '';
    doc.date = Date.now();
    doc.approved = false;
    // TODO: check
    // check(doc, GuestbookEntries.simpleSchema());
    this.unblock();
    GuestbookEntries.insert(doc);
  },
  'server/approveEntry': function (entryId) {
    var user = Meteor.users.findOne({ _id: this.userId });
    if (!Roles.userIsInRole(user, ['admin'])) {
      throw new Meteor.Error(403, 'You can\'t approve an entry if you\'re not an admin.', 'Can\'t approve if not admin');
    }
    GuestbookEntries.update({ _id : entryId }, { $set: { approved: true } });
  },
  'server/registerDownload': function (type) {
    if (!Downloads.findOne({ type: type })) {
      const doc = {
        type: type,
        count: 1
      };
      check(doc, DownloadsSchema);
      Downloads.insert(doc);
    } else {
      Downloads.update({ type: type }, { $inc: { count: 1 } });
    }
  }
});
