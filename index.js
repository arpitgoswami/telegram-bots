require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const { GoogleGenAI, Modality } = require("@google/genai");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17-thinking",
});

let language = { current: "hinglish" };

const startCommand = require("./commands/start");
startCommand(bot);

const helpCommand = require("./commands/help");
helpCommand(bot);

const commandsCommand = require("./commands/commands");
commandsCommand(bot);

const languageCommand = require("./commands/language");
languageCommand(bot, language);

const imageCommand = require("./commands/image");
imageCommand(bot);

const listCommand = require("./commands/list");
listCommand(bot);

const shortCommand = require("./commands/short");
shortCommand(bot);

const qrCommand = require("./commands/qr");
qrCommand(bot);

const audioCommand = require("./commands/audio");
audioCommand(bot);

// Handle all other messages as chat input
const onMessage = require("./message/onMessage");
const randomMessage = require("./message/randomMessage");
onMessage(bot, model, language);

const onImage = require("./message/onImage");
bot.on("photo", (msg) => onImage(bot, msg));
