CustomItemSets = new Mongo.Collection('custom_item_sets', { idGeneration: 'MONGO' });

CustomItemSetsSchema = new SimpleSchema({
  patchVersion: {
    type: String,
    label: 'Patch version',
    max: 10
  },
  title: {
    type: String,
    label: 'Title',
    max: 40
  },
  champion: {
    type: String,
    label: 'Champion'
  },
  role: {
    type: String,
    label: 'Role',
    allowedValues: ['Top', 'Jungle', 'Middle', 'ADC', 'Support']
  },
  author: {
    type: String,
    label: 'Author'
  },
  comment: {
    type: String,
    label: 'Author comment',
    max: 200
  },
  ratings: {
    type: [new SimpleSchema({
      rating: {
        type: Number,
        label: 'Rating',
        min: 1,
        max: 5
      },
      userId: {
        type: String,
        label: 'User ID'
      }
    })],
    label: 'Rating',
    optional: true,
    defaultValue: []
  },
  ratingsCount: {
    type: Number,
    label: 'Ratings count'
  },
  totalRating: {
    type: Number,
    label: 'Total rating',
    decimal: true,
    min: 0,
    max: 5
  },
  creationDate: {
    type: Date,
    label: 'Creation date'
  },
  accepted: {
    type: Boolean,
    label: 'Accepted'
  },
  itemBlocks: {
    type: [new SimpleSchema({
      items: {
        type: [new SimpleSchema({
          count: {
            type: Number,
            label: 'Count'
          },
          id: {
            type: String,
            label: 'ID'
          }
        })],
        label: 'Item',
        max: 10
      },
      type: {
        type: String,
        label: 'Type',
        max: 60
      }
    })],
    label: 'Item blocks',
    max: 6
  }
});
CustomItemSets.attachSchema(CustomItemSetsSchema);

CustomItemSetsIndex = new EasySearch.Index({
  collection: CustomItemSets,
  fields: [
    'title',
    'champion',
    'role',
    'author'
  ],
  engine: new EasySearch.MongoDB({
    selector: function (searchObject, options, aggregation) {
      // Retrieve the default selector
      let selector = this
        .defaultConfiguration()
        .selector(searchObject, options, aggregation)
      ;
      const filter = options.search.props.filter;
      if (filter) {
        selector = { ...selector, ...filter };
      }
      return selector;
    },
    sort: function (searchObject, options) {
      const sortBy = options.search.props.sortBy;
      if (!sortBy) {
        return;
      }
      if (sortBy === 'champion') {
        return {
          champion: -1
        };
      } else if (sortBy === 'totalRating') {
        return {
          totalRating: -1
        };
      } else if (sortBy === 'creationDate') {
        return {
          creationDate: -1
        };
      } else {
        throw new Meteor.Error('Invalid sort by prop passed');
      }
    },
    fields: function (searchObject, options) {
      // options.search.userId
      // return { ratings: 0 };
      return {
        patchVersion: 1,
        title: 1,
        champion: 1,
        role: 1,
        author: 1,
        comment: 1,
        ratingsCount: 1,
        totalRating: 1,
        creationDate: 1,
        accepted: 1,
        itemBlocks: 1,
        // Only return the user rating
        ratings: { $elemMatch: { userId: options.search.userId } }
      };
    }
  }),
  defaultSearchOptions: {
    limit: 10
  }
});

if (Meteor.isServer) {
  CustomItemSets.allow({
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

  CustomItemSets.deny({
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
