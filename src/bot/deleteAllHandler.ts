import { db } from '../db';
import { Message } from 'node-telegram-bot-api';
import { myBot } from '../index';

export const deleteAllHandler = async (msg: Message, isAuthenticated: boolean) => {
  const { id } = msg.chat;
  if (!isAuthenticated) {
    await myBot.sendMessage(msg.chat.id, 'First, enter /start to register');
    return;
  }

  db.deleteAllMessages(id);
  await myBot.sendMessage(id, 'All messages have been deleted.');
};
