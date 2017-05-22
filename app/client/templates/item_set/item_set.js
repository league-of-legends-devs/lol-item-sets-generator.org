import styles from './item_set.mss';

/*****************************************************************************/
/* ItemSet: Event Handlers */
/*****************************************************************************/
Template.ItemSet.events({
});

/*****************************************************************************/
/* ItemSet: Helpers */
/*****************************************************************************/
Template.ItemSet.helpers({
  styles: styles,
  shareData: function () {
    const champion = this.itemSet.itemSet.champion;
    const role = this.itemSet.itemSet.role;
    const patch = this.itemSet.itemSets.patchVersion;
    const author = this.itemSet.itemSet.author || 'LoL Item Sets Generator'
    const appDescription = AppConfig.appDescription;
    return {
      title: `${champion} ${role} - patch ${patch}`,
      author: author,
      description: ` ${appDescription}`,
      url: url.resolve(AppConfig.hostName, Iron.Location.get().originalUrl)
    };
  },
  itemSets: function () {
    return this.itemSet.itemSets;
  },
  itemSet: function (set) {
    return this.itemSet.itemSet;
  },
  championSplashArt: function () {
    const champion = this.itemSet.itemSet.champion;
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
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
