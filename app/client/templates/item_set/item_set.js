import styles from './item_set.mss';

/*****************************************************************************/
/* ItemSet: Event Handlers */
/*****************************************************************************/
Template.ItemSet.events({
  'click #itemSet--downloadButton': function () {
    const patch = this.itemSet.itemSets.patchVersion;
    const champion = this.itemSet.itemSet.champion;
    const role = this.itemSet.itemSet.role;
    // Omit all the "_id" fields
    const blocks = this.itemSet.itemSet.itemBlocks.map(b => lodash.omit(b, '_id')).map(b => {
      let block = b;
      block.items = block.items.map(i => lodash.omit(i, '_id'))
      return block;
    });
    const fileContent = {
      title: `${patch} ${role}`,
      type: 'custom',
      map: 'any',
      mode: 'any',
      priority: false,
      sortrank: 1,
      champion: champion,
      blocks: blocks
    };
    const blob = new Blob([JSON.stringify(fileContent, ' ', 2)], { type: 'text/json;charset=utf-8' });
    fileSaver.saveAs(blob, `${patch} ${champion} ${role}.json`);
    Meteor.call('server/registerItemSetDownload', this.itemSet.itemSet._id.valueOf(), (err) => {
      if (err) {
        $.notify({
          message: err,
          icon: 'glyphicon glyphicon-warning-sign'
        },{
          type: 'danger'
        });
      }
    });
    $.notify({
      message: `Copy/paste the content of the "ItemSets" folder in this directory and merge the folders : C:\\Riot Games\\League of Legends\\Config\\Champions`,
      icon: 'glyphicons glyphicons-ok'
    },{
      type: 'success'
    });
  }
});

/*****************************************************************************/
/* ItemSet: Helpers */
/*****************************************************************************/
Template.ItemSet.helpers({
  styles: styles,
  itemSets: function () {
    return this.itemSet.itemSets;
  },
  itemSet: function (set) {
    return this.itemSet.itemSet;
  },
  championImage: function () {
    const patch = this.itemSet.itemSets.patchVersion;
    const champion = this.itemSet.itemSet.champion;
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
  },
  itemImage: function (itemId) {
    const patch = this.itemSet.itemSets.patchVersion;
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`;
  }
});

/*****************************************************************************/
/* ItemSet: Lifecycle Hooks */
/*****************************************************************************/
Template.ItemSet.onCreated(function () {
});

Template.ItemSet.onRendered(function () {
});

Template.ItemSet.onDestroyed(function () {
});
