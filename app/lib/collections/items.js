Items = new Mongo.Collection('items', { idGeneration: 'MONGO' });

ItemsSchema = new SimpleSchema({
  index: {
    type: Number,
    label: 'Index'
  },
  id: {
    type: Number,
    label: 'Riot ID'
  },
  name: {
    type: String,
    label: 'Name'
  },
  importPatch: {
    type: String,
    label: 'Patch version'
  },
  importDate: {
    type: Date,
    label: 'Import date'
  }
});

Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {
  Items.allow({
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

  Items.deny({
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
