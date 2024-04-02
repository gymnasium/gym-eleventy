module.exports = {
  urls: {
    root_domain: process.env.ROOT_DOMAIN || 'gym.soy',
    root: process.env.ROOT_URL || 'https://gym.soy',
    data: process.env.DATA_URL || 'https://data.gym.soy',
    cms: process.env.CMS_URL || 'https://studio.learn.gym.soy',
    lms: process.env.LMS_URL || 'https://learn.gym.soy',
    mfe: process.env.MFE_URL || 'https://apps.learn.gym.soy',
  },
  ports: {
    account: process.env.MFE_PORT_ACCOUNT || 1997,
    authn: process.env.MFE_PORT_AUTHN || 1999,
    course_about: process.env.MFE_PORT_COURSE_ABOUT || 3000,
    discussions: process.env.MFE_PORT_DISCUSSIONS || 2002,
    learner_dashboard: process.env.MFE_PORT_LEARNER_DASHBOARD || 1996,
    learning: process.env.MFE_PORT_LEARNING || 2000,
    profile: process.env.MFE_PORT_PROFILE || 1995,
  },
};
