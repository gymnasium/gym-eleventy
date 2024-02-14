module.exports = {
  urls: {
    root: process.env.ROOT_URL || 'https://gym.soy',
    data: process.env.DATA_URL || 'https://data.gym.soy',
    cms: process.env.CMS_URL || 'https://studio.learn.gym.soy',
    lms: process.env.LMS_URL || 'https://learn.gym.soy',
    mfe: process.env.MFE_URL || 'https://apps.learn.gym.soy',
  },
  ports: {
    account: 1997,
    authn: 1999,
    course_about: 3000,
    discussions: 2002,
    learner_dashboard: 1996,
    learning: 2000,
    profile: 1995,
  }
};
