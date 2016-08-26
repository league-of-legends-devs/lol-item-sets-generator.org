import styles from './loading.mss';

Template.loading.rendered = function () {
  if (!Session.get('loadingSplash')) {
    this.loading = window.pleaseWait({
      logo: '/img/icon.png',
      backgroundColor: '#e4721a',
      loadingHtml: message + spinner
    });
    // Just show loading splash once
    Session.set('loadingSplash', true);
  }
};

Template.loading.destroyed = function () {
  if (this.loading) {
    this.loading.finish();
  }
};

var message = `<p class="${styles.loading_message}">Heimerdinger takes a long time to load this website ...</p>`;
var spinner = `<div class="${styles.spinner} sk-spinner sk-spinner-pulse"></div>`;
