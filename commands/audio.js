const fs = require("fs");
const util = require("util");
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

module.exports = (bot) => {
  bot.onText(/\/audio (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];

    if (!text) {
      return bot.sendMessage(
        chatId,
        "Please provide text to generate audio. Example: /audio Hello world"
      );
    }

    try {
      bot.sendMessage(chatId, "Generating audio from text... 🎵");

      const request = {
        input: { text },
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      };

      const [response] = await client.synthesizeSpeech(request);
      const audioBuffer = Buffer.from(response.audioContent, "binary");

      await bot.sendAudio(
        chatId,
        audioBuffer,
        {},
        {
          filename: "output.mp3",
          contentType: "audio/mpeg",
        }
      );
    } catch (error) {
      console.error("Audio generation error:", error);
      bot.sendMessage(
        chatId,
        "⚠️ Sorry, audio generation failed. Please try again later."
      );
    }
  });
};
