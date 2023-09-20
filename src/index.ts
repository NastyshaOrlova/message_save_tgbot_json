import 'dotenv/config'; // позволяет работать с .evn

import TelegramBot from 'node-telegram-bot-api'; // библиотека для работы с тг-ботом

import { config } from './config';
import { prisma } from './prisma';


const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
// создание бота(с нашим токеном и разрешение на получение сообщений)

bot.on('message', async msg => { // метод прослушивание входяших сообщений
  if (msg.from?.id !== config.CHES_TG_ID && msg.from?.id !== config.SHON_TG_ID) {
    bot.sendMessage(msg.chat.id, 'Прости, но тебе пользоваться этим чатом нельзя');
    return; 
  }
  
  // /start
  if (msg.text === "/start") {
    bot.sendMessage(msg.chat.id, "Привет! Я буду сохранять твои сообщения! ");
    return;
  } 

  // /show
  if (msg.text === "/show") {
    const messages = await prisma.message.findMany({})
    if (messages.length > 0) {
      await bot.sendMessage(msg.chat.id, 'Вот все сохраненые сообщения:');
      for (let i = 0; i < messages.length; i++) {
        bot.sendMessage(msg.chat.id, `"${messages[i].content}" - ${messages[i].id}`)
      }
      return;
    } else {
      bot.sendMessage(msg.chat.id, 'БД пуста')
      return;
    }

  } 

  // /delete
  if (msg.text === "/delete") {
    const messages = await prisma.message.findMany({})
    if (messages.length > 0) {
      await prisma.message.deleteMany({
        where: {
            content: {
                not: '/start'
            }
        }
      }); 
      bot.sendMessage(msg.chat.id, "Я удалил все сообщения!");
      return; 
    } else {
      bot.sendMessage(msg.chat.id, "Мне нечего удалять! БД и так пустая");
      return;
    }
  }

  // /delete_id
  if (msg.text?.startsWith("/delete ")) {
    const messageId = parseInt(msg.text.split(' ')[1]);
    try {
      await prisma.message.delete({
        where: {
          id: messageId
        }
      });
      bot.sendMessage(msg.chat.id, `Я удалил сообщение под ${messageId} id!`);
    } catch (error) {
      if (error instanceof Error) {  // Проверка, является ли error экземпляром класса Error
        if (error.message.includes('Record to delete does not exist')) {
          bot.sendMessage(msg.chat.id, "Такого id не существует");
        } 
      }
    }
    return;
  }

  // отправка обычного сообщения 
  if(msg.text) {
    await prisma.message.create({
        data: {
            content: msg.text
        }
    });
    bot.sendMessage(msg.chat.id, "Я добавил!");
  } else {
    bot.sendMessage(msg.chat.id, 'Вы можете отправлять только текст');
  }
});
