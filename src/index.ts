import TelegramBot from "node-telegram-bot-api";
import { db } from "./db";

const BOT_TOKEN = '6970020467:AAEzqlR2eTwnKc0--LtfhXgalAAqUoU4uM4';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message',async msg => {
    console.log(msg)
})
