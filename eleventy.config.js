// docs: https://www.11ty.io/docs/config/
const eleventySass = require('eleventy-sass');
const pluginRev = require('eleventy-plugin-rev');
const filters = require('./11ty.config/filters.js');
const shortcodes = require('./11ty.config/shortcodes.js');
const pluginImages = require('./11ty.config/images.js');
const yaml = require('js-yaml');

function filter(arr, criteria) {
  return arr.filter(function (obj) {
    return Object.keys(criteria).every(function (c) {
      return obj[c] == criteria[c];
    });
  });
}

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  });

  // create a catalog collection combining courses, tutorials, webinars
  eleventyConfig.addCollection('catalog', (collection) => {
    const courses = collection.getAll()[0].data.courses;
    const tutorials = collection.getAll()[0].data.tutorials;
    const webinars = collection.getAll()[0].data.webinars;

    const catalog = {...courses, ...tutorials, ...webinars}

    return catalog;
  });

  eleventyConfig.addFilter('find_webinar_id', (obj, id) => {


    const found = Object.keys(obj).filter(k => k.startsWith(id));

    return found;
  });

  // Get all static pages and perform intentional exclusions by directory
  eleventyConfig.addCollection('static', function(collectionApi) {
    let col = collectionApi.getFilteredByGlob("**/pages/**/**.{njk,html,md}");

    return col.filter(item => {
      if (
        !item.page.filePathStem.startsWith('/pages/courses/') && 
        !item.page.filePathStem.startsWith('/pages/tutorials/') && 
        !item.page.filePathStem.startsWith('/pages/webinars/') &&
        !item.page.filePathStem.startsWith('/pages/privacy-policy/')
        ) {
        return item;
      }
    })
  });

  eleventyConfig.addCollection('privacy', function(collectionApi) {
    let col = collectionApi.getFilteredByGlob("**/pages/**/**.{njk,html,md}");

    return col.filter(item => {
      if (item.page.filePathStem.startsWith('/pages/privacy-policy/')) {
        return item;
      }
    })
  });

  // this is our `hub pages` collection
  eleventyConfig.addCollection('collection', function (collection) {
    const col = Object.values(collection.getAll()[0].data.collection)
      .filter(item => {
        return item.exclude ? false : item;
      });
    // console.log(col);

    return col;
  });

  // return only live full courses
  eleventyConfig.addCollection('live_courses_full', function (collection) {
    const col = Object.values(collection.getAll()[0].data.courses)
      .filter(item => {
        const bool = item.type === 'full' && item.live;
        return bool ? item : false;
      });

    return col;
  });

  // return only live short courses
  eleventyConfig.addCollection('live_courses_short', function (collection) {
    const col = Object.values(collection.getAll()[0].data.courses)
      .filter(item => {
        const bool = item.type === 'short' && item.live;
        return bool ? item : false;
      });

    return col;
  });

  // return only live tutorials
  eleventyConfig.addCollection('live_tutorials', function (collection) {
    const col = Object.values(collection.getAll()[0].data.tutorials)
      .filter(item => {
        const bool = item.type === 'tutorial' && item.live;
        return bool ? item : false;
      });

    return col;
  });

  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(pluginImages);

  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension('yml', (contents) => yaml.load(contents));

  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function (contents, inputPath) {
        return (data) =>
          `${data.page.filePathStem.replace(/^\/scss\//, '/css/')}.css`;
      },
    },
    sass: {
      style: 'compressed',
      sourceMap: true,
    },
    rev: true,
  });

  eleventyConfig.setServerOptions({
    // Default values are shown:

    // Whether the live reload snippet is used
    liveReload: true,

    // Whether DOM diffing updates are applied where possible instead of page reloads
    domDiff: true,

    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 4040,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: [],

    // Show local network IP addresses for device testing
    showAllHosts: false,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },

    // Change the default file encoding for reading/serving files
    encoding: 'utf-8',

    // Show the dev server version number on the command line
    showVersion: true,
  });

  eleventyConfig.setQuietMode(true);

  return {
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes', // default: '_includes'
      data: '_data', // default: '_data'
    },
  };
};
