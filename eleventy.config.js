// docs: https://www.11ty.io/docs/config/
const eleventySass = require('eleventy-sass');
const pluginRev = require('eleventy-plugin-rev');
const filters = require('./config/11ty.filters.js');
const shortcodes = require('./config/11ty.shortcodes.js');
const pluginImages = require('./config/11ty.images.js');
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

  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(filters);
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

  eleventyConfig.addCollection('catalog', (collection, arg) => {
    return collection.getAll()[0].data.catalog;
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
