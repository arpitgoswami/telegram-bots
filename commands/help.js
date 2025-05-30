module.exports = (bot) => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Need a hand? Here's what I can do:\n\n/start - Say hello 👋\n/help - You're already here!\n/commands - Show all available commands\n\nOr just type anything—I'm always here to talk. 🙂"
    );
  });
};
