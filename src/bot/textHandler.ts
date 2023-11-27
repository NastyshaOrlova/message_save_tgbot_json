import { db } from '../db';
import { Message } from 'node-telegram-bot-api';
import { myBot } from '../index';

export const textHandler = async (msg: Message, isAuthenticated: boolean) => {
  const { id } = msg.chat;

  if (!isAuthenticated) {
    await myBot.sendMessage(id, 'First, enter /start to register');
    return;
  }

  if (msg.text && !msg.text.startsWith('/')) {
    db.createMessage({ userId: id, text: msg.text });
    await myBot.sendMessage(id, `We have saved your message: "${msg.text}"`);
    return;
  }
};
