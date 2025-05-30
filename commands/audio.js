const gTTS = require("gtts");
const fs = require("fs");

module.exports = (bot) => {
  bot.onText(/\/audio\s*(.*)/, (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1]?.trim();

    if (!text) {
      return bot.sendMessage(
        chatId,
        "❗ Please provide text to convert to audio. Example: /audio Hello world"
      );
    }

    try {
      const gtts = new gTTS(text, "en");
      const filePath = `Audio_${Date.now()}.mp3`;

      gtts.save(filePath, (err) => {
        if (err) {
          console.error("Error generating audio:", err);
          return bot.sendMessage(
            chatId,
            "❌ Sorry, I couldn't generate the audio file."
          );
        }

        bot
          .sendAudio(chatId, filePath, {
            caption: "Here is your audio file 🎵",
          })
          .then(() => {
            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting audio file:", unlinkErr);
              }
            });
          });
      });
    } catch (error) {
      console.error("Audio generation error:", error);
      bot.sendMessage(
        chatId,
        "⚠️ Sorry, audio generation failed. Please try again later."
      );
    }
  });
};
