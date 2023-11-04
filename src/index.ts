import TelegramBot from 'node-telegram-bot-api';
import { db } from './db';

const BOT_TOKEN = '6260224481:AAEhQT4HVJPGJfiPP_8J71StjFY6VaCNdHs';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const isRegistered = (id: number) => db.getAllUsersIds().includes(id);

bot.on('message', async msg => {
  const id = msg.chat.id;
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
    const formattedMessages = db.getMessagesById(id);

    if (formattedMessages && formattedMessages.length > 0) {
      bot.sendMessage(id, 'Your messages:\n' + formattedMessages.join('\n'));
    } else {
      bot.sendMessage(id, 'You have no saved messages.');
    }
    return;
  }

  if (msg.text === '/deleteAll') {
    db.deleteAllMessages(id);
    bot.sendMessage(id, 'All messages have been deleted.');
    return;
  } else if (msg.text.startsWith('/delete')) {
    const indexPart = msg.text.slice('/delete'.length);
    const index = parseInt(indexPart, 10);
    if (!isNaN(index)) {
      db.deleteMessageByIndex({ id, index });
      bot.sendMessage(id, `Message ${index} has been deleted.`);
      return;
    } else {
      bot.sendMessage(id, 'Please specify a valid message index after /delete');
      return;
    }
  }

  if (msg.text.startsWith('/')) {
    bot.sendMessage(id, 'Sorry. There is no command.');
    return;
  }

  db.createMessage({ userId: id, text: msg.text });
  bot.sendMessage(id, `We have saved your message: "${msg.text}"`);
});
