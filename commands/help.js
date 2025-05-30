module.exports = (bot) => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Need a hand? Here's what I can do:\n\n/commands - View all available commands\n/image <prompt> - Generate an image 🖼️\n/short <URL> - Shorten a URL 🔗\n\nJust message me and I will reply."
    );
  });
};
