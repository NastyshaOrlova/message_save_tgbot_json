import TelegramBot, { Message } from 'node-telegram-bot-api';

export const beforeAllHandler = async (bot: TelegramBot, msg: Message) => {
  if (typeof msg.text !== 'string') {
    await bot.sendMessage(msg.chat.id, 'We work only with text messages');
  }
};
