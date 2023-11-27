import { Message } from 'node-telegram-bot-api';
import { db } from '../db';
import { myBot } from '../index';

export const deleteHandler = async (msg: Message, isAuthenticated: boolean) => {
  const { id } = msg.chat;
  const text = msg.text || '';
  const match = text.match(/^\/delete(\d+)$/);

  if (!isAuthenticated) {
    await myBot.sendMessage(msg.chat.id, 'First, enter /start to register');
    return;
  }

  const index = parseInt(match![1], 10);
  db.deleteMessageByIndex({ id, index });
  await myBot.sendMessage(id, `Message ${index} has been deleted.`);
};
