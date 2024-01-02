const { TicketRepository } = require("../Repositories");
const { Mailer } = require("../config");

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
  try {
    console.log("insideService");
    //console.log("Here->",mailFrom.to,mailTo)
    const response = await Mailer.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log("mailError");
    //console.log(error);
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
    const response = await ticketRepository.getPendingTickets();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateTicket(ticketId, data) {
  try {
    const response = await ticketRepository.update(ticketId, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendEmail,
  createTicket,
  getPendingEmails,
  updateTicket,
};
