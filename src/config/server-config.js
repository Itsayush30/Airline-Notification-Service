const dotenv = require('dotenv'); //it will provide dotenv module object

dotenv.config(); // calling config function from object

module.exports = {
    PORT: process.env.PORT,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,

}