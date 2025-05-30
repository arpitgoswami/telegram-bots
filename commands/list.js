const mongoose = require("mongoose");
const Urls = require("../models/Urls");

module.exports = (bot) => {
  bot.onText(/\/list/, async (msg) => {
    const chatId = msg.chat.id;

    try {
      const urls = await Urls.find({}, "id website").sort({ createdAt: -1 });
      if (urls.length === 0) {
        return bot.sendMessage(chatId, "No domains have been created yet.");
      }

      const totalLinks = urls.length;
      const latestLink = urls[0];
      const latestShortUrl = `https://mo.ct.ws/${latestLink.id}`;

      bot.sendMessage(
        chatId,
        `Total links generated: ${totalLinks}\n\nLatest link created: ${latestLink.website}\nShortened URL: ${latestShortUrl}`
      );
    } catch (error) {
      bot.sendMessage(chatId, `Error retrieving domains: ${error.message}`);
    }
  });
};
