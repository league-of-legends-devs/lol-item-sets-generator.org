Meteor.publish('ItemSets', function () {
  return ItemSets.find();
});

Meteor.publish('Downloads', function () {
  return Downloads.find();
});

Meteor.publish('Versions', function () {
  return Versions.find();
});

Meteor.publish('GuestbookEntries', function () {
  return GuestbookEntries.find({ approved: true });
});

Meteor.publish('TwitterAnnouncements', function () {
  return TwitterAnnouncements.find();
});
