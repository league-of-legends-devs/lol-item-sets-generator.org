import styles from './button_download_item_set.mss';

/*****************************************************************************/
/* ButtonDownloadItemSet: Event Handlers */
/*****************************************************************************/
Template.ButtonDownloadItemSet.events({
  'click .itemSet--downloadButton': function () {
    const patch = this.patchVersion;
    const champion = this.itemSet.champion;
    const role = this.itemSet.role;
    const author = this.author || 'LISG';
    // Omit all the "_id" fields
    const blocks = this.itemSet.itemBlocks.map(b => lodash.omit(b, '_id')).map(b => {
      let block = b;
      block.items = block.items.map(i => lodash.omit(i, '_id'))
      return block;
    });
    const fileContent = {
      title: `${patch} ${role} (${author})`,
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
    Meteor.call('server/registerItemSetDownload', this.itemSet._id.valueOf(), (err) => {
      if (err) {
        $.notify({
          message: err.message,
          icon: 'glyphicon glyphicon-warning-sign'
        },{
          type: 'danger'
        });
        console.error(err);
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
/* ButtonDownloadItemSet: Helpers */
/*****************************************************************************/
Template.ButtonDownloadItemSet.helpers({
  styles: styles
});

/*****************************************************************************/
/* ButtonDownloadItemSet: Lifecycle Hooks */
/*****************************************************************************/
Template.ButtonDownloadItemSet.onCreated(function () {
});

Template.ButtonDownloadItemSet.onRendered(function () {
});

Template.ButtonDownloadItemSet.onDestroyed(function () {
});
