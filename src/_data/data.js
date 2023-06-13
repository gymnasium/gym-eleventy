const EleventyFetch = require('@11ty/eleventy-fetch');
const Parser = require('rss-parser');
let parser = new Parser();

const ENV = process.env.ENV;
const CMS_URL = ENV === 'local' ? 'http://localhost:4000' : 'https://data.gym.soy';

module.exports = async function() {
  try {

    let complete = await EleventyFetch(`${CMS_URL}/feeds/complete.json`, {
      duration: ENV === 'local' ? 0 : '1m',
      type: "json"
    });

    let pages = await EleventyFetch(`${CMS_URL}/feeds/generated-pages.json`, {
      duration: ENV === 'local' ? 0 : '1m',
      type: "json"
    });

    let feed_url = await complete.items.config.feeds.blog;

    let feed = await parser.parseURL(feed_url);

    return {
      items: {
        bios: complete.items.bios,
        config: complete.items.config,
        courses: complete.items.courses,
        webinars: complete.items.webinars,
        tutorials: complete.items.tutorials,
        blog: feed.items,
        pages: pages.items
      }
    };
  } catch(e) {
    console.warn( "Failed fetching data feeds.", e );
    return {
      items: false
    };
  }
};
