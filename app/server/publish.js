Meteor.publish('ItemSets', function () {
  this.unblock();
  return ItemSets.find();
});

Meteor.publish('Downloads', function () {
  this.unblock();
  return Downloads.find();
});

Meteor.publish('Versions', function () {
  this.unblock();
  return Versions.find();
});

Meteor.publish('GuestbookEntries', function () {
  this.unblock();
  return GuestbookEntries.find({ approved: true });
});

Meteor.publish('TwitterAnnouncements', function () {
  this.unblock();
  return TwitterAnnouncements.find();
});
