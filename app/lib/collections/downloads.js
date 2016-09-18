Downloads = new Mongo.Collection('downloads');

DownloadsSchema = new SimpleSchema({
  type: {
    type: String,
    label: 'Type',
    max: 64,
    unique: true,
    allowedValues: ['sets-from-website', 'sets-from-app', 'windows-app-from-website', 'mac-app-from-website', 'set-from-website']
  },
  count: {
    type: Number,
    label: 'Count'
  }
});

Downloads.attachSchema(DownloadsSchema);

if (Meteor.isServer) {
  Downloads.allow({
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

  Downloads.deny({
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
