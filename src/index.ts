import TelegramBot from 'node-telegram-bot-api';
import { db } from './db';
import { text } from 'stream/consumers';

const BOT_TOKEN = '6260224481:AAEhQT4HVJPGJfiPP_8J71StjFY6VaCNdHs';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const isRegistered = (id: number) => db.getAllUsersIds().includes(id);

bot.on('message', async msg => {
  const id = msg.chat.id;

  // check for string type
  if (typeof msg.text !== 'string') {
    bot.sendMessage(id, 'We save only the text!');
    return;
  }

  if (!isRegistered(id)) {
    if (msg.text === '/start') {
      db.createUser(id);
      bot.sendMessage(id, 'You have registered!');
    } else {
      bot.sendMessage(id, 'Enter first /start');
    }
    return;
  }

  if (msg.text === '/start') {
    bot.sendMessage(id, 'You have already registered. Enter the message you want to save!');
    return;
  }

  if (msg.text === '/show') {
    const str = db.getUserById(id)?.messages.map(message => {
      return `${message.index}. ${message.text}`;
    });

    if (str!.length > 0) {
      bot.sendMessage(id, 'Your messages:\n' + str?.join('\n'));
      return;
    }

    bot.sendMessage(id, 'You have no saved messages.');
    return;
  }

  db.createMessage({ userId: id, text: msg.text });
  bot.sendMessage(id, `We have saved your message: "${msg.text}"`);

  // Handlers = Function
  // /start => welcome(userId)                         +
  // /show => showAll(userId)                          +
  // /delete all => deleteAll(userId)                  -
  // /delete <idx> => deleteByIndex(userId, idx)       -
  // any other message => saveMessage(userId, text)    +
  // unknownInput()

  // Code for a registered user:
});
