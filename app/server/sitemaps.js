// required: page
// optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
// changefreq : always, hourly, daily, weekly, monthly, yearly, never

sitemaps.add('/sitemap.xml', () => {
  let out = [];

  out.push({ page: '/', priority: 1 });
  out.push({ page: '/reviews', priority: 0.5 });
  out.push({ page: '/sets', changefreq: 'daily', priority: 0.8 });

  const lastItemSet = ItemSets.findOne({}, { sort: { generationDate: -1 }, limit: 1 });
  const id = lastItemSet._id.valueOf();
  const pages = lastItemSet.sets;
  out.push({
    page: `/sets/${id}`,
    lastmod: lastItemSet.generationDate,
    changefreq: 'daily'
  });
  for (let pageIndex in pages) {
    out.push({
      page: `/sets/${id}/${pageIndex}`,
      lastmod: lastItemSet.generationDate,
      changefreq: 'daily'
    });
  }

  out.push({ page: '/privacy', priority: 0.5 });

  return out;
});
