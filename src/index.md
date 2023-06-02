---
layout: layouts/main.njk
---
# Hello
Welcome to the Gymnasium 11ty test area, in which we explore its various features.

### Prerequisites/Goals
- import JSON data via our Jekyll-based static site (aka gymcms)
- render CSS from SASS/SCSS

### Advantages
- runs on node.js
- very fast build time
- supports a bunch of templating languages out of the box:
  - HTML *.html
  - <b>Markdown *.md</b>
  - JavaScript *.11ty.js
  - <b>Liquid *.liquid</b>
  - Nunjucks *.njk
  - Mustache *.mustache
  - EJS *.ejs
  - Haml *.haml
  - Pug *.pug
  - JavaScript Template Literals *.jstl
- easily create pages from data
- plugins available to extend core functionality
  - SASS plugin to overcome the disadvantage described below...
- supports nested layouts
- now has an `<is-land>` component (probably to compete with Astro): https://www.11ty.dev/docs/performance/#site-performance
- strong community base: https://www.11ty.dev/docs/community/


### Disadvantages
- doesn't support SASS/SCSS out of the box (requires plugins or additional configuration)

### Further reading
- https://www.brycewray.com/posts/2022/12/things-worth-watching-astro-eleventy-pipelines/
- https://11ty.rocks/eleventyjs/
- https://rphunt.github.io/eleventy-walkthrough/
