AutoForm.hooks({
  'guestbook--add_entry_form': {
    onSuccess: function (formType, result) {
      $.notify({
      	message: 'Thank you ! Your entry will be shown after the admin validated it.',
        icon: 'glyphicon glyphicon-warning-sign'
      },{
      	type: 'success'
      });
      Router.go('Guestbook');
    },
    onError: function (formType, error) {
      $.notify({
      	message: error.message,
        icon: 'glyphicon glyphicon-warning-sign'
      },{
      	type: 'danger'
      });
      Router.go('Guestbook');
    }
  }
});
