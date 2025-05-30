const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const fetch = require("node-fetch");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;

  try {
    if (!msg.photo || msg.photo.length === 0) {
      return bot.sendMessage(chatId, "❌ Please upload a photo.");
    }

    await bot.sendMessage(chatId, "⏳ Processing the uploaded image...");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const fileId = msg.photo[msg.photo.length - 1].file_id;
    const fileUrl = await bot.getFileLink(fileId);

    // Download image and convert to base64
    const response = await fetch(fileUrl);
    const buffer = await response.buffer();
    const base64Image = buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: "Generate a detailed and accurate prompt that can be used to regenerate this image. I need only single prompt nothing else just provide me the prompt text only. Don't mention any 'Prompt:' and don't use any type of markdown just provide me simple text. Make it detailed and descriptive. Minimum 30 words are required.",
            },
          ],
        },
      ],
    });

    const prompt = result.response.text();

    if (prompt) {
      await bot.sendMessage(chatId, `✨ *Generated Prompt*\n\n${prompt}`, {
        parse_mode: "Markdown",
      });
    } else {
      await bot.sendMessage(chatId, "❌ No prompt was generated.");
    }
  } catch (error) {
    console.error("❌ Error processing image:", error.message || error);
    await bot.sendMessage(
      chatId,
      "⚠️ Sorry, image processing failed. Please try again later."
    );
  }
};
