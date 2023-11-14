// docs: https://www.11ty.io/docs/config/
const eleventySass = require("eleventy-sass");
const pluginRev = require("eleventy-plugin-rev");
const pluginImages = require("./eleventy.config.images.js");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  // Generic functions
  function replaceAll(string, find, replace) {
    return string.replace(new RegExp(find, 'g'), replace);
  }

  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  eleventyConfig.addPlugin(pluginImages);

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

  eleventyConfig.addAsyncFilter("uppercase", async function(string) {
    return string.toUpperCase();
  });

  eleventyConfig.addShortcode("year", () => `${(new Date()).toLocaleString('en-US', {year: 'numeric'})}`);

  // Modified version, original via @https://www.seanmcp.com/articles/add-a-youtube-embedder-shortcode-to-your-eleventy-site/
  eleventyConfig.addShortcode("youtube", (embedId, title) => {
    let id;
    if (embedId.includes('//')) {
      const url = new URL(id);
      id = url.searchParams.get("v");
    } else {
      id = embedId;
    }

    return `
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player${
        title ? ` for ${title}` : ""
      }" frameborder="0" allowfullscreen></iframe>
      </div>
    `;
  });

  eleventyConfig.addFilter('stringify', (data) => {
    return JSON.stringify(data, null, "\t")
  });

  eleventyConfig.addFilter("strip_html", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content;
  });

  // Modified, original @ https://willvincent.com/2022/07/27/redirects-with-11ty-and-netlify/
  eleventyConfig.addFilter("redirect_course", (id, force) => {
    idString = id.split('-')[1]
    let idNum = Number(idString);
    let path;
    let format;

    if (idNum <= 9 || ( idNum >= 100 && idNum < 108 ) ) {
      format = 'old';
    } else {
      format = 'new';
    }

    if (format === 'new' || force === true) {
      if (force === true) {
        path = `/learning/course/course-v1:GYM+${idString}+0/`
      } else {
        path = `/courses/course-v1:GYM+${idString}+0/`
      }
    } else if (format === 'old') {
      path = `/courses/GYM/${idString}/0/`
    }

    // console.log(idNum, idString, path)
    return path;
  });

  eleventyConfig.addFilter('is_string', function(obj) {
    return typeof obj == 'string'
  })

  // smart-ish replace filter, which works on strings and objects
  eleventyConfig.addFilter('replace', function(input, string, replace) {
    let stringified = typeof input === 'object' ? JSON.stringify(input) : input;
    let output = JSON.parse(replaceAll(stringified, string, replace));
    return output;
  })

  // Modified version, original @https://stevenwoodson.com/blog/a-step-by-step-guide-to-sorting-eleventy-global-data-files-by-date/
  eleventyConfig.addFilter("sortDataByDate", (obj, dateField="date", order="asc") => {
    const sorted = {};

    Object.keys(obj)
      .sort((a,b) => {
        let sortOrder = order === 'desc' ? obj[a][dateField] > obj[b][dateField] : obj[b][dateField] > obj[a][dateField];
        return sortOrder ? 1 : -1;
      })
      .forEach((name) => (sorted[name] = obj[name]));
    return sorted;
  });

  eleventyConfig.addPlugin(pluginRev);

  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function(contents, inputPath) {
        return (data) => `${data.page.filePathStem.replace(/^\/scss\//, "/css/")}.css`;
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
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",  // default: "_includes"
      data: "_data",          // default: "_data"
    },
  };
};
