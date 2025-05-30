require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const { GoogleGenAI, Modality } = require("@google/genai");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let language = { current: "english" };

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

// Handle all other messages as chat input
const onMessage = require("./message/onMessage");
const randomMessage = require("./message/randomMessage");
onMessage(bot, model, language);
