import TelegramBot from 'node-telegram-bot-api';
import { db } from './db';

const BOT_TOKEN = '6260224481:AAEhQT4HVJPGJfiPP_8J71StjFY6VaCNdHs';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', async msg => {
  const id = msg.chat.id;

  if (typeof msg.text === 'string') {
    // not reg and text /start
    if (!db.getAllUsersIds().includes(id) && msg.text === '/start') {
      db.createUser(id);
      bot.sendMessage(id, 'You have registered!');
      return;
    }

    // not reg and some text(not /start)
    if (!db.getAllUsersIds().includes(id) && msg.text !== '/start') {
      bot.sendMessage(id, 'Enter first /start');
      return;
    }

    // reg and text /start
    if (db.getAllUsersIds().includes(id) && msg.text === '/start') {
      bot.sendMessage(id, 'You have already registered. Enter the message you want to save!');
      return;
    }

    // reg and some text(not /start)
    if (db.getAllUsersIds().includes(id) && msg.text !== '/start') {
      // maim code
    }
  } else {
    bot.sendMessage(id, 'We save only the text!');
    return;
  }
});
