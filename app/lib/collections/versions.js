Versions = new Mongo.Collection('versions');

VersionsSchema = new SimpleSchema({
  type: {
    type: String,
    label: 'Type',
    max: 64,
    unique: true,
    allowedValues: ['windows-app', 'mac-app']
  },
  version: {
    type: String,
    label: 'Text',
    max: 64
  },
  link: {
    type: String,
    label: 'Link',
    max: 500
  },
  date: {
    type: Date,
    label: 'Date'
  }
});
Versions.attachSchema(VersionsSchema);

if (Meteor.isServer) {
  Versions.allow({
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

  Versions.deny({
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
