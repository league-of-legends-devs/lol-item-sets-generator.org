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

ItemsIndex = new EasySearch.Index({
  collection: Items,
  fields: [
    'id',
    'name'
  ],
  engine: new EasySearch.MongoDB({
    sort: function (searchObject, options) {
      const sort = options.search.props.sort;
      if (!sort) {
        return {
          name: 1
        };
      }
      if (sort === 'ascending') {
        return {
          name: 1
        };
      } else if (sort === 'descending') {
        return {
          name: -1
        };
      } else {
        return {
          name: 1
        };
      }
    }
  }),
  defaultSearchOptions: {
    limit: 1000
  }
});

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
