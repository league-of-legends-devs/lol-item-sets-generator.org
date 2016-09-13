const title = 'LoL item sets generator';
const description = 'Download the best -generated- League of Legends recommended items.';

// TODO: Migrate the routes config to their Controllers
// TODO: Use reactive states instead of Session vars
// like : http://iron-meteor.github.io/iron-router/#setting-reactive-state-variables

if (Meteor.isClient) {
  Router.plugin('seo', {
    title: title,
    suffix: '',
    separator: '|',

    description: description,
    image: 'img/icon.png',

    meta: {
      keywords: [
        'lol',
        'league of legends',
        'item sets',
        'builds',
        'items',
        'recommended items',
        'generator',
        'builder',
        'ilshidur'
      ]
    },

    twitter: {
      card: description,
      creator: '@LoL_item_sets'
      // etc ...
    },

    og: {
      site_name: title,
      image: 'img/icon.png'
      // etc ...
    }
  });
}

Router.configure({
  layoutTemplate: 'MasterLayout',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'loading'
});

Router.route('/', {
  layoutTemplate: 'MasterLayout',
  name: 'Home',
  template: 'Home',
  controller: 'HomeController',
  where: 'client',
  data: function () {
    const lastItemSetGeneration = ItemSets.findOne({}, { sort: { patchVersion : -1, generationDate: -1 }, limit: 1 });
    let patchVersion = lastItemSetGeneration ? (lastItemSetGeneration.patchVersion || 'unknown') : 'unknown';
    const downloadsSources = ['sets-from-website', 'windows-app-from-website', 'mac-app-from-website'];
    let downloads = {};
    for (let source of downloadsSources) {
      downloads[source] = Downloads.findOne({ type: source }) || {};
    }
    const versionsSources = ['windows-app', 'mac-app'];
    let versions = {};
    for (let source of versionsSources) {
      versions[source] = Versions.findOne({ type: source }) || {};
    }
    let total = 0;
    const allDownloads = Downloads.find().fetch();
    for (let download of allDownloads) {
      total += download.count;
    }
    const routeData = Session.get('routeData') || {};
    routeData.home = {
      version: patchVersion,
      downloads: downloads,
      versions: versions,
      totalDownloads: total
    };
    Session.set('routeData', routeData);
    return routeData;
  },
  seo: {
    title: function () {
      const routeData = Session.get('routeData') || {};
      const data = routeData.home || {};
      const patchVersion = data.version;
      return `League of Legends item sets generator` + (patchVersion ? ` (patch ${patchVersion})` : '');
    }
  },
  fastRender: true
});

Router.route('/reviews', {
  layoutTemplate: 'MasterLayout',
  name: 'Guestbook',
  template: 'Guestbook',
  controller: 'GuestbookController',
  where: 'client',
  seo: {
    title: function () {
      return `Users reviews | ${title}`;
    }
  },
  fastRender: true
});
Router.route('/reviews/add', {
  layoutTemplate: 'MasterLayout',
  name: 'Guestbook_Add',
  template: 'Guestbook_Add',
  controller: 'GuestbookController',
  where: 'client',
  seo: {
    title: function () {
      return `Add a review | ${title}`;
    }
  },
  fastRender: true
});

Router.route('/sets', {
  layoutTemplate: 'MasterLayout',
  name: 'Sets',
  template: 'Sets',
  controller: 'SetsController',
  where: 'client',
  data: function () {
    let routeData = Session.get('routeData') || {};
    const lastItemSetGeneration = ItemSets.findOne({}, { sort: { patchVersion : -1, generationDate: -1 }, limit: 1 });
    routeData.itemSets = {
      id: this.params._id,
      sets: lastItemSetGeneration
    };
    Session.set('routeData', routeData);
    return routeData;
  },
  seo: {
    title: function () {
      return `Custom sets | ${title}`;
    }
  },
  fastRender: true
});
Router.route('/sets/:_id', {
  layoutTemplate: 'MasterLayout',
  name: 'SetsId',
  template: 'Sets',
  controller: 'SetController',
  where: 'client',
  data: function () {
    let routeData = Session.get('routeData') || {};
    let lastItemSetGeneration;
    if (!this.params._id) {
      Router.go('Sets');
    } else {
      lastItemSetGeneration = ItemSets.findOne(new Meteor.Collection.ObjectID(this.params._id));
    }
    routeData.itemSets = {
      id: this.params._id,
      sets: lastItemSetGeneration
    };
    Session.set('routeData', routeData);
    return routeData;
  },
  seo: {
    title: function () {
      const routeData = Session.get('routeData') || {};
      const itemSets = routeData ? routeData.itemSets : undefined;
      const setsId = itemSets ? itemSets.id : 'error';
      return `Items sets #${setsId} | ${title}`;
    }
  },
  fastRender: true
});
Router.route('/sets/:_param1/:_param2', {
  layoutTemplate: 'MasterLayout',
  name: 'Build',
  template: 'Build',
  controller: 'BuildController',
  where: 'client',
  data: function () {
    if (!this.params._param1 || !this.params._param2) {
      this.render('Redirect');
      return;
    }
    let routeData = Session.get('routeData') || {};
    if (this.params._param1.match(/^[0-9a-fA-F]{24}$/) && !isNaN(this.params._param2)) {
      // /id/number
      const id = this.params._param1;
      const number = this.params._param2;
      const itemSets = ItemSets.findOne(new Meteor.Collection.ObjectID(id));
      const latestItemSets = ItemSets.findOne({}, { sort: { patchVersion : -1, generationDate: -1 }, limit: 1 }, { reactive: false });
      if (!itemSets) {
        this.render('Redirect');
        return;
      }
      const itemSet = itemSets.sets[number - 1];
      if (!itemSet) {
        this.render('Redirect');
        return;
      }
      routeData.build = {
        id: id,
        number: number,
        itemSets: itemSets,
        itemSet: itemSet,
        latestItemSetsId: latestItemSets._id
      };
    } else {
      // /champion/role
      const champion = this.params._param1.toLowerCase();
      const role = this.params._param2.toLowerCase();
      const itemSets = ItemSets.findOne({}, { sort: { patchVersion : -1, generationDate: -1 }, limit: 1 }, { reactive: false });
      if (!itemSets) {
        this.render('Redirect');
        return;
      }
      const itemSetIndex = lodash.findIndex(itemSets.sets, s => s.champion.toLowerCase() == champion && s.role.toLowerCase() == role);
      if (itemSetIndex === -1) {
        this.render('Redirect');
        return;
      }
      const itemSet = itemSets.sets[itemSetIndex];
      if (!itemSet) {
        this.render('Redirect');
        return;
      }
      Router.go('Build', { _param1: itemSets._id.valueOf(), _param2: itemSetIndex + 1 });
    }
    Session.set('routeData', routeData);
    return routeData;
  },
  seo: {
    title: function () {
      const errorTitle = title;
      const routeData = Session.get('routeData') || {};
      const build = routeData.build;
      if (!build) {
        return errorTitle;
      }
      const itemSets = build.itemSets;
      const itemSet = build.itemSet;
      return `${itemSet.champion} - ${itemSet.role} (${itemSets.patchVersion}) #${build.id}/${build.number} | ${title}`;
    }
  },
  fastRender: true
});

