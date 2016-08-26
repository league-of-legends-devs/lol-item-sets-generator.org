ItemSets = new Mongo.Collection('itemsets', { idGeneration: 'MONGO' });

SetSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  champion: {
    type: String,
    label: 'Champion'
  },
  role: {
    type: String,
    label: 'Role'
  },
  isCustom: {
    type: Boolean,
    label: 'Is custom'
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
        label: 'Item'
      },
      type: {
        type: String,
        label: 'Type'
      }
    })],
    label: 'Item blocks'
  }
});

ItemSetsSchema = new SimpleSchema({
	patchVersion: {
		type: String,
		label: 'Patch version',
		max: 64
	},
	generationDate: {
		type: Date,
		label: 'Date'
	},
  sets: {
    type: [SetSchema],
    label: 'Item sets'
  }
});
ItemSets.attachSchema(ItemSetsSchema);

if (Meteor.isServer) {
	ItemSets.allow({
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

	ItemSets.deny({
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
