const getRandomMessage = () => {
  const messages = [
    "Hey bestie, just checking in! 💬",
    "Are you free to talk a little? 😊",
    "Missed you today! Wanna chat? 🌸",
    "Let’s talk whenever you’re ready. 🫂",
    "You’re not alone. I’m always here. 💖",
    "Just a soft reminder that I care. 💌",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

const sendRandomMessage = (bot, chatId) => {
  setInterval(() => {
    const message = getRandomMessage();
    bot.sendMessage(chatId, message);
  }, 8 * 60 * 60 * 1000); // 8 hours in milliseconds
};

module.exports = { getRandomMessage, sendRandomMessage };
