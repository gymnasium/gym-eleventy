// docs: https://www.11ty.io/docs/config/
const eleventySass = require('eleventy-sass');
const pluginRev = require('eleventy-plugin-rev');
const { EleventyEdgePlugin, EleventyRenderPlugin } = require("@11ty/eleventy");
const filters = require('./11ty.config/filters.js');
const shortcodes = require('./11ty.config/shortcodes.js');
const clean = require("eleventy-plugin-clean");
const yaml = require('js-yaml');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

require('@dotenvx/dotenvx').config({ path: `.env.${process.env.NODE_ENV}` })

function filter(arr, criteria) {
  return arr.filter(function (obj) {
    return Object.keys(criteria).every(function (c) {
      return obj[c] == criteria[c];
    });
  });
}

module.exports = function (eleventyConfig) {

  eleventyConfig.addGlobalData('env', process.env);

  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  });

  // markdown-it options
  let mdOpts = {
    html: true,
    breaks: true,
    linkify: true
  };

  // markdown-it-attrs options
  const mdAttrs = {
    // optional, these are default options
    leftDelimiter: '{:', // modified to use `{:` instead of `{`
    rightDelimiter: '}',
    allowedAttributes: []  // empty array = all attributes are allowed
  }

  eleventyConfig.setLibrary('md', markdownIt(mdOpts)
    .use(markdownItAnchor)
    .use(markdownItAttrs, mdAttrs)
    );


  eleventyConfig.addPlugin(clean);
  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(EleventyEdgePlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);

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
    rev: false,
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
    watch: [

    ],

    // Show local network IP addresses for device testing
    showAllHosts: true,

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