Router.route('/privacy', {
  name: 'Privacy',
  controller: 'PrivacyController',
  where: 'client'
});

Router.route('/api/patch', function () {
  const lastItemSetGeneration = ItemSets.findOne({}, { sort: { patchVersion : -1, generationDate: -1 }, limit: 1 });
  if (!lastItemSetGeneration) {
    this.response.end(JSON.stringify({ err: 'Unknown patch version' }));
  }
  this.response.end(JSON.stringify({ version: lastItemSetGeneration.patchVersion, generationDate: lastItemSetGeneration.generationDate }));
}, { where: 'server' });
Router.route('/api/news', function () {
  const announcement = TwitterAnnouncements.findOne({}, { sort: { date : 1 }, limit: 1 });
  const content = announcement ? announcement.shortenContent : '';
  this.response.end(JSON.stringify({ text: content }));
}, { where: 'server' });

// TODO: Create routes/server.js
if (Meteor.isServer) {
  const fs = Npm.require('fs');

  function serveSets (response) {
    var file = process.env.ITEM_SETS_ZIP_LOCATION;
    var stat = null;
    try {
      stat = fs.statSync(file);
    } catch (_error) {
      response.statusCode = 404;
      console.log('404 : cannot find ' + process.env.ITEM_SETS_ZIP_LOCATION + ' file !');
      response.end();
      return;
    }
    var attachmentFilename = 'ItemSets.zip';
    response.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=' + attachmentFilename,
      'Content-Length': stat.size
    });
    fs.createReadStream(file).pipe(response);
  }

  function err404 (response) {
    response.writeHead(404);
    response.end('404 ! No app version found.');
  }

  Router.route('/downloads/sets-from-website', function () {
    Meteor.call('server/registerDownload', 'sets-from-website');
    serveSets(this.response);
  }, { where: 'server' });
  Router.route('/downloads/sets-from-app', function () {
    Meteor.call('server/registerDownload', 'sets-from-app');
    serveSets(this.response);
  }, { where: 'server' });
  Router.route('/downloads/windows-app-from-website', function () {
    Meteor.call('server/registerDownload', 'windows-app-from-website');
    const version = Versions.findOne({ type: 'windows-app' });
    if (!version || !version.link) {
      err404(this.response);
      return;
    }
    const link = version.link;
    this.response.writeHead(302, {
      'Location': link
    });
    this.response.end();
  }, { where: 'server' });
  Router.route('/downloads/mac-app-from-website', function () {
    Meteor.call('server/registerDownload', 'mac-app-from-website');
    const version = Versions.findOne({ type: 'mac-app' });
    if (!version || !version.link) {
      err404(this.response);
      return;
    }
    const link = version.link;
    this.response.writeHead(302, {
      'Location': link
    });
    this.response.end();
  }, { where: 'server' });

  // For backward compatibility with the oldest apps
  Router.route('/clicks/click.php', function () {
    // /clicks/click.php?id=dl_sets_from_application
    if (this.params.query.id === 'dl_sets_from_application') {
      this.response.writeHead(302, {
        'Location': '/download/sets'
      });
      this.response.end();
    } else {
      this.response.writeHead(302, {
        'Location': '/'
      });
      this.response.end();
    }
  }, { where: 'server' });
}
