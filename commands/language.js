module.exports = (bot, language) => {
  bot.onText(/\/language\s*(.*)/, (msg, match) => {
    const chatId = msg.chat.id;
    let languageInput = match[1].trim(); // Trim spaces

    if (!languageInput) {
      return bot.sendMessage(
        chatId,
        "Please specify a language. Example: /language Spanish. Supported languages are: English, Spanish, French, German, Italian, Hinglish, Hindi."
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
    languageInput = languageInput.toLowerCase(); // Normalize input

    if (!validLanguages.includes(languageInput)) {
      return bot.sendMessage(
        chatId,
        `❌ Sorry, "${languageInput}" is not a supported language. Supported languages are: ${validLanguages.join(
          ", "
        )}.`
      );
    }

    language.current = languageInput;

    bot.sendMessage(
      chatId,
      `✅ Language has been set to *${language.current}*. My future responses will be in *${language.current}*.`,
      { parse_mode: "Markdown" }
    );
  });
};
