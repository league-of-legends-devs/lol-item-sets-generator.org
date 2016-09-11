var adminEmails = (process.env.ADMIN_MAIL) ? [process.env.ADMIN_MAIL] : [];

AdminConfig = {
  name: 'Admin',

  nonAdminRedirectRoute: 'Home',

  // black black-light blue blue-light green green-light purple purple-light red red-light yellow yellow-light
  skin: 'yellow',

  // colors here : https://github.com/dataloop/admin-lte/blob/master/less/core.less#L166

  adminEmails: adminEmails,

  collections: {
    ItemSets: {
      icon: 'puzzle-piece',
      color: 'purple',
      showEditColumn: false,
      showDelColumn: false,
      tableColumns: [
        { label: 'ID', name: '_id' },
        { label: 'Version', name: 'patchVersion' },
        { label: 'Date', name: 'generationDate', template: 'FormatedDate' }
      ]
    },
    Versions: {
      icon: 'code-fork',
      color: 'orange',
      showEditColumn: true,
      showDelColumn: true,
      tableColumns: [
        { label: 'Type', name: 'type' },
        { label: 'Version', name: 'version' },
        { label: 'Link', name: 'link' },
        { label: 'Date', name: 'date', template: 'FormatedDate' },
      ]
    },
    Downloads: {
      icon: 'download',
      color: 'green',
      showEditColumn: true,
      showDelColumn: false,
      tableColumns: [
        { label: 'Type', name: 'type' },
        { label: 'Count', name: 'count'}
      ]
    },
    GuestbookEntries: {
      icon: 'pencil',
      color: 'red',
      showEditColumn: true,
      showDelColumn: true,
      tableColumns: [
        { label: 'Date', name: 'date', template: 'FormatedDate' },
        { label: 'Author', name: 'author' },
        { label: 'Text', name: 'text' },
        { label: 'Answer', name: 'answer' },
        { label: 'Approved', name: 'approved', template: 'ApproveButton' }
      ]
    },
    TwitterAnnouncements: {
      icon: 'twitter',
      color: 'aqua',
      showEditColumn: true,
      showDelColumn: true,
      tableColumns: [
        { label: 'ID', name: 'id' },
        { label: 'Tweet', name: 'tweet' },
        { label: 'Shorten content', name: 'shortenContent' },
        { label: 'Date', name: 'creationDate', template: 'FormatedDate' }
      ]
    },
    Config: {
      icon: 'cog',
      color: 'navy',
      showEditColumn: true,
      showDelColumn: true,
      tableColumns: [
        { label: 'ID', name: 'id' },
        { label: 'Location', name: 'location' },
        { label: 'Value', name: 'value' }
      ]
    }
  }
};

AdminDashboard.addCollectionItem(function (collection, path) {
  if (collection === 'ItemSets') {
    return {
      title: 'List all',
      url: AdminDashboard.path('/sets')
    };
  }
});
Router.route('SetsList', {
  path: AdminDashboard.path('/sets'),
  controller: 'AdminController',
  onAfterAction: function () {
    Session.set('admin_title', 'ItemSets');
    Session.set('admin_subtitle', 'List all');
  }
});
AdminDashboard.addSidebarItem('Admin tools', {
  icon: 'cog',
  urls: [
    { title: 'Kadira panel', url: 'https://ui.kadira.io/apps/gy3c99FqmsSEawXXZ/dashboard/overview' }
  ]
});
