Meteor.publish('ItemSets.id', function (id) {
  check(id, String);
  this.unblock();
  return ItemSets.find(new Meteor.Collection.ObjectID(id));
});
Meteor.publish('ItemSets.last', function () {
  this.unblock();
  return ItemSets.find({}, { sort: { patchVersion : -1, generationDate: -1 }, limit: 1 });
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

Meteor.publish('TwitterAnnouncements.last', function () {
  this.unblock();
  return TwitterAnnouncements.find({}, { sort: { creationDate: -1 }, limit: 1 });
});
