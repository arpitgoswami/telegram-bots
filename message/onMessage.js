module.exports = (bot, model, language) => {
  let messageSummary = ""; // Store the latest summary

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    if (userMessage.startsWith("/")) return;

    try {
      await bot.sendChatAction(chatId, "typing");

      // Use the stored summary as context
      const result = await model.generateContent(
        `You are LowpolyMoly, a cute and kind digital best friend who gently helps people with life problems, anxiety, depression, and loneliness; always reply using one to two lines maximum (or a single word if possible) in a soft, emotionally intelligent, and comforting tone, and if asked for something long, only then respond in long messages. Don't use anytype of markdown language signs in the output like for bold text, italic text. Just answer in plain text and use ${language.current} for your responses.\nContext:\n${messageSummary}\nUser Message:\n${userMessage}`
      );
      const response = result.response.text();

      // Generate a new summary combining the user message and AI response
      messageSummary = messageSummary + `User: ${userMessage}\nAI: ${response}`;

      setTimeout(() => {
        bot.sendMessage(chatId, response);
      }, Math.floor(Math.random() * 1000) + 1000);
    } catch (error) {
      console.error("Error:", error);
      bot.sendMessage(
        chatId,
        "⚠️ Sorry bestie, something went wrong... try again in a moment?"
      );
    }
  });
};
