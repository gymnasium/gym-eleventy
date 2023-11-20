module.exports = eleventyConfig => {

  eleventyConfig.addShortcode('year', () => `${new Date().toLocaleString('en-US', { year: 'numeric' })}`);

  // Modified version, original via @https://www.seanmcp.com/articles/add-a-youtube-embedder-shortcode-to-your-eleventy-site/
  eleventyConfig.addShortcode('youtube', (embedId, title) => {
    let id;
    if (embedId.includes('//') || embedId.includes('http://') || embedId.includes('https://')) {
      const url = new URL(id);
      id = url.searchParams.get('v');
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

  // via @ https://dev.to/psypher1/lets-learn-11ty-part-3-collections-shortcodes-macros-p0a
  eleventyConfig.addShortcode('headers', (title, subtitle) => 
    `<h1>${title}</h1>
    <p>${subtitle}</p>`);

}