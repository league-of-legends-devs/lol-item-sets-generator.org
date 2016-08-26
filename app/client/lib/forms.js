AutoForm.hooks({
  'guestbook--add_entry_form': {
    onSuccess: function (formType, result) {
      Session.set('guestbook--add_entry_form-result', { msg: 'Thank you ! Your entry will be shown after the admin validated it.' });
      Router.go('Guestbook');
    },
    onError: function (formType, error) {
      Session.set('guestbook--add_entry_form-result', { err: error.message });
      Router.go('Guestbook');
    }
  }
});
