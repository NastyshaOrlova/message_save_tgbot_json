import { db } from '../db';
import { Message } from 'node-telegram-bot-api';
import { myBot } from '../index';

export const showHandler = async (msg: Message, isAuthenticated: boolean) => {
  const { id } = msg.chat;
  const formattedMessages = db.getMessagesById(id);

  if (!isAuthenticated) {
    await myBot.sendMessage(id, 'First, enter /start to register');
    return;
  }

  if (formattedMessages && formattedMessages.length > 0) {
    await myBot.sendMessage(id, 'Your messages:\n' + formattedMessages.join('\n'));
  } else {
    await myBot.sendMessage(id, 'You have no saved messages.');
  }
};
