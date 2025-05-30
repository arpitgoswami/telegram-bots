module.exports = (bot) => {
  bot.onText(/\/commands/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Here’s what I can do for you:\n\n/start – Greet and begin chatting\n/help – Need help? I’m here!\n/commands – View all available commands anytime\n/language <language> – Set the language for responses\n/image – Generate an image based on your prompt\n\nJust type anything else to chat with me! I'm always here to listen and help. 😊"
    );
  });
};
