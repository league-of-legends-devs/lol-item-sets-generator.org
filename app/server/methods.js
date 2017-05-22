// TODO: Limit the calls rate

/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/postEntry': function (doc) {
    this.unblock();
    GuestbookEntriesFormSchema.validate(doc);
    const user = Meteor.users.findOne({ _id: this.userId });
    if (!user.services.twitter) {
      throw new Meteor.Error(401, `You can't post if you are not authenticated with Twitter.`, `Can't post if not authenticated`);
    }
    const username = `@${user.services.twitter.screenName}`;
    const userAlreadyPosted = GuestbookEntries.findOne({ author: username }) !== undefined;
    if (userAlreadyPosted) {
      throw new Meteor.Error(403, `You can't post an entry twice. If you're having a problem, please contact us through our Twitter.`, `Can't post twice`);
    }
    doc.author = username;
    const entriesCount = GuestbookEntries.find().count() + 1;
    doc.number = entriesCount;
    doc.answer = '';
    doc.date = Date.now();
    doc.approved = false;
    // TODO: check
    // check(doc, GuestbookEntries.simpleSchema());
    GuestbookEntries.insert(doc);
  },
  'server/approveEntry': function (entryId) {
    this.unblock();
    check(entryId, String);
    const user = Meteor.users.findOne({ _id: this.userId });
    if (!Roles.userIsInRole(user, ['admin'])) {
      throw new Meteor.Error(401, `You can't approve an entry if you're not an admin.`, `Can't approve if not admin`);
    }
    GuestbookEntries.update({ _id : entryId }, { $set: { approved: true } });
  },
  'server/registerDownload': function (type) {
    this.unblock();
    check(type, String);
    if (!Downloads.findOne({ type: type })) {
      const doc = {
        type: type,
        count: 1
      };
      check(doc, DownloadsSchema);
      Downloads.insert(doc);
    } else {
      Downloads.update({ type: type }, { $inc: { count: 1 } });
    }
  },
  'server/registerItemSetDownload': function (buildId) {
    this.unblock();
    check(buildId, String);
    if (!ItemSetDownloads.findOne({ buildId: buildId })) {
      const doc = {
        buildId: buildId,
        count: 1
      };
      check(doc, ItemSetDownloadsSchema);
      ItemSetDownloads.insert(doc);
    } else {
      ItemSetDownloads.update({ buildId: buildId }, { $inc: { count: 1 } });
    }
    Meteor.call('server/registerDownload', 'set-from-website');
  },
  'server/getConfig': function (configName) {
    this.unblock();
    check(configName, String);
    const result = Config.findOne({ id: configName, location: { $in: ['both', 'client'] } });
    if (!result) {
      throw new Meteor.Error(404, 'Config not found.', 'Not found.');
    }
    return result;
  },
  'server/rateCustomItemSet': function (buildId, rating) {
    this.unblock();
    check(buildId, String);
    check(rating, Number);
    check(this.userId, String);
    if (rating < 0 || rating > 5)  {
      throw new Meteor.Error(422, `Rating exceeded allowed range.`, `Invalid parameter`);
    }
    const customBuild = CustomItemSets.findOne(new Meteor.Collection.ObjectID(buildId));
    if (!customBuild) {
      throw new Meteor.Error(404, 'Custom build not found.', 'Not found.');
    } else {
      const updatedRatings = lodash.reject(customBuild.ratings || [], r => r.userId === this.userId);
      const ratings = [...updatedRatings, { rating: Math.floor(rating), userId: this.userId }];
      const ratingsCount = ratings.length;
      const totalRating = ratings.reduce((total, current) => total + (current.rating || 0), 0) / ratingsCount;
      CustomItemSets.update(new Meteor.Collection.ObjectID(buildId), { $set: { ratingsCount: ratingsCount, totalRating: totalRating, ratings: ratings } });
    }
  }
});
