const { TicketRepository } = require("../Repositories");
const { Mailer } = require("../config");

const ticketRepository = new TicketRepository();

async function sendEmail(mailForm, mailTo, subject, text) {
  try {
    const response = await Mailer.sendMail({
      from: mailForm,
      to: mailTo,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPendingEmails() {
  try {
    const response = await ticketRepositoryo.getPendingTickets();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  sendEmail,
  createTicket,
  getPendingEmails,
};
