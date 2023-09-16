import 'dotenv/config'; // позволяет работать с .evn

import TelegramBot from 'node-telegram-bot-api'; // библиотека для работы с тг-ботом

import { config } from './config';
import { prisma } from './prisma';


const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
// создание бота(с нашим токеном и разрешение на получение сообщений)

bot.on('message', async msg => { // метод прослушивание входяших сообщений
  if (msg.from?.id !== config.CHES_TG_ID && msg.from?.id !== config.SHON_TG_ID) {
    bot.sendMessage(msg.chat.id, 'You are not allowed to use this bot!');
    return; 
  }
  
  if (msg.text === "/start") {
    bot.sendMessage(msg.chat.id, "Привет, я бот, который сохраняет ваши сообщения");
    return;
  }

  if (msg.text === "/show") {
    const messages = await prisma.message.findMany({
      where: {
        user_id: msg.from.id
      }
    })

    for (let i = 0; i < messages.length; i++) {
      bot.sendMessage(msg.chat.id, `${messages[i].content}`)
    }
    return;
  }


  if (msg.text === "/clean") {
    try {
        await prisma.message.deleteMany({
            where: {
                user_id: msg.from.id,
                content: {
                    not: '/start'
                }
            }
        });

        bot.sendMessage(msg.chat.id, "Bce сообщения были удалены из базы данных. Пожалуйста, очистите историю чата вручную.");
        return;
    } catch(error) {
        console.error("Ошибка при очистке сообщений:", error);
        bot.sendMessage(msg.chat.id, "Произошла ошибка при очистке сообщений.");
        return;
    }
  }

  if(msg.text) {
    try {
        await prisma.message.create({
            data: {
                content: msg.text,
                timestamp: new Date(),
                user_id: msg.chat.id
            }
        });

        bot.sendMessage(msg.chat.id, `Вы написали: "${msg.text}". Я это сохранил!`);
    } catch(error) {
        bot.sendMessage(msg.chat.id, "Произошла ошибка при сохранении сообщения.");
        console.error(error);
    }
  } else {
    bot.sendMessage(msg.chat.id, 'Вы можете отправлять только текст');
  }
});
