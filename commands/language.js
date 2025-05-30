module.exports = (bot, language) => {
  bot.onText(/\/language (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    let languageInput = match[1];

    if (!languageInput) {
      return bot.sendMessage(
        chatId,
        "Please specify a language. Example: /language Spanish"
      );
    }

    const validLanguages = [
      "english",
      "spanish",
      "french",
      "german",
      "italian",
      "hinglish",
      "hindi",
    ];
    languageInput = languageInput.toLowerCase(); // Normalize input for comparison

    if (!validLanguages.includes(languageInput)) {
      return bot.sendMessage(
        chatId,
        `Sorry, "${languageInput}" is not a supported language. Supported languages are: ${validLanguages.join(
          ", "
        )}.`
      );
    }

    language.current = languageInput;

    bot.sendMessage(
      chatId,
      `Language has been set to ${language.current}. My future responses will be in ${language.current}.`
    );
  });
};
