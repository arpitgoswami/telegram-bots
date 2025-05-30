const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Urls = require("../models/Urls");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: ", err));

module.exports = (bot) => {
  bot.onText(/\/short (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const website = match[1];

    const urlRegex = /^https:\/\/.*\..+$/;

    if (!website || !urlRegex.test(website)) {
      return bot.sendMessage(chatId, "Please provide a valid URL.");
    }

    try {
      const existingUrl = await Urls.findOne({ website });
      if (existingUrl) {
        const shortUrl = `https://mo.ct.ws/${existingUrl.id}`;
        const creationDate = existingUrl.createdAt.toLocaleString();
        return bot.sendMessage(
          chatId,
          `Shortened URL: ${shortUrl}\nCreation Date: ${creationDate}`
        );
      }

      let id = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");

      const newUrl = new Urls({ id, website });
      await newUrl.save();

      const shortUrl = `https://mo.ct.ws/${id}`;
      bot.sendMessage(chatId, `Shortened URL: ${shortUrl}`);
    } catch (error) {
      bot.sendMessage(chatId, `Error: ${error.message}`);
    }
  });
};
