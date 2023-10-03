import 'dotenv/config'; // позволяет работать с .evn

import TelegramBot from 'node-telegram-bot-api'; // библиотека для работы с тг-ботом

import { config } from './config';
import { db } from './db';

// console.log(db.getUsers());
// console.log(db.createUser());
// console.log(db.getUsers());
console.log(db.createMessage({ text: 'Hello', timestamp: new Date(), userId: 235235423 }));

// prisma.message.findMany({}).then(console.log).catch(console.error);

// const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
// // // создание бота(с нашим токеном и разрешение на получение сообщений)

// bot.on('message', async msg => {
//   // метод прослушивание входяших сообщений
//   // if (msg.from?.id !== config.CHES_TG_ID && msg.from?.id !== config.SHON_TG_ID) {
//   //   bot.sendMessage(msg.chat.id, 'You are not allowed to use this bot! Ты бука)');
//   //   return; // завершает функцию если условие выше выполнилось
//   // }
//   // msg.from.id - тот кто отправил сообщение

//   bot.sendMessage(msg.chat.id, `Hello, ${msg.chat.first_name}! Your CHAT_ID is ${msg.chat.id}`); // Отправляет сообщение
// });

// 1. Разреши только текстовые сообщения
// 2. На любое текстовое сообщение отвечай "Вы написали: <текст сообщения>. Я это сохранил."
// 3. Наши команды будут начинаться с /, например /start
// 4. Если команада /start, то отвечай "Привет, я бот, который сохраняет ваши сообщения"
// 5. /clean - очищает все сообщения из базы данных, кромe самого первого "/start" и удаляет все сообщения из чата
