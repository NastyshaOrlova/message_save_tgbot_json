import 'dotenv/config';

import TelegramBot from 'node-telegram-bot-api';

import { config } from './config';
import { prisma } from './prisma';

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

// 1. Разреши только текстовые сообщения
// 2. На любое текстовое сообщение отвечай "Вы написали: <текст сообщения>. Я это сохранил."
// 3. Наши команды будут начинаться с /, например /start
// 4. Если команада /start, то отвечай "Привет, я бот, который сохраняет ваши сообщения"
// 5. /clean - очищает все сообщения из базы данных, кромe самого первого "/start" и удаляет все сообщения из чата

bot.on('message', async msg => {
  if (msg.from?.id !== config.CHES_TG_ID && msg.from?.id !== config.SHON_TG_ID) {
    bot.sendMessage(msg.chat.id, 'You are not allowed to use this bot!');
    return;
  }

  console.log(123);

  bot.sendMessage(msg.chat.id, 'Hello World!');
});
