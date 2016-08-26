TwitterAnnouncements = new Mongo.Collection('twitter_announcements');

TwitterAnnouncementsSchema = new SimpleSchema({
  id: {
    type: Number,
    label: 'ID'
  },
  shortenContent: {
    type: String,
    label: 'Shorten content',
    max: 300
  },
  creationDate: {
    type: Date,
    label: 'Date'
  }
});
TwitterAnnouncements.attachSchema(TwitterAnnouncementsSchema);

if (Meteor.isServer) {
  TwitterAnnouncements.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  TwitterAnnouncements.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
