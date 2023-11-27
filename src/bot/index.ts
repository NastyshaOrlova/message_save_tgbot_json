import { LibBot } from '../lib/LibBot';
import { BOT_TOKEN } from '../evn';
import { getUserById } from '../db/getUserById';
import { createUser } from '../db/createUser';
import { createMessage } from '../db/createMessage';
import { getMessagesByUserId } from '../db/getMessagesById';
import { deleteMessageByIndex } from '../db/deleteMessageByIndex';
import { deleteAllMessages } from '../db/deleteAllMessages';

export const appBot = new LibBot(BOT_TOKEN);

appBot.beforeAll(message => {
  if (message.type !== 'text') {
    appBot.sendMessage('I can only understand text messages');
    return false;
  }

  const user = getUserById(message.fromId);
  if (!user) {
    appBot.sendMessage('You are not authorized. Send /auth to register in the system');
    return false;
  }

  return true;
});

appBot.onCmd('/auth', message => {
  const user = getUserById(message.fromId);
  if (user) {
    appBot.sendMessage('You are already authorized');
    return;
  }

  createUser(message.fromId);
  appBot.sendMessage('You are successfully authorized. Start sending messages');
});

appBot.onText(message => {
  createMessage({ userId: message.fromId, text: message.text });
  appBot.sendMessage('Message saved');
});

appBot.onCmd('/show', message => {
  const userMessages = getMessagesByUserId(message.fromId);
  const message = userMessages.map((message, idx) => `#${idx}: ${message.text}`).join('\n');
  appBot.sendMessage(message);
});

appBot.onCmd('/delete', message => {
  const idx = Number(message.text);
  const message = getMessagesByUserId(message.fromId)[idx];
  if (!message) return appBot.sendMessage('Message not found');
  deleteMessageByIndex({ userId: message.from, index: message.index });
  appBot.sendMessage('Message deleted');
});

appBot.onCmd('/deleteAll', message => {
  deleteAllMessages(message.fromId);
  appBot.sendMessage('All messages deleted');
});
