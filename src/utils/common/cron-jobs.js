const cron = require("node-cron");
const { EmailService } = require("../../services");
const Mailer = require("../../config/email-config");

/**
 * 10:00 AM
 * Every 5 minutes
 * We will check are their are there any pending emails which was expected to be sent
 * by now and is pending
 */

const setupJobs = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("InsideCron");
    const response = await EmailService.getPendingEmails();
    //console.log(response);
    response.forEach((email) => {
      Mailer.sendMail(
        {
          //from: "ayush.flightservice@gmail.com",
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await EmailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
