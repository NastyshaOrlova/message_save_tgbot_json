import { db } from '../db';
import { Message } from 'node-telegram-bot-api';
import { myBot } from '../index';

export const startHandler = async (msg: Message, isAuthenticated: boolean) => {
  const { id } = msg.chat;
  if (isAuthenticated) {
    await myBot.sendMessage(id, 'You have already registered. Enter the message you want to save!');
    return;
  }

  db.createUser(id);
  await myBot.sendMessage(id, 'You have registered!');
  return;
};
