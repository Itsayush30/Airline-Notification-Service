const cron = require("node-cron");

/**
 * 10:00 AM
 * Every 5 minutes
 * We will check are their are there any pending emails which was expected to be sent
 * by now and is pending
 */

const setupJobs = () => {
  cron.schedule("*/5 * * * *", () => {});
};

module.exports = setupJobs;
