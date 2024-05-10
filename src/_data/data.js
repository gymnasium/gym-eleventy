const EleventyFetch = require('@11ty/eleventy-fetch');
const Parser = require('rss-parser');
let parser = new Parser();
const fs = require('node:fs');

const ENV = process.env.ELEVENTY_ENV;
const DATA_URL = process.env.DATA_URL || 'https://data.gym.soy';

const MARKET_FEED = 'https://assets.aquent.com/apps/gym/markets.json';
const JOB_FEED = 'https://aquentllc.wpengine.com/wp-json/aq-central/v1/jobs/listing?pageSize=500';

const JOB_OPTIONS = 'https://aquentllc.wpengine.com/wp-json/aq-central/v1/jobs/options';

module.exports = async function() {

  try {

    // let feed1 = await parser.parseURL(`https://medium.com/feed/gymnasium`);
    // let feed2 = await parser.parseURL(`https://medium.com/feed/@aquentgymnasium`);

    let jobs = await EleventyFetch(`${JOB_FEED}`, {
      duration: ENV === ('dev' || 'development' || 'default' || 'local') ? 0 : '30m',
      type: "json"
    });

    let markets = await EleventyFetch(MARKET_FEED, {
      duration: ENV === ('dev' || 'development' || 'default' || 'local') ? 0 : '24h',
      type: "json"
    });

    let job_options = await EleventyFetch(JOB_OPTIONS, {
      duration: ENV === ('dev' || 'development' || 'default' || 'local') ? 0 : '24h',
      type: "json"
    });

    // const feed = feed1.items.concat(feed2.items);

    return {
      // live values
      JOB_FEED: JOB_FEED,
      JOBDATA: {
        "jobs": jobs.items,
        "locations": job_options.locations,
        "placement_options": job_options.placement_options,
        "preferences": job_options.preferences,
        "roles": job_options.roles,
        "urls": {
          "AU": "https://aquent.com.au/find-work/",
          "DE": "https://aquent.com/find-work/",
          "FR": "https://aquent.fr/nos-offres/",
          "GB": "https://aquent.co.uk/find-work/",
          "JP": "https://aquent.co.jp/jobs/",
          "NL": "https://aquent.com/find-work/",
          "US": "https://aquent.com/find-work/",
        }
      },
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
