import TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = '6260224481:AAEhQT4HVJPGJfiPP_8J71StjFY6VaCNdHs';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', async msg => {
  if (typeof msg.text === 'string') {
  } else {
    console.log('не текст');
  }
});
