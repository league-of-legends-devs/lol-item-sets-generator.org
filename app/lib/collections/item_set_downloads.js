ItemSetDownloads = new Mongo.Collection('item_set_downloads');

ItemSetDownloadsSchema = new SimpleSchema({
  buildId: {
    type: String,
    label: 'Build ID'
  },
  count: {
    type: Number,
    label: 'Count'
  }
});

ItemSetDownloads.attachSchema(ItemSetDownloadsSchema);

if (Meteor.isServer) {
  ItemSetDownloads.allow({
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

  ItemSetDownloads.deny({
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
