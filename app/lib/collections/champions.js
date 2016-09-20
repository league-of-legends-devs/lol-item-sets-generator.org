Champions = new Mongo.Collection('champions', { idGeneration: 'MONGO' });

ChampionsSchema = new SimpleSchema({
  index: {
    type: Number,
    label: 'Index'
  },
  id: {
    type: Number,
    label: 'Riot ID'
  },
  key: {
    type: String,
    label: 'Key'
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

Champions.attachSchema(ChampionsSchema);

if (Meteor.isServer) {
  Champions.allow({
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

  Champions.deny({
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
