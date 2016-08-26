import styles from './home.mss';

/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  'click #getItemSets': function () {
    Router.go('/downloads/sets-from-website');
  },
  'click #getWindowsApplication': function () {
    Router.go('/downloads/windows-app-from-website');
  },
  'click #getMacApplication': function () {
    Router.go('/downloads/mac-app-from-website');
  }
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  styles: styles,
  sets_downloads: function () {
    const datas = this.home.downloads || {};
    const downloads = datas['sets-from-website'] || {};
    const count = downloads.count || 0;
    return count;
  },
  windows_app_downloads: function () {
    const datas = this.home.downloads || {};
    const downloads = datas['windows-app-from-website'] || {};
    const count = downloads.count || 0;
    return count;
  },
  mac_app_downloads: function () {
    const datas = this.home.downloads || {};
    const downloads = datas['mac-app-from-website'] || {};
    const count = downloads.count || 0;
    return count;
  },
  windows_app_version: function () {
    const data = this.home.versions || {};
    const version = data['windows-app'] || {};
    return version.version || 'unknown';
  },
  mac_app_version: function () {
    const data = this.home.versions || {};
    const version = data['mac-app'] || {};
    return version.version || 'unknown';
  },
  sets: function () {
    return Files.find();
  },
  totalDownloads: function () {
    return this.home.totalDownloads || 0;
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {
});

Template.Home.onRendered(function () {
});

Template.Home.onDestroyed(function () {
});
