const EleventyFetch = require('@11ty/eleventy-fetch');
const Parser = require('rss-parser');
let parser = new Parser();
const fs = require('node:fs');

const ENV = process.env.ELEVENTY_ENV;
const DATA_URL = process.env.DATA_URL || 'https://data.gym.soy';

const MARKET_FEED = 'https://assets.aquent.com/apps/gym/markets.json';
const JOB_FEED = 'https://assets.aquent.com/apps/gym/jobs.json';

module.exports = async function() {

  try {

    // let feed1 = await parser.parseURL(`https://medium.com/feed/gymnasium`);
    // let feed2 = await parser.parseURL(`https://medium.com/feed/@aquentgymnasium`);

    let jobs = await EleventyFetch(`${JOB_FEED}?limit=1500`, {
      duration: ENV === ('dev' || 'development' || 'default' || 'local') ? 0 : '30m',
      type: "json"
    });

    let markets = await EleventyFetch(MARKET_FEED, {
      duration: ENV === ('dev' || 'development' || 'default' || 'local') ? 0 : '24h',
      type: "json"
    });

    // const feed = feed1.items.concat(feed2.items);

    return {
      // live values
      jobs: jobs.items,
      markets: markets.items,
      // blog: feed,
    };
  } catch(e) {
    console.warn( "Failed fetching data feeds.", e );
    return {
      items: false
    };
  }
};
