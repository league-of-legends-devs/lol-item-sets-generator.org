GuestbookEntries = new Mongo.Collection('guestbook_entries');

var formSchema = {
	text: {
		type: String,
		label: "Review text",
		max: 256
	}
};
GuestbookEntriesFormSchema = new SimpleSchema(formSchema);

GuestbookEntriesSchema = new SimpleSchema(Object.assign(formSchema, {
	author: {
		type: String,
		label: "Author",
		max: 100
	},
	number: {
		type: Number,
		label: "Number",
		max: 1000
	},
	answer: {
		type: String,
		label: "Answer",
		optional: true
	},
	date: {
		type: Date,
		label: "Date"
	},
	approved: {
		type: Boolean,
		label: "Approved"
	}
}));
GuestbookEntries.attachSchema(GuestbookEntriesSchema);

if (Meteor.isServer) {
	GuestbookEntries.allow({
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

	GuestbookEntries.deny({
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
