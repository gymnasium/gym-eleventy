// Generic functions
function replaceAll(string, find, replace) {
  return string.replace(new RegExp(find, 'g'), replace);
}

// sort by order
function sortByOrder(values) {
  let vals = [...values]; // this *seems* to prevent collection mutation...
  return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
}

module.exports = eleventyConfig => {
  // DEBUG: Show object keys
  eleventyConfig.addFilter('object_keys', (obj) => Object.keys(obj));

  // DEBUG: Show object values
  eleventyConfig.addFilter('object_values', (obj) => Object.values(obj));

  // DEBUG: Show object values
  eleventyConfig.addFilter('object_entries', (obj) => Object.entries(obj));

  // extract items from objects or arrays
  eleventyConfig.addFilter('pluck', function (obj, attr, value) {
    let arr;
    if (typeof obj === 'object') {
      arr = Object.values(obj);
    } else if (typeof obj === 'array') {
      arr = obj;
    } else {
      console.error(`Oops, the pluck filter accepts either an object or an array!`);
    }

    const filtered = arr.filter((item) => {
      return item[attr].includes(value);
    });

    return filtered;
  });

  eleventyConfig.addFilter('uppercase', (string) => {
    return string.toUpperCase();
  });
  
  eleventyConfig.addFilter('date', (date, dateFormat) => {
    return format(date, dateFormat);
  });

  eleventyConfig.addFilter('stringify', (data) => {
    return JSON.stringify(data, null, '\t');
  });

  eleventyConfig.addFilter('strip_html', (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, '');
    return content;
  });

  // Modified, original @ https://willvincent.com/2022/07/27/redirects-with-11ty-and-netlify/
  eleventyConfig.addFilter('redirect_course', (id, force) => {
    idString = id.split('-')[1];
    let idNum = Number(idString);
    let path;
    let courseType;

    if (idNum <= 9 || (idNum >= 100 && idNum < 108)) {
      courseType = 'old';
    } else {
      courseType = 'new';
    }

    if (courseType === 'new' || force === true) {
      if (force === true) {
        path = `/learning/course/course-v1:GYM+${idString}+0/`;
      } else {
        path = `/courses/course-v1:GYM+${idString}+0/`;
      }
    } else if (courseType === 'old') {
      path = `/courses/GYM/${idString}/0/`;
    }

    // console.log(idNum, idString, path)
    return path;
  });

  eleventyConfig.addFilter('is_string', (obj) => {
    return typeof obj === 'string';
  });

  eleventyConfig.addFilter('is_object', (obj) => {
    return typeof obj === 'object';
  });

  // smart-ish replace filter, which works on strings and objects
  eleventyConfig.addFilter('replace', (input, string, replace) => {
    let stringified = typeof input === 'object' ? JSON.stringify(input) : input;
    let output = JSON.parse(replaceAll(stringified, string, replace));
    return output;
  });

  // Modified version, original @https://stevenwoodson.com/blog/a-step-by-step-guide-to-sorting-eleventy-global-data-files-by-date/
  eleventyConfig.addFilter('sortDataByDate', (obj, dateField = 'date') => {
      const sorted = {};

      const values = Object.values(obj);

      values
        .sort((a, b) => {
          let sortOrder = a[dateField].toISOString() > b[dateField].toISOString();
          return sortOrder ? 1 : -1;
        })
        .forEach((name) => (sorted[name] = values[name]));

      return values;
    }
  );

  eleventyConfig.addFilter('sortByOrder', sortByOrder);


  eleventyConfig.addFilter('sortByTitle', values => {
    return values.sort((a, b) => a.title.localeCompare(b.title))
  })

  eleventyConfig.addFilter('sortByUrl', values => {
    return values.sort((a, b) => a.url.localeCompare(b.url))
  })
}