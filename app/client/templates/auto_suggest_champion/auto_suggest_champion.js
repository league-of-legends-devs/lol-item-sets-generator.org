import styles from './auto_suggest_champion.mss';

/*****************************************************************************/
/* AutoSuggestChampion: Event Handlers */
/*****************************************************************************/
Template.AutoSuggestChampion.events({
});

/*****************************************************************************/
/* AutoSuggestChampion: Helpers */
/*****************************************************************************/
Template.AutoSuggestChampion.helpers({
  styles: styles,
  champion: function () {
    return this.doc;
  },
  championImage: (patch, champion) => {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
  }
});

/*****************************************************************************/
/* AutoSuggestChampion: Lifecycle Hooks */
/*****************************************************************************/
Template.AutoSuggestChampion.onCreated(function () {
});

Template.AutoSuggestChampion.onRendered(function () {
});

Template.AutoSuggestChampion.onDestroyed(function () {
});
