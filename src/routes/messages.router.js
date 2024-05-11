const messageController = require("../controllers/message.controllers.js");
const MessagesController = require ("../controllers/message.controllers.js");
const CustomRouter = require ("./general.router.js");

const cControl = new MessagesController()
class MessagesCRouter extends CustomRouter {
  constructor() {
    super(cControl);
  }
}
module.exports = MessagesCRouter