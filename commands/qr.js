module.exports = (bot) => {
  bot.onText(/\/qr/, (msg) => {
    const chatId = msg.chat.id;
    const args = msg.text.split(" ").slice(1);

    if (args.length === 0) {
      bot.sendMessage(
        chatId,
        "Please provide a valid URL to generate a QR code."
      );
      return;
    }

    const url = args.join(" ");

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      bot.sendMessage(
        chatId,
        "Invalid URL format. Please provide a valid URL."
      );
      return;
    }

    // Generate QR code
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      url
    )}&size=300x300`;

    bot.sendPhoto(chatId, qrCodeUrl, { caption: "Here is your QR code." });
  });
};
