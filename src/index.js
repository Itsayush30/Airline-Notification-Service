const express = require("express");

const amqplib = require("amqplib");
const { EmailService } = require("./services");
async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("airline-notification-service");
    channel.consume("airline-notification-service", async (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);
      // const object = JSON.parse(Buffer.from(data).toString());
      await EmailService.sendEmail(
        object.senderEmail,
        object.recipientEmail,
        object.subject,
        object.text
      );
      channel.ack(data);
    });
  } catch (error) {}
}

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  await connectQueue();
    console.log("queue is up")
});
