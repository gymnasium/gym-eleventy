const EleventyFetch = require('@11ty/eleventy-fetch');
const Parser = require('rss-parser');
let parser = new Parser();

const site = require('./site.js');
const source = site.cms_url;

module.exports = async function() {
  try {

    let feed = await parser.parseURL(site.blog_feed);
 
    let bios = await EleventyFetch(`${source}/feeds/bios.json`, {
      duration: "1h",
      type: "json"
    });

    let pages = await EleventyFetch(`${source}/feeds/pages.json`, {
      duration: "1m",
      type: "json"
    });

    let courses = await EleventyFetch(`${source}/feeds/courses.json`, {
      duration: "1h",
      type: "json"
    });

    let webinars = await EleventyFetch(`${source}/feeds/webinars.json`, {
      duration: "1h",
      type: "json"
    });

    let tutorials = await EleventyFetch(`${source}/feeds/tutorials.json`, {
      duration: "1h",
      type: "json"
    });

    return {
      items: {
        bios: bios.items,
        courses: courses.items,
        webinars: webinars.items,
        tutorials: tutorials.items,
        blog: feed.items,
        pages: pages.items
      }
    };
  } catch(e) {
    console.warn( "Failed fetching courses.", e );
    return {
      courses: false
    };
  }
};
