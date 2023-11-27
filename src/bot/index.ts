import { LibBot } from '../lib/LibBot';
import { BOT_TOKEN } from '../evn';
import { getUserById } from '../db/getUserById';
import { createMessage } from '../db/createMessage';
import { getMessagesByUserId } from '../db/getMessagesById';
import { deleteMessageByIndex } from '../db/deleteMessageByIndex';
import { deleteAllMessages } from '../db/deleteAllMessages';
import { authHandler } from './authHandler';
import { deleteUserById } from '../db/deleteUserById';

export const appBot = new LibBot(BOT_TOKEN);
const AUTH_CMD = '/auth';

appBot.beforeAll(message => {
  if (message.type === 'cmd' && message.cmd === AUTH_CMD) return true;

  if (message.type !== 'text' && message.type !== 'cmd') {
    appBot.sendMessage(message.fromId, 'I can only understand text messages and commands');
    return false;
  }

  const user = getUserById(message.fromId);
  if (!user) {
    appBot.sendMessage(message.fromId, 'You are not authorized. Send /auth to register in the system');
    return false;
  }

  return true;
});

appBot.onCmd(AUTH_CMD, authHandler);

appBot.onText(message => {
  createMessage({ userId: message.fromId, text: message.text });
  appBot.sendMessage(message.fromId, 'Message saved');
});

appBot.onCmd('/show', ({ fromId }) => {
  const userMessages = getMessagesByUserId(fromId);
  const content = userMessages.map((message, idx) => `#${idx}: ${message.text}`).join('\n');
  appBot.sendMessage(fromId, content || 'No messages');
});

appBot.onCmd('/delete', ({ fromId, text }) => {
  const idx = Number(text);
  const message = getMessagesByUserId(fromId)[idx];
  if (!message) return appBot.sendMessage(fromId, 'Message not found');
  deleteMessageByIndex({ userId: fromId, index: message.index });
  appBot.sendMessage(fromId, 'Message deleted');
});

appBot.onCmd('/deleteAll', message => {
  deleteAllMessages(message.fromId);
  appBot.sendMessage(message.fromId, 'All messages deleted');
});

appBot.onCmd('/deleteUser', message => {
  deleteUserById(message.fromId);
  appBot.sendMessage(message.fromId, 'Bye!');
});
