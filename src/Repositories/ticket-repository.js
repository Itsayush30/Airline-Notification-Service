const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");
const { Op } = require("sequelize");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets() {
    const response = await Ticket.findAll({
      where: {
        status: "PENDING",
        notificationTime: { [Op.lte]: new Date() },
      },
    });
    return response;
  }
}

module.exports = TicketRepository;
