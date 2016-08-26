import styles from './master_layout.mss';

Template.MasterLayout.events({
});

Template.MasterLayout.helpers({
  styles: styles
});

Template.MasterLayout.onCreated(function () {
	// TODO: Change chat login
	Session.set('chapp-username', '@Ilshidur');
});

Template.MasterLayout.onRendered(function () {
});

Template.MasterLayout.onDestroyed(function () {
});
