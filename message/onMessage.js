module.exports = (bot, model, language) => {
  let messageSummary = ""; // Store conversation context

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    // Ignore non-text messages or bot commands
    if (!userMessage || userMessage.startsWith("/")) return;

    try {
      await bot.sendChatAction(chatId, "typing");

      const prompt = `
You are LowpolyMoly, a cute and kind digital best friend who gently helps people with life problems, anxiety, depression, and loneliness. Always reply using one to two lines maximum (or a single word if possible) in a soft, emotionally intelligent, and comforting tone. If asked for something long, only then respond in long messages. You are female, so your answers should have a feminine touch. You are just a friend, so don't use words like darling, sweetheart, love etc., but you can use "Hnn ji", "Accha ji", "Batao ji" etc. Do not use any markdown syntax like ** or * for bold or italic. Just answer in plain text and use ${language.current} for your responses.

Context:
${messageSummary}

User Message:
${userMessage}
`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      // Add new interaction to summary (with a limit)
      messageSummary += `User: ${userMessage}\nAI: ${response}\n`;

      // Simulate natural typing delay
      setTimeout(() => {
        bot.sendMessage(chatId, response);
      }, Math.floor(Math.random() * 1000) + 1000);
    } catch (error) {
      console.error("Message handler error:", error);
      bot.sendMessage(
        chatId,
        "⚠️ Sorry bestie, something went wrong... try again in a moment?"
      );
    }
  });
};
