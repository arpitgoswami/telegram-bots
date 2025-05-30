const { GoogleGenAI, Modality } = require("@google/genai");

module.exports = (bot) => {
  bot.onText(/\/image(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const prompt = match[1]?.trim();

    if (!prompt) {
      return bot.sendMessage(
        chatId,
        "Please provide a prompt for the image.\n\nExample: `/image cute cat`",
        { parse_mode: "Markdown" }
      );
    }

    try {
      await bot.sendMessage(
        chatId,
        "🖼️ Please wait while I generate the image..."
      );

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      let imageBuffer = null;

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          imageBuffer = Buffer.from(imageData, "base64");
          break;
        }
      }

      if (imageBuffer) {
        await bot.sendPhoto(chatId, imageBuffer);
      } else {
        bot.sendMessage(chatId, "Sorry, I couldn't generate the image.");
      }
    } catch (error) {
      console.error("Image generation error:", error);
      bot.sendMessage(
        chatId,
        "⚠️ Sorry, image generation failed. Please try again later."
      );
    }
  });
};
