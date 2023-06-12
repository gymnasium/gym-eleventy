// docs: https://www.11ty.io/docs/config/
const eleventySass = require("eleventy-sass");
const pluginRev = require("eleventy-plugin-rev");

module.exports = function(eleventyConfig) {

  eleventyConfig.addAsyncFilter("uppercase", async function(string) {
    return string.toUpperCase();
  });

  eleventyConfig.addFilter("year", () => {
    return (new Date()).toLocaleString('en-US', {year: 'numeric'});
  });

  eleventyConfig.addPlugin(pluginRev);

  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function(contents, inputPath) {
        return (data) => data.page.filePathStem.replace(/^\/scss\//, "/css/") + ".css";
      }
    },
    sass: {
      style: "compressed",
      sourceMap: true
    },
    rev: true
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
    encoding: "utf-8",

    // Show the dev server version number on the command line
    showVersion: true,
  });


  eleventyConfig.setQuietMode(true);
  
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
