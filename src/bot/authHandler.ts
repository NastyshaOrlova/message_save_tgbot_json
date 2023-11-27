import { CmdMessage } from '../lib/LibBot';
import { getUserById } from '../db/getUserById';
import { createUser } from '../db/createUser';
import { appBot } from '.';

export const authHandler = (message: CmdMessage) => {
  const user = getUserById(message.fromId);
  if (user) {
    appBot.sendMessage(message.fromId, 'You are already authorized');
    return;
  }

  createUser(message.fromId);
  appBot.sendMessage(message.fromId, 'You are successfully authorized. Start sending messages');
};
