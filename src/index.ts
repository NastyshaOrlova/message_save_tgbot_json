import 'dotenv/config'; // позволяет работать с .evn

import TelegramBot from 'node-telegram-bot-api'; // библиотека для работы с тг-ботом

import { config } from './config';
import { db } from './db';

// console.log(db.getUsers());
// console.log(db.createUser());
// console.log(db.getUsers());
console.log(db.createMessage({ text: 'Hello', timestamp: new Date(), userId: 235235423 }));

// prisma.message.findMany({}).then(console.log).catch(console.error);

async function welcome(userId: number) {
  console.log(userId);

  // if (user) {
  //   bot.sendMessage(msg.chat.id, 'Введите другое сообщение!');
  // } else {
  //   await prisma.user.create({
  //     data: {
  //       id: userId,
  //     },
  //   });
  //   bot.sendMessage(msg.chat.id, 'Добро пожаловать!');
  // }
}

async function saveMessage(userId: number, text: string) {
  console.log(userId, text);
  // await prisma.message.create({
  //   data: {
  //     content: text,
  //     userId: userId,
  //     messageIndex: 1,
  //   },
  // });
  // bot.sendMessage(msg.chat.id, 'Я добавил!');
}

bot.on('message', async msg => {
  if (msg.text === '/start' && msg.from?.id) {
    welcome(msg.from.id);
  } else if (msg.from?.id && msg.text) {
    saveMessage(msg.from?.id, msg.text);
  }
});

// // /start
// if (msg.text === "/start") {
//   bot.sendMessage(msg.chat.id, "Привет! Я буду сохранять твои сообщения! ");
//   return;
// }

// // /show
// if (msg.text === "/show") {
//   const messages = await prisma.message.findMany({})
//   if (messages.length > 0) {
//     await bot.sendMessage(msg.chat.id, 'Вот все сохраненые сообщения:');
//     for (let i = 0; i < messages.length; i++) {
//       bot.sendMessage(msg.chat.id, `"${messages[i].content}" - ${messages[i].id}`)
//     }
//     return;
//   } else {
//     bot.sendMessage(msg.chat.id, 'БД пуста')
//     return;
//   }

// }

// // /delete
// if (msg.text === "/delete") {
//   const messages = await prisma.message.findMany({})
//   if (messages.length > 0) {
//     await prisma.message.deleteMany({
//       where: {
//           content: {
//               not: '/start'
//           }
//       }
//     });
//     bot.sendMessage(msg.chat.id, "Я удалил все сообщения!");
//     return;
//   } else {
//     bot.sendMessage(msg.chat.id, "Мне нечего удалять! БД и так пустая");
//     return;
//   }
// }

// // /delete_id
// if (msg.text?.startsWith("/delete ")) {
//   const messageId = parseInt(msg.text.split(' ')[1]);
//   try {
//     await prisma.message.delete({
//       where: {
//         id: messageId
//       }
//     });
//     bot.sendMessage(msg.chat.id, `Я удалил сообщение под ${messageId} id!`);
//   } catch (error) {
//     if (error instanceof Error) {  // Проверка, является ли error экземпляром класса Error
//       if (error.message.includes('Record to delete does not exist')) {
//         bot.sendMessage(msg.chat.id, "Такого id не существует");
//       }
//     }
//   }
//   return;
// }

// // отправка обычного сообщения
// if(msg.text) {
//   await prisma.message.create({
//       data: {
//           content: msg.text
//       }
//   });
//   bot.sendMessage(msg.chat.id, "Я добавил!");
// } else {
//   bot.sendMessage(msg.chat.id, 'Вы можете отправлять только текст');
// }
