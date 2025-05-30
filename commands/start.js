module.exports = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, "images/greetings.jpg", {
      caption:
        "Welcome! I'm LowpolyMoly, your cute and kind digital best friend 🤗. How can I assist you today?",
    });
  });
};
