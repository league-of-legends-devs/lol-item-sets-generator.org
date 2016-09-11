Config = new Mongo.Collection('config');

ConfigSchema = new SimpleSchema({
  location: {
    type: String,
    label: 'Location',
    allowedValues: ['server', 'client', 'both']
  },
  id: {
    type: String,
    label: 'Name',
    unique: true,
    allowedValues: ['showLoginButtons', 'other']
  },
  value: {
    type: String,
    label: 'Value'
  }
});

Config.attachSchema(ConfigSchema);

if (Meteor.isServer) {
  Config.allow({
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

  Config.deny({
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
