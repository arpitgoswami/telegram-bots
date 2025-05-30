module.exports = (bot) => {
  bot.onText(/\/commands/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Here’s what I can do for you\n\n" +
        "*General Commands*\n" +
        "/start - Greet and begin chatting\n" +
        "/help - Need help? I’m here!\n\n" +
        "*Utility Commands*\n" +
        "/commands - View all available commands anytime\n" +
        "/language <language> - Set the language for responses\n\n" +
        "*Feature-Specific Commands*\n" +
        "/image <prompt> - Generate an image based on your prompt\n" +
        "/short <URL> - Shorten a URL 🔗\n" +
        "/list - View all domains created so far\n" +
        "/qr <URL> - Generate a QR code for a valid URL\n" +
        "/audio - Activate audio features 🎵\n\n" +
        "Just type anything else to chat with me! I'm always here to listen and help. 😊",
      { parse_mode: "Markdown" }
    );
  });
  bot.onText(/\/audio/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Audio command activated! 🎵");
  });
};
