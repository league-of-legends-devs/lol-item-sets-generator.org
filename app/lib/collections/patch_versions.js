PatchVersions = new Mongo.Collection('patchversions', { idGeneration: 'MONGO' });

PatchVersionsSchema = new SimpleSchema({
  patchVersion: {
    type: String,
    label: 'Patch version'
  },
  importDate: {
    type: Date,
    label: 'Import date'
  }
});

PatchVersions.attachSchema(PatchVersionsSchema);

if (Meteor.isServer) {
  PatchVersions.allow({
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

  PatchVersions.deny({
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
